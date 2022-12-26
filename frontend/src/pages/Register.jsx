import React, { useEffect, useState } from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner';


const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formData;
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
        if (password != password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name, email, password
            }
            dispatch(register(userData))
        }
    }
    return (
        <>
            <section className="heading">
                <h1><FaUserAlt /> Register</h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" name="name" id="name" className='form-control' value={name} placeholder='Enter your name' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" name="email" id="email" className='form-control' value={email} placeholder='Enter your email' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" id="password" className='form-control' value={password} placeholder='Enter your password' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password2" id="password2" className='form-control' value={password2} placeholder='Confirm your password' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register