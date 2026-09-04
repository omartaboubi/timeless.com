// ==========================================
// SUPABASE SETUP
// ==========================================

const SUPABASE_URL = "https://eifopqgdiqmgowyqurpm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZm9wcWdkaXFtZ293eXF1cnBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MjAwNTEsImV4cCI6MjEwNDA5NjA1MX0.Pxp996BTgaLfYww0mJfBvyH-HWNMPuh195pcILgEuXk";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// ==========================================
// GET CART
// ==========================================

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


// DELIVERY PRICE

const deliveryPrice = 7;


// ==========================================
// DISPLAY ORDER
// ==========================================

function displayOrder() {

    const container =
        document.getElementById(
            "checkout-items"
        );

    const subtotalElement =
        document.getElementById(
            "subtotal"
        );

    const totalElement =
        document.getElementById(
            "checkout-total"
        );


    container.innerHTML = "";


    let subtotal = 0;


    // EMPTY BAG

    if (cart.length === 0) {

        container.innerHTML =
            "<p>Your bag is empty.</p>";

        subtotalElement.textContent =
            "0.000 TND";

        totalElement.textContent =
            "0.000 TND";

        return;
    }


    // PRODUCTS

    cart.forEach(function(item) {

        const price =
            Number(item.price);

        subtotal += price;


        const div =
            document.createElement(
                "div"
            );

        div.className =
            "checkout-item";


        div.innerHTML = `

            <span>
                ${item.name}
            </span>

            <span>
                ${price.toFixed(3)} TND
            </span>

        `;


        container.appendChild(div);

    });


    // SUBTOTAL

    subtotalElement.textContent =
        subtotal.toFixed(3) +
        " TND";


    // TOTAL

    const total =
        subtotal + deliveryPrice;


    totalElement.textContent =
        total.toFixed(3) +
        " TND";
}


// ==========================================
// PLACE ORDER
// ==========================================

async function placeOrder() {

    const name =
        document
            .getElementById("name")
            .value
            .trim();


    const phone =
        document
            .getElementById("phone")
            .value
            .trim();


    const address =
        document
            .getElementById("address")
            .value
            .trim();


    const city =
        document
            .getElementById("city")
            .value
            .trim();


    const postal =
        document
            .getElementById("postal")
            .value
            .trim();


    if (
        name === "" ||
        phone === "" ||
        address === "" ||
        city === ""
    ) {

        alert(
            "Please complete all your information."
        );

        return;
    }


    if (cart.length === 0) {

        alert(
            "Your bag is empty."
        );

        return;
    }


    let subtotal = 0;


    cart.forEach(function(item) {

        subtotal +=
            Number(item.price);

    });


    const total =
        subtotal + deliveryPrice;


    const { error } = await supabaseClient
        .from("orders")
        .insert({
            name: name,
            phone: phone,
            address: address,
            city: city,
            postal: postal,
            items: cart,
            subtotal: subtotal,
            delivery: deliveryPrice,
            total: total
        });


    if (error) {

        alert(
            "Something went wrong placing your order, please try again."
        );

        console.error(error);

        return;
    }


    alert(

        "Thank you, " +
        name +
        "! ❤️\n\n" +

        "Your TIMELESS order has been received.\n\n" +

        "Total: " +
        total.toFixed(3) +
        " TND\n\n" +

        "We will contact you at " +
        phone +
        " to confirm your delivery."

    );


    localStorage.removeItem(
        "cart"
    );


    window.location.href =
        "index.html";
}


// ==========================================
// LOAD ORDER
// ==========================================

displayOrder();