window.onload=()=>{
    if(!sessionStorage.user){
        location.replace('/login?#');
    }
}
let cname=document.querySelector('#contactName');
let mail=document.querySelector('#contactMail');
let subject=document.querySelector('#contactSubject');
let mess=document.querySelector('#message');
const submitbtn=document.querySelector('#leavemessage');
submitbtn.addEventListener('click',()=>{
    if(!cname.length||!mail.length||!subject.length||!mess){
        alert("sent successfully");
    }
})