import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const {loginUser} = useContext(AuthContext)
    const navigate = useNavigate()
  return (
      <div>
        <section className="vh-100 bg-image">
          <div className="mask d-flex align-items-center h-100">
            <div className="container h-75">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6 d-flex justify-content-center">
                  <div className="card" style={{borderRadius: "15px",width:"80%"}}>
                    <div className="card-body p-5">
                      <h2 className="text-uppercase text-center mb-5">Login Here</h2>

                      <form onSubmit={loginUser}>

                        <div className="form-outline mb-2">
                          <input type="text" name='username' id="form3Example3cg" className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form3Example3cg">Username</label>
                        </div>

                        <div className="form-outline mb-2">
                          <input name='password' type="password" id="form3Example4cg" className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form3Example4cg">Password</label>
                        </div>


                        <div className="d-flex justify-content-center">
                          <button type="submit"
                            className="btn btn-success btn-block btn-lg text-body">Login</button>
                        </div>

                        <p className="text-center text-muted mt-4 mb-0">Don't yet registered?
                            <u  onClick={()=>navigate('/register')}>SignUp here</u></p>

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

export default LoginPage