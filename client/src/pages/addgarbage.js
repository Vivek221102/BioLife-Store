import React, { useState } from "react";
import Axios from "axios";
function Addgarbage(){
    

    const[wname,wastename]=useState('');
    const[wtype,wastetype]=useState('');
    const[des,wastedesc]=useState('');
    const[weightvalue,weight ]=useState('');
    const[w_image,imgwaste]=useState('');



    const adddataofwaste=(e)=>{
let formdata =new FormData();{
    formdata.append("wname",wname);
    formdata.append("wtype",wtype);
    formdata.append("des",des);
    formdata.append("weightvalue",weightvalue);
    formdata.append("w_image",w_image);

}

        Axios.post("http://localhost:1121/api/dataofwaste",formdata,{headers: {"Content-Type":"multipart/form-data"
        }}).then((Response)=>{
                alert("added data successfully");
                window.location="/";
        });
    }


    return(
        <>
           <br/><br/>
     <div class="hero-section hero-background">
        <h1 class="page-title">Bio Plastic</h1>
    </div>
    <br/>
                    <center>
                    <h1 style={{color:"#98BF64", fontFamily:"sans-serif" }}>Add details for Recycling </h1>
                    </center>   <br/>




<div style={{color:"#98BF64", fontFamily:"cursive",}}>                  



<div class="align-w3" >
    <form action="addnewparcelprocess.php" method="post" class="p-sm-3" enctype="multipart/form-data">
        <div class="row">
         
            
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label" onChange={(e)=>{wastename(e.target.value)}}>Waste Name</label>
                        <input type="text" class="form-control" placeholder="Add Waste Name"  id="w_name"  />
                    </div>
                    <div class="form-group">
                        <label for="recipient-email" class="col-form-label" onChange={(e)=>{wastetype(e.target.value)}}>Waste Type</label>
                        <input type="text" class="form-control" placeholder="Add type of waste" name="to_where" id="w_type"/>
                    </div>
                    <div class="form-group ">
                    <label for="recipient-email" class="col-form-label" onChange={(e) =>{wastedesc(e.target.value)}}>Waste Description</label>
                    <textarea  for="recipient-description" class="form-control" id="des" style={{color:"#98BF64", fontFamily:"cursive"}}>Description</textarea>    
                    </div>
                    <div class="form-group">
              </div>
                </div>

         
                <div class="col-md-6">
                    <label for="recipient-email" class="col-sm-7 col-form-label" onChange={(e)=> {weight(e.target.value)}}>Weight</label>
                    <div class="form-group row">

                        <div class="col-sm-7">
                            <input type="text" class="form-control" placeholder="Max Weight" id="weightvalue" name="max_weight"/>
                        </div>
                        <div class="col-sm-3">
                            <select class="form-control" id="weightunit" required name="weight_value">
                                <option>KG</option>
                                <option>G</option>
                            </select>
                        </div>
                    </div>


                    <div class="form-group col-md-10">
                        <label for="recipient-email" class="col-form-label" >Image of Waste</label>
                        <input type="file" class="form-control" name="image" id="image" required    onChange={(e)=>imgwaste(e.target.files[0])}/>

                    </div>
                  

                   
                </div>
                <div >
                    <button type="button" value="Submit" onClick={adddataofwaste} >Submit</button>      
                </div>
            </div> </form>
              </div>

              </div>  
<br/><br/>
                    
                 
        </>  
        
    )
}export default Addgarbage