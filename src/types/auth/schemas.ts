import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(2, "ユーザー名は2文字以上で入力してください").max(10,"ユーザー名は10文字以下で入力してください"),
    email: z.email("有効なメールアドレスを入力してください"),
    password: z.string().min(6, "パスワードは6文字以上で入力してください").max(20,"パスワードは20文字以下で入力してください"),
})

export const loginSchema = z.object({
    email: z.email("有効なメールアドレスを入力してください"),
    password: z.string().min(6, "パスワードは6文字以上で入力してください").max(20,"パスワードは20文字以下で入力してください"),
})

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;