import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2';

const EditSchool = () => {
    const {schoolid} = useParams();
    const [schoolInfo, setSchoolInfo] = useState({})

    const { register, handleSubmit, watch, formState: { errors }, reset} = useForm();
    const onSubmit = data =>{
        axios.put(`http://localhost:5000/school/${schoolid}`, data)
                .then(res => {
                    console.log(res.data)
                    Swal.fire(
                        'Updated!',
                        'School Information has been updated.',
                        'success'
                      )
                })    

    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/getoneschool/${schoolid}`)
        .then(res => {
            setSchoolInfo(res.data[0]);
            reset();
        })
    },[])

    return (
        <>
            <h1>Edit School Information</h1>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>School Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter school name" {...register("name")} defaultValue={schoolInfo.name} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>About School</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Enter about School"
                        style={{ height: '100px' }}
                        {...register("about")}
                        defaultValue={schoolInfo.about}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Enter phone number" {...register("phone")} defaultValue={schoolInfo.phone} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email address" {...register("email")} defaultValue={schoolInfo.email} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Enter school address"
                        style={{ height: '100px' }}
                        {...register("address")}
                        defaultValue={schoolInfo.address}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default EditSchool;