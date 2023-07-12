import { TodolistData } from "@/types/TodolistData";
import { GenericTransition } from "./GenericTransition";
import { HoverCard, Card, Stack, Title, Group, Box, useMantineTheme } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { ScaleButton } from "./ScaleButton";

interface TodolistCardProps extends TodolistData {
    index: number;
    isHidden?: boolean;
    onEdit: (list: TodolistData) => void;
    onRemove: (id: string) => void;
}

export function TodolistCard(props: TodolistCardProps) {
    const theme = useMantineTheme();

    return (
        <Box style={{zIndex: 300 - 10 * props.index, position: "relative"}}>
            <GenericTransition>
                <HoverCard width={100} withArrow shadow="lg">
                    <HoverCard.Target>
                        <Link href={`/todolist/${props.index}`} style={{ textDecoration: "none" }}>
                            <Card h={150} bg={theme.fn.linearGradient(135, ...props.color)}>
                                <Stack>
                                    <Title ta="center">{props.name}</Title>
                                </Stack>

                            </Card>
                        </Link>
                    </HoverCard.Target>
                    <HoverCard.Dropdown display={props.isHidden ? "none" : "block"} bg="gray.2" style={{border: 0}}>
                        <Group position="center">
                            <Box>
                                <Group position="right">
                                    <ScaleButton
                                        onClick={() => props.onEdit(props)}
                                        isOver={true}
                                        tooltipLabel={"Edit list display"}
                                        color={"dark"}
                                        icon={<IconPencil />}
                                    />
                                    <ScaleButton
                                        onClick={() => props.onRemove(props.id)}
                                        isOver={true}
                                        tooltipLabel={"Remove list"}
                                        color={"dark"}
                                        icon={<IconTrash />}
                                    />
                                </Group>
                            </Box>
                        </Group>
                    </HoverCard.Dropdown>
                </HoverCard>
            </GenericTransition>
        </Box>
    )
}