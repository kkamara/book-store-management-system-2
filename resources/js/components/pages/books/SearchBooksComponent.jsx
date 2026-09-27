import React, { useEffect, useState, } from 'react'
import { Link, } from 'react-router-dom'
import ErrorComponent from '../../layouts/ErrorComponent'
import { useDispatch, useSelector, } from 'react-redux'
import { Helmet, } from "react-helmet"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
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
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import { getEditions, } from '../../../redux/actions/editionsActions'
import { getCategories, } from '../../../redux/actions/categoriesActions'
import { getSearchBooks, } from '../../../redux/actions/searchBooksActions'

export default function SearchBooksComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    searchBooks: state.searchBooks,
    editions: state.editions,
    categories: state.categories,
  }))
  const [query, setQuery] = useState("")
  const [editions, setEditions] = useState(null)
  const [categories, setCategories] = useState(null)
  const [edition, setEdition] = useState("")
  const [category, setCategory] = useState("")
  const [orderById, setOrderById] = useState("desc")
  const [error, setError] = useState("")

  useEffect(() => {
    dispatch(getSearchBooks())
    dispatch(getEditions())
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    if (false === state.searchBooks.loading && state.searchBooks.error) {
      setError(state.searchBooks.error)
    }
  }, [state.searchBooks])

  useEffect(() => {
    if (!state.editions.loading) {
      if (
        typeof state.editions.data === 'object' &&
        null !== state.editions.data
      ) {
        setEditions(state.editions.data.data)
      } else if (state.editions.error) {
        setError(state.editions.error)
      }
    }
  }, [state.editions])

  useEffect(() => {
    if (!state.categories.loading) {
      if (
        typeof state.categories.data === 'object' &&
        null !== state.categories.data
      ) {
        setCategories(state.categories.data.data)
      } else if (state.categories.error) {
        setError(state.categories.error)
      }
    }
  }, [state.categories])

  const handlePageChange = (e, page) => {
    if (page > state.searchBooks.data.meta.lastPage) {
      return
    }
    const params = { orderById, }
    if (edition) {
      params.edition = edition
    }
    if (category) {
      params.category = category
    }
    if (query) {
      params.query = query
    }
    dispatch(getSearchBooks(page, params))
  }

  const handleClearSearchInput = () => {
    setQuery("")
    setEdition("")
    setCategory("")
    setOrderById("desc")
    dispatch(getSearchBooks(1))
  }

  const handleSearchFormSubmit = e => {
    e.preventDefault()
    setError("")
    const params = { orderById, }
    if (edition) {
      params.edition = edition
    }
    if (category) {
      params.category = category
    }
    if (query) {
      params.query = query
    }
    dispatch(getSearchBooks(1, params))
  }

  const handleQueryChange = e => {
    setQuery(e.target.value)
  }

  const handleEditionChange = e => {
    setEdition(e.target.value)
  }

  const handleCategoryChange = e => {
    setCategory(e.target.value)
  }

  const handleOrderByIdChange = e => {
    setOrderById(e.target.value)
  }

  const pagination = () => {
    if (!state.searchBooks.data) {
      return null
    }

    return (
      <Stack alignItems="center" sx={{ my: 3, }}>
        <Pagination
          count={state.searchBooks.data.meta.lastPage}
          page={state.searchBooks.data.meta.currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    )
  }

  const paginationDetail = () => (
    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2, }}>
      <strong>page</strong> ({state.searchBooks.data.meta.currentPage}),
      &nbsp;<strong>page count</strong> ({state.searchBooks.data.meta.lastPage}),
      &nbsp;<strong>displayed items</strong> ({state.searchBooks.data.data.length}),
      &nbsp;<strong>items</strong> ({state.searchBooks.data.meta.total})
    </Typography>
  )

  const renderList = () => {
    if (!state.searchBooks.data) {
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
          {state.searchBooks.data.data.map((book, index) => (
            <Card key={index} sx={{ width: 288, }}>
              <Link to={`/books/${book.slug}`}>
                <CardMedia
                  component="img"
                  height="200"
                  image={book.jpgImageURL}
                  alt={book.name}
                  sx={{ objectFit: 'contain', pt: 1, }}
                />
              </Link>
              <CardContent>
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

  if (
    state.searchBooks.loading ||
    state.editions.loading ||
    state.categories.loading
  ) {
    return (
      <Container sx={{ textAlign: 'center', }}>
        <Helmet>
          <title>Search Books | {import.meta.env.VITE_APP_NAME}</title>
        </Helmet>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container sx={{ mb: 4, }}>
      <Helmet>
        <title>Search Books | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <Paper
        component="form"
        onSubmit={handleSearchFormSubmit}
        sx={{ p: 3, mb: 3, textAlign: 'left', }}
      >
        <ErrorComponent error={error}/>
        <Stack direction={{ xs: 'column', md: 'row', }} spacing={2}>
          <TextField
            label="Search"
            name="query"
            fullWidth
            value={query}
            onChange={handleQueryChange}
          />
          <TextField
            select
            label="Select edition"
            name="edition"
            fullWidth
            value={edition}
            onChange={handleEditionChange}
          >
            <MenuItem value="">&nbsp;</MenuItem>
            {editions && editions.map((edition, index) => (
              <MenuItem key={index} value={edition.filterKey}>
                {edition.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select category"
            name="category"
            fullWidth
            value={category}
            onChange={handleCategoryChange}
          >
            <MenuItem value="">&nbsp;</MenuItem>
            {categories && categories.map((category, index) => (
              <MenuItem key={index} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Order by"
            name="orderById"
            fullWidth
            value={orderById}
            onChange={handleOrderByIdChange}
          >
            <MenuItem value="desc">ID descending</MenuItem>
            <MenuItem value="asc">ID ascending</MenuItem>
          </TextField>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 2, }}>
          <IconButton onClick={handleClearSearchInput}>
            <ClearIcon />
          </IconButton>
          <Button type="submit" variant="contained">
            Submit Search
          </Button>
        </Stack>
      </Paper>
      {pagination()}
      {renderList()}
      {pagination()}
    </Container>
  )
}
