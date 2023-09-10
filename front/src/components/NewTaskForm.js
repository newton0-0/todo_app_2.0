import { useState } from "react"
import authService from "../authHandler/AuthHandle"
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';

const NewTaskForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const username = authService.getUser()
        const task = { username, title, description, status: 1 }

        console.log(task)

        const res = await fetch('/', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log('heyyyyyyyyyyyy', res)

        const json = await res.json()

        if(!res.ok) {
            setError(json.error)
        }
        if(res.ok) {
            setError(null)
            setTitle('')
            setDescription('')
        }
        window.location.replace("/")
    }

    return(
        <div className="newtaskform">
            <form>
                <h3><b><PlaylistAddOutlinedIcon/></b></h3>

                <label><b><h4>Title</h4></b></label>
                <input 
                className="in"
                type="text"
                value={title}
                onChange={(e) => {setTitle(e.target.value)}} 
                />

                <label><b><h4>..description</h4></b></label>
                <input 
                placeholder="optional, for in case need"
                className="in"
                type="text"
                value={description}
                onChange={(e) => {setDescription(e.target.value)}} 
                />

                <button className="formsubmit" onClick={handleSubmit}><h3><PublishOutlinedIcon/></h3></button>

                <p className="error">{ error }</p>
            </form>
        </div>
    )
}

export default NewTaskForm