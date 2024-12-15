import React,{useState,useEffect} from 'react';
import { Link,useParams,useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';


function LoginScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const redirect = location.search ? location.search.split('=')[1] : '/'
    console.log(redirect)
    console.log(location)
    const userLogin = useSelector(state=>state.userLogin)
    const {loading, error, userInfo} = userLogin

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,userInfo, redirect])

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Submitted') 
        dispatch(login(email,password))
    }

  return (
    <FormContainer>
        {error && <Message variant='danger'>{error}</Message>};
        {loading && <Loader ></Loader>};

      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>Sign In</Button>
      </Form>
      <Row className='py-3'>
        <Col>
            New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
