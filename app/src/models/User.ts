import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "@/types";

interface IUserDocument extends Omit<IUser, "_id">, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    fullName: {
      type: String,
      required: true,
    },
    avatar: String,
    role: {
      type: String,
      enum: ["admin", "accountant", "tour_manager", "sales", "staff"],
      default: "staff",
    },
    phone: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, collection: "nguoi_dung" },
);

export const User =
  mongoose.models.User || mongoose.model<IUserDocument>("User", userSchema);
