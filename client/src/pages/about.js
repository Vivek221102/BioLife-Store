import React from "react";
function About(){
    return(
        <>

<div id="main-content" class="main-content">

<div class="welcome-us-block">
    <div class="container">
        <h4 class="title"><br/><br/>Welcome to Biolife store!</h4>
        <div class="text-wraper">
            <p class="text-info">Welcome to the forefront of positive change! At the Reward-Based Plastic Recycling Store, we are more than just an e-commerce platform; we are catalysts for environmental consciousness. Our mission is to revolutionize the way we perceive and manage plastic waste generated through online shopping. Committed to fostering a circular economy, our platform not only offers a seamless shopping experience but also rewards users for responsible disposal and recycling. We believe in the power of technology to drive sustainable practices, and through innovation and collaboration, we are on a journey to make every purchase contribute to a cleaner, greener planet. Join us in this environmental revolution, where every click, every purchase, and every reward earned makes a tangible impact on our world.</p>
            <p class="qt-text">“There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.”</p>
        </div>
    </div>
</div>

<div class="why-choose-us-block">
    <div class="container">
        <h4 class="box-title">Why Choose us</h4>
        <b class="subtitle">Natural food is taken from the world's most modern farms with strict safety cycles</b>
        <div class="showcase">
            <div class="sc-child sc-left-position">
                <ul class="sc-list">
                    <li>
                        <div class="sc-element color-01">
                            <span class="biolife-icon icon-fresh-drink"></span>
                            <div class="txt-content">
                                <span class="number">01</span>
                                <b class="title">Always Fresh</b>
                                <p class="desc">Natural products are kept in the best condition to ensure always fresh</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="sc-element color-02">
                            <span class="biolife-icon icon-healthy-about"></span>
                            <div class="txt-content">
                                <span class="number">02</span>
                                <b class="title">Overall Healthy</b>
                                <p class="desc">Natural products are kept in the best condition to ensure always fresh</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="sc-element color-03">
                            <span class="biolife-icon icon-green-safety"></span>
                            <div class="txt-content">
                                <span class="number">03</span>
                                <b class="title">Encironmental Safety</b>
                                <p class="desc">Natural products are kept in the best condition to ensure always fresh</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="sc-child sc-center-position">
                <figure><img src="assets/images/about-us/bn04.jpg" alt="" width="622" height="656"/></figure>
            </div>
            <div class="sc-child sc-right-position">
                <ul class="sc-list">
                    <li>
                        <div class="sc-element color-04">
                            <span class="biolife-icon icon-capacity-about"></span>
                            <div class="txt-content">
                                <span class="number">04</span>
                                <b class="title">Antioxidant Capacity</b>
                                <p class="desc">Natural products are kept in the best condition to ensure always fresh</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="sc-element color-05">
                            <span class="biolife-icon icon-arteries-about"></span>
                            <div class="txt-content">
                                <span class="number">05</span>
                                <b class="title">Good For Arteries</b>
                                <p class="desc">Natural products are kept in the best condition to ensure always fresh</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="sc-element color-06">
                            <span class="biolife-icon icon-title"></span>
                            <div class="txt-content">
                                <span class="number">06</span>
                                <b class="title">Quality Standards</b>
                                <p class="desc">Natural products are kept in the best condition to ensure always fresh</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="testimonial-block">
    <div class="container">
        <h4 class="box-title">Testimonial</h4>
        <ul class="testimonial-list biolife-carousel" data-slick='{"arrows":false,"dots":true,"infinite":false,"speed":400,"slidesMargin":30,"slidesToShow":3, "responsive":[{"breakpoint":1200, "settings":{ "slidesToShow": 3}},{"breakpoint":992, "settings":{ "slidesToShow": 2}},{"breakpoint":768, "settings":{ "slidesToShow": 2}},{"breakpoint":500, "settings":{ "slidesToShow": 1}}]}'>
         
            <li>
                <div class="testml-elem">
                    <div class="avata">
                        <figure><img src="assets/images/about-us/author-02.jpg" alt="" style={{width:"160px",height:"180px",borderRadius:"250px",border:"5px solid gray"}}  /></figure>
                    </div>
                    <p class="desc"></p>
                    <b class="name">Mr. Vivek Parmar</b>
                    <b class="title">MERN Stack Developer</b>
                    <div class="rating"><p class="star-rating"><span class="width-90percent"></span></p></div>
                </div>
            </li>
        </ul>
    </div>
</div>
</div>
 </>

    )
}export default About