import React, {useEffect, useState } from "react";
import Axios from "axios";


function Product(){

    const[p_image,i_img]=useState('');

    const[cat, catlist] = useState(['']);
    const[selval, selectdropval]= useState(['']);

useEffect(()=>{
    Axios.get("http://localhost:1121/api/productcat").then((Response)=>{
        catlist(Response.data);
    })
})

const drop =(id)=>{
    
  Axios.get("http://localhost:1121/api/fetchid", {params:{id:id}}).then((Response)=>{
     selectdropval(Response.data);
  })
 
    
 }



    const Addproduct=(e)=>{

        var i_name = document.getElementById("i_name").value;
        // var i_code = document.getElementById("i_code").value;
        var i_category = document.getElementById("i_cat").value;
        var i_price = document.getElementById("i_cost").value;
        var ret_price = document.getElementById("ret_cost").value;
        var i_des = document.getElementById("i_des").value;

// alert(i_name)

        let formdata =new FormData();
            formdata.append("i_name", i_name);
            // formdata.append("i_code", i_code);
            formdata.append("i_category", i_category);
            formdata.append("p_image", p_image);
            formdata.append("i_price", i_price );   
            formdata.append("ret_price", ret_price);
            formdata.append("i_des", i_des);
        
            Axios.post("http://localhost:1121/api/itemdetails",formdata,{headers: {"Content-Type":"multipart/form-data"
    }}).then((Response)=>{
                alert("added successfully...");
                window.location ="/products";
            })
        }

    return(
        <>
        <section class="content">
        <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="card">
                        <div class="header">
                            <h2><strong>PRODUCTS</strong>Details</h2>
                        </div>
                        <form >
                        <div class="body">
                            <div class="row clearfix">
                         
                                <div class="col-lg-8 col-md-6">
                                    <label>Item Name</label>
                                    <div class="input-group masked-input">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="ti-shopping-cart"></i></span>
                                        </div>
                                        <input type="text" class="form-control date" required placeholder="Add name of item" id="i_name"/>
                                    </div>
                                </div>
                                {/* <div class="col-lg-4 col-md-6">
                                    <label>Item Code</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="ti-flickr"></i></span>
                                        </div>
                                        <input type="text" class="form-control time24" placeholder="Add unique code of item" id="i_code"/>
                                    </div>
                                </div> */}
                                <div class="col-lg-8 col-md-6">
                                    <label>Item Price</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="zmdi zmdi-money-box"></i></span>
                                        </div>
                                        <input type="number" class="form-control time12" required placeholder="Add the cost of item" id="i_cost"/>
                                    </div>
                                </div>
                               
                                <div class="col-lg-8 col-md-6">
                                    <p>Item Category</p>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="zmdi zmdi-money-box"></i></span>
                                        </div>
                                        <select class="form-control show-tick ms select2" required onChange={(e)=>{drop(e.target.value)}} data-placeholder="Select" id="i_cat">
                                       {        cat.map((val,index)=>{
                                                
                                                return(
                                                    <option key={index} value={val.id}>{val.cat_name}</option>
                                                )
                                       })

                                       }
                                            
                                         
                                    </select>
                                    </div>
                                </div>

                                <div class="col-lg-8 col-md-6">
                                    <label>Return Price</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="zmdi zmdi-money"></i></span>
                                        </div>
                                        <input type="number" class="form-control mobile-phone-number" required placeholder="Add the cost return waste item" id="ret_cost"/>
                                    </div>
                                </div>
                                <div class="col-lg-8 col-md-6">
                                    <label>Item Image</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="ti-upload"></i></span>
                                        </div>
                                        <input type="file" class="form-control mobile-phone-number" required onChange={(e)=> i_img(e.target.files[0])}/>
                                    </div>
                                </div>
                                                     
                                
                                <div class="col-lg-8 col-md-6">
                                    <label>Item Description</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="ti-pencil-alt"></i></span>
                                        </div>
                                       
                                        <textarea type="text" class="form-control key" required placeholder="Description" id="i_des"/>
                                    </div>
                                </div>

                                <div class="col-lg-8 col-md-2">
                                   
                                    {/* <button class="btn btn-primary btn-block waves-effect waves-light" type="button" onClick={} style={{fontFamily:"cursive", fontSize:"large", marginLeft:"150%"}}>Add Product</button> */}
                                    <button href="javascript:void(0);" class="btn bg-blue waves-effect waves-light" type="button"  onClick={Addproduct}>Add Product</button>
                                </div>
                      
                            </div>
                        </div>  </form>
                    </div>
                </div>
            </div>

</section>
        </>
    )
}export default Product