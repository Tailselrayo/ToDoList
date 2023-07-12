import { ColorPair } from "@/types/ColorPair";
import { TodolistData } from "@/types/TodolistData";
import { useDisclosure, useInputState } from "@mantine/hooks";
import { useState } from "react";

export function useModalEdition() {
    const [isModalOpened, modalHandlers] = useDisclosure(false);
    const [title, setTitle] = useInputState('');
    const [selectedColor, setSelectedColor] = useState<ColorPair>(["blue", "teal"]);
    const [editId, setEditId] = useState('');
    const [deadline, setDate] = useState<Date>(new Date)

    const create = () => {
        modalHandlers.open()
        setTitle("");
        setSelectedColor(["blue", "teal"]);
        setEditId('');
        setDate(new Date)
    }

    const edit = (list: TodolistData) => {
        modalHandlers.open();
        setEditId(list.id);
        setTitle(list.name);
        setSelectedColor(list.color);
        setDate(list.deadline)
    }

    const update = (callBack: () => void) => {
        if (title.trim()) {
            modalHandlers.close();
            callBack(); 
            setTitle('');
            setEditId("");
        }
    }

    return(
        {
        values: {isModalOpened, title, selectedColor, deadline: new Date(deadline), editId },
        handlers: {create, edit, update, setTitle, setSelectedColor, close: modalHandlers.close, setDate}
        }
    )
}