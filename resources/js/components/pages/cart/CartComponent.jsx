import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { useNavigate, } from "react-router"
import { Helmet, } from "react-helmet"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { authorize, } from '../../../redux/actions/authActions'
import { addToCart, removeFromCart, } from '../../../redux/actions/cartActions'

export default function CartComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
    cart: state.cart,
  }))
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(authorize())
  }, [])

  useEffect(() => {
    if (!state.auth.loading) {
      if (null === state.auth.data) {
        navigate("/user/login")
      } else if (state.auth.error) {
        setError(state.auth.error)
        setLoading(false)
      }
    }
  }, [state.auth])

  useEffect(() => {
    if (!state.cart.error && null === state.cart.data) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [state.cart])

  const handleAddToCart = bookId => {
    dispatch(addToCart(bookId))
  }

  const handleRemoveFromCart = bookId => {
    dispatch(removeFromCart(bookId))
  }

  const getCost = () => {
    let cost = 3.99
    state.cart.data.data.forEach(cartItem => {
      cost += parseFloat(cartItem.cost)
    })
    return (Math.trunc(cost * 100) / 100).toFixed(2)
  }

  const renderList = () => {
    if (!state.cart.data) {
      return null
    }

    return (
      <Stack spacing={2}>
        {state.cart.data.data.map((cartItem, index) => (
          <Card key={index} sx={{ display: 'flex', flexDirection: 'column', }}>
            <CardContent sx={{ textAlign: 'left', flexGrow: 1, display: 'flex', flexDirection: 'column', }}>
              <Typography variant="h6">{cartItem.book.name}</Typography>
              <Typography variant="body2" sx={{ mb: 2, }}>
                Cost: £{cartItem.cost}
              </Typography>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 'auto', }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveFromCart(cartItem.book.id)}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography>{cartItem.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleAddToCart(cartItem.book.id)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Stack>
                <Button
                  href={`/books/${cartItem.book.slug}`}
                  variant="contained"
                >
                  View Book
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    )
  }

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', }}>
        <Helmet>
          <title>Cart | {import.meta.env.VITE_APP_NAME}</title>
        </Helmet>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container sx={{ mb: 4, }}>
      <Helmet>
        <title>Cart | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'left', }}>Cart</Typography>
      <Stack direction={{ xs: 'column', md: 'row', }} spacing={3}>
        <Box sx={{ flex: 3, }}>
          {renderList()}
        </Box>
        <Box sx={{ flex: 1, }}>
          <Paper sx={{ p: 2, textAlign: 'left', }}>
            <Typography>Delivery cost: £3.99</Typography>
            <Typography sx={{ mb: 2, }}>Total cost: £{getCost()}</Typography>
            <Button variant="contained" color="success" fullWidth href="#">
              Checkout
            </Button>
          </Paper>
        </Box>
      </Stack>
    </Container>
  )
}
