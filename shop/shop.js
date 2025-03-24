// Get Elemets
let bannerBackground = document.getElementById("bannerImage")
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
let cardsArea = document.getElementById("cardsArea")
let categorys = document.querySelector(".categorys")
let brands = document.querySelector(".brands")
let priceFilter = document.getElementById("priceFilter")
let ratings = document.querySelector(".ratings")
let filterIcon1 = document.getElementById("filterIcon1")
let filterIcon2 = document.getElementById("filterIcon2")
let filterIcon3 = document.getElementById("filterIcon3")
let filterIcon4 = document.getElementById("filterIcon4")
let brandNames = document.getElementById("brandNames")
let searchWord = document.getElementById("search")



// Basic Functions

checkUserStatus();

function toggleNavBar(){
    responsiveNav.classList.toggle("display-none")
    responsiveNav.classList.toggle("fromTop")
}

function showCategorysFilter(){
    categorys.classList.toggle("display-none")
    if(filterIcon1.innerHTML == "+"){
        filterIcon1.innerHTML = `<i class="fa-solid fa-minus" style="color: #ffffff;"></i>`
    }
    else{
        filterIcon1.innerHTML = `+`
    }
}

function showBrandsFilter(){
    brands.classList.toggle("display-none")
    if(filterIcon2.innerHTML == "+"){
        filterIcon2.innerHTML = `<i class="fa-solid fa-minus" style="color: #ffffff;"></i>`
    }
    else{
        filterIcon2.innerHTML = `+`
    }
}

function showPriceFilter(){
    priceFilter.classList.toggle("display-none")
    if(filterIcon3.innerHTML == "+"){
        filterIcon3.innerHTML = `<i class="fa-solid fa-minus" style="color: #ffffff;"></i>`
    }
    else{
        filterIcon3.innerHTML = `+`
    }
}

function showRating(){
    ratings.classList.toggle("display-none")
    if(filterIcon4.innerHTML == "+"){
        filterIcon4.innerHTML = `<i class="fa-solid fa-minus" style="color: #ffffff;"></i>`
    }
    else{
        filterIcon4.innerHTML = `+`
    }
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
// Get All Logic
getALL()

function getALL(){
    fetch("https://api.everrest.educata.dev/shop/products/all?page_size=38")
    .then(response => response.json())
    .then(data => data.products.forEach(item => cardsArea.innerHTML += cardMaker(item)))
    .catch(() => cardsArea.innerHTML = `<img class="notFound" src="../images/Errores-Web-404-403-503-502-401.-Significado-y-soluciones-1 (1).png" alt="404">`)
}

// card Maker Logic
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

// Category Logic
fetch("https://api.everrest.educata.dev/shop/products/categories")
.then(response => response.json())
.then(data => data.forEach(item => categorys.innerHTML += `<button onclick="filterByCategory(${item.id})"><img src="${item.image}" alt="${item.name}"><span>${item.name}</span></button>`))

function filterByCategory(category){
    cardsArea.innerHTML = ""
    fetch(`https://api.everrest.educata.dev/shop/products/category/${category}`)
    .then(respone => respone.json())
    .then(data => data.products.forEach(item => cardsArea.innerHTML += cardMaker(item)))
    .catch(() => cardsArea.innerHTML = `<img class="notFound" src="../images/Errores-Web-404-403-503-502-401.-Significado-y-soluciones-1 (1).png" alt="404">`)
}

// Brands Logic 

fetch("https://api.everrest.educata.dev/shop/products/brands")
.then(respone => respone.json())
.then(data => data.forEach(item => brandNames.innerHTML += `<li onclick="filterByBrand('${item}')"><i class="fa-solid fa-tag"></i><p>${item}</p></li>`))

function filterByBrand(brand){
    cardsArea.innerHTML = ""
    fetch(`https://api.everrest.educata.dev/shop/products/brand/${brand}`)
    .then(response => response.json())
    .then(data => data.products.forEach(item => cardsArea.innerHTML += cardMaker(item)))
}

// Search Logic 

// Search Logic

function search() {
    cardsArea.innerHTML = ""; 
    const searchFor = searchWord.value.trim();

    fetch(`https://api.everrest.educata.dev/shop/products/search?keywords=${searchFor}`)
        .then((response) => response.json())
        .then((data) => data.products.forEach(item => cardsArea.innerHTML += cardMaker(item)))
        .catch((error) => console.error("Error fetching data:", error));
}

searchWord.addEventListener("keyup", function(event){
    if (event.key === "Enter") {  
        search();  
    }
});



