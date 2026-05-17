"use client";

import React, { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import { Bell, X, Check } from "lucide-react";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      _id: "1",
      type: "booking",
      title: "Đặt tour mới",
      message: "Nguyễn Văn A vừa đặt tour Sapa 3 ngày",
      isRead: false,
      date: "2026-01-15 14:30",
    },
    {
      _id: "2",
      type: "contract",
      title: "Hợp đồng sắp hết hạn",
      message: "Hợp đồng HD-202601-001 còn 15 ngày nữa là hết hạn",
      isRead: false,
      date: "2026-01-15 13:45",
    },
    {
      _id: "3",
      type: "debt",
      title: "Công nợ quá hạn",
      message: "Công ty ABC có công nợ quá hạn 5000000 VND",
      isRead: true,
      date: "2026-01-15 12:00",
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif._id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif._id !== id));
  };

  const typeColors = {
    booking: "border-blue-200 bg-blue-50",
    contract: "border-yellow-200 bg-yellow-50",
    debt: "border-red-200 bg-red-50",
    tour: "border-green-200 bg-green-50",
    system: "border-gray-200 bg-gray-50",
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-20 lg:ml-64 bg-gray-50 min-h-screen">
        <Header />
        <main className="p-8">
          <h1 className="text-3xl font-bold mb-8">Thông báo</h1>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <Bell size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Không có thông báo nào</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif._id}
                  className={`p-4 rounded-lg border-l-4 flex items-start justify-between ${
                    typeColors[notif.type as keyof typeof typeColors]
                  } ${!notif.isRead ? "border-l-blue-600" : "border-l-gray-300"}`}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {notif.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {notif.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">{notif.date}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!notif.isRead && (
                      <button
                        onClick={() => markAsRead(notif._id)}
                        className="p-2 text-blue-600 hover:bg-white rounded-lg transition-colors"
                        title="Đánh dấu đã đọc"
                      >
                        <Check size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notif._id)}
                      className="p-2 text-red-600 hover:bg-white rounded-lg transition-colors"
                      title="Xóa"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotificationsPage;
