import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const productDetailsApiUrl = 'https://apis.ccbp.in/products/'

class ProductItemDetails extends Component {
  state = {
    isLoading: false,
    productItemsList: {},
    error: null,
  }

  componentDidMount() {
    this.getProductItems()
  }

  getProductItems = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({isLoading: true})

    try {
      const jwtToken = Cookies.get('jwt_token')
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      const response = await fetch(`${productDetailsApiUrl}${id}`, options)
      if (!response.ok) {
        throw new Error('Failed to fetch product details')
      }

      const datas = await response.json()
      const updatedData = {
        id: datas.id,
        availability: datas.availability,
        brand: datas.brand,
        description: datas.description,
        imageUrl: datas.image_url,
        price: datas.price,
        rating: datas.rating,
        similarProducts: datas.similar_products,
        // style: datas.style,
        title: datas.title,
        totalReviews: datas.total_reviews,
      }
      this.setState({productItemsList: updatedData, isLoading: false})
    } catch (error) {
      console.error('Error fetching product details:', error)
      this.setState({
        error: 'Failed to fetch product details',
        isLoading: false,
      })
    }
  }

  render() {
    const {isLoading, productItemsList, error} = this.state
    console.log(productItemsList)

    if (error) {
      return <div>{error}</div>
    }

    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      similarProducts,
      title,
      totalReviews,
    } = productItemsList

    return (
      <div>
        <Header />
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
          </div>
        ) : (
          <div>
            <div>
              <img src={imageUrl} alt="product" className="product-img" />
              <div>
                <h1>{title}</h1>
                <p>Rs {price}/- </p>
                <button type="button">{rating}</button>
                <p>{totalReviews} Reviews</p>
                <p>{description}</p>
                <p>Available: {availability}</p>
                <p>Brand: {brand}</p>
                <div className="hr-line">hr-line</div>
                <button type="button">+</button>
                <p>1</p>
                <button type="button">-</button>
                <div>
                  <button type="button">ADD TO CART</button>
                </div>
              </div>
            </div>
            <div>
              <h1>Similar Products</h1>
              {similarProducts &&
                similarProducts.map(product => (
                  <SimilarProductItem product={product} key={product.id} />
                ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default ProductItemDetails
