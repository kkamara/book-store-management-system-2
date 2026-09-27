import { orderBooks, } from '../types'

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function orderBooksReducer (state = initState, action) {
  switch (action.type) {
    
    case orderBooks.GET_ORDER_BOOKS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case orderBooks.GET_ORDER_BOOKS_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case orderBooks.GET_ORDER_BOOKS_SUCCESS:
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
