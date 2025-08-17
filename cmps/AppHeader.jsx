const { useSelector } = ReactRedux
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useEffect, useState } = React

import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { todoService } from '../services/todo.service.js'
import { ProgressChart } from './ProgressChart.jsx'


export function AppHeader() {

    const loggedinUser = useSelector(state => state.loggedinUser)
    const todos = useSelector(state => state.todos)
    const [progressStats, setProgressStats] = useState([])

    useEffect(() => {
        todoService.query()
        .then(() => { })
        todoService.getProgressStats()
        .then(setProgressStats)
    }, [loggedinUser])


    function onLogout() {
        logout()
            .catch(err => {
                showErrorMsg('OOPs try again')
            })
    }


    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    <ProgressChart data={progressStats} />
                {loggedinUser ? (
                    < section >
                        <Link to={`/user/${loggedinUser._id}`}>Hello {loggedinUser.fullname}</Link>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )}
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
