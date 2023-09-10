import { useState } from "react"
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';

const TaskCard = ({ task, stat }) => {
    const [editTitle, setEditTitle] = useState(false)
    const [submitEdit, setSubmit] = useState(false)
    const [newTitle, setNewTitle] = useState(task.title)
    const [newDescription, setNewDesc] = useState(task.description)
    const handleSubmit = async (e) => {
        e.preventDefault()

        const newStatus = {
            status : task.status+1
        }
        const res = await fetch('/' + task._id, {
            method: 'PATCH',
            body: JSON.stringify(newStatus),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(res)
        const json = await res.json()
        window.location.reload()
    }

    const handleEdit = async (e) => {
        e.preventDefault()

        const newTask = {
            title: newTitle,
            description: newDescription
        }
        console.log(newTask)
        const res = await fetch('/' + task._id, {
            method: 'PATCH',
            body: JSON.stringify(newTask),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const json = await res.json()

        console.log(res)
        console.log(json)
        window.location.reload()
    }

    const handleDelete = async (e) => {
        e.preventDefault()

        const res = await fetch('/' + task._id, {
            method: 'DELETE'
        })

        const json = await res.json()
        window.location.reload()
    }

    return(
        <div className="taskcard">
            <button onClick={() => setEditTitle(!editTitle)} className="editbutton"><EditOutlinedIcon/></button>
            <button onClick={handleDelete} className="deletebutton"><DeleteForeverOutlinedIcon/></button>
            <div className="taskbox">
                <h3 className="tasktitle">{ editTitle ? <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/> : task.title}</h3>
                <p className="taskdes">{ editTitle ? <textarea type="text" value={newDescription} onChange={(e) => setNewDesc(e.target.value)}/> : task.description }</p>
            </div>
            <h6>{<SimpleDateTime dateFormat="DMY" dateSeparator="/"  timeSeparator=":">{task.updatedAt}</SimpleDateTime>}</h6>
            <button onClick={editTitle ? handleEdit : handleSubmit} className="taskstatusbutton">{ editTitle ? <PublishOutlinedIcon/> : stat}</button>
        </div>
    )
}

export default TaskCard