import React from 'react'
import {useEffect ,useState } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios';


function Getreward() {
 const [totalpoint ,settotalpoint ] = useState(0)
 const [list, setlist] = useState(['']);

 let user = JSON.parse( sessionStorage.getItem("user_data"));
var uid = user.id;

 useEffect(()=>{

    Axios.get("http://localhost:1121/api/getrewarddata",{params:{uid:uid}}).then((Response)=>{
        settotalpoint(Response.data[0].reward); // alert(totalpoint)
})
 },[]);


 useEffect(()=>{
        Axios.get("http://localhost:1121/api/getlistreward",{params:{uid:uid}}).then((Response)=>{
                setlist(Response.data);
        })
 })

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const [showValue, setShowValue] = useState(false);


  const handleButtonClick = () => {
    // Toggle the showValue state
    setShowValue(!showValue);
  };


    return (

    <div>

<br/><br/>
<div class="hero-section hero-background">
        <h1 class="page-title">Rewards</h1>
    </div>
        <div class="page-contain shopping-cart">
                <div id="main-content" class="main-content">
            <div class="container">

                <div class="top-banner background-top-banner-for-shopping min-height-346px">
                    <h3>Hi!</h3>
                    <h2 > Total Reward Price In Your Wallet Is  <b style={{fontSize:"xxx-large"}}><span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span>{totalpoint}</b></h2>
                    <p class="subtitle"> Use this reward for Purchase amazing products form our store and for more reward earn get return waste of products in our store.</p>
                    {/* <ul class="list">
                        <li>
                            <div class="price-less">
                                <span class="desc">Purchase amount</span>
                                <span class="cost">$0.00</span>
                            </div>
                        </li>
                        <li>
                            <div class="price-less">
                                <span class="desc">Credit on billing statement</span>
                                <span class="cost">$0.00</span>
                            </div>
                        </li>
                        <li>
                            <div class="price-less sum">
                                <span class="desc">Cost affter statemen credit</span>
                                <span class="cost">$0.00</span>
                            </div>
                        </li>
                    </ul> */}
                    <p class="btns">
                        <Link to="/product" class="btn">Use Reward</Link>
                        <Link onClick={handleButtonClick} class="btn">View History</Link>
                    </p>
                </div>


                   {showValue ?
                         <p>
                         <div class="shopping-cart-container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h2 >Your Reward details</h2><br/>
                            <form class="shopping-cart-form" action="#" method="post">
                                <table class="shop_table cart-form">
                                    <thead>
                                    <tr>
                                        <th class="product-name" style={{width:"0px"}}><b>SR.No</b></th>
                                        <th class="product-name">Product Name</th>
                                        <th class="product-price"> Reward Price</th>
                                        <th class="product-quantity">quantity</th>
                                        <th class="product-subtotal">total reward</th>
                                        <th class="product-subtotal">when get reward</th>
                                    </tr>
                                    </thead>
                                   
                                    { list.map((val,index)=>{
                                        return(
                                            <>
                                    <tbody>
                                    
                                    <tr class="cart_item" key={index}>
                                        <td class="product-quantity" data-title="Quantity">
                                        {index+1}.
                                        </td>

                                        <td class="product-thumbnail" data-title="Product Name">
                                            <Link className="prd-thumb" to="/singleproduct" state={{ prid: val.p_id }}>
                                                <figure><img  src={"http://localhost:1121/public/" +val.p_img } alt="shipping cart"  style= {{width:"113px", height:"113px"}}/></figure>
                                            </Link>
                                           
                                            <Link class="prd-name" to="/singleproduct" state={{ prid: val.p_id }}>{val.p_name}</Link>
                                        </td>
                                        <td class="product-price" data-title="Price">
                                            <div class="price price-contain">
                                                <ins><span class="price-amount"><span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span> {val.return_price}</span></ins>
                                            </div>
                                        </td>
                                        <td class="product-quantity" data-title="Quantity">
                                            <div class="quantity-box type1">
                                                <div class="qty-input">
                                                    <input type="text" name="qty12554" value={val.qty}/>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="product-subtotal" data-title="Total">
                                            <div class="price price-contain">
                                                <ins><span class="price-amount"><span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span> {val.total_amount}</span></ins>
                                          
                                            </div>
                                        </td>

                                        <td class="product-subtotal" data-title="Total">
                                            <div class="price price-contain">
                                                <ins><span class="price-amount">{formatDate(val.when_get_reward)}</span></ins>
                                          
                                            </div>
                                        </td>
                                    </tr>
                                  
                                    
                                    </tbody>
                                    </>
                                        )
                                    })

                                    }
                                    <tr class="cart_item wrap-buttons">
                                        <td class="wrap-btn-control" colspan="4">
                                            <Link class="btn back-to-shop" to="/checkout">View order</Link>
                                        </td>
                                    </tr>
                                </table>
                                
                            </form>
                        </div>
                       
                    </div>
                </div>
                         </p> 
                         :
                         <p>
                      
                         </p>
                         }    



            </div>
        </div>
    </div>

    <br/><br/>
</div> 
  )
}

export default Getreward
