import React from 'react'
import { Link } from 'react-router-dom'
import UserContext from './Usercontext'
import { useContext } from 'react'

function Home() {
    const userData = useContext(UserContext)
    // handleClick(value)
    // {
    //     console.log(value) // this is the value
    // }
    return (
        <>
            <div className="container">

                {/* <!-- Outer Row --> */}
                <div className="row justify-content-center" >
                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5" >

                            {/* <!-- Nested Row within Card Body --> */}
                            <div class="row" >
                                <div class="col-sm-6" >
                                    <div class="card">
                                        <div class="card-body">
                                            <img src="https://th.bing.com/th?id=OIP.Soqqli_Z1cGEZ7SmkFvEbAHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" class="card-img-top" alt="..." />
                                            <br />
                                            <div class="d-flex justify-content-center">
                                                <Link to="/portal/userlist" onClick={() => {
                                                    userData.setuser({ name: "librarian" })
                                                    console.log(userData.user)

                                                }} className="btn btn-primary mt-3 mr-20">
                                                    Librarian
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6" >
                                    <div class="card" >
                                        <div class="card-body" >
                                            <img src="https://th.bing.com/th/id/OIP.HN5aM9wIkg7NgHS72L19bgHaE8?w=261&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                                                style={{ height: 320 }}
                                                class="card-img-top" alt="..." />
                                            <br />
                                            <div class="d-flex justify-content-center">
                                                <Link to="/portal/userlist" onClick={() => {
                                                    userData.setuser({ name: "user" })
                                                }} className="btn btn-primary mt-3 mr-20">
                                                    User
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div >




        </>
    )
}

export default Home