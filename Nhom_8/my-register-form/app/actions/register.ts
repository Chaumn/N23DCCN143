"use server"

import { formSchema, FormValues } from "@/app/lib/schema"

export async function registerAction(data: FormValues) {
  const result = formSchema.safeParse(data)

  if (!result.success) {
    return { success: false, message: result.error.issues[0].message }
  }

  console.log("Dữ liệu sạch:", result.data)
  return { success: true, message: "Đăng ký thành công!" }
}