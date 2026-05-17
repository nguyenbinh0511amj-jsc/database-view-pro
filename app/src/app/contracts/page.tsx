"use client";

import React, { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import DataTable from "@/components/common/DataTable";
import { Plus, Edit2, Trash2, Search } from "lucide-react";

const ContractsPage = () => {
  const [contracts, setContracts] = useState([
    {
      _id: "1",
      customer: "Nguyễn Văn A",
      contractNumber: "HD-202601-001",
      startDate: "2026-01-01",
      endDate: "2027-01-01",
      status: "active",
    },
    {
      _id: "2",
      customer: "Công ty ABC",
      contractNumber: "HD-202601-002",
      startDate: "2025-06-01",
      endDate: "2026-05-31",
      status: "expired",
    },
  ]);

  const [page, setPage] = useState(1);

  const columns = [
    { key: "contractNumber", label: "Số hợp đồng" },
    { key: "customer", label: "Khách hàng" },
    { key: "startDate", label: "Ngày bắt đầu" },
    { key: "endDate", label: "Ngày kết thúc" },
    {
      key: "status",
      label: "Trạng thái",
      render: (v: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            v === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {v === "active" ? "Còn hiệu lực" : "Hết hiệu lực"}
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
            <h1 className="text-3xl font-bold">Quản lý hợp đồng</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus size={20} />
              Thêm hợp đồng
            </button>
          </div>

          {/* Search */}
          <div className="mb-6 flex items-center gap-2 bg-white px-4 py-3 rounded-lg border border-gray-200">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm hợp đồng..."
              className="flex-1 outline-none text-sm"
            />
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={contracts}
            pagination={{
              page,
              limit: 10,
              total: contracts.length,
              pages: Math.ceil(contracts.length / 10),
            }}
            onPageChange={setPage}
          />
        </main>
      </div>
    </div>
  );
};

export default ContractsPage;
