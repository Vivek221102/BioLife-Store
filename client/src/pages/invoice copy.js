import React from "react";
import { useState, useEffect, useRef  } from "react";
import { Link, useLocation } from 'react-router-dom';
import Axios from "axios";
// import domtoimage from 'dom-to-image';
import { useReactToPrint } from 'react-to-print'; 
function Invoice(){

	let user = JSON.parse( sessionStorage.getItem("user_data"));
    var uid = user.id;	    
    const location= useLocation();
	const oid=location.state.oid;

	const [list, setlist]= useState(['']);
	const [orderid, setorderid] = useState([''])
	const [time,settime]= useState([''])
	useEffect(()=>{
	   
		Axios.get("http://localhost:1121/api/getdatainvoice",{params:{uid:uid,oid:oid}}).then((Response)=>{
			setlist(Response.data);
			setorderid(Response.data[0].book_id );
			settime(Response.data[0].when_oredered);
		})
	},[])
	
	const [totalprice, settotalprice] = useState(0)
	
function updatetotalprice(cartItems) {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.p_price * item.qty;
    });
    settotalprice(total);
  }

useEffect(() => {

    Axios.get("http://localhost:1121/api/getdatainvoice", {params:{uid:uid,oid:oid}}).then((response) => {
      updatetotalprice(response.data);
	 
    });
  }, []);



const addtotal=()=>{
    console.log("Total price updated:", totalprice);
}

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


//   const generatePDF = () => {
// 	// const oid=location.state.oid;
//     var d = new Date().toLocaleString();	
//     const pdf = new jsPDF('l', 'in', [12, 14]);
//     const source = document.getElementById("invo");

//     if (pdf && source) {
//         domtoimage.toPng(source)
//             .then(imgData => {
//                 if (imgData) {
//                     pdf.addImage(imgData, 'PNG', 1, 1);
//                     pdf.save(d + ".pdf");
//                 } else {
//                     console.error("Error: No image data received from dom-to-image.");
//                 }
//             })
//     } else {
//         console.error("Error: PDF or source element not found.");
//     }
// };

// const AnotherExample = () => {
// 	const contentToPrint = useRef(null);
// 	const handlePrint = useReactToPrint({
// 	  documentTitle: "Print This Document",
// 	  onBeforePrint: () => console.log("before printing..."),
// 	  onAfterPrint: () => console.log("after printing..."),
// 	  removeAfterPrint: true,
// 	});


    return(
        <>
        
        <br/>   <br/>   <br/>   <br/>   <br/>

		
		<div id="invo" className="invoice-box"   >
			<table cellpadding="0" cellspacing="0">
				<tr class="top">
					<td colspan="3">
						<table>
							<tr>
								<td class="title"  >
								<img src="assets/images/logo-01/logo-biolife-5.png" alt="biolife logo" style={{width:"180px", height:"60	px"}} />
								</td>
		

								<td>
								
									Order Id: {orderid}<br />
									Ordered Date: {formatDate(time)}
									{/* Ordered Date: {`${day}/${month}/${year}`} */}
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="3">
						<table>
							<tr>
								<td style={{textAlign:"left"}}>
									Biolife, store<br />
									koyli	<br />
									Vadodara,Gujarat.391330</td>
								
								<td style={{textAlign:"left"}}>
								Name   :	{user.name} {user.lname}<br />
								Email  :	{user.email}<br/>
								Mobile :	{user.mobile}<br/>
								Address:	{user.add}
								</td>
							</tr>
						</table>
					</td>
				</tr>


				<tr class="heading">
					<td>Item</td>
					<td>Quantity</td>
					<td style={{width: "182px"}}>Price</td>
				</tr>
{list.map((val)=>{
	return(
		<>
				<tr class="item" >
					<td style={{textAlign:"left"}}>{val.p_name}</td>
					<td>{val.qty}</td>
					<td><span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span> {val.p_price * val.qty}</td>
				</tr>
		</>
	)
})

}
				<tr class="total">
					<td colspan="2"><b>Total:</b></td>
					
					<td className="stt-price" onChange={addtotal} style={{textAlign:"center"}}><span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span>  {totalprice}
                        </td>   
				</tr>
			</table>
		</div>
		<br/>

		{/* <Link class="btn btn-bold" onClick={() => {
        handlePrint(null, () => contentToPrint.current);
      }}>Download</Link> */}

<br/><br/><br/> 	
        </>
    )	
}

export default Invoice;