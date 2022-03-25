
## Coding Challenge for Web Engineers
This project was bootstrapped with `create-react-app` (https://reactjs.org/docs/create-a-new-react-app.html) and 
- Redux
- MongoDB (Atlas)
- Graphql Hooks
- Material UI

## Get it started
Clone down this repository. In the project root directory, run:

Installation
`npm install`  

To Start Server:
`npm start`  

To Visit App:
`localhost:3000`

Production build:
`npm run build`

## Environment variables
You will need to create `.env` file in the project root folder of below environment variables and update accordingly
```js
PORT=3000
REACT_APP_BASE_URL=localhost:4000
REACT_APP_GRAPHQL=graphql
```
## Features
You will need the backend, a separate repo (https://github.com/alantakashi/mighty-jaxx-be) for below features to work. 
1. Login page: 
   - Email and password fields.
   - Show an error message for incorrect credentials.
   - Redirect to the admin dashboard page for correct credentials.
2. Admin dashboard page:
   - Display a list of products (fetched from a database). Each product has the following data: SKU, title and image.
   - Add new product.
   - Edit an existing product.
   - Delete product.
   - Logout and redirects to the login page. 
   - Make the page responsive for mobile and desktop devices.