import { Checkbox, List, Text } from "@mantine/core";

interface TodolistProps {
    tasks: string[];
}

export function Todolist(props: TodolistProps) {
    const generateElement = (task: string) => {
        return (
            <List.Item><Checkbox label={task} color="teal" radius="xl" size="lg"/></List.Item>
        );
    }

    return (
        <List listStyleType="none" spacing="md">
            {props.tasks.map((generateElement))}
        </List>
    )
}