import { useTodolistContainer } from "@/hooks/useTodolistContainer";
import { Text, ActionIcon, AppShell, Box, Button, Card, Drawer, Group, Header, Stack, Title, useMantineTheme, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome } from "@tabler/icons-react";
import Link from "next/link";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

export function Layout(props: LayoutProps) {
    const [opened, handlers] = useDisclosure(false);
    const { toDoListList } = useTodolistContainer();

    const theme = useMantineTheme();

    return (
        <AppShell
            header={
                <Header height={60} p="md" bg="dark">
                    <Drawer
                        opened={opened}
                        onClose={handlers.close}
                        position="right"
                        title={<Text size="sm">Checkout existing TO-DO lists !</Text>}
                    >
                        <Stack p="sm">
                            {toDoListList.map((elem, index) => {
                                return (
                                    <Link key={index} href={`/todolist/${index}`}>
                                        <Card
                                            onClick={handlers.close}
                                            h={50}
                                            bg={theme.fn.linearGradient(135, ...elem.color)}
                                        >
                                            <Title size="sm" align="center">{elem.name}</Title>
                                        </Card>
                                    </Link>
                                )
                            })}
                        </Stack>
                    </Drawer>
                    <Group position="apart">
                        <Group>
                            <Link href="/">
                                <ActionIcon color="gray.1">
                                    <IconHome size={300} />
                                </ActionIcon>
                            </ Link>
                            <Title size="lg" color="gray.1">
                                Todolist Generator
                            </Title>
                        </Group>
                        <Box>
                            <Burger opened={opened} onClick={handlers.open} color="white"/>
                        </Box>
                    </Group>
                </Header>
            }
        >
            {props.children}
        </AppShell>
    )
}