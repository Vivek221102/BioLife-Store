import React from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios'; 
import { Link } from 'react-router-dom';

function Payment(){

    const location = useLocation();
    const { pid, productName, productPrice, productImage, productQuantity, productsub} = location.state;
   alert(pid)
    let user = JSON.parse( sessionStorage.getItem("user_data"));
    var uid = user.id;
   
    const itempayment=(prc, qty, subprc,e)=>{
    //    alert(subprc)
    e.preventDefault();
        // let usr = JSON.parse(localStorage.getItem('mydata'));
        var uid = user.id;
        // alert(subprc);
        
      var opt = {  
      "key": "rzp_test_ETjGIvnx2Bl3D3",
      "amount": subprc * 100, // 2000 paise = INR 20
      "name": "Vivek",
      "description": "purchase product",
      "currency" : "INR", 
      "netbanking" :true,
      prefill: {
                 name: "Vivek Parmar",
                 email: "vivek@gmail.com",
                 contact: 9313231486,
               },
     
            
      "handler": function (response){
      
      
        Axios.post('http://localhost:1121/api/insertorder',
        {uid:uid,prc:prc, qty:qty}).then((response)=>{
            if(response.data.message)
            {
                alert(response.data.message);
                window.location = "/login" 
            }
            else
            {
              
                alert("SUCCESS");
                window.location = "/" 
            }
        });
      
      
      },
      
      "theme": {
        "color": "#528FF0"
      
      }
      };
      
      var rzp1 = new window.Razorpay(opt);
      rzp1.open();
      
    }
    return(
        <>
        <br/><br/>
        
        <div class="hero-section hero-background">
        <h1 class="page-title">Checkout</h1>
    </div>
            <br/>
            <div style={{padding:"50px"}}>
                    <div class="container-fluid pt-5">
       
            <div class="col-lg-8">
                <div class="mb-5">
                    <h2 style={{float:"center"}}> <u>User Details</u></h2><br/>
                    <div class="row" style={{marginLeft:"158px", padding:"25px", border:"3px solid black"}}>
                      <div style={{ float:"left", textAlign:"left"}}>
                                Name   :	{user.name} {user.lname}<br />
								Email  :	{user.email}<br/>
								Mobile :	{user.mobile}<br/>
								Address:	{user.add}
                      </div>
                
                        <div class="col-md-3 form-group">
                            <div class="custom-control custom-checkbox" style={{marginLeft:"67px"}}>
                                <button className="btn btn-submit btn-bold" for="shipto"  data-toggle="collapse" data-target="#shipping-address" style={{color:"white"}} >Click to change different address</button>
                            </div>
                        </div>
                    </div>
                </div><br/><br/>
                <div class="collapse mb-4" id="shipping-address">
                    <h2 class="font-weight-semi-bold "><u>Put New Address</u></h2>
                    <div class="row" style={{marginLeft:"150px",padding:"40px",border:"3px solid black"}}>
                    <p className="form-row">
                                        <label htmlFor="address">Address:<span className="requite" style={{marginLeft:"650px"}}></span></label><br/>
                                        <textarea  placeholder="Enter Your Address with pincode." className="col-lg-9"></textarea>
                                    </p><br/><br/><br/><br/>
                    <p className="form-row wrap-btn">
                          <button className="btn btn-submit btn-bold" type="submit" style={{marginRight:"660px"}}>Update Address</button>
                     </p>
                    </div><br/><br/><br/>
                </div>
            </div>
            
            <h2 style={{marginRight:"490px",marginTop:"290px"}}> <u>Product's Details For Payment </u></h2><br/>
        
            <div id="main-content" className="main-content">
                <div className="container" style={{ display: "flex", gap: "50px"}}>
                    <img src={"http://localhost:1121/public/" + productImage} style={{ width: "450px", height: "400px",border:"2px solid black" }} />
                   
                   
                    {/* <div className="row" style={{ fontFamily: "cursive" }}>
                        <div className="col-lg-4" style={{ width: "400px",marginLeft:"100px"}}>
                            <div className="signin-container">
                                <form >
                                    <p className="form-row">
                                        <label htmlFor="mail_id">Product Name:<span className="requite"></span></label>
                                        <input type="text" id='pname'  value={productName}/>
                                    </p>
                                    <p className="form-row">
                                        <label htmlFor="mail_id">Product Price:<span className="requite"></span></label>
                                        <input type="text" id='pname' value={productPrice}/>
                                    </p>
                                    <p className="form-row">
                                        <label htmlFor="mail_id">Product Quantity:<span className="requite"></span></label>
                                        <input type="text" id='pname' value={productQuantity}/>
                                    </p>
                                    <p className="form-row">
                                        <label htmlFor="mail_id">Product Sub-Price:<span className="requite"></span></label>
                                        <input type="text" id='pname' value={productsub}/>
                                    </p>
                                    <br />
                                    <p className="form-row wrap-btn">
                                        <button className="btn btn-submit btn-bold" type="submit">Buy</button>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div> */}

                    <div className="col-lg-5 ">
                            <div className="shpcart-subtotal-block">
                            <div className="subtotal-line" style={{textAlign:" left"}}>
                                    <b className="stt-name">Product Name:</b>
                                    <span className="stt-price"><span className="currencySymbol">{productName}</span></span>
                                </div>
                                <div className="subtotal-line" style={{textAlign:" left"}}>
                                    <b className="stt-name">Product Price:</b>
                                    <span className="stt-price"><span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i>{productPrice}</span></span>
                                </div>
                                <div className="subtotal-line" style={{textAlign:" left"}}>
                                    <b className="stt-name"> Product Quantity:</b>
                                    <span className="stt-price"><span className="currencySymbol">{productQuantity}</span></span>
                                </div>   

                                  <div className="tax-fee" style={{textAlign:" Right"}}>
                                    <p className="title">Est. Taxes & Fees</p>
                                    <p className="desc">Based on 56789</p>
                                  </div>
                                <div className="subtotal-line" style={{textAlign:" left"}}>
                                    <b className="stt-name">Product Sub-Price:</b>
                                    <span className="stt-price"><span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i>{productsub}</span></span>
                                </div>
                            
                                <div className="btn-checkout" >
                                    <button className="btn checkout" onClick={(e)=>itempayment(productPrice, productQuantity,productsub,e)}>Payment</button>
                                </div>
                    </div></div>        
                </div>
            </div>
            </div>

   </div>
    <br></br>
        </>
    )
}export default Payment

