
import { todoService } from "../../services/todo.service.js"
import { HIDE_LOADER, SET_TODOS, SHOW_LOADER, store } from "../store.js"

export function loadTodos() {

    store.dispatch({ type: SHOW_LOADER })

    return todoService.query()
        .then(todos => { store.dispatch({ type: SET_TODOS, todos }) })
        .catch(err => {
            console.log('err:', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: HIDE_LOADER })
        })
}

