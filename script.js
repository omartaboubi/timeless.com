// ==========================================
// SUPABASE SETUP
// ==========================================

const SUPABASE_URL = "https://eifopqgdiqmgowyqurpm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZm9wcWdkaXFtZ293eXF1cnBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MjAwNTEsImV4cCI6MjEwNDA5NjA1MX0.Pxp996BTgaLfYww0mJfBvyH-HWNMPuh195pcILgEuXk";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


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

async function subscribe() {

    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();

    if (email === "") {
        alert("Please enter your email.");
        return;
    }

    const { error } = await supabaseClient
        .from("subscribers")
        .insert({ email: email });

    if (error) {
        if (error.code === "23505") {
            alert("You're already part of the TIMELESS family! ✨");
        } else {
            alert("Something went wrong, please try again.");
            console.error(error);
        }
        return;
    }

    alert("Welcome to TIMELESS! ✨ Check your inbox soon.");
    emailInput.value = "";
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