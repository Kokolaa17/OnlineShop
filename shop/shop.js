// Get Elemets
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
let sortOptions = document.getElementById("sortOptions")
let filterIcon1 = document.getElementById("filterIcon1")
let filterIcon2 = document.getElementById("filterIcon2")
let filterIcon3 = document.getElementById("filterIcon3")
let filterIcon4 = document.getElementById("filterIcon4")
let filterIcon5 = document.getElementById("filterIcon5")
let brandNames = document.getElementById("brandNames")
let searchWord = document.getElementById("search")
let minPrice = document.getElementById("minRange")
let maxPrice = document.getElementById("maxRange")
let priceErrorText = document.getElementById("priceErrorText")
let starsFilter = document.querySelectorAll(".stars-filter")
let sort = document.getElementById("SortBy")
let logedInUserName = document.querySelectorAll(".logInUserName")
let noUserCart = document.querySelector(".no-account")
let noUserCartContent = document.querySelector(".register-or-create")






// Basic Functions

checkUserStatus();

function userPage(){
   window.location.href = "../userInfo/userInfo.html"
}

function goToCart(){
    window.location.href = "../cart/cart.html"
}

function indexPage(){
    window.location.href= "../index.html"
}

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

function showSort(){
    sortOptions.classList.toggle("display-none")
    if(filterIcon5.innerHTML == "+"){
        filterIcon5.innerHTML = `<i class="fa-solid fa-minus" style="color: #ffffff;"></i>`
    }
    else{
        filterIcon5.innerHTML = `+`
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

    if(token){
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
                <h6 class="display-none" id="${item._id}" style="color: ${item.stock == 0 ? 'red' : '#00F004'};">${item.stock == 0 ? 'Out of stock! <i class="fa-solid fa-x fa-beat" style="color: #ff0000;"></i>' : 'Added to cart! <i class="fa-solid fa-boxes-packing fa-beat" style="color: #00ff04;"></i>'}</h6>
                <h3>${item.price.current}$ <span>${discountPrice(item.price.current, item.price.beforeDiscount)}</span></h3>
                <img src="${item.thumbnail}" alt="${item.title}">
                <h2>${item.title}</h2>
                <div class="stars">
                    ${generateStars(item.rating)}
                </div>
                <div class="action-buttons">
                    <button id="cartButton" onclick="buttonCartAdder('${item._id}')">Add To Cart <i class="fa-solid fa-cart-shopping"></i></button>
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
.then(response => response.json())
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

// Price Filter Logic 

function filterByPrice() {
    let min = Number(minPrice.value)
    let max = Number(maxPrice.value) 

    if (min > max) {
        priceErrorText.innerHTML = `Min price should be less than max <i class="fa-solid fa-circle-exclamation fa-beat" style="color: #ff0000;"></i>`;
        return; 
    }
    else if(min == 0) {
        priceErrorText.innerHTML = `Min price should be atleast 1 <i class="fa-solid fa-circle-exclamation fa-beat" style="color: #ff0000;"></i>`;
    }
     else {
        priceErrorText.innerHTML = ""; 
    }

    fetch(`https://api.everrest.educata.dev/shop/products/search?page_size=38&price_min=${min}&price_max=${max}`)
    .then(response => response.json())
    .then(data => {
        cardsArea.innerHTML = ""; 

        if (data.products.length === 0) {
            cardsArea.innerHTML = `<img src="../images/product-not-found.png" alt="product-not-found">`;
            return; 
        }

        data.products.forEach(item => {
            cardsArea.innerHTML += cardMaker(item);
        });
    })
}

// Rating filter logic

function ratingFilterFive() {
    cardsArea.innerHTML = ""
    fetch("https://api.everrest.educata.dev/shop/products/search?page_size=38&rating=4.5")
    .then(response => response.json())
    .then(data => data.products.forEach(item => cardsArea.innerHTML += cardMaker(item)))
}

function ratingFilterFour() {
    cardsArea.innerHTML = ""
    fetch("https://api.everrest.educata.dev/shop/products/search?page_size=38&rating=3.5")
    .then(response => response.json())
    .then(data => data.products.forEach(item => cardsArea.innerHTML += cardMaker(item)))
}

function ratingFilterThree() {
    fetch("https://api.everrest.educata.dev/shop/products/search?page_size=38&rating=2.6")
    .then(response => response.json())
    .then(data => data.products.forEach(item => cardsArea.innerHTML += cardMaker(item)))
}

function ratingFilterTwo() {
    fetch("https://api.everrest.educata.dev/shop/products/search?page_size=38&rating=1.6")
    .then(response => response.json())
    .then(data => data.products.forEach(item => cardsArea.innerHTML += cardMaker(item)))
}

function ratingFilterOne() {
    fetch("https://api.everrest.educata.dev/shop/products/search?page_size=38&rating=1")
    .then(response => response.json())
    .then(data => data.products.forEach(item => cardsArea.innerHTML += cardMaker(item)))
}

// Sort by logic 

function sortBy() {
    const sortValue = document.getElementById('SortBy').value;

    cardsArea.innerHTML = "";

    fetch(`https://api.everrest.educata.dev/shop/products/search?page_size=38&sort_by=${sortValue}`)
        .then(response => response.json()) 
        .then(data => {
            data.products.forEach(item => {
                cardsArea.innerHTML += cardMaker(item);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error); 
        });
}

// Show Details logic

function showDetails(id){
    sessionStorage.setItem("detailsProductID", id);  
    window.location.href = "../details/details.html"; 
}

// Cart adder function 

// Add to cart logic 

function buttonCartAdder(id) {
    if(Cookies.get("userToken")){
        let cardInfo = {
            id: id,
            quantity: 1,
          };
    
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


