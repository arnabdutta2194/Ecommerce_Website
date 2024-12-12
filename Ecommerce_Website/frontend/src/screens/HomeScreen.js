import { React, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from "../components/Products"; // Component to display individual product
import { useDispatch, useSelector } from 'react-redux'; // Hooks to interact with Redux store
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';


function HomeScreen() {
    const dispatch = useDispatch(); // Dispatch function to dispatch actions
    const productList = useSelector(state => state.productList); // Access the `productList` state from the store
    const { error, loading, products } = productList; // Destructure state for ease of use
    
    useEffect(() => {
        dispatch(listProducts()); // Dispatch action to fetch products on component mount
    }, [dispatch]);

    return (
        <div>
            <h1>Latest products</h1>
            {loading ? <Loader/>:
                error ? <Message variant='danger'>{error}</Message>:
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}></Product> {/* Render Product component for each product */}
                        </Col>
                    ))}
                </Row>
            }
        </div>
    );
}

export default HomeScreen;
