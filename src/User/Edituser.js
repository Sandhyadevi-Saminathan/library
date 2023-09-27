import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

function Edituser() {
    const [isupdating, setupdating] = useState(false);
    const [isloading, setloading] = useState(true)
    const navigate = useNavigate();

    const params = useParams();
    useEffect(() => {
        getuser()
    }, [])
    let getuser = async () => {
        try {
            const user = await axios.get(`http://localhost:8000/user/${params.id}`, {
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }
            })
            formik.setValues(user.data)
            setloading(false)
        } catch (error) {
            console.log(error)
        }
    }
    const formik = useFormik({
        initialValues: {
            email: "",
            fname: "",
            lname: "",
            phone: "",

        },
        validate: (values) => {
            let error = {}
            if (!values.fname) {
                error.fname = "Please enter First Name";
            } else if (values.fname.length <= 3) {
                error.fname = "Please enter First Name"
            }
            if (!values.lname) {
                error.lname = "Please enter Last Name";
            }
            if (!values.email) {
                error.email = "Email is required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                error.email = "Enter a valid email"
            }

            if (!values.phone) {
                error.phone = "Please enter Phone Number";
            }

            return error;
        },
        onSubmit: async (values) => {
            try {

                setupdating(true)
                const user = await axios.put(`http://localhost:8000/users/${params.id}`, values, {
                    headers: {
                        Authorization: `${window.localStorage.getItem("token")}`
                    }
                })
                alert("update done")
                console.log(user)
                navigate(`/portal/userlist`)
            } catch (error) {
                console.log(error)
            }
            console.log(values)
        }

    })
    return (
        <>
            {isloading ? (
                <div class="col d-flex justify-content-center">
                    <h1>Loading</h1>
                </div>

            )
                :
                <div className='container'>
                    <form onSubmit={formik.handleSubmit}>

                        <div className='row ml-1'>
                            <div className='form-group col-lg-4'>
                                <label>First Name</label>
                                <input className={`form-control ${formik.errors.fname ? "is-invalid" : "is-valid"} `}
                                    name='fname'
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.fname}
                                ></input>
                                <span style={{ color: "red" }}>{formik.errors.fname}</span>
                            </div>
                            <div className='form-group col-lg-4'>
                                <label>Last Name</label>
                                <input className={`form-control ${formik.errors.lname ? "is-invalid" : "is-valid"} `}
                                    name='lname'
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.lname}
                                ></input>
                                <span style={{ color: "red" }}>{formik.errors.lname}</span>
                            </div>
                        </div>
                        <div className='form-group col-lg-4'>
                            <label>Email</label>
                            <input className={`form-control ${formik.errors.email ? "is-invalid" : "is-valid"} `}

                                name='email'
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                placeholder='Enter Employee Email'></input>
                            <span style={{ color: "red" }}>{formik.errors.email}</span>
                        </div>

                        <div className='form-group col-lg-4'>
                            <label>Phone Number</label>
                            <input className={`form-control ${formik.errors.phone ? "is-invalid" : "is-valid"} `}
                                name='phone'
                                onChange={formik.handleChange}
                                type="number"
                                value={formik.values.phone}
                                placeholder='Enter Employee phone Number'></input>
                            <span style={{ color: "red" }}>{formik.errors.phone}</span>
                        </div>


                        <div className='col-lg-3 mt-4 '>
                            <input type={"submit"} disabled={isupdating} value={isupdating ? "Updating..." : "Update"}
                                className='btn btn-primary' />
                            <Link to={`/portal/userlist`} className='btn btn-primary ml-2 '>Back</Link>
                        </div>



                    </form >
                </div >
            }
        </>
    )
}

export default Edituser