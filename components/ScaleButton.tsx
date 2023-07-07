import { ActionIcon, MantineColor, Tooltip, Transition } from "@mantine/core";
import { ReactNode } from "react";

interface ScaleButtonProps {
    onClick: () => void;
    isOver: boolean;
    tooltipLabel: string;
    color: MantineColor;
    icon: ReactNode;
    disabled?: boolean;
}

export function ScaleButton(props: ScaleButtonProps) {
    return (
        <Transition mounted={props.isOver} transition="scale">
            {
                (styles) => (
                    <Tooltip label={props.tooltipLabel} withArrow>
                        <ActionIcon
                            onClick={() => props.onClick()}
                            type="button"
                            variant="outline"
                            color={props.color}
                            ta="center"
                            style={styles}
                            disabled={props.disabled}
                        >
                            {props.icon}
                        </ActionIcon>
                    </Tooltip>
                )
            }
        </Transition>
    )
}