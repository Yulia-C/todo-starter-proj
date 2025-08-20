const { useSelector, useDispatch } = ReactRedux
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useEffect, useState } = React

import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { todoService } from '../services/todo.service.js'
import { setProgressStats } from '../store/actions/todos.actions.js'


export function AppHeader() {

    const loggedinUser = useSelector(state => state.loggedinUser)
    const todos = useSelector(state => state.todos)
    const progressStats = useSelector(state => state.progressStats)
    const dispatch = useDispatch()

    useEffect(() => {
        if (loggedinUser) {
            setProgressStats()
        }
    }, [loggedinUser])


    function onLogout() {
        logout()
            .then(() => showSuccessMsg('Logged out'))
            .catch(err => {
                showErrorMsg('OOPs try again')
            })
    }

        // const formattedPercent = todos ? progressStats.toFixed(2) + '%' : null

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                <nav className="app-nav">
                    {/* <NavLink to="/" >Home</NavLink> */}
                    {loggedinUser && (< section className="container">
                        <h4>Done Progress: {progressStats.value + '%'}
                        </h4>
                        <div className="progress-bar-container" >
                            <span>{progressStats.value + '%'}</span >
                            <div style={{ width: progressStats.value + 'px' }}>

                            </div>
                        </div>
                    </section >)}

                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    {loggedinUser ? (
                        < section >
                            <Link to={`/user/${loggedinUser._id}`}>Hello {loggedinUser.fullname} <span className="balance">${loggedinUser.balance}</span></Link>
                            <button onClick={onLogout}>Logout</button>
                        </ section >
                    ) : (
                        <section>
                            <LoginSignup />
                        </section>
                    )}
                </nav>
            </section >
            <UserMsg />
        </header >
    )
}
