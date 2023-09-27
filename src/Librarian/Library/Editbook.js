import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

function Editbook() {

    const [isloading, setloading] = useState(true)
    const [isupdating, setupdating] = useState(false);
    const navigate = useNavigate();

    const params = useParams();
    useEffect(() => {
        getuser()
    }, [])
    let getuser = async () => {
        try {
            const user = await axios.get(`https://library-t4c2.onrender.com/books/${params.id}`, {
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
            bkname: "",
            author: "",
            year: "",
            available: ""

        },
        validate: (values) => {
            let errors = {}
            if (!values.bkname) {
                errors.bkname = "Book Name is required"
            }

            if (!values.author) {
                errors.author = "Author Name is required"
            }
            if (!values.year) {
                errors.year = "Published year is required"
            }
            if (!values.available) {
                errors.available = "Number of copies is required"
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {

                setupdating(true)
                const user = await axios.put(`https://library-t4c2.onrender.com/books/${params.id}`, values, {
                    headers: {
                        Authorization: `${window.localStorage.getItem("token")}`
                    }
                })
                alert("update done")
                console.log(user)
                navigate(`/portal/managebooks`)
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
                        <div className='row'>
                            <div className='col-lg-6'>
                                <label >Book Name</label>
                                <input type='text'
                                    name='bkname'
                                    value={formik.values.bkname}
                                    onChange={formik.handleChange}
                                    className={`form-control ${formik.errors.bkname ? "is-invalid" : "is-valid"}`} />
                                <span style={{ color: "red" }}>{formik.errors.bkname}</span>
                            </div>
                            <div className='col-lg-6'>
                                <label >Author Name</label>
                                <input type='text'
                                    name='author'
                                    value={formik.values.author}
                                    onChange={formik.handleChange}
                                    className={`form-control ${formik.errors.author ? "is-invalid" : "is-valid"}`} />
                                <span style={{ color: "red" }}>{formik.errors.author}</span>
                            </div>

                            <div className='col-lg-6'>
                                <label >Published year</label>
                                <input type='text'
                                    name='year'
                                    value={formik.values.year}
                                    onChange={formik.handleChange}
                                    className={`form-control ${formik.errors.year ? "is-invalid" : "is-valid"}`} />
                                <span style={{ color: "red" }}>{formik.errors.year}</span>
                            </div>
                            <div className='col-lg-6'>
                                <label >Number of copies</label>
                                <input type='text'
                                    name='available'
                                    value={formik.values.available}
                                    onChange={formik.handleChange}
                                    className={`form-control ${formik.errors.available ? "is-invalid" : "is-valid"}`} />
                                <span style={{ color: "red" }}>{formik.errors.available}</span>
                            </div>

                            <div className='col-lg-3 mt-4 '>
                                <input type={"submit"} disabled={isupdating} value={isupdating ? "Updating..." : "Update"}
                                    className='btn btn-primary' />
                                <Link to={`/portal/managebooks`} className='btn btn-primary ml-2 '>Back</Link>
                            </div>


                        </div>
                    </form >
                </div>
            }
        </>
    )
}

export default Editbook