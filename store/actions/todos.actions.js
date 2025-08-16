import { todoService } from "../../services/todo.service.js"
import { SET_TODOS, store } from "../store.js"


export function loadTodos() {
    return todoService.query()
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))
}