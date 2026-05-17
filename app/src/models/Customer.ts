import mongoose, { Schema, Document } from "mongoose";
import { ICustomer } from "@/types";

interface ICustomerDocument extends Omit<ICustomer, "_id">, Document {}

const customerSchema = new Schema<ICustomerDocument>(
  {
    type: {
      type: String,
      enum: ["individual", "business"],
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    idNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: String,
    notes: String,
    debt: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, collection: "khach_hang" },
);

export const Customer =
  mongoose.models.Customer ||
  mongoose.model<ICustomerDocument>("Customer", customerSchema);
