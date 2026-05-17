# Database View Pro - Setup Guide (Hướng dẫn cài đặt)

## 📋 Nội dung

1. [Cài đặt ban đầu](#cài-đặt-ban-đầu)
2. [Chạy ứng dụng](#chạy-ứng-dụng)
3. [Database Setup](#database-setup)
4. [Seed Data](#seed-data)
5. [Troubleshooting](#troubleshooting)

## 🚀 Cài đặt ban đầu

### Yêu cầu hệ thống

- Node.js 18+ (Recommended: 20+)
- npm hoặc yarn hoặc pnpm
- MongoDB 7.0+ (Local hoặc Cloud)
- Git

### Bước 1: Clone và vào project

```bash
cd e:\Code\database-view-pro\app
```

### Bước 2: Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

### Bước 3: Cấu hình environment

```bash
# Copy file .env.example thành .env.local
cp .env.example .env.local
```

Chỉnh sửa `.env.local` với các thông tin của bạn:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-view-pro?retryWrites=true&w=majority

# Hoặc nếu dùng MongoDB local:
# MONGODB_URI=mongodb://admin:password@localhost:27017/database-view-pro

# Authentication
NEXTAUTH_SECRET=generate-a-random-string-at-least-32-characters
NEXTAUTH_URL=http://localhost:3000

# JWT
JWT_SECRET=your-jwt-secret-key-at-least-32-characters

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Environment
NODE_ENV=development
```

## 🏃 Chạy ứng dụng

### Development Mode

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: **http://localhost:3000**

### Production Build

```bash
npm run build
npm run start
```

## 🗄️ Database Setup

### Option 1: MongoDB Cloud (Atlas)

1. Tạo tài khoản tại [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Tạo cluster mới
3. MongoDB Atlas sẽ cung cấp connection string tự động cho bạn
4. Sao chép connection string và thay vào `MONGODB_URI` trong `.env.local`

> Nếu bạn đã có `ATLAS_URI` sẵn trong biến môi trường, ứng dụng sẽ tự dùng giá trị đó để kết nối mà không cần phải chỉnh sửa thêm `.env.local`.

### Option 2: MongoDB Local (Docker)

```bash
# Chạy MongoDB + Mongo Express qua Docker Compose
docker-compose up -d
```

MongoDB sẽ chạy tại: `mongodb://admin:password@localhost:27017/database-view-pro`
Mongo Express UI: http://localhost:8081

**Credentials:**

- Username: `admin`
- Password: `password`

### Option 3: MongoDB Local (Manual)

1. Cài đặt MongoDB từ [mongodb.com](https://www.mongodb.com/try/download/community)
2. Chạy MongoDB service
3. Cấu hình connection string trong `.env.local`

## 🌱 Seed Data

Tạo dữ liệu mẫu để test ứng dụng:

```bash
npm run seed
```

Script này sẽ tạo:

- ✅ 2 tài khoản demo (Admin + Staff)
- ✅ 3 khách hàng mẫu
- ✅ 3 tour mẫu

## 👤 Tài khoản Demo

Sau khi chạy `npm run seed`, sử dụng:

### Admin Account

- **Email**: `admin@tourpro.com`
- **Password**: `admin123`

### Staff Account

- **Email**: `staff@tourpro.com`
- **Password**: `staff123`

## 📁 Cấu trúc Project

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API Routes
│   ├── dashboard/      # Dashboard page
│   ├── customers/      # Customers management
│   ├── tours/          # Tours management
│   ├── bookings/       # Bookings management
│   ├── contracts/      # Contracts management
│   ├── cash-flows/     # Cash flows management
│   ├── notifications/  # Notifications page
│   └── settings/       # Settings page
├── components/         # React components
│   ├── common/         # Common components (Sidebar, Header, etc.)
│   └── dashboard/      # Dashboard components
├── lib/               # Utilities
│   ├── mongodb/       # MongoDB connection
│   ├── auth/          # Auth utilities
│   ├── validations/   # Zod schemas
│   └── utils.ts       # Helper functions
├── models/            # MongoDB models
├── types/             # TypeScript types
└── hooks/             # Custom React hooks
```

## 🔑 API Endpoints

### Authentication

```
POST /api/auth/login
POST /api/auth/register
```

### Customers

```
GET    /api/customers
POST   /api/customers
GET    /api/customers/[id]
PUT    /api/customers/[id]
DELETE /api/customers/[id]
```

### Tours

```
GET    /api/tours
POST   /api/tours
GET    /api/tours/[id]
PUT    /api/tours/[id]
DELETE /api/tours/[id]
```

### Bookings

```
GET    /api/bookings
POST   /api/bookings
GET    /api/bookings/[id]
PUT    /api/bookings/[id]
DELETE /api/bookings/[id]
```

### Dashboard

```
GET /api/dashboard/stats
```

## 🚨 Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Giải pháp:**

- Kiểm tra MongoDB service đang chạy
- Hoặc sử dụng MongoDB Atlas cloud
- Hoặc chạy Docker: `docker-compose up -d`

### Port 3000 already in use

```bash
# Chạy trên port khác
PORT=3001 npm run dev
```

### Dependencies conflict

```bash
# Xoá node_modules và cài lại
rm -r node_modules
npm install
```

### Build error

```bash
# Clear Next.js cache
rm -r .next
npm run build
```

## 📦 Deployment

### Vercel (Recommended)

1. Push code lên GitHub
2. Vào Vercel và import repo
3. Nếu cần, chọn `Root Directory` là `app`
4. Thêm environment variables:
   - `MONGODB_URI`
   - `ATLAS_URI` (nếu dùng)
   - `NEXTAUTH_SECRET`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_API_URL`
5. Deploy và kiểm tra link web được tạo bởi Vercel

Bạn cũng có thể deploy bằng CLI:

```bash
cd e:\Code\database-view-pro
vercel --prod
```

### Docker

```bash
# Build image
docker build -t tourpro .

# Run container
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb+srv://... \
  tourpro
```

### Traditional Server

```bash
npm run build
npm run start
```

## 📞 Support

Nếu gặp vấn đề:

1. Kiểm tra `.env.local` configuration
2. Xem logs của MongoDB
3. Kiểm tra Node.js version
4. Xoá `node_modules` và cài lại

---

**Chúc bạn sử dụng ứng dụng thành công! 🎉**
