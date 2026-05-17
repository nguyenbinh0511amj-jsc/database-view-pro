import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb/connect";
import { Customer } from "@/models/Customer";
import { updateCustomerSchema } from "@/lib/validations/customer";
import { Types } from "mongoose";

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    await connectDB();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const customer = await Customer.findById(params.id);
    if (!customer) {
      return NextResponse.json(
        { error: "Khách hàng không tìm thấy" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: customer });
  } catch (error) {
    console.error("Get customer error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: any }) {
  try {
    const body = await req.json();

    const validationResult = updateCustomerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues },
        { status: 400 },
      );
    }

    await connectDB();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const customer = await Customer.findByIdAndUpdate(
      params.id,
      validationResult.data,
      { new: true },
    );

    if (!customer) {
      return NextResponse.json(
        { error: "Khách hàng không tìm thấy" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Khách hàng được cập nhật thành công",
      data: customer,
    });
  } catch (error) {
    console.error("Update customer error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: any }) {
  try {
    await connectDB();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const customer = await Customer.findByIdAndDelete(params.id);

    if (!customer) {
      return NextResponse.json(
        { error: "Khách hàng không tìm thấy" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Khách hàng được xóa thành công",
    });
  } catch (error) {
    console.error("Delete customer error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
