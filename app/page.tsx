"use client";
import { Todolist } from "@/components/Todolist";
import { TaskType } from "@/types/TaskType";
import { AppShell, Group, TextInput, Button, Stack, NativeSelect } from "@mantine/core";
import { useInputState, useListState } from "@mantine/hooks";
import { randomBytes } from "crypto";
import { todo } from "node:test";
import { FormEvent } from "react";

export default function Home() {  //default est à utiliser pour les pages
  const [task, setTask] = useInputState('');
  const [priority, setPriority] = useInputState<PriorityType>("minor");
  const [toDoList, handlers] = useListState<TaskType>([]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (task.trim() && !toDoList.filter((elem) => elem.description === task).length) {
      handlers.append({
        description: task, 
        done: false, 
        priority: priority,
        isEditing: false, 
        id: randomBytes(10).toString("hex")});
      setTask('');    //<=> task = '' en plus de rafraichir les components
    }
    
  }

  const applyOnId = (newTask: TaskType) => {
    handlers.applyWhere(
      (elem) => elem.id === newTask.id,
      () => newTask
    );
  }

  const onChange = (task: TaskType) => {
    applyOnId({...task, done: !task.done});
  }

  const onDelete = (task: TaskType) => {
    handlers.filter((elem) => elem.id !== task.id)
  }

  const onEdit = (task: TaskType, e:string) => {
    applyOnId({...task, description: e});
  }

  const onToggleEdit = (task: TaskType) => {
    if (!toDoList.filter((elem) => elem.isEditing).length || task.isEditing) {
      applyOnId({...task, isEditing: !task.isEditing})
    }
  }

  const priorityChange = (task: TaskType, e: PriorityType) => {
    applyOnId({...task, priority: e})
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
          onChange={onChange}
          onDelete={onDelete}
          tasks={toDoList}
          onEdit={onEdit}
          priorityChange={priorityChange}
          onToggleEdit={onToggleEdit}
        />
      </Stack>
    </AppShell>
  )
}
