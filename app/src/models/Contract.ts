import mongoose, { Schema, Document } from "mongoose";
import { IContract } from "@/types";

interface IContractDocument extends Omit<IContract, "_id">, Document {}

const contractSchema = new Schema<IContractDocument>(
  {
    customerId: {
      type: Schema.Types.ObjectId as any,
      ref: "Customer",
      required: true,
    },
    contractNumber: {
      type: String,
      required: true,
      unique: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "terminated"],
      default: "active",
    },
    fileUrl: String,
    details: String,
  },
  { timestamps: true, collection: "hop_dong" },
);

export const Contract =
  mongoose.models.Contract ||
  mongoose.model<IContractDocument>("Contract", contractSchema);
