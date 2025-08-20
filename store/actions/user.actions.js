import { userService } from "../../services/user.service.js"
import { SET_USER, SET_USER_BALANCE, store, UPDATE_USER } from "../store.js"

export function login(user) {
    return userService.login(user)
        .then(loggedinUser => {
            store.dispatch({ type: SET_USER, loggedinUser })
            return loggedinUser
        })
        .catch(err => {
            console.log('err:', err)
            throw err
        })
}

export function signup(user) {
    return userService.signup(user)
        .then(loggedinUser => store.diapatch({ type: SET_USER, loggedinUser }))
        .catch(err => {
            console.log('err:', err)
            throw err
        })
}

export function logout() {
    return userService.logout()
        .then(() => store.dispatch({ type: SET_USER, loggedinUser: null }))
        .catch(err => {
            console.log('err:', err)
            throw err
        })
}

export function updateBalance(amount) {
    return userService.updateBalance(+amount)
        .then(updatedBalance => store.dispatch({ type: SET_USER_BALANCE, balance: updateBalance }))
}

export function updateUserDetails(updatedUser) {
    userService.updateUserPrefs(updatedUser)
        .then((updatedUser) => store.dispatch({ type: UPDATE_USER, update: updatedUser }))
}