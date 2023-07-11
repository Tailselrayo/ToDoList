import { TodolistData } from "@/types/TodolistData";
import { useListState, useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";


export function useTodolistContainer() {
    const [toDoListList, handlers] = useListState<TodolistData>([]);
    const [storage, setStorage] = useLocalStorage<TodolistData[]>({ key: "toDoList" });
    const [isStorageLoaded, setIsStorageLoaded] = useState(false);

    const remove = (id: string) => {
        handlers.filter((elem) => elem.id !== id)
    } 

    const edit = (list: TodolistData) => {
        handlers.applyWhere(
            (elem) => elem.id === list.id,
            (elem) => ({...elem, name: list.name,color:  list.color})
        )
    }

    useEffect(() => {

        if (isStorageLoaded || toDoListList.length) {
            setStorage(toDoListList)
        }
    }, [toDoListList, isStorageLoaded, setStorage]);
    
    useEffect(() => {
        if (!isStorageLoaded && storage) {
            handlers.setState(storage);
            setIsStorageLoaded(true);
        }
    }, [storage, isStorageLoaded, handlers, setIsStorageLoaded]);

    return (
        {
            toDoListList,
            handlers: {add: handlers.append, remove, edit}
        }
    )

}
