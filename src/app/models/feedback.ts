import { Employee } from "./employee";

export interface Feedback {
    id: number;
    note: string;
    employee: Employee;
}