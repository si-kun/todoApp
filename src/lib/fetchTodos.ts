"use client";

import { getAllTodos } from "@/actions/todo/getAllTodos";

export const fetchTodos = async () => {
  try {
    const tasks = await getAllTodos();

    if (tasks.success && tasks.data) {
      return tasks.data;
    } else {
      throw new Error("タスクの取得に失敗しました。");
    }
  } catch (error) {
    console.error("予期しないエラー", error);
    throw error;
  }
};
