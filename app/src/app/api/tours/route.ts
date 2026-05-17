import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb/connect";
import { Tour } from "@/models/Tour";
import { createTourSchema } from "@/lib/validations/tour";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");

    const skip = (page - 1) * limit;

    const query = status ? { status } : {};

    const tours = await Tour.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ startDate: -1 });

    const total = await Tour.countDocuments(query);

    return NextResponse.json({
      data: tours,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get tours error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validationResult = createTourSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues },
        { status: 400 },
      );
    }

    await connectDB();

    const newTour = new Tour({
      ...validationResult.data,
      availableSpots: validationResult.data.spots,
    });

    await newTour.save();

    return NextResponse.json(
      {
        message: "Tour được tạo thành công",
        data: newTour,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create tour error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
