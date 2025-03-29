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
let detailsArea = document.getElementById("detailsArea")
let logedInUserName = document.querySelectorAll(".logInUserName")
let noUserCart = document.querySelector(".no-account")
let noUserCartContent = document.querySelector(".register-or-create")
let userCart = false;





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
        }
    );

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

// Details show logic

let id = sessionStorage.getItem("detailsProductID")

fetch(`https://api.everrest.educata.dev/shop/products/id/${id}`)
    .then((response) => response.json())
    .then((item) => detailsArea.innerHTML = detailsPage(item))
    .catch(() => details.innerHTML = `<img class="notFound" src="./images/Errores-Web-404-403-503-502-401.-Significado-y-soluciones-1 (1).png" alt="404">`)


    
function detailsPage(item){
    return `<div class="left-image">
            <h6 class="display-none" id="${item._id}" style="color: ${item.stock == 0 ? 'red' : '#00F004'};">${item.stock == 0 ? 'Out of stock! <i class="fa-solid fa-x fa-beat" style="color: #ff0000;"></i>' : 'Added to cart! <i class="fa-solid fa-boxes-packing fa-beat" style="color: #00ff04;"></i>'}</h6>
            <button class="sliderButton" id="pre" onclick="sliderPreImage(${item.images})"><i class="fa-solid fa-arrow-left"></i></button>
            <h5>${item.price.discountPercentage == 0 ? "" : `${item.price.discountPercentage}%`} </h5>
            <img id="sliderMainImage" src="${item.images[0]}" alt="${item.title}">
            <button class="sliderButton" id="next" onclick="sliderNextImage(${item.images})"><i class="fa-solid fa-arrow-right"></i></button>
        </div>
        <div class="right-article">
            <article>
                <h1>${item.title}</h1>
                <h2>Price : ${item.price.current}$<span>${item.price.current == item.price.beforeDiscount ? "" : `${item.price.beforeDiscount}$`}</span></h2>
                <div class="details-stars">
                    ${generateStars(item.rating)}
                    <span>${item.rating}</span>
                </div>
                <h3>${item.stock == 0 ? `<span style="color: red;"><i class="fa-solid fa-x" style="color: #ff0000;"></i> Not in stock</span>` : `<span style="color: green;">${item.stock} in stock <i class="fa-solid fa-check"></i></span>`}</h3>
                <div class="item-description">
                    <h3>Description</h3>
                    <p>${item.description}</p>
                </div>
                <div class="comerical">
                    <p><i class="fa-solid fa-calendar-check"></i> ${item.warranty} Year full warranty</p>
                    <p><i class="fa-solid fa-table-cells-row-lock"></i> Secure payment</p>
                    <p><i class="fa-solid fa-truck-fast"></i> Worldwide shipping</p>
                </div>
                <ul>
                    <li>Category: phones</li>
                    <li>Brand: apple</li>
                    <li>Issue Date: 2020-04-12T00:00:00.000Z</li>
                </ul>
                <div class="addToCart">
                    <button id="cartAdder" onclick="buttonCartAdder('${item._id}', ${item.stock})">Add to cart <i class="fa-solid fa-cart-shopping"></i></button>
                </div>
            </article>
        </div>`
}

function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < Math.round(rating); i++) {
        stars += `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>`;
    }
    return stars;
}

// Slider Logic


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


