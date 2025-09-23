"use server";

import { ApiResponse } from "@/types/auth/api";
import { getUser } from "../auth/getUser";
import { prisma } from "@/utils/prisma/prisma";

export const toggleStatus = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const user = await getUser();
    if (!user.success || !user.data) {
      return {
        success: false,
        message: "タスクのステータス変更に失敗しました。",
        data: null,
      };
    }

    const userId = user.data.id;

    const currentTask = await prisma.task.findUnique({
        where: {
            id,
            userId,
        }
    })

    if(!currentTask) {
        return {
            success: false,
            message: "タスクが見つかりません。",
            data: null,
        };
    }

    await prisma.task.update({
      where: {
        id,
        userId,
      },
      data: {
        status: currentTask?.status === "Active" ? "Completed" : "Active",
      }
    });

    return {
      success: true,
      message: "タスクのステータス変更に成功しました。",
      data: null,
    };
  } catch (error) {
    console.error("予期しないエラー", error);
    return {
      success: false,
      message: "タスクのステータス変更に失敗しました。",
      data: null,
    };
  }
};
