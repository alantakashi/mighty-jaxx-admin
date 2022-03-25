import { GraphQLClient } from 'graphql-hooks'

export default new GraphQLClient({
  url: `http://${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GRAPHQL}`,
})
