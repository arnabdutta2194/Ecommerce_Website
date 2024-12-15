import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Products({product}) {
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Img src = {product.image}></Card.Img>
        <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
      </Link>
      <Card.Text as="div">
        <div className='my-3'>
          {product.rating} from {product.numReviews} reviews
          <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}></Rating>
        </div>
    </Card.Text>
    <Card.Text as ="h3">
        ${product.price}
    </Card.Text>

      </Card.Body>
    </Card>
  )
}

export default Products
