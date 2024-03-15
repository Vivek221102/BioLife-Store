import React from "react";
import Axios from 'axios';

function Login(){
    const loggedin= (e) => {
        var mail = document.getElementById("mail").value
       
       
        var pass = document.getElementById("pass").value
        

        Axios.post("http://localhost:1121/api/loginadmin",{
            email: mail, password:pass 
        }).then((Response)=>{
      if(Response.data.msg){
        alert(Response.data.msg);
      }
      else{
                let obj = {name:Response.data[0].name, mail:Response.data[0].email};
                sessionStorage.setItem("admin_data",JSON.stringify(obj));
                alert("login sucessfull");
                window.location = '/';
      }
        
        })

    }
    
    
   
    
    return(
        <>
            
        <div class="authentication">
    <div class="container"> <h1><b>Sign In</b></h1><br/>
        <div class="row">
       
            <div class="col-lg-5 col-sm-12">
                <form >
                    <div class="header">
                        <img class="logo" src="assets/images/logo.png" alt="" style={{width:"150px"}}/>
                    </div><br/><br/>
                    <div class="body">
                        <div class="input-group mb-3">
                            <input type="email" class="form-control" id="mail" placeholder="Username"/>
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="zmdi zmdi-account-circle"></i></span>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" id="pass" placeholder="Password"/>
                            <div class="input-group-append">                                
                                <span class="input-group-text"><a href="forgot-password.html" class="forgot" title="Forgot Password"><i class="zmdi zmdi-lock"></i></a></span>
                            </div>                            
                        </div><br/><br/>
                    
                        <button  class="btn btn-primary btn-block waves-effect waves-light" type="button" onClick={loggedin}>SIGN IN</button>                        
                       
                    </div>
                </form>
                
            </div>
            <div class="col-lg-6 col-sm-12">
                <div class="card">
                    <img src="assets/images/signin.svg" alt="Sign In"/>
                </div>
            </div>
        </div>
    </div>
            </div>
            
            
        </>
    )
}export default Login