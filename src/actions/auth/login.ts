"use server";

import { ApiResponse } from "@/types/auth/api";
import { LoginFormData } from "@/types/auth/schemas";
import { createClient } from "@/utils/supabase/server";

export const login = async (data: LoginFormData): Promise<ApiResponse<void>> => {
  const supabase = await createClient();
  try {

    const supabaseAuth = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
    })

    if(supabaseAuth.error) {
        return {
            success: false,
            message: "メールアドレスまたはパスワードが正しくありません。",
            data: null
        }
    }

    if(!supabaseAuth.data.user) {
        return {
            success: false,
            message: "ユーザー情報の取得に失敗しました。",
            data: null
        }
    }

    return {
      success: true,
      message: "ログインに成功しました。",
      data: null
    };
  } catch (error) {
    console.error("予期しないエラー", error);
    return {
      success: false,
      message: "予期しないエラーが発生しました。",
      data:null
    };
  }
};
