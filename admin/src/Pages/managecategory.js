import Axios from 'axios';
import React, { useEffect ,useState } from 'react';


function Manageprod(){
                const [list, setlist]= useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:1121/api/catfetch").then((Response)=>{
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
            Axios.post("http://localhost:1121/api/deletecat",{id:id}).then((Response)=>{
                alert("delete catagory successfully");
                window.location="/managecat"
            })
    }
    const[name, setname]= useState(null);
    const[desc, setdesc]= useState(null);
    const [editId,seteditId] = useState(null);
    const Editid=(id, name, desc)=>{
        // alert(id);
        seteditId(id);
        setname(name);
        setdesc(desc);
}
    const Editcat=(id)=>{
        var cat = document.getElementById("p_cat").value;
        var desc = document.getElementById("cat_des").value;

        Axios.post("http://localhost:1121/api/Editcatvalues",{id:id, cat:cat, desc:desc}).then((response)=>{
        alert("Edited Successfully.")
        window.location="/managecat"
        })
    }


    return(
        <>
            <section class="content">
    <div class="body_scroll">
        <div class="block-header">
            <div class="row">
                <div class="col-lg-11 col-md-6 col-sm-12">
                    <h2>Category's Details</h2>
                    
                    <button class="btn btn-primary btn-icon mobile_menu" type="button"><i class="zmdi zmdi-sort-amount-desc"></i></button>
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
                                            <th> Category Name</th>
                                            <th data-breakpoints="xs">Category Description</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>


 { list.map((val)=>{
        return(
        <>
            <tbody>
                <tr>
                                <td>{val.cat_name}</td>
                                <td>{val.cat_desc}</td>
                                <td style={{display: "flex", gap: "10px",width: "min-content"}}>
                                <button  class="btn btn-primary btn-block" data-target="#ModalCenter" data-toggle="modal" onClick={() => Editid(val.id, val.cat_name, val.cat_desc)}><i class="zmdi zmdi-edit"></i></button>
                                
                                 <button  class="btn btn-primary btn-block"  data-target="#exampleModalCenter" data-toggle="modal" onClick={() => delid(val.id)}><i class="zmdi zmdi-hc-fw"></i> </button></td>
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





            <div class="modal fade" id="ModalCenter" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <h1> Are  You sure want To Edit</h1>
                       
                        <div class="body">
                            <form class="form-horizontal">
                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 form-control-label">
                                        <label for="email_address_2">Category Name</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8">
                                        <div class="form-group">
                                            <input type="text" id="p_cat" class="form-control" defaultValue={name}/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 form-control-label">
                                        <label>Description</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8">
                                        <div class="form-group">
                                            <textarea id="cat_des" class="form-control" defaultValue={desc}></textarea>
                                        </div>
                                    </div>
                                </div>
                             </form>
                            </div>            
                               <button type="button " onClick={(e)=> Editcat(editId)} style={{width:"60px",height:"40px",backgroundColor:"royalblue",color:"white" }} >Edit</button>
                               &nbsp;&nbsp;&nbsp;
                               &nbsp;
                               <button type="button " data-dismiss="modal" style={{width:"60px",height:"40px",backgroundColor:"red",color:"white" }}>cancel</button>
                         
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}export default Manageprod