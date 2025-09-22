// export interface Task {
//     id: string;
//     task: string;
//     endDate: Date | undefined;
//     status: "Active" | "Completed";
//     toggleMenu: boolean;
// }

export interface AddNewTask {
    title: string;
    endDate: Date | null;
    status: "Active" | "Completed";
    userId: string;
    toggleMenu: boolean;
}