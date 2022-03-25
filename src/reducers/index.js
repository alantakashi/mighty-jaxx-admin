import { combineReducers } from 'redux'
import { product } from './product'
import { admin } from './admin'

let reducers = {
  product,
  admin
}

const appReducer = combineReducers(reducers)

const rootReducer = (state, action) => {
  if (action.type === 'ADMIN_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export {
  rootReducer
}
