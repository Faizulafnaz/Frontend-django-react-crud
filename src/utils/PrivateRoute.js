import { Route, Routes, useNavigate } from "react-router-dom";

import React from 'react'
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

const PrivateRoute = () => {
    const navigate = useNavigate()
    const auth = true
    if (auth){
    return <HomePage></HomePage>}
    else{
        return <LoginPage></LoginPage>
    }
}

export default PrivateRoute