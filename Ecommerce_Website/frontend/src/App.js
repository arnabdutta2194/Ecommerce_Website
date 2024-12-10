import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import { Container } from 'react-bootstrap'

function App() {
  return (
    <div >
      <Header></Header>
      <main className="py-5"> 
        <Container>
          <HomeScreen/>
        </Container>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
