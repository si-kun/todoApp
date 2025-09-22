"use server";

import { ApiResponse } from "@/types/auth/api";
import { Task } from "@prisma/client";
import { getUser } from "../auth/getUser";
import { prisma } from "@/utils/prisma/prisma";

export const getAllTodos = async (): Promise<ApiResponse<Task[]>> => {
  try {
    const user = await getUser();

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "タスクの取得に失敗しました。",
        data: null,
      };
    }

    const userId = user.data.id;

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      message: "タスクの取得に成功しました。",
      data: tasks,
    };
  } catch (error) {
    console.error("予期しないエラー", error);
    return {
      success: false,
      message: "タスクの取得に失敗しました。",
      data: null,
    };
  }
};
