import React, { memo } from 'react'
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Layout from '@layout'
import Error404 from '@layout/404'
import AppRoute from './route'
import { routes } from './routes'

const appRoutes = routes.map(route => (
  <AppRoute key={route.path} path={route.path} exact={route.exact} auth={route.auth}>
    <Layout header={route.header} footer={route.footer} sidebar={route.sidebar}>
      <route.component />
    </Layout>
  </AppRoute>
))

const Routes = () => {
  return(
    <Router basename="/">
      <Switch>
        {appRoutes}
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </Router>
  )
}

export default memo(Routes)
