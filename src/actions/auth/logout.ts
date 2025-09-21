"use server";

import { ApiResponse } from "@/types/auth/api";
import { createClient } from "@/utils/supabase/server";

export const logout = async (): Promise<ApiResponse<void>> => {
  const supabase = await createClient();

  try {
    const result = await supabase.auth.signOut();

    if (result.error) {
      return {
        success: false,
        message: "ログアウトに失敗しました",
        data: null,
      };
    } else {
      return {
        success: true,
        message: "ログアウトしました",
        data: null,
      };
    }
  } catch (error) {
    console.error("ログアウトエラー", error);
    return {
      success: false,
      message: "ログアウトに失敗しました",
      data: null,
    };
  }
};
