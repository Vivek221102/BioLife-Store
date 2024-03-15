import React from "react";
import Axios from "axios";

function Adminprofile(){
    let Admin = JSON.parse( sessionStorage.getItem("admin_data"));
    var id = Admin.id;
      


const savepass =()=>{
var password =document.getElementById("oldpass").value;
var newpassword=document.getElementById("newpass").value;
var retypepass=document.getElementById("retypepass").value;
alert(password)

if( newpassword !== password && retypepass === newpassword){
Axios.post("http://localhost:1121/api/changepassadmin",{id:id, newpassword:newpassword,password:password, retypepass:retypepass})
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
          <section class="content">

          <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-lg-5 col-md-12">
                    <div class="card mcard_3">
                        <div class="body">
                            <a href="profile.html"><img src="assets/images/profile_av.jpg" class="rounded-circle shadow " alt="profile-image" style={{    height: "204px", width: "207px"}}/></a>
                            <h4 class="m-t-10">Admin</h4>                            
                            <div class="row">
                                <div class="col-12">
                                    <ul class="social-links list-unstyled">
                                        <li><a title="facebook" href="javascript:void(0);"><i class="zmdi zmdi-facebook"></i></a></li>
                                        <li><a title="twitter" href="javascript:void(0);"><i class="zmdi zmdi-twitter"></i></a></li>
                                        <li><a title="instagram" href="javascript:void(0);"><i class="zmdi zmdi-instagram"></i></a></li>
                                    </ul>
                                    <p class="text-muted">Vadodara, Gujarat, 391330</p>
                                </div>
                                <div class="card">
                        <div class="body">
                            <small class="text-muted">Email address: </small>
                            <p>biolifeadmin@gmail.com</p>
                            <hr/>
                            <small class="text-muted">Phone: </small>
                            <p>9313231486</p>
                            <hr/>                  
                            </div>
                        </div>
                    </div>
                    </div></div>
                    </div>

<div class="col-md-7"  style={{backgroundColor:"white"}}>

<div class="p-3 py-5" >
<h4 class="change" >Change Password</h4>

<div class="modal-body align-w3">

    <input type="hidden" name="email" ></input>
    <div class="col-md-12"><label class="labels">Your  password</label><input type="password" class="form-control" placeholder="Old password" name="oldpassword" id="oldpass"/></div> 
    <div class="col-md-12"><label class="labels">Re-type Your password</label><input type="password" class="form-control" placeholder="Old password" name="oldpassword" id="newpass" /></div> 
    <div class="col-md-12"><label class="labels"> New Password</label><input type="password" class="form-control" placeholder="New Password" name="newpassword" id="retypepass"/><br/><br/></div>

 <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button" onClick={savepass}> Save Password </button>
</div>
</div>

</div></div>
          {/* <div class="col-md-8 col-xs-12">
                        <div class="white-box">
                            <form class="form-horizontal form-material">
                                <div class="form-group">
                                    <label class="col-md-12">Full Name</label>
                                    <div class="col-md-12">
                                        <input type="text" placeholder="Johnathan Doe" class="form-control form-control-line"/> </div>
                                </div>
                                <div class="form-group">
                                    <label for="example-email" class="col-md-12">Email</label>
                                    <div class="col-md-12">
                                        <input type="email" placeholder="johnathan@admin.com" class="form-control form-control-line" name="example-email" id="example-email"/> </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12">Password</label>
                                    <div class="col-md-12">
                                        <input type="password" value="password" class="form-control form-control-line"/> </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12">Phone No</label>
                                    <div class="col-md-12">
                                        <input type="text" placeholder="123 456 7890" class="form-control form-control-line"/> </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12">Message</label>
                                    <div class="col-md-12">
                                        <textarea rows="5" class="form-control form-control-line"></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-12">Select Country</label>
                                    <div class="col-sm-12">
                                        <select class="form-control form-control-line">
                                            <option>London</option>
                                            <option>India</option>
                                            <option>Usa</option>
                                            <option>Canada</option>
                                            <option>Thailand</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-12">
                                        <button class="btn btn-success">Update Profile</button>
                                    </div>
                                </div>
                            </form>*/}


                        </div>
                    </div> 
          </section>
            
        </>
    )
}export default Adminprofile