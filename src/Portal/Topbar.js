import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../Usercontext'

function Topbar() {
    let name = "librarian";
    const data = localStorage.getItem('Role');
    const id = localStorage.getItem('ID');

    const userData = useContext(UserContext)
    return (
        <>
            {data == name ? (
                <nav className="navbar-nav bg-gradient-danger topbar topbar-dark accordion mb-4 static-top shadow">

                    {/* <!-- Topbar Navbar --> */}
                    <ul className="navbar-nav ml-auto">
                        {/* <!-- Nav Item - User Information --> */}
                        <li className="nav-item dropdown no-arrow">
                            <Link className="nav-link dropdown-toggle" to="/" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {/* <span class="font-weight-bold" style={{ color: "black" }}>Hello</span> */}
                                <Link className="nav-link" to={`/portal/profile/${id}`}>
                                    <span className="mr-2 d-none d-lg-inline text-white - 600 medium" > Profile</span>
                                </Link>

                                <Link className="nav-link" to="/">


                                    <img className="img-profile rounded-circle"
                                        src="https://th.bing.com/th/id/OIP.1asifY692Tb7m4S1HQgVkwHaHa?w=207&h=207&c=7&r=0&o=5&dpr=1.3&pid=1.7" /></Link>

                            </Link>
                        </li>
                    </ul>
                </nav>
            ) :
                <nav className="navbar-nav bg-gradient-primary topbar topbar-dark accordion mb-4 static-top shadow">


                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item dropdown no-arrow">
                            <Link className="nav-link dropdown-toggle" to="/" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                {/* <span class="font-weight-bold" style={{ color: "black" }}>Hello</span> */}
                                <Link className="nav-link" to={`/portal/profile/${id}`}>
                                    <span className="mr-2 d-none d-lg-inline text-white - 600 medium" > Profile</span>
                                </Link>

                                <Link className="nav-link" to="/">


                                    <img className="img-profile rounded-circle"
                                        src="https://th.bing.com/th/id/OIP.1asifY692Tb7m4S1HQgVkwHaHa?w=207&h=207&c=7&r=0&o=5&dpr=1.3&pid=1.7" /></Link>

                            </Link>
                        </li>
                    </ul>
                </nav>
            }


        </>
    )
}

export default Topbar