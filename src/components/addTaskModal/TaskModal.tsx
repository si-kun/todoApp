import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ListPlus } from "lucide-react";
import InputDate from "../date/InputDate";
import { useSetAtom } from "jotai";
import { taskAtom } from "@/atom/taskAtom";
import { addTodo } from "@/actions/todo/addTodo";
import { Controller, useForm } from "react-hook-form";
import { EditTaskFormData, editTaskSchema } from "@/types/task/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@prisma/client";
import { editTodo } from "@/actions/todo/editTodo";
interface TaskModalProps {
  taskModalOpen: boolean;
  setTaskModalOpen: (open: boolean) => void;
  mode: "add" | "edit";
  editingTask?: Task | null;
}

const TaskModal = ({
  taskModalOpen,
  setTaskModalOpen,
  mode,
  editingTask,
}: TaskModalProps) => {
  const setTasks = useSetAtom(taskAtom);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditTaskFormData>({
    resolver: zodResolver(editTaskSchema),
    mode: "onChange",
    defaultValues:
      mode === "edit" && editingTask
        ? {
            title: editingTask.title,
            endDate: editingTask.endDate
              ? new Date(editingTask.endDate)
              : undefined,
            status: editingTask.status as "Active" | "Completed",
          }
        : {
            title: "",
            endDate: undefined,
            status: "Active",
          },
  });

  const handleTaskSubmit = async (data: EditTaskFormData) => {
    try {
      if (mode === "edit" && editingTask) {

        const result = await editTodo(editingTask.id, data);
        if (result.success) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === editingTask.id ? {...task, ...data} : task
            )
          );
        }

      } else {
        const addData = {
          ...data,
          status: "Active" as const,
        };
        const result = await addTodo(addData);

        if (result.success) {
          setTasks((prevTasks) => [...prevTasks, result.data as Task]);
        }
      }

      reset();
      setTaskModalOpen(false);
    } catch (error) {
      console.error("予期しないエラー", error);
    }
  };

  return (
    <Dialog open={taskModalOpen} onOpenChange={setTaskModalOpen}>
      <DialogTrigger
        asChild
        className="absolute right-0 top-[50%] transform -translate-[50%]"
      >
        {mode === "add" ? (
          <Button variant={"outline"}>
            <ListPlus className="text-black" />
          </Button>
        ) : (
          "Edit"
        )}
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={handleSubmit(handleTaskSubmit)}
          className="flex flex-col gap-6"
        >
          <DialogHeader>
            <DialogTitle>New Todo</DialogTitle>
            <DialogDescription>新しくタスクを追加します。</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col space-y-1.5 relative">
              <Label>タスク名</Label>
              <Input
                placeholder="タスク名を入力してください"
                {...register("title")}
              />
              {errors.title && (
                <span className="absolute right-0 text-xs text-red-600">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <InputDate value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant={"outline"} className="bg-green-300">
              {mode === "edit" ? "Edit Task" : "Add New Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
