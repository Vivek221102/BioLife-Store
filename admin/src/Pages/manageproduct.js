import axios from 'axios';
import Axios from 'axios';
import React, { useEffect ,useState } from 'react';


function Manageprod(){
                const [list, setlist]= useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:1121/api/itemfetch").then((Response)=>{
            setlist(Response.data);
        })
    },[]) 
   
    const [ModelId,setModelId] = useState(null);
    const delid=(id)=>{
            // alert(id);
            setModelId(id);
    }
    
    const deleteuser=(id)=>{

            Axios.post("http://localhost:1121/api/deleteitem",{id:id}).then((Response)=>{
                alert("delete Product successfully");
                window.location="/manageitem";
            })
    }
    const[name, setname]= useState(null);
    const[desc, setdesc]= useState(null);
    const[img, setimg]= useState(null);  
    const[prc, setprc]= useState(null);
    const[retprc, setretprc]= useState(null);
    const [editId,seteditId] = useState(null);

    const Editid=(id, p_name, p_img, p_price, p_ret_price, p_desc)=>{
        // alert(id);
        seteditId(id);
        setname(p_name);
        setimg(p_img);
        setprc(p_price);
        setretprc(p_ret_price);
        setdesc(p_desc);
}
const Editprd=(id)=>{
  var name = document.getElementById("i_name").value;
  var img = document.getElementById("img").value;
  var desc = document.getElementById("i_des").value;
  var prc = document.getElementById("i_cost").value;
  var retprc = document.getElementById("ret_cost").value;


    Axios.post("http://localhost:1121/api/editprods", {editId:editId, name:name, img:img, desc:desc, prc:prc, retprc:retprc}).then((response)=>{
        alert("product Edited Successfully.");
        window.location="/manageitem";
    })
}
return(
    <>
    <section class="content">
    <div class="body_scroll">
        <div class="block-header">
            <div class="row">
                <div class="col-lg-7 col-md-6 col-sm-12">
                    <h2>Product List</h2>
                  
                    <button class="btn btn-primary btn-icon mobile_menu" type="button"><i class="zmdi zmdi-sort-amount-desc"></i></button>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-12">                
                    <button class="btn btn-primary btn-icon float-right right_icon_toggle_btn" type="button"><i class="zmdi zmdi-arrow-right"></i></button>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="table-responsive">
                            <table class="table table-hover product_item_list c_table theme-color mb-0">
                                <thead >
                                    <tr style={{backgroundColor:"#e47297"}}>
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Product Code</th>
                                        <th data-breakpoints="sm xs">Detail</th>
                                        <th data-breakpoints="xs">Amount</th>
                                        <th data-breakpoints="xs md">Reward</th>
                                        <th data-breakpoints="sm xs md">Action</th>
                                    </tr>
                                </thead>
                            
                    { list.map((val)=>{
                            return(
                            <>
                                <tbody>
                                    <tr>
                                        <td><img src={"http://localhost:1121/public/" +val.p_img } width="48" alt="Product img"/></td>
                                        <td><h5>{val.p_name}</h5></td>
                                        <td><h5>{val.p_uni_code}</h5></td>
                                        <td><span class="text-muted">{val.p_desc}</span></td>
                                        <td>Rs. {val.p_price}</td>
                                        <td><span class="col-green">Rs. {val.p_ret_price}</span></td>
                                        <td>
                                            <a href="javascript:void(0);" class="btn btn-default waves-effect waves-float btn-sm waves-green" data-toggle="modal" data-target="#largeModal" onClick={() => Editid(val.p_id, val.p_name, val.p_img, val.p_price, val.p_ret_price, val.p_desc)}><i class="zmdi zmdi-edit"></i></a>
                                            <a href="javascript:void(0);" class="btn btn-default waves-effect waves-float btn-sm waves-red" data-target="#exampleModalCenter" data-toggle="modal" onClick={() => delid(val.p_id)}><i class="zmdi zmdi-delete"></i></a>
                                        </td>
                                    </tr>
                                       
                                        
                                       </tbody>
                                                               
                                       </>
                                 )
                              })
                            }
                            </table>
                        </div>
                    </div>
                    <div class="card">
                        <div class="body">                            
                            <ul class="pagination pagination-primary m-b-0">
                                <li class="page-item"><a class="page-link" href="javascript:void(0);"><i class="zmdi zmdi-arrow-left"></i></a></li>
                                <li class="page-item active"><a class="page-link" href="javascript:void(0);">1</a></li>
                                <li class="page-item"><a class="page-link" href="javascript:void(0);">2</a></li>
                                <li class="page-item"><a class="page-link" href="javascript:void(0);"><i class="zmdi zmdi-arrow-right"></i></a></li>
                            </ul>
                        </div>
                    </div>


  <div class="modal fade" id="largeModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="title" id="largeModalLabel">Modal title</h4>
            </div>
            <div class="modal-body">
            <div class="body">
                            <div class="row clearfix">
                                <div class="col-lg-4 col-md-6">
                                    <label>Item Name</label>
                                    <div class="input-group masked-input">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="ti-shopping-cart"></i></span>
                                        </div>
                                        <input type="text" class="form-control date" placeholder="Add name of item" id="i_name" defaultValue={name}/>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <label>Item Price</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="zmdi zmdi-money-box"></i></span>
                                        </div>
                                        <input type="text" class="form-control time12" placeholder="Add the cost of item" id="i_cost" defaultValue={prc}/>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <label>Return Price</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="zmdi zmdi-money"></i></span>
                                        </div>
                                        <input type="float" class="form-control mobile-phone-number" placeholder="Add the cost return waste item" id="ret_cost" defaultValue={retprc}/>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <label>Item Image</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="ti-upload"></i></span>
                                        </div>
                                        <input type="text" class="form-control mobile-phone-number" id='img' defaultValue={img}/>
                                    </div>
                                </div>
                                                     
                                
                                <div class="col-lg-8 col-md-6">
                                    <label>Item Description</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="ti-pencil-alt"></i></span>
                                        </div>
                                       
                                        <textarea type="text" class="form-control key" placeholder="Description" id="i_des" defaultValue={desc}/>
                                    </div>
                                </div>

                           </div>
                            </div>            
             </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-round waves-effect" onClick={(e)=> Editprd(editId)} >Edit</button>
                <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">CLOSE</button>
            </div>
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
)}export  default Manageprod