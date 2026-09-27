import { searchBooks, } from '../types'

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function searchBooksReducer (state = initState, action) {
  switch (action.type) {
    
    case searchBooks.GET_SEARCH_BOOKS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case searchBooks.GET_SEARCH_BOOKS_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case searchBooks.GET_SEARCH_BOOKS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      }

    default:
      return state
  }
}
