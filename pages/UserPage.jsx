const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { userService } from "../services/user.service.js"
import { updateUserDetails } from "../store/actions/user.actions.js"

export function UserPage() {

    const [user, setUser] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadUser()
    }, [params.userId])

    function loadUser() {
        userService.getById(params.userId)
            .then(setUser)
            .catch(err => {
                console.log('err:', err)
                navigate('/')
            })
    }
    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setUser(prevDetails => ({ ...prevDetails, [field]: value }))
    }

    function onSaveUser(ev) {
        ev.preventDefault()
        updateUserDetails()
            .then(({ updated: updatesUser }) => {
                navigate('/todo')
                showSuccessMsg(`Todo Saved (id: ${updatedUser._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save todo')
                console.log('err:', err)
            })
    }

    if (!user) return <div>Loading...</div>

    return <section className="user-details">
        <pre>
            <h2>Username: {user.username}</h2>
            <h2>User Id: {user._id}</h2>
        </pre>
        <h1>Full Name {user.fullname}</h1>
        <form onSubmit={onSaveUser}>
            <input type='text' value={user.fullname} name="fullname" onChange={handleChange} />
        </form>
        <Link to="/todo">Back</Link>
    </section>
}