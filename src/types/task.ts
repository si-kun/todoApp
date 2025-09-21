export interface Task {
    id: string;
    task: string;
    endDate: Date | null;
    status: "Active" | "Completed";
    toggleMenu: boolean;
}