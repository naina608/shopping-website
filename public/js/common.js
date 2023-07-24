//to avoid going to signup page again after loading
window.onload=()=>{
    if(sessionStorage.user){
        user=JSON.parse(sessionStorage.user);
        if(user.email){
            location.replace('/');
        }
    }
}
//to grab the response from server
const sendData=(path,data)=>{
    fetch(path,{
        method:'post',
        headers:new Headers({'Content-Type':'application/json'}),
        body:JSON.stringify(data),
    }).then(res=>res.json())
     .then(data=>processData(data));
}
const processData=(data)=>{
    console.log(data);
    if(data.alert){
        showError(data.alert);
    }
    else if(data.name){
        sessionStorage.user=JSON.stringify(data);
        localStorage.setItem("cart",[]);
        location.replace('/');
    }
}
const showError=(err)=>{
    let errorOccur=document.querySelector(".error");
    errorOccur.innerHTML=err;
    errorOccur.classList.add("show");
}