import React, { useState, useEffect, } from "react"
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'

export default function ErrorComponent({ error, }) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    setOpen(true)
  }, [error])

  if (!error || "Token not set." === error) {
    return null
  }

  return (
    <Collapse in={open} sx={{ mb: 2, }}>
      <Alert
        severity="warning"
        onClose={() => setOpen(false)}
      >
        {error}
      </Alert>
    </Collapse>
  )
}
