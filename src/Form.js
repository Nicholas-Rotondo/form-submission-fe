import React, { useState } from "react";
import axios from "axios";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    VStack,
    Box,
    Image,
    useToast,
    Flex,
} from '@chakra-ui/react';
import submit from './submit.png';

export function Form() {
    const [formData, setFormData] = useState({
        email: '',
        description: '',
        name: '',
    });
    const [errors, setErrors] = useState({});
    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (value.trim()) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            if (!formData[key].trim()) {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post('https://form-submission-app-30a4df9f4fe4.herokuapp.com/api/ticket/postTicket', formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('Success:', response.data);
            toast({
                title: "Ticket submitted.",
                description: "We've received your ticket.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            setFormData({ email: '', description: '', name: '' });
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            toast({
                title: "An error occurred.",
                description: "Unable to submit your ticket.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex height="100vh">
            <Box width="50%" bg="rgb(157, 180, 159)" display="flex" justifyContent="center" alignItems="center">
                <Image src={submit} alt="Submit" boxSize="100px" />
            </Box>
            <Box width="50%" bg="white" display="flex" justifyContent="center" alignItems="center">
                <form onSubmit={handleSubmit} style={{ width: "80%" }}>
                    <VStack spacing={4} align="stretch">
                        {Object.keys(formData).map((key) => (
                            <FormControl key={key} isInvalid={!!errors[key]}>
                                <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
                                <Input
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    type={key === 'email' ? 'email' : 'text'}
                                    borderColor="red.300"
                                />
                                <FormErrorMessage>{errors[key]}</FormErrorMessage>
                            </FormControl>
                        ))}
                        {errors.email && <Box color="red.500" fontSize="sm">Email is required.</Box>}
                        <Button colorScheme="blue" type="submit" width="100%">
                            Submit
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
}