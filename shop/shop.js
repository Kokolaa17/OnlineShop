// Get Elemets
let bannerBackground = document.getElementById("bannerImage")
let brands = document.getElementById("brands")
let shopSection = document.getElementById("shopProdcuts")
let detailsArea = document.getElementById("detailsArea")
let details = document.querySelector(".details")
let searchWord = document.getElementById("search")
let categorys = document.getElementById("categorys")
let createAccount = document.getElementById("createAccount")
let accountArea = document.querySelector(".create-account")
let accountForm = document.getElementById("accountForm")
let errorText = document.getElementById("errorText")
let errorDetails = document.getElementById("errorDetails")

// Banner Switching Photos

let bannerImages = ["https://static.wixstatic.com/media/c837a6_9c1280daaeb0481abc58e6e236efdf59~mv2.png/v1/fill/w_1920,h_734,al_br,q_90,enc_avif,quality_auto/c837a6_9c1280daaeb0481abc58e6e236efdf59~mv2.png", "https://static.wixstatic.com/media/c837a6_f58829a26e594ca3aa72383e19cf39b9~mv2.png/v1/fill/w_1920,h_922,al_r,q_90,enc_avif,quality_auto/c837a6_f58829a26e594ca3aa72383e19cf39b9~mv2.png", "https://online-shopping-weld-nu.vercel.app/arrivals.jpg"] 
let num = 0

setInterval(() => {
    num++
    num > 2 ? num = 0 : false
    bannerBackground.src= bannerImages[num]
}, 6000);


// Get All Logic
function getAll(){
    fetch("https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38")
    .then(response => response.json())
    .then(items => items.products.forEach(item => shopSection.innerHTML += cardMaker(item)))
}

getAll()


// Display Cards
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

function discountPrice(current, before) {
    return before > current ? `${before}$` : "";
}

function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < Math.round(rating); i++) {
        stars += `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>`;
    }
    return stars;
}

// Display by category
fetch("https://api.everrest.educata.dev/shop/products/brands")
.then( response => response.json())
.then( items => items.forEach( item => brands.innerHTML += `<li onclick="getByCategory('${item}', event)"><i class="fa-solid fa-tag"></i> ${item}</li>`))


function getByCategory(item, e){
    const allItems = document.querySelectorAll('li');
    allItems.forEach(li => li.classList.remove('stayON'));
    e.target.classList.add("stayON") 
    shopSection.innerHTML = ""
    fetch(`https://api.everrest.educata.dev/shop/products/brand/${item}`)
    .then(response => response.json())
    .then(items =>  items.products.forEach(item => shopSection.innerHTML += cardMaker(item)))
}

function categoryALL(e){
    const allItems = document.querySelectorAll('li');
    allItems.forEach(li => li.classList.remove('stayON'));
    shopSection.innerHTML = ""
    e.target.classList.add("stayON")
    fetch("https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38")
    .then(response => response.json())
    .then(items => items.products.forEach(item => shopSection.innerHTML += cardMaker(item)))
}


// Details logic

function showDetails(id){
    detailsArea.classList.remove("hidden")
    fetch(`https://api.everrest.educata.dev/shop/products/id/${id}`)
    .then((response) => response.json())
    .then((item) => details.innerHTML = detailsPage(item))
}
function detailsPage(item){
    return `<button class="closeButton" onclick="closeDetails()"><i class="fa-solid fa-xmark"></i></button>
            <div class="image">
                <button id="pre"><i class="fa-duotone fa-solid fa-chevron-left"></i></button>
                <h3>${discountPrecent(item.price.discountPercentage)}</h3>
                <img id="detailsIMG" src="${sliderForDetails(item.images)}" alt="">
                <button id="next"><i class="fa-duotone fa-solid fa-chevron-right"></i></button>
            </div>
            <div class="description">
                <h1>${item.title}</h1>
                <div class="details-stars">
                     ${generateStars(item.rating)}
                </div>
                <h2>Price : ${item.price.current}$ <span>${discountPrice(item.price.current, item.price.beforeDiscount)}</span></h2>
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
                    <li>Category:</li>
                    <li>Brand:</li>
                    <li>Issue Date:</li>
                </ul>
                <div class="addToCart">
                    <button id="cartAdder">Add to cart <i class="fa-solid fa-cart-shopping"></i></button>
                </div>`
}



function sliderForDetails(images){
    return images[0]
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



function closeDetails(){
    detailsArea.classList.add("hidden")
}



// Search Logic

function search() {
    shopSection.innerHTML = ""; 
    const searchFor = searchWord.value.trim();

    fetch(`https://api.everrest.educata.dev/shop/products/search?keywords=${searchFor}`)
        .then((response) => response.json())
        .then((data) => data.products.forEach(item => shopSection.innerHTML += cardMaker(item)))
        .catch((error) => console.error("Error fetching data:", error));
}

searchWord.addEventListener("keyup", function(event){
    if (event.key === "Enter") {  
        search();  
    }
});

// Categorys Logic

fetch("https://api.everrest.educata.dev/shop/products/categories")
.then(response => response.json())
.then(data => data.forEach(item => {
   categorys.innerHTML += ` <button onclick="filterCategory(${item.id})"><img src="${item.image}" alt="${item.name}">${item.name}</button>`
}))

function filterCategory(id){
    shopSection.innerHTML = ""
    const allItems = document.querySelectorAll('li');
    allItems.forEach(li => li.classList.remove('stayON'));
   fetch(`https://api.everrest.educata.dev/shop/products/category/${id}?page_size=28`)
   .then(response => response.json())
   .then(data => data.products.forEach(item => {
    shopSection.innerHTML += cardMaker(item)
   }))
}

// Sign up logic
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
       }
        data.errorKeys.forEach((error) => errorDetails.innerHTML += `<li>${error}</li>`)
    })
    
}

