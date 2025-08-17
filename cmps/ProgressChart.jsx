export function ProgressChart({ data }) {
    const progressItem = data.find(item => item.title === 'progress')
    return (
        <section>
            <h3>Done Progress: {progressItem ? progressItem.value + '%' : 'N/A'}
            </h3>
        </section>
    )
}