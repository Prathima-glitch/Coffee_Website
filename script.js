let navbar = document.querySelector('.navbar');
let cartItem = document.querySelector('.cart-items-container');

// Toggle navbar and cart items container
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    cartItem.classList.remove('active');
}

document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
}

// Close navbar and cart items container on window scroll
window.onscroll = () => {
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

// Function to add item to cart
const cartItems = [];

function addToCart(button) {
    const productElement = button.closest('.product-item');
    const productName = productElement.querySelector('.productname').textContent;
    const productPrice = parseFloat(productElement.querySelector('.price span').textContent);
    const productQuantity = parseInt(productElement.querySelector('.product-quantity').value);

    const cartItem = {
        name: productName,
        price: productPrice,
        quantity: productQuantity,
        subtotal: productPrice * productQuantity
    };

    cartItems.push(cartItem);
    updateCart();
}

// Function to update cart display
function updateCart() {
    const cartItemsBody = document.getElementById('cart-items-body');
    cartItemsBody.innerHTML = '';

    let totalPrice = 0;

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>&#8377; ${item.price.toFixed(2)}</td>
            <td>&#8377; ${item.subtotal.toFixed(2)}</td>
        `;
        cartItemsBody.appendChild(row);
        totalPrice += item.subtotal;
    });

    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="3"><strong>Total</strong></td>
        <td><strong>&#8377; ${totalPrice.toFixed(2)}</strong></td>
    `;
    cartItemsBody.appendChild(totalRow);

    document.getElementById('total-price').textContent = `&#8377; ${totalPrice.toFixed(2)}`;

    // Save cart items to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Function to show cart items on page load
$(document).ready(function() {
    showCartItems();
});

document.querySelector('#empty-cart-btn').onclick = emptyCart;

function emptyCart() {
    // Clear cartItems array
    cartItems.length = 0; // This clears the array in memory

    // Alternatively, if you store cart items in localStorage:
    localStorage.removeItem('cart');

    // Update the cart display
    showCartItems();
}

function showCartItems() {
    const cartItemsFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('#cart-table tbody');

    cartTableBody.innerHTML = '';

    if (cartItemsFromStorage.length > 0) {
        let totalAmount = 0;

        cartItemsFromStorage.forEach(item => {
            const subtotal = item.price * item.quantity;
            totalAmount += subtotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>₹${subtotal.toFixed(2)}</td>
                <td><button onclick="removeFromCart('${item.name}')">Remove</button></td>
            `;
            cartTableBody.appendChild(row);
        });

        document.getElementById('totalAmount').textContent = `Total: ₹${totalAmount.toFixed(2)}`;
    } else {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="5">Your cart is empty</td>';
        cartTableBody.appendChild(emptyRow);
        document.getElementById('totalAmount').textContent = 'Total: ₹0.00';
    }
}


// Function to handle checkout
function checkout() {
    window.open('payment.html', '_blank');
}

// Attach click event listener to checkout button
document.querySelector('#checkout-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission behavior if any
    checkout();
});




