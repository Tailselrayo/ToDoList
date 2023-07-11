import { TodolistData } from "@/types/TodolistData";
import { useListState, useLocalStorage } from "@mantine/hooks";
import { randomBytes } from "crypto";
import { useEffect, useState } from "react";


export function useTodolistContainer() {
    const [toDoListList, handlers] = useListState<TodolistData>([]);
    const [storage, setStorage] = useLocalStorage<TodolistData[]>({ key: "toDoList" });
    const [isStorageLoaded, setIsStorageLoaded] = useState(false);

    useEffect(() => {

        if (isStorageLoaded || toDoListList.length) {
            setStorage(toDoListList)
        }
    }, [toDoListList, isStorageLoaded, setStorage]);
    
    useEffect(() => {
        console.log(storage)

        if (!isStorageLoaded && storage) {
            handlers.setState(storage);
            setIsStorageLoaded(true);
        }
    }, [storage, isStorageLoaded, handlers, setIsStorageLoaded]);

    return (
        {
            toDoListList,
            handlers: {add: handlers.append}
        }
    )

}
