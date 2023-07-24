const userIcon=document.querySelector('.user-icon');
const popUp=document.querySelector('.pop-up');
userIcon.addEventListener('click',()=>popUp.classList.toggle('active'));
const text=popUp.querySelector('p');
const actionbtn=popUp.querySelector('a');
const user=JSON.parse(sessionStorage.user||null);
if(user!=null){
    text.innerHTML=`login as ${user.name}`;
    actionbtn.innerHTML='log out';
    actionbtn.addEventListener('click',()=>logout());
}
else{
    text.innerHTML=`log in your account`;
    actionbtn.innerHTML='login';
    actionbtn.addEventListener('click',()=>location.replace('/login?#'));
}
const logout=()=>{
    sessionStorage.clear();
    localStorage.setItem("cart",[]);
   location.reload();
}