import mongoose, { Schema, Document } from "mongoose";
import { ITour } from "@/types";

interface ITourDocument extends Omit<ITour, "_id">, Document {}

const tourSchema = new Schema<ITourDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    destination: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    spots: {
      type: Number,
      required: true,
    },
    availableSpots: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["planning", "active", "completed", "cancelled"],
      default: "planning",
    },
    guides: [Schema.Types.ObjectId as any],
    expenses: Number,
    profit: Number,
  },
  { timestamps: true, collection: "tour" },
);

export const Tour =
  mongoose.models.Tour || mongoose.model<ITourDocument>("Tour", tourSchema);
