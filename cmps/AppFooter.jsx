import { setProgressStats } from "../store/actions/todos.actions.js"

const { useSelector, useDispatch } = ReactRedux
const { useEffect } = React

export function AppFooter() {
    // TODO: move to store state
    const dispatch = useDispatch()
    const loggedinUser = useSelector(state => state.loggedinUser)

    const progressStats = useSelector(state => state.progressStats)

    useEffect(() => {
        if (loggedinUser) {
            setProgressStats()
        }
    }, [loggedinUser])


    return (
        <footer className="app-footer">
            <p>Coffeerights &copy; 2024 </p>
            <section className="progress-stats">
                {loggedinUser && (< section className="container">
                    <h4>Done Progress: {progressStats.value + '%'}
                    </h4>
                    <div className="progress-bar-container" >
                        <span>{progressStats.value + '%'}</span >
                        <div style={{ width: progressStats.value + 'px' }}>

                        </div>
                    </div>
                </section >)}
            </section>
        </footer>
    )
}