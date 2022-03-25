const initialState = {
  product: {}
}

const product = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'USER_LOGIN':
      return {
        ...state,
        product: payload
      }

    case 'USER_LOGOUT':
      return { ...state, ...payload }

    default:
      return state
  }
}

export {
  product
}
