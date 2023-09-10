const AchePage = ({ task }) => {
    const handleSubmit = async () => {
        const res = await fetch('/' + task._id, {
            method: 'PATCH',
            body: JSON.stringify({ status : 1 }),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const json = res.json()
    }

    return(
        <div className="achePage">
            <h4>{ task.title }</h4>
            <button onClick={handleSubmit}>restore</button>
        </div>
    )
}

export default AchePage