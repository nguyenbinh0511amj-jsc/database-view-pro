import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb/connect";
import { Tour } from "@/models/Tour";
import { Types } from "mongoose";

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    await connectDB();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const tour = await Tour.findById(params.id);
    if (!tour) {
      return NextResponse.json(
        { error: "Tour không tìm thấy" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: tour });
  } catch (error) {
    console.error("Get tour error:", error);
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

    const tour = await Tour.findByIdAndUpdate(params.id, body, { new: true });

    if (!tour) {
      return NextResponse.json(
        { error: "Tour không tìm thấy" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Tour được cập nhật thành công",
      data: tour,
    });
  } catch (error) {
    console.error("Update tour error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: any }) {
  try {
    await connectDB();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const tour = await Tour.findByIdAndDelete(params.id);

    if (!tour) {
      return NextResponse.json(
        { error: "Tour không tìm thấy" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Tour được xóa thành công",
    });
  } catch (error) {
    console.error("Delete tour error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
