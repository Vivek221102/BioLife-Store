import axios from 'axios';
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

   const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return new Date(dateString).toLocaleTimeString('en-US', options);
};
const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
   

  const sendrespo=(uid, pid)=>{
    const respo = document.getElementById("respo").value;
// alert(uid +" " +pid+ " "+ res )
    Axios.post("http://localhost:1121/api/sendresponse",{uid:uid, pid:pid, respo:respo}).then((Response)=>{
        alert("response sended successfully.");
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
                                            <th data-breakpoints="xs">rate stars</th>
                                            <th data-breakpoints="xs">feedback</th>
                                            <th data-breakpoints="xs">Timing</th>
                                            <th data-breakpoints="xs">send response</th>
                                            <th data-breakpoints="xs">response</th>
                                            <th>Action</th> 
                                        </tr>
                                    </thead>


 { list.map((val)=>{
        return(
        <>
            <tbody>
                <tr>
                     <td>{val.user_name}</td> 
                    <td>{val.mail_id}</td>
                    {/* <td>{val.ph_no}</td> */}
                    <td>{val.rating}</td>
                    <td>{val.review_msg}</td> 
                    <td>{formatDate(val.Atsubmit)}<br/> {formatTime(val.Atsubmit)}</td> 
                    <td style={{display:"flex",gap:"5px"}}><input type='text' id="respo"  style={{height:"30px"}}/> <button style={{marginTop:"0px"}} class="btn btn-primary btn-block" onClick={(e)=>sendrespo(val.user_id, val.pdt_id,e)}>submit</button></td>
                   <td>{val.response}</td>
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