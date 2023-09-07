import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {

  const [users,setUsers] = useState([])

  let {user, logoutUser, authTokens} = useContext(AuthContext)
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  
  const openModal = () => {
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };


  const updateUser = async (id, e)=>{
      e.preventDefault()
      let credentials = {}
      if (e.target.username.value !== editingUser.username){
        console.log('done user')
        credentials['username'] = e.target.username.value
      }
      if (e.target.email.value !== editingUser.email){
        credentials['email'] = e.target.email.value
        console.log('done email')
      }
      if (e.target.username.value === editingUser.username && e.target.email.value === editingUser.email){
        console.log('hi')
        getUser()
        const closeButton = document.querySelector('.btn-secondary[data-bs-dismiss="modal"]');
        closeButton.click();
        return
      }
      console.log(credentials)
      let response = await fetch(`http://127.0.0.1:8000/api/user-detail/${id}/`, {
          method:'PATCH',
          headers:{
            'Content-Type':'application/json',
            'Authorization' : 'Bearer '+String(authTokens.access),
    
          },
          body:JSON.stringify(credentials) 
        })
        if (response.status === 200){
          getUser()
          const closeButton = document.querySelector('.btn-secondary[data-bs-dismiss="modal"]');
          closeButton.click();
        }else if(response.statusText === 'Unauthorized'){
    
          return logoutUser()
        }else{
          alert('username or email is already existing')
        }

  }


  const deleteUser = async (id)=>{
      let response = await fetch(`http://127.0.0.1:8000/api/user-detail/${id}/`, {
          method:'DELETE',
          headers:{
            'Content-Type':'application/json',
            'Authorization' : 'Bearer '+String(authTokens.access),
    
          },
          
        })
        if (response.status === 204){
          getUser()
        }else if(response.statusText === 'Unauthorized'){
    
          return logoutUser()
        } 
  }
  const searchUser = async (keyword)=>{
        if (!keyword == ''){
        let response = await fetch(`http://127.0.0.1:8000/api/user-list/?search=${keyword}`, {
            method:'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization' : 'Bearer '+String(authTokens.access),
      
            } 
          })
          let data = await response.json()
          console.log(data)
          if (response.status === 200){
            
            setUsers(data)
          }else{
            getUser()
          }
        }else{
            getUser()
        }
    }
    



    const getUser = async ()=>{
        let response = await fetch('http://127.0.0.1:8000/api/user-list/', {
            method:'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization' : 'Bearer '+String(authTokens.access),
      
            } 
          })
          let data = await response.json()
          if (response.status === 200){
            setUsers(data)
          }else if(response.statusText === 'Unauthorized'){
      
            return logoutUser()
          } 
    }

    useEffect(()=>{
        if (!user?.is_superuser){
            navigate('/login')
        }else{
            getUser()
        }
    }, [])

    
  return (
    <div className='d-flex ' >
    <div className='vh-100 bg-dark px-3 pt-3' style={{width:'19%'}} >

    <button onClick={logoutUser} style={{position:'fixed',bottom:20,left:30}} className='btn btn-danger mx-auto'> <i className='fa fa-exit' ></i> Logout </button>
    </div>
    <div className='m-4 w-75'>
    <div className='tabelHead d-flex justify-content-between align-items-center' >
      <h2>Users</h2>
      <input type="text" onChange={(e)=>searchUser(e.target.value)} className="form-control w-25 my-3" placeholder='Search here' />
    </div>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">User Id</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">

        {
          users.length>0 ?
          users.map((usr,idx)=>{
            return(
            <tr key={idx}>
              <th scope="row">{usr.id}</th>
              <td>{usr.username}</td>
              <td>{usr.email}</td>
              <td><button onClick={() => {
                                    setEditingUser(usr);
                                    openModal();
                                    }} className='btn btn-sm btn-warning' data-bs-toggle="modal" data-bs-target="#updateModal"><i className='fa fa-edit' ></i></button></td>
              <td><button onClick={()=>deleteUser(usr.id)} className='btn btn-sm btn-danger'style={{color:'white!important'}} ><i className='fa fa-trash' ></i></button></td>
            </tr>

            )
          })
          : <tr><td colSpan={3} ><h2>Users doesn't found</h2></td></tr>
        }
        
      </tbody>
    </table>
    </div> 
    {/* code for modal */}
    <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel"   aria-hidden={!isModalOpen}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="profile-update-form" onSubmit={(e)=>updateUser(editingUser?.id, e)}>
                            <div className="modal-body">
                                
                               
                                <div className="mb-3">
                                    <label htmlFor="username" className="col-form-label">Username:</label>
                                    <input name='username' type="text" className="form-control" id="username" defaultValue={editingUser?.username} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="col-form-label">Email:</label>
                                    <input name='email' className="form-control" id="email" defaultValue={editingUser?.email} />
                                </div>
                             
                            </div>
                            {/* <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            Change Password
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            <div className="mb-3">
                                                <label htmlFor="password" className="col-form-label">Password</label>
                                                <input type="password" className="form-control" id="password"  />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="confirmPassword" className="col-form-label">Confirm Password:</label>
                                                <input className="form-control" type='password' id="confirmPassword" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" >Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

    
  </div>
  )
}

export default AdminPage