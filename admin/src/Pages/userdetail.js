import Axios from 'axios';
import React, { useEffect ,useState } from 'react';


function User_detail(){
                const [list, setlist]= useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:1121/api/userfetch").then((Response)=>{
      
            setlist(Response.data);
        })
    },[]) 
   
    const [ModelId,setModelId] = useState(null);
    const delid=(id)=>{
            // alert(id);
            setModelId(id);
    }
    
    const deleteuser=(id)=>{
        // alert(id)
            Axios.post("http://localhost:1121/api/deleteuser",{id:id}).then((Response)=>{
                alert("delete user successfully");
                window.location="/userdetails"
            })
    }
   
    return(
        <>
            <section class="content">
    <div class="body_scroll">
        <div class="block-header">
            <div class="row">
                <div class="col-lg-7 col-md-6 col-sm-12">
                    <h2>User's Details</h2>
                    
                    <button class="btn btn-primary btn-icon mobile_menu" type="button"><i class="zmdi zmdi-sort-amount-desc"></i></button>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-12">                
                    <button class="btn btn-primary btn-icon float-right right_icon_toggle_btn" type="button"><i class="zmdi zmdi-arrow-right"></i></button>                                
                </div>  
            </div>
        </div>

        <div class="container-fluid">
            
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="card">
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-striped m-b-0">
                                    <thead>
                                        <tr>
                                            <th>First Name</th>
                                            <th data-breakpoints="xs">Last Name</th>
                                            <th data-breakpoints="xs">Email</th>
                                            <th data-breakpoints="xs">Mobile</th>
                                            <th data-breakpoints="xs">Address</th>
                                            <th>Action</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>


                                    { list.map((val)=>{
                             return(
                                <>


                                        <tbody>
                                        <tr>
                                            <td>{val.first_name}</td>
                                            <td>{val.last_name}</td>
                                            <td>{val.mail_id}</td>
                                            <td>{val.mobile}</td> 
                                            <td>{val.address}</td>
                                            <td> 
                                            <button  class="btn btn-primary btn-block" style={{marginTop:"0px",height:"35px",width:"85px"}}  data-target="#exampleModalCenter" data-toggle="modal" onClick={() => delid(val.user_id)}><i class="fa-solid fa-trash"></i><i class="zmdi zmdi-block"> Block</i> </button>
                                            </td>
                                            <td><b>{val.status}</b></td>
                                        </tr>
                                       
                                        
                                    </tbody>
                                    
                                </>
                             )
                                    })
                            }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <h1> Are  You sure want To DELETE</h1>
                       
                       .
                               <button type="button " onClick={(e)=> deleteuser(ModelId)} style={{width:"60px",height:"40px",backgroundColor:"royalblue",color:"white" }} >Yes</button>
                               &nbsp;&nbsp;&nbsp;
                               &nbsp;
                               <button type="button " data-dismiss="modal"style={{width:"60px",height:"40px",backgroundColor:"red",color:"white" }}>NO</button>
                         
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}export default User_detail