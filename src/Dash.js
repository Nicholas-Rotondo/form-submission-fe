import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Select,
    Button,
    useToast,
    Flex,
} from '@chakra-ui/react'

export function Dash(props) {
    const [tickets, setTickets] = useState([]);
    const toast = useToast();

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = () => {
        axios.get('/api/ticket/fetchTicket')
            .then((response) => {
                console.log('Success:', response.data);
                setTickets(response.data);
            }).catch((error) => {
            console.error('Error:', error.response ? error.response.data : error.message);
            console.error('Full error object:', error);
        });
    };

    const updateTicketStatus = (ticketId, newStatus) => {
        const ticketToUpdate = tickets.find(ticket => ticket.id === ticketId);
        if (!ticketToUpdate) return;

        const updatedTicket = { ...ticketToUpdate, status: newStatus };

        axios.post('/api/ticket/updateTicket', updatedTicket)
            .then((response) => {
                console.log('Ticket updated:', response.data);
                toast({
                    title: "Ticket Updated",
                    description: "The ticket status has been successfully updated.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                fetchTickets(); // Refresh the ticket list
            }).catch((error) => {
            console.error('Error updating ticket:', error);
            toast({
                title: "Update Failed",
                description: "There was an error updating the ticket status.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        });
    };

    return (
        <Flex direction="column" height="100vh" bg="#f0f0f0">
            <Box flex="1" overflowY="auto" p={4}>
                <TableContainer bg="white" borderRadius="md" boxShadow="sm">
                    <Table variant="simple" size="sm">
                        <Thead>
                            <Tr>
                                <Th>Email</Th>
                                <Th>Description</Th>
                                <Th>Status</Th>
                                <Th>Name</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {tickets.map((ticket) => (
                                <Tr key={ticket.id}>
                                    <Td>{ticket.email}</Td>
                                    <Td>{ticket.description}</Td>
                                    <Td>
                                        <Select
                                            size="sm"
                                            value={ticket.status}
                                            onChange={(e) => updateTicketStatus(ticket.id, e.target.value)}
                                        >
                                            <option value="Open">Open</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Closed">Closed</option>
                                        </Select>
                                    </Td>
                                    <Td>{ticket.name}</Td>
                                    <Td>
                                        <Button
                                            colorScheme="blue"
                                            size="sm"
                                            onClick={() => updateTicketStatus(ticket.id, ticket.status)}
                                        >
                                            Save
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Flex>
    )
}