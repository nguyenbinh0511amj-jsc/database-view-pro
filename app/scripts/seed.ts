import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "../src/lib/mongodb/connect";
import { User } from "../src/models/User";
import { Customer } from "../src/models/Customer";
import { Tour } from "../src/models/Tour";

async function seed() {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Customer.deleteMany({});
    await Tour.deleteMany({});

    console.log("Clearing existing data...");

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    const admin = await User.create({
      email: "admin@tourpro.com",
      password: adminPassword,
      fullName: "Admin User",
      role: "admin",
      isActive: true,
    });

    // Create staff user
    const staffPassword = await bcrypt.hash("staff123", 10);
    const staff = await User.create({
      email: "staff@tourpro.com",
      password: staffPassword,
      fullName: "Staff User",
      role: "staff",
      isActive: true,
    });

    console.log("✓ Users created");

    // Create sample customers
    const customers = await Customer.insertMany([
      {
        type: "individual",
        fullName: "Nguyễn Văn A",
        phone: "0912345678",
        email: "nguyenvana@gmail.com",
        idNumber: "001234567890",
        address: "123 Đường A, Hà Nội",
        debt: 0,
      },
      {
        type: "business",
        fullName: "Công ty Du lịch ABC",
        phone: "0213334444",
        email: "info@abctour.com",
        idNumber: "ABC123456",
        address: "456 Đường B, Hồ Chí Minh",
        debt: 5000000,
      },
      {
        type: "individual",
        fullName: "Trần Thị B",
        phone: "0987654321",
        email: "tranthib@gmail.com",
        idNumber: "001234567891",
        address: "789 Đường C, Đà Nẵng",
        debt: 0,
      },
    ]);

    console.log("✓ Customers created");

    // Create sample tours
    const tours = await Tour.insertMany([
      {
        name: "Tour Sapa 3 ngày 2 đêm",
        description: "Khám phá vẻ đẹp Sapa với núi non hùng vĩ",
        destination: "Sapa, Lào Cai",
        startDate: new Date("2026-02-01"),
        endDate: new Date("2026-02-03"),
        price: 4500000,
        spots: 20,
        availableSpots: 15,
        status: "active",
        guides: [admin._id],
        expenses: 1000000,
        profit: 3500000,
      },
      {
        name: "Tour Hạ Long 4 ngày 3 đêm",
        description: "Khám phá Vịnh Hạ Long - di sản thế giới",
        destination: "Hạ Long, Quảng Ninh",
        startDate: new Date("2026-02-15"),
        endDate: new Date("2026-02-18"),
        price: 6200000,
        spots: 25,
        availableSpots: 10,
        status: "active",
        guides: [staff._id],
        expenses: 1500000,
        profit: 4700000,
      },
      {
        name: "Tour Phú Quốc 5 ngày 4 đêm",
        description: "Đảo ngọc Phú Quốc với bãi biển tuyệt đẹp",
        destination: "Phú Quốc, Kiên Giang",
        startDate: new Date("2026-03-01"),
        endDate: new Date("2026-03-05"),
        price: 7800000,
        spots: 30,
        availableSpots: 20,
        status: "planning",
        guides: [],
        expenses: 2000000,
        profit: 5800000,
      },
    ]);

    console.log("✓ Tours created");

    console.log("\n✅ Seed data created successfully!");
    console.log("\n📝 Demo Accounts:");
    console.log("  Admin: admin@tourpro.com / admin123");
    console.log("  Staff: staff@tourpro.com / staff123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
}

seed();
