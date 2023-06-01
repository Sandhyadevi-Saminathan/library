import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
function Withdrawlist() {
    const [wdlist, setwdlist] = useState([])
    const [isloading, setloading] = useState(true)
    useEffect(() => {
        getwdlist();

    }, []);
    let getwdlist = async () => {
        try {
            const users = await axios.get("https://647701449233e82dd53ab4db.mockapi.io/withdraw")
            setwdlist(users.data)
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
                await axios.delete(`https://647701449233e82dd53ab4db.mockapi.io/withdraw/${id}`)
                getwdlist()
            }

        } catch (error) {
            console.log(error)
            alert("Something went wronmg")
        }
    }
    return (
        <>
            < div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Book Withdraw List</h1>
                <Link to="/portal/withdraw" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-download fa-sm text-white-50"></i> Withdraw</Link>
            </div>
            <div className="card shadow mb-4">

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%"  >
                            <thead>
                                <tr>
                                    <th> User Name</th>
                                    <th> Phone Number</th>
                                    <th> Book Name</th>
                                    <th> Author Name</th>
                                    <th> Withdraw date</th>
                                    <th> Action</th>

                                </tr>
                            </thead>

                            <tbody>
                                {isloading ? (
                                    <h1>Loading</h1>
                                ) :
                                    wdlist.map((user, index) => {
                                        return <tr key={index}>
                                            <td>{user.name}</td>
                                            <td>{user.number}</td>
                                            <td>{user.bkname}</td>
                                            <td>{user.author}</td>
                                            <td>{user.date}</td>

                                            <th>
                                                <Link to={`/portal/viewwd/${user.id}`} className='btn btn-info btn-sm mr-1'>View</Link>
                                                <Link to={`/portal/editwd/${user.id}`} className='btn btn-primary btn-sm mr-1'>Edit</Link>
                                                <button onClick={() => {
                                                    handledelete(user.id)
                                                }} className='btn btn-danger btn-sm mr-1'>Delete</button>
                                            </th>
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

export default Withdrawlist