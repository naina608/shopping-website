window.onload=()=>{
    if(!sessionStorage.user){
        location.replace('/login?#');
    }
    if(location.search.includes('payment=done')){
        let items=[];
        localStorage.setItem('cart',items);
        document.getElementById("count").innerHTML=cart.length;
        alert("Order Placed");
    }
    if(location.search.includes('payment_fail=true')){
        alert("Order Failed");
        document.getElementById("count").innerHTML=cart.length;
    }
}
var cart=JSON.parse(localStorage.getItem("cart"));
document.getElementById("count").innerHTML=cart.length;
const checkout=document.querySelector('.check-out');
checkout.addEventListener('click',()=>{
    let address=getAddress();
    //send data to backend
    if(!address.length){
        fetch('/stripecheckout',{
        method:'post',
        headers:new Headers({'Content-Type':'application/json'}),
        body:JSON.stringify({
            items:JSON.parse(localStorage.getItem("cart")),
            address:address,
            email:JSON.parse(sessionStorage.user).email
        })
    }).then(res=>res.json()).then(url=>{
        location.href=url
    }).catch(err=>{
        console.log(err);
    })
}
});
const getAddress=()=>{
    let address=document.querySelector('#address').value;
    let street=document.querySelector('#street').value;
    let city=document.querySelector('#city').value;
    let state=document.querySelector('#state').value;
    let pincode=document.querySelector('#pincode').value;
    let landmark=document.querySelector('#landmark').value;
    if(!address.length ||!street.length||!city.length||!state.length||!pincode.length||!landmark.length){
        return showError("Fill all the inputs");
    }
    else{
        return{address,street,city,state,pincode,landmark};
    }
}