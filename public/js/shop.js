const products=[
    {
        id:0,
        name:"T-Shirt",
        description:"Printed soft fabric T-shirt",
        image:"img/products/f1.jpg",
        price:50,
    },
    {
        id:1,
        name:"T-Shirt",
        description:"Flower Printed T-shirt",
        image:"img/products/f2.jpg",
        price:23,
    },
    {
        id:2,
        name:"T-Shirt",
        description:"Printed T-shirt",
        image:"img/products/f3.jpg",
        price:70,
    },
    {
        id:3,
        name:"T-Shirt",
        description:"White Printed T-shirt",
        image:"img/products/f4.jpg",
        price:72,
    },
    {
        id:4,
        name:"T-Shirt",
        description:"Blue Printed T-shirt",
        image:"img/products/f5.jpg",
        price:35,
    },
    {
        id:5,
        name:"T-Shirt",
        description:"Trendy Printed T-shirt",
        image:"img/products/f6.jpg",
        price:42,
    },
    {
        id:6,
        name:"Lower",
        description:"Printed Lower",
        image:"img/products/f7.jpg",
        price:40,
    },
    {
        id:7,
        name:"Top",
        description:"Printed Top",
        image:"img/products/f8.jpg",
        price:24,
    },
    {
        id:8,
        name:"Shirt",
        description:"Plain Shirt",
        image:"img/products/n1.jpg",
        price:26,
    },
    {
        id:9,
        name:"Shirt",
        description:"Check Shirt",
        image:"img/products/n2.jpg",
        price:70,
    },
    {
        id:10,
        name:"Shirt",
        description:"White Shirt",
        image:"img/products/n3.jpg",
        price:66,
    },
    {
        id:11,
        name:"T-Shirt",
        description:"Plain Shirt",
        image:"img/products/n4.jpg",
        price:55,
    },
    {
        id:12,
        name:"Shirt",
        description:"Blue Shirt",
        image:"img/products/n5.jpg",
        price:79,
    },
    {
        id:13,
        name:"Shorts",
        description:"Denim Shorts",
        image:"img/products/n6.jpg",
        price:27,
    },
    {
        id:14,
        name:"Shirt",
        description:"Denim Shirt",
        image:"img/products/n7.jpg",
        price:59,
    },
    {
        id:15,
        name:"Shirt",
        description:"Denim Shirt",
        image:"img/products/n8.jpg",
        price:27,
    },
];
const categories=[...new Set(products.map((item)=>{
    return item;
}))];
let i=0;
window.onload=()=>{document.getElementById('pro-container').innerHTML=categories.map((item)=>{
    var {name,description,image,price}=item;
    console.log(price);
    return(
        `
        <div class="pro">
        <img src=${image} alt="">
        <div class="des">
            <span>${name}</span>
            <h3>${description}</h3>
            <div class="star">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
            <h5>$ ${price}</h5>
        </div>
        <button class='cart-btn' onclick='checklogin();addtocart(${i++})'>Add to cart</button>
    </div> `
    )
}).join('')}
function checklogin(){
    if(sessionStorage.length==0){
        location.replace('/login?#');
    }
}
// convert string to array of json
var cart=localStorage.getItem("cart");
if(cart==''){
    cart=[];
}
else{
   cart= JSON.parse(localStorage.getItem("cart"));
}
document.getElementById("count").innerHTML=cart.length;
function addtocart(a){
    cart.push(({...categories[a]}));
    document.getElementById("count").innerHTML=cart.length;
}
const cartBag=document.querySelector('#lg-bag');
cartBag.addEventListener('click',()=>{
    localStorage.setItem("cart",JSON.stringify(cart));
})

