"use client";
import { Todolist } from "@/components/Todolist";
import { TaskType } from "@/types/TaskType";
import { AppShell, Group, TextInput, Button, Title, Stack } from "@mantine/core";
import { useInputState, useListState } from "@mantine/hooks";
import { FormEvent } from "react";

export default function Home() {  //default est à utiliser pour les pages
  const [task, setTask] = useInputState('');
  const [toDoList, handlers] = useListState<TaskType>([]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (task.trim() && !toDoList.filter((elem) => elem.description === task).length) {
      handlers.append({description: task, done: false});
      setTask('');    //<=> task = '' en plus de rafraichir les components
    }
    
  }

  const onChange = (task: TaskType) => {
    handlers.applyWhere(
      (elem) => elem.description === task.description,
      () => ({description: task.description, done: !task.done}) 
    );
  }

  return (
    <AppShell>
      <Stack maw={600} mx="auto" spacing="xl">
        <Title>{task}</Title>
        <form onSubmit={onSubmit}>
          <Group align="end" w="100%" grow>
            <TextInput
              value={task}
              onChange={setTask}
              autoComplete="off"
              maw="100%"
              minLength={5}
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
        <Todolist onChange={onChange} tasks={toDoList}/>
      </Stack>
    </AppShell>
  )
}
