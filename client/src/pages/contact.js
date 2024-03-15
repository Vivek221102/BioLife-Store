import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
function Contact(){
const submitcontact=(e)=>{
   
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var mes = document.getElementById("mes").value;

   
    Axios.post("http://localhost:1121/api/contact",{
        name:name,email:email,phone:phone,mes:mes
    }).then((Response)=>{
      
        alert("data send successfully...!");
        window.location="/"
    })
}

   
  
    return (
        <>
        <br/>
        <br/>
                <div class="hero-section hero-background">
        <h1 class="page-title">Contect Us</h1>
    </div>
<br/>
    <div class="page-contain contact-us">

        <div id="main-content" class="main-content">
            <div class="wrap-map biolife-wrap-map" id="map-block">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10770.5794834915!2d73.10986471601065!3d22.35859328336734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc9bec64fdecd%3A0x488fb90b410aeb7a!2sKoyali%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1707296682051!5m2!1sen!2sin" height="400"></iframe>
            </div>

            <div class="container">

                <div class="row">

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div class="contact-info-container sm-margin-top-27px xs-margin-bottom-60px xs-margin-top-60px">
                            <h4 class="box-title">Our Contact</h4>
                            {/* <p class="frst-desc">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p> */}
                            <ul class="addr-info">
                                <li>
                                    <div class="if-item">
                                        <b class="tie">Addess:</b>
                                        <p class="dsc"> koyali, Vadodara, Gujarat</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="if-item">
                                        <b class="tie">Phone:</b>
                                        <p class="dsc">+91 9313231486</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="if-item">
                                        <b class="tie">Email:</b>
                                        <p class="dsc">vsp22112002@gmail.com</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="if-item">
                                        <b class="tie">Store Open:</b>
                                        <p class="dsc">8am - 08pm, Mon - Sat</p>
                                    </div>
                                </li>
                            </ul>
                            <div class="biolife-social inline">
                                <ul class="socials">
                                    <li><Link to="#" title="facebook" class="socail-btn"><i class="fa fa-facebook" aria-hidden="true"></i></Link></li>
                                    <li><Link to="#" title="youtube" class="socail-btn"><i class="fa fa-youtube" aria-hidden="true"></i></Link></li>
                                    <li><Link to="#" title="instagram" class="socail-btn"><i class="fa fa-instagram" aria-hidden="true"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div class="contact-form-container sm-margin-top-112px">
                            <form action="#" name="frm-contact" >
                                <p class="form-row">
                                    <input type="text" id="name" name="name"  placeholder="Your Name" class="txt-input"/>
                                </p>
                                <p class="form-row">
                                    <input type="email" id="email" placeholder="Email Address" class="txt-input"/>
                                </p>
                                <p class="form-row">
                                    <input type="tel" id="phone"placeholder="Phone Number" class="txt-input"/>
                                </p>
                                <p class="form-row">
                                    <textarea name="mes" id="mes" cols="30" rows="9" placeholder="Leave Message"></textarea>
                                </p>
                                <p class="form-row">
                                    <button class="btn btn-submit" type="button" onClick={submitcontact}>send message</button>
                                </p>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
        </>
    )
}export default Contact