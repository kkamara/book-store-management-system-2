import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { Helmet, } from "react-helmet"
import { login, authorize, } from '../../../redux/actions/authActions'

import "./LoginComponent.scss"
import ErrorComponent from '../../layouts/ErrorComponent'

export default function LoginComponent() {
  const [email, setEmail] = useState("jane@example.com")
  const [password, setPassword] = useState("secret")
  const [error, setError] = useState("")

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
  }))

  useEffect(() => {
    if (state.auth.data) {
      window.location.href = "/"
    } else if (state.auth.loading) {
      dispatch(authorize())
    } else if (state.auth.error) {
      setError(state.auth.error)
    }
  }, [state.auth])

  const onFormSubmit = (e) => {
    e.preventDefault()
    setError("")

    dispatch(login({ email, password, }))

    setEmail("")
    setPassword("")
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  if (state.auth.loading) {
    return <div className='container login-container text-center'>
      <Helmet>
          <title>Login | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <p>Loading...</p>
    </div>
  }

  return (
    <>
      <div className='container login-container'>
        <Helmet>
            <title>Login | {import.meta.env.VITE_APP_NAME}</title>
        </Helmet>
        <div className="col-md-4 offset-md-4">
          <h3 className="lead">Login</h3>
          <form method="post" onSubmit={onFormSubmit}>
            <ErrorComponent error={error}/>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                name="email" 
                className="form-control"
                value={email}
                onChange={onEmailChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password"
                name="password" 
                className="form-control"
                value={password}
                onChange={onPasswordChange}
              />
            </div>
            <a 
              href="/user/register" 
              className="btn btn-primary"
            >
              Register
            </a>
            <input 
              type="submit" 
              className="btn btn-success" 
            />
          </form>
        </div>
      </div>
    </>       
  )
}
