const SimilarProductItem = props => {
  const {product} = props
  const updatedData = {
    id: product.id,
    availability: product.availability,
    brand: product.brand,
    description: product.description,
    imageUrl: product.image_url,
    price: product.price,
    rating: product.rating,
    similarProducts: product.similar_products,
    // style: product.style,
    title: product.title,
    totalReviews: product.total_reviews,
  }

  const {
    id,
    availability,
    brand,
    description,
    imageUrl,
    price,
    rating,
    title,
    totalReviews,
  } = updatedData

  return (
    <div key={id}>
      <img src={imageUrl} alt={`similar product ${}`} className="product-img" />
      <div>
        <h1>{title}</h1>
        <p>Rs {price}/- </p>
        <button type="button">{rating}</button>
        <p>{totalReviews} Reviews</p>
        <p>{description}</p>
        <p>Available: {availability}</p>
        <p>Brand: {brand}</p>
        <div className="hr-line">hr-line</div>
        <button type="button" testid="plus">
          +
        </button>
        <p>1</p>
        <button type="button" testid="minus">
          -
        </button>
        <div>
          <button type="button">ADD TO CART</button>
        </div>
      </div>
    </div>
  )
}

export default SimilarProductItem
