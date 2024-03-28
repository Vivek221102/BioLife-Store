import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(){ 
    const notify = () => {
        toast.success('Login Successfully...!')
    }
    const warn = () => {
        toast.error('Login failed..😞');
    }
    const loggedin = () => {
        var email = document.getElementById("mail").value;
        var pass = document.getElementById("pass").value;
    
        Axios.post("http://localhost:1121/api/loggingin", {
            mail: email,
            pass: pass
        }).then((Response) => {
            if (Response.data.msg) {
                warn();
                // alert(Response.data.msg);
            } else {
                sessionStorage.setItem('jwttoken', Response.data.token1);
                let obj = {
                    name: Response.data.result[0].first_name,
                    lname: Response.data.result[0].last_name,
                    email: Response.data.result[0].mail_id,
                    id: Response.data.result[0].user_id,
                    mobile: Response.data.result[0].mobile,
                    add: Response.data.result[0].address
                };
                sessionStorage.setItem("user_data", JSON.stringify(obj));
                
                notify(); 
                window.location = "/";
            }
        }).catch((error) => {
            console.error("Error occurred during login:", error); // Error handling
            // Handle the error (e.g., show a generic error message to the user)
        });
    }

     
    return(
        <>
        <br/><br/>
    <div class="hero-section hero-background">
         <h1 class="page-title">Log In</h1>
     </div>
 
   <div class="page-contain login-page">
 
 
 <div id="main-content" class="main-content">
     <div class="container">
 
         <div class="row" >
 
             
             <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                 <div class="signin-container">
                     <form >
                         <p class="form-row">
                             <label for="fid-name">Email Address:<span class="requite">*</span></label>
                             <input type="email" id="mail" name="name"  class="txt-input"/>
                         </p>
                         <p class="form-row">
                             <label for="fid-pass">Password:<span class="requite">*</span></label>
                             <input type="password" id="pass" name="email"  class="txt-input"/>
                         </p>
                         <p class="form-row wrap-btn">
                             <button class="btn btn-submit btn-bold" type="button" onClick={loggedin} style={{color:"white"}}>Log in
 <ToastContainer position="bottom-center" autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/></button><br/> <br/>
                             <Link class="link-to-help" to="/forgetpass" style={{textDecoration:"none"}}>Forgot your password</Link>
                         </p>
                     </form>
                 </div>
             </div>
 
            
             <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                 <div class="register-in-container">
                     <div class="intro">
                         <h4 class="box-title">New Customer?</h4>
                         <p class="sub-title">Create an account with us and you’ll be able to:</p>
                         <ul class="lis">
                             <li>Check out faster</li>
                             <li>Save multiple shipping anddesses</li>
                             <li>Access your order history</li>
                             <li>Track new orders</li>
                             <li>Save items to your Wishlist</li>
                         </ul>
                        
                         <Link class="btn btn-bold" to="/register" style={{color:"white"}}>Create an account</Link>
                     </div>
                 </div>
             </div>
 
         </div>
 
     </div>
 
 </div>
 
 </div>
 
        </>
    )
}
export default Login;