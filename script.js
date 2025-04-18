let Items = [];

// Function to add items to the cart
function addToCart(name, price) {
    const index = Items.findIndex(item => item.name === name);
    if (index !== -1) {
        Items[index].quantity += 1;
    } else {
        const item = {
            name: name,
            price: price,
            quantity: 1
        };
        Items.push(item);
    }
    updateCartDisplay();
}

// Function to delete an item from the cart
function deleteFromCart(index) {
    Items.splice(index, 1);
    updateCartDisplay();
}

// Function to update item quantity
function updateQuantity(index, quantity) {
    quantity = parseInt(quantity, 10); // Ensure the quantity is an integer

    // Validate quantity to ensure it doesn't go below 1
    if (isNaN(quantity) || quantity < 1) {
        alert("Quantity must be at least 1.");
        return;
    }
    Items[index].quantity = quantity;
    updateCartDisplay();
}

// Function to handle checkout
function checkout() {
    let totalPrice = 0;
    Items.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    alert(`Total price: Rs ${totalPrice.toFixed(2)}`);
}

// Function to update cart display
function updateCartDisplay() {
    const cartElement = document.getElementById('cart-items');
    cartElement.innerHTML = '';

    Items.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'cart-item';

        li.innerHTML = `
            <span>${item.name} - Rs ${item.price.toFixed(2)} x</span>
            <div class="quantity">
                <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                <input 
                    type="number" 
                    value="${item.quantity}" 
                    min="1" 
                    onchange="updateQuantity(${index}, this.value)">
                <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
            </div>
            <button onclick="deleteFromCart(${index})">Delete</button>
        `;

        cartElement.appendChild(li);
    });
}
