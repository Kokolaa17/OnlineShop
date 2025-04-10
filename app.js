// Get Elements
const bestSeller = document.getElementById("bestSeller");
let createAccount = document.getElementById("createAccount");
let accountArea = document.querySelector(".create-account");
let accountForm = document.getElementById("accountForm");
let errorText = document.getElementById("errorText");
let errorDetails = document.getElementById("errorDetails");
let logIn = document.getElementById("LogIn");
let logInForm = document.getElementById("loginForm");
let displayText = document.getElementById("displayText");
let notLogedInMenu = document.querySelectorAll(".not-loggedin")
let logedInMenu = document.querySelectorAll(".loged-in")
let accountCreationForm = document.getElementById("accountCreation")
let burgerBar = document.getElementById("burgerBar")
let responsiveNav = document.getElementById("responsiveNav")
let logedInUserName = document.querySelectorAll(".logInUserName")
let userCart = false;
let noUserCart = document.querySelector(".no-account")
let noUserCartContent = document.querySelector(".register-or-create")




// Basic Functions

checkUserStatus();

function indexPage(){
    window.location.href= "./index.html"
}

function toggleNavBar(){
    responsiveNav.classList.toggle("display-none")
    responsiveNav.classList.toggle("fromTop")
}

function goShopNow(){
    document.location.href = "./shop/shop.html"
}

function userPage(){
    window.location.href = "./userinfo/userinfo.html"
}

function goToCart(){
    window.location.href = "./cart/cart.html"
}



// API Cards
fetch("https://api.everrest.educata.dev/shop/products/all?page_size=8")
.then((response) => response.json())
.then((items) => items.products.forEach((item) => bestSeller.innerHTML += cardMaker(item)))
.catch(() => bestSeller.innerHTML = `<img class="notFound" src="./images/Errores-Web-404-403-503-502-401.-Significado-y-soluciones-1 (1).png" alt="404">`)

// card Maker Logic
function cardMaker(item) {
    return `<div class="card">
                <h6 class="display-none" id="${item._id}" style="color: ${item.stock == 0 ? 'red' : '#00F004'};">${item.stock == 0 ? 'Out of stock! <i class="fa-solid fa-x fa-beat" style="color: #ff0000;"></i>' : 'Added to cart! <i class="fa-solid fa-boxes-packing fa-beat" style="color: #00ff04;"></i>'}</h6>
                <h3>${item.price.current}$ <span>${discountPrice(item.price.current, item.price.beforeDiscount)}</span></h3>
                <img src="${item.thumbnail}" alt="${item.title}">
                <h2>${item.title}</h2>
                <div class="stars">
                    ${generateStars(item.rating)}
                </div>
                <div class="action-buttons">
                    <button id="cartButton" onclick="buttonCartAdder('${item._id}', ${item.stock})">Add To Cart <i class="fa-solid fa-cart-shopping"></i></button>
                    <button onclick="showDetails('${item._id}')">Show details <i class="fa-solid fa-eye"></i></button>
                </div>
            </div>`;
}

function discountPrice(current, before){
    if(before == current){
        return ``
    }
    else {
        return `${before}$`
    }
}


function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < Math.round(rating); i++) {
        stars += `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>`;
    }
    return stars;
}
// Sign up logic
function openCreation(){
    accountArea.classList.remove("hidden")
    accountForm.classList.add("fromTop")  
}

function closeCreation(){
    accountArea.classList.add("hidden")
    accountForm.classList.remove("fromTop")  
}

function registerAccount(e){
    e.preventDefault()
    
    let formData = new FormData(e.target)
    let finalForm = Object.fromEntries(formData)

    fetch("https://api.everrest.educata.dev/auth/sign_up",{
        method: "POST",
        headers: {
            'accept' : '*/*',
            'Content-Type' : 'application/json'
        },
        body :  JSON.stringify(finalForm)
    })
    .then(response => response.json())
    .then(data => {
        errorText.innerHTML = ""
        errorDetails.innerHTML = ""
        if ("error" in data) {
            errorText.innerHTML =`<i class="fa-solid fa-circle-exclamation fa-beat" style="color: #ff0000;"></i> ${data.error}`
       }
       else {
           errorText.innerHTML = `<p style="color: #66ff00;">Your account has been created! <i class="fa-solid fa-check fa-beat" style="color: #66ff00;"></i> </p>`
           setTimeout(() => {
                closeCreation()
           }, 1000);
       }
        data.errorKeys.forEach((error) => errorDetails.innerHTML += `<li>${error}</li>`)
    })
    .catch(error => console.log(error))
}


// Sign in logic

function openLog() {
    logIn.classList.remove("hidden")
    logInForm.classList.add("fromTop")
}

function closeLog(){
    logIn.classList.add("hidden")
    logInForm.classList.remove("fromTop")
    displayText.innerHTML = ""
}
function notHaveAccount(){
    logIn.classList.add("hidden")
    logInForm.classList.remove("fromTop")

    setTimeout(() => {
        openCreation()
    }, 500);
}

function logInLogic (e){

    e.preventDefault()

    let formData = new FormData(e.target)
    let finalForm = Object.fromEntries(formData)

    fetch("https://api.everrest.educata.dev/auth/sign_in",{
        method: "POST",
        headers: {
            'accept' : '*/*',
            'Content-Type' : 'application/json'
        },
        body :  JSON.stringify(finalForm)
    })
    .then(response => response.json())
    .then(data => {
        displayText.innerHTML = ""
        if("error" in data){
            displayText.innerHTML = `<i class="fa-solid fa-circle-exclamation fa-beat" style="color: #ff0000;"></i> ${data.error}`
            displayText.style.color = "red"
        }
        else{
            displayText.innerHTML = `You have successfully logged in <i class="fa-solid fa-check fa-beat" style="color: #04ff00;"></i>`
            displayText.style.color = "#04ff00"
            setTimeout(() => {
                closeLog()
            }, 1000);
            Cookies.set("userToken", `${data.access_token}`)
            checkUserStatus();
            e.target.reset()
        }
    })
    .catch(error => console.log(error))
}


function logOutLogic() {
    Cookies.remove("userToken");
    checkUserStatus();
    displayText.innerHTML = ""
    accountCreationForm.reset()
}

// Sign in logic

function openLog() {
    logIn.classList.remove("hidden")
    logInForm.classList.add("fromTop")
}

function closeLog(){
    logIn.classList.add("hidden")
    logInForm.classList.remove("fromTop")
    displayText.innerHTML = ""
}
function notHaveAccount(){
    logIn.classList.add("hidden")
    logInForm.classList.remove("fromTop")

    setTimeout(() => {
        openCreation()
    }, 500);
}

function logInLogic (e){

    e.preventDefault()

    let formData = new FormData(e.target)
    let finalForm = Object.fromEntries(formData)

    fetch("https://api.everrest.educata.dev/auth/sign_in",{
        method: "POST",
        headers: {
            'accept' : '*/*',
            'Content-Type' : 'application/json'
        },
        body :  JSON.stringify(finalForm)
    })
    .then(response => response.json())
    .then(data => {
        displayText.innerHTML = ""
        if("error" in data){
            displayText.innerHTML = `<i class="fa-solid fa-circle-exclamation fa-beat" style="color: #ff0000;"></i> ${data.error}`
            displayText.style.color = "red"
        }
        else{
            displayText.innerHTML = `You have successfully logged in <i class="fa-solid fa-check fa-beat" style="color: #04ff00;"></i>`
            displayText.style.color = "#04ff00"
            setTimeout(() => {
                closeLog()
            }, 1000);
            Cookies.set("userToken", `${data.access_token}`)
            checkUserStatus();
            e.target.reset()
        }
    })
    .catch(error => console.log(error))
}



function checkUserStatus() {

    let token = Cookies.get("userToken")

    notLogedInMenu.forEach(list => {
        if (token) {
            list.classList.add("display-none");
        } else {
            list.classList.remove("display-none");
        }
    });

    logedInMenu.forEach(list => {
        if (token) {
            list.classList.remove("display-none");
        } else {
            list.classList.add("display-none");
        }
    });

    if(token) {
        fetch("https://api.everrest.educata.dev/auth", {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
        .then((response) => response.json())
        .then(data => {
            logedInUserName.forEach(names => names.innerHTML = `${data.firstName} <img src="${data.avatar}" alt="${data.firstName} Avatar">`)
        })
        .catch(error => console.log(error))
    }
    
}

function logOutLogic() {
    Cookies.remove("userToken");
    checkUserStatus();
    displayText.innerHTML = ""
    accountCreationForm.reset()
}

// Details Logic

function showDetails(id){
    sessionStorage.setItem("detailsProductID", id);  
    window.location.href = "../details/details.html"; 
}

// Add to cart logic 

function buttonCartAdder(id, stock) {
    if(Cookies.get("userToken")){
        let cardInfo = {
            id: id,
            quantity: 1,
            };
    
        if(stock > 0){
            fetch("https://api.everrest.educata.dev/auth", {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${Cookies.get("userToken")}`,
                },
                })
                .then((res) => res.json())
                .then((data) => {
                    (data.cartID ? (userCart = true) : userCart = false)
                    addToCart(cardInfo)
                } );
        }

        let dislpayMessage = document.getElementById(`${id}`)

        dislpayMessage.classList.remove("display-none")
        dislpayMessage.classList.add("fromLeft")

        if(dislpayMessage.classList.contains("fromLeft")){
            setTimeout(() => {
                dislpayMessage.classList.add("display-none")
                dislpayMessage.classList.remove("fromLeft")
            }, 1500);
        }
    }
    else {
        noUserCart.classList.remove("hidden")
        noUserCartContent.classList.add("fromBackRotate")
    }
}
function startCreation(){
    noUserCart.classList.add("hidden")
    noUserCartContent.classList.remove("fromBackRotate")
    setTimeout(() => {
        openCreation()
    }, 500);
}

function startLogIn(){
    noUserCart.classList.add("hidden")
    noUserCartContent.classList.remove("fromBackRotate")
    setTimeout(() => {
        openLog()
    }, 500);
}

function closeNoAccount(){
    noUserCart.classList.add("hidden")
    noUserCartContent.classList.remove("fromBackRotate")
}

function addToCart(cardInfo) {
    fetch("https://api.everrest.educata.dev/shop/cart/product", {
        method: `${userCart ? "PATCH" : "POST"}`,
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${Cookies.get("userToken")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardInfo)
      })
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error))
  }


