export function ProgressChart({ data }) {
    const progressItem = data.find(item => item.title === 'progress')
    return (
        <section>
            <h4>Done Progress: {progressItem ? progressItem.value + '%' : 'N/A'}
            </h4>
        </section>
    )
}