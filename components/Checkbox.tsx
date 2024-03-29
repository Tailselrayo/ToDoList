import { TaskType } from "@/types/TaskType";
import { Checkbox as MantineCheckbox, Text } from "@mantine/core";

interface CheckboxProps extends TaskType {
    onChange: (task: TaskType) => void;
}

export function Checkbox(props: CheckboxProps) {
    return (
        <MantineCheckbox
            onChange={() => props.onChange(props)}
            checked={props.done}
            label={
                <Text
                    w={400}
                    td={props.done ? "line-through" : "none"}
                    c={props.done ? "dimmed" : "none"}
                    truncate
                >
                    {props.description}
                </Text>
            }
            color="teal"
            radius="xl"
            size="lg"
        />
    )
}