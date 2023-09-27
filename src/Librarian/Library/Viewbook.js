import React, { useContext } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserContext from '../../Usercontext';

function Viewbook() {
    let name = "librarian";
    const data = localStorage.getItem('Role');
    const [isloading, setloading] = useState(true)
    const [user, setuser] = useState([])
    const params = useParams();
    useEffect(() => {
        getuser()
    }, [])
    let getuser = async () => {
        try {
            const datas = await axios.get(`http://localhost:8000/books/${params.id}`, {
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }
            })
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
                            <h4 class="card-title" style={{ textAlign: "center", color: "black" }} >Book Info</h4>
                            <h5 class="card-text" >Book Name: {user.bkname}</h5>
                            <h5 class="card-text" >Author Name: {user.author}</h5>
                            <h5 class="card-text">Published Year: {user.year}</h5>
                            <h5 class="card-text" >Number of copies: {user.available}</h5>
                            {data == name ?
                                (

                                    <>
                                        <Link to={`/portal/editbook/${user._id}`} className="btn btn-danger mr-2 mt-2">Edit</Link>
                                        <Link to={`/portal/managebooks`} className='btn btn-danger mr-2 mt-2'>Back</Link>
                                    </>
                                )
                                :
                                <Link to={`/portal/managebooks`} className='btn btn-danger mr-2 mt-2'>Back</Link>
                            }



                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default Viewbook