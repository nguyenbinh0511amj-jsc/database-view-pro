"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import StatCard from "@/components/common/StatCard";
import Chart from "@/components/common/Chart";
import { TrendingUp, Users, MapPin, BookOpen } from "lucide-react";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalRevenue: 125500000,
    totalCustomers: 245,
    activeTours: 12,
    totalBookings: 156,
  });

  const revenueData = [
    { date: "2026-01-01", amount: 5000000 },
    { date: "2026-01-02", amount: 7200000 },
    { date: "2026-01-03", amount: 6800000 },
    { date: "2026-01-04", amount: 8100000 },
    { date: "2026-01-05", amount: 9300000 },
    { date: "2026-01-06", amount: 12000000 },
    { date: "2026-01-07", amount: 11500000 },
  ];

  const tourPerformance = [
    { name: "Hà Giang", value: 35000000 },
    { name: "Sapa", value: 28000000 },
    { name: "Hạ Long", value: 42000000 },
    { name: "Phú Quốc", value: 20500000 },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-20 lg:ml-64 bg-gray-50 min-h-screen">
        <Header />
        <main className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Tổng doanh thu"
              value={`${(stats.totalRevenue / 1000000).toFixed(1)}M VND`}
              subtitle="Trong tháng này"
              icon={<TrendingUp size={24} />}
              color="blue"
            />
            <StatCard
              title="Khách hàng"
              value={stats.totalCustomers}
              subtitle="Tổng số khách"
              icon={<Users size={24} />}
              color="green"
            />
            <StatCard
              title="Tour đang hoạt động"
              value={stats.activeTours}
              subtitle="Hôm nay"
              icon={<MapPin size={24} />}
              color="orange"
            />
            <StatCard
              title="Đặt tour"
              value={stats.totalBookings}
              subtitle="Chưa xác nhận"
              icon={<BookOpen size={24} />}
              color="red"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Chart
              type="line"
              title="Doanh thu theo ngày"
              data={revenueData}
              xAxisKey="date"
              dataKeys={["amount"]}
            />
            <Chart
              type="pie"
              title="Doanh thu theo tour"
              data={tourPerformance}
              dataKeys={["value"]}
            />
          </div>

          {/* Booking gần đây */}
          <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Đặt tour gần đây</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div>
                    <p className="font-medium">Đặt tour #BK202601{i}</p>
                    <p className="text-sm text-gray-500">
                      Nguyễn Văn A - Tour Sapa
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    Chờ xác nhận
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
