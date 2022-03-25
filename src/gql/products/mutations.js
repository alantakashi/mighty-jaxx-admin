const CREATE_PRODUCT = `mutation createProduct($sku: String, $title: String, $image: String) {
  createProduct(sku: $sku, title: $title, image: $image) {
    _id
    sku
    title
    image
  }
}
`
const UPDATE_PRODUCT = `mutation updateProduct($updateProductId: String!, $sku: String!, $title: String!, $image: String!) {
  updateProduct(_id: $updateProductId, sku: $sku, title: $title, image: $image) {
    _id
    sku
    title
    image
  }
}
`

const DELETE_PRODUCT_BY_ID = `mutation deleteProduct($_id: String!) {
  deleteProduct(_id: $_id) {
    _id
    sku
    title
    image
  }
}
`

export {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT_BY_ID
}
