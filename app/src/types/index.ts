// User Types
export interface IUser {
  _id: string;
  email: string;
  password: string;
  fullName: string;
  avatar?: string;
  role: "admin" | "accountant" | "tour_manager" | "sales" | "staff";
  phone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Customer Types
export interface ICustomer {
  _id: string;
  type: "individual" | "business";
  fullName: string;
  phone: string;
  email: string;
  idNumber: string; // CCCD/Passport
  address: string;
  notes?: string;
  debt: number;
  createdAt: Date;
  updatedAt: Date;
}

// Tour Types
export interface ITour {
  _id: string;
  name: string;
  description?: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  price: number;
  spots: number;
  availableSpots: number;
  status: "planning" | "active" | "completed" | "cancelled";
  guides: string[]; // User IDs
  expenses?: number;
  profit?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Booking Types
export interface IBooking {
  _id: string;
  bookingCode: string;
  customerId: string;
  tourId: string;
  numberOfPeople: number;
  totalPrice: number;
  paymentStatus: "pending" | "partial" | "paid";
  paidAmount: number;
  status: "confirmed" | "pending" | "cancelled";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Contract Types
export interface IContract {
  _id: string;
  customerId: string;
  contractNumber: string;
  startDate: Date;
  endDate: Date;
  status: "active" | "expired" | "terminated";
  fileUrl?: string;
  details?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Cash Flow Types
export interface ICashFlow {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  relatedBookingId?: string;
  relatedTourId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Notification Types
export interface INotification {
  _id: string;
  userId: string;
  type: "booking" | "contract" | "debt" | "tour" | "system";
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: Date;
}

// Dashboard Stats
export interface IDashboardStats {
  totalRevenue: number;
  totalCustomers: number;
  activeTours: number;
  totalBookings: number;
  pendingContracts: number;
  overduedDebt: number;
  revenueByDate?: Array<{ date: string; amount: number }>;
  revenueByTour?: Array<{ tourName: string; amount: number }>;
}
