"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema, FormValues } from "@/app/lib/schema"
import { registerAction } from "@/app/actions/register"
import { useState } from "react"

export default function RegisterPage() {
  const [serverMessage, setServerMessage] = useState<string | null>(null)

  const {
    register,       // ← Uncontrolled: KHÔNG dùng useState cho từng field
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema), // Zod validate tự động
  })

  const onSubmit = async (data: FormValues) => {
    setServerMessage(null)
    const result = await registerAction(data)
    setServerMessage(result.message)
    if (result.success) reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1>Đăng ký thành viên</h1>

      {/* Tên */}
      <div>
        <label>Tên</label>
        <input {...register("name")} placeholder="Nguyễn Văn A" />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label>Email</label>
        <input {...register("email")} type="email" placeholder="example@email.com" />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      {/* Mật khẩu */}
      <div>
        <label>Mật khẩu</label>
        <input {...register("password")} type="password" />
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
      </div>

      {/* Xác nhận mật khẩu */}
      <div>
        <label>Xác nhận mật khẩu</label>
        <input {...register("confirmPassword")} type="password" />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
      </button>

      {/* Thông báo từ Server */}
      {serverMessage && <p>{serverMessage}</p>}
    </form>
  )
}