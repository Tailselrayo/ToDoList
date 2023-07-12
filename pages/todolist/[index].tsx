"use client";
import { Layout } from "@/components/Layout";
import { ModalEdition } from "@/components/ModalEdition";
import { Todolist } from "@/components/Todolist";
import { useModalEdition } from "@/hooks/useModalEdition";
import { useStoredTodolist } from "@/hooks/useStoredTodolist";
import { useTodolistContainer } from "@/hooks/useTodolistContainer";
import { Group, TextInput, Button, Stack, NativeSelect, Title, Affix } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { IconSettings } from "@tabler/icons-react";
import { randomBytes } from "crypto";
import { GetServerSidePropsContext } from "next";
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
  const {toDoListList, handlers: globalHandlers} = useTodolistContainer();
  const { values: modalValues, handlers: modalHandlers } = useModalEdition();

  const onSubmitTask = (e: FormEvent) => {
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

  const onPageEdit = () => {
    modalHandlers.edit(toDoListList[props.index])
  }

  const onSubmitEdit = (e: FormEvent) => {
    e.preventDefault();
    modalHandlers.update(()=>{globalHandlers.edit({
      id: modalValues.editId,
      toDoList: [], 
      name: modalValues.title, 
      color: modalValues.selectedColor }
  )})
  }

  useEffect(() => {
    if (isError) {
      routeur.push("/");
    }
  }, [isError])

  useEffect(() => handlers.changeIndex(props.index), [props, handlers])
  return (
    <Layout bgColor={toDoListList?.[props.index]?.color}>
      <Stack maw={700} mx="auto" spacing="lg" bg="white" p="xl">
        <Title align="center">{toDoListList?.[props.index]?.name}</Title>
        <form onSubmit={onSubmitTask}>
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
      <Affix position={{ bottom: 20, right: 20 }}>
        <Button onClick={onPageEdit} leftIcon={<IconSettings />} color={toDoListList?.[props.index]?.color[0]}>
          List Settings
        </Button>
      </Affix>
      <ModalEdition
        title={modalValues.title}
        color={modalValues.selectedColor}
        isOpened={modalValues.isModalOpened}
        isEdit
        onSubmit={onSubmitEdit}
        onTitleChange={modalHandlers.setTitle}
        onSColorChange={modalHandlers.setSelectedColor}
        onClose={modalHandlers.close}
      />
    </Layout>
  )
}
