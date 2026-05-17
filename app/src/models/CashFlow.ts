import mongoose, { Schema, Document } from "mongoose";
import { ICashFlow } from "@/types";

interface ICashFlowDocument extends Omit<ICashFlow, "_id">, Document {}

const cashFlowSchema = new Schema<ICashFlowDocument>(
  {
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: String,
    relatedBookingId: { type: Schema.Types.ObjectId as any },
    relatedTourId: { type: Schema.Types.ObjectId as any },
  },
  { timestamps: true, collection: "dong_tien" },
);

export const CashFlow =
  mongoose.models.CashFlow ||
  mongoose.model<ICashFlowDocument>("CashFlow", cashFlowSchema);
