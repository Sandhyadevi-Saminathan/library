import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Createuser() {
    const navigate = useNavigate()
    const [isloading, setloading] = useState(false)
    const formik = useFormik({
        initialValues: {
            email: "",
            fname: "",
            lname: "",
            phone: "",
            role: ""

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
            if (!values.role) {
                error.role = "Please enter Your Role";
            }
            return error;
        },
        onSubmit: async (values) => {
            try {

                setloading(true)
                let userData = await axios.post("http://localhost:8000/adduser", values, {
                    headers: {
                        Authorization: `${window.localStorage.getItem("token")}`
                    }

                });
                alert("User Created");
                formik.resetForm();
                navigate("/portal/userlist");
            } catch (error) {
                console.log(error)
            }
            console.log(values)
        }

    })

    return (

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
                    <label>Role</label>
                    <input className={`form-control ${formik.errors.role ? "is-invalid" : "is-valid"} `}
                        name='role'
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.role.toLocaleLowerCase()}

                        placeholder='Librarian/User'></input>
                    <span style={{ color: "red" }}>{formik.errors.role}</span>
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
                <div className='row ml-1'>
                    <div className='form-group col-lg-2'>


                        <button type='Submit' className='btn btn-primary rounded col-lg-12 justify-content-center align-items-center mt-2'>Add Employee</button>
                    </div>
                    <div className='form-group col-lg-2'>
                        <Link to={'/portal/userlist'}> <button type='button' className='btn btn-danger rounded col-lg-12 justify-content-center align-items-center mt-2'>Back</button></Link>
                    </div><hr />
                </div>
            </form>
        </div >
    )
}

export default Createuser