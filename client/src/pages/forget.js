import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios'
function Forgetpass(){
    
    const recievepass = () => {
        var email = document.getElementById("mail").value;
        // alert(email);
    
        Axios.post("http://localhost:1121/api/forgotpass", { email: email }).then((response) => {
        response.send();    
        alert("Password has been sent to this email. Please check your email.");
            window.location.href = "/login";
        }).catch((error) => {
            console.error("Error:", error);
            alert("enter valid mail id.");
        });
    };
    

    return(
        <>
<br/><br/><br/><br/><br/><br/><h1><u>Forgot Password</u></h1>


<div class="page-contain login-page">
 <div id="main-content" class="main-content">
     <div class="container">
 
         <div class="row" style={{fontFamily:"cursive" , margin:"10px"}}>
             
             <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                 <div class="signin-container">
                     <form onSubmit={recievepass}>
                         <p class="form-row">
                             <label for="fid-name">Email Address:</label>
                             <input type="email" id="mail" name="name" required class="txt-input"/>
                         </p>
                    
                         <p class="form-row wrap-btn">
                             <button class="btn btn-submit btn-bold" type="submit" >Submit</button><br/> <br/>
                         </p>
                     </form>
                 </div>
             </div>
             <div class="clearfix">
								</div><br/>
								<p>By logging in you agree to our <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a></p>
         </div>
 
     </div>
 
 </div>
 
 </div>
        </>
    )
}export default Forgetpass