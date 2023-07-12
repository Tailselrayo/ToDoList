import { useTodolistContainer } from "@/hooks/useTodolistContainer";
import { ColorPair } from "@/types/ColorPair";
import { Text, ActionIcon, AppShell, Box, Card, Drawer, Group, Header, Stack, Title, useMantineTheme, Burger, MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome } from "@tabler/icons-react";
import Link from "next/link";
import { ReactNode } from "react";
import '@/app/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface LayoutProps {
    children: ReactNode;
    bgColor?: ColorPair;
}

export function Layout(props: LayoutProps) {
    const [opened, handlers] = useDisclosure(false);
    const { toDoListList } = useTodolistContainer();
    const theme = useMantineTheme();

    const generateTheme = () => {
        return ({
            ".mantine-List-itemWrapper": {
                display: "block"
            }
        })
    }

    return (
        <MantineProvider theme={{ globalStyles: generateTheme }}>
            <AppShell
                className={inter.className}
                header={
                    <Header height={60} p="md" bg="dark" style={{borderBottom: 0}} zIndex={1000}> 
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
                                <Burger opened={opened} onClick={handlers.open} color="white" />
                            </Box>
                        </Group>
                    </Header>
                }
                bg={props.bgColor ? theme.fn.linearGradient(135, ...props.bgColor) : undefined}
                p={0}

            >
                {props.children}
            </AppShell>
        </MantineProvider>
    )
}