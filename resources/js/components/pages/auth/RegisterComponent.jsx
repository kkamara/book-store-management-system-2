import React, { useEffect, useState, } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { Helmet, } from "react-helmet"
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import { register, authorize, } from '../../../redux/actions/authActions'

import ErrorComponent from '../../layouts/ErrorComponent'

export default function RegisterComponent() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [error, setError] = useState("")

  const dispatch = useDispatch()
  const authState = useSelector(state => (state.auth))

  useEffect(() => {
    if (localStorage.getItem("user-token")) {
      return navigate("/")
    } else if (authState.loading) {
      dispatch(authorize())
    } else if (authState.error) {
      setError(authState.error)
    }
  }, [authState,])

  const onFormSubmit = (e) => {
    e.preventDefault()
    setError("")

    dispatch(register({
      password_confirmation: passwordConfirmation,
      name,
      email,
      password
    }))

    setName("")
    setEmail("")
    setPassword("")
    setPasswordConfirmation("")
  }

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onPasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value)
  }

  if (authState.loading) {
    return (
      <Container maxWidth="xs" sx={{ textAlign: 'center', }}>
        <Helmet>
          <title>Register | {import.meta.env.VITE_APP_NAME}</title>
        </Helmet>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container maxWidth="xs">
      <Helmet>
        <title>Register | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <Paper sx={{ p: 4, }}>
        <Typography variant="h5" sx={{ mb: 2, }}>Register</Typography>
        <ErrorComponent error={error}/>
        <Box component="form" onSubmit={onFormSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={name}
              onChange={onNameChange}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={email}
              onChange={onEmailChange}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              fullWidth
              value={password}
              onChange={onPasswordChange}
            />
            <TextField
              label="Password Confirmation"
              type="password"
              name="password_confirmation"
              fullWidth
              value={passwordConfirmation}
              onChange={onPasswordConfirmationChange}
            />
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Button href="/user/login" variant="outlined">
                Login
              </Button>
              <Button type="submit" variant="contained" color="success">
                Register
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}

