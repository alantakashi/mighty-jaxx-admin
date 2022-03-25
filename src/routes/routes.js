import Home from '@modules/dashboard'
import AddProduct from '@modules/dashboard/addProduct'
import UpdateProduct from '@modules/dashboard/updateProduct'
import Login from '@modules/auth/login'

const routes = [
  {
    path: '/',
    component: Home,
    auth: true,
    exact: true,
    header: true
  }, {
    path: '/login',
    component: Login,
    auth: false,
    exact: true,
    header: false
  }, {
    path: '/add',
    component: AddProduct,
    auth: true,
    exact: true,
    header: true
  }, {
    path: '/update/:productId',
    component: UpdateProduct,
    auth: true,
    exact: true,
    header: true
  }
]

export {
  routes
}
