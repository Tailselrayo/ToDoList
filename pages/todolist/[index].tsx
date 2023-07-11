"use client";
import {Layout} from "@/components/Layout";
import { Todolist } from "@/components/Todolist";
import { useStoredTodolist } from "@/hooks/useStoredTodolist";
import {  Group, TextInput, Button, Stack, NativeSelect } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { randomBytes } from "crypto";
import {  GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect } from "react";

interface TodolistPageProps {
  index: number;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params;
  if (!params || !params.index || Array.isArray(params.index) || isNaN(parseInt(params.index))) {
    return (
      {
        redirect: {
          destination: "/",
          permanent: false,
        }
      }
    )
  }

  return ({
    props: {
      index: parseInt(params.index)
    }
  })
}

export default function TodolistPage(props: TodolistPageProps) {  //default est à utiliser pour les pages
  const [task, setTask] = useInputState('');
  const [priority, setPriority] = useInputState<PriorityType>("minor");
  const routeur = useRouter();
  const { toDoList, handlers, isError } = useStoredTodolist(props.index);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (task.trim() && !toDoList.filter((elem) => elem.description === task).length) {
      handlers.add({
        description: task,
        done: false,
        priority: priority,
        isEditing: false,
        id: randomBytes(10).toString("hex")
      });
      setTask('');    //<=> task = '' en plus de rafraichir les components
    }

  }

  useEffect(() => {
    if (isError) {
      routeur.push("/");
    }
  }, [isError])

  useEffect(()=>handlers.changeIndex(props.index),[props, handlers])
  return (
    <Layout>
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
    </Layout>
  )
}
