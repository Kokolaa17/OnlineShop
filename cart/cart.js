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
let checkOutText = document.getElementById("checkOutText")
let checkoutMessage = document.querySelector(".checkoutMessage")



// Basic Functions

checkUserStatus();

function indexPage(){
    window.location.href= "../index.html"
}

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
        .then(data => logedInUserName.forEach(names => names.innerHTML = `${data.firstName} <img src="${data.avatar}" alt="${data.firstName} Avatar">`))
        .catch(error => console.log(error))
    }
}

function logOutLogic() {
    Cookies.remove("userToken");
    checkUserStatus();
    displayText.innerHTML = ""
    accountCreationForm.reset()
    window.location.href = "../index.html"
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
        .then(data => logedInUserName.forEach(names => names.innerHTML = `${data.firstName} <img src="${data.avatar}" alt="${data.firstName} Avatar">`))
        .catch(error => console.log(error))
    }
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
    totalPrice.innerHTML = `${data.total.price.current}$`
    data.products.forEach(item => displayProducts(item.productId, item.quantity))
})
.catch(error => console.log(error))

function displayProducts(id, quantity){
    fetch(`https://api.everrest.educata.dev/shop/products/id/${id}`)
    .then(response => response.json())
    .then(data => cartPlace.innerHTML += productCardMaker(data, quantity))
    .catch(error => console.log(error))
}

function productCardMaker(data, quantity){
    return `<div class="product" id="${data._id}">
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
                <button onclick="decreaseProductQuantity('${data._id}', '${data.stock}')"><i class="fa-solid fa-minus"></i></button>
                <span id="${data._id}quantitiy">${quantity}</span>
                <button onclick="increaseProductQuantity('${data._id}', '${data.stock}')"><i class="fa-solid fa-plus"></i></button>
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
        let deleteProduct = document.getElementById(`${productID}`)
        if (deleteProduct) {
            deleteProduct.remove();
        }
        totalPrice.innerHTML = `${data.total.price.current}$`
    })
    .catch(error => console.log(error))
}

// Quantity logic

function increaseProductQuantity(productID, stock) {
    let productQuantity = document.getElementById(`${productID}quantitiy`);
    let itemQuantity = parseInt(productQuantity.innerHTML);

    if(itemQuantity == stock){
        itemQuantity = stock
    }
    else{
        itemQuantity++; 
    }
    
    productQuantity.innerHTML = itemQuantity;
    

    fetch("https://api.everrest.educata.dev/shop/cart/product", {
        method: "PATCH",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${Cookies.get("userToken")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({  
            id: productID,  
            quantity: itemQuantity  
        })
    })
    .then(response => response.json())
    .then(data => {
        let productQuantity = document.getElementById(`${productID}quantitiy`);
        productQuantity.innerHTML = `${itemQuantity}`;
          
        if (data.total && data.total.price) {
            totalPrice.innerHTML = `${data.total.price.current}$`;
        }
    })
    .catch(error => console.error("Fetch error:", error));
}


function decreaseProductQuantity(productID){
    let productQuantity = document.getElementById(`${productID}quantitiy`)
    let itemQuantity = parseInt(productQuantity.innerHTML);
    
    if(itemQuantity == "1"){
        itemQuantity = 1
    }
    else {
        itemQuantity--
    }

    productQuantity.innerHTML = itemQuantity
    

    fetch("https://api.everrest.educata.dev/shop/cart/product",{
        method: "PATCH",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${Cookies.get("userToken")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({  
            id: productID,  
            quantity: itemQuantity  
        })
    })
    .then(response => response.json())
    .then(data => {
        let productQuantity = document.getElementById(`${productID}quantitiy`)
        productQuantity.innerHTML = `${itemQuantity}`
        totalPrice.innerHTML = `${data.total.price.current}$`
    })
    .catch(error => console.log(error))
}

// CheckOut logic

function checkOut(){
    checkoutMessage.classList.remove("display-none")
    setTimeout(() => {
        checkoutMessage.classList.add("display-none")
    }, 3000);
    totalPrice.innerHTML = "";
    let products = document.querySelectorAll(".product")
    products.forEach(product => product.remove())
    fetch("https://api.everrest.educata.dev/shop/cart/checkout",{
        method: "POST",
        headers: {
            accept: "*/*",
            Authorization: `Bearer ${Cookies.get("userToken")}`
        }       
    })
    .then(response => response.json())
    .then(data => {
        if ("message" in data) {
            checkOutText.innerHTML = `${data.message.split("sold.")[0] + "sold."} <i class="fa-solid fa-check fa-beat" style="color: #66ff00;"></i>`;
        }
        else {
            checkOutText.innerHTML = `${data.error} <i class="fa-solid fa-circle-exclamation fa-beat" style="color: #ff000d;"></i>`
        }
    })
    .catch(error => console.log(error))
}


