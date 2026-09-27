import React, { useEffect, } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { useParams, useNavigate, } from 'react-router'
import moment from 'moment'
import { Helmet, } from "react-helmet"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import CircularProgress from '@mui/material/CircularProgress'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { getBook, } from '../../../redux/actions/bookActions'
import { getReviews, } from '../../../redux/actions/reviewsActions'
import { authorize, } from '../../../redux/actions/authActions'
import { addToCart, } from '../../../redux/actions/cartActions'

export default function BookComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    book: state.book,
    reviews: state.reviews,
    auth: state.auth,
  }))
  let { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getBook(slug))
    dispatch(authorize())
  }, [])

  useEffect(() => {
    if (!state.book.loading) {
      if (
        typeof state.book.data === 'object' &&
        null !== state.book.data
      ) {
        dispatch(getReviews(slug))
      }
      if (state.book.error !== null) {
        return navigate("/notfound")
      }
    }
  }, [state.book])

  const reviewTitle = () => {
    let reviewAverage = null
    if (state.book.data.data.reviewAverage) {
      reviewAverage = state.book.data.data.reviewAverage
    } else {
      return "Reviews"
    }
    return `Reviews (${reviewAverage})`
  }

  const handleAddToCart = () => {
    if (
      !state.auth.loading &&
      null === state.auth.data
    ) {
      alert("Please login or register to add to cart.")
    } else if (
      !state.auth.loading &&
      null !== state.auth.data
    ) {
      dispatch(addToCart(state.book.data.data.id))
    }
  }

  const handlePageChange = (e, page) => {
    if (page > state.reviews.data.meta.lastPage) {
      return
    }
    dispatch(getReviews(slug, page))
  }

  const pagination = () => {
    if (!state.reviews.data) {
      return null
    }

    return (
      <Stack alignItems="center" sx={{ my: 2, }}>
        <Pagination
          count={state.reviews.data.meta.lastPage}
          page={state.reviews.data.meta.currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    )
  }

  const paginationDetail = () => (
    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', }}>
      <strong>page</strong> ({state.reviews.data.meta.currentPage}),
      &nbsp;<strong>page count</strong> ({state.reviews.data.meta.lastPage}),
      &nbsp;<strong>displayed items</strong> ({state.reviews.data.data.length}),
      &nbsp;<strong>items</strong> ({state.reviews.data.meta.total})
    </Typography>
  )

  const renderReviews = () => {
    if (!state.reviews.data) {
      return null
    }
    return (
      <>
        {paginationDetail()}
        <Stack spacing={1.5} sx={{ mt: 2, }}>
          {state.reviews.data.data.map((review, index) => (
            <Card key={index} variant="outlined">
              <CardContent>
                <Typography sx={{ fontWeight: 700, textDecoration: 'underline', }}>
                  Rated {review.rating}
                </Typography>
                <Typography sx={{ whiteSpace: 'pre-line', my: 1, }}>
                  {review.text}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right', }}>
                  Submitted {parseDate(review.createdAt)} by {review.user.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
        {paginationDetail()}
      </>
    )
  }

  const parseDate = date => moment(date).format('YYYY-MM-DD hh:mm')

  if (
    state.auth.loading ||
    state.book.loading ||
    state.reviews.loading
  ) {
    return (
      <Container sx={{ textAlign: 'center', }}>
        <Helmet>
          <title>{import.meta.env.VITE_APP_NAME}</title>
        </Helmet>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container sx={{ mb: 4, }}>
      <Helmet>
        <title>{state.book.data.data.name} | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <Typography variant="h4" sx={{ mb: 2, }}>{state.book.data.data.name}</Typography>
      <Box
        component="img"
        src={state.book.data.data.jpgImageURL}
        alt={state.book.data.data.name}
        sx={{ maxWidth: 350, borderRadius: 4, display: 'block', mx: 'auto', }}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center', mt: 2, }}>
        {state.book.data.data.categories.map((category, index) => (
          <Chip key={index} label={category.name} size="small" />
        ))}
      </Box>
      <Card sx={{ maxWidth: 400, mx: 'auto', mt: 3, }}>
        <CardContent sx={{ textAlign: 'left', }}>
          <Stack spacing={0.5}>
            <Typography variant="body2">Publisher: {state.book.data.data.publisher}</Typography>
            <Typography variant="body2">Published {state.book.data.data.published}</Typography>
            <Typography variant="body2">Binding: {state.book.data.data.binding}</Typography>
            <Typography variant="body2">Edition: {state.book.data.data.edition}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2, }}>
            <Typography variant="h6" fontWeight={700}>£{state.book.data.data.cost}</Typography>
            <Button variant="contained" onClick={handleAddToCart}>
              Add to cart
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Box sx={{ mt: 4, textAlign: 'left', }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Description</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ whiteSpace: 'pre-line', }}>
            {state.book.data.data.description}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{reviewTitle()}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {pagination()}
            {renderReviews()}
            {pagination()}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  )
}
