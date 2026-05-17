"use client";

import React, { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import DataTable from "@/components/common/DataTable";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import { formatDate } from "@/lib/utils";

const ToursPage = () => {
  const [tours, setTours] = useState([
    {
      _id: "1",
      name: "Tour Sapa 3 ngày",
      destination: "Sapa",
      startDate: "2026-02-01",
      price: 4500000,
      spots: 20,
      availableSpots: 5,
      status: "active",
    },
    {
      _id: "2",
      name: "Tour Hạ Long 4 ngày",
      destination: "Hạ Long",
      startDate: "2026-02-15",
      price: 6200000,
      spots: 25,
      availableSpots: 12,
      status: "active",
    },
  ]);

  const [page, setPage] = useState(1);

  const columns = [
    { key: "name", label: "Tên tour" },
    { key: "destination", label: "Điểm đến" },
    { key: "startDate", label: "Ngày khởi hành" },
    {
      key: "price",
      label: "Giá",
      render: (v: number) => `${(v / 1000000).toFixed(1)}M VND`,
    },
    { key: "availableSpots", label: "Chỗ trống" },
    {
      key: "status",
      label: "Trạng thái",
      render: (v: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            v === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {v === "active" ? "Đang hoạt động" : "Khoá"}
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
            <h1 className="text-3xl font-bold">Quản lý tour</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus size={20} />
              Thêm tour
            </button>
          </div>

          {/* Search */}
          <div className="mb-6 flex items-center gap-2 bg-white px-4 py-3 rounded-lg border border-gray-200">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm tour..."
              className="flex-1 outline-none text-sm"
            />
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={tours}
            pagination={{
              page,
              limit: 10,
              total: tours.length,
              pages: Math.ceil(tours.length / 10),
            }}
            onPageChange={setPage}
          />
        </main>
      </div>
    </div>
  );
};

export default ToursPage;
