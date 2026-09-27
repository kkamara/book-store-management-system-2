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
import { update, } from '../../../redux/actions/updateAccountActions'

import ErrorComponent from '../../layouts/ErrorComponent'

export default function AccountComponent() {
  const state = useSelector(state => ({
    auth: state.auth,
    updateAccount: state.updateAccount,
  }))
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [error, setError] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    setName(state.auth.data.name)
    setEmail(state.auth.data.email)
    setPassword("")
    setPasswordConfirmation("")
    setNewPassword("")
    setNewPasswordConfirmation("")
    setError("")
  }, [])

  useEffect(() => {
    if (!state.updateAccount.loading) {
      if (
        typeof state.updateAccount.data === "object" &&
        null !== state.updateAccount.data &&
        !state.updateAccount.error
      ) {
        setName(state.updateAccount.data.name)
        setEmail(state.updateAccount.data.email)
        setPassword("")
        setPasswordConfirmation("")
        setNewPassword("")
        setNewPasswordConfirmation("")
        setError("")
      } else if (state.updateAccount.error) {
        setError(state.updateAccount.error)
      }
    }
  }, [state.updateAccount])

  const onFormSubmit = (e) => {
    e.preventDefault()
    setError("")

    dispatch(update({
      changePassword: newPassword,
      changePasswordConfirmation: newPasswordConfirmation,
      name,
      email,
      password,
      passwordConfirmation,
    }))
  }

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onChangePasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const onChangePasswordConfirmationChange = (e) => {
    setNewPasswordConfirmation(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onPasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value)
  }

  if (
    !state.auth.loading &&
    typeof state.auth.data === "object" &&
    null !== state.auth.data
  ) {
    console.log("auth", state.auth.data)
  }

  if (
    !state.updateAccount.loading &&
    typeof state.updateAccount.data === "object" &&
    null !== state.updateAccount.data
  ) {
    console.log("updateAccount", state.updateAccount.data)
  }

  if (state.auth.loading || state.updateAccount.loading) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', }}>
        <Helmet>
          <title>Account | {import.meta.env.VITE_APP_NAME}</title>
        </Helmet>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container maxWidth="sm">
      <Helmet>
        <title>Account | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <Paper sx={{ p: 4, }}>
        <Typography variant="h5" sx={{ mb: 2, }}>Account</Typography>
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
              label="Change Password"
              type="password"
              name="newPassword"
              fullWidth
              value={newPassword}
              onChange={onChangePasswordChange}
            />
            <TextField
              label="Change Password Confirmation"
              type="password"
              name="newPasswordConfirmation"
              fullWidth
              value={newPasswordConfirmation}
              onChange={onChangePasswordConfirmationChange}
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
            <Box sx={{ textAlign: 'right', }}>
              <Button type="submit" variant="contained" color="success">
                Save
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}
