import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import UserContext from '../../Usercontext';

function Managebooks() {
    let name = "librarian";
    const userData = useContext(UserContext)

    const [userlist, setuserlist] = useState([])
    const [isloading, setloading] = useState(true)
    useEffect(() => {
        getuser();

    }, []);
    let getuser = async () => {
        try {
            const users = await axios.get("https://6476d0759233e82dd53a5ea1.mockapi.io/books")
            setuserlist(users.data)
            console.log(users.data)
            setloading(false)
        } catch (error) {
            console.log(error)
        }

    }
    let handledelete = async (id) => {
        try {
            const confirm = window.confirm("Are u sure?")
            if (confirm) {
                await axios.delete(`https://6476d0759233e82dd53a5ea1.mockapi.io/books/${id}`)
                getuser()
            }

        } catch (error) {
            console.log(error)
            alert("Something went wronmg")
        }
    }
    return (
        <>

            < div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Book List </h1>
                {
                    userData.user.name == name ?
                        (<Link to="/portal/createbook" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                            className="fas fa-download fa-sm text-white-50"></i> Create Book</Link>
                        ) :
                        null


                }

            </div>
            <div className="card shadow mb-4">

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%"  >
                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th>Author</th>
                                    <th>Published Year</th>
                                    <th>Number of Copies</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {isloading ? (
                                    <h1>Loading</h1>
                                ) :
                                    userlist.map((user, index) => {
                                        return <tr key={index}>
                                            <td>{user.bkname}</td>
                                            <td>{user.author}</td>
                                            <td>{user.year}</td>
                                            <td>{user.available}</td>
                                            {userData.user.name == name ? (
                                                <th>
                                                    <Link to={`/portal/viewbook/${user.id}`} className='btn btn-info btn-sm mr-1'>View</Link>
                                                    <Link to={`/portal/editbook/${user.id}`} className='btn btn-primary btn-sm mr-1'>Edit</Link>
                                                    <button onClick={() => {
                                                        handledelete(user.id)
                                                    }} className='btn btn-danger btn-sm mr-1'>Delete</button>
                                                </th>
                                            ) :

                                                <th>
                                                    <Link to={`/portal/viewbook/${user.id}`} className='btn btn-primary'>View</Link>
                                                </th>
                                            }

                                        </tr>
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Managebooks