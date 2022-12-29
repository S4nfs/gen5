import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import { getGoals, reset } from '../features/goals/goalSlice'
import Spinner from '../components/Spinner';
import GoalItem from '../components/GoalItem'


const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authR)
    const { goals, isLoading, isSuccess, isError, message } = useSelector((state) => state.goalR)

    useEffect(() => {
        if (isError) {
            console.log(message)
        }
        if (!user) {
            navigate('/login')
        }
        dispatch(getGoals())
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])
    // if (isLoading) {
    //     return <Spinner />
    // }
    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>
            <GoalForm />
            <section className="content">
                {goals.length > 0 ? (
                    <div className="goals">
                        {goals.map((goal) => (
                            <GoalItem key={goal._id} goal={goal} />
                        ))}
                    </div>
                ) : (
                    <h3>You are too lazy to set any goals</h3>
                )}
            </section>
        </>
    )
}

export default Dashboard