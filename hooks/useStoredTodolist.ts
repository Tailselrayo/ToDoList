import { TaskType } from "@/types/TaskType";
import { TodolistData } from "@/types/TodolistData";
import { useListState, useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";


export function useStoredTodolist(index: number) {
    const [toDoList, handlers] = useListState<TaskType>([]);
    const [storage, setStorage] = useLocalStorage<TodolistData[]>({ key: "toDoList" });
    const [isStorageLoaded, setIsStorageLoaded] = useState(false);

    const applyOnId = (newTask: TaskType) => {
        handlers.applyWhere(
            (elem) => elem.id === newTask.id,
            () => newTask
        );
    }

    const change = (task: TaskType) => {
        applyOnId({ ...task, done: !task.done });
    }

    const deleteTask = (task: TaskType) => {
        handlers.filter((elem) => elem.id !== task.id)
    }

    const edit = (task: TaskType, e: string) => {
        applyOnId({ ...task, description: e });
    }

    const toggleEdit = (task: TaskType) => {
        if (!toDoList.filter((elem) => elem.isEditing).length || task.isEditing) {
            applyOnId({ ...task, isEditing: !task.isEditing })
        }
    }

    const priorityChange = (task: TaskType, e: PriorityType) => {
        applyOnId({ ...task, priority: e })
    }

    useEffect(() => {
        const copy = storage.slice();
        let item: TodolistData;
        if (isStorageLoaded) {
            item = copy[index];
            item.toDoList = toDoList.map((elem) => ({ ...elem, isEditing: false }))
            copy[index] = item;
            setStorage(copy)
        }
    }, [toDoList, isStorageLoaded]);

    useEffect(() => {
        if (!isStorageLoaded && storage) {
            handlers.setState(storage[index].toDoList);
            setIsStorageLoaded(true);
        }
    }, [storage, isStorageLoaded, handlers]);

    return (
        {
            toDoList,
            handlers: {add: handlers.append, change, edit, toggleEdit, delete: deleteTask, priorityChange}
        }
    )

}