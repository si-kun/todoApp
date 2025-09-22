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
import { TaskFormData, taskSchema } from "@/types/task/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@prisma/client";
// import { Task } from "@/types/task/task";
interface AddTaskModalProps {
  addTaskModalOpen: boolean;
  setAddTaskModalOpen: (open: boolean) => void;
}

const AddTaskModal = ({
  addTaskModalOpen,
  setAddTaskModalOpen,
}: AddTaskModalProps) => {
  const setTasks = useSetAtom(taskAtom);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      endDate: undefined,
      status: "Active",
    },
  });

  const handleAddTask = async (data: TaskFormData) => {
    try {
      const result = await addTodo(data);

      if (result.success && result.data) {
        setTasks((prevTasks) => [...prevTasks, result.data as Task]);
        reset();
        setAddTaskModalOpen(false);
      } else {
        console.error("タスクの追加に失敗しました。", result.message);
      }
    } catch (error) {
      console.error("予期しないエラー", error);
    }
  };

  return (
    <Dialog open={addTaskModalOpen} onOpenChange={setAddTaskModalOpen}>
      <DialogTrigger asChild className="absolute right-4 top-2.5">
        <Button variant={"outline"}>
          <ListPlus className="text-black" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={handleSubmit(handleAddTask)}
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
              Add New Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
