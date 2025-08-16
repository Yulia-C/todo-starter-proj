const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'

export const SHOW_LOADER = 'SHOW_LOADER'
export const HIDE_LOADER = 'HIDE_LOADER'
export const SET_FILTER = 'SET_FILTER'

export const SET_USER = 'SET_USER'

const initialState = {
    todos: [],
    isLoading: false,
    filterBy: {
        txt: '',
        importance: 0,
    },
    loggedinUser: null,
}

export function appReducer(state = initialState, cmd = {}) {

    switch (cmd.type) {
        case SET_TODOS:
            return { ...state, todos: cmd.todos }

        case SHOW_LOADER:
            return { ...state, isLoading: true }

        case HIDE_LOADER:
            return { ...state, isLoading: false }

        case SET_FILTER:
            return { ...state, filterBy: cmd.filterBy }

        case SET_USER:
            return { ...state, loggedinUser: cmd.loggedinUser }

        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gTodos = store