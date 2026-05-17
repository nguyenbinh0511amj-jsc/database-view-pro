import { z } from "zod";

export const createCustomerSchema = z.object({
  type: z.enum(["individual", "business"]),
  fullName: z.string().min(2, "Tên không được để trống"),
  phone: z.string().regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  idNumber: z.string().min(9, "CCCD/Passport không hợp lệ"),
  address: z.string().min(5, "Địa chỉ không được để trống"),
  notes: z.string().optional(),
});

export const updateCustomerSchema = createCustomerSchema.partial();

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
