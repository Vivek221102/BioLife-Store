import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Pages/home';
import Sidebar from './Components/sidebar';
import Product from './Pages/products';
import Login from './Pages/login';
import Productdetails from './Pages/category';
import Feedback from './Pages/feedback';
import User_detail from './Pages/userdetail';
import Manageprod from './Pages/manageproduct';
import Managecat from './Pages/managecategory';
import Adminprofile from './Pages/adminprofile';
import Reward from './Pages/reward';
import Manageorder from './Pages/manageorder';
import Approvedord from './Pages/approvedord';
import Rejectedord from './Pages/rejectedord';

function App() {
  return (
      <>
      <div className="App">
      
      {
      sessionStorage.getItem("admin_data") == null ?
      
      <>
      <Login/>
      </>
      :
      <>
      
      <Router>
      <Sidebar/>
      <Routes>
     
    <Route exact path='/' element={<Home/>}/>
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path='/products' element={<Product/>}/>
    <Route exact path='/category' element={<Productdetails/>}/>
    <Route exact path='/feedback' element={<Feedback/>}/>
    <Route exact path='/userdetails' element={<User_detail/>}/>
    <Route exact path='/manageitem' element={<Manageprod/>}/>
    <Route exact path='/managecat' element={<Managecat/>}/>
    <Route exact path='/profile' element={<Adminprofile/>}/>
    <Route exact path='/rewards' element={<Reward/>}/>
    <Route exact path='/orders' element={<Manageorder/>}/>
    <Route exact path='/approvord' element={<Approvedord/>}/>
    <Route exact path='/rejectord' element={<Rejectedord/>}/>

      </Routes>

      </Router>
      </>

      }

 
    </div>
    </>
  );
}

export default App;
