const { Fragment, useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, removeTodo, saveTodo } from "../store/actions/todos.actions.js"
import { getTruthyValues } from "../services/util.service.js"
import { store, SET_TODOS, SET_FILTER } from "../store/store.js"
import { updateBalance } from "../store/actions/user.actions.js"


const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {
    const dispatch = useDispatch()

    const todos = useSelector((state) => state.todos)
    const isLoading = useSelector(state => state.isLoading)
    const filterBy = useSelector((state) => state.filterBy)

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setSearchParams(getTruthyValues(filterBy))

        loadTodos(filterBy)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load todos')
            })

    }, [filterBy])

    function onSetFilterBy(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })
    }

    function onRemoveTodo(todoId) {
        const confirm = prompt('Are you sure?')
        if (!confirm) return
        removeTodo(todoId)
            .then(() => {
                const updatedTodos = todos.filter(todo => todo._id !== todoId)
                store.dispatch({ type: SET_TODOS, todos: updatedTodos })
                showSuccessMsg(`Todo removed`)
            })

            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        saveTodo(todoToSave)
            .then(({ todo: savedTodo }) => {
                const updatedTodos = todos.map(todo =>
                    todo._id === savedTodo._id ? savedTodo : todo
                )
                store.dispatch({ type: SET_TODOS, todos: updatedTodos })

                savedTodo.isDone ? updateBalance(10) : updateBalance(0)
                showSuccessMsg(`Todo is ${(savedTodo.isDone) ? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todoToSave._id)
            })
    }

    // if (!todos.length) return <div className="empty">No todos to show...</div>

    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={(onSetFilterBy)} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            {isLoading ? <div className="loader"></div> :
                <Fragment>
                    <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
                    <hr />
                    <h2>Todos Table</h2>
                    <div style={{ width: '60%', margin: 'auto' }}>
                        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
                    </div>
                </Fragment>
            }
        </section>
    )
}