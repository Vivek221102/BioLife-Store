import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function Checkout(){

    let user = JSON.parse( sessionStorage.getItem("user_data"));
    var uid = user.id;

    // const dateString = '2020-05-14T04:00:00Z'

    // const formatDate = (dateString) => {
    //   const options = { year: "numeric", month: "long", day: "numeric"}
    //   return new Date(dateString).toLocaleDateString(undefined, options)
    // }
    
    // console.log(formatDate(dateString))
    

    const [list, setlist]= useState(['']);


useEffect(()=>{
   
    Axios.get("http://localhost:1121/api/fetchorder",{params:{uid:uid}}).then((Response)=>{
        setlist(Response.data);

    })
},[])



const downloadinvoice=(oid)=>{

    Axios.get("http://localhost:1121/api/getdatainvoice",{params:{uid:uid, oid:oid}}).then((Response)=>{
   
    window.location="/invoice"
    })
}

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

    return (
        <>
          <br/><br/>
    <div class="hero-section hero-background">
        <h1 class="page-title">Order Summary</h1>
    </div>
<br/>


                         
    <div class="shopping-cart-container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h4 style={{textAlign:"left"}}><b>Sold To: </b>{user.name} {user.lname}</h4>
                        <h4 style={{textAlign:"left"}}><b>On Address: </b>{user.add}</h4>
                            <h2><u>Your Order Summary</u></h2><br/>
                           
                            <form class="shopping-cart-form" action="#" method="post">
                                <table class="shop_table cart-form">
                                    <thead>
                                    <tr> 
                                        <th className="product-price">Oreder ID</th>
                                        <th className="product-price">when oredered</th>
                                        <th className="product-price">View Invoice</th>
                                    </tr>
                                    </thead>
                                    { 
                                        list.map((val,index)=>{
                                        return(
                                            <>
                                            <tbody >
                                    <tr className="cart_item" >
                                        {/* <td className="product-thumbnail" data-title="Product Name">
                                        
                                        <ins><span className="price-amount" >{}</span></ins>
                                        </td> */}
                                        
            

                                        <td className="product-price" data-title="Price">
                                            <div className="price price-contain">
                                                <ins><span className="price-amount" key={index}> {index+1}] {val.book_id}</span></ins>
                                           
                                            </div>
                                        </td>

                                        {/* <td className="product-quantity" data-title="Quantity"  >
                                        
                                   <div className="quantity-box type1">
                                                <div className="qty-input">
                                                    <input type="text" name="quantity"  data-max_value="10" data-min_value="1"  value={val.qty} />
                                                </div>
                                            </div>
                                        </td> */}
                                        {/* <td className="product-subtotal" data-title="Total">
                                            <div className="price price-contain">
                                               
                                                <ins><span className="price-amount"><span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span> {val.p_price * val.qty}</span></ins>
                                              
                                                <del><span className="price-amount"><span className="currencySymbol">£</span>95.00</span></del>
                                            </div>
                                        </td> */}
                                        <td className="product-price" data-title="Price">
                                            <div className="price price-contain">
                                            <ins><span className="price-amount">{formatDate(val.when_oredered)}</span>  </ins> 
                                            </div>
                                        </td>

                                        <td className="wrap-btn-control">
                                        
                                        <Link to="/invoice" state={{ oid: val.book_id }}> <button className="btn btn-clear" type="reset" onClick={(e)=>downloadinvoice(val.book_id)}>View Reciept</button></Link>
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
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>
</div></div>
 <br/>          
        </>
    )
}export default Checkout