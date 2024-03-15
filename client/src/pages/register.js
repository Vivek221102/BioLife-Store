import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import Axios from "axios";

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [expression, setExpression] = useState('');
    const [userAnswer, setUserAnswer] = useState('');

    useEffect(() => {
        generateExpression();
    }, []);

    const generateExpression = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
        setExpression(`${num1} ${operator} ${num2}`);
    };

    const submitRegistration = (data) => {
        const [operand1, operator, operand2] = expression.split(' ');
        const correctAnswer = eval(`${operand1} ${operator} ${operand2}`);
        
        if (parseInt(userAnswer) === correctAnswer) {
            Axios.post("http://localhost:1121/api/registration", data)
                .then((response) => {
                    alert("Registration successful");
                    window.location = "/login";
                })
                .catch((error) => {
                    console.error("Error during registration:", error);
                    alert("Registration failed. Please try again later.");
                });
        } else {
            alert("Wrong CAPTCHA answer. Please try again.");
    
            generateExpression();
           
            setUserAnswer('');
        }
    };

    return (
        <>
            <br /><br />
            <div className="hero-section hero-background">
                <h1 className="page-title">Biolife Registration</h1>
            </div>
         
            <body>
    <div class="container">
        <div class="card">
            <div class="card-body" style={{marginTop: "10%"}}>
                <div class="row">
                    <div class="col-md-6">
                    <div class="card-1" >
                        
                    <img src=".\assets\images\signupfrom.png" style={{ width: "500px", height: "400px" }} />

                        </div>
                    </div>
                    <div class="col-md-6">
                    <div class="card-1"  style={{boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23",padding: "10px", borderRadius:"15px"}}>
                       
                            <div class="card-title">
                                <h2 style={{margin: "0px", textalign:"center"}}>Sign Up</h2>
                            </div><br/>
                         
                         <form onSubmit={handleSubmit(submitRegistration)}>
                            <div class="form-group">
                                <label class="form-label">First Name:</label>
                                <input type="text"  class="form-control"{...register("first_name", { required: "First name is mandatory." })} placeholder="Enter Your First Name" />
                                {errors.first_name && <span className="error">{errors.first_name.message}</span>}
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Last Name:</label>
                                <input type="text"  class="form-control" {...register("last_name", { required: "Last name is mandatory." })} placeholder="Enter Your Last Name" />
                                {errors.last_name && <span className="error">{errors.last_name.message}</span>}
                            </div>

                            <div class="form-group">
                                <label class="form-label">Mobile:</label>
                                <input  class="form-control"placeholder="Enter Your Mobile Number"
                                type="tel"
                                {...register("mobile", {
                                    required: "Mobile number is mandatory.",
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message: "Mobile number must start with 6, 7, 8, or 9 and be exactly 10 digits long."
                                    }
                                })}
                            />
                            {errors.mobile && <span className="error">{errors.mobile.message}</span>}
                            </div>

                            <div class="form-group">
                                <label class="form-label">Email:</label>
                                <input type="email" class="form-control" {...register("mail_id", { required: "Email is mandatory." })} placeholder="Enter Your Email Id"/>
                            {errors.mail_id && <span className="error">{errors.mail_id.message}</span>}
                            </div>

                            <div class="form-group">
                                <label class="form-label">Password:</label>
                                <input  type="password" class="form-control" placeholder="Enter Your Password"
                               
                                {...register("password", {
                                    required: "Password is mandatory.",
                                    pattern: {
                                        value: /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
                                        message: "Password must contain at least one special character, one digit, one letter, and be at least 8 characters long."
                                    }
                                })}/>
                                {errors.password && <span className="error">{errors.password.message}</span>}
                           </div>
                           
                           <div class="form-group">
                                <label class="form-label">Address:</label>
                                <textarea  class="form-control"{...register("address", { required: "Address is mandatory." })} placeholder="Enter Your Address here." className="col-lg-12"/>
                               
                            </div>{errors.address && <span className="error">{errors.address.message}</span>}   
                            <div class="form-group">
                                <label class="form-label">Captcha:</label>
                                <div style={{backgroundColor:"#4F517D",color:"white",padding:"10px",borderRadius:"10px",width:"220px"}}>{expression}</div><br/>
                                <input
                                type="text" class="form-control"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                            />
                            </div>
                             <div class="btn-div">
                                <button   class="btn btn-primary btn-bold" ty>Sign Up</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
{/* <h1 style={{ color: "#98BF64", fontSize: "xxx-large", fontFamily: "cursive" }}><b>Sign Up</b></h1>
<div id="main-content" className="main-content">
    <div className="container" style={{ display: "flex" }}>
        <div className="row" style={{ fontFamily: "cursive" }}>
            <div className="col-lg-8" style={{ width: "566px" }}>
                <div className="signin-container">
                    <form onSubmit={handleSubmit(submitRegistration)}>
                        <div style={{ display: "flex", gap: "58px" }}>
                            <p className="form-row">
                                <label>First Name:<span className="requite">*</span></label>
                                <input type="text" {...register("first_name", { required: "First name is mandatory." })} placeholder="Enter Your First Name" />
                                {errors.first_name && <span className="error">{errors.first_name.message}</span>}
                            </p>
                            <p className="form-row">
                                <label htmlFor="last_name">Last Name:<span className="requite">*</span></label>
                                <input type="text" {...register("last_name", { required: "Last name is mandatory." })} placeholder="Enter Your Last Name" />
                                {errors.last_name && <span className="error">{errors.last_name.message}</span>}
                            </p>
                        </div>
                        <p className="form-row">
                            <label htmlFor="mobile">Mobile:<span className="requite">*</span></label>
                            <input placeholder="Enter Your Mobile Number"
                                type="tel"
                                {...register("mobile", {
                                    required: "Mobile number is mandatory.",
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message: "Mobile number must start with 6, 7, 8, or 9 and be exactly 10 digits long."
                                    }
                                })}
                            />
                            {errors.mobile && <span className="error">{errors.mobile.message}</span>}
                        </p>
                        <p className="form-row">
                            <label htmlFor="mail_id">Email:<span className="requite">*</span></label>
                            <input type="email" {...register("mail_id", { required: "Email is mandatory." })} placeholder="Enter Your EmailId"/>
                            {errors.mail_id && <span className="error">{errors.mail_id.message}</span>}
                        </p>
                        <p className="form-row">
                            <label htmlFor="password">Password:<span className="requite">*</span></label>
                            <input placeholder="Enter Your Password"
                                type="password"
                                {...register("password", {
                                    required: "Password is mandatory.",
                                    pattern: {
                                        value: /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
                                        message: "Password must contain at least one special character, one digit, one letter, and be at least 8 characters long."
                                    }
                                })}
                            />
                            {errors.password && <span className="error">{errors.password.message}</span>}
                        </p>
                        <p className="form-row">
                            <label htmlFor="address">Address:<span className="requite">*</span></label>
                            <textarea {...register("address", { required: "Address is mandatory." })} placeholder="Enter Your Address here." className="col-lg-12"></textarea>
                            {errors.address && <span className="error">{errors.address.message}</span>}
                        </p>
                        <br/><br/><br/><br/>
                        <p className="form-row">
                            <label htmlFor="captcha">Captcha:<span className="requite">*</span></label>
                            <div style={{backgroundColor:"#4F517D",color:"white",padding:"10px",borderRadius:"10px",width:"220px"}}>{expression}</div><br/>
                            <input
                                type="text"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                            />
                        </p>
                        <br />
                        <p className="form-row wrap-btn">
                            <button className="btn btn-submit btn-bold" type="submit">Sign Up</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>  */}
            <br /> <br /> <br /> <br />
        </>
    );
}

export default Register;
