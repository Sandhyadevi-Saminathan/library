import React from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
function Withdrawdetails() {
    const [wdlist, setwdlist] = useState([])
    const params = useParams();
    const [isloading, setloading] = useState(true)
    useEffect(() => {
        getwdlist();

    }, []);
    let getwdlist = async () => {
        try {
            const users = await axios.get(`http://localhost:8000/userbooks/${params.id}`,{
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }
            })
            setwdlist(users.data)
            console.log(users.data)
            setloading(false)
        } catch (error) {
            console.log(error)
        }

    }
 
    return (
        <>
         {isloading ? (<div class="col d-flex justify-content-center" >
                <h1 style={{ color: "tomato", maxwidth: "10rem", fontSize: "40px", fontFamily: "cursive" }}>Loading</h1>
            </div>) : (

           
            wdlist.length === 0 ?
                    (<h2 style={{ fontSize: "18px", fontFamily: "cursive" }}>You haven't taken any books</h2>)
:

            <div className="card shadow mb-4">

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%"  >
                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th> Phone Number</th>
                                    <th> Book Name</th>
                                    <th> Author Name</th>
                                    <th> Withdraw date</th>
                                   

                                </tr>
                            </thead>

                            <tbody>
                                {isloading ? (
                                    <h1>Loading</h1>
                                ) :
                                    wdlist.map((user, index) => {
                                        return <tr key={index}>
                                            <td>{user.fname}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.bkname}</td>
                                            <td>{user.author}</td>
                                            <td>{user.date}</td>

                                        </tr>
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
           
            )}
        </>
    )
}

export default Withdrawdetails