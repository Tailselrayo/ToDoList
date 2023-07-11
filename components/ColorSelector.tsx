import { ColorPair } from "@/types/ColorPair";
import { Text, Button, Center, Indicator, SimpleGrid, Stack, useMantineTheme } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

interface ColorSelectorProps {
    colors: ColorPair[];
    selectedColor: ColorPair;
    label: string;
    onChange: (color: ColorPair) => void;
}

export function ColorSelector(props: ColorSelectorProps) {
    const theme = useMantineTheme();

    const onChange = (color: ColorPair) => {
        props.onChange(color);
    }

    return (
        <Stack>
            <Text fz="sm" fw="bold">{props.label}</Text>
            <SimpleGrid cols={props.colors.length}>{
                props.colors.map((elem) => {
                    return (
                        <Indicator 
                            disabled={elem[0] !== props.selectedColor[0] && elem[1] !== props.selectedColor[1]} 
                            position="middle-center"
                            color="transparent(pose pas de questions)"
                            offset={10}
                            label={<IconCheck size={20}/>}
                        >
                            <Center>
                                <Button
                                    onClick={() => onChange(elem)}
                                    w={45}
                                    h={45}
                                    style={{ background: theme.fn.linearGradient(110, ...elem), borderRadius: theme.radius.xl }}
                                >

                                </Button>
                            </Center>
                        </Indicator>
                    )
                })}
            </SimpleGrid>
        </Stack>
        )
}