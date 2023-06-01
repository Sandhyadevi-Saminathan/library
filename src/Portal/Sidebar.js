import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../Usercontext'

function Sidebar() {
    let name = "librarian";
    const userData = useContext(UserContext)
    console.log(userData.user.name)
    console.log(name)
    return (
        <>
            {userData.user.name == name ?
                (
                    <ul className="navbar-nav bg-gradient-danger sidebar sidebar-dark accordion mb-4 static-top shadow" id="accordionSidebar">

                        {/* <!-- Sidebar - Brand --> */}
                        <div className="sidebar-brand d-flex align-items-center justify-content-center" href="">
                            <div className="sidebar-brand-icon rotate-n-15">

                            </div>

                            <div className="sidebar-brand-text mx-3 mt-5">Library Management </div>


                        </div>
                        <br />
                        {/* <!-- Divider --> */}
                        <hr className="sidebar-divider my-0 " />

                        {/* <!-- Nav Item - Dashboard --> */}
                        <li className="nav-item active">
                            <Link className="nav-link mt-3" to="/portal/userlist">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>UserList</span></Link>
                        </li>

                        <li className="nav-item active">
                            <Link className="nav-link" to="/portal/managebooks">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Manage Books</span></Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/portal/withdrawlist">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Withdraw Books</span></Link>

                        </li>
                    </ul>
                ) :
                (

                    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion mb-4 static-top shadow" id="accordionSidebar">

                        {/* <!-- Sidebar - Brand --> */}
                        <div className="sidebar-brand d-flex align-items-center justify-content-center" href="">
                            <div className="sidebar-brand-icon rotate-n-15">

                            </div>

                            <div className="sidebar-brand-text mx-3 mt-5">User </div>


                        </div>
                        <br />
                        {/* <!-- Divider --> */}
                        <hr className="sidebar-divider my-0 " />

                        {/* <!-- Nav Item - Dashboard --> */}
                        <li className="nav-item active">
                            <Link className="nav-link mt-3" to="/portal/userlist">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>User List</span></Link>
                        </li>

                        <li className="nav-item active">
                            <Link className="nav-link" to="/portal/managebooks">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Book List</span></Link>
                        </li>

                    </ul>
                )
            }

        </>
    )
}

export default Sidebar