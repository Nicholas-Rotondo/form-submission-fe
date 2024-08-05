import React from "react";
import axios from "axios";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input, Button,
} from '@chakra-ui/react'
import submit from './submit.png';
Form.propTypes = {}

export function Form(props) {
    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [status, setStatus] = React.useState(null)
    const [title, setTitle] = React.useState(null)

    const handleSubmit = (e) => {

        axios.post('https://form-submission-app-30a4df9f4fe4.herokuapp.com/api/ticket/postTicket', {
            email: email,
            description: description,
            status: status,
            title: title,
            name: name,
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }


    const handleInputChange = (e) => setEmail(e.target.value)
    const handleDescriptionChange = (e) => setDescription(e.target.value)

    const handleStatusChange = (e) => setStatus(e.target.value)

    const handleTitleChange = (e) => setTitle(e.target.value)
    const handleNameChange = (e) => setName(e.target.value)


    const isError = email === ''
    return (
        <div style={{
            display: "flex",
            width: "100%",
            height: "100vh"
        }}>
            {/* Left side with background color */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
                backgroundColor: "rgba(38, 91, 43, 0.5)"
            }}>
                <img src={submit} alt="Image description"
                     style={{width: "100px", height: "100px", borderRadius: "8px"}}/>
            </div>

            {/* Right side with form */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
                backgroundColor: "white"
            }}>
                <form onSubmit={handleSubmit}>
                    <FormControl style={{
                        width: "70%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        padding: "16px",
                        borderRadius: "8px"
                    }} isInvalid={isError}>
                        <FormLabel>Email</FormLabel>
                        <Input type='email' value={email} onChange={handleInputChange}/>

                        <FormLabel>Description</FormLabel>
                        <Input type='description' value={description} onChange={handleDescriptionChange}/>

                        <FormLabel>Status</FormLabel>
                        <Input type='status' value={status} onChange={handleStatusChange}/>

                        <FormLabel>Title</FormLabel>
                        <Input type='title' value={title} onChange={handleTitleChange}/>

                        <FormLabel>Name</FormLabel>
                        <Input type='name' value={name} onChange={handleNameChange}/>


                        {!isError ? (
                            <FormHelperText>
                                Enter the email you'd like to receive the newsletter on.
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        )}

                        <Button
                            colorScheme="blue"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </FormControl>
                </form>
            </div>
        </div>
    );
}