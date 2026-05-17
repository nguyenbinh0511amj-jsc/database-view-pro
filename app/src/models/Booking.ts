import mongoose, { Schema, Document } from "mongoose";
import { IBooking } from "@/types";

interface IBookingDocument extends Omit<IBooking, "_id">, Document {}

const bookingSchema = new Schema<IBookingDocument>(
  {
    bookingCode: {
      type: String,
      required: true,
      unique: true,
    },
    customerId: {
      type: Schema.Types.ObjectId as any,
      ref: "Customer",
      required: true,
    },
    tourId: {
      type: Schema.Types.ObjectId as any,
      ref: "Tour",
      required: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "partial", "paid"],
      default: "pending",
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["confirmed", "pending", "cancelled"],
      default: "pending",
    },
    notes: String,
  },
  { timestamps: true, collection: "dat_cho" },
);

export const Booking =
  mongoose.models.Booking ||
  mongoose.model<IBookingDocument>("Booking", bookingSchema);
