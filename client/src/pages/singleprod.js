import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {useState, useEffect} from 'react'; 
import Axios from 'axios';
import { SocialIcon } from 'react-social-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Singleprod(){
    
    const location= useLocation();
    const id=location.state.prid;

    let user = JSON.parse( sessionStorage.getItem("user_data"));
    var uid = user.id;
 
    const [review, setreview] =   useState([]);
    const[list, setlist] = useState([''])
    const [pname,setPname] = useState(['']);

        useEffect(()=>{
            Axios.get("http://localhost:1121/api/singleprod",{params:{id:id}}).then((Response)=>{
                // alert(Response.data.p_id)    
                setPname(Response.data[0].p_name) 
            setlist(Response.data);
          
            })
        },[])
       
        // const [cart, setcart]= useState(['']);

        // useEffect(()=>{
        //     Axios.get("http://localhost:1121/api/fetchcart",{params:{uid:uid}}).then((Response)=>{
        //     // alert(Response.data.id)    
        //     setlist(Response.data);
        //     })
        // },[])



        const [pdtqty, setpdtqty] = useState(1);
        const deleteop = () => {
            if (parseInt(pdtqty) - 1 < 1) {
                alert("Quantity cannot be less than 1");
            } else {
                setpdtqty(pdtqty - 1);
            }
        }
           
        const addop = () => {
            if (parseInt(pdtqty) + 1 > 10) {
                alert("Quantity cannot be more than 10");
            } else {
                setpdtqty(pdtqty + 1);
            }
        }
        
        const notify = () => {
            toast.success('Added product in your cart Successfully 👍...!');
        }
        const warn = () => {
            toast.error('Product aready in your cart...!');
        }


        const addtocart = (p_id) => {
            Axios.post("http://localhost:1121/api/addcart", { uid: uid, p_id: p_id }).then((response) => {
                if (response.data.msg) {
                    warn();
                } else {
                    notifyAndRedirect();
                }
            });
        };
        
        const notifyAndRedirect = () => {
            notify();
            setTimeout(() => {
                window.location = "/product";
            }, 2000); // Redirect after 2 seconds (adjust the delay as needed)
        };
        
        
        const addwishlist=(p_id)=>{
            // alert(p_id)
            Axios.post("http://localhost:1121/api/addwish",{uid:uid,p_id:p_id}).then((Response)=>{
                if(Response.data.msg){
                    alert(Response.data.msg)
                }
                else{
                    alert("added product in your wishlist")
                   
                }
            })
        }

        const buyproduct=(pid,e)=>{                    
            e.preventDefault();
            // alert(pid)
            window.location="/payment"
        }

        
    const [activeTab, setActiveTab] = useState("tab_1st");

    const handleTabClick = (tabId, e) => {
        e.preventDefault();
        setActiveTab(tabId);
    };

    const[value, setvalue] = useState(null)
    const[star, setstar] = useState(0);
    // setstar(500)
    // alert(star);
    // setvalue(5);

    const starclick = (rate,e) => {
        e.preventDefault();
        setstar(rate);
    }


const sendreview=(e)=>{
    e.preventDefault();
// alert(id);
var name = document.getElementById('name').value;
var email = document.getElementById('email').value;
var review = document.getElementById('review').value;
// alert(star);
// alert(id)
// alert(name+" "+email + " " + review )
        Axios.post("http://localhost:1121/api/insertreview",{id:id, uid:uid, star:star, name:name, email:email, review:review}).then((response)=>{
            // console.log(response.data); 

            alert("your review successfully added 👍...");
            window.location = "/singleproduct";
            // singleproduct
            response.data(name ,email , id , review , star).then((res)=>console.log(res)); 
        })
}


useEffect(() => {
    Axios.get('http://localhost:1121/api/fatchreview', { params: { id: id, uid: uid } })
        .then(response => {
            if (response.status === 200) {
                const responseData = response.data;
                if (Array.isArray(responseData) && responseData.length > 0) {
                    setreview(responseData);
                    setvalue(responseData[0].rating);
                } else {
                    console.log("Empty or non-array response data.");
                }
            } else {
                alert("Error");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            // Handle error cases
        });
}, []);

   
    
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
  function shareOnWhatsApp(productLink) {
        const message = encodeURIComponent("Check out this product: " + "http://localhost:3000/singleproduct");
        const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }

const handleWhatsAppClick=(e)=>{
        e.preventDefault();
        shareOnWhatsApp("http://localhost:3000/singleproduct");
      }

      function redirectToInstagram() {
        window.open("https://instagram.com/your_profile", '_blank');
    }
      const handleInstagramClick = () => {
        redirectToInstagram();
    };


    const formatTime = (dateString) => {
        const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
        return new Date(dateString).toLocaleTimeString('en-US', options);
    };
    return(
        <>
        <br/><br/>
        <div class="hero-section hero-background">
        <h1 class="page-title">More Details of Product</h1>
    </div>

   
            <br/>
                <div class="page-contain single-product">
        <div class="container">

            <div id="main-content" class="main-content">
                
           
                <div class="sumary-product single-layout">
<br/>

                {   list.map((val,index)=>{
                    return(
                        <>
                        <div class="media">
                        <ul class="biolife-carousel slider-for" data-slick='{"arrows":false,"dots":false,"slidesMargin":30,"slidesToShow":1,"slidesToScroll":1,"fade":true,"asNavFor":".slider-nav"}'>
                            <li><img src={"http://localhost:1121/public/" +val.p_img} alt="" style={{width:"500px", height:"550px",borderRadius:"12px"}} /></li>
                           
                        </ul>
                        
                        {/* <ul class="biolife-carousel slider-nav" data-slick='{"arrows":false,"dots":false,"centerMode":false,"focusOnSelect":true,"slidesMargin":10,"slidesToShow":4,"slidesToScroll":1,"asNavFor":".slider-for"}'>
                            <li><img src="assets/images/details-product/thumb_01.jpg" alt="" width="88" height="88"/></li>
                           
                        </ul> */}
                    </div>
                    

                        <div class="product-attribute">
                       
                        <b><h3 style={{textAlign:"left"}}>Product Name: </h3></b> <p key={index} value={val.p_id} class="title" style={{color:"#98BF64", margin:"10px",fontSize:"x-large"}}>{val.p_name}</p><br/> 
                    
                        <div class="rating">
                       
    <p class="star-rating">
        <span className="" style={{ width: `${value* 20}%` }}></span>
        {/* <span className="" style={{ width: `${(5 - value) * 20}%` }}></span> */}
    </p>

                            <span class="review-count">(01 Reviews)</span>
                            <span class="qa-text"><Link to="/contect" >Q&A</Link></span><br/>
                            <b class="category" style={{display:"flex",gap:"10px"}}><b><h4>Categorised By: </h4></b> <h4 style={{color:"#98BF64"}}>{val.cat_name}</h4></b>
                        </div>
                        
                        <p class="excerpt"><b>Details of Product :</b> {val.p_desc}</p>
                        <div class="price">
                            <ins><span class="price-amount"><b>Total : </b> <i class="fa fa-inr" aria-hidden="true"></i> {val.p_price}</span></ins><br/>
                            <ins><span class="price-amount"><br/><b>Reward Points : </b><i class="fa fa-inr" aria-hidden="true"></i> {val.p_ret_price}</span></ins>
                        </div>
                        <div class="shipping-info">
                            <p class="shipping-day">2-Day Shipping</p>
                            <p class="for-today">Free Pickup Today</p>
                        </div>
                    </div>
                    <div class="action-form">
                        
                        <div class="total-price-contain">   
                            <span class="title">Total Price:</span>
                            <p class="price"><i class="fa fa-inr" aria-hidden="true"></i> {val.p_price * pdtqty}</p>
                        </div>
                        <br/>
                      
                        <div class="quantity-box">
                            <span class="title"><b>Quantity:</b></span>
                            <div class="qty-input">
                                <input type="text" name="qty" value={pdtqty}  state={{qty: pdtqty}} />
                                <Link to="/singleproduct" state={{ prid: val.p_id }} class="qty-btn btn-up" ><i class="fa fa-caret-up" aria-hidden="true" onClick={()=> addop()} ></i></Link>
                                <Link to="/singleproduct"  state={{ prid: val.p_id }} class="qty-btn btn-down"><i class="fa fa-caret-down" aria-hidden="true"  onClick={()=> deleteop()}></i></Link>
                            </div>
                        </div>

                        <div class="buttons">
                        <Link to="/payment" state={{ pid:id, productsub: val.p_price*pdtqty, productName: val.p_name, productPrice: val.p_price, productImage: val.p_img, productQuantity: pdtqty}} style={{width:"120px", color:"white"}} class="btn btn-submit btn-bold" onClick={(e)=>buyproduct(val.p_id,e)}>Buy now</Link>
                        </div>
                        <div class="buttons">
                        <button class="btn btn-submit btn-bold" state={{ p_id: val.p_id }} onClick={(e)=>addtocart(val.p_id)} style={{color:"white"}}>add to cart</button><ToastContainer position="bottom-center" autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
                        </div>
                        <div class="buttons">
                            <p class="pull-row">
                                <Link  class="btn wishlist-btn" state={{ p_id: val.p_id }} onClick={(e)=>addwishlist(val.p_id)}>wishlist</Link>
                            </p>
                        </div>
                        <div class="location-shipping-to">
                            <span class="title" >Ship to:</span>
                            <select name="shipping_to" class="country" style={{border: "2px solid #e6e6e6", color:"gray", fontFamily: "'Cairo', sans-serif",borderRadius: "9999px" ,padding:"0 30px 0 20p"}}>
                                <option value="-1" >Select Area Of Vadodara</option>
                                <option value="america">Alkapuri</option>
                                <option value="france">gorwa</option>
                                <option value="germany">gotri</option>
                                <option value="japan">chhani</option>
                            </select>
                        </div>
                        <div class="social-media">
                            <ul class="social-list">
                                <li><SocialIcon url="https://x.com" /></li>
                                {/* <li><Link to="#" class="social-link"><i class="fa fa-share-alt" aria-hidden="true"></i></Link></li> */}
                                <li onClick={(e)=>handleInstagramClick(e)}> <SocialIcon network="instagram" /></li>
                                <li onClick={(e)=>handleWhatsAppClick(e)}><SocialIcon network="whatsapp" /></li>
                            </ul>
                        </div>
                        <div class="acepted-payment-methods">
                            <ul class="payment-methods">
                                <li><img src="assets/images/card1.jpg" alt="" width="51" height="36"/></li>
                                <li><img src="assets/images/card2.jpg" alt="" width="51" height="36"/></li>
                                <li><img src="assets/images/card3.jpg" alt="" width="51" height="36"/></li>
                                <li><img src="assets/images/card4.jpg" alt="" width="51" height="36"/></li>
                            </ul>
                        </div>
                    </div>
              
                        </>
                    )
                })

                }
                   
              
                <div className="container">
                <div id="main-content" className="main-content">
                    <div className="product-tabs single-layout biolife-tab-contain">
                        <div className="tab-head">
                            <ul className="tabs" >
                                <li className={`tab-element ${activeTab === "tab_1st" ? "active" : "" }`}>
      <a href="#tab_1st" className="tab-link"  onClick={(e) => handleTabClick("tab_1st",e)}  style={{textDecoration:"none",color:""}}>  Products Descriptions </a>
                                </li>
<li className={`tab-element ${activeTab === "tab_2nd" ? "active" : ""}`}  >
{/* <a   href="#tab_2nd" className="tab-link"  onClick={(e) => handleTabClick("tab_2nd",e)} >
   Addtional information
     </a> */}
                                </li>
                                <li className={`tab-element ${activeTab === "tab_3rd" ? "active" : ""}`} >
                                    <a href="#tab_3rd"  className="tab-link"  onClick={(e) => handleTabClick("tab_3rd",e)} style={{textDecoration:"none",color:""}}>
                                        Shipping & Delivery
                                    </a>
                                </li>
                                <li className={`tab-element ${activeTab === "tab_4th" ? "active" : ""  }`}
                                >
                                    <a href="#tab_4th"   className="tab-link"  onClick={(e) => handleTabClick("tab_4th",e)} style={{textDecoration:"none"}} > Customer Reviews <sup>(3)</sup>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content">
                            <div id="tab_1st"  className={`tab-contain desc-tab ${activeTab === "tab_1st" ? "active" : "" }`}   >
                                <p className="desc">
                                    Quisque quis ipsum venenatis, fermentum ante volutpat, ornare
                                    enim. Phasellus molestie risus non aliquet cursus. Integer
                                    vestibulum mi lorem, id hendrerit ante lobortis non. Nunc ante
                                    ante, lobortis non pretium non, .
                                </p>
                            </div>
                            {/* <div
                                id="tab_2nd"   className={`tab-contain desc-tab ${activeTab === "tab_2nd" ? "active" : ""  }`}  >
                                <table class="tbl_attributes">
                                    <tbody>
                                        <tr>
                                            <th>Color</th>
                                            <td><p>Black, Blue, Purple, Red, Yellow</p></td>
                                        </tr>
                                        <tr>
                                            <th>Size</th>
                                            <td><p>S, M, L</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> */}
                            <div
                                id="tab_3rd"    className={`tab-contain desc-tab ${activeTab === "tab_3rd" ? "active" : ""  }`} >

                                <div class="accodition-tab biolife-accodition">
                                    <ul class="tabs">
                                        <li class="tab-item">
                                            <span class="title btn-expand">How long will it take to receive my order?</span>
                                            <div class="content">
                                                <p>Orders placed before 3pm eastern time will normally be processed and shipped by the following business day. For orders received after 3pm, they will generally be processed and shipped on the cted:</p>

                                            </div>
                                        </li>


                                    </ul>
                                </div>
                            </div>
                            <div  id="tab_4th"   className={`tab-contain desc-tab ${activeTab === "tab_4th" ? "active" : ""   }`}   >

                
                            {/* <div class="accodition-tab biolife-accodition">
                                <ul class="tabs">
                                    <li class="tab-item">
                                        <span class="title btn-expand">How long will it take to receive my order?</span>
                                        <div class="content">
                                            <p>Orders placed before 3pm eastern time will normally be processed and shipped by the following business day. For orders received after 3pm, they will generally be processed and shipped on the second business day. For example if you place your order after 3pm on Monday the order will ship on Wednesday. Business days do not include Saturday and Sunday and all Holidays. Please allow additional processing time if you order is placed on a weekend or holiday. Once an order is processed, speed of delivery will be determined as follows based on the shipping mode selected:</p>
                                            <div class="desc-expand">
                                                <span class="title">Shipping mode</span>
                                                <ul class="list">
                                                    <li>Standard (in transit 3-5 business days)</li>
                                                    <li>Priority (in transit 2-3 business days)</li>
                                                    <li>Express (in transit 1-2 business days)</li>
                                                    <li>Gift Card Orders are shipped via USPS First Class Mail. First Class mail will be delivered within 8 business days</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="tab-item">
                                        <span class="title btn-expand">How is the shipping cost calculated?</span>
                                        <div class="content">
                                            <p>You will pay a shipping rate based on the weight and size of the order. Large or heavy items may include an oversized handling fee. Total shipping fees are shown in your shopping cart. Please refer to the following shipping table:</p>
                                            <p>Note: Shipping weight calculated in cart may differ from weights listed on product pages due to size and actual weight of the item.</p>
                                        </div>
                                    </li>
                                    <li class="tab-item">
                                        <span class="title btn-expand">Why Didn’t My Order Qualify for FREE shipping?</span>
                                        <div class="content">
                                            <p>We do not deliver to P.O. boxes or military (APO, FPO, PSC) boxes. We deliver to all 50 states plus Puerto Rico. Certain items may be excluded for delivery to Puerto Rico. This will be indicated on the product page.</p>
                                        </div>
                                    </li>
                                    <li class="tab-item">
                                        <span class="title btn-expand">Shipping Restrictions?</span>
                                        <div class="content">
                                            <p>We do not deliver to P.O. boxes or military (APO, FPO, PSC) boxes. We deliver to all 50 states plus Puerto Rico. Certain items may be excluded for delivery to Puerto Rico. This will be indicated on the product page.</p>
                                        </div>
                                    </li>
                                    <li class="tab-item">
                                        <span class="title btn-expand">Undeliverable Packages?</span>
                                        <div class="content">
                                            <p>Occasionally packages are returned to us as undeliverable by the carrier. When the carrier returns an undeliverable package to us, we will cancel the order and refund the purchase price less the shipping charges. Here are a few reasons packages may be returned to us as undeliverable:</p>
                                        </div>
                                    </li>
                                </ul>
                            </div> */}

                                <div class="row">
                                    <div class="col-lg-5 col-md-5 col-sm-6 col-xs-12">
                                        <div class="rating-info">
                                            <p class="index"><strong class="rating">{value}</strong>out of 5</p>
                                            <div class="rating">
    <p class="star-rating">
        <span className="" style={{ width: `${value* 20}%` }}></span>
        {/* <span className="" style={{ width: `${(5 - value) * 20}%` }}></span> */}
    </p>
</div>
                                            <p class="see-all">See all 1 reviews</p>
                                            <ul class="options">
                                                <li>
                                                    <div class="detail-for">
                                                        <span class="option-name">5stars</span>
                                                        <span class="progres">
                                                            <span class="line-100percent"><span class="percent width-100percent"></span></span>
                                                        </span>
                                                        <span class="number">1</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="detail-for">
                                                        <span class="option-name">4stars</span>
                                                        <span class="progres">
                                                            <span class="line-100percent"><span class="percent width-0percent"></span></span>
                                                        </span>
                                                        <span class="number">0</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="detail-for">
                                                        <span class="option-name">3stars</span>
                                                        <span class="progres">
                                                            <span class="line-100percent"><span class="percent width-0percent"></span></span>
                                                        </span>
                                                        <span class="number">0</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="detail-for">
                                                        <span class="option-name">2stars</span>
                                                        <span class="progres">
                                                            <span class="line-100percent"><span class="percent width-0percent"></span></span>
                                                        </span>
                                                        <span class="number">0</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="detail-for">
                                                        <span class="option-name">1star</span>
                                                        <span class="progres">
                                                            <span class="line-100percent"><span class="percent width-0percent"></span></span>
                                                        </span>
                                                        <span class="number">0</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>


                                    <div class="col-lg-7 col-md-7 col-sm-6 col-xs-12">
                                        <div class="review-form-wrapper">
                                            <span class="title">Submit your review</span>
                                            <form action="#" name="frm-review" method="post">
                                                <div class="comment-form-rating">
                                                    <label>1. Your rating of this products:</label>
                                                    <p class="stars">
                                                        <span>

                                                            <Link class="btn-rating" data-value="star-1" to="#" onClick={(e)=>starclick("1",e)}><i class="fa fa-star-o" aria-hidden="true"></i></Link>
                                                            <Link class="btn-rating" data-value="star-2" to="#" onClick={(e)=>starclick("2",e)}><i class="fa fa-star-o" aria-hidden="true"></i></Link>
                                                            <Link class="btn-rating" data-value="star-3" to="#" onClick={(e)=>starclick("3",e)}><i class="fa fa-star-o" aria-hidden="true"></i></Link>
                                                            <Link class="btn-rating" data-value="star-4" to="#" onClick={(e)=>starclick("4",e)}><i class="fa fa-star-o" aria-hidden="true"></i></Link>
                                                            <Link class="btn-rating" data-value="star-5" to="#" onClick={(e)=>starclick("5",e)}><i class="fa fa-star-o" aria-hidden="true"></i></Link>
                                                              
                                                         </span>
                                                    </p>
                                                </div>
                                                <p class="form-row wide-half">
                                                    <input type="text" name="name" id="name" placeholder="Your name"/>
                                                </p>
                                                <p class="form-row wide-half">
                                                    <input type="email" name="email" id="email" placeholder="Email address"/>
                                                </p>
                                                <p class="form-row">
                                                    <textarea name="comment" id="review" cols="30" rows="10" placeholder="Write your review here..."></textarea>
                                                </p>
                                                <p class="form-row">
                                                    <button type="submit" name="submit" onClick={(e)=>sendreview(e)}>submit review</button>
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                 <div id="comments">
                                    <ol class="commentlist">
                                        <li class="review">
                                            <div class="comment-container">
                                            { review.map((val,index)=>{
                                                        return(
                                                            <>
                                                <div class="row">
                                                    <div class="comment-content col-lg-8 col-md-9 col-sm-8 col-xs-12">
                                                       
                                                      
                                                         <p class="comment-in"  style={{textAlign:"left"}}><span class="post-name"><i class="biolife-icon icon-login"></i> {val.user_name}</span><span class="post-date"> <b>Date:</b> {formatDate(val.Atsubmit)}<br/> <b>Time:</b> {formatTime(val.Atsubmit)}</span></p>
                                                        {/* <div class="rating" style={{textAlign:"left"}}><p class="star-rating"><span class="width-80percent"></span></p></div> */}
                                                       
                                                       
    {/* 
     <div class="rating" style={{ textAlign: "left" }}>
    <p class="star-rating">
        <span className="width-20percent" style={{ width: `${value * 20}%` }}></span>
        {[...Array(5 - value)].map((_, index) => (
            <span key={index-1} className="fa fa-star-o" style={{ width: '20%' }}></span>
        ))}
    </p>
</div> */}
<div class="rating" style={{ textAlign: "left" }}>
    <p class="star-rating">
        <span className="" style={{ width: `${value* 20}%` }}></span>
        {/* <span className="" style={{ width: `${(5 - value) * 20}%` }}></span> */}
    </p>
</div>



                                                        <p class="author" style={{textAlign:"left"}}>Product: <b>{pname}</b></p>
                                                       
                                                       
                                                        <p class="comment-text" style={{textAlign:"left"}}><b>{val.review_msg}</b></p>
                                                           
                                                        <p class="comment-text" style={{textAlign:"left"}}>{val.response}</p>
                                                    </div>
                                                    <div class="comment-review-form col-lg-3 col-lg-offset-1 col-md-3 col-sm-4 col-xs-12">
                                                        <span class="title">Was this review helpful?</span>
                                                        <ul class="actions">
                                                            <li><a href="#" class="btn-act like" data-type="like"><i class="fa fa-thumbs-up" aria-hidden="true"></i>Yes (100)</a></li>
                                                            <li><a href="#" class="btn-act hate" data-type="dislike"><i class="fa fa-thumbs-down" aria-hidden="true"></i>No (20)</a></li>
                                                            <li><a href="#" class="btn-act report" data-type="dislike"><i class="fa fa-flag" aria-hidden="true"></i>Report</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                </>
                                                        )
                                                       })
                                                       }
                                            </div>
                                        </li>
                                      
                                    </ol>
                                  
                                </div>

                            </div>
                        </div>
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
                    
                </div>

        </>
    )
}export default Singleprod;