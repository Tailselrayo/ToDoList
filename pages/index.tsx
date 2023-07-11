import { ColorSelector } from "@/components/ColorSelector";
import { Layout } from "@/components/Layout"
import { TodolistCard } from "@/components/TodolistCard";
import { useTodolistContainer } from "@/hooks/useTodolistContainer";
import { ColorPair } from "@/types/ColorPair";
import { TodolistData } from "@/types/TodolistData";
import { Text, Center, Modal, SimpleGrid, Stack, TextInput, Title, useMantineTheme, Group, Button } from "@mantine/core";
import { useDisclosure, useInputState } from "@mantine/hooks";
import {  IconPlus } from "@tabler/icons-react";
import { randomBytes } from "crypto";
import { FormEvent, useState } from "react";


export default function Home() {
    const { toDoListList, handlers } = useTodolistContainer();
    const [isModalOpened, modalHandlers] = useDisclosure(false);
    const [title, setTitle] = useInputState('');
    const [selectedColor, setSelectedColor] = useState<ColorPair>(["blue", "teal"]);
    const [editId, setEditId] = useState('');

    const colors: ColorPair[] = [["blue", "teal"], ["orange", "red"], ["indigo", "cyan"], ["lime", "green"], ["pink", "orange"]]
    const theme = useMantineTheme();

    const onCreate = () => {
        modalHandlers.open();
    }

    const onRemove = (id: string) => {
        handlers.remove(id);
    }

    const onEdit = (list: TodolistData) => {
        modalHandlers.open();
        setEditId(list.id);
        setTitle(list.name);
        setSelectedColor(list.color);
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            modalHandlers.close();
   
            handlers[editId? "edit" : "add"](
                {id: (editId) ? editId : randomBytes(10).toString("hex"), toDoList: [], name: title, color: selectedColor }
            )
            setEditId('')
            setTitle('');
        }
    }

    return (
        <Layout>
            <Modal
                onClose={modalHandlers.close}
                opened={isModalOpened}
                title={(editId) ? <Title size="md">Edit selected to-do list</Title> : <Title size="md">Create a new to-do list</Title>}
            >
                <form onSubmit={onSubmit}>
                    <Stack>
                        <TextInput
                            value={title}
                            onChange={setTitle}
                            placeholder="Ex: Groceries"
                            label={<Text fw="bold" fz="sm">Title</Text>}
                        />
                        <ColorSelector
                            colors={colors}
                            selectedColor={selectedColor}
                            label="Theme"
                            onChange={setSelectedColor}
                        />
                        <Group position="right">
                            <Button type="submit" variant="gradient" gradient={{ to: "teal", from: "blue" }}>
                                Submit
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Modal>
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
                                onEdit={onEdit}
                                onRemove={onRemove}
                            />
                        )
                    })
                }
                <Center onClick={modalHandlers.open} h={150} bg="gray.3" style={{ borderRadius: theme.radius.md, cursor: "pointer" }}>
                    <IconPlus size={75} strokeWidth={1} />
                </Center>
            </SimpleGrid>

        </Layout>
    )
}