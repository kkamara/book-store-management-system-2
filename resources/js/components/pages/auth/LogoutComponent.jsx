import React, { useEffect, } from "react"
import { useDispatch, useSelector, } from "react-redux"
import { Helmet, } from "react-helmet"
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import { logout, } from "../../../redux/actions/authActions"

export default function LogoutComponent() {
  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(logout())
  }, [])

  if (authState.loading) {
    return (
      <Container sx={{ textAlign: 'center', }}>
        <Helmet>
          <title>Logout | {import.meta.env.VITE_APP_NAME}</title>
        </Helmet>
        <CircularProgress />
      </Container>
    )
  }

  return null
}
