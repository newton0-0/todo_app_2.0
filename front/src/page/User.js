import { useState } from "react"
import authService from "../authHandler/AuthHandle"

const UserLogin = () => {
    const [username, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(null)

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await authService.login(username, password)
            (res.accessToken) ? window.location.replace('/') : setErr(res.error)
        } catch (error) {
            setErr(error)
        }
    }

    return(
        <div className="loginform">
            <form onSubmit={handleLogin}>
                <h2>User Login</h2>

                <label><b><h3>username</h3></b></label>
                <input 
                type="text" 
                value={username}
                onChange={(e) => {setUser(e.target.value)}}
                />

                <label><b><h3>password</h3></b></label>
                <input 
                type="password"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}} 
                />

                <button className="loginsubmit"><h3>login</h3></button>
                { err && <div className="error">{ err }</div> }
            </form>
        </div>
    )
}

export default UserLogin