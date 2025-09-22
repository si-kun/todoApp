"use server";

import { ApiResponse } from "@/types/auth/api";
import { Task } from "@prisma/client";
import { getUser } from "../auth/getUser";
import { prisma } from "@/utils/prisma/prisma";
import { TaskFormData } from "@/types/task/schema";

export const addTodo = async (
  data: TaskFormData
): Promise<ApiResponse<Task>> => {
  try {
    // ユーザー情報の取得
    const user = await getUser();
    if (!user.success || !user.data) {
      return {
        success: false,
        message: "タスクの追加に失敗しました。",
        data: null,
      };
    }
    const userId = user.data.id;

    const newTask = await prisma.task.create({
      data: {
        title: data.title,
        endDate: data.endDate,
        status: data.status,
        userId: userId,
      },
    });

    if (!newTask) {
      return {
        success: false,
        message: "タスクの追加に失敗しました。",
        data: null,
      };
    }

    return {
      success: true,
      message: "タスクの追加に成功しました。",
      data: newTask,
    };
  } catch (error) {
    console.error("予期しないエラー", error);
    return {
      success: false,
      message: "タスクの追加に失敗しました。",
      data: null,
    };
  }
};
