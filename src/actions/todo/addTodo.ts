"use server"

import { ApiResponse } from "@/types/auth/api"
import { Task } from "@prisma/client"
import { getUser } from "../auth/getUser"

export const addTodo = async (data: Task): Promise<ApiResponse<Task>> => {

    try {

        // ユーザー情報の取得
        await getUser();

        const user = await getUser()
        if(!user.success || !user.data) {
            return {
                success: false,
                message: "タスクの追加に失敗しました。",
                data: null,
            }
        }
        const userId = user.data.id

        return {
            success: true,
            message: "タスクの追加に成功しました。",
            data: {
                id: data.id,
                title: data.title,
                endDate: data.endDate || null,
                status: data.status,
                createdAt: new Date,
                updatedAt: new Date,
                userId: userId,
            }
        }

    } catch(error) {
        console.error("予期しないエラー", error);
        return {
            success: false,
            message: "タスクの追加に失敗しました。",
            data: null,
        }
    }

}