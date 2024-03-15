import Axios from 'axios';
import React, { useEffect ,useState } from 'react';


function Feedback(){
                const [list, setlist]= useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:1121/api/faqfetch").then((Response)=>{
            setlist(Response.data);
        })
    },[]) 
   
    const [ModelId,setModelId] = useState(null);
   const delcontact=(id)=>{
    setModelId(id);
   }
   
   const deleteuser=(id)=>{
    Axios.post("http://localhost:1121/api/dltfeedback",{id:id}).then((Response)=>{
        alert("delete user massage successfully");
        window.location="/feedback"
       })
   }
   
    return(
        <>
            <section class="content">
    <div class="body_scroll">
        <div class="block-header">
            <div class="row">
                <div class="col-lg-7 col-md-6 col-sm-12">
                    <h2>Contect us user details</h2>
                    
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
                                            <th>Name</th>
                                            <th data-breakpoints="xs">Email</th>
                                            <th data-breakpoints="xs">Phone</th>
                                            <th data-breakpoints="xs">Message or FAQ's</th>
                                            <th data-breakpoints="xs">Date</th>
                                           
                                            <th>Action</th> 
                                        </tr>
                                    </thead>


 { list.map((val)=>{
        return(
        <>
            <tbody>
                <tr>
                    <td>{val.user_name}</td>
                    <td>{val.email_id}</td>
                    <td>{val.ph_no}</td>
                    <td>{val.msg}</td> 
                    <td>{val.Timing}</td>
                    <td ><button  class="btn btn-primary btn-block" data-target="#exampleModalCenter" data-toggle="modal" onClick={()=> delcontact(val.id)}><i class="zmdi zmdi-delete"></i></button></td>
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
                    <div class="modal-content" style={{marginBottom:"400px"}}>
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
}export default Feedback