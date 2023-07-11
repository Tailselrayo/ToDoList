import { ColorSelector } from "@/components/ColorSelector";
import { GenericTransition } from "@/components/GenericTransition";
import { useTodolistContainer } from "@/hooks/useTodolistContainer";
import { ColorPair } from "@/types/ColorPair";
import { Text, Card, Center, Modal, SimpleGrid, Stack, TextInput, Title, useMantineTheme, Group, Button } from "@mantine/core";
import { useDisclosure, useInputState } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { randomBytes } from "crypto";
import Link from "next/link";
import { FormEvent, useState } from "react";


export default function Home() {
    const { toDoListList, handlers } = useTodolistContainer();
    const [isModalOpened, modalHandlers] = useDisclosure(false);
    const [title, setTitle] = useInputState('');
    const [selectedColor, setSelectedColor] = useState<ColorPair>(["blue", "teal"]);

    const colors: ColorPair[] = [["blue", "teal"], ["orange", "red"], ["indigo", "cyan"], ["lime", "green"], ["pink", "orange"]]
    const theme = useMantineTheme();

    const onCreate = () => {
        modalHandlers.open();
    }

    const onChange = () => {

    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            modalHandlers.close();
            handlers.add({
                id: randomBytes(10).toString("hex"), toDoList: [], name: title, color: selectedColor
            })
            modalHandlers.close();
            setTitle('');
        }
    }

    return (
        <>
            <Modal
                onClose={modalHandlers.close}
                opened={isModalOpened}
                title={<Title size="md">Create a new to-do list</Title>}
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
            <SimpleGrid cols={4}>
                <Center onClick={onCreate} h={150} bg="gray.3" style={{ borderRadius: theme.radius.md, cursor: "pointer" }}>
                    <IconPlus size={75} strokeWidth={1} />
                </Center>
                {
                    toDoListList.map((elem, index) => {
                        return (
                            <GenericTransition key={index}>
                                <Link href={`/todolist/${index}`}>
                                    <Card h={150} bg={theme.fn.linearGradient(135, ...elem.color)}>
                                        {elem.name}
                                    </Card>
                                </Link>
                            </GenericTransition>
                        )
                    })
                }
            </SimpleGrid>

        </>
    )
}