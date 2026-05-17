# TourPro - Hệ thống Quản lý Tour Du lịch

Ứng dụng quản lý tour du lịch chuyên nghiệp với giao diện SaaS hiện đại, được xây dựng bằng Next.js 16, TypeScript, TailwindCSS, và MongoDB.

## 🌟 Chức năng chính

### 1. Dashboard Tổng quan

- Tổng doanh thu theo ngày/tháng/năm
- Số lượng khách hàng
- Tour đang hoạt động
- Hợp đồng sắp hết hạn
- Biểu đồ doanh thu và dòng tiền
- Thống kê booking

### 2. Quản lý Khách hàng (CRM)

- CRUD khách hàng (cá nhân/doanh nghiệp)
- Lưu thông tin chi tiết
- Lịch sử tour đã đi
- Theo dõi công nợ
- Upload file hợp đồng
- Tìm kiếm/lọc nâng cao

### 3. Quản lý Tour Du lịch

- CRUD tour
- Lịch khởi hành
- Quản lý giá & chỗ ngồi
- Quản lý hướng dẫn viên
- Danh sách khách tham gia

### 4. Quản lý Booking

- Đặt tour & xác nhận
- Trạng thái thanh toán
- Mã booking tự động

### 5. Quản lý Hợp đồng

- Quản lý thời hạn
- Cảnh báo hết hạn
- Upload PDF hợp đồng

### 6. Quản lý Dòng tiền

- Thu/chi
- Báo cáo lãi lỗ
- Thống kê chi phí

## 🛠️ Công nghệ sử dụng

- **Frontend**: Next.js 16, React 19, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT

## 📦 Cài đặt

### Bước 1: Cài đặt dependencies

```bash
npm install
```

### Bước 2: Cấu hình environment

Tạo file `.env.local` từ `.env.example`:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-view-pro
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=your-jwt-secret
```

### Bước 3: Chạy development server

```bash
npm run dev
```

Ứng dụng chạy tại: [http://localhost:3000](http://localhost:3000)

## 🚀 Production Build

```bash
npm run build
npm run start
```

---

Được tạo bởi GitHub Copilot
