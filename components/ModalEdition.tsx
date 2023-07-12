import {  Text, Title, Stack, TextInput, Group, Button, Modal } from "@mantine/core";
import { ColorSelector } from "./ColorSelector";
import { ColorPair } from "@/types/ColorPair";
import { FormEvent } from "react";



interface ModalEditionProps {
    title: string;
    color: ColorPair;
    isOpened: boolean;
    isEdit: boolean;
    onSubmit: (e: FormEvent) => void;
    onTitleChange: (title: string) => void;
    onSColorChange: (color: ColorPair) => void;
    onClose: () => void;
}

export function ModalEdition(props: ModalEditionProps) {

    const colors: ColorPair[] = [["blue", "teal"], ["orange", "red"], ["indigo", "cyan"], ["lime", "green"], ["pink", "orange"]]

    return (
        <Modal
            zIndex={1001}
            onClose={props.onClose}
            opened={props.isOpened}
            title={(props.isEdit) ? <Title size="md">Edit selected to-do list</Title> : <Title size="md">Create a new to-do list</Title>}
        >
            <form onSubmit={props.onSubmit}>
                <Stack>
                    <TextInput
                        value={props.title}
                        onChange={(e) => props.onTitleChange(e.target.value)}
                        placeholder="Ex: Groceries"
                        label={<Text fw="bold" fz="sm">Title</Text>}
                    />
                    <ColorSelector
                        colors={colors}
                        selectedColor={props.color}
                        label="Theme"
                        onChange={props.onSColorChange}
                    />
                    <Group position="right">
                        <Button type="submit" variant="gradient" gradient={{ to: "teal", from: "blue" }}>
                            Submit
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    )
}