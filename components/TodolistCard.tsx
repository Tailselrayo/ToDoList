import { TodolistData } from "@/types/TodolistData";
import { GenericTransition } from "./GenericTransition";
import { Text, HoverCard, Card, Stack, Title, Group, Box, useMantineTheme, Indicator, Tooltip } from "@mantine/core";
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
    const taskCount = props.toDoList.filter((elem) => elem.done === true).length;
    const taskTally = props.toDoList.length;
    const hidden = taskTally !== 0 && taskCount !== taskTally;

    return (
        <Box h="100%" style={{ zIndex: 300 - props.index, position: "relative" }}>
            <GenericTransition>
                <HoverCard width={100} withArrow shadow="lg">
                    <HoverCard.Target>
                        <Link href={`/todolist/${props.index}`} style={{ textDecoration: "none", height: "100%", display: "block" }}>
                            <Indicator
                                h="100%"
                                size={20}
                                position="top-center"
                                disabled={hidden}
                                withBorder
                                color={(taskTally ? "green.4" : "red.8")}
                                label={(taskTally ? "Complete" : "Empty")}
                            >
                                <Card h="100%" bg={theme.fn.linearGradient(135, ...props.color)} padding="lg">
                                    <Stack h="100%" justify="space-between">
                                        <Title lineClamp={1} fz="xl" ta="center">{props.name}</Title>
                                        <Text display={!taskTally ? "none" : "block"} ta="right" italic >
                                            {taskCount} tasks done out of {taskTally}
                                        </Text>
                                    </Stack>

                                </Card>
                            </Indicator>
                        </Link>
                    </HoverCard.Target>
                    <HoverCard.Dropdown display={props.isHidden ? "none" : "block"} bg="gray.2" style={{ border: 0 }}>
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