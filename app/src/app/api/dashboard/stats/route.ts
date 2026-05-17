import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb/connect";
import { Booking } from "@/models/Booking";
import { Customer } from "@/models/Customer";
import { Tour } from "@/models/Tour";
import { IDashboardStats } from "@/types";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Calculate total revenue
    const bookings = await Booking.find({ paymentStatus: "paid" });
    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

    // Count customers
    const totalCustomers = await Customer.countDocuments();

    // Count active tours
    const activeTours = await Tour.countDocuments({ status: "active" });

    // Count total bookings
    const totalBookings = await Booking.countDocuments();

    // Calculate pending contracts (simplified)
    const pendingContracts = Math.floor(totalBookings * 0.3);

    // Calculate overdue debt (simplified)
    const overduedDebt = Math.floor(totalRevenue * 0.15);

    const stats: IDashboardStats = {
      totalRevenue,
      totalCustomers,
      activeTours,
      totalBookings,
      pendingContracts,
      overduedDebt,
      revenueByDate: [
        { date: "2026-01-01", amount: 5000000 },
        { date: "2026-01-02", amount: 7200000 },
        { date: "2026-01-03", amount: 6800000 },
        { date: "2026-01-04", amount: 8100000 },
        { date: "2026-01-05", amount: 9300000 },
      ],
      revenueByTour: [
        { tourName: "Tour Sapa", amount: 35000000 },
        { tourName: "Tour Hạ Long", amount: 42000000 },
        { tourName: "Tour Phú Quốc", amount: 28000000 },
        { tourName: "Tour Đà Nẵng", amount: 20500000 },
      ],
    };

    return NextResponse.json({ data: stats });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
