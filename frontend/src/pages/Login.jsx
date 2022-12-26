import React, { useEffect, useState } from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData;
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.authR)
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            navigate('/')
        }
        dispatch(reset());
        if (isLoading) {
            return <Spinner />
        }
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const userData = { email, password }
        dispatch(login(userData))
        if (isLoading) return <Spinner />
    }
    return (
        <>
            <section className="heading">
                <h1><FaSignInAlt /> Login</h1>
                <p>Login to an account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>

                    <div className="form-group">
                        <input type="text" name="email" id="email" className='form-control' value={email} placeholder='Enter your email' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" id="password" className='form-control' value={password} placeholder='Enter your password' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login