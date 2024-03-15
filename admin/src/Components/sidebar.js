import React from "react";
import { Link } from "react-router-dom";
let  admin =  JSON.parse(sessionStorage.getItem("admin_data")) ;

function Sidebar(){

    const forlogout=()=>{
        sessionStorage.clear();
        window.location="/";
        
        }
    return(
        <>
                <aside id="leftsidebar" class="sidebar">
    <div class="navbar-brand">
        <button class="btn-menu ls-toggle-btn" type="button"><i class="zmdi zmdi-menu"></i></button>
        <Link to="/"><img src="assets/images/logo.png" width="120" alt="bio"/><span class="m-l-10"></span></Link>
    </div>
    <div class="menu">
        <ul class="list">
            <li>
                <div class="user-info">
                    <Link class="image" to="/profile"><img src="assets/images/profile_av.jpg" alt="User"/></Link>
                    <div class="detail">
                        <h4>{admin.name}</h4>                      
                    </div>
                </div>
            </li>
            <li class="active open"><Link to ="/"><i class="zmdi zmdi-home"></i><span>Dashboard</span></Link></li>
   
            <li><a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-accounts"></i><span>Manage Users</span></a>
                <ul class="ml-menu">
                <li><Link to="/userdetails"><i class="zmdi zmdi-accounts-list"></i> User details</Link></li>
                </ul>
            </li>

            <li> <a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-mall"></i><span>Products</span></a>
                <ul class="ml-menu">
                    <li><Link to ="/products"><i class="zmdi zmdi-plus"></i> Add Product</Link></li>
                    <li><Link to ="/manageitem"><i class="zmdi zmdi-fw"> </i>   Manage Product</Link></li>
                </ul>
            </li>
            <li> <a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-view-comfy"></i> <span> Category</span></a>
                <ul class="ml-menu">
                    <li><Link to="/category"><i class="zmdi zmdi-plus"></i> Add category</Link></li>
                    <li><Link to="/managecat"><i class="zmdi zmdi-fw"> </i> Manage Category</Link></li>
                </ul>
            </li>

            <li> <a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-shopping-cart-plus"></i><span>orders</span></a>
                <ul class="ml-menu">
                    <li><a href="/orders">Manage Order</a></li>
                    {/* <li><a href=""><i class="zmdi zmdi-truck"></i>delivery</a></li> */}
                </ul>
            </li>
            <li><Link to="/"><i class="zmdi zmdi-money"></i><span>Payment</span></Link> </li>
            <li><Link to="/rewards"><i class="zmdi ti-gift"></i><span>Rewards</span></Link> </li>
            <li ><Link to="/feedback"><i class="zmdi zmdi-thumb-up"></i><span>Feedback</span></Link></li>   
            <li ><Link   class="mega-menu" title="Sign Out" onClick={forlogout}><i class="zmdi zmdi-power"></i><span>Sign Out</span></Link></li><br/>
         
            {/* <button class="btn btn-primary profile-button" onClick={forlogout}>Log Out</button> */}
            {/* <li>
                <div class="progress-container progress-primary m-t-10"><i class="zmdi zmdi-power""></i>
                    <span class="progress-badge">Traffic this Month</span>
                    <div class="progress">
                <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="67" aria-valuemin="0" aria-valuemax="100" style={{width: "67%;"}}>
                            <span class="progress-value">67%</span>
                        </div>
                    </div>
                </div>
                <div class="progress-container progress-info">
                    <span class="progress-badge">Server Load</span>
                    <div class="progress">
                        <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="86" aria-valuemin="0" aria-valuemax="100" style={{width: "86%;"}}>
                            <span class="progress-value">86%</span>
                        </div>
                    </div>
                </div>
            </li> */}

            
        </ul>
    </div>
</aside>
        </>
    )
}export default Sidebar