import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import  Axios  from 'axios';
function Mywishlist(props) {

let user = JSON.parse(sessionStorage.getItem("user_data"))
let uid = user.id;

  const  [list,setlist]= useState([''])
   
  useEffect(()=>{
        Axios.get("http://localhost:1121/api/wishlistfetch",{params:{uid:uid}}).then((Response)=>{
            setlist(Response.data)
            // alert(uid)
        })
    },[])

  const addtocart=(p_id)=>{
    Axios.post("http://localhost:1121/api/addcart",{uid:uid,p_id:p_id}).then((Response)=>{
               
    if(Response.data.msg){
        alert(Response.data.msg)
    }
    else{

        alert("added product in your cart ")
    }
    })
  }

  const deletewishlistitem=(pid)=>{
    // alert(pid)
    Axios.post("http://localhost:1121/api/removeitemwish",{uid:uid, pid:pid}).then((response)=>{
        window.location="/wishlist"
    })
  }
    return (
        <div>
             
             <br/><br/>     
<div className="hero-section hero-background">
        <h1 className="page-title">My Wishlist</h1>
    </div> 
    <br/> 
           <div className="shopping-cart-container" >
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h3 className="box-title">Your Wishlisted items</h3>
                            <form className="shopping-cart-form" action="#" method="post">
                                <table className="shop_table cart-form">
                                    <thead>
                                    <tr>
                                        <th className="product-name" style={{width:"0px"}}>Remove</th>
                                        <th className="product-name">Product Name</th>
                                        <th className="product-price">Price</th>
                                        <th className="product-quantity">Descriptions</th>
                                        <th className="product-subtotal">Add to Cart</th>
                                    </tr>
                                    </thead>

                                    { list.map((val,index)=>{
                                        return(
                                            <>
                                            <tbody key={index}>
                                    <tr className="cart_item">
                                        <td className="product-price" data-title="Price">
                                        <div className="action">
                                               <Link to="/wishlist" className="remove" onClick={(e)=> deletewishlistitem(val.pdt_id)}><i className="fa fa-trash-o" aria-hidden="true"></i></Link>
                                           </div>
                                        </td>

                                        <td className="product-thumbnail" data-title="Product Name" style={{    display: "flex", flexDirection: "column-reverse"}}>
                                            <Link className="prd-thumb" to="/singleproduct" state={{ prid: val.p_id }}>
                                                <figure><img  src={"http://localhost:1121/public/" +val.p_img } alt="shipping cart"  style= {{width:"206px", height:"146px"}}/></figure>
                                            </Link>
                                           <br/>
                                            <Link className="prd-name" to="/singleproduct" state={{ prid: val.p_id }}  style={{padding:"10px"}}>{val.p_name}</Link>
                                            
                                        </td>
                                        <td className="product-price" data-title="Price">
                                            <div className="price price-contain">
                                                <ins><span className="price-amount"><span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span> {val.p_price}</span></ins>
                                            </div>
                                        </td>

                                        <td className="product-price" data-title="Price">
                                            <div className="price price-contain">
                                                <span className="price-amount" style={{padding:"35px"}}> {val.p_desc}</span>
                                            </div>
                                        </td>
                 
                                        <td className="product-quantity" data-title="Quantity"  >
                                        
                                   <div className="quantity-box type1">
                                                <div className="qty-input">
                                                <button class="btn btn-submit btn-bold" state={{ p_id: val.p_id }} onClick={(e)=>addtocart(val.p_id)}>add to cart</button>
                                                </div>
                                            </div>
                                        </td>
                                        
                                    </tr>
                                   
                                   
                                    </tbody>
                                            </>
                                        )
                                    })

                                    }
                                    <tr className="cart_item wrap-buttons">
                                        <td className="wrap-btn-control" colspan="4">
                                            <Link to="/product" className="btn back-to-shop">Back to Shop</Link>
                                            <button className="btn btn-update" type="submit" disabled>update</button>
                                            <button className="btn btn-clear" type="reset">clear all</button>
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                       
                    </div>
                </div>
                <br/><br/>

        </div>
    );
}

export default Mywishlist;