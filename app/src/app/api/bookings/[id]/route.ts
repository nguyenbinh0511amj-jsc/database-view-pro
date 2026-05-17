import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb/connect";
import { Booking } from "@/models/Booking";
import { Types } from "mongoose";

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    await connectDB();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const booking = await Booking.findById(params.id)
      .populate("customerId")
      .populate("tourId");

    if (!booking) {
      return NextResponse.json(
        { error: "Booking không tìm thấy" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: booking });
  } catch (error) {
    console.error("Get booking error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: any }) {
  try {
    const body = await req.json();
    await connectDB();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const booking = await Booking.findByIdAndUpdate(params.id, body, {
      new: true,
    })
      .populate("customerId")
      .populate("tourId");

    if (!booking) {
      return NextResponse.json(
        { error: "Booking không tìm thấy" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Booking được cập nhật thành công",
      data: booking,
    });
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: any }) {
  try {
    await connectDB();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const booking = await Booking.findByIdAndDelete(params.id);

    if (!booking) {
      return NextResponse.json(
        { error: "Booking không tìm thấy" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Booking được xóa thành công",
    });
  } catch (error) {
    console.error("Delete booking error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
