import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function StudentCreate() {

    const navigate = useNavigate();

    const [studentInput, setStudent] = useState({
        name: '',
        course: '',
        email: '',
        phone: '',
    });

    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        e.persist();
        setStudent(prevStudentInput => ({
            ...prevStudentInput,
            [e.target.name]: e.target.value,
        }));
        // Очищаем ошибки при изменении значения
        setErrors(prevErrors => ({
            ...prevErrors,
            [e.target.name]: '',
        }));
    }

    const saveStudent = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/student`, {
                name: studentInput.name,
                course: studentInput.course,
                email: studentInput.email,
                phone: studentInput.phone,
            });

            if (response.data.status === 200) {
                swal("Success!", response.data.message, "success");
                setStudent({
                    name: '',
                    course: '',
                    email: '',
                    phone: '',
                });
                navigate('/students');
            }
        } catch (error) {
            // Обработка ошибок валидации от сервера
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Add Students
                                <Link to={'/'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveStudent}>
                                <div className="form-group mb-3">
                                    <label>Student Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={studentInput.name} className="form-control" />
                                    <span className="text-danger">{errors.name}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Student Course</label>
                                    <input type="text" name="course" onChange={handleInput} value={studentInput.course} className="form-control" />
                                    <span className="text-danger">{errors.course}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Student Email</label>
                                    <input type="text" name="email" onChange={handleInput} value={studentInput.email} className="form-control" />
                                    <span className="text-danger">{errors.email}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Student Phone</label>
                                    <input type="text" name="phone" onChange={handleInput} value={studentInput.phone} className="form-control" />
                                    <span className="text-danger">{errors.phone}</span>
                                </div>

                                <div className="form-group mb-3">
                                    <button type="submit" className="btn btn-primary">Save Student</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentCreate;
