import React, { useState, useEffect } from 'react'
import './Login.scss'
import { useDispatch, useSelector } from 'react-redux'
import { postUser, loginPending, loginSuccess, loginFail } from '../redux/slice/authSlice.js'
import { useNavigate } from 'react-router-dom';
import APIapp from '../Client/APIS/APIapp';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuth } = useSelector((state) => state.auth)
    const role = JSON.parse(localStorage.getItem('role'))
    // useEffect(() => {
    //     (isAuth || localStorage.getItem('token')) && ((role === "user") ? navigate('/userHome') : navigate('/adminHome'))
    // }, [isAuth, navigate]);
    const [user, setUser] = useState({
        email:'',
        password:'',
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!user.email || !user.password) {
            toast.error("please fill the form", {autoClose: 2000 })
			return dispatch(loginFail("please fill the form"));
		}

        dispatch(loginPending());

        try {
            const isAuth = await dispatch(postUser(user))
            console.log('auth', isAuth);

            if (isAuth.payload === "Incorrect email or password") {
                toast.error(isAuth.payload)
                return dispatch(loginFail(isAuth.payload));
            }
            if (isAuth.payload === "Your account has been blocked for some reasons. Please contact us for supports or create a new account") {
                toast.alert(isAuth.payload)
                return dispatch(loginFail(isAuth.payload));
            }
            console.log(isAuth.payload)
            dispatch(loginSuccess())
            if(role === "user") {
                navigate('/userHome')
            } else {
                navigate('/adminHome')
            }
            window.location.reload()
            
        } catch (error) {
            dispatch(loginFail(error.message));
        }
    }

    const handleForgot = (e) => {
        e.preventDefault();
        navigate('/forgot')
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        navigate('/signup');
    }
    const handleHome = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <div className="Login">
            <body className="body">
                <div className="intro">
                    <h1 onClick={handleHome}>meFilm</h1>
                </div>
                <div className="loginform">
                    <input type="email" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    <input type="password" placeholder="Mật khẩu" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    <button className="loginbut" onClick={handleLogin}>Đăng nhập</button>
                    <button className="signupbut" onClick={handleSignUp}>Đăng ký</button>
                    <img src="" alt="" />
                </div>
            </body>
            {/* <ToastContainer /> */}
        </div>
    )
}

export default Login
