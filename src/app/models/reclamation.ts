import { Employee } from "./employee";

export interface Reclamation {
    id: number;
    comment: string;
    employee: Employee;
}