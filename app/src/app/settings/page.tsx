"use client";

import React, { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import { Settings as SettingsIcon, Save } from "lucide-react";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    appName: "TourPro",
    appEmail: "admin@tourpro.com",
    darkMode: false,
    notifications: true,
    emailNotifications: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    alert("Cài đặt đã được lưu!");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-20 lg:ml-64 bg-gray-50 min-h-screen">
        <Header />
        <main className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <SettingsIcon size={32} className="text-gray-900" />
            <h1 className="text-3xl font-bold">Cài đặt</h1>
          </div>

          {/* Settings Sections */}
          <div className="space-y-8">
            {/* General Settings */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Cài đặt chung</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên ứng dụng
                  </label>
                  <input
                    type="text"
                    name="appName"
                    value={settings.appName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email ứng dụng
                  </label>
                  <input
                    type="email"
                    name="appEmail"
                    value={settings.appEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Giao diện</h2>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Chế độ tối
                </label>
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Thông báo</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Thông báo trong ứng dụng
                  </label>
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Thông báo qua email
                  </label>
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save size={20} />
              Lưu cài đặt
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
