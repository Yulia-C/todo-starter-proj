import { debounce } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function TodoFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounce = useRef(debounce(onSetFilterBy, 500)).current


    useEffect(() => {
        onSetFilterDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            // default: break
            default:
                if (field === 'isDone') {
                    if (value === 'true') value = true
                    else if (value === 'false') value = false
                    else value = ''
                }

        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, importance, isDone } = filterByToEdit
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={txt || ''} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <label htmlFor="importance">Importance: </label>
                <input value={importance || ''} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
                />
                <div className="radio-btns">

                    <label htmlFor="isDone-all">All
                        <input value='' id="isDone-all" type="radio" onChange={handleChange} name="isDone"
                            checked={ filterByToEdit.isDone === ''} />
                    </label>
                    <label htmlFor="isDone-true">Done
                        <input value="true" id="isDone-true" type="radio" onChange={handleChange} name="isDone"
                            checked={filterByToEdit.isDone === true} />
                    </label>
                    <label htmlFor="isDone-false">
                        In progress
                        <input
                            id="isDone-false"
                            type="radio"
                            name="isDone"
                            value="false"
                            onChange={handleChange}
                            checked={filterByToEdit.isDone === false}
                        />
                    </label>
                </div>
                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}