const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let envLoaded = false;
try {
  require("dotenv").config({ path: "./.env.local" });
  envLoaded = true;
} catch (e) {
  // dotenv not installed — fallback to manual parse
  try {
    const fs = require("fs");
    const content = fs.readFileSync("./.env.local", "utf8");
    content.split(/\r?\n/).forEach((line) => {
      const m = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)\s*$/);
      if (m) process.env[m[1]] = m[2];
    });
    envLoaded = true;
  } catch (err) {
    // ignore
  }
}

const MONGODB_URI = process.env.MONGODB_URI || process.env.ATLAS_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI or ATLAS_URI is required in .env.local");
  process.exit(1);
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    avatar: String,
    role: {
      type: String,
      enum: ["admin", "accountant", "tour_manager", "sales", "staff"],
      default: "staff",
    },
    phone: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "nguoi_dung" },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });

  const adminEmail = "admin@tourpro.com";
  const staffEmail = "staff@tourpro.com";

  const adminExists = await User.findOne({ email: adminEmail });
  if (!adminExists) {
    const hashed = await bcrypt.hash("admin123", 10);
    await User.create({
      email: adminEmail,
      password: hashed,
      fullName: "Admin User",
      role: "admin",
      isActive: true,
    });
    console.log("Created admin:", adminEmail);
  } else {
    console.log("Admin already exists:", adminEmail);
  }

  const staffExists = await User.findOne({ email: staffEmail });
  if (!staffExists) {
    const hashed = await bcrypt.hash("staff123", 10);
    await User.create({
      email: staffEmail,
      password: hashed,
      fullName: "Staff User",
      role: "staff",
      isActive: true,
    });
    console.log("Created staff:", staffEmail);
  } else {
    console.log("Staff already exists:", staffEmail);
  }

  await mongoose.disconnect();
  console.log("Seed complete");
}

seed().catch((e) => {
  console.error("Seed error", e);
  process.exit(1);
});
