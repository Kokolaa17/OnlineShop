// Get Elements
const bestSeller = document.getElementById("bestSeller");
let detailsArea = document.getElementById("detailsArea");
let details = document.querySelector(".details");
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
// Basic Functions

checkUserStatus();

function toggleNavBar(){
    responsiveNav.classList.toggle("display-none")
    responsiveNav.classList.toggle("fromTop")
}

function goShopNow(){
    document.location.href = "./shop/shop.html"
}




// API Cards
fetch("https://api.everrest.educata.dev/shop/products/all?page_size=8")
.then((response) => response.json())
.then((items) => items.products.forEach((item) => {
    // console.log(item);
    bestSeller.innerHTML += cardMaker(item)
}))
.catch(() => bestSeller.innerHTML = `<img class="notFound" src="./images/Errores-Web-404-403-503-502-401.-Significado-y-soluciones-1 (1).png" alt="404">`)

// Display cards
function cardMaker(item) {
    return `<div class="card">
                <h3>${item.price.current}$ <span>${discountPrice(item.price.current, item.price.beforeDiscount)}</span></h3>
                <img src="${item.thumbnail}" alt="${item.title}">
                <h2>${item.title}</h2>
                <div class="stars">
                    ${generateStars(item.rating)}
                </div>
                <div class="action-buttons">
                    <button id="cartButton">Add To Cart <i class="fa-solid fa-cart-shopping"></i></button>
                    <button onclick="showDetails('${item._id}')">Show details <i class="fa-solid fa-eye"></i></button>
                </div>
            </div>`;
}


function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < Math.round(rating); i++) {
        stars += `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>`;
    }
    return stars;
}


// Details logic

function showDetails(id){
    detailsArea.classList.remove("hidden")
    details.classList.add("fromBackRotate")
    fetch(`https://api.everrest.educata.dev/shop/products/id/${id}`)
    .then((response) => response.json())
    .then((item) => details.innerHTML = detailsPage(item) )
    .catch(() => details.innerHTML = `<img class="notFound" src="./images/Errores-Web-404-403-503-502-401.-Significado-y-soluciones-1 (1).png" alt="404">`)
}

function detailsPage(item){
    return `<button class="closeButton" onclick="closeDetails()"><i class="fa-solid fa-xmark"></i></button>
            <div class="image">
                <button id="pre"><i class="fa-duotone fa-solid fa-chevron-left"></i></button>
                <h3>${discountPrecent(item.price.discountPercentage)}</h3>
                <img src="${slideShow(item.images)}" alt="">
                <button id="next"><i class="fa-duotone fa-solid fa-chevron-right"></i></button>
            </div>
            <div class="description">
                <h1>${item.title}</h1>
                <div class="stars-price">
                <h2>Price : ${item.price.current}$ <span>${discountPrice(item.price.current, item.price.beforeDiscount)}</span></h2>
                <div class="details-stars">
                     ${generateStars(item.rating)}
                </div>
                 </div>
                <h4>${inStock(item.stock)}</h4>
                <div class="item-description">
                    <h3>Description</h3>
                    <p>${item.description}</p>
                </div>
                <div class="comerical">
                    <p><i class="fa-solid fa-calendar-check"></i> ${item.warranty} years full warranty</p>
                    <p><i class="fa-solid fa-table-cells-row-lock"></i> Secure payment</p>
                    <p><i class="fa-solid fa-truck-fast"></i> Worldwide shipping</p>
                </div>
                <ul>
                    <li>Category: ${item.category.name}</li>
                    <li>Brand: ${item.brand}</li>
                    <li>Issue Date: ${item.issueDate}</li>
                </ul>
                <div class="addToCart">
                    <button id="cartAdder">Add to cart <i class="fa-solid fa-cart-shopping"></i></button>
                </div>`
}

function slideShow(images){
    let image = images;
    let currentIndx = 0
    return image[currentIndx]
}

function inStock(stock){
    if(stock == 0){
        return `<span style="color: red;">Not in stock <i class="fa-solid fa-x" style="color: #ff0000;"></i></span>`
    }
    else {
        return `<span style="color: green;">${stock} in stock <i class="fa-solid fa-check"></i></span>`;
    }
}
function discountPrecent(precent){
    if(precent == 0){
        return ``
    }
    else {
        return `${precent}%`
    }
}

function discountPrice(current, before){
    if(before == current){
        return ``
    }
    else {
        return `${before}$`
    }
}


function closeDetails(){
    detailsArea.classList.add("hidden")
    details.classList.remove("fromBackRotate")
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
}

function logOutLogic() {
    Cookies.remove("userToken");
    checkUserStatus();
    displayText.innerHTML = ""
    accountCreationForm.reset()
}