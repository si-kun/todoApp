import z from "zod";

export const taskSchema = z.object({
    title: z.string().min(1, "タスク名を入力してください").max(20, "タスク名は20文字以下で入力してください"),
    endDate: z.date().optional(),
    status: z.literal("Active"),
})

export const editTaskSchema = z.object({
    title: z.string().min(1, "タスク名を入力してください").max(20, "タスク名は20文字以下で入力してください"),
    endDate: z.date().optional(),
    status: z.enum(["Active", "Completed"]),
})

export type EditTaskFormData = z.infer<typeof editTaskSchema>;
export type TaskFormData = z.infer<typeof taskSchema>;