import { TaskType } from "@/types/TaskType";
import { Badge, Box, Group, List, NativeSelect, Text, TextInput } from "@mantine/core";
import { FormEvent, useState } from "react";
import { IconPencil, IconTrash, IconCheck } from "@tabler/icons-react";
import { Checkbox } from "./Checkbox";
import { ScaleButton } from "./ScaleButton";
import { GenericTransition } from "./GenericTransition";
import { useMediaQuery } from "@mantine/hooks";

interface TaskProps extends TaskType {
    onChange: (task: TaskType) => void;
    onDelete: (task: TaskType) => void;
    onEdit: (task: TaskType, e: string) => void;
    priorityChange: (task: TaskType, e: PriorityType) => void;
    onToggleEdit: (task: TaskType) => void;
}

export function Task(props: TaskProps) {
    const [isOver, setIsOver] = useState(false);
    const isMobile = useMediaQuery('(max-width: 760px)')

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

    return (
        <List.Item onMouseOver={() => setIsOver(true)} onMouseLeave={() => setIsOver(false)}>
            <GenericTransition>
                    <Group w="100%" bg={isOver || props.isEditing ? "gray.1" : "white"} p={3}>
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
                                    isOver={isOver || props.isEditing || isMobile}
                                    tooltipLabel={props.isEditing ? "confirm" : "edit"}
                                    color="green"
                                    icon={props.isEditing ? <IconCheck /> : <IconPencil />}
                                    disabled={props.done}
                                />
                                <ScaleButton
                                    onClick={onDelete}
                                    isOver={isOver || props.isEditing || isMobile}
                                    tooltipLabel="delete"
                                    color="orange"
                                    icon={<IconTrash />}
                                    disabled={props.done}
                                />
                            </Group>
                        </Group>
                    </Group>
            </GenericTransition>
        </List.Item>
    )
}