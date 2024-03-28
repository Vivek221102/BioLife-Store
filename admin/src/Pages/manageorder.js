import React, { useState ,useEffect} from 'react';
import Axios from 'axios'

function Manageorder(){
const [list, setlist] = useState(['']);
useEffect(()=>{

    Axios.get("http://localhost:1121/api/fetchordervals").then((response)=>{
        setlist(response.data);
    })

},[])
const [bid, setbid] = useState(null)
const [order, setorderdetail] = useState(['']);
const fetchord=(bid)=>{
        // setbid(bid);
            Axios.get("http://localhost:1121/api/fetchorderdetails",{params:{id: bid}})
            .then((response)=>{
                setorderdetail(response.data);
            })
            .catch(error => {
                // Log the error for debugging
                console.error('Error:', error);
              })
}

const acceptord=()=>{
// alert(bid)
Axios.post("http://localhost:1121/api/approveoid",{bid: bid})
.then((response)=>{
    alert("order Approved.")
})
.catch(error => {
    // Log the error for debugging
    console.error('Error:', error);
  })
}

const rejectord=()=>{
// alert(bid)
Axios.post("http://localhost:1121/api/rejectoid",{bid: bid})
.then((response)=>{
    alert("order rejected.")
})
.catch(error => {
    // Log the error for debugging
    console.error('Error:', error);
  })
}

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };



    return(
    <>
        <section class="content">
    <div class="body_scroll">
        <div class="block-header">
            <div class="row">
                <div class="col-lg-7 col-md-6 col-sm-12">
                    <h2>Order's Details</h2>
                    
                    <button class="btn btn-primary btn-icon mobile_menu" type="button"><i class="zmdi zmdi-sort-amount-desc"></i></button>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-12">                
                    <button class="btn btn-primary btn-icon float-right right_icon_toggle_btn" type="button"><i class="zmdi zmdi-arrow-right"></i></button>                                
                </div>
            </div>
        </div>

        <div class="container-fluid">
            
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="card">
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-striped m-b-0">
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Oreder ID</th>
                                            <th data-breakpoints="xs">Date</th>
                                            {/* <th data-breakpoints="xs">Quantity</th>
                                            <th data-breakpoints="xs">Total Price</th> */}
                                            <th>Action</th>
                                        </tr>
                                    </thead>


 { list.map((val,index)=>{
        return(
        <>
            <tbody>
                <tr>
                    <td><b>{index+1}.</b></td>
                    <td>{val.book_id}</td>
                    <td>{formatDate(val.when_oredered)}</td>
                    {/* <td><img src={"http://localhost:1121/public/" +val.p_img } alt="dd" style={{width:"67px", height:"150px"  }}  class="product-thumnail"/></td>  */}
                    {/* <td>{val.qty}</td>
                    <td>{val.prc}</td> */}
                    <td style={{width:"50px",height:"10px"}}><button  class="btn btn-primary btn-block" data-toggle="modal" data-target="#largeModal" onClick={()=>fetchord(val.book_id)}><i class="zmdi zmdi-eye"></i> </button></td> 
                </tr>
                                       
                                        
            </tbody>
                                    
            </>
                )
                    })
 }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<div class="modal fade" id="largeModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="title" id="largeModalLabel">Ordered Product Details</h4>
            </div>
            <div class="modal-body">
            <div class="body">
            <div class="container-fluid">
            
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="card">
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-striped m-b-0">
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Oreder ID</th>
                                            <th data-breakpoints="xs">Date</th>
                                            <th data-breakpoints="xs">Quantity</th>
                                            <th data-breakpoints="xs">Total Price</th>
                                            </tr>
                                    </thead>


 { order.map((val,index)=>{
        return(
        <>
            <tbody>
                <tr>
                    <td><b>{index+1}.</b></td>
                    <td>{val.book_id}</td>
                    <td>{formatDate(val.when_oredered)}</td>
                    {/* <td><img src={"http://localhost:1121/public/" +val.p_img } alt="dd" style={{width:"67px", height:"150px"  }}  class="product-thumnail"/></td>  */}
                    <td>{val.qty}</td>
                    <td>Rs. {val.prc}</td>
                </tr>
                                       
                                        
            </tbody>
                                    
            </>
                )
                    })
 }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </div>            
             </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal" style={{backgroundColor:"green"}} onClick={(e)=>acceptord(bid)}>Approve Order</button>
                <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal" onClick={(e)=>rejectord(bid)}>Reject Order</button>
            </div>
        </div>
    </div>
</div>
    </>
    )
}export default Manageorder