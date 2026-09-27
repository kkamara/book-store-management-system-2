import React, { useEffect, } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { useParams, useNavigate, } from 'react-router'
import moment from 'moment'
import { Helmet, } from "react-helmet"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import { getOrder, } from '../../../redux/actions/orderActions'
import { getOrderBooks, } from '../../../redux/actions/orderBooksActions'

const orderStatusColor = status => {
  switch (status) {
    case "PROCESSING":
    case "PROCESSED":
    case "DELIVERING":
      return "info"
    case "DELIVERED":
      return "success"
    default:
      return "warning"
  }
}

export default function OrderComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
    order: state.order,
    orderBooks: state.orderBooks,
  }))
  let { referenceNumber, } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getOrder(referenceNumber))
  }, [referenceNumber])

  useEffect(() => {
    if (!state.order.loading) {
      if (
        typeof state.order.data === 'object' &&
        null !== state.order.data
      ) {
        dispatch(getOrderBooks(referenceNumber))
      } else if (null !== state.order.error) {
        return navigate("/notfound")
      }
    }
  }, [state.order])

  const parseDate = date => moment(date).format('YYYY-MM-DD hh:mm')

  if (
    state.auth.loading ||
    state.order.loading ||
    state.orderBooks.loading
  ) {
    return (
      <Container sx={{ textAlign: 'center', }}>
        <Helmet>
          <title>My Order | {import.meta.env.VITE_APP_NAME}</title>
        </Helmet>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container sx={{ mb: 4, }}>
      <Helmet>
        <title>Order {state.order.data.data.referenceNumber} | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2, }}>
        <Typography variant="h5">
          Order, Reference: {state.order.data.data.referenceNumber}
        </Typography>
        <Chip label={state.order.data.data.status} color={orderStatusColor(state.order.data.data.status)} />
      </Stack>
      <Box sx={{ textAlign: 'left', mb: 3, }}>
        <Typography variant="body2">
          Ordered at {parseDate(state.order.data.data.createdAt)}
        </Typography>
        <Typography variant="body2">
          Cost: £{state.order.data.data.cost}
        </Typography>
        <Typography variant="body2">
          Delivery cost: £{state.order.data.data.deliveryCost}
        </Typography>
        <Typography variant="body2">
          Total cost: £{state.order.data.data.totalCost}
        </Typography>
      </Box>
      <Stack spacing={2}>
        {state.orderBooks.data.data.map((orderBook, index) => (
          <Card key={index} sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', }}>
            <CardMedia
              component="img"
              image={orderBook.jpgImageURL}
              alt={orderBook.name}
              sx={{ width: 100, height: 100, objectFit: 'contain', p: 1, }}
            />
            <CardContent sx={{ flexGrow: 1, }}>
              <Typography variant="h6">{orderBook.name}</Typography>
              <Typography variant="body2" color="text.secondary">Publisher: {orderBook.publisher}</Typography>
              <Typography variant="body2">Cost: £{orderBook.cost}</Typography>
            </CardContent>
            <CardActions>
              <Button href={`/books/${orderBook.slug}`} variant="contained">
                View Product
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Container>
  )
}
