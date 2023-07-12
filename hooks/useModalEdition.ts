import { ColorPair } from "@/types/ColorPair";
import { TodolistData } from "@/types/TodolistData";
import { useDisclosure, useInputState } from "@mantine/hooks";
import { randomBytes } from "crypto";
import { useState } from "react";


export function useModalEdition() {
    const [isModalOpened, modalHandlers] = useDisclosure(false);
    const [title, setTitle] = useInputState('');
    const [selectedColor, setSelectedColor] = useState<ColorPair>(["blue", "teal"]);
    const [editId, setEditId] = useState('');

    const create = () => {
        modalHandlers.open()
        setTitle("");
        setSelectedColor(["blue", "teal"]);
        setEditId('');
    }

    const edit = (list: TodolistData) => {
        modalHandlers.open();
        setEditId(list.id);
        setTitle(list.name);
        setSelectedColor(list.color);
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
        values: {isModalOpened, title, selectedColor, editId },
        handlers: {create, edit, update, setTitle, setSelectedColor, close: modalHandlers.close}
        }
    )
}