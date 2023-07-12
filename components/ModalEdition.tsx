import { Text, Title, Stack, TextInput, Group, Button, Modal, Box } from "@mantine/core";
import { ColorSelector } from "./ColorSelector";
import { ColorPair } from "@/types/ColorPair";
import { FormEvent, useState } from "react";
import { DateTimePicker } from "@mantine/dates";

interface ModalEditionProps {
    title: string;
    color: ColorPair;
    deadline: Date;
    isOpened: boolean;
    isEdit: boolean;
    onSubmit: (e: FormEvent) => void;
    onTitleChange: (title: string) => void;
    onSColorChange: (color: ColorPair) => void;
    onDateChange: (deadline: Date) => void;
    onClose: () => void;
}

export function ModalEdition(props: ModalEditionProps) {

    const colors: ColorPair[] = [["blue", "teal"], ["orange", "red"], ["indigo", "cyan"], ["lime", "green"], ["pink", "orange"]]

    return (
        <Modal
            zIndex={200}
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
                    <DateTimePicker
                        value={props.deadline}
                        onChange={props.onDateChange}
                        dropdownType="modal"
                        w="100%"
                        label={<Text fw="bold" fz="sm">Deadline</Text>}
                        placeholder="Set a date and time limit"
                        maw={400}
                        mx="auto"
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