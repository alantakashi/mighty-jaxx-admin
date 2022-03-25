const GET_ALL_PRODUCTS = `query getAllProducts($page: Int, $limit: Int) {
  getAllProducts(page: $page, limit: $limit) {
    products {
      _id
      sku
      title
      image
    }
    totalProducts
    totalPages
  }
}
`

const SEARCH_PRODUCT_BY_ID = `query getProductsById($id: String!) {
  getProductsById(_id: $id) {
    _id
    sku
    title
    image
  }
}
`

const SEARCH_PRODUCT_BY_SKU = `query searchProductsBySku($sku: String!) {
  searchProductsBySku(sku: $sku) {
    _id
    sku
    title
    image
  }
}
`

export {
  GET_ALL_PRODUCTS,
  SEARCH_PRODUCT_BY_ID,
  SEARCH_PRODUCT_BY_SKU
}
