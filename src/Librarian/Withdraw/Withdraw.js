import React, { useContext, useEffect, useReducer } from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


function Withdraw() {

    const navigate = useNavigate()

    const [state, setstate] = useState()
    const [auth, setauth] = useState()
    const [userval, setuserval] = useState([])
    const [bookval, setbookval] = useState({})

    const [value, setvalue] = useState([])
    const [book, setbook] = useState([])
    const [isloading, setloading] = useState(false)

    useEffect(() => {

        getuser();
        getbook()
    }, [])

    useEffect(() => {

        fetchuser()
        fetchbook()
    }, [state, auth]);


    let getuser = async () => {
        try {
            const user = await axios.get(`https://6476d0759233e82dd53a5ea1.mockapi.io/user`)
            setvalue(user.data)


        } catch (error) {
            console.log(error)
        }
    }
    let getbook = async () => {
        try {
            const books = await axios.get(`https://6476d0759233e82dd53a5ea1.mockapi.io/books`)

            setbook(books.data)
            console.log(books)


        } catch (error) {
            console.log(error)
        }
    }

    let fetchuser = async () => {
        try {
            console.log(state)

            const datas = await axios.get(`https://6476d0759233e82dd53a5ea1.mockapi.io/user/${state}`)
            setuserval(datas.data)
            console.log(userval)

        } catch (error) {
            console.log(error)
        }
    }
    let fetchbook = async () => {
        try {
            console.log(auth)
            const datas = await axios.get(`https://6476d0759233e82dd53a5ea1.mockapi.io/books/${auth}`)
            console.log(datas.data)
            setbookval(datas.data)
            console.log(bookval)


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
            count: "",
            date: ""

        },
        validate: async (values) => {


            let errors = {}

            if (values.name) {

                setstate(values.name)
                console.log(state)

            }
            if (values.bkname) {

                setauth(values.bkname)
                console.log(auth)
            }

            if (!values.date) {

                errors.date = "Please Enter the borrow date ";
            }

            return errors;
        },

        onSubmit: async (values) => {


            try {
                setloading(true)
                values.name = userval.name
                values.number = userval.number
                values.bkname = bookval.bkname
                values.author = bookval.author




                const user = await axios.post("https://647701449233e82dd53ab4db.mockapi.io/withdraw", values)
                console.log(user)

                navigate('/portal/withdrawlist')
            } catch (error) {
                console.log(error)
            }

        }

    })

    return (
        <div className='container'>

            <form onSubmit={formik.handleSubmit}>
                <div className='row'>
                    <div className='col-lg-6'>
                        <label >User Name</label>
                        <br />
                        <select
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            className='form-control'
                        >
                            {
                                value.map((opts, index) => {
                                    return <option value={opts.id} key={index}>{opts.name}</option>

                                })

                            }


                        </select>
                    </div>

                    <div className='col-lg-6'>
                        <label >User Number</label>
                        <input type='text'
                            name='number'
                            value={userval.number}
                            onChange={formik.handleChange}
                            className={`form-control `} />


                    </div>

                    <div className='col-lg-4'>
                        <label >Book Name</label>
                        <select
                            name='bkname'
                            value={formik.values.bkname}
                            onChange={formik.handleChange}
                            className='form-control'
                        >
                            {
                                book.map((opts, index) => {
                                    return <option value={opts.id} key={index}>{opts.bkname}</option>

                                })

                            }




                        </select>
                    </div>
                    <div className='col-lg-4'>
                        <label >Author Name</label>
                        <input type='text'
                            name='author'
                            value={bookval.author}
                            onChange={formik.handleChange}
                            className={`form-control  `} />

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
                        <input type={"submit"} disabled={isloading} value={isloading ? "Updating.." : "Withdraw"}
                            className='btn btn-primary' />
                        <Link to={`/portal/withdrawlist`} className='btn btn-info ml-3'>Back</Link>

                    </div>


                </div>
            </form >
        </div >
    )
}

export default Withdraw