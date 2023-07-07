"use client";
import { Todolist } from "@/components/Todolist";
import { AppShell, Group, TextInput, Button, Title, Box, Stack } from "@mantine/core";
import { useInputState, useListState } from "@mantine/hooks";
import { FormEvent } from "react";

export default function Home() {  //default est à utiliser pour les pages
  const [task, setTask] = useInputState('');
  const [toDoList, handlers] = useListState<string>([]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      handlers.append(task);
    }
    setTask('');
    //<=> task = '' en plus de rafraichir les components
  }
  return (
    <AppShell>
      <Stack maw={600} mx="auto" spacing="xl">
        <Title>{task}</Title>
        <form onSubmit={onSubmit}>
          <Group align="end" w="100%" grow>
            <TextInput
              maw="100%"
              value={task}
              onChange={setTask}
              placeholder="Ex. Doing chores"
              label="Add task"
              size="xl"
            />
            <Button
              maw={150}
              type="submit"
              size="xl"
              color="red"
              gradient={{ from: "blue", to: "teal" }}
              variant="gradient">
              submit
            </Button>
          </Group>
        </form>
        <Todolist tasks={toDoList}/>
      </Stack>
    </AppShell>
  )
}
