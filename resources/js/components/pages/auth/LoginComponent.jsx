import React, { useEffect, useState, } from 'react'
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
import { login, authorize, } from '../../../redux/actions/authActions'

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
    return (
      <Container maxWidth="xs" sx={{ textAlign: 'center', }}>
        <Helmet>
          <title>Login | {import.meta.env.VITE_APP_NAME}</title>
        </Helmet>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container maxWidth="xs">
      <Helmet>
        <title>Login | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <Paper sx={{ p: 4, }}>
        <Typography variant="h5" sx={{ mb: 2, }}>Login</Typography>
        <ErrorComponent error={error}/>
        <Box component="form" onSubmit={onFormSubmit}>
          <Stack spacing={2}>
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
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Button href="/user/register" variant="outlined">
                Register
              </Button>
              <Button type="submit" variant="contained" color="success">
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}

