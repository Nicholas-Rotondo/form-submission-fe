import React from "react";
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
} from '@chakra-ui/react'

export function Dash(props) {
    const [tickets, setTickets] = React.useState([])

    React.useEffect(() => {
        axios.get('http://localhost:8080/api/ticket/fetchTicket')
            .then((response) => {
                console.log('Success:', response.data);
                setTickets(response.data)
            }).catch((error) => {
            console.error('Error:', error.response ? error.response.data : error.message);
            console.error('Full error object:', error);
        });
    }, [])

    return (
        <Box width="100%" height="100vh" bg="#f0f0f0" p={4}>
            <TableContainer>
                <Table
                    variant="simple"
                    size="md"
                    sx={{
                        'th, td': { borderBottom: '1px solid', borderColor: 'gray.200' },
                    }}
                >
                    <Thead>
                        <Tr>
                            <Th>Email</Th>
                            <Th>Description</Th>
                            <Th>Title</Th>
                            <Th>Status</Th>
                            <Th>Name</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {tickets.map((ticket, index) => (
                            <Tr key={index}>
                                <Td>{ticket.email}</Td>
                                <Td>{ticket.description}</Td>
                                <Td>{ticket.title}</Td>
                                <Td>{ticket.status}</Td>
                                <Td>{ticket.name}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}