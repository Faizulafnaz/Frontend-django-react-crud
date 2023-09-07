import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import 'font-awesome/css/font-awesome.min.css';
import { Button } from 'bootstrap';

const ProfilePage = () => {
  let [user, setUser] = useState(null)
  
  let {authTokens, logoutUser} = useContext(AuthContext)

  const [profile_img, setImage] = useState()

  let getProfile = async ()=>{
    
    let response = await fetch('http://127.0.0.1:8000/api/profile/', {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization' : 'Bearer '+String(authTokens.access),

      } 
    })
    let data = await response.json()
    if (response.status === 200){
      setUser(data)
    }else if(response.statusText === 'Unauthorized'){

      return logoutUser()
    }
  }



  let updateProfile = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('username', e.target.username.value);
    formData.append('email', e.target.email.value);
    formData.append('date_of_birth', e.target.DOB.value);
    formData.append('Phone_no', e.target.phone_no.value);
    if (profile_img) { formData.append('profile_img', profile_img);}

    try {
        const response = await fetch('http://127.0.0.1:8000/api/updateprofile/', {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access),
            },
            body:formData,
        });

        if (response.ok) {
            alert('Profile updated successfully');
            const closeButton = document.querySelector('.btn-secondary[data-bs-dismiss="modal"]');
            closeButton.click();
            getProfile()
        } else if (response.status === 401) {
            return logoutUser();
        } else {
            alert('Profile update failed');
        }
    } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred while updating the profile');
    }
};

  useEffect(()=>getProfile, [])

  

  return (
    
    <div>
           
            <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                <div className="row g-0 p-3">
                                    <div className="col-md-4 gradient-custom text-center text-white"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        <img src={user?.profile_img ? `http://127.0.0.1:8000/${user.profile_img}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"}
                                            alt="Avatar" className="img-fluid my-5" style={{ width: 80 }} />
                                        <h5 style={{ color : '#000000'}}>{user?.username}</h5>
                                        <button data-bs-toggle="modal" data-bs-target="#updateModal" style={{ cursor: 'pointer', color:"#000000" }} className='btn btn-success'>Edit</button>
                                        
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h6>Information</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Email</h6>
                                                    <p className="text-muted">{user?.email}</p>
                                                </div>  
                                                <div className="col-6 mb-3">
                                                    <h6>Phone</h6>
                                                    <p className="text-muted">{user?.Phone_no}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Date_of_Birth</h6>
                                                    <p className="text-muted">{user?.date_of_birth}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="profile-update-form" onSubmit={updateProfile}>
                            <div className="modal-body">
                                <div style={{height:'100px'}} className="mb-3 d-flex justify-content-center">
                                    <div style={{width:'100px'}} className='h-100'>
                                        {
                                        profile_img?
                                            <img className='w-100' src={URL.createObjectURL(profile_img)} ></img>
                                        :
                                            <img className='w-100' src={user?.profile_img ? user.profile_img : ""} ></img>
                                        }
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="profile-img" className="col-form-label">Profile image</label>
                                    <input type="file" className="form-control" id="profile-img" 
                                        onChange={(e)=>{ 
                                        if(e.target.value[0] != null)
                                        setImage(e.target.files[0])}} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="col-form-label">Username:</label>
                                    <input name='username' type="text" className="form-control" id="username" defaultValue={user?.username} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="col-form-label">Email:</label>
                                    <input name='email' className="form-control" id="email" defaultValue={user?.email} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="DOB" className="col-form-label">Date_of_Birth:</label>
                                    <input name='DOB' className="form-control" id="DOB" type='date' defaultValue={user?.date_of_birth} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone_no" className="col-form-label">Phone_no:</label>
                                    <input name='phone_no' className="form-control" id="phone_no" defaultValue={user?.Phone_no} />
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

export default ProfilePage