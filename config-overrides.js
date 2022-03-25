const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@package': path.resolve(__dirname, 'package.json'),
    '@App': path.resolve(__dirname, 'src/App'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@reducers': path.resolve(__dirname, 'src/reducers'),
    '@routes': path.resolve(__dirname, 'src/routes'),
    '@layout': path.resolve(__dirname, 'src/layout'),
    '@modules': path.resolve(__dirname, 'src/modules'),
    '@common': path.resolve(__dirname, 'src/modules/common'),
    '@gql': path.resolve(__dirname, 'src/gql'),
  })
)