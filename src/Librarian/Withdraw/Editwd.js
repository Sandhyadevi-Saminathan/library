import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

function Editwd() {
    const [isloading, setloading] = useState(true)
    const navigate = useNavigate();



    const [isupdating, setupdating] = useState(false)
    const params = useParams();
    useEffect(() => {
        getuser()
    }, [])
    let getuser = async () => {

        try {
            const user = await axios.get(`http://localhost:8000/withdraw/${params.id}`,{
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }
            })

            formik.setValues(user.data)
            setloading(false)
            console.log(user.data)
        } catch (error) {
            console.log(error)
        }
    }
    const formik = useFormik({
        initialValues: {
            fname: "",
            phone: "",
            bkname: "",
            author: "",
            date: ""

        },
        validate: async (values) => {

            let errors = {}

            if (!values.fname) {
                errors.fname = "Please Enter the User Name ";
            }
            if (!values.bkname) {
                errors.bkname = "Please Enter the User Name ";
            }
            if (!values.phone) {
                errors.phone = "Please Enter the User Number ";
            }
            if (!values.author) {
                errors.author = "Please Enter the Author Name ";
            }

            if (!values.date) {

                errors.date = "Please Enter the borrow date ";
            }

            return errors;
        },
        onSubmit: async (values) => {
            try {
                setupdating(true)
                const user = await axios.put(`http://localhost:8000/editwithdraw/${params.id}`, values,{
                    headers: {
                        Authorization: `${window.localStorage.getItem("token")}`
                    }
                })
                alert("update done")
                console.log(user)
                navigate('/portal/withdrawlist')
            } catch (error) {
                console.log(error)
            }

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
                    <div className='row'>
                        <div className='col-lg-6'>
                            <label >User Name</label>
                            <br />
                            <input
                                name='fname'
                                value={formik.values.fname}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.errors.fname ? "is-invalid" : "is-valid"} `}
                            >
                            </input>
                            <span style={{ color: "red" }}>{formik.errors.fname}</span>
                        </div>

                        <div className='col-lg-6'>
                            <label >User Number</label>
                            <input type='text'
                                name='phone'
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.errors.phone ? "is-invalid" : "is-valid"} `} />
                            <span style={{ color: "red" }}>{formik.errors.phone}</span>

                        </div>

                        <div className='col-lg-4'>
                            <label >Book Name</label>
                            <input
                                name='bkname'
                                value={formik.values.bkname}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.errors.bkname ? "is-invalid" : "is-valid"} `}
                            >
                            </input>
                            <span style={{ color: "red" }}>{formik.errors.bkname}</span>
                        </div>
                        <div className='col-lg-4'>
                            <label >Author Name</label>
                            <input type='text'
                                name='author'
                                value={formik.values.author}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.errors.author ? "is-invalid" : "is-valid"} `} />
                            <span style={{ color: "red" }}>{formik.errors.author}</span>
                        </div>
                        <div className='form-group col-lg-4'>
                            <label>Borrow date</label>
                            <input className={`form-control ${formik.errors.date ? "is-invalid" : "is-valid"} `}
                                name='date'
                                onChange={formik.handleChange}
                                type="date"
                                value={formik.values.date}
                                placeholder='date'></input>
                            <span style={{ color: "red" }}>{formik.errors.date}</span>
                        </div>
                        <div className='col-lg-3 mt-4 '>
                            <input type={"submit"} disabled={isupdating} value={isupdating ? "Updating.." : "Update"}
                                className='btn btn-primary' />
                            <Link to={`/portal/withdrawlist`} className='btn btn-info ml-3'>Back</Link>

                        </div>


                    </div>
                </form >
            </div>
}
        </>
    )
}

export default Editwd