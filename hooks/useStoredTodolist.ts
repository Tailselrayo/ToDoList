import { TaskType } from "@/types/TaskType";
import { useListState, useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";


export function useStoredTodolist() {
    const [toDoList, handlers] = useListState<TaskType>([]);
    const [storage, setStorage] = useLocalStorage<TaskType[]>({ key: "toDoList" });
    const [isStorageLoaded, setIsStorageLoaded] = useState(false);

    const add = (task: TaskType) =>{
        handlers.append(task);
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
        if (isStorageLoaded) {
            setStorage(toDoList.map((elem) => ({ ...elem, isEditing: false })))
        }
    }, [toDoList, isStorageLoaded]);
    useEffect(() => {
        if (!isStorageLoaded && storage) {
            handlers.setState(storage);
            setIsStorageLoaded(true);
        }
    }, [storage, isStorageLoaded, handlers]);

    return (
        {
            toDoList,
            handlers: {add, change, edit, toggleEdit, delete: deleteTask, priorityChange}
        }
    )

}