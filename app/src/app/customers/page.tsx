"use client";

import React, { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import DataTable from "@/components/common/DataTable";
import { Plus, Edit2, Trash2, Search } from "lucide-react";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([
    {
      _id: "1",
      fullName: "Nguyễn Văn A",
      phone: "0912345678",
      email: "nguyenvana@gmail.com",
      type: "individual",
      debt: 0,
    },
    {
      _id: "2",
      fullName: "Công ty Du lịch ABC",
      phone: "0213334444",
      email: "info@abctour.com",
      type: "business",
      debt: 5000000,
    },
  ]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const columns = [
    { key: "fullName", label: "Họ tên" },
    { key: "phone", label: "Điện thoại" },
    { key: "email", label: "Email" },
    {
      key: "type",
      label: "Loại",
      render: (v: string) => (v === "individual" ? "Cá nhân" : "Doanh nghiệp"),
    },
    {
      key: "debt",
      label: "Công nợ",
      render: (v: number) => `${(v / 1000000).toFixed(1)}M VND`,
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
            <h1 className="text-3xl font-bold">Quản lý khách hàng</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus size={20} />
              Thêm khách hàng
            </button>
          </div>

          {/* Search */}
          <div className="mb-6 flex items-center gap-2 bg-white px-4 py-3 rounded-lg border border-gray-200">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, SĐT..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none text-sm"
            />
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={customers}
            pagination={{
              page,
              limit: 10,
              total: customers.length,
              pages: Math.ceil(customers.length / 10),
            }}
            onPageChange={setPage}
          />
        </main>
      </div>
    </div>
  );
};

export default CustomersPage;
