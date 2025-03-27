let createAccount = document.getElementById("createAccount")
let accountArea = document.querySelector(".create-account")
let accountForm = document.getElementById("accountForm")
let errorText = document.getElementById("errorText")
let errorDetails = document.getElementById("errorDetails")
let logIn = document.getElementById("LogIn");
let logInForm = document.getElementById("loginForm");
let displayText = document.getElementById("displayText");
let notLogedInMenu = document.querySelectorAll(".not-loggedin")
let logedInMenu = document.querySelectorAll(".loged-in")
let accountCreationForm = document.getElementById("accountCreation")
let burgerBar = document.getElementById("burgerBar")
let responsiveNav = document.getElementById("responsiveNav")
let logedInUserName = document.querySelectorAll(".logInUserName")
let totalPrice = document.getElementById("totalPrice")
let cartPlace = document.getElementById("cartPlace")

// Basic Functions

checkUserStatus();

function userPage(){
    window.location.href = "../userinfo/userInfo.html"
}

function toggleNavBar(){
    responsiveNav.classList.toggle("display-none")
    responsiveNav.classList.toggle("fromTop")
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
        console.log(data);
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
    console.log(finalForm);

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
}



function checkUserStatus() {
    let token = Cookies.get("userToken");


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
            console.log(data);
            logedInUserName.forEach(names => names.innerHTML = `${data.firstName} <img src="${data.avatar}" alt="${data.firstName} Avatar">`)
        })
    }
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
    console.log(finalForm);

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
}



function checkUserStatus() {
    let token = Cookies.get("userToken");


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
            console.log(data);
            logedInUserName.forEach(names => names.innerHTML = `${data.firstName} <img src="${data.avatar}" alt="${data.firstName} Avatar">`)
        })
    }
}

function logOutLogic() {
    Cookies.remove("userToken");
    checkUserStatus();
    displayText.innerHTML = ""
    accountCreationForm.reset()
}

// Cart show logic

fetch("https://api.everrest.educata.dev/shop/cart",{
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
})
.then(response => response.json())
.then(data => {
    console.log(data.total.price.current)
    totalPrice.innerHTML = `${data.total.price.current}$`
    data.products.forEach(item => displayProducts(item.productId))
})

function displayProducts(id){
    fetch(`https://api.everrest.educata.dev/shop/products/id/${id}`)
    .then(response => response.json())
    .then(data => cartPlace.innerHTML += productCardMaker(data))
}

function productCardMaker(data){
    return `<div class="product">
            <div class="product-image">
                <img src="${data.thumbnail}" alt="${data.title}-image">
            </div>
            <div class="title-rating-price">
                <h1>${data.title}</h1>
                <h3>${generateStars(data.rating)}</h3>
                <h4><i class="fa-solid fa-money-bill-wave" style="color: #85BB65;"></i>${data.price.current}$</h4>
            </div>
            <h2>In stock: <span>${data.stock}</span></h2>
            <h5>Reviews : <span>${data.ratings.length}</span></h5>
            <div class="quantity">
                <button><i class="fa-solid fa-minus"></i></button>
                <span>1</span>
                <button><i class="fa-solid fa-plus"></i></button>
            </div>
            <button class="deleteButton" onclick="deletItemFromCart('${data._id}')"><i class="fa-solid fa-trash"></i></button>
        </div>`
}

function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < Math.round(rating); i++) {
        stars += `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>`;
    }
    return stars;
}

function deletItemFromCart(productID){
    fetch("https://api.everrest.educata.dev/shop/cart/product",{
        method: "DELETE",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${Cookies.get("userToken")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: `${productID}`})
    })
    .then(response => response.json())
    .then(data => {
        cartPlace.innerHTML = `<p>Total price: <span id="totalPrice">${data.total.price.current}$</span></p>`
        data.products.forEach(item => displayProducts(item.productId))
        console.log(data); 
    })
}
