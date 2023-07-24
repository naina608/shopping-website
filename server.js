import express from "express"
import bcrypt from "bcrypt"
import stripe from "stripe"
import dotenv from 'dotenv'
import bodyParser from "body-parser"
import cors from "cors";
dotenv.config();
const port=process.env.PORT||5500;
console.log(port);
// firebase
import { initializeApp } from "firebase/app";
import {getFirestore,doc,collection,setDoc,getDoc,updateDoc} from "firebase/firestore";//to establish connection to firebase
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY5wSR1GEL6qZyhgbHvKEFgtHFbkEZtps",
  authDomain: "ecom-cara.firebaseapp.com",
  projectId: "ecom-cara",
  storageBucket: "ecom-cara.appspot.com",
  messagingSenderId: "365381076721",
  appId: "1:365381076721:web:7e71aaf40024a088138b50"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//database
const db=getFirestore();
//express app
const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(express.static("public"));//so that we can access all public data
app.use(express.json());//enable form sharing
app.get('/',(req,res)=>{
    res.sendFile("index.html",{root:"public"});
});
app.get('/login',(req,res)=>{
    res.sendFile("login.html",{root:"public"});
});
app.get('/signup',(req,res)=>{
    res.sendFile("signup.html",{root:"public"});
});
app.get('/cart',(req,res)=>{
    res.sendFile("cart.html",{root:"public"});
});
app.post('/signup',(req,res)=>{
    //server will accept json send by common.js
    const {name,email,password,phone}=req.body;
    //validation also at server side
    if(name.length<3){
        res.json({'alert':'name must be 3 character long'});
    }
    else if(!email){
        res.json({'alert':'enter your email'});
    }
    else if(password.length<8){
        res.json({'alert':'password must be 8 character long'});
    }
    else if(!Number(phone)|| phone.length<10){
        res.json({'alert':'invalid number'});
    }
    else{
        //store data in database

        //create collection
        const users=collection(db,"users");

        //get email from users collection
        getDoc(doc(users,email)).then(user=>{
            if(user.exists()){
                return res.status(404).json({'alert':'user already exists'});
            }
            else{
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password,salt,(err,hash)=>{
                        req.body.password=hash;
                          //set data to frontend dont send password ever
                    setDoc(doc(users,email),req.body).then(data=>{
                        res.json({
                            name:req.body.name,
                            email:req.body.email
                        })
                    })
                    })
                })
            }
        })
    }
});
app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    const users=collection(db,"users");
    getDoc(doc(users,email)).then(user=>{
        if(!user.exists()){
            return res.json({'alert':'email does not exists'});
        }
        else{
            bcrypt.compare(password,user.data().password,(err,result)=>{
                if(result){
                    let data=user.data();
                    res.json({
                        name:data.name,
                        email:data.email
                    });
                }
                else{
                    return res.json({'alert':'incorrect password'})
                }
            })
        }
    })
});
app.get('/checkout',(req,res)=>{
    res.sendFile("checkout.html",{root:'public'});
});
let stripeGateway=stripe(process.env.stripe_key);
let Domain=process.env.DOMAIN;
app.post('/stripecheckout', async (req, res) => {
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${Domain}/success?session_id={CHECKOUT_SESSION_ID}&order=${encodeURI(JSON.stringify(req.body))}`,
        cancel_url: `${Domain}/checkout?payment_fail=true`,
        line_items: req.body.items.map(item => {
            return {
               price_data: {
                   currency: "usd",
                   product_data: {
                    name: item.name,
                    description: item.description,
                       images: [item.image]
                   },
                   unit_amount: item.price * 100
               },
               quantity: 1
            }
        })
    })

    res.json(session.url);
});
app.get('/success', async (req, res) => {
    let { order, session_id } = req.query;
    order = decodeURI(order);
    
    try{
        const session = await stripeGateway.checkout.sessions.retrieve(session_id);

        const customer = session.customer_details.email;
        let date = new Date();

        let orders_collection = collection(db, "orders");
        let docName = `${customer}-order-${date.getTime()}`;
        setDoc(doc(orders_collection, docName), JSON.parse(order))
        .then(data => {
            res.redirect('/checkout?payment=done');
        })

    } catch(err){
        console.log(err)
        res.json(err);
    }
});
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})