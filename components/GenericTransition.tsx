import { Box, Transition } from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";

interface GenericTransitionProps {
    children: ReactNode;
}

export function GenericTransition(props: GenericTransitionProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true),[])
    // permet de laisser le temps au composant de se créer avant de démarrer la transi

    return (
        <Transition mounted={isMounted} transition="scale" duration={500}>
            {(styles) => (
                <Box style={styles}>
                    {props.children}
                </Box>
            )}
        </Transition>
    )
}