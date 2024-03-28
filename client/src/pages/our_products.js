import React from "react"
import Axios from 'axios'
import {useEffect ,useState} from 'react';
import { Link } from "react-router-dom";
// import Container from '@mui/material/Container'
// import TextField from '@mui/material/TextField'
// import Button from '@mui/material/Button'


function Our_products(){
    const [list, setList] = useState([]);
    const [cat, setCat] = useState([]);
    const [order, setOrder] = useState([]);
    
   

    useEffect(() => {
        // Fetch product list
        Axios.get("http://localhost:1121/api/productlist")
            .then((response) => {
                setList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching product list:", error);
            });
    
        // Fetch product categories
        Axios.get("http://localhost:1121/api/productcat")
            .then((response) => {
                setCat(response.data);
            })
            .catch((error) => {
                console.error("Error fetching product categories:", error);
            });
    
        const userData = sessionStorage.getItem("user_data");
        if (userData) {
            const user = JSON.parse(userData);
            const uid = user.id;
    
            // Fetch ordered products if user is logged in
            Axios.get("http://localhost:1121/api/orederdpdts", { params: { uid: uid } })
                .then((response) => {
                    // alert(response.data[0].when_oredered)
                    setOrder(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching ordered products:", error);
                });
        }
    }, []);



const drop =(id)=>{
    // alert(id)
 Axios.get("http://localhost:1121/api/fetchid", {params:{id:id}}).then((Response)=>{
    setList(Response.data);
    setOrder(Response.data);
 })

}

const formatDate = (dateString) => {
    if (!dateString) return ''; // Return blank space if dateString is falsy (null, undefined, etc.)
    
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const [searchItem, setSearchItem] = useState('');
const [searchResults, setSearchResults] = useState([]);

const handleChange = (e) => {
    setSearchItem(e.target.value);
};

// const fetchData = () => {
//     // const searchTerm = encodeURIComponent(searchItem);
//     let url;
//     if (searchItem) {
//         const searchTerm = encodeURIComponent(searchItem); // Encode the search term
//         url = `http://localhost:1121/api/productsearch?searchTerm=${searchTerm}`;
//     } else {
//         url = `http://localhost:1121/api/productsearch`;
//     }

//     Axios.get(`http://localhost:1121/api/productsearch`,{params: {searchTerm:searchTerm}})
//         .then((response) => {
//             setSearchResults(response.data);
//         })
//         .catch((error) => {
//             console.error('Error fetching data:', error);
//         });
// };

const fetchData = () => {
    let url;
    if (searchItem) {
        const searchTerm = encodeURIComponent(searchItem); // Encode the search term
        url = `http://localhost:1121/api/productsearch?searchTerm=${searchTerm}`;
    } else {
        url = `http://localhost:1121/api/productsearch`;
    }
    
    Axios.get(url)
        .then((response) => {
            setList(response.data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
};

    return(
        <>

<br/>
        <br/>
                <div class="hero-section hero-background">
        <h1 class="page-title">Products</h1>
    </div>

    <br/>
<br/>

        <div class="page-contain category-page no-sidebar">
        <div class="container">
            <div class="row">

            <div class="product-category list-style"  >
            <div id="top-functions-area" class="top-functions-area" >
            <div class="flt-item to-left group-on-mobile">
                                {/* <span class="flt-title">Refine</span> */}
                               
                                {/* <div class="wrap-selectors">
                                    <form action="#" name="frm-refine" method="get">
                                        <span class="title-for-mobile">Refine Products By</span>
                                        <div data-title="Price:" class="selector-item">
                                            <select name="price" class="selector" style={{border: "2px solid #e6e6e6", color:"gray", fontFamily: "'Cairo', sans-serif",borderRadius: "9999px" ,padding:"0 30px 0 20p"}}>
                                                <option value="all">Price</option>
                                                <option value="class-1st">Less than 5$</option>
                                                <option value="class-2nd">$5-10$</option>
                                                <option value="class-3rd">$10-20$</option>
                                                <option value="class-4th">$20-45$</option>
                                                <option value="class-5th">$45-100$</option>
                                                <option value="class-6th">$100-150$</option>
                                                <option value="class-7th">More than 150$</option>
                                            </select>
                                        </div>   
                                    </form>
                                    
                                {/* </div> */}
                               

                                {/* <Button variant="text" color="primary">   
                                </Button> */}
                                </div>
                                <div class="wrap-selectors">
                                <input type="search" class="dsktp-open-searchbox" aria-label="search" placeholder="Search something" id="search" value={searchItem} onChange={handleChange} style={{ borderRadius:"10px",padding:"10px",width:"285px"}}/>
                             <vr/>  <button type="button" style={{ backgroundColor: 'rgb(144, 191, 42)', color: 'white', height: '35px',width:"80px",borderRadius:"10px",padding:"5px" }} onClick={fetchData}>
                                <i class="fa fa-search"></i> Find
                                </button>

                                <div>
                                {searchResults.map((result, index) => (
                                <div key={index}>{result.p_name}</div>
                                ))}
                                </div>  
                               
       
                            {/* <Container maxWidth="lg">
                              <TextField
                                id="outlined-basic"
                                label="search"
                                variant="outlined"
                                fullWidth
                                
                              />
                            </Container> */} 

                            </div>

                           
                                    <div class="flt-item to-right">
                                <span class="flt-title">Categories</span>
                                <div class="wrap-selectors">
                                    <div class="selector-item orderby-selector">
                                    {/* onChange={(e)=>{seletedoptval(e.target.value)}} */}
                                        <select name="orderby" class="orderby" aria-label="Shop order" onChange={(e)=>{drop(e.target.value)}} style={{border: "2px solid #e6e6e6", color:"gray", fontFamily: "'Cairo', sans-serif",borderRadius: "9999px" ,padding:"0 30px 0 20p"}}>
                                        { cat.map((val,index)=>{
                                            return(

                                          
                               
                                            <option key={index} value={val.id}>{val.cat_name}</option>
                                            )
                                
                            })}
                                           
                                        </select>
                                       
                                    </div>
                                    </div></div><br/>
                                  

                            
                            </div></div>



                <div id="main-content" class="main-content col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="product-category grid-style">
                       <div class="row">
                            <ul class="products-list">

                       

           
                  { sessionStorage.getItem("user_data") == null ?
                                                
                         <>

                         { list.map((val)=>{
                        return(
                            <>
                            <li class="product-item col-lg-3 col-md-3 col-sm-4 col-xs-6">
                                <Link to="/login" style={{textDecoration:"none"}}>

                                  <div class="contain-product layout-default">
                                      <div class="product-thumb">
                                          <Link to="/login" class="link-to-product">
                                              <img src={"http://localhost:1121/public/" +val.p_img } alt="img" style={{width:"270px", height:"270px"  }}  class="product-thumnail"/>
                                          </Link>
                                      </div>
                                      <div class="info">
                                         
                                          <h4 class="product-title"><Link to="/login"  class="pr-name" style={{textDecoration:"none"}}>{val.p_name}</Link></h4>
                                          <div class="price">
                                              <ins><span class="price-amount"><span class="currencySymbol"><i class="fa fa-inr" aria-hidden="true"></i></span> {val.p_price}</span></ins>
                                              {/* <del><span class="price-amount"><span class="currencySymbol">£</span>95.00</span></del> */}
                                          </div>
                                          <div class="shipping-info">
                                                    <p class="shipping-day">Reward</p>
                                                    <p class="for-today" ><i class="fa fa-inr" aria-hidden="true"></i> {val.p_ret_price}</p>
                                          </div>
                                          <div class="slide-down-box">
                                              <p class="message">{val.p_desc}</p>
                                              <div class="buttons">
                                                                       

                                                <Link to="/login" class="btn wishlist-btn"><i class="fa fa-heart" aria-hidden="true"></i></Link>
                                                <Link to="/login" class="btn add-to-cart-btn"><i class="fa fa-cart-arrow-down" aria-hidden="true"></i>View Product</Link>
                                               <Link to="/login" class="btn compare-btn"><i class="fa fa-random" aria-hidden="true"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </Link>
                                    </li> 
                                    
                                    </>
                                )
                            })
                     }                           
                             </>
                            :
                              <>

                              {list.map((val, index) => (
                                    
                                <li key={val.p_id}  class="product-item col-lg-3 col-md-3 col-sm-4 col-xs-6">
                                    
                                    <div class="contain-product layout-default" style={{textDecoration:"none"}}>
                                    <Link to="/singleproduct" state={{ prid: val.p_id }}>
                                            <div class="product-thumb">
                                                <img src={"http://localhost:1121/public/" + val.p_img} alt="img" style={{ width: "270px", height: "270px" }} class="product-thumnail" />
                                            </div>
                                            </Link>    
                                            <div class="info">
                                            <h4 class="product-title"><Link to="/singleproduct" state={{ prid: val.p_id }} style={{textDecoration:"none"}} class="pr-name">{val.p_name}</Link></h4>
                                            

                                                {/* <br/><p class="message"><b>Last Purchased: </b>{formatDate(val.when_oredered)}</p> */}
                                                <div class="price">
                                                    <ins><span class="price-amount"><span class="currencySymbol"><i class="fa fa-inr" aria-hidden="true"></i></span> {val.p_price}</span></ins>
                                                </div>
                                                <div class="shipping-info">
                                                    <p class="shipping-day">Reward</p>
                                                    <p class="for-today"><i class="fa fa-inr" aria-hidden="true"></i> {val.p_ret_price}</p>
                                                </div>
                                                <div class="slide-down-box">
                                                <p class="message">{val.p_desc}</p>
                                              <div class="buttons">
                                                                       

                                                <Link to="/" class="btn wishlist-btn"><i class="fa fa-heart" aria-hidden="true"></i></Link>
                                                <Link to="/singleproduct" state={{ prid: val.p_id }} class="btn add-to-cart-btn"><i class="fa fa-cart-arrow-down" aria-hidden="true"></i>View Product</Link>
                                               <Link to="/" class="btn compare-btn"><i class="fa fa-random" aria-hidden="true"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                    </li> 
        ))}
  
 
                      </>
                    }
           

                            </ul>
                        </div>

                        <div class="biolife-panigations-block">
                            <ul class="panigation-contain">
                                <li><span class="current-page">1</span></li>
                                <li><Link to="#" class="link-page">2</Link></li>
                                <li><Link to="#" class="link-page next"><i class="fa fa-angle-right" aria-hidden="true"></i></Link></li>
                            </ul>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>     
             
         </>
    )
}export default Our_products