import { TaskType } from "./TaskType";
import { ColorPair } from "./ColorPair";

export interface TodolistData {
    toDoList: TaskType[];
    name: string;
    color: ColorPair;
}