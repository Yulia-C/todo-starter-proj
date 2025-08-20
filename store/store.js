import { todoService } from "../services/todo.service.js"

const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER = 'SET_FILTER'
export const SET_DONE_TODOS_PERCENT = ' SET_DONE_TODOS_PERCENT'
export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'

const initialState = {
    todos: [],
    isLoading: false,
    filterBy: todoService.getDefaultFilter(),
    loggedinUser: null,
    progressStats: 0,
}

export function appReducer(state = initialState, cmd = {}) {

    switch (cmd.type) {
        case SET_TODOS:
            return { ...state, todos: cmd.todos }

        case SET_IS_LOADING:
            return {
                ...state, isLoading: cmd.isLoading
            }

        case SET_FILTER:
            return { ...state, filterBy: { ...state.filterBy, ...cmd.filterBy } }

        case SET_DONE_TODOS_PERCENT:
            return { ...state, progressStats: cmd.progressStats }

        case SET_USER:
            return { ...state, loggedinUser: cmd.loggedinUser }

        case UPDATE_USER:
            return { ...state, loggedinUser: { ...state.loggedinUser, updated: cmd.updated } }

        case SET_USER_BALANCE:
            return { ...state, loggedinUser: { ...state.loggedinUser, balance: cmd.balance } }

        case REMOVE_TODO:
            return { ...state, todos: state.todos.filter(todo => todo._id !== cmd.todoId) }

        case ADD_TODO:
            return { ...state, todos: [...state.todos, cmd.todo] }

        case UPDATE_TODO:
            return { ...state, todos: state.todos.map(todo => todo._id === cmd.todo._id ? cmd.todo : todo) }

        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gTodos = store