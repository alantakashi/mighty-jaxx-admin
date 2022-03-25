const initialState = {
  admin: {}
}

const admin = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'ADMIN_LOGIN':
      return {
        ...state,
        admin: payload
      }

    case 'ADMIN_LOGOUT':
      return { ...state, ...payload }

    default:
      return state
  }
}

export {
  admin
}
