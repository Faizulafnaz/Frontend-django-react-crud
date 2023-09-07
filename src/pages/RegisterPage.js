import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const RegisterPage = () => {
    const navigate = useNavigate()
    const {signup} = useContext(AuthContext)
  return (
    <div>
         <section className="vh-100 bg-image">
          <div className="mask d-flex align-items-center h-100">
            <div className="container h-75">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6 d-flex justify-content-center">
                  <div className="card" style={{borderRadius: "15px",width:"80%"}}>
                    <div className="card-body p-5">
                      <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                      <form onSubmit={signup}>

                        <div className="form-outline mb-2">
                          <input type="text" name='username' id="form3Example1cg" className="form-control form-control-lg" required/>
                          <label className="form-label" htmlFor="form3Example1cg">Username</label>
                        </div>

                        <div className="form-outline mb-2">
                          <input type="email" name='email' id="form3Example3cg" className="form-control form-control-lg" required/>
                          <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                        </div>

                        <div className="form-outline mb-2">
                          <input type="password" name='password' id="form3Example4cg" className="form-control form-control-lg" required/>
                          <label className="form-label" htmlFor="form3Example4cg">Password</label>
                        </div>

                        <div className="form-outline mb-2">
                          <input type="password" name='confirmPassword' id="form3Example4cdg" className="form-control form-control-lg" required/>
                          <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                        </div>


                        <div className="d-flex justify-content-center">
                          <button type="submit"
                            className="btn btn-success btn-block btn-lg text-body">Register</button>
                        </div>

                        <p className="text-center text-muted mt-4 mb-0">Have already an account? <a href="#!"
                            className="fw-bold text-body"><u  onClick={()=>navigate('/login')}>Login here</u></a></p>

                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
    </div>
  )
}

export default RegisterPage