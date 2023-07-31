const products=[
    {
        id:0,
        name:"T-Shirt",
        description:"Printed soft fabric T-shirt",
        image:"img/products/f1.jpg",
        price:500,
    },
    {
        id:1,
        name:"T-Shirt",
        description:"Flower Printed T-shirt",
        image:"img/products/f2.jpg",
        price:230,
    },
    {
        id:2,
        name:"T-Shirt",
        description:"Printed T-shirt",
        image:"img/products/f3.jpg",
        price:700,
    },
    {
        id:3,
        name:"T-Shirt",
        description:"White Printed T-shirt",
        image:"img/products/f4.jpg",
        price:720,
    },
    {
        id:4,
        name:"T-Shirt",
        description:"Blue Printed T-shirt",
        image:"img/products/f5.jpg",
        price:350,
    },
    {
        id:5,
        name:"T-Shirt",
        description:"Trendy Printed T-shirt",
        image:"img/products/f6.jpg",
        price:420,
    },
    {
        id:6,
        name:"Lower",
        description:"Printed Lower",
        image:"img/products/f7.jpg",
        price:400,
    },
    {
        id:7,
        name:"Top",
        description:"Printed Top",
        image:"img/products/f8.jpg",
        price:240,
    },
];
const categories=[...new Set(products.map((item)=>{
    return item;
}))];
let i=0;
document.getElementById('pro-container').innerHTML=categories.map((item)=>{
    var {name,description,image,price}=item;
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
            <h5>Rs ${price}</h5>
        </div>
        <button class='cart-btn' onclick='checklogin();addtocart(${i++})'>Add to cart</button>
    </div> `
    )
}).join('');
function checklogin(){
    if(sessionStorage.length==0){
        location.replace('/login?#');
    }
}
// document.getElementsByClassName
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
