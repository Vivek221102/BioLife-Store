import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Container from "@mui/material/Container";

function Home() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const [list, setList] = useState([]);

  Axios.get("http://localhost:1121/api/productlist")
    .then((response) => {
      setList(response.data);
    })
    .catch((error) => {
      console.error("Error fetching product list:", error);
    });

  return (
    <>
      <br />
      <br />
      <br />
      <div className="banner-promotion">
        <div className="biolife-banner promotion5 biolife-banner__promotion5">
          <div className="banner-contain">
            <div className="media">
              <div
                className="text-content"
                style={{
                  right: "6%",
                  maxWidth: "600px",
                  padding: "25px",
                  backgroundColor: "#477890",
                  opacity: "0.8",
                  textAlign: "left",
                  borderRadius: "25px",
                }}
              >
                <b
                  className="text2"
                  style={{
                    fontSize: "xxx-large",
                    fontFamily: "sans-serif",
                    color: "white",
                  }}
                >
                  Biolife-Store
                </b>
                <span
                  className="text2"
                  style={{
                    fontSize: "x-large",
                    fontFamily: "serif",
                    color: "white",
                  }}
                >
                  Welcome To Bio-Life store for make <b>"chance"</b> to earn
                  amazing <b>Rewards</b> if you Buy Product By <b>OUR STORE</b>{" "}
                  and after using Return that waste Product to{" "}
                  <b>"Recycling"</b> it....{" "}
                </span>
                <p className="buttons" style={{ gap: "5px" }}>
                  <Link
                    to="/product"
                    className="btn btn-bold"
                    style={{ color: "white" }}
                  >
                    Shop Now!
                  </Link>
                
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Container maxWidth="xxl" style={{backgroundColor:"white"}}>
<h2 style={{backgroundColor:"#477890", padding:"15px", color:"white",opacity:"0.9"}}><center >Our Best Rated products</center></h2><br/>
          
           
                     <Carousel responsive={responsive}>
                     <div></div>

                    </Carousel>
           
</Container> */}

      <br />
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-sm-6  col-xs-12 sm-margin-top-63px xs-margin-top-40px">
            <div class="advance-product-box">
              <div class="biolife-title-box biolife-title-box__under-line">
                <h3 class="title">New Arrivals</h3>
              </div>
              <ul class="products-list vertical-layout products-list__vertical-layout">
                {list.map((val, index) => {
                  return (
                    <>
                      <li class="product-item">
                        <div class="contain-product contain-product__right-info-layout2 cate">
                          <div class="product-thumb">
                            <a href="#" class="link-to-product">
                              <img
                                src={
                                  "http://localhost:1121/public/" + val.p_img
                                }
                                alt="img"
                                width="100"
                                height="100"
                                class="product-thumnail"
                              />
                            </a>
                          </div>
                          <div class="info">
                            <div class="cat-info">
                              <a
                                class="cat-item"
                                style={{
                                  textDecoration: "none",
                                  fontSize: "17px",
                                }}
                              >
                                Fresh Fruit
                              </a>
                            </div>
                            <h4 class="product-title">
                              <Link
                                to=""
                                class="pr-name"
                                style={{ textDecoration: "none" }}
                              >
                                {val.p_name}
                              </Link>
                            </h4>
                            <div class="price ">
                              <ins>
                                <span class="price-amount">
                                  <i class="fa fa-inr" aria-hidden="true"></i>
                                  {val.p_price}
                                </span>
                              </ins>
                              <br />
                              <ins>
                                <span class="price-amount">
                                  Reward:{" "}
                                  <i class="fa fa-inr" aria-hidden="true"></i>
                                  {val.p_ret_price}
                                </span>
                              </ins>
                            </div>
                          </div>
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
          <div class="col-md-4 col-sm-12 col-xs-12 sm-margin-top-63px xs-margin-top-80px">
            <div class="advance-product-box"></div>
          </div>

          <div class="col-md-4 col-sm-6  col-xs-12 sm-margin-top-63px xs-margin-top-80px">
            <div class="advance-product-box">
              <div class="biolife-title-box biolife-title-box__under-line">
                <h3 class="title">Bestseller</h3>
              </div>
              <ul class="products-list vertical-layout products-list__vertical-layout">
                {list.map((val, index) => {
                  return (
                    <>
                      <li class="product-item">
                        <div class="contain-product contain-product__right-info-layout2 cate">
                          <div class="product-thumb">
                            <a href="#" class="link-to-product">
                              <img
                                src={
                                  "http://localhost:1121/public/" + val.p_img
                                }
                                alt="img"
                                width="100"
                                height="100"
                                class="product-thumnail"
                              />
                            </a>
                          </div>
                          <div class="info">
                            <div class="cat-info">
                              <a
                                class="cat-item"
                                style={{
                                  textDecoration: "none",
                                  fontSize: "17px",
                                }}
                              >
                                Fresh Fruit
                              </a>
                            </div>
                            <h4 class="product-title">
                              <Link
                                to=""
                                class="pr-name"
                                style={{ textDecoration: "none" }}
                              >
                                {val.p_name}
                              </Link>
                            </h4>
                            <div class="price ">
                              <ins>
                                <span class="price-amount">
                                  <i class="fa fa-inr" aria-hidden="true"></i>
                                  {val.p_price}
                                </span>
                              </ins>
                              <br />
                              <ins>
                                <span class="price-amount">
                                  Reward:{" "}
                                  <i class="fa fa-inr" aria-hidden="true"></i>
                                  {val.p_ret_price}
                                </span>
                              </ins>
                            </div>
                          </div>
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-posts background-fafafa sm-margin-top-33px sm-padding-top-75px sm-padding-bottom-80px xs-margin-top-30px xs-padding-top-30px xs-padding-bottom-50px">
        <div className="container">
          <div className="biolife-title-box biolife-title-box__bold-center">
            <i className="subtitle">The freshest and most exciting news</i>
            <h3 className="main-title">Our Latest Articles</h3>
          </div>
          <ul
            className="biolife-carousel nav-center xs-margin-top-34px nav-none-on-mobile"
            data-slick='{"rows":1,"arrows":true,"dots":false,"infinite":false,"speed":400,"slidesMargin":30,"slidesToShow":3, "responsive":[{"breakpoint":1200, "settings":{ "slidesToShow": 3}},{"breakpoint":992, "settings":{ "slidesToShow": 2}},{"breakpoint":768, "settings":{ "slidesToShow": 2}},{"breakpoint":600, "settings":{ "slidesToShow": 1}}]}'
          >
            <li>
              <div className="post-item effect-01 style-bottom-info layout-03">
                <div className="thumbnail">
                  <Link to="#" className="link-to-post">
                    <img
                      src="assets/images/our-blog/post-thumb-04.jpg"
                      width="370"
                      height="270"
                      alt=""
                    />
                  </Link>
                  <div className="post-date">
                    <span className="date">26</span>
                    <span className="month">dec</span>
                  </div>
                </div>
                <div className="post-content">
                  <h4 className="post-name">
                    <Link to="#" className="linktopost">
                      Ashwagandha: #1 Herb Anxiety?
                    </Link>
                  </h4>
                  <div className="post-meta">
                    <p className="post-meta__item author">
                      Posted By:{" "}
                      <Link to="#" className="link-to-author">
                        Mr.Braum
                      </Link>
                    </p>
                    <Link to="#" className="btn count-number liked">
                      <i className="biolife-icon icon-heart-1"></i>
                      <span className="number">20</span>
                    </Link>
                    <Link to="#" className="btn count-number commented">
                      <i className="biolife-icon icon-conversation"></i>
                      <span className="number">06</span>
                    </Link>
                  </div>
                  <p className="excerpt">
                    Did you know that red-staining foods are excellent
                    lymph-movers? In fact, many plants...
                  </p>
                  <div className="group-buttons">
                    <Link to="#" className="btn readmore">
                      continue reading
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="newsletter-block layout-03 sm-margin-top-39px xs-margin-top-90px">
        <div className="container">
          <div className="form-content">
            <h3 className="newslt-title">Sign up for our newsletter</h3>
            <p className="sub-title">
              and enjoy <b>25%</b> off your first purchase!
            </p>
            <form action="#" name="new-letter-foter" method="post">
              <input
                type="email"
                className="input-text email"
                value=""
                placeholder="Your email here..."
              />
              <button type="submit" className="bnt-submit" name="ok">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
      <Link className="btn-scroll-top">
        <i className="biolife-icon icon-left-arrow"></i>
      </Link>

  
    </>
  );
}
export default Home;
