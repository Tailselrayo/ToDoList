import { TaskType } from "@/types/TaskType";
import { Group, List, Text, TextInput, Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import { IconPencil, IconTrash, IconCheck } from "@tabler/icons-react";
import { Checkbox } from "./Checkbox";
import { ScaleButton } from "./ScaleButton";

interface TaskProps extends TaskType {
    onChange: (task: TaskType) => void;
    onDelete: (task: TaskType) => void;
    onEdit: (task: TaskType, e:string) => void;
}

export function Task(props: TaskProps) {
    const [isOver, setIsOver] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    useEffect(() => setIsMounted(true), []);

    return (
        <List.Item onMouseOver={() => setIsOver(true)} onMouseLeave={() => setIsOver(false)}>
            <Transition mounted={isMounted} transition="scale" duration={1000}>
                {(styles) => (
                    <Group w="100%" style={styles} bg={isOver ? "gray.1" : "white"} p={3}>
                        <Group position="apart" w="100%" bg="white" p={5}>
                            {isEdit ? 
                                <TextInput
                                    value={props.description}
                                    onChange={(e) => props.onEdit(props, e.target.value)}
                                    autoComplete="off"
                                    maw="100%"
                                    minLength={5}
                                    placeholder="Ex. Doing chores"
                                    size="md"
                                />: 
                                <Checkbox {...props} />
                            }
                            <Group position="right" spacing="xs">
                                <ScaleButton
                                    onClick={() => setIsEdit(!isEdit)}
                                    isOver={isOver}
                                    tooltipLabel={isEdit ? "confirm": "edit"}
                                    color="green"
                                    icon={isEdit ? <IconCheck /> :<IconPencil />}
                                />
                                <ScaleButton
                                    onClick={() => props.onDelete(props)}
                                    isOver={isOver}
                                    tooltipLabel="delete"
                                    color="orange"
                                    icon={<IconTrash />}
                                />
                            </Group>
                        </Group>
                    </Group>
                )}
            </Transition>
        </List.Item>
    )
}