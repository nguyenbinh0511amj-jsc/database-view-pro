"use client";

import React, { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import DataTable from "@/components/common/DataTable";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import Chart from "@/components/common/Chart";

const CashFlowsPage = () => {
  const [flows, setFlows] = useState([
    {
      _id: "1",
      type: "income",
      amount: 18000000,
      category: "Đặt tour",
      description: "Thu tiền đặt tour Sapa",
      date: "2026-01-15",
    },
    {
      _id: "2",
      type: "expense",
      amount: 5000000,
      category: "Vận chuyển",
      description: "Chi phí xe cho tour Hạ Long",
      date: "2026-01-14",
    },
  ]);

  const [page, setPage] = useState(1);

  const columns = [
    {
      key: "type",
      label: "Loại",
      render: (v: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            v === "income"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {v === "income" ? "Thu" : "Chi"}
        </span>
      ),
    },
    {
      key: "amount",
      label: "Số tiền",
      render: (v: number) => `${(v / 1000000).toFixed(1)}M VND`,
    },
    { key: "category", label: "Hạng mục" },
    { key: "description", label: "Mô tả" },
    { key: "date", label: "Ngày" },
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

  const flowChart = [
    { month: "Tháng 1", income: 85000000, expense: 35000000 },
    { month: "Tháng 2", income: 92000000, expense: 40000000 },
    { month: "Tháng 3", income: 78000000, expense: 32000000 },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-20 lg:ml-64 bg-gray-50 min-h-screen">
        <Header />
        <main className="p-8">
          <h1 className="text-3xl font-bold mb-8">Quản lý dòng tiền</h1>

          {/* Chart */}
          <div className="mb-8">
            <Chart
              type="bar"
              title="Dòng tiền theo tháng"
              data={flowChart}
              xAxisKey="month"
              dataKeys={["income", "expense"]}
            />
          </div>

          {/* Search */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg border border-gray-200 flex-1">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm dòng tiền..."
                className="flex-1 outline-none text-sm"
              />
            </div>
            <button className="ml-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus size={20} />
              Thêm
            </button>
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={flows}
            pagination={{
              page,
              limit: 10,
              total: flows.length,
              pages: Math.ceil(flows.length / 10),
            }}
            onPageChange={setPage}
          />
        </main>
      </div>
    </div>
  );
};

export default CashFlowsPage;
