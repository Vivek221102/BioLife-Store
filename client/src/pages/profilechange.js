import React, { useEffect, useState } from "react";
import Axios  from "axios";
// let  user =  JSON.parse(sessionStorage.getItem("user_data")) ;

function Profilechange(){

            let user = JSON.parse( sessionStorage.getItem("user_data"));
            var id = user.id;
     
           const [list, setlist] = useState(['']);

            useEffect(()=>{
               Axios.get('http://localhost:1121/api/myprofile',{params:{id:id}}).then((Response)=>{
                        setlist(Response.data);
               })
            })

            
const logout=()=>{
sessionStorage.clear();
window.location="/";

}

const savepass =()=>{
    var password =document.getElementById("oldpass").value;
    var newpassword=document.getElementById("newpass").value;
    var retypepass=document.getElementById("retypepass").value;

    
    if( newpassword !== password && retypepass === newpassword){
        Axios.post("http://localhost:1121/api/savepasswrd",{id:id, newpassword:newpassword,password:password, retypepass:retypepass})
        .then((Response)=>{
            if(Response.data.msg){
                    alert(Response.data.msg);
            }
            else{
                alert("success");
                window.location="/";
            }
        })
}
else{
    alert("check password");    
}
            }
           
    return(
        <>
        <br/>
        <br/>
        <div class="hero-section hero-background">
        <h1 class="page-title">My Profile</h1>
    </div>

    <br/>


<div class="container">
        <div class="card">
            <div class="card-body" style={{marginTop: "10%"}}>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card-1" style={{boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23",padding: "10px", borderRadius:"15px"}}>
                            <div class="card-title">
                                <h2 style={{margin: "0px", textalign:"center"}}>Profile Details</h2>
                            </div><br/>
                            
        {   list.map((val)=>{
            return(
                <>
                <div class="form-group">
                                <label class="form-label">First Name:</label>
                                <input type="text" id="firstName" readOnly class="form-control" value={val.first_name}/>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Last Name:</label>
                                <input type="text" id="firstName" value={val.last_name} class="form-control" readOnly/>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Mobile Number:</label>
                                <input type="text" id="firstName"  value={val.mobile} class="form-control" readOnly/>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email ID:</label>
                                <input type="text" id="firstName" value={val.mail_id} class="form-control" readOnly/>
                            </div>
                            <div class="btn-div">
                                <a href="#" class="btn btn-primary" style={{backgroundColor:"#90bf2a"}} onClick={logout}>Logout</a>
                            </div>
                </> 
                 )
        })

        }
                       
                        </div>
                    </div>
                    <br/><br/>
                    <div class="col-md-6">
                        <div class="card-1"  style={{boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23",padding: "10px", borderRadius:"15px"}}>
                            <div class="card-title">
                                <h2  style={{margin: "0px", textalign:"center"}}>Change Password</h2>
                            </div>
                            <div class="form-group"><br/>
                                <label class="form-label">Current  password:</label>
                                <input type="password" id="oldpass" class="form-control" placeholder="Enter your Old password" readonly/>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Enter New Password:</label>
                                <input type="password" id="newpass" class="form-control" placeholder="Enter your New Password"/>
                            </div>
                            <div class="form-group">
                                <label class="form-label"> Re-Enter New Password:</label>
                                <input type="password" id="retypepass" class="form-control" placeholder="Re-Type your New Password"/>
                            </div>
                           
                            <div class="btn-div">
                                <a href="#" class="btn btn-primary" onClick={savepass} style={{backgroundColor:"#90bf2a"}} >Save Password</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<br/>

</>
 
    )} export default Profilechange