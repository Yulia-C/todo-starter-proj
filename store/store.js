const { createStore } = Redux
export const SET_TODOS = 'SET_TODOS'
export const SHOW_LOADER = 'SHOW_LOADER'
export const HIDE_LOADER = 'HIDE_LOADER'

const initialState = {
    todos: [],
    isLoading: false,
}

export function appReducer(state = initialState, cmd = {}) {

    switch (cmd.type) {
        case SET_TODOS:
            return { ...state, todos: cmd.todos }

        case SHOW_LOADER:
            return { ...state, isLoading: true }
            
        case HIDE_LOADER:
            return { ...state, isLoading: false }

        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gTodos = store