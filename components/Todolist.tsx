import { TaskType } from "@/types/TaskType";
import { List } from "@mantine/core";
import { Task } from "./Task";

interface TodolistProps {
    tasks: TaskType[];
    onChange: (task: TaskType) => void;
    onDelete: (task: TaskType) => void;
    onEdit: (task: TaskType, e:string) => void;
}

export function Todolist(props: TodolistProps) {
    return (
        <List listStyleType="none" spacing="sm">
            {props.tasks.map((elem, key)=> 
                <Task key={key} {...elem} onChange={props.onChange} onDelete={props.onDelete} onEdit={props.onEdit}/>)
            }
        </List>
    )
}