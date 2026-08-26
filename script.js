let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// ADD TO BAG

function addToCart(name, price) {

    cart.push({
        name: name,
        price: Number(price)
    });

    saveCart();

    updateCart();

    openCart();
}


// SAVE CART

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


// UPDATE CART

function updateCart() {

    const items =
        document.getElementById("cart-items");

    const count =
        document.getElementById("cart-count");

    const totalElement =
        document.getElementById("total");

    if (!items) return;

    items.innerHTML = "";

    let total = 0;


    cart.forEach(function(item, index) {

        total += Number(item.price);

        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <span>
                ${item.name}
            </span>

            <span>
                ${Number(item.price).toFixed(3)} TND

                <button onclick="removeItem(${index})">
                    ×
                </button>
            </span>
        `;

        items.appendChild(div);

    });


    count.textContent = cart.length;

    totalElement.textContent =
        total.toFixed(3) + " TND";
}


// REMOVE ITEM

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    updateCart();
}


// OPEN CART

function openCart() {

    document
        .getElementById("cart")
        .classList.add("open");
}


// CLOSE CART

function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("open");
}


// SHOP NOW

function goToShop() {

    document
        .getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// NEWSLETTER

function subscribe() {

    const email =
        document.getElementById("email").value.trim();

    if (email === "") {

        alert("Please enter your email.");

        return;
    }

    alert("Welcome to TIMELESS! ✨");

    document.getElementById("email").value = "";
}


// CHECKOUT

function checkout() {

    if (cart.length === 0) {

        alert("Your bag is empty.");

        return;
    }

    saveCart();

    window.location.href = "checkout.html";
}


// LOAD

document.addEventListener(
    "DOMContentLoaded",
    function() {
        updateCart();
    }
);