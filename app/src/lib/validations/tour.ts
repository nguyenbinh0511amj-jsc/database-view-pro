import { z } from "zod";

const baseTourSchema = z.object({
  name: z.string().min(3, "Tên tour không được để trống"),
  description: z.string().optional(),
  destination: z.string().min(2, "Điểm đến không được để trống"),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  price: z.number().positive("Giá phải là số dương"),
  spots: z.number().int().positive("Số chỗ phải là số dương"),
  guides: z.array(z.string()).optional(),
});

export const createTourSchema = baseTourSchema.refine(
  (data) => new Date(data.startDate) < new Date(data.endDate),
  {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["endDate"],
  },
);

export const updateTourSchema = baseTourSchema.partial();

export type CreateTourInput = z.infer<typeof createTourSchema>;
export type UpdateTourInput = z.infer<typeof updateTourSchema>;
