import { TaskType } from "./TaskType";
import { ColorPair } from "./ColorPair";

export interface TodolistData {
    id: string;
    toDoList: TaskType[];
    name: string;
    color: ColorPair;
}