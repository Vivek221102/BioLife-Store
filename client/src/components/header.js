import React, { useEffect, useState } from "react";
import  Axios from "axios";
import { Link, NavLink } from "react-router-dom";

function Header(){
    let user = JSON.parse( sessionStorage.getItem("user_data"));
    var uid = user?user.id: null;
       
    const logout=()=>{
        sessionStorage.clear();
        window.location="/";
        }


        const [list,setlist] = useState(['']);
        useEffect(()=>{
   
            Axios.get("http://localhost:1121/api/fetchcart",{params:{uid:uid}}).then((Response)=>{
                setlist(Response.data);
            })
        },[])

        const deletefromcart=(pid)=>{
            // alert(pid);
         
            alert("sure you want to delete product from cart.")
             Axios.post("http://localhost:1121/api/deleteproduct",{uid:uid, pid:pid}).then((response)=>{
                 window.location="/cart";
             })
         }


         const [totalCount, setTotalCount] = useState(0);
        //  alert(uid);
         useEffect(() => {
            // alert(uid);
                Axios.get("http://localhost:1121/api/getcount",{params:{uid:uid}}).then((Response)=>{
                    setTotalCount(Response.data[0].count);
                }) 
         })



    return(
       <>
    
 <header id="header" class="header-area style-01 layout-02">
        <div class="header-top bg-main hidden-xs ">  </div>
        <div class="header-middle biolife-sticky-object " style={{ backgroundColor: "black"}}>
            {/* <div class="container"> */}
            <div>
                <div class="row">
             
                    <div class="col-lg-5 col-md-6 hidden-sm hidden-xs">
                        <div class="primary-menu">
                            <ul class="menu biolife-menu clone-main-menu clone-primary-menu">
                                
                           <li class="menu-item"><NavLink to="/" style={{textDecoration:"none",color:"#90bf2a"}} >Home</NavLink></li>

                                <li class="menu-item"><NavLink to="/product" style={{textDecoration:"none"}}>Products</NavLink></li>
								
                                <li class="menu-item menu-item-has-children ">
                                <NavLink to="/contect" style={{textDecoration:"none"}}>Contact</NavLink>
                               
                                    

                                </li>
                                <li class="menu-item menu-item-has-children ">
                                <NavLink to="/about" style={{textDecoration:"none"}}>Aboutus</NavLink>
                                </li>
                            </ul>
                      
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-2 col-sm-6 col-xs-6">
                   
                        <Link to="/" class="biolife-logo"><img src="assets/images/logo-01/organic.png" alt="biolife logo" style={{width:"140px", height:"40px"}}/></Link>
                    
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6" >
                        <div class="biolife-cart-info">
                           
                           
                          
                            <div class="login-item">

                            {/* here if data is blank then  login and user's some data in session storage then show username in space of login*/}
                            
                            { sessionStorage.getItem("user_data") == null ?
                                <>
                                <Link class="login-link" as={NavLink} to={"/login"} style={{textDecoration:"none"}}><i class="biolife-icon icon-login"></i>Login</Link>
                                </>
                                :
                                <>
                                <div class="minicart-block">
                                <div class="minicart-contain">
                                    <Link to="/myprofile" class="link-to">
                                    <span class="icon-qty-combine">
                                    <i class="biolife-icon icon-login"></i>
                                    </span>
                                    <span class="title">{user.name} </span>
                                   </Link>
                                    <div class="cart-content">
                                        <div class="cart-inner" style={{backgroundColor:"transparent"}}>
                                            <p class="btn-control" style={{display:"flex"}}>
                                   
                                            <Link to="/" class="btn view-cart" onClick={logout}>Log Out</Link>
                                                <Link to="/myprofile" class="btn view-cart">Profile</Link>
                                                          
                                            </p>
                                        </div>
                                    </div>
                                    </div></div>
                                </>
                            }
                        
                            </div>
							
                            <div class="wishlist-block hidden-sm hidden-xs">
                                            {
                                                sessionStorage.getItem("user_data") == null ?
                                                
                                                <>
                                                <Link to="/login" > <img src=".\assets\images\trophy.svg" style={{marginRight: "56px", marginBottom: "-24px"}}></img></Link> 
                                                <Link to="/login" class="link-to">
                                                     <span class="icon-qty-combine">
                                                              <i class="icon-heart-bold biolife-icon"></i>
                                                             
                                                     </span>
                                                </Link>
                                            
                                                </>
                                                :
                                                <>
                                                <Link to="/rewards" > <img src=".\assets\images\trophy.svg" style={{marginRight: "56px", marginBottom: "-24px"}}></img></Link> 
                                                <Link to="/wishlist" class="link-to">
                                                     <span class="icon-qty-combine">
                                                              <i class="icon-heart-bold biolife-icon"></i>
                                                              {/* <span class="qty">4</span> */}
                                                     </span>
                                                </Link>
                                                 </>
                                                 }
                                
                            </div>
                            <div class="minicart-block">
                                <div class="minicart-contain">
                                {
                                                sessionStorage.getItem("user_data") == null ?
                                                
                                                <>
                                                <Link to="/login" class="link-to" style={{textDecoration:"none"}}>
                                            <span class="icon-qty-combine">
                                                <i class="icon-cart-mini biolife-icon"></i>
                                                </span>
                                                    <span class="title" >My Cart</span>
                                        
                                                     </Link>
                                                </>
                                                :
                                                <>
                                              
                                                <Link to="/cart" class="link-to" style={{textDecoration:"none"}}>
                                            <span class="icon-qty-combine">
                                                <i class="icon-cart-mini biolife-icon"></i>
                                                <span class="qty" id="cartCount">{totalCount}</span>
                                                
                                            </span>
                                        <span class="title">My Cart</span>
                                        
                                    </Link>
                                                 </>
                                                 }
                                  
                                    <div class="cart-content">
                                        <div class="cart-inner">
                                        <ul class="products">
                             { list.map((val,index)=>{
                                                return(
                                                    <>
                                                   
                                                    <li>
                                                    <div class="minicart-item">
                                                        <div class="thumb">
                                                        <Link className="prd-thumb" to="/singleproduct" state={{ prid: val.p_id }}>
                                              <img  src={"http://localhost:1121/public/" +val.p_img } alt="img"  style= {{width:"90px", height:"90px"}}/>
                                                         </Link>
                                                           
                                                        </div>
                                                        <div class="left-info">
                                                            <div class="product-title"><Link to="/singleproduct" class="product-name" state={{ prid: val.p_id }}>{val.p_name}</Link></div>
                                                            <div class="price">
                                                                <ins><span class="price-amount"><span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span> {val.p_price}</span></ins>
                                                                {/* <del><span class="price-amount"><span class="currencySymbol">£</span>95.00</span></del> */}
                                                            </div>
                                                            <div class="qty">
                                                                <label for="cart[id123][qty]">Qty:{val.quantity}</label>
                                                                {/* <input type="number" class="input-qty" name="cart[id123][qty]" id="cart[id123][qty]" value="1" disabled> */}
                                                            </div>
                                                        </div>
                                                        <div className="action">
                                                        <Link to="#" className="remove" onClick={(e)=>deletefromcart(val.product_id)}><i className="fa fa-trash-o" aria-hidden="true"></i></Link>
                                                        </div>
                                                    </div>
                                                </li>


                                                    </>
                                                )
                                         })

                                    }
                                              
                                               </ul> 
                                            <p class="btn-control">
                                   
                                    {
                                                sessionStorage.getItem("user_data") == null ?
                                                
                                                <>
                                                <Link to="/login" class="btn view-cart">view cart</Link>
                                                <Link to="/login" class="btn">My Order</Link>
                                                </>
                                                :
                                                <>
                                              
                                                <Link to="/cart" class="btn view-cart">view cart</Link>
                                                <Link to="/checkout" class="btn">My Oreder</Link>
                                                 </>
                                                 }
                                  
                                              
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          
                          
                            <div class="mobile-menu-toggle">
                            <div class="mobile-block block-global">
                                <a class="menu-bar myaccount-toggle btn-toggle" data-object="global-panel-opened" href="javascript:void(0)">
                                    <span class="fa fa-bars"></span>
                                    <span class="text"></span>
                                    <span class="text"></span>
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </header>
       </>
    )
}export default Header;