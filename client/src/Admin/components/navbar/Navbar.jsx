import React from 'react'
import './Navbar.scss'
import { logoutUser, logout } from '../../../redux/slice/authSlice.js'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"

const Navbar = () => {
    const dispatch = useDispatch()
    const handleLogout = async (e) => {
        localStorage.removeItem("token");
        const isAuth = await dispatch(logoutUser());
        dispatch(logout());
        window.location.assign("/");
    };
    return (
        <div className="navbarAdmin">
            <div className="logo">
                <Link to={"/adminHome"} className="link">
                    <h1>mefilm</h1>
                </Link>
                
            </div>
            <div className="logout">
                <button onClick={handleLogout}>Sign out</button>
            </div>
        </div>
    )
}

export default Navbar
