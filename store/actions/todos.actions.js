
import { todoService } from "../../services/todo.service.js"
import { HIDE_LOADER, SET_FILTER, SET_TODOS, SHOW_LOADER, store } from "../store.js"

export function loadTodos(filterBy) {
    
    store.dispatch({ type: SET_FILTER, filterBy })
    store.dispatch({ type: SHOW_LOADER })

    return todoService.query(filterBy)
        .then(todos => { store.dispatch({ type: SET_TODOS, todos }) })
        .catch(err => {
            console.log('err:', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: HIDE_LOADER })
        })
}

