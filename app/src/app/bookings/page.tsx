"use client";

import React, { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import DataTable from "@/components/common/DataTable";
import { Plus, Edit2, Trash2, Search } from "lucide-react";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([
    {
      _id: "1",
      bookingCode: "BK202601A1B2",
      customer: "Nguyễn Văn A",
      tour: "Tour Sapa 3 ngày",
      numberOfPeople: 4,
      totalPrice: 18000000,
      paymentStatus: "pending",
      status: "pending",
      createdAt: "2026-01-15",
    },
    {
      _id: "2",
      bookingCode: "BK202601C3D4",
      customer: "Trần Thị B",
      tour: "Tour Hạ Long 4 ngày",
      numberOfPeople: 2,
      totalPrice: 12400000,
      paymentStatus: "paid",
      status: "confirmed",
      createdAt: "2026-01-14",
    },
  ]);

  const [page, setPage] = useState(1);

  const columns = [
    { key: "bookingCode", label: "Mã đặt tour" },
    { key: "customer", label: "Khách hàng" },
    { key: "tour", label: "Tour" },
    { key: "numberOfPeople", label: "Số người" },
    {
      key: "totalPrice",
      label: "Tổng tiền",
      render: (v: number) => `${(v / 1000000).toFixed(1)}M VND`,
    },
    {
      key: "paymentStatus",
      label: "Thanh toán",
      render: (v: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            v === "paid"
              ? "bg-green-100 text-green-800"
              : v === "partial"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {v === "paid"
            ? "Đã thanh toán"
            : v === "partial"
              ? "Thanh toán từng phần"
              : "Chưa thanh toán"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (v: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            v === "confirmed"
              ? "bg-blue-100 text-blue-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {v === "confirmed" ? "Đã xác nhận" : "Chờ xác nhận"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Hành động",
      render: () => (
        <div className="flex gap-2">
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
            <Edit2 size={18} />
          </button>
          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-20 lg:ml-64 bg-gray-50 min-h-screen">
        <Header />
        <main className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Quản lý đặt tour</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus size={20} />
              Thêm đặt tour
            </button>
          </div>

          {/* Search */}
          <div className="mb-6 flex items-center gap-2 bg-white px-4 py-3 rounded-lg border border-gray-200">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã đặt tour, khách hàng..."
              className="flex-1 outline-none text-sm"
            />
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={bookings}
            pagination={{
              page,
              limit: 10,
              total: bookings.length,
              pages: Math.ceil(bookings.length / 10),
            }}
            onPageChange={setPage}
          />
        </main>
      </div>
    </div>
  );
};

export default BookingsPage;
