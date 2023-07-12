import { Layout } from "@/components/Layout"
import { ModalEdition } from "@/components/ModalEdition";
import { TodolistCard } from "@/components/TodolistCard";
import { useModalEdition } from "@/hooks/useModalEdition";
import { useTodolistContainer } from "@/hooks/useTodolistContainer";
import { Center, SimpleGrid, useMantineTheme } from "@mantine/core";
import {  IconPlus } from "@tabler/icons-react";
import { randomBytes } from "crypto";
import { FormEvent } from "react";


export default function Home() {
    const { toDoListList, handlers } = useTodolistContainer();
    const {values, handlers: modalHandlers} = useModalEdition();

    const theme = useMantineTheme();

    const onRemove = (id: string) => {
        handlers.remove(id);
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        modalHandlers.update(()=>{handlers[values.editId? "edit" : "add"](
            {id: (values.editId) ? values.editId : randomBytes(10).toString("hex"), 
            toDoList: [], 
            name: values.title, 
            color: values.selectedColor, 
            deadline: values.deadline}
        )})
    }

    return (
        <Layout>
            <ModalEdition
                title={values.title}
                color={values.selectedColor}
                deadline={values.deadline}
                isOpened={values.isModalOpened}
                isEdit={values.editId !== ''}
                onClose={modalHandlers.close}
                onSubmit={onSubmit}
                onSColorChange={modalHandlers.setSelectedColor}
                onTitleChange={modalHandlers.setTitle}
                onDateChange={modalHandlers.setDate}
            />
            <SimpleGrid
                breakpoints={[{maxWidth: "md", cols:3}, {maxWidth: "sm", cols:2}, {maxWidth: "xs", cols:1}]}
                cols={4}
            >
                {
                    toDoListList.map((elem, index) => {
                        return (
                            <TodolistCard
                                key={index}
                                {...elem}
                                index={index}
                                onEdit={modalHandlers.edit}
                                onRemove={onRemove}
                            />
                        )
                    })
                }
                <Center onClick={modalHandlers.create} h="100%" bg="gray.3" style={{ borderRadius: theme.radius.md, cursor: "pointer" }}>
                    <IconPlus size={75} strokeWidth={1} />
                </Center>
            </SimpleGrid>

        </Layout>
    )
}