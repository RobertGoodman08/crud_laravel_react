import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function StudentEdit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [studentInput, setStudentInput] = useState({
        name: '',
        course: '',
        email: '',
        phone: '',
    });

    // Add error state for fields
    const [errors, setErrors] = useState({
        name: '',
        course: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/student/${id}/edit`)
            .then(res => {
                console.log(res.data);
                if (res.data.status === 200) {
                    setStudentInput(res.data.message);
                    setLoading(false);
                } else if (res.data.status === 404) {
                    swal("Error", res.data.message, "error");
                    navigate('/students');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentInput(prevStudentInput => ({
            ...prevStudentInput,
            [name]: value,
        }));
        // Clear the error when input changes
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: '',
        }));
    }

    const updateStudent = (e) => {
        e.preventDefault();

        const data = {
            name: studentInput.name,
            course: studentInput.course,
            email: studentInput.email,
            phone: studentInput.phone,
        }

        axios.put(`http://127.0.0.1:8000/api/student/${id}/update`, data)
            .then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    navigate('/students');
                } else if (res.data.status === 422) {
                    setErrors(res.data.errors);
                } else if (res.data.status === 404) {
                    swal("Error", res.data.message, "error");
                    navigate('/students');
                }
            })
            .catch(error => {
                console.error(error);
                console.log(error.response.data);
            });
    }

    if (loading) {
        return <h4>Loading Edit Student Data...</h4>
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Edit Student
                                <Link to={'/students'} className="btn btn-danger btn-sm float-end">BACK </Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={updateStudent}>
                                <div className="form-group mb-3">
                                    <label>Student Name</label>
                                    <input type="text" name="name" onChange={handleInputChange} value={studentInput?.name} className="form-control" />
                                    <span className="text-danger">{errors.name}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Student Course</label>
                                    <input type="text" name="course" onChange={handleInputChange} value={studentInput?.course} className="form-control" />
                                    <span className="text-danger">{errors.course}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Student Email</label>
                                    <input type="text" name="email" onChange={handleInputChange} value={studentInput?.email} className="form-control" />
                                    <span className="text-danger">{errors.email}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Student Phone</label>
                                    <input type="text" name="phone" onChange={handleInputChange} value={studentInput?.phone} className="form-control" />
                                    <span className="text-danger">{errors.phone}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <button type="submit" className="btn btn-primary">Update Student</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentEdit;
