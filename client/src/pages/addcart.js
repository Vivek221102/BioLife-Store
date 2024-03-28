import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from 'react-router-dom';

function Addtocart(){

    let user = JSON.parse( sessionStorage.getItem("user_data"));
    var uid = user.id;


    const [list, setlist]= useState(['']);
    

useEffect(()=>{
   
    Axios.get("http://localhost:1121/api/fetchcart",{params:{uid:uid}}).then((Response)=>{
        setlist(Response.data);
       // console.log (Response.data);
    })
},[])




function addop(cid, quantity) {
    quantity = quantity < 10 ? quantity + 1 : 10;
    Axios.post("http://localhost:1121/api/updatequantity", { uid: uid, cid: cid, quantity: quantity })
        .then((response) => {
            console.log(response.data);
            window.location = "/cart";
        })
        .catch((error) => console.error(error));
}

function deleteop(cid, quantity) {
    quantity = quantity > 1 ? quantity - 1 : 1;
    Axios.post("http://localhost:1121/api/updatequantity", { uid: uid, cid: cid, quantity: quantity })
        .then((response) => {
            console.log(response.data);
            window.location = "/cart";
        })
        .catch((error) => console.error(error));
}


const displayedval = (cid, qty) => {
    Axios.get("http://localhost:1121/api/getquantity", { params: { uid: uid, cid: cid, qty: qty } })
        .then((response) => {
            console.log(response.data.quantity);
            // Update val.quantity with the new quantity obtained from the response
            // val.quantity = response.data.quantity;
        })
        .catch((error) => console.error(error));
}


const [totalprice, settotalprice] = useState(0)
function updatetotalprice(cartItems) {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.p_price * item.quantity;
    });
    settotalprice(total);
  }

useEffect(() => {
    Axios.get("http://localhost:1121/api/fetchcart", { params: { uid: uid } }).then((response) => {
      updatetotalprice(response.data);

    });
  }, []);



const addtotal=()=>{
    console.log("Total price updated:", totalprice);
}



const deletefromcart=(pid)=>{
   // alert(pid);

   alert("sure you want to delete product from cart.")
    Axios.post("http://localhost:1121/api/deleteproduct",{uid:uid, pid:pid}).then((response)=>{
        window.location="/cart";
    })
}

const [totalpoint ,settotalpoint ] = useState(0);
const [showValue, setShowValue] = useState(false);
const handleButtonClick = () => {
    // Toggle the showValue state
    setShowValue(!showValue);
  };

useEffect(()=>{

    Axios.get("http://localhost:1121/api/getrewarddata",{params:{uid:uid}}).then((Response)=>{
        settotalpoint(Response.data[0].reward); // alert(totalpoint)
})
 },[]);


const [totalCount, setTotalCount] = useState(0);
//  alert(uid);
 useEffect(() => {
    // alert(uid);
        Axios.get("http://localhost:1121/api/getcount",{params:{uid:uid}}).then((Response)=>{
            setTotalCount(Response.data[0].count);
        }) 
 })

const [rewd, setrewd] = useState(0)
// const [ttlrwd, setttlrwd] = useState(0)

const usereward=(e)=>{
    e.preventDefault();
    let rwd = document.getElementById("usedrwd").value;
    // alert(rwd);
    setrewd(rwd);
    // alert(totalpoint);
   var price = parseInt(totalpoint)-parseInt(rwd);
//    alert(price);
}


const getorder = async (prc) => {
    let rwd = 0;

    const opt = {
        "key": "rzp_test_ETjGIvnx2Bl3D3",
        "amount": prc * 100, 
        "name": "BIOLIFE",
        "description": "purchase product",
        "currency": "INR",
        "netbanking": true,
        "prefill": { 
            name: "Vivek Parmar",
            email: "vivek@gmail.com",
            contact: "+919313231486", // Adding a plus sign to the contact number
        },
        "notes": {},
        "handler": async function (response) {
            const url = "http://localhost:1121/api/insertorder";
            try {
                await Axios.post(url, { uid: uid, prc: prc, rwd: rwd });
                alert("Payment done successfully 👍...");
                window.location = "/cart";
            } catch (error) {
                console.log("error", error);
                alert("An issue occurred while processing payment");
            }
        },
        "theme": {
            "color": "#528FF0"
        }
    };

    var rzp1 = new window.Razorpay(opt);
    rzp1.open();
}

const getrewardorder = () => {
    let rwd = document.getElementById("usedrwd").value;
    let prc = parseInt(totalprice) - parseInt(rwd);
// alert(prc)
    const opt = {
        "key": "rzp_test_ETjGIvnx2Bl3D3",
        "amount": prc * 100, 
        "name": "BIOLIFE",
        "description": "purchase product",
        "currency": "INR",
        "netbanking": true,
        "prefill": { 
            name: "Vivek Parmar",
            email: "vivek@gmail.com",
            contact: "+919313231486", // Adding a plus sign to the contact number
        },
        "notes": {
            address: 'Razorpay Corporate Office'
        },
        "handler": async function (response) {
            const url = "http://localhost:1121/api/insertorder";
            try {
                await Axios.post(url, { uid: uid, rwd: rwd, prc: prc });
                alert("Payment done successfully 👍...");
                window.location = "/cart";
            } catch (error) {
                console.log("error", error);
                alert("An issue occurred while processing payment");
            }
        },
        "theme": {
            "color": "#90bf2a"
        }
    };

    var rzp1 = new window.Razorpay(opt);
    rzp1.open();
}

    return(     
<>


<br/><br/>     
<div className="hero-section hero-background">
        <h1 className="page-title">Add To Cart</h1>
    </div> 
    <br/> 
    <div class="page-contain shopping-cart">
                {/* <div id="main-content" class="main-content"> */}
                <div class="container">
           <div className="shopping-cart-container">
                    <div className="row">
                        <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12">
                            <h3 className="box-title">Your cart items</h3>
                            <form className="shopping-cart-form" action="#" method="post">
                                <table className="shop_table cart-form">
                                    <thead>
                                    <tr>
                                        <th className="product-name">Product Name</th>
                                        <th className="product-price">Price</th>
                                        <th className="product-quantity">Quantity</th>
                                        <th className="product-subtotal">Total</th>
                                    </tr>
                                    </thead>

                                    { list.map((val,index)=>{
                                        return(
                                            <>
                                            <tbody key={index}>
                                    <tr className="cart_item">
                                        <td className="product-thumbnail" data-title="Product Name">
                                            <Link className="prd-thumb" to="/singleproduct" state={{ prid: val.p_id }}>
                                                <figure><img  src={"http://localhost:1121/public/" +val.p_img } alt="shipping cart"  style= {{width:"113px", height:"113px",borderRadius:"100px"}}/></figure>
                                            </Link>
                                           
                                            <Link className="prd-name" to="/singleproduct" state={{ prid: val.p_id }} style={{textDecoration:"none"}}>{val.p_name}</Link>
                                            <div className="action">
                                                <Link  className="remove" onClick={(e)=>deletefromcart(val.product_id)}><i className="fa fa-trash-o" aria-hidden="true"></i></Link>
                                            </div>
                                        </td>
                                        <td className="product-price" data-title="Price">
                                            <div className="price price-contain">
                                                <ins><span className="price-amount"><span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span> {val.p_price}</span></ins>
                                                {/* <del><span className="price-amount"><span className="currencySymbol">£</span>95.00</span></del> */}
                                            </div>
                                        </td>
                                        <td className="product-quantity" data-title="Quantity"  >
                                        
                                   <div className="quantity-box type1">
                                       <div class="qty-input">
                                       <input type="text" name="qty" value={val.quantity} data-max_value="10" data-min_value="1" onChange={(e) => displayedval(val.quantity, val.cart_id)} />
                                        <Link to="" className="qty-btn btn-up"><i className="fa fa-caret-up" aria-hidden="true" onClick={() => addop(val.cart_id, val.quantity)}></i></Link>
                                        <Link to="" className="qty-btn btn-down"><i className="fa fa-caret-down" aria-hidden="true" onClick={() => deleteop(val.cart_id, val.quantity)}></i></Link>
                                        </div>
                                            </div>
                                        </td>
                                        <td className="product-subtotal" data-title="Total">
                                            <div className="price price-contain">
                                               
                                                <ins><span className="price-amount"><span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span> {val.p_price * val.quantity}</span></ins>
                                              
                                                {/* <del><span className="price-amount"><span className="currencySymbol">£</span>95.00</span></del> */}
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
                                            <button className="btn btn-clear" type="reset">clear all</button>
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>
<br/><br/>
                        <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                            <div className="shpcart-subtotal-block">
                            <span className="sub">{totalCount} items</span>
                        {   list.map((val,index)=>{
                            return(
                                <>
                             
                                <div className="subtotal-line" style={{textAlign:" left"}}>
                                    <b className="stt-name" key={index}>{index+1}. {val.p_name} </b>
                                    <span className="stt-price"><span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span> {val.p_price * val.quantity}</span>
                                </div>
                                </>
                               
                            )
                        })

                        }
                        
                        <div className="subtotal-line" style={{textAlign:" left"}}>
                                    <b className="stt-name" style={{color:" red "}}>Total Reward Price In Your Wallet :</b>
                                    <span className="stt-price"><span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span> {totalpoint}</span>
                                </div>
                               
                           
                                <div > <br/>                                <p><b>for using reward click on below link </b> </p>

                                <div style={{backgroundColor:"#90bf2a",borderRadius:"12px"}}>
                                <Link to="#"  onClick={handleButtonClick} style={{color:"white",textDecoration:"none",fontWeight:"bold"}}>Use Your Reward</Link><br/>  
                                </div>
                         {showValue ?
                         <p>
                         <div class="col-lg-12 col-md-6 col-sm-6 col-xs-12">
                                    <div class="signin-container">
                                        <form action="#" name="frm-login" method="post">
                                         <p class="form-row">
                                            <label for="fid-pass">Enter Reward Price:<span class="requite"></span></label>
                                            <input type="number" id="usedrwd" placeholder="Enter Price you want to use from Reward Wallet" name="email"  class="txt-input"/>
                                         </p>
                                 <div className="btn-checkout" >
                                 <p class="form-row wrap-btn" style={{margin: "-27px",marginLeft:"143px"}}>
                                        <button class="btn btn-submit btn-bold" type="submit"  onClick={usereward}>click to use</button><br/> <br/>
                                </p>
                                </div>
                              </form>
                             </div>
                            </div>
                         <div className="tax-fee">
                        </div>
                                <div className="subtotal-line" style={{textAlign:" left"}}>
                                    <b className="stt-name">Total Price</b>
                                  
                                <span className="stt-price" onChange={addtotal}><span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span>  {totalprice}
                                 </span>      
                                </div>


                                <div className="subtotal-line" style={{textAlign:" left"}}>
                                    <b className="stt-name">Reward Price</b>
                                  
                                <span className="stt-price" onChange={addtotal}>- <span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span> {rewd}
                                 </span>      
                                </div>
                                <div className="tax-fee" style={{textAlign:" right"}}>
                                    <p className="title">Est. Taxes & Fees</p>
                        </div>
                        <div className="subtotal-line" style={{textAlign:" left"}}>
                                    <b className="stt-name">final Total price</b>
                                  
                                <span className="stt-price" > <span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span> {totalprice-rewd}
                                 </span>      
                                </div>
{/* using reward */}
                        <div className="btn-checkout" >
                                    <Link to="" className="btn checkout"  onClick={(e)=>getrewardorder()}>Buy now</Link>
                                </div>
                         </p> 
                         :
                         <p>
                         <div className="tax-fee">
                                    {/* <p className="title">Est. Taxes & Fees</p>
                                    <p className="desc">Based on 56789</p> */}
                        </div>
                                <div className="subtotal-line" style={{textAlign:" left"}}>
                                    <b className="stt-name">Total Price</b>
                                  
                                <span className="stt-price" onChange={addtotal}><span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span>  {totalprice}
                        </span>      
                                </div>
{/* without using reward */}
                        <div className="btn-checkout">
                                    <Link to="#" className="btn checkout"  onClick={(e)=>getorder(totalprice)}>buy now</Link>
                                </div>
                         </p>
                         }    
     
    </div>                               
                         
                       
                       </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>      
                <br/><br/>

        </>
    )
}export default Addtocart