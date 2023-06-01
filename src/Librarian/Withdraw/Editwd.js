import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

function Editwd() {

    const navigate = useNavigate();



    const [isloading, setloading] = useState(false)
    const params = useParams();
    useEffect(() => {
        getuser()
    }, [])
    let getuser = async () => {

        try {
            const user = await axios.get(`https://647701449233e82dd53ab4db.mockapi.io/withdraw/${params.id}`)

            formik.setValues(user.data)
            console.log(user.data)
        } catch (error) {
            console.log(error)
        }
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            number: "",
            bkname: "",
            author: "",
            date: ""

        },
        validate: async (values) => {

            let errors = {}

            if (!values.name) {
                errors.name = "Please Enter the User Name ";
            }
            if (!values.bkname) {
                errors.bkname = "Please Enter the User Name ";
            }
            if (!values.number) {
                errors.number = "Please Enter the User Number ";
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
                setloading(true)
                const user = await axios.put(`https://647701449233e82dd53ab4db.mockapi.io/withdraw/${params.id}`, values)
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
            <div className='container'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <label >User Name</label>
                            <br />
                            <input
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.errors.name ? "is-invalid" : "is-valid"} `}
                            >
                            </input>
                            <span style={{ color: "red" }}>{formik.errors.name}</span>
                        </div>

                        <div className='col-lg-6'>
                            <label >User Number</label>
                            <input type='text'
                                name='number'
                                value={formik.values.number}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.errors.number ? "is-invalid" : "is-valid"} `} />
                            <span style={{ color: "red" }}>{formik.errors.number}</span>

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
                            <input type={"submit"} disabled={isloading} value={isloading ? "Updating.." : "Update"}
                                className='btn btn-primary' />
                            <Link to={`/portal/withdrawlist`} className='btn btn-info ml-3'>Back</Link>

                        </div>


                    </div>
                </form >
            </div>
        </>
    )
}

export default Editwd