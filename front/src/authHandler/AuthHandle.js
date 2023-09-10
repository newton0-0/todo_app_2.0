const login = async ({username, password}) => {
    const res = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    const json = res.json()
    if(json.accessToken) {
        localStorage.setItem("user", JSON.stringify(json.accessToken))
        window.location.replace('/')
    }
    if(!json.accessToken) {
       // window.location.replace('/login')
    }
}

const logout = () => {
    return localStorage.removeItem("user")
}

const getUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}

const authService = {
    login,
    logout,
    getUser
};

module.exports = authService;