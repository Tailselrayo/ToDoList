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
        <Transition mounted={true} transition="scale" duration={500}>
            {(styles) => (
                <Box h="100%" style={{...styles}}>
                    {props.children}
                </Box>
            )}
        </Transition>
    )
}