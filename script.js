// 1. Xogta Alaabta (Products Data)
const products = [
    { id: 1, name: "Flower Pot", price: 10, img: "images/p1.png" },
    { id: 2, name: "White Rose", price: 15, img: "images/p2.png" },
    { id: 3, name: "Sun Flower", price: 12, img: "images/p3.png" },
    { id: 4, name: "Flower Pot", price: 20, img: "images/p4.png" },
    { id: 5, name: "Pink Flower", price: 25, img: "images/p5.png" },
    { id: 6, name: "Flower Pot", price: 16, img: "images/p6.png" }, 
    { id: 7, name: "Flower Pot", price: 8, img: "images/p7.png" },
    { id: 8, name: "Flower Pot", price: 19, img: "images/p8.png" },
    { id: 9, name: "Flower Pot", price: 30, img: "images/p9.png" },
    { id: 10, name: "Flower Pot", price: 27, img: "images/p10.png" }
];


let cart = JSON.parse(localStorage.getItem('flowers_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    const productGrid = document.getElementById('product-grid');
    if (productGrid) displayProducts();

    if (document.getElementById('cart-items')) renderCart();
    
    const totalDisplay = document.getElementById('checkout-total');
    if (totalDisplay) {
        let total = cart.reduce((sum, item) => sum + item.price, 0);
        totalDisplay.innerText = total;
    }

    const checkoutLink = document.querySelector('a[href="checkout.html"]');
    if (checkoutLink) {
        checkoutLink.addEventListener('click', (e) => {
            if (cart.length === 0) {
                e.preventDefault();
                showGlobalError("Weli wax maadan iibsan! Fadlan dambiisha wax ku dar.");
            }
        });
    }
});

function validateContact(event) {
    event.preventDefault();

    const nameInput = document.getElementById('name').value;
    const feedback = document.getElementById('feedback');
    
    const namePattern = /^[a-zA-Z\s]+$/;

   
    if (!namePattern.test(nameInput)) {
        feedback.innerText = "Magacaaga saxda ah geli (Xarfo kaliya)!";
        feedback.style.color = "red";
        
        
        document.getElementById('name').classList.add('error-shake');
        setTimeout(() => document.getElementById('name').classList.remove('error-shake'), 400);
        return false;
    }

    if (nameInput.trim().length < 3) {
        feedback.innerText = "Magacaaga saxda ah geli (Ugu yaraan 3 xarfo)!";
        feedback.style.color = "red";
        return false;
    }

   
    feedback.innerText = "Waad ku mahadsantahay xiriirkaaga!";
    feedback.style.color = "green";

   
    setTimeout(() => {
        document.getElementById('contactForm').reset();
        feedback.innerText = "";
    }, 2000);

    

    setTimeout(() => {
        document.getElementById('contact-name').value = "";
        document.getElementById('contact-email').value = "";
        document.getElementById('contact-msg').value = "";
        feedback.innerText = "";
    }, 2000);
}

function displayProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">$${p.price}</p>
            <button class="btn-add" onclick="addToCart(${p.id})">Ku dar Dambiisha</button>
            <div id="msg-${p.id}" class="status-msg"></div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('flowers_cart', JSON.stringify(cart));
    updateCartCount();

    const msgDiv = document.getElementById(`msg-${productId}`);
    if (msgDiv) {
        msgDiv.innerText = "Waa lagu daray!";
        msgDiv.style.color = "green";
        setTimeout(() => { msgDiv.innerText = ""; }, 3000);
    }
}


function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) countElement.innerText = cart.length;
}


function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Dambiishaadu waa madhan tahay.</p>";
        totalElement.innerText = "0";
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.price, 0);
    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item" style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee;">
            <span>${item.name}</span>
            <span>$${item.price}</span>
            <button onclick="removeFromCart(${index})" style="color:red; border:none; background:none; cursor:pointer;">X</button>
        </div>
    `).join('');
    totalElement.innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('flowers_cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function processOrder(event) {
    event.preventDefault();
    
    const checkoutMsg = document.getElementById('checkout-msg');
    const nameInput = document.getElementById('full-name').value;
    const namePattern = /^[a-zA-Z\s]+$/;

    if (!namePattern.test(nameInput)) {
        checkoutMsg.innerText = "Khalad: Magaca nambar ama calaamad laguma qori karo!";
        checkoutMsg.style.color = "red";
        return;
    }

    if (cart.length === 0) {
        showGlobalError("Dambiishaadu waa madhan tahay!");
        return;
    }

    checkoutMsg.innerText = "Dalabkaaga waa la farsameeyay! Waad ku mahadsantahay iibsashada.";
    checkoutMsg.style.color = "green";
    
    setTimeout(() => {
        localStorage.removeItem('flowers_cart');
        window.location.href = "index.html";
    }, 3000);
}


function showGlobalError(text) {
    let errorDiv = document.getElementById('global-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'global-error';
        errorDiv.className = "error-banner";
        document.body.prepend(errorDiv);
    }
    errorDiv.innerText = text;
    setTimeout(() => { errorDiv.innerText = ""; }, 3000);
}