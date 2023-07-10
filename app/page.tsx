"use client";
import { Todolist } from "@/components/Todolist";
import { useStoredTodolist } from "@/hooks/useStoredTodolist";
import { AppShell, Group, TextInput, Button, Stack, NativeSelect } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { randomBytes } from "crypto";
import { FormEvent} from "react";

export default function Home() {  //default est à utiliser pour les pages
  const [task, setTask] = useInputState('');
  const [priority, setPriority] = useInputState<PriorityType>("minor");
  const {toDoList, handlers} = useStoredTodolist();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (task.trim() && !toDoList.filter((elem) => elem.description === task).length) {
      handlers.add({
        description: task, 
        done: false, 
        priority: priority,
        isEditing: false, 
        id: randomBytes(10).toString("hex")});
      setTask('');    //<=> task = '' en plus de rafraichir les components
    }
    
  }

  return (
    <AppShell>
      <Stack maw={700} mx="auto" spacing="lg">
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
            <NativeSelect 
              data={["critical", "major", "minor"]} 
              value={priority}
              onChange={setPriority}
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
        <Todolist
          onChange={handlers.change}
          onDelete={handlers.delete}
          tasks={toDoList}
          onEdit={handlers.edit}
          priorityChange={handlers.priorityChange}
          onToggleEdit={handlers.toggleEdit}
        />
      </Stack>
    </AppShell>
  )
}
