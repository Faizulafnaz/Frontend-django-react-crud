import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'


const HomePage = () => {
    let {user, authTokens, logoutUser, signup} = useContext(AuthContext)
    let [notes, setNotes] = useState([])

  
  return (
    
    <div className='homewelcome'>
       
       
    {user ? <h3>Hi {user.username} You are logged in to the home page</h3>:<h3>Hi, please login for more</h3>} 
    </div>
  )
}

export default HomePage