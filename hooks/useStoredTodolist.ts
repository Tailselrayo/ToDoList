import { TaskType } from "@/types/TaskType";
import { TodolistData } from "@/types/TodolistData";
import { useListState, useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";


export function useStoredTodolist(idx: number) {
    const [toDoList, handlers] = useListState<TaskType>([]);
    const [storage, setStorage] = useLocalStorage<TodolistData[]>({ key: "toDoList" });
    const [isStorageLoaded, setIsStorageLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [index, setIndex] = useState(idx);

    const changeIndex = (i: number) => {
        if (storage && storage[i] && i !== index) {
            setIndex(i);
            handlers.setState(storage[i].toDoList);
        }
    }

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
        let copy: TodolistData[];
        let item: TodolistData;
        if (isStorageLoaded) {
            copy = storage.slice();
            item = copy[index];
            item.toDoList = toDoList.map((elem) => ({ ...elem, isEditing: false }))
            copy[index] = item;
            setStorage(copy)
        }
    }, [toDoList, isStorageLoaded]);

    useEffect(() => {
        if (!isStorageLoaded && storage) {
            if (!storage[index]) {
                setIsError(true);
                return;
            }
            handlers.setState(storage[index].toDoList);
            setIsStorageLoaded(true);
        }
    }, [storage, isStorageLoaded, handlers]);

    return (
        {
            toDoList,
            handlers: { add: handlers.append, change, edit, toggleEdit, delete: deleteTask, priorityChange, changeIndex },
            isError, 
        }
    )

}