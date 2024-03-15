const mysql = require("mysql");
// import mysql from 'mysql';
var express= require("express");
var cors = require("cors");
var body_parser = require("body-parser");   
var multer = require("multer");
const path = require("path");
const { request } = require("http");
const nodemailer = require("nodemailer");

var jwt = require("jsonwebtoken"); 

var Jwtkey = "vivek";


var app = express();
app.use(cors());
app.use(express.json());
const port = 1121;
app.listen(port);

app.use("/public", express.static("public"));

const con = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"",
        database:"bio_store"
    }
)

// multer for file save in public folder
const storage = multer.diskStorage({
    destination:path.join(__dirname,'./public/'),
    filename: function(req, file, callback){
        callback(null,Date.now() + '-' + path.extname(file.originalname))
    }
})


function verifytoken(req, res, next) {

    let token = req.headers['authorization'];
    console.log(token);
    if(token){
        token = token.split(' ')[1];
        console.warn("middleware called", token);
        Jwt.verify(token, JwtKey, (err, valid)=>{
        if(err){
            console.log(" token is wrong" );
            res.status(401).send({result: "please provide valid token"});
        }
        })
    }else{

    }
    
    }


///////////// sending user's data from user side to database by server/////////

app.post("/api/registration",(req,res)=>{
    var first =req.body.first_name;
   
    var  last_name = req.body.last_name;
    var mobile = req.body.mobile;
    var mail = req.body.mail_id;
    var pass = req.body.password;
    var add = req.body.address;

    const ins = "insert into tbl_registration (first_name, last_name, mail_id, pass, mobile, address) values (?, ?, ?, ?, ?, ?)"
    con.query(ins,[first, last_name, mail, pass, mobile, add])
    res.send();
})


/////////   sending user's contact data from user side to database by server////////
app.post("/api/contact",(req, res)=>{
    var name= req.body.name;
   
    var email=req.body.email;
  
    var phone=req.body.phone;
  
    var mes=req.body.mes;


    const ins = "insert into contectus(user_name,email_id,ph_no,msg) values (?,?,?,?)"
    con.query(ins,[name, email, phone, mes]);
    res.send();
})

app.post("/api/loggingin",(req, res)=>{

    var email=req.body.mail;
    var password=req.body.pass;

    const sel= "select * from tbl_registration where mail_id=? and pass=? ";
    con.query(sel,[email, password],(err,result)=>{
      
        if(result.length > 0){
            jwt.sign({result},Jwtkey,{expiresIn:"2h"},(err,token)=>{
            console.log("Token is : ", token);
                if(!err){
                    ({result, auth:token}); 
                    const token1=token;
                    res.send({result,token1});
                }
                res.send({result:"something went wrong please try again"})
            })  
            
        }else{
            res.send({msg:"wrong id password"});
        }
        
    });
})



/////// in admin panel using post method add product detail on server to database. /////////
app.post("/api/itemdetails",(req, resp)=>{
    let upload = multer({storage:storage}).single('p_image');
    upload (req,resp,function(err){
        console.log(err);
        if(!req.file){
            console.log("Not found");
        }

        else{
             var i_name = req.body.i_name;
            var i_code = Math.floor(100000 + Math.random() * 900000);
            var i_category = req.body.i_category;
            var i_price = req.body.i_price;
            var ret_price = req.body.ret_price;
            var i_des =req.body.i_des; 
            var p_image=req.file.filename;

            // console.log(i_name)
            // console.log(p_image)
            const ins="Insert into tbl_productdetail(p_name, p_uni_code, p_category, p_img, p_price, p_ret_price, p_desc) values (?, ?, ?, ?, ?, ?, ?)";
            con.query(ins,[i_name, i_code, i_category, p_image, i_price, ret_price, i_des]);
            resp.json("");
        }
    })
});

app.post("/api/addcategory",(req, res)=>{
    var p_cat= req.body.c_name;
   
    var cat_des=req.body.cat_des;

    const ins = "insert into tbl_productcategory(cat_name, cat_desc) values (?,?)"
    con.query(ins,[p_cat, cat_des]);
    res.send();
})



//////////////admin login/////////
app.post("/api/loginadmin",(req, res)=>{
    var email=req.body.email;
    var pass=req.body.password;
   
    const sel= "select * from tbl_admin_login where email=? and pass=? ";
    con.query(sel,[email, pass],(err,result)=>{
      
        if(result.length > 0){
            res.send(result);
  
        }else{
            res.send({msg:"wrong id password"});
        }
        
    });
})


////////////////////////fetch value from db to front end////////////////////////


app.get("/api/userfetch",(req,res)=>{
    const sel = "select * from tbl_registration";
    
    con.query(sel,(err,result)=>{
      
        res.send(result);
    })
})

app.get("/api/itemfetch",(req,res)=>{
    const sel = "select * from tbl_productdetail";

    con.query(sel,(err,result)=>{

        res.send(result);
    })
})

app.get("/api/catfetch",(req,res)=>{
    const sel = "select * from tbl_productcategory";

    con.query(sel,(err,result)=>{
     
        res.send(result);
    })
})

app.get("/api/faqfetch",(req,res)=>{
    const sel = "select * from contectus";

    con.query(sel,(err,result)=>{
       
        res.send(result);
    })
})

app.get("/api/fetchordervals",(req,res)=>{
    const sel = "SELECT DISTINCT book_id,when_oredered FROM orderitem_tbl";
    con.query(sel,(err,result)=>{
        // console.log(result)
        res.send(result);
    })
})

///////admin side delete rows using model and popup
app.post("/api/deletecat",(req,res)=>{
   
    var id = req.body.id;
    // console.log(id);
    const del = "delete from tbl_productcategory where id= ?";
    con.query(del,[id]);
    res.send();
})

app.post("/api/dltfeedback",(req,res)=>{
    var id = req.body.id;
    // console.log(id);
    const del = "delete from contectus where id= ?";
    con.query(del,[id]);
    res.send();
})

app.post("/api/deleteuser",(req,res)=>{
    var id = req.body.id;
    // console.log(id);
    const del = "delete from tbl_registration where user_id= ?";
    con.query(del,[id]);
    res.send();
})

app.post("/api/deleteitem",(req,res)=>{
    var id = req.body.id;
    // console.log(id);
    const del = "delete from tbl_productdetail where p_id= ?";
    con.query(del,[id]);
    res.send();
})


/////////////////////////using model popup edit /////////

app.post("/api/Editcatvalues",(req,res)=>{
    var id = req.body.id;
    var cat = req.body.cat;
    var desc = req.body.desc;
// console.log(id)
    const upd = "update tbl_productcategory set cat_name = ?, cat_desc = ? where id= ?";
    con.query(upd,[cat, desc, id],(err,result)=>{
            res.json(result);
    })
})


app.post("/api/editprods",(req,res)=>{

    var id= req.body.editId;
    var name = req.body.name;
    var image = req.body.img;
    var prc = req.body.prc;
    var des = req.body.desc;
    var retprc =req.body.retprc;

    const udt = "update tbl_productdetail set p_name= ?, p_img= ?, p_price= ?, p_ret_price= ?, p_desc= ? where p_id= ? ";
    con.query(udt,[name, image, prc, retprc, des, id],(err, result)=>{
        res.json(result);
    })
})

////////////////user-side UseEffect for products buy////////////
app.get("/api/productlist", (req, res) => {
    const sel = "SELECT * FROM tbl_productdetail";
    con.query(sel, (err, result) => {
        if (err) {
            console.error("Error fetching product list:", err);
            res.status(500).json({ error: "Error fetching product list" });
        } else {
            res.json(result);
        }
    });
});
app.get("/api/productcat",(req,res)=>{
    const sel = "select * from tbl_productcategory";

    con.query(sel,(err, result)=>{
      
        res.send(result);
    })
})

app.get("/api/fetchid",(req,res)=>{
    let param = req.query.id;
// console.log(param)
    const sel = "select * from tbl_productdetail where  p_category=?";

    con.query(sel,[param],(err, result)=>{
        // console.log(result)
        res.send(result);
    })
})

app.get("/api/singleprod",(req,res)=>{              
    let param = req.query.id;
 
  
    const sel = "select a.*, b.* from tbl_productcategory as b,tbl_productdetail as a where a.p_category = b.id and a.p_id=? "
    con.query(sel,[param],(err, result)=>{
        res.send(result);
    });
});


app.get("/api/myprofile",(req,res)=>{
    let perameter = req.query.id;
  

    const sel = "select * from tbl_registration where user_id=?";
    con.query(sel,[perameter],(err, result)=>{
      
        res.send(result);
    })
})

app.post("/api/savepasswrd",(req,res)=>{
    var id = req.body.id;
    var password =req.body.password;
    var newpassword =req.body.newpassword;
    var retypepass =req.body.retypepass;

   
    const sel="select * from tbl_registration where user_id=? and pass=?"
    con.query(sel,[id,password],(err,result)=>{
      
        if(result.length > 0){
            const update= "update tbl_registration SET pass=? where user_id=? and pass=?"
            con.query(update,[newpassword, id, password],(err,result)=>{
                if(result){
             
                    res.send(result);
                    
                }
                else{
                    res.send({
                        msg:"something wrong"
                    })
                }
            })
        }else{
            res.send({msg:"password doesn't match"});
        }
    })
})

app.post("/api/changepassadmin",(req,res)=>{
   
    var password =req.body.password;
    var newpassword =req.body.newpassword;
    var retypepass =req.body.retypepass;


   
    const sel="select * from tbl_registration where pass=?"
    con.query(sel,[password],(err,result)=>{
      
        if(result.length > 0){
            const update= "update tbl_registration SET pass=? where  pass=?"
            con.query(update,[newpassword, password],(err,result)=>{
                if(result){
           
                    res.send(result);
                    
                }
                else{
                    res.send({
                        msg:"something wrong"
                    })
                }
            })
        }else{
            res.send({msg:"password doesn't match"});
        }
    })
})


app.post("/api/addcart",(req,res)=>{
    var uid=req.body.uid;
    var pdtid=req.body.p_id;
    // console.log(uid);

    const sel = "select * from  tbl_addtocart where user_id=? and product_id=?"
    con.query(sel,[uid, pdtid],(err,result)=>{
        
        if(result.length > 0 && result.status!='ordered'){
          res.send({msg:"alrady in cart"})
        //   console.log(result);
                }
           
        else{
            const ins = "insert into tbl_addtocart (user_id,product_id) values(?,?)"
            con.query(ins,[uid,pdtid],(err,result)=>{
                if(result){
           
                    res.send(result);
                }
                else{
                    res.send({
                        msg:"something wrong"
                    })
        }
    })

}})

})


app.get("api/fetchprod",(req,res)=>{
    var pid=req.query.p_id;
    
   const sel="select * from tbl_productdetail where p_id=? "
   con.query(sel,[pid],(err,result)=>{
    res.send();

   })
})


app.get("/api/fetchcart",(req,res)=>{
    var uid=req.query.uid;
    // var pid=req.query.p_id;
   
    const sel = "select a.*, b.* from tbl_addtocart as b,tbl_productdetail as a where a.p_id = b.product_id and b.user_id=? and b.status='unordered' ";
    con.query(sel,[uid],(err, result)=>{
// console.log(result);
        res.send(result);
    })
})


app.post("/api/updatequantity",(req,res)=>{
    const { uid,cid, quantity } = req.body;

  const upd="update tbl_addtocart SET quantity=?  where user_id=?  AND cart_id=? "  
   con.query(upd,[quantity,uid,cid],(err,result)=>{
        res.send(result);
    })
})

app.get("/api/getquantity",(req,res)=>{
    const cid =req.query.cid;
    const qty=req.query.qty;
    // console.log(qty);

    const sel="select * from tbl_addtocart where cart_id=? and quantity=?" ;
    con.query(sel,[cid,qty],(err,result)=>{
        res.send(result);
    })
    
})


app.post("/api/addwish",(req,res)=>{
    let uid=req.body.uid;
    let pid=req.body.p_id;
    // console.log(pid)
    const sel = "select * from tbl_wishlist where pdt_id=? and user_id=?"
    con.query(sel,[pid,uid],(err,result)=>{
        if(result.length > 0){
            res.send({msg:"product is alrady in your wishlist "})
                  }
             
          else{
              const ins = "insert into tbl_wishlist (user_id,pdt_id) values(?,?)"
              con.query(ins,[uid,pid],(err,result)=>{
                  if(result){
             
                      res.send(result);
                  }
                  else{
                      res.send({
                          msg:"something wrong"
                      })
          }
      })
  
  }})
  
  })

   

app.get("/api/wishlistfetch",(req,res)=>{
    const uid=req.query.uid;
    // console.log(uid)
    const sel = "select a.* , b.*  from tbl_wishlist as b, tbl_productdetail as a where a.p_id = b.pdt_id and b.user_id=?"
    con.query(sel,[uid],(err,result)=>{
        res.send(result);
    })
})


app.post("/api/deleteproduct",(req,res)=>{
    const uid=req.body.uid;
    const pid=req.body.pid

    // console.log(pid);

    const del="delete from tbl_addtocart where user_id=? and product_id=?";
    con.query(del,[uid,pid],(err,result)=>{
        res.send(result);
    })
})

app.post("/api/removeitemwish",(req,res)=>{
    let uid=req.body.uid;
    let pid=req.body.pid;
    console.log(uid);
    console.log(pid);
    const del="delete from tbl_wishlist where pdt_id=? and user_id=?";
    con.query(del,[pid,uid],(err,result)=>{
        res.send(result)
    })
})


// app.post("/api/insertorder", (req, res) => {
//     let oid = Math.floor(100000 + Math.random() * 900000);
//     let uid = req.body.uid;
//     let rwd = req.body.rwd;
//     console.log(rwd);
//     let prc = req.body.prc;
//     console.log(`Order ID: ${oid}, User ID: ${uid} , price: ${prc}`);

//         //  con.query("INSERT INTO orderitem_tbl (qty, pdt_id, prc) SELECT quantity, product_id FROM tbl_addtocart WHERE user_id=?",[oid, uid, prc])
    
//         const ins = "INSERT INTO orderitem_tbl (user_id, p_id, qty, book_id, prc, used_reward) SELECT a.user_id, a.product_id, a.quantity, ?, ?, ? FROM add_to_cart a LEFT JOIN orderitem_tbl b ON a.user_id = b.user_id AND a.product_id = b.pdt_id AND a.quantity = b.qty WHERE a.user_id = ? AND b.pdt_id IS NULL;"
//         con.query(ins, [oid, prc, rwd, uid], (err, result) => {
//             if (err) {
//                 console.log({ msg: "error occurred" });
//             } else {
//                 con.query("update tbl_addtocart set status ='ordered' where user_id= ?", [uid],(err,result) => {
//                     console.log(result);
//                     res.send(result);
//                 })
//             }
//         })
//     })


app.post("/api/insertorder", (req, res) => {
    let oid = Math.floor(100000 + Math.random() * 900000);
    let uid = req.body.uid;
    let rwd = req.body.rwd;
    console.log(rwd);
    let prc = req.body.prc;
    console.log(`Order ID: ${oid}, User ID: ${uid}, price: ${prc}`);

    const ins = "INSERT INTO orderitem_tbl (user_id, pdt_id, qty, book_id, prc, used_reward) SELECT a.user_id, a.product_id, a.quantity, ?, ?, ? FROM tbl_addtocart a LEFT JOIN orderitem_tbl b ON a.user_id = b.user_id AND a.product_id = b.pdt_id AND a.quantity = b.qty WHERE a.user_id = ? AND b.pdt_id IS NULL;"
    con.query(ins, [oid, prc, rwd, uid], (err, result) => {
        if (err) {
            console.log({ msg: "Error occurred", error: err }); // Log the error message
            res.status(500).json({ error: "An error occurred while inserting order" }); // Send appropriate response to the client
        } else {
            con.query("UPDATE tbl_addtocart SET status ='ordered' WHERE user_id = ?", [uid], (err, result) => {
                if (err) {
                    console.log({ msg: "Error occurred while updating cart status", error: err }); // Log the error message
                    res.status(500).json({ error: "An error occurred while updating cart status" }); // Send appropriate response to the client
                } else {
                    // console.log(result);
                    res.send(result);
                }
            });
        }
    });
});



app.get("/api/fetchorder",(req,res)=>{
    let uid = req.query.uid;
  
    const sel = "SELECT DISTINCT book_id,when_oredered FROM orderitem_tbl where user_id=?"
    con.query(sel,[uid],(err,result)=>{
        res.send(result);
})
})

app.get("/api/getdatainvoice",(req,res)=>{
    let uid =req.query.uid;
    let oid = req.query.oid;


    const grp = "select a.*, b.* from orderitem_tbl as b,tbl_productdetail as a where a.p_id = b.pdt_id and b.user_id=? and b.book_id = ?";
    con.query(grp,[uid, oid],(err,result)=>{
        // console.log(result)
        res.send(result);
  
    })
})


//////////////////counts form admin and user side////////////
app.get("/api/getcount",(req,res)=>{
        let uid = req.query.uid;
        //  console.log(uid);
     const sel= "SELECT COUNT(user_id) as count from tbl_addtocart where status='unordered' and user_id=? ";
    con.query(sel,[uid],(err,result)=>{
        // console.log(result)
        res.send(result);  
    })
    })


app.get("/api/getusersnums",(req,res)=>{
    
    const sel = "SELECT COUNT(user_id) as count from tbl_registration where status='Unblock'";
    con.query(sel,(err,result)=>{
        // console.log(result)
        res.send(result);
    })
})

app.get("/api/countcateg",(req,res)=>{
    
    const sel = "SELECT COUNT(id) as count from tbl_productcategory";
    con.query(sel,(err,result)=>{
        // console.log(result)
        res.send(result);
    })
})

app.get("/api/countitem",(req,res)=>{
    
    const sel = "SELECT COUNT(p_id) as count from tbl_productdetail";
    con.query(sel,(err,result)=>{
        // console.log(result)
        res.send(result);
    })
})
app.get("/api/countorder",(req,res)=>{
    const sel = "SELECT COUNT(*) as count FROM ( SELECT DISTINCT book_id FROM orderitem_tbl ) AS distinct_orders";
    con.query(sel,(err,result)=>{
        // console.log(result)
        res.send(result);
    })
})

///////////admin side reward module/////////////
app.post("/api/verifyuid",(req,res)=>{
    var email=req.body.email;
    const sel= "select * from tbl_registration where mail_id=?";
    con.query(sel,[email],(err,result)=>{
        if(result.length > 0){
                res.send(result);
        }
        else{
            res.send({msg:"wrong User"});
        }   
})
})

app.get("/api/getdetails",(req,res)=>{
    let pid = req.query.pid;
    let uid = req.query.uid;
    let pdtid = req.query.prid;
    // console.log(pid);

    const sel = "SELECT a.p_name,a.p_ret_price,a.p_price,a.p_id,b.* from tbl_productdetail as a,orderitem_tbl as b where a.p_uni_code=? and b.user_id=? and b.pdt_id=a.p_id";
    con.query(sel,[pid,uid],(err,result)=>{
            res.send(result);  
})  
})

app.post("/api/addpdtqty",(req,res)=>{
    var pid = req.body.pid;
    var uid = req.body.uid;
    var qtys = req.body.qtys;
    // console.log(qtys);
    const ins = "Insert into tbl_rewards (user_id, pdt_id, qty) values (?,?,?)";
    con.query(ins,[uid, pid, qtys],(err,result)=>{
    //    console.log(result);
        res.send(result);
    })
})

app.post("/api/addrewarddata",(req,res)=>{
  var uid=req.body.uid;
  var pid=req.body.pid;
  var oid=req.body.oid;
  var rprice=req.body.rprice;
  var qty=req.body.qty;
  var subrvd=req.body.subrvd;
   
  
  const ins = "insert into tbl_rewards(user_id, pdt_id, order_id, qty, return_price, total_amount) values (?,?,?,?,?,?)"
  con.query(ins,[uid,pid,oid,qty,rprice,subrvd]);
                res.send();
})

app.get("/api/getrewarddata",(req,res)=>{
    var uid =req.query.uid;
    const sel = "select total_amount, SUM(total_amount) as reward from tbl_rewards where user_id=?";
    con.query(sel,[uid],(err,result)=>{
        //   console.log(result)
        res.send(result);
         
    })
})

app.get("/api/getlistreward",(req,res)=>{
    var uid =req.query.uid;
//    console.log(uid)
    const sel = "select a.*, b.* from tbl_rewards as b,tbl_productdetail as a where b.user_id=? and b.pdt_id = a.p_uni_code";
    con.query(sel,[uid],(err,result)=>{
        res.send(result);
        // console.log(result)
    })    
    })


    app.get("/api/orederdpdts",(req,res)=>{
        var uid =req.query.uid;
    //    console.log(uid)
        const sel = "SELECT pd.*, oi.pdt_id, oi.when_oredered AS when_oredered FROM tbl_productdetail pd LEFT JOIN orderitem_tbl oi ON pd.p_id = oi.pdt_id AND oi.user_id =? ORDER BY CASE WHEN oi.when_oredered IS NULL THEN 1 ELSE 0 END, oi.when_oredered DESC, oi.pdt_id ASC;";
        con.query(sel,[uid],(err,result)=>{
            res.send(result);
            // console.log(result)
        })    
        })


        app.get('/api/productsearch', (req, res) => {
            const searchTerm = req.query.searchTerm;
            // console.log(searchTerm)
            const query = `SELECT * FROM tbl_productdetail WHERE p_name LIKE ?`;
            con.query(query, [`%${searchTerm}%`], (err, results) => {
                if (err) {
                    throw err;
                }
                res.json(results);
            });
        });



        app.post("/api/forgotpass", (req, res) => {
            const email = req.body.email; // Assuming the email address is sent in the 'email' field of the request body
            // console.log(email);
            con.query("SELECT * FROM tbl_registration WHERE mail_id = ?", [email], (err, result) => {
                if (result.length > 0) {
                  console.log(result);
                    const name = result[0].first_name;
                    const pass = result[0].pass;
        // console.log(name);
                    const smtpTransport = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false,
                        auth: {
                            user: "vsp22112002@gmail.com",
                            pass: "aqaxzcipeheivkvw",
                        },
                    });
        
                    const message = {
                        from: "vsp22112002@gmail.com",
                        to: email,
                        subject: "Password Reset for Your Biolife Store Account",
                        // text: `Dear ${name},\n\n` +
                        //     `You have requested a password reset for your Biolife Store account.\n\n` +
                        //     `Your new password is: ${pass}\n\n` +
                        //     `If you did not request this change, please ignore this email or contact support.\n\n` +
                        //     `Best regards,\n` +
                        //     `The Biolife Store Team`


                        html: `
                        <html>
                            <body style="font-family: Arial, sans-serif;">
                           
                            <div style="text-align: center; margin-bottom: 20px;">
                                 <img src="./logo.png" alt="Biolife Store Logo" style="max-width: 200px;">
                            </div>
        
                                <h2 style="color: #333;">Password Reset Request</h2>
                                <p>Dear ${name},</p>
                
                                <p>We've received a request to reset the password for your Biolife Store account.</p>
                
                                <p>Your new password is: <strong>${pass}</strong></p>
                
                                <p>If you didn't make this request, please ignore this email or contact our support team immediately.</p>
                
                                <p style="margin-top: 30px; color: #888;">
                                    Best regards,<br>
                                    The Biolife Store Team
                                </p>
                
                                <p style="margin-top: 20px; font-size: 12px; color: #999;">
                                    This is an automated message. Please do not reply to this email.
                                </p>
                
                            </body>
                        </html>
                    `
                    };
        
                    smtpTransport.sendMail(message, (error, info) => {
                        if (error) {
                            console.log(error);
                            res.status(500).send({ message: "Error sending email" });
                        } else {
                            console.log("Email sent: " + info.response);
                            res.send({ message: "Email sent successfully" });
                        }
                    });
                } else {
                    res.status(404).send({ message: "You do not have an account" });
                }
            });
        });
        
app.post("/api/insertreview",(req,res)=>{
    const pid = req.body.id;
    const uid = req.body.uid;
    const rate = req.body.star;
    const name = req.body.name;
    const mail = req.body.email;
    const review = req.body.review;

    // console.log(pid +' '+uid +" "+ rate + ' '+mail+' '+review);

    con.query("insert into tbl_review (pdt_id, user_id, user_name, mail_id, rating, review_msg) values (?, ?, ?, ? ,?, ?)", [pid,uid,name,mail,rate,review], (err,result)=>{
        // console.log(result);
        res.send(result);
    })
})

app.get("/api/fatchreview",(req,res)=>{
  const uid=req.query.uid;
  const pid=req.query.id;
    console.log("product"+pid+"\n"+uid); 

  con.query("SELECT * FROM tbl_review  WHERE user_id= ? and pdt_id= ?",[uid, pid],(err,result)=>{
        console.log(result);
         res.send(result);
  
  })
})







////////////fetch admin order////////
app.get("/api/fetchorderdetails",(req,res)=>{
    const bookid =  req.query.id;
    
    con.query("select * from orderitem_tbl where book_id=?",[bookid],(err,result) =>{
        if (err) throw err ;
        // console.log(result)
        res.send(result);
    //   var data={};
    //   data.orderDetails= result;
    //   console.log(data);
    // res.send(data)
    });
});

app.post("/api/rejectorder", (req, res) => {
    const id = req.body.orid;
    console.log(id);
    const upd = "update orderitem_tbl set status = 'Reject' where book_id = ?";
    con.query(upd, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
});

app.post("/api/approveorder", (req, res) => {
    const id = req.body.orid;
    console.log(id);
    const sel = "select * from orderitem_tbl where book_id = ?";
    con.query(sel, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
});


con.connect(function(err){
    if(err) 
    throw err
    console.log(`Connection build on Port ${port}`)
});
    
