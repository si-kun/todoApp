"use server"

import { ApiResponse } from "@/types/auth/api";
import { prisma } from "@/utils/prisma/prisma";
import { createClient } from "@/utils/supabase/server"
import { User } from "@prisma/client";

export const getUser = async (): Promise<ApiResponse<User | null>> => {

    const supabase = await createClient();

    try {

        const auth = await supabase.auth.getUser();

        if (auth.error || !auth.data.user) {
            return {
                success: false,
                message: "ユーザー情報の取得に失敗しました。",
                data: null,
            }
        }

        const prismaUser = await prisma.user.findUnique({
            where: {
                id: auth.data.user.id
            }
        })

        if(!prismaUser) {
            return {
                success: false,
                message: "ユーザー情報の取得に失敗しました。",
                data: null,
            }
        }

        return {
            success: true,
            message: "ユーザー情報の取得に成功しました。",
            data: prismaUser
        }

    } catch (error) {
        console.error("予期しないエラー", error);
        return {
            success: false,
            message: "ユーザー情報の取得に失敗しました。",
            data: null,
        }
    }
}