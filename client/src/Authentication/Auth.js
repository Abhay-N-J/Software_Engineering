import { useEffect, useRef, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Snackbar } from "../Components/Snackbar";
import Axios from "../Misc/Axios"
import { clear, setToken } from "../Misc/Tokens"
import { useNavigate } from "react-router-dom";

export default function Auth({login}) {

    const [isLoading, setLoading] = useState(false);
    const [isLogin, setLogin] = useState(login);
    const snackbarRef = useRef()
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false)
    }, [])

    
    const onPress = () => {
        setLogin(!isLogin);
    }

    const _showSnackbarHandler = (message) => {
        snackbarRef.current.openSnackBar(message)
    }

    const onSignIn = (body) => {
        clear()
        setLoading(true);
        console.log(body)
        localStorage.setItem("email",body.email)
        Axios.post('/login', body, { 
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            if (response?.data?.error === false) {
                // console.log(response.data)
                setToken(JSON.stringify(response.data.token))
                navigate('/')
            }
            else {
                _showSnackbarHandler(response.data.error)
            }
            setTimeout(() => setLoading(false), 3000);  
        }).catch((err) => {
            if (err?.response?.data?.error !== undefined || err?.response?.data?.error !== null )
                _showSnackbarHandler(err?.response?.data?.error)
            else 
                _showSnackbarHandler(err.message)
            setTimeout(() => setLoading(false), 3000);  
        })
    }

    const onSignUp = (body) => {
        clear()
        setLoading(true);
        Axios.post('/signup', body, { 
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(response => {
            if (response?.data?.error === false) {
                setLogin(!isLogin)
                _showSnackbarHandler("Registration Successful")
            }
            else {
                _showSnackbarHandler(response?.data?.error)
            }
            setTimeout(() => setLoading(false), 3000);  
        }).catch(err => {
            if (err?.response?.data?.error !== undefined || err?.response?.data?.error !== null )
                _showSnackbarHandler(err?.response?.data?.error)
            else 
                _showSnackbarHandler(err.message)
            setTimeout(() => setLoading(false), 3000);  
        })
    }
    if(isLogin) {
        return (
            <div key={isLoading} >
                <Snackbar ref = {snackbarRef}/>

                <SignIn onSignIn={onSignIn} onPress={onPress} isLoading={isLoading}/>
            </div>
        )
        }
    else {
        return (
            <div key={isLoading}>
            <Snackbar ref = {snackbarRef} />

            <SignUp  onSignUp={onSignUp} onPress={onPress} isLoading={isLoading} />
            </div>
        )
    }
}