
import { todoService } from "../../services/todo.service.js"
import { ADD_TODO, HIDE_LOADER, REMOVE_TODO, SET_FILTER, SET_TODOS, SHOW_LOADER, store, UPDATE_TODO } from "../store.js"

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

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
}

export function saveTodo(todoToSave) {
    const type = todoToSave._id ? UPDATE_TODO : ADD_TODO

    return todoService.save(todoToSave)
        .then(savedTodo => store.dispatch({ type, todo: savedTodo }))
}