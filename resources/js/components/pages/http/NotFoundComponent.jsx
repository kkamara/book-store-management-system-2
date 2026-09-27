import React from 'react'
import { Helmet, } from "react-helmet"
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export default function NotFoundComponent() {
  return (
    <Container sx={{ textAlign: 'center', mt: 6, }}>
      <Helmet>
        <title>404 Not Found | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <Typography variant="h3">404 | Not Found</Typography>
    </Container>
  )
}
