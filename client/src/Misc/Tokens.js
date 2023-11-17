export const setToken = (token) => {
    sessionStorage.setItem("token", token)
}

export const getToken = () => {
    return JSON.parse(sessionStorage.getItem("token"))
    
}

export const clear = () =>{
    sessionStorage.clear()
}

