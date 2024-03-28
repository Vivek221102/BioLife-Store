import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";

function Reward() {

    const [list, setlist] = useState(['']);
    const [user, setuser] = useState(null);



    const verifyuser = () => {
        let email = document.getElementById("email").value;

        Axios.post("http://localhost:1121/api/verifyuid", {
            email: email
        }).then((Response) => {
            if (Response.data.msg) {
                alert(Response.data.msg)
            } else {
                alert("Verified User")
                let obj = { name: Response.data[0].first_name, lname: Response.data[0].last_name, id: Response.data[0].user_id, mobile: Response.data[0].mobile, add: Response.data[0].address };
                sessionStorage.setItem("userdata", JSON.stringify(obj));

                setuser(Response.data);
            }
        })

    }

    useEffect(() => {
        Axios.get("http://localhost:1121/api/userfetch").then((Response) => {
            setlist(Response.data);
        })
    }, [])

    let userdata = JSON.parse(sessionStorage.getItem("userdata"));


    const [item, setitem] = useState(['']);
    const [countqty, setcountqty] = useState(0);
    const [prid, setPrid] = useState(0);
    const [totalreward, settotalreward] = useState(0);
    const [oid, setoid] = useState(0);
    
    const verifypdtid = () => {
        let pid = document.getElementById("puid").value;
        const uid = userdata.id;
        
        alert(`Consumer Name : ${userdata.name} ${userdata.lname} 
Mobile : ${userdata.mobile}`);


            // Response.data[0].qty
           //alert(prid)
          // "Consumer Name : " + userdata.name +" "+ userdata.lname +"    AND     "+ "Mobile: " + userdata.mobile
      
      
          Axios.get("http://localhost:1121/api/getdetails", { params: { pid: pid, uid: uid } }).then((response) => {
            if (response.data && response.data.length > 0) {
                setPrid(response.data[0].p_id);
                setoid(response.data[0].book_id);
                setitem(response.data);
                totalquantity(response.data);
            } else {
                // Handle the case where response.data is empty or undefined
                alert("Worng Product unique code please enter correct unique code again");
                console.error("No data received or data is empty.");
            }
        }).catch(error => {
            console.error("Error fetching data:", error);
        });   
    }
  const addqty = () => {
        let qtys = document.getElementById("addqt").value;
        settotalreward(qtys)
    //    alert(qtys)        
    }

    const addalldata = () => {
        let pid = document.getElementById("puid").value;
        let pname = document.getElementById("pname").value;
        let rprice = document.getElementById("retprice").value;
        let qty = document.getElementById("addqt").value;
        let subrvd = document.getElementById("subrew").value;
        const uid = userdata.id;
        
        //    alert(subrvd)
        Axios.post("http://localhost:1121/api/addrewarddata", {
            uid: uid,
            pid: pid,
            pname: pname,
            rprice: rprice,
            qty: qty,
            subrvd: subrvd,
            oid:oid
        }).then((response) => {
            console.log(response.data);
            alert("data added successfully.")

            window.location="/rewards";
        })

    }


    const totalquantity = (pdt) => {
        var total_qty = 0;
        pdt.forEach((pdt) => {
            total_qty += pdt.qty;
        })

        setcountqty(total_qty)
    }



    

    return ( 
        <>

<section class="content">
    <div class="body_scroll">
         <center>
                    <h4>Add details To Get Rewards </h4>
                    </center>   <br/>

                    <div class="body">
                            
                            <div class="row clearfix">
                            {   user === null 
                                ?
                                <>  
                               
                                        <div class="col-lg-8 col-md-6">
                                    <label>Email Address</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="zmdi zmdi-email"></i></span>
                                        </div>
                                        <input type="email" class="form-control email" id="email" placeholder="Ex: example@example.com"/>
                                    </div>
                                </div>
                                
                                <div class="col-sm-4 offset-sm-2">
                                        <button type="button" class="btn btn-raised btn-primary waves-effect"  onClick={verifyuser}>Check User</button>
                                    </div>
                                </>
                                :
                                <>
                               
                                <div class="col-lg-8 col-md-6">
                                    <label>Email Address</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="zmdi zmdi-email"></i></span>
                                        </div>
                                        <input type="email" class="form-control email" readOnly={user != null}  />
                                    </div>
                                </div>
                                
                               
                                <div class="col-lg-8 col-md-6">
                                    <label>Unique Id Product</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="zmdi zmdi-mall"></i></span>
                                        </div>
                                        <input type="number" id="puid" class="form-control mobile-phone-number"/>
                                    </div>
                                </div>
                                
                                <div class="col-sm-4 offset-sm-2">
                                        <button type="button" class="btn btn-raised btn-primary btn-round waves-effect" onClick={verifypdtid}>Check product</button>
                                    </div>
                                    {
                                        item.length > 0 && (
                                            <>
                                            <div class="col-lg-8 col-md-6">
                                                <label>Product Name</label>
                                                <div class="input-group masked-input mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="zmdi zmdi-smartphone"></i></span>
                                                </div>
                                                <input type="text" id="pname" readOnly class="form-control mobile-phone-number" value={item[0].p_name} />
                                                </div>
                                            </div>

                                            <div class="col-lg-8 col-md-6">
                                                <label>Reward Price </label>
                                                <div class="input-group masked-input mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="ti-gift"></i></span>
                                                </div>
                                                <input type="number" id="retprice" readOnly class="form-control money-dollar" value={item[0].p_ret_price} />
                                                </div>
                                            </div>
                                            </>
                                        )
                                    }
                                <div class="col-lg-8 col-md-6">
                                    <label>Available Quantity</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="zmdi zmdi-phone"></i></span>
                                        </div>
                                        <input type="number" readOnly class="form-control mobile-phone-number"  value={countqty}/>
                                    </div>
                                </div>
                               
                                <div class="col-lg-8 col-md-6">
                                    <label>Product Quantity</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="zmdi zmdi-phone"></i></span>
                                        </div>
                                        <input type="number"  class="form-control mobile-phone-number" placeholder="Enter the Value of Quantity that given by User Smaller than or equal to Availble Quantity " id="addqt" min='1'  max={countqty}/>
                                    </div>
                                    <div class="col-sm-8 offset-sm-2">
                                        <button type="button" class="btn btn-raised btn-primary btn-round waves-effect"  onClick={addqty}>add Quantity</button>
                                    </div>
                                </div>

                                <div class="col-lg-8 col-md-6">
                                    <label>sub reward</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="zmdi zmdi-phone"></i></span>
                                        </div>
                                        <input type="number" readOnly class="form-control mobile-phone-number" id="subrew" value={item[0].p_ret_price * totalreward}/>
                                    </div>
                                </div>

                                {/* <div class="col-lg-8 col-md-6">
                                    <label>Total Price (with quantity)</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="zmdi zmdi-money"></i></span>
                                        </div>
                                        <input type="number" readOnly class="form-control mobile-phone-number" value={totalprice}/>
                                    </div>
                                </div>
                                                        
                              
                                <div class="col-lg-8 col-md-6">
                                    <label>Used Reward</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="zmdi zmdi-money"></i></span>
                                        </div>
                                        <input type="text" readOnly class="form-control credit-card"/>
                                    </div>
                                </div>
                                
                                <div class="col-lg-8 col-md-6">
                                    <label>Available Reward</label>
                                    <div class="input-group masked-input mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="zmdi zmdi-key"></i></span>
                                        </div>
                                        <input type="text" readOnly class="form-control key"/>
                                    </div>
                                </div>
                        */}
                                <div class="col-sm-4 offset-sm-2">
                                        <button type="button" class="btn btn-raised btn-primary btn-round waves-effect" onClick={addalldata} >Add list</button>
                                    </div>

                                </>
                            }  

                        
                            </div>
                       </div>             
                </div>
</section>

        </>
    )
                }export default Reward