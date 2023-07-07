import { TaskType } from "@/types/TaskType";
import { List } from "@mantine/core";
import { Task } from "./Task";

interface TodolistProps {
    tasks: TaskType[];
    onChange: (task: TaskType) => void;
}

export function Todolist(props: TodolistProps) {
    return (
        <List listStyleType="none" spacing="md">
            {props.tasks.map((elem, key)=> <Task key={key} {...elem} onChange={props.onChange}/>)}
        </List>
    )
}