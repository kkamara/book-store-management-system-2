import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import moment from 'moment'
import { Helmet, } from "react-helmet"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import { getOrders, } from '../../../redux/actions/ordersActions'

import ErrorComponent from '../../layouts/ErrorComponent'

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

export default function OrdersComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
    orders: state.orders,
  }))
  const [query, setQuery] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    dispatch(getOrders())
  }, [])

  useEffect(() => {
    if (!state.orders.loading && state.orders.error) {
      setError(state.orders.error)
    }
  }, [state.orders])

  const handlePageChange = (e, page) => {
    if (page > state.orders.data.meta.lastPage) {
      return
    }
    dispatch(getOrders(page, query))
  }

  const handleQueryChange = e => {
    setQuery(e.target.value)
  }

  const handleSearchFormSubmit = e => {
    e.preventDefault()
    setError("")
    if (0 === query.length) {
      return
    }
    dispatch(getOrders(1, query))
  }

  const handleClearSearchInput = () => {
    if (0 === query.length) {
      return
    }
    setQuery("")
    dispatch(getOrders(1, ""))
  }

  const parseDate = date => moment(date).format('YYYY-MM-DD hh:mm')

  const pagination = () => {
    if (!state.orders.data) {
      return null
    }

    return (
      <Stack alignItems="center" sx={{ my: 3, }}>
        <Pagination
          count={state.orders.data.meta.lastPage}
          page={state.orders.data.meta.currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    )
  }

  const paginationDetail = () => (
    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2, }}>
      <strong>page</strong> ({state.orders.data.meta.currentPage}),
      &nbsp;<strong>page count</strong> ({state.orders.data.meta.lastPage}),
      &nbsp;<strong>displayed items</strong> ({state.orders.data.data.length}),
      &nbsp;<strong>items</strong> ({state.orders.data.meta.total})
    </Typography>
  )

  const renderList = () => {
    if (!state.orders.data) {
      return null
    }
    return (
      <>
        {paginationDetail()}
        <Stack spacing={2}>
          {state.orders.data.data.map((order, index) => (
            <Card key={index}>
              <CardContent sx={{ textAlign: 'left', }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h6">Order, Reference: {order.referenceNumber}</Typography>
                  <Chip size="small" label={order.status} color={orderStatusColor(order.status)} />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Ordered at {parseDate(order.createdAt)}
                </Typography>
                <Typography variant="body2">Cost: £{order.cost}</Typography>
                <Typography variant="body2">Delivery cost: £{order.deliveryCost}</Typography>
                <Typography variant="body2">Total cost: £{order.totalCost}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', }}>
                <Button href={`/orders/${order.referenceNumber}`} variant="contained">
                  View Order
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
        {paginationDetail()}
      </>
    )
  }

  if (state.auth.loading || state.orders.loading) {
    return (
      <Container sx={{ textAlign: 'center', }}>
        <Helmet>
          <title>My Orders | {import.meta.env.VITE_APP_NAME}</title>
        </Helmet>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container sx={{ mb: 4, }}>
      <Helmet>
        <title>My Orders | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <ErrorComponent error={error} />
      <Box
        component="form"
        onSubmit={handleSearchFormSubmit}
        sx={{ mb: 2, maxWidth: 400, textAlign: 'left', }}
      >
        <Stack direction="row" spacing={1}>
          <TextField
            label="Search"
            name="query"
            fullWidth
            size="small"
            value={query}
            onChange={handleQueryChange}
          />
          <IconButton onClick={handleClearSearchInput}>
            <ClearIcon />
          </IconButton>
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Stack>
      </Box>
      {pagination()}
      {renderList()}
      {pagination()}
    </Container>
  )
}
