import React, { useState } from "react";
import { Dash } from "./Dash";
import { Form } from "./Form";
import { Button, Flex, Box } from "@chakra-ui/react";

export function Homepage(props) {
    const [activeComponent, setActiveComponent] = useState("dash");

    return (
        <Flex direction="column" h="100vh" overflow="hidden">
            <Flex justify="center" p={2} bg="gray.100">
                <Button
                    onClick={() => setActiveComponent("dash")}
                    colorScheme={activeComponent === "dash" ? "blue" : "gray"}
                    size="sm"
                    mr={2}
                >
                    Dashboard
                </Button>
                <Button
                    onClick={() => setActiveComponent("form")}
                    colorScheme={activeComponent === "form" ? "blue" : "gray"}
                    size="sm"
                >
                    Form
                </Button>
            </Flex>

            <Box flex={1} overflow="auto">
                {activeComponent === "dash" ? <Dash /> : <Form />}
            </Box>
        </Flex>
    );
}