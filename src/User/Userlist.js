import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import UserContext from '../Usercontext'
function Userlist() {
    let name = "librarian";
    const data = localStorage.getItem('Role');
    const userData = useContext(UserContext)
    const token = localStorage.getItem('token');
    const [userlist, setuserlist] = useState([])
    const [isloading, setloading] = useState(true)
    useEffect(() => {
        getuser();

    }, []);
    let getuser = async () => {
        try {
            const users = await axios.get("http://localhost:8000/user", {
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }
            });
            setuserlist(users.data)
            console.log(users.data)
          
            setloading(false)
        } catch (error) {
            console.log(error)
        }

    }
    let handledelete = async (userdata) => {

        try {
            const confirm = window.confirm("Are u sure?")
            if (confirm) {

                await axios.delete(`http://localhost:8000/userdel/${userdata}`, {
                    headers: {
                        Authorization: `${window.localStorage.getItem("token")}`
                    }
                })

                alert('User deleted')
                getuser()
            }
        }
        catch (error) {
            console.log(error)
            alert("Something went wronmg")
        }


    }
    return (
        <>
            < div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">User List</h1>
                {data == name ?

                    (
                        <Link to="/portal/createuser" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                            className="fas fa-download fa-sm text-white-50"></i> Create User</Link>
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
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Number</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {isloading ? (
                                    <h1>Loading</h1>
                                ) :
                                    userlist.map((user) => {
                                        return <tr>
                                            <td>{user.fname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.phone}</td>
                                            {data == name ?
                                                (
                                                    <th>
                                                        <Link to={`/portal/viewuser/${user._id}`} className='btn btn-info btn-sm mr-1'>View</Link>
                                                        <Link to={`/portal/edituser/${user._id}`} className='btn btn-primary btn-sm mr-1'>Edit</Link>
                                                        <button onClick={() => {
                                                            handledelete(user._id)
                                                        }} className='btn btn-danger btn-sm mr-1'>Delete</button>
                                                    </th>
                                                ) :
                                                <th>
                                                    <Link to={`/portal/viewuser/${user._id}`} className='btn btn-info btn-sm mr-1'>View</Link>
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

export default Userlist