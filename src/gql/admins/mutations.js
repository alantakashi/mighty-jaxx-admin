const ADMIN_LOGIN = `mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    admin {
      _id
      email
      status
    }
    token
  }
}
`

export {
  ADMIN_LOGIN
}
