import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

const SchoolList = () => {
    const [schoolList, setSchoolList] = useState([]);
    const [reloadData,setReloadData] =useState(false)
    useEffect(() => {
        axios.get('http://localhost:5000/school')
        .then(res => {
            setSchoolList(res.data);
            setReloadData(false);
        })
    }, [reloadData])

    const deleteSchool=(schoolNum)=>{ 
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://localhost:5000/deleteschool/${schoolNum}`)
                .then(res => {
                    setReloadData(true);
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                })    
            }
          })
    }
    return (
        <>
            <h1>School List</h1>
            <Table responsive striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Code</th>
                        <th>create_on</th>
                        <th>updated_on</th>
                        <th>name</th>
                        <th>about</th>
                        <th>phone</th>
                        <th>email</th>
                        <th>address</th>
                        <th>logo</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        schoolList.length === 0 ?
                            <tr><td colSpan={11}>
                                <center>
                                    <Spinner animation="grow" variant="primary" role="status" style={{ width: "4rem", height: "4rem" }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </center>
                            </td></tr>
                            :
                            schoolList.map((school, index) => {
                                return <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{school.code}</td>
                                    <td>{school.create_on}</td>
                                    <td>{school.updated_on}</td>
                                    <td>{school.name}</td>
                                    <td>{school.about}</td>
                                    <td>{school.phone}</td>
                                    <td>{school.email}</td>
                                    <td>{school.address}</td>
                                    <td>
                                        <img src={school.logo} width='100'/>
                                    </td>
                                    <td>
                                    <NavLink to={`/editschool/${school.code}`} className="">Edit</NavLink>
                                    
                                        <Button variant='danger' onClick={()=>deleteSchool(school.code)} className="m-2">Delete</Button></td>
                                   
                                </tr>
                            })
                    }
                </tbody>
            </Table>
        </>
    );
};

export default SchoolList;