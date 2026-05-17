"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  MapPin,
  BookOpen,
  FileText,
  DollarSign,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: "Tổng quan", href: "/dashboard" },
    { icon: Users, label: "Khách hàng", href: "/customers" },
    { icon: MapPin, label: "Tour", href: "/tours" },
    { icon: BookOpen, label: "Đặt tour", href: "/bookings" },
    { icon: FileText, label: "Hợp đồng", href: "/contracts" },
    { icon: DollarSign, label: "Dòng tiền", href: "/cash-flows" },
    { icon: Bell, label: "Thông báo", href: "/notifications" },
    { icon: Settings, label: "Cài đặt", href: "/settings" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gradient-to-b from-blue-900 to-blue-800 text-white h-screen transition-all duration-300 fixed left-0 top-0 z-40 overflow-y-auto`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-700">
        {isOpen && <h1 className="text-xl font-bold">TourPro</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-blue-700 rounded-lg"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-blue-700 transition-colors"
            title={item.label}
          >
            <item.icon size={20} />
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
          <LogOut size={20} />
          {isOpen && <span>Đăng xuất</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
