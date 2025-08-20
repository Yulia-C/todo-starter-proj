
import { todoService } from "../../services/todo.service.js"
import { ADD_TODO, SET_IS_LOADING, REMOVE_TODO, SET_FILTER, SET_TODOS, store, UPDATE_TODO, SET_DONE_TODOS_PERCENT } from "../store.js"

export function loadTodos(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return todoService
        .query(filterBy)
        .then(todos => {
            // .then(({ todos, progressStats }) => {
            store.dispatch({ type: SET_TODOS, todos })
            // setProgressStats(progressStats)
            // return todos
        })
        .catch(err => {
            console.log('err:', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
            // setProgressStats(progressStats)
        })
}

export function saveTodo(todoToSave) {
    const type = todoToSave._id ? UPDATE_TODO : ADD_TODO

    return todoService
        .save(todoToSave)
        // .then(({ progressStats, savedTodo }) => {
        .then(savedTodo => 

            store.dispatch({ type, todo: savedTodo })
            // setProgressStats(progressStats)
            // return savedTodo
        )
}

export function setProgressStats(progressStats) {
    return todoService.getProgressStats()
        .then(progressStats => {
            const progressItem = progressStats.find(item => item.title === 'progress')
            store.dispatch({ type: SET_DONE_TODOS_PERCENT, progressStats: progressItem })
        }
        )
}