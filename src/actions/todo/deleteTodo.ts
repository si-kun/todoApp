"use server";

import { ApiResponse } from "@/types/auth/api";
import { getUser } from "../auth/getUser";
import { prisma } from "@/utils/prisma/prisma";

export const deleteTodo = async (id: string):Promise<ApiResponse<null>> => {

    try {

        const user = await getUser();
        if (!user.success || !user.data) {
            return {
                success: false,
                message: "タスクの削除に失敗しました。",
                data: null,
            }
        }

        const userId = user.data.id;

        await prisma.task.delete({
            where: {
                id,
                userId,
            }
        })

        return {
            success: true,
            message: "タスクの削除に成功しました。",
            data: null,
        }
    } catch (error) {
        console.error("予期しないエラー", error);
        return {
            success: false,
            message: "タスクの削除に失敗しました。",
            data: null,
        }
    }
}