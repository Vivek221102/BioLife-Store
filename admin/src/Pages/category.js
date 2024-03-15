import React from "react";
import axios from 'axios';
function Productdetails(){
    const Add_category = (e) =>{

        var c_name = document.getElementById("p_cat").value;
        var c_des  = document.getElementById("cat_des").value;


        // var i_name = document.getElementById("i_name").value;
            axios.post("http://localhost:1121/api/addcategory",{
                c_name:c_name, cat_des:c_des
            }).then((Response)=>{
                            alert("category successfully added..");
            })
    }

    return(
      
        <>
    <section class="content">
                 <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="card">
                        <div class="header">
                            <h2><strong>Category</strong>Details</h2>
                            <ul class="header-dropdown">
                                <li class="dropdown"> <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="zmdi zmdi-more"></i> </a>
                                    <ul class="dropdown-menu dropdown-menu-right">
                                        <li><a href="javascript:void(0);">Action</a></li>
                                        <li><a href="javascript:void(0);">Another action</a></li>
                                        <li><a href="javascript:void(0);">Something else</a></li>
                                    </ul>
                                </li>
                                <li class="remove">
                                    <a role="button" class="boxs-close"><i class="zmdi zmdi-close"></i></a>
                                </li>
                            </ul>
                        </div>
                        <div class="body">
                            <form class="form-horizontal"  onSubmit={Add_category}>
                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 form-control-label">
                                        <label for="email_address_2">Category Name</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8">
                                        <div class="form-group">
                                            <input type="text" id="p_cat" class="form-control" required placeholder="Enter category of Product"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 form-control-label">
                                        <label>Description</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8">
                                        <div class="form-group">
                                            <textarea id="cat_des" class="form-control" required placeholder="Enter Description of Category"></textarea>
                                        
                                        </div>
                                    </div>
                                </div>

                                    <div class="col-sm-8 offset-sm-2">
                                        <button type="submit" class="btn btn-raised btn-primary btn-round waves-effect" >ADD Category</button>
                                    </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
     </section>
              
        </>
    )
}export default Productdetails