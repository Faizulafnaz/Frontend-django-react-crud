import { createContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    let loginUser = async (e)=>{
        e.preventDefault()
        console.log('form submitted')
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        if (response.status === 200){

            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        }else{
            alert('Something went wrong!')
        }
    }

    let signup = async (e)=>{
        e.preventDefault()
        if (e.target.password.value !== e.target.confirmPassword.value){
            return alert('password do not match')
        }
        let response = await fetch('http://127.0.0.1:8000/register/', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value, 'email':e.target.email.value})
        })
        let data = await response.json()
        if (data.response === 'registered'){
            navigate('/login')
            alert('Account created succesfully')
        }else if(data.username){
            alert(data.username)
        }else if(data.email){
            alert(data.email)
        }else{
            alert('somethingwrong')
        }
    }

    let updateToken = async ()=>{
        console.log('updateToken working')
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })
        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            
        }else{
            logoutUser() 
        }
        if(loading){
            setLoading(false)
        }
    }   

    

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    

    const contextData = {
        loginUser,
        user,
        authTokens,
        logoutUser,
        signup,
    }

    useEffect(()=>{
        if (loading){
            updateToken()
        }
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {loading? null :children}
        </AuthContext.Provider>
    )
}

