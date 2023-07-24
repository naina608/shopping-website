let signupbtn=document.querySelector(".signup");
signupbtn.addEventListener("click",()=>{
    // form validations
    let fullname=document.querySelector("#name")||null;
    let email=document.querySelector("#email");
    let password=document.querySelector("#password");
    let phone=document.querySelector("#phone")||null;
    if(fullname!=null){
        //signup page
        if(fullname.value.length<3){
            showError("name must be 3 character long");
        }
        else if(password.value.length<8){
            showError("password must be 8 character long");
        }
        else if(!Number(phone.value)|| phone.value.length<10){
            showError("invalid number");
        }
        else{
            //submit form
            sendData('/signup',{
                name:fullname.value,
                email:email.value,
                password:password.value,
                phone:phone.value
            });
        }
    }
    else{
        if(!email.value.length || !password.value.length){
            showError("Enter valid inputs");
        }
        else{
            //submit form
            sendData('/login',{
                email:email.value,
                password:password.value
            });
        }
    }
}) 