import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb/connect";
import { Customer } from "@/models/Customer";
import { createCustomerSchema } from "@/lib/validations/customer";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            { fullName: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const customers = await Customer.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Customer.countDocuments(query);

    return NextResponse.json({
      data: customers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get customers error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validationResult = createCustomerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues },
        { status: 400 },
      );
    }

    await connectDB();

    const newCustomer = new Customer(validationResult.data);
    await newCustomer.save();

    return NextResponse.json(
      {
        message: "Khách hàng được tạo thành công",
        data: newCustomer,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create customer error:", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "CCCD/Passport đã tồn tại" },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
