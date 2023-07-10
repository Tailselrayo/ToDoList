import { TaskType } from "@/types/TaskType";
import { Badge, Box, Group, List, NativeSelect, Text, TextInput, Transition, useInputProps } from "@mantine/core";
import { FormEvent, useEffect, useState } from "react";
import { IconPencil, IconTrash, IconCheck } from "@tabler/icons-react";
import { Checkbox } from "./Checkbox";
import { ScaleButton } from "./ScaleButton";
import { useInputState } from "@mantine/hooks";
import { convertToObject } from "typescript";

interface TaskProps extends TaskType {
    onChange: (task: TaskType) => void;
    onDelete: (task: TaskType) => void;
    onEdit: (task: TaskType, e: string) => void;
    priorityChange: (task: TaskType, e: PriorityType) => void;
    onToggleEdit: (task: TaskType) => void;
}

export function Task(props: TaskProps) {
    const [isOver, setIsOver] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.onToggleEdit(props);
    }

    const onDelete = () => {
        props.onDelete(props);
    }


    const priorityColor = (priority: PriorityType) => {
        if (priority === "major") {
            return "yellow"
        }
        else if (priority === "critical") {
            return "red"
        }
        return "green"
    }

    useEffect(() => setIsMounted(true), []);
    return (
        <List.Item onMouseOver={() => setIsOver(true)} onMouseLeave={() => setIsOver(false)}>
            <Transition mounted={isMounted} transition="scale" duration={1000}>
                {(styles) => (
                    <Group w="100%" style={styles} bg={isOver || props.isEditing ? "gray.1" : "white"} p={3}>
                        <Group position="apart" w="100%" bg="white" p={5}>
                            {props.isEditing ?
                                <form onSubmit={onSubmit}>
                                    <Group>
                                        <TextInput
                                            value={props.description}
                                            onChange={(e) => props.onEdit(props, e.target.value)}
                                            autoComplete="off"
                                            maw="100%"
                                            minLength={5}
                                            placeholder="Ex. Doing chores"
                                            size="md"
                                        />
                                        <NativeSelect
                                            data={["critical", "major", "minor"]}
                                            value={props.priority}
                                            onChange={(e) => props.priorityChange(props, e.target.value as PriorityType)}
                                        />
                                    </Group>
                                </form> :
                                <Group>
                                    <Box>
                                        <Checkbox {...props} />
                                    </Box>
                                    <Box>
                                        <Badge
                                            color={priorityColor(props.priority)}
                                            size="sm"
                                        >
                                            {props.priority}
                                        </Badge>
                                    </Box>
                                </Group>
                            }
                            <Group position="right" spacing="xs">
                                <ScaleButton
                                    onClick={() => props.onToggleEdit(props)}
                                    isOver={isOver || props.isEditing}
                                    tooltipLabel={props.isEditing ? "confirm" : "edit"}
                                    color="green"
                                    icon={props.isEditing ? <IconCheck /> : <IconPencil />}
                                    disabled={props.done}
                                />
                                <ScaleButton
                                    onClick={onDelete}
                                    isOver={isOver || props.isEditing}
                                    tooltipLabel="delete"
                                    color="orange"
                                    icon={<IconTrash />}
                                    disabled={props.done}
                                />
                            </Group>
                        </Group>
                    </Group>
                )}
            </Transition>
        </List.Item>
    )
}