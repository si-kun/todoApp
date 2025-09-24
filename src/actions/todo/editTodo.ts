"use server"

import { ApiResponse } from "@/types/auth/api";
import { getUser } from "../auth/getUser";
import { prisma } from "@/utils/prisma/prisma";
import { EditTaskFormData } from "@/types/task/schema";

export const editTodo = async (id: string, data: EditTaskFormData):Promise<ApiResponse<null>> => {

    try {

        const user = await getUser();

        if (!user.success || !user.data) {
            return {
                success: false,
                message: "タスクの編集に失敗しました。",
                data: null,
            };
        }

        const userId = user.data.id;

        await prisma.task.update({
            where: {
                id,
                userId,
            },
            data: {
                title: data.title,
                endDate: data.endDate,
                status: data.status,
            }
        })

        return {
            success: true,
            message: "タスクの編集に成功しました。",
            data: null,
        }
    } catch (error) {
        console.error("予期しないエラー", error);
        return {
            success: false,
            message: "タスクの編集に失敗しました。",
            data: null,
        };
    }
}