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
    )
}