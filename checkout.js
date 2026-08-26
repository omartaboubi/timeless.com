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

function placeOrder() {

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