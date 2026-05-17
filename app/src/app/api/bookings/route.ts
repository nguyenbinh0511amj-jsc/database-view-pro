import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb/connect";
import { Booking } from "@/models/Booking";
import { Tour } from "@/models/Tour";

function generateBookingCode(): string {
  const date = new Date();
  const timestamp = date.getTime().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `BK${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${random}`;
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");

    const skip = (page - 1) * limit;
    const query = status ? { status } : {};

    const bookings = await Booking.find(query)
      .populate("customerId")
      .populate("tourId")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments(query);

    return NextResponse.json({
      data: bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get bookings error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerId, tourId, numberOfPeople } = body;

    if (!customerId || !tourId || !numberOfPeople) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 },
      );
    }

    await connectDB();

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return NextResponse.json(
        { error: "Tour không tìm thấy" },
        { status: 404 },
      );
    }

    if (tour.availableSpots < numberOfPeople) {
      return NextResponse.json(
        { error: "Không đủ chỗ trống" },
        { status: 400 },
      );
    }

    const totalPrice = tour.price * numberOfPeople;

    const newBooking = new Booking({
      bookingCode: generateBookingCode(),
      customerId,
      tourId,
      numberOfPeople,
      totalPrice,
    });

    await newBooking.save();

    // Update tour available spots
    tour.availableSpots -= numberOfPeople;
    await tour.save();

    return NextResponse.json(
      {
        message: "Booking được tạo thành công",
        data: newBooking,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
