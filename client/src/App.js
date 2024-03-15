
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Aboutus from './pages/about';
import Our_products from './pages/our_products';
import Register from './pages/register'
import Login from './pages/login';
import Contact from './pages/contact';
import About from './pages/about';
import Checkout from './pages/orderlist';
import Singleprod from './pages/singleprod';
import Profilechange from './pages/profilechange';
import Addtocart from './pages/addcart';
import Mywishlist from './pages/mywishlist';
import Invoice from './pages/invoice';
import Getreward from './pages/getreward';
import Forgetpass from './pages/forget';
import Payment from './pages/checkout';
import Notfound from './pages/notfound';

function App() {
  return (
    <div className="App">
    <Router>
     <Header/>
      <Routes>
     
     <Route exact path='/' element={<Home/>}/>
      <Route exact path='/about' element={<About/>}/>
      <Route exact path='/product' element={<Our_products/>}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/contect' element={<Contact/>}/>
      <Route exact path='/checkout' element={<Checkout/>}/>
      <Route exact path='/singleproduct' element={<Singleprod/>}/>
      <Route exact path='/myprofile' element={<Profilechange/>}/>
      <Route exact path='/cart' element={<Addtocart/>}/>
      <Route exact path='/wishlist' element={<Mywishlist/>}/>
      <Route exact path='/invoice' element={<Invoice/>}/>
      <Route exact path='/rewards' element={<Getreward/>}/>
      <Route exact path='/forgetpass' element={<Forgetpass/>}/>
      <Route exact path='/payment' element={<Payment/>}/>
      <Route path='*' element={<Notfound/>}/>
      </Routes> 
     <Footer/>
     </Router>
    </div>
  );
}
export default App;
