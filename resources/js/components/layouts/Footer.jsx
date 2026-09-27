import React from "react"
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ textAlign: 'center', my: 4, }}
    >
      <Link
        href="https://www.kelvinkamara.com"
        underline="hover"
      >
        www.kelvinkamara.com
      </Link>
    </Box>
  )
}