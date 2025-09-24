"use client";

import { logout } from "@/actions/auth/logout";
import { deleteTodo } from "@/actions/todo/deleteTodo";
import { toggleStatus } from "@/actions/todo/toggleStatus";
import { taskAtom } from "@/atom/taskAtom";
import { userAtom } from "@/atom/userAtom";
import TaskModal from "@/components/addTaskModal/TaskModal";
import { Button } from "@/components/ui/button";
import { FOOTER_MENUS } from "@/constants/footerMenu";
import { fetchTodos } from "@/lib/fetchTodos";
import { useAtom, useSetAtom } from "jotai";
import { ClipboardList, Ellipsis } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [toggleMenuId, setToggleMenuId] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [tasks, setTasks] = useAtom(taskAtom);
  const setUser = useSetAtom(userAtom);

  const router = useRouter();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const loadTasks = await fetchTodos();
        setTasks(loadTasks);
      } catch (error) {
        console.error("タスクの取得に失敗しました", error);
      }
    };
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleMenu = (id: string) => {
    setToggleMenuId((prevId) => (prevId === id ? null : id));
  };

  const editingTask = tasks.find((task) => task.id === editingTaskId) || null;

  // タスクステータス切り替え処理
  const handleToggleStatus = async (id: string) => {
    try {
      // ステータス切り替えのAPI呼び出し
      const result = await toggleStatus(id);
      if (!result.success) {
        throw new Error("タスクのステータス変更に失敗しました");
      }
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                status: task.status === "Active" ? "Completed" : "Active",
              }
            : task
        )
      );
      setToggleMenuId(null);
    } catch (error) {
      console.error("タスクのステータス変更に失敗しました", error);
      // エラー時にタスクを再取得する
      const loadTasks = await fetchTodos();
      setTasks(loadTasks);
    }
  };

  // タスク削除処理
  const handleDeleteTask = async (id: string) => {
    try {
      // 削除APIの呼び出し
      const result = await deleteTodo(id);
      if (!result.success) {
        throw new Error("タスクの削除に失敗しました");
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      setToggleMenuId(null);
    } catch (error) {
      console.error("タスクの削除に失敗しました", error);
      // エラー時に再度タスクを取得する
      const loadTasks = await fetchTodos();
      setTasks(loadTasks);
    }
  };

  const handleEditTask = (id: string) => {
    setEditingTaskId((prev) => (prev === id ? null : id));
    setToggleMenuId(null);
    console.log("edit state", editingTaskId);
    console.log("edit", id);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      router.replace("/login");
      console.log("ログアウト成功");
    } catch (error) {
      console.error("ログアウトエラー", error);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-y-hidden">
      <header className="min-h-[60px] flex items-center justify-center gap-2 bg-blue-300 text-white relative">
        <ClipboardList />
        <h1 className="font-bold">Todo App</h1>
        <TaskModal
          mode={"add"}
          taskModalOpen={taskModalOpen}
          setTaskModalOpen={setTaskModalOpen}
        />
      </header>

      <table className="w-full justify-center flex flex-col flex-1 overflow-y-auto">
        <thead className="w-full">
          <tr className="bg-gray-200 flex items-center gap-4 p-4 text-sm font-bold">
            <th className="flex-1">Task</th>
            <th className="w-[72px]">EndDate</th>
            <th className="w-[70px]">Status</th>
            <th className="w-[50px]">Actions</th>
          </tr>
        </thead>
        <tbody className="w-full flex-1 overflow-y-auto max-h-[calc(100vh-120px)]">
          {tasks.map((data) => (
            <tr
              key={data.id}
              className="flex items-center justify-between gap-4 p-4 border-b text-sm"
            >
              <td className="flex-1 text-center">
                {data.title.length >= 10
                  ? data.title.slice(0, 10) + "..."
                  : data.title}
              </td>
              <td className="w-[72px] text-center">
                {data.endDate
                  ? new Date(data.endDate).toLocaleDateString()
                  : "未定"}
              </td>
              <td
                className={`w-[74px] text-center text-white rounded-full ${
                  data.status === "Completed" ? "bg-green-500" : "bg-blue-400"
                }`}
              >
                {data.status === "Completed" ? "Completed" : "Active"}
              </td>
              <td className="w-[50px] flex items-center justify-center cursor-pointer relative">
                <Ellipsis
                  className={` rounded-full text-white ${
                    toggleMenuId === data.id ? "bg-yellow-400" : "bg-gray-400"
                  }`}
                  onClick={() => handleToggleMenu(data.id)}
                />

                {toggleMenuId === data.id && (
                  <ul className="absolute top-8 right-0 bg-white border shadow-md rounded-md text-gray-700 p-1 z-50 flex flex-col">
                    <li
                      onClick={() => handleToggleStatus(data.id)}
                      className="hover:bg-blue-400 hover:text-white p-1 rounded-md"
                    >
                      {data.status === "Completed" ? "active" : "completed"}
                    </li>
                    <li
                      onClick={() => handleEditTask(data.id)}
                      className="hover:bg-blue-400 hover:text-white p-1 rounded-md"
                    >
                      edit
                    </li>
                    <li
                      onClick={() => handleDeleteTask(data.id)}
                      className="hover:bg-blue-400 hover:text-white p-1 rounded-md"
                    >
                      delete
                    </li>
                  </ul>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingTaskId && (
        <TaskModal
          mode={"edit"}
          editingTask={editingTask}
          taskModalOpen={Boolean(editingTaskId)}
          setTaskModalOpen={() => setEditingTaskId(null)}
        />
      )}

      <footer className="bg-blue-300 flex items-center justify-center min-h-[60px] w-full">
        <ul className="flex items-center justify-between w-full">
          {FOOTER_MENUS.map((menu) => (
            <li key={menu.name} className="p-2">
              {menu.name === "logout" ? (
                <Button variant={"ghost"} onClick={() => handleLogout()}>
                  {menu.icon}
                </Button>
              ) : (
                <Button asChild variant={"ghost"}>
                  <Link href={menu.href}>{menu.icon}</Link>
                </Button>
              )}
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
