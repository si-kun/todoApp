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
import { useState } from "react";
import { Task } from "@/types/task";

interface AddTaskModalProps {
    addTaskModalOpen: boolean,
    setAddTaskModalOpen: (open: boolean) => void
}

const AddTaskModal = ({addTaskModalOpen,setAddTaskModalOpen}:AddTaskModalProps) => {
  const setTasks = useSetAtom(taskAtom);

  const [newTask, setNewTask] = useState<Task>({
    id: "",
    task: "",
    endDate: null,
    status: "Active",
    toggleMenu: false,
  });

  const handleNewTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask((prev) => ({
      ...prev,
      task: e.target.value,
    }));
  };

  const handleEndDate = (date: Date) => {
    setNewTask((prev) => ({
        ...prev,
        endDate: date,
    }))
    console.log(date)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskToAdd = {
        ...newTask,
        id: crypto.randomUUID(),
    }
    
    setTasks((prev) => [...prev, taskToAdd]);
    console.log(newTask);
    setAddTaskModalOpen(false)
  };

  return (
    <Dialog open={addTaskModalOpen} onOpenChange={setAddTaskModalOpen}>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild className="absolute right-4 top-2.5">
          <Button variant={"outline"}>
            <ListPlus className="text-black" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Todo</DialogTitle>
            <DialogDescription>新しくタスクを追加します。</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>タスク名</Label>
              <Input
                onChange={handleNewTask}
                placeholder="タスク名を入力してください"
              />
            </div>
            <div>
              <InputDate handleEndDate={handleEndDate} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit} type="submit" variant={"outline"} className="bg-green-300">
              Add New Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddTaskModal;
