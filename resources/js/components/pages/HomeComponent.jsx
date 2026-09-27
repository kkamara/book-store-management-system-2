import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { Link, } from 'react-router-dom'
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
import Pagination from '@mui/material/Pagination'
import CircularProgress from '@mui/material/CircularProgress'
import { getHome, } from '../../redux/actions/homeActions'

import ErrorComponent from '../layouts/ErrorComponent'

export default function HomeComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    home: state.home,
  }))
  const [error, setError] = useState("")

  useEffect(() => {
    dispatch(getHome())
  }, [])

  useEffect(() => {
    if (!state.home.loading && state.home.error) {
      setError(state.home.error)
    }
  }, [state.home])

  const handlePageChange = (e, page) => {
    if (page > state.home.data.meta.lastPage) {
      return
    }
    dispatch(getHome(page))
  }

  const pagination = () => {
    if (!state.home.data) {
      return null
    }

    return (
      <Stack alignItems="center" sx={{ my: 3, }}>
        <Pagination
          count={state.home.data.meta.lastPage}
          page={state.home.data.meta.currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    )
  }

  const paginationDetail = () => (
    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2, }}>
      <strong>page</strong> ({state.home.data.meta.currentPage}),
      &nbsp;<strong>page count</strong> ({state.home.data.meta.lastPage}),
      &nbsp;<strong>displayed items</strong> ({state.home.data.data.length}),
      &nbsp;<strong>items</strong> ({state.home.data.meta.total})
    </Typography>
  )

  const renderList = () => {
    if (!state.home.data) {
      return null
    }
    return (
      <>
        {paginationDetail()}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          {state.home.data.data.map((book, index) => (
            <Card key={index} sx={{ width: 288, display: 'flex', flexDirection: 'column', }}>
              <Link to={`/books/${book.slug}`}>
                <CardMedia
                  component="img"
                  height="200"
                  image={book.jpgImageURL}
                  alt={book.name}
                  sx={{ objectFit: 'contain', pt: 1, }}
                />
              </Link>
              <CardContent sx={{ flexGrow: 1, }}>
                <Typography
                  variant="h6"
                  sx={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {book.name}
                </Typography>
                <Stack spacing={0.5} sx={{ fontSize: 12, mt: 1, }}>
                  <Typography variant="body2">Publisher: {book.publisher}</Typography>
                  <Typography variant="body2">Published {book.published}</Typography>
                  <Typography variant="subtitle1" fontWeight={700}>£{book.cost}</Typography>
                  <Typography variant="body2">Binding: {book.binding}</Typography>
                  <Typography variant="body2">Edition: {book.edition}</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5, }}>
                    {book.categories.map((category, categoryIndex) => (
                      <Chip key={categoryIndex} label={category.name} size="small" />
                    ))}
                  </Box>
                </Stack>
              </CardContent>
              <CardActions>
                <Button component={Link} to={`/books/${book.slug}`} variant="contained" fullWidth>
                  View Book
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
        {paginationDetail()}
      </>
    )
  }

  if (state.home.loading) {
    return (
      <Container sx={{ textAlign: 'center', }}>
        <Helmet>
          <title>Home | {import.meta.env.VITE_APP_NAME}</title>
        </Helmet>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container sx={{ mb: 4, }}>
      <Helmet>
        <title>Home | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <ErrorComponent error={error} />
      {pagination()}
      {renderList()}
      {pagination()}
    </Container>
  )
}
