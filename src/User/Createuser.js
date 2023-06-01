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
            name: "",
            mail: "",
            city: "",
            number: ""

        },
        validate: (values) => {
            let errors = {}
            if (!values.name) {
                errors.name = "Name is required"
            }

            if (!values.mail) {
                errors.mail = "Email is required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mail)) {
                errors.email = "Enter a valid email"
            }

            if (!values.city) {
                errors.city = "City is required"
            }
            if (!values.number) {
                errors.number = "Number is required"
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {

                setloading(true)
                const user = await axios.post("https://6476d0759233e82dd53a5ea1.mockapi.io/user", values)
                console.log(user)
                navigate(`/portal/userlist`)
            } catch (error) {
                console.log(error)
            }
            console.log(values)
        }

    })

    return (

        <div className='container'>
            <form onSubmit={formik.handleSubmit}>
                <div className='row'>
                    <div className='col-lg-6'>
                        <label >Name</label>
                        <input type='text'
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            className={`form-control ${formik.errors.name ? "is-invalid" : "is-valid"}`} />
                        <span style={{ color: "red" }}>{formik.errors.name}</span>
                    </div>

                    <div className='col-lg-6'>
                        <label >Email</label>
                        <input type='email'
                            name='mail'
                            value={formik.values.mail}
                            onChange={formik.handleChange}
                            className={`form-control ${formik.errors.mail ? "is-invalid" : "is-valid"}`} />
                        <span style={{ color: "red" }}>{formik.errors.mail}</span>
                    </div>
                    <div className='col-lg-6'>
                        <label >City</label>
                        <input type='text'
                            name='city'
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            className={`form-control ${formik.errors.city ? "is-invalid" : "is-valid"}`} />
                        <span style={{ color: "red" }}>{formik.errors.city}</span>
                    </div>
                    <div className='col-lg-4'>
                        <label >Number</label>
                        <input type='text'
                            name='number'
                            value={formik.values.number}
                            onChange={formik.handleChange}
                            className={`form-control ${formik.errors.number ? "is-invalid" : "is-valid"}`} />
                        <span style={{ color: "red" }}>{formik.errors.number}</span>
                    </div>


                    <div className='col-lg-3 mt-4 '>
                        <input type={"submit"} disabled={isloading} value={isloading ? "Loading.." : "Create"}
                            className='btn btn-primary' />
                        <Link to="/portal/userlist" className="btn btn-primary ml-2">Back</Link>

                    </div>


                </div>
            </form >
        </div >
    )
}

export default Createuser