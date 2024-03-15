import React, { useRef } from 'react';
import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import Axios from "axios";
import { useReactToPrint } from 'react-to-print';
import './invoice.css';  

function Invoice() {
    let user = JSON.parse(sessionStorage.getItem("user_data"));
    var uid = user.id;

    const location = useLocation();
    const oid = location.state.oid;

    const [list, setList] = useState([]);
    const [orderId, setOrderId] = useState('');
    const [time, setTime] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        Axios.get("http://localhost:1121/api/getdatainvoice", { params: { uid: uid, oid: oid } })
            .then((Response) => {
                setList(Response.data);
                setOrderId(Response.data[0].book_id);
                setTime(Response.data[0].when_oredered);
                updateTotalPrice(Response.data);
            })
            .catch(error => console.error("Error fetching data: ", error));
    }, []);

    function updateTotalPrice(cartItems) {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.p_price * item.qty;
        });
        setTotalPrice(total);
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => contentToPrint.current,
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

    const addTotal = () => {
        console.log("Total price updated:", totalPrice);
    }

    return (
        <>
            <br /> <br /> <br /> <br /> <br />
            <div id="invo" className="invoice-box" ref={contentToPrint}>
                <table cellPadding="0" cellSpacing="0">
                    <tr className="top">
                        <td colSpan="3">
                            <table>
                                <tr>
                                    <td className="title">
                                        <img src="assets/images/logo-01/logo-biolife-5.png" alt="biolife logo" style={{ width: "180px", height: "60px" }} />
                                    </td>
                                    <td>
                                        Order Id: {orderId}<br />
                                        Ordered Date: {formatDate(time)}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr className="information">
                        <td colSpan="3">
                            <table>
                                <tr>
                                    <td style={{ textAlign: "left" }}>
                                        Biolife, store<br />
                                        koyli<br />
                                        Vadodara, Gujarat.391330
                                    </td>
                                    <td style={{ textAlign: "left" }}>
                                        Name   : {user.name} {user.lname}<br />
                                        Email  : {user.email}<br />
                                        Mobile : {user.mobile}<br />
                                        Address: {user.add}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr className="heading">
                        <td>Item</td>
                        <td>Quantity</td>
                        <td style={{ width: "182px" }}>Price</td>
                    </tr>
                    {list.map((val, index) => (
                        <tr className="item" key={index}>
                            <td style={{ textAlign: "left" }}>{val.p_name}</td>
                            <td>{val.qty}</td>
                            <td><span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span> {val.p_price * val.qty}</td>
                        </tr>
                    ))}
                    <tr className="total">
                        <td colSpan="2"><b>Total:</b></td>
                        <td className="stt-price" style={{ textAlign: "center" }}>
                            <span className="currencySymbol"><i className="fa fa-inr" aria-hidden="true"></i></span> {totalPrice}
                        </td>
                    </tr>
                </table>
            </div>
            <br />
            <button className="btn btn-bold" onClick={handlePrint}>Download</button>
            <br /><br /><br />
        </>
    )
}

export default Invoice;
