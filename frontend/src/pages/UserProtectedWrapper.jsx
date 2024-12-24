import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext'

const UserProtectedWrapper = ({children}) => {

    const navigate=useNavigate()
    const token=localStorage.getItem('token')
    const {user, setUser}=useContext(UserDataContext) 
    const [isLoading, setIsLoading]=useState(true)

    useEffect(()=>{
        if(!token){
            navigate('/login')
        }

         // api calling
         axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
          headers:{
              Authorization:`Bearer ${token}`
          }}).then((response)=>{
              setUser(response.data.captain)
              setIsLoading(false)
          }).catch((error)=>{
              console.log(error);
              localStorage.removeItem('token')    
              navigate('/captain-login')
          })

    },[token])

    if(isLoading){
      return <div>Loading...</div>
  }


  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper