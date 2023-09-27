import React, { useContext, useEffect, useReducer } from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


function Withdraw() {

    const navigate = useNavigate()
    const [isupdating, setupdating] = useState(false);
    const [state, setstate] = useState()
    const [auth, setauth] = useState()
    const [userval, setuserval] = useState([])
    const [bookval, setbookval] = useState({})

    const [value, setvalue] = useState([])
    const [book, setbook] = useState([])
    const [isloading, setloading] = useState(true)
   

    useEffect(() => {
        getuser();
        getbook()

    }, [])

    useEffect(() => {
setloading(true)
        fetchuser()
        fetchbook()
    }, [state, auth]);


    let getuser = async () => {
        try {
            const user = await axios.get(`http://localhost:8000/user`, {
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }
            })
            console.log(user)
            setvalue(user.data)
            console.log(user.data[0]._id)
            setstate(user.data[0]._id)
            setloading(false)


        } catch (error) {
            console.log(error)
        }
    }
    let getbook = async () => {
        try {
            const books = await axios.get(`http://localhost:8000/books`, {
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }
            })

            setbook(books.data)
            setauth(books.data[0]._id)
            console.log(books)


        } catch (error) {
            console.log(error)
        }
    }

    let fetchuser = async () => {
       
        try {
        
            console.log(state)

            const datas = await axios.get(`http://localhost:8000/user/${state}`, {
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }
            })
            setuserval(datas.data)
           setloading(false)


        } catch (error) {
            console.log(error)
        }
    }
    let fetchbook = async () => {
      
        try {
            
            console.log(auth)
            const datas = await axios.get(`http://localhost:8000/books/${auth}`, {
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }
            })
            console.log(datas.data)
            setbookval(datas.data)
            setloading(false)
            console.log(bookval)
           


        } catch (error) {
            console.log(error)
        }
    }



    const formik = useFormik({
        initialValues: {
            userid: "",
            fname: "",
            phone: "",
            bkid: "",
            bkname: "",
            author: "",
            date: ""

        },
        validate: async (values) => {


            let errors = {}

            if (values.userid) {

                setstate(values.userid)
                console.log(state)

            }
            if (values.bkid) {

                setauth(values.bkid)
                console.log(auth)
            }

            if (!values.date) {

                errors.date = "Please Enter the borrow date ";
            }

            return errors;
        },

        onSubmit: async (values) => {


            try {
                setupdating(true)
                values.userid = userval._id
                values.fname = userval.fname
                values.phone = userval.phone
                values.bkid = bookval._id
                values.bkname = bookval.bkname
                values.author = bookval.author




                const user = await axios.post("http://localhost:8000/withdraw", values, {
                    headers: {
                        Authorization: `${window.localStorage.getItem("token")}`
                    }
                })
                console.log(user)
alert(" Withdraw successfully")
                navigate('/portal/withdrawlist')
            } catch (error) {
                console.log(error)
            }

        }

    })

    return (
        <>
            {isloading  ? (
                <div class="col d-flex justify-content-center">
                    <h1>Loading</h1>
                </div>

            )
                :
                <div className='container'>

                    <form onSubmit={formik.handleSubmit}>
                        <div className='row'>

                            <div className='col-lg-4'>
                                <label >User ID (Select an User ID from dropdown)</label>
                                <br />
                                <select
                                    name='userid'
                                    value={formik.values.userid}
                                    onChange={formik.handleChange}
                                    className='form-control'
                                >
                                    {
                                        value.map((opts, index) => {
                                            return <option value={opts.id} key={index}>{opts._id}</option>

                                        })

                                    }


                                </select>
                            </div>
                           
                       
                            <div className='col-lg-4'>
                                <label >User Name</label>
                                <input type='text'
                                    name='fname'
                                    value={userval.fname}
                                    onChange={formik.handleChange}
                                    placeholder='Fetching the details'
                                    className={`form-control `} />


                            </div>


                            <div className='col-lg-4'>
                                <label >User Number</label>
                                <input type='text'
                                    name='phone'
                                    value={userval.phone}
                                    onChange={formik.handleChange}
                                    placeholder='Fetching the details'
                                    className={`form-control `} />


                            </div>

                            <div className='col-lg-4'>
                                <label >Book ID (Select a Book ID from dropdown)</label>
                                <select
                                    name='bkid'
                                    value={formik.values.bkid}
                                    onChange={formik.handleChange}
                                    className='form-control'
                                    placeholder='Select an option'
                                >
                                    {
                                        book.map((opts, index) => {
                                            return <option value={opts.id} key={index}>{opts._id}</option>

                                        })
                                    }
                                </select>
                            </div>
                           
                            <div className='col-lg-4'>
                                <label >Book Name</label>
                                <input type='text'
                                    name='bkname'
                                    value={bookval.bkname}
                                    onChange={formik.handleChange}
                                    placeholder='Fetching the details'
                                    className={`form-control  `} />

                            </div>
                            <div className='col-lg-4'>
                                <label >Author Name</label>
                                <input type='text'
                                    name='author'
                                    value={bookval.author}
                                    placeholder='Fetching the details'
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
                            <div className='row'>
                                <div className='col-lg-3 '>
                                    <input type={"submit"} disabled={isupdating} value={isupdating ? "Updating..." : "Withdraw"}
                                        className='btn btn-primary' />
                                    <Link to={`/portal/withdrawlist`} className='btn btn-info ml-3'>Back</Link>

                                </div>
                            </div>

                        </div>
                    </form >
                </div >
            }
        </>
    )
}

export default Withdraw