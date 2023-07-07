import { TaskType } from "@/types/TaskType";
import { Checkbox, List, Text } from "@mantine/core";

interface TaskProps extends TaskType {
    onChange: (task: TaskType) => void;
}

export function Task(props: TaskProps) {
    return (
        <List.Item>
            <Checkbox
                onChange={() => props.onChange(props)}
                checked={props.done}
                label={
                    <Text
                        td={props.done ? "line-through" : "none"}
                        c={props.done ? "dimmed" : "none"}
                    >
                        {props.description}
                    </Text>
                }
                color="teal"
                radius="xl"
                size="lg"
            />
        </List.Item>
    )
}