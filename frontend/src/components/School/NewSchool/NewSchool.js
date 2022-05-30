import React from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2';

const NewSchool = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset} = useForm();

    const onSubmit = data => {
        const fileInfo = data.logo[0]
        const formData = new FormData()
        formData.append('file', fileInfo)
        formData.append('upload_preset', 'plwdtmz7')

        axios.post('https://api.cloudinary.com/v1_1/coremailud/image/upload', formData).then(res => {
            delete data.logo;
            const newData = { ...data, logo: res.data.url };
            addNewSchool(newData);
        })

    };

    const addNewSchool = (data) => {
        axios.post('http://localhost:5000/school', data).then(res => {
            console.log(res.data)
            if(res.data.insertId > 0){
                Swal.fire(
                    'Success',
                    'School Information Added successfully',
                    'success'
                  )
                  reset();
            }
        })
    }

    return (
        <>
            <h1>Add New School</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>School Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter school name" {...register("name")} />
                    required
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>About School</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Enter about School"
                        style={{ height: '100px' }}
                        {...register("about")}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Enter phone number" {...register("phone")} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="email" placeholder="Enter email address" {...register("email")} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Enter school address"
                        style={{ height: '100px' }}
                        {...register("address")}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Select logo</Form.Label>
                    <Form.Control type="file" placeholder="Select Logo" {...register("logo")} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default NewSchool;