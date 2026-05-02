import { z } from "zod"

export const formSchema = z
  .object({
    name: z.string().min(1, "Tên không được để trống"),
    email: z.string().email("Email không hợp lệ"),
    password: z
      .string()
      .min(8, "Tối thiểu 8 ký tự")
      .regex(/[A-Z]/, "Cần 1 chữ hoa")
      .regex(/[0-9]/, "Cần ít nhất 1 số"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  })

export type FormValues = z.infer<typeof formSchema>