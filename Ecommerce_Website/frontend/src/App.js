import { Container } from 'react-bootstrap'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import Header from './components/Header'
import Footer from './components/Footer'
function App() {
  return (
    <Router>
      <Header></Header>
      <main className="py-5"> 
        <Container>
          <Routes>
          <Route path ='/' element={<HomeScreen/>} exact/>
          <Route path ='/product/:id' element={<ProductScreen/>}/>
          <Route path ='/cart/:id?' element={<CartScreen/>}/>
          </Routes>
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
