"use client";

import { logout } from "@/actions/auth/logout";
import { taskAtom } from "@/atom/taskAtom";
import { userAtom } from "@/atom/userAtom";
import AddTaskModal from "@/components/addTaskModal/AddTaskModal";
import { Button } from "@/components/ui/button";
import { FOOTER_MENUS } from "@/constants/footerMenu";
import { useAtomValue, useSetAtom } from "jotai";
import { ClipboardList, Ellipsis } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const tasks = useAtomValue(taskAtom);
  const setUser = useSetAtom(userAtom);

  const router = useRouter()

  // const handleToggleMenu = (id: string) => {
  //   console.log(id);

  //   // クリックしたらtoggleMenuの値を反転させる
  //   setDammyData((prevData) =>
  //     prevData.map((data) =>
  //       data.id === id
  //         ? { ...data, toggleMenu: !data.toggleMenu }
  //         : { ...data, toggleMenu: false }
  //     )
  //   );
  // };

  // const handleToggleStatus = (id: string) => {
  //   setDammyData((prevData) =>
  //     prevData.map((data) =>
  //       data.id === id
  //         ? {
  //             ...data,
  //             status: data.status === "Completed" ? "Active" : "Completed",
  //             toggleMenu: false,
  //           }
  //         : data
  //     )
  //   );
  // };

  // const handleDeleteTask = (id: string) => {
  //   setDammyData((prevData) => prevData.filter((data) => data.id !== id));
  // };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      router.replace("/login")
      console.log("ログアウト成功");
    } catch (error) {
      console.error("ログアウトエラー", error);
    }
  };

  return (
    <div>
      <header className="flex  items-center justify-center gap-2 p-4 bg-blue-300 text-white relative">
        <ClipboardList />
        <h1 className="font-bold">Todo App</h1>
        <AddTaskModal
          addTaskModalOpen={addTaskModalOpen}
          setAddTaskModalOpen={setAddTaskModalOpen}
        />
      </header>

      <table className="w-full flex flex-col items-center justify-center">
        <thead className="w-full">
          <tr className="bg-gray-200 flex items-center gap-4 p-4 text-sm font-bold">
            <th className="flex-1">Task</th>
            <th className="w-[72px]">EndDate</th>
            <th className="w-[70px]">Status</th>
            <th className="w-[50px]">Actions</th>
          </tr>
        </thead>
        <tbody className="w-full">
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
                  className="bg-gray-400 rounded-full text-white"
                  onClick={() => handleToggleMenu(data.id)}
                />

                {data.toggleMenu && (
                  <ul className="absolute top-8 right-0 bg-white border shadow-md rounded-md text-gray-700 p-1 z-50">
                    <li
                      onClick={() => handleToggleStatus(data.id)}
                      className="hover:bg-blue-400 hover:text-white p-1 rounded-md"
                    >
                      {data.status === "Completed" ? "active" : "completed"}
                    </li>
                    <li className="hover:bg-blue-400 hover:text-white p-1 rounded-md">
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

      <footer className="bg-blue-300 p-2 fixed bottom-0 w-full">
        <ul className="flex items-center justify-between ">
          {FOOTER_MENUS.map((menu) => (
            <li key={menu.name} className="p-2">
              {menu.name === "logout" ? (

              <Button variant={"ghost"} onClick={() => handleLogout()} >
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
