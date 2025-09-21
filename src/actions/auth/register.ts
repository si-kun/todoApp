"use server";

import { ApiResponse } from "@/types/auth/api";
import { RegisterFormData } from "@/types/auth/schemas";
import { prisma } from "@/utils/prisma/prisma";
import { createClient } from "@/utils/supabase/server";

export const register = async (
  data: RegisterFormData
): Promise<ApiResponse<void>> => {
  const supabase = await createClient();

  try {
    // Supabase Authでユーザー登録
    const supabaseAuth = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
        },
      },
    });

    // エラーハンドリング
    if (supabaseAuth.error) {
      return {
        success: false,
        message: "メールアドレスまたはパスワードが正しくありません。",
        data: null
      };
    }

    if (!supabaseAuth.data.user) {
      return {
        success: false,
        message: "ユーザー情報の取得に失敗しました。",
        data: null
      };
    }

    // prismaでユーザー情報を保存

    const prismaAuth = await prisma.user.create({
      data: {
        id: supabaseAuth.data.user.id,
        name: data.username,
        email: data.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    if (!prismaAuth) {
      return {
        success: false,
        message: "ユーザー情報の保存に失敗しました。",
        data: null
      };
    }

    return {
      success: true,
      message: "ユーザー登録が完了しました。",
      data: null
    };
  } catch (error) {
    console.error("Error during user registration:", error);
    return {
      success: false,
      message: "ユーザー登録に失敗しました。",
      data: null
    };
  }
};
