import React, { useContext } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserContext from '../../Usercontext';

function Viewuser() {
    let name = "librarian"
    const userData = useContext(UserContext)
    const [isloading, setloading] = useState(true)
    const [user, setuser] = useState([])
    const params = useParams();
    useEffect(() => {
        getuser()
    }, [])
    let getuser = async () => {
        try {
            const datas = await axios.get(`https://6476d0759233e82dd53a5ea1.mockapi.io/user/${params.id}`)
            setuser(datas.data)
            console.log(datas.data)
            setloading(false)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {isloading ? (
                <div class="col d-flex justify-content-center">
                    <h1>Loading</h1>
                </div>

            )
                :
                <div class="col d-flex justify-content-center">
                    <div class="card text-white bg-primary mb-3" style={{ width: "30rem" }}>
                        <div class="card-body">
                            <h4 class="card-title" style={{ textAlign: "center", color: "black" }} >User Profile</h4>
                            <h5 class="card-text" >Name: {user.name}</h5>
                            <h5 class="card-text" >Email: {user.mail}</h5>
                            <h5 class="card-text">City: {user.city}</h5>
                            <h5 class="card-text" >Number: {user.number}</h5>
                            {userData.user.name == name ?
                                (
                                    <th>
                                        <Link to={`/portal/edituser/${user.id}`} className="btn btn-danger mr-2 mt-2">Edit</Link>
                                        <Link to={`/portal/userlist`} className='btn btn-danger mr-2 mt-2'>Back</Link>
                                    </th>
                                ) :
                                <th>
                                    <Link to={`/portal/userlist`} className='btn btn-danger mr-2 mt-2'>Back</Link>

                                </th>
                            }


                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default Viewuser