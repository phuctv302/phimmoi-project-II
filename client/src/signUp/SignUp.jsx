import React, { useState } from 'react'
import './SignUp.scss'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUser } from '../redux/slice/authSlice.js'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'


const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    })

    const handleSignUp = async () => {
        const res = await dispatch(signUpUser(user));
        console.log(res)
        if(res.payload.status === 'success') {
            toast.success("Sign up success", {autoClose: 2000})
            navigate('/login')
        }
        if(res.payload.status === 'error') {
            toast.error(res.payload.message, {autoClose: 2000})
        }
    }
    console.log(user)
    
    return (
        <div className="signup">
            <header className="header">
                <h1>meFilm</h1>
            </header>
            <body className="body">
                <div className="form"  >
                    <input type="text" name="name" id="name" placeholder="Your name" onChange={(e) => setUser({ ...user, name: e.target.value })}></input>
                    <input type="email" name="email" id="email" placeholder="email" onChange={(e) => setUser({ ...user, email: e.target.value })}></input>
                    <input type="password" name="password" id="password" placeholder="Mật khẩu" onChange={(e) => setUser({ ...user, password: e.target.value })}></input>
                    <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Nhập lại mật khẩu" onChange={(e) => setUser({ ...user, passwordConfirm: e.target.value })}></input>
                    <button onClick={handleSignUp}>Đăng ký</button>
                </div>
            </body>
        </div>
    )

}

export default SignUp
