// ==========================================
// TIMELESS PRODUCTS
// ==========================================

const products = {


    // ==========================================
    // PRODUCT 1
    // ==========================================

    bracelet1: {

        name:
            "Hammered Cuff Bracelet with Engraving",

        price:
            20.000,

        category:
            "BRACELETS",

        description:
            "A timeless hammered cuff bracelet featuring an elegant engraved detail.",

        images: [

            "773135849_28650438771220749_6873074504819029169_n.jpg",

            "Bracelet manchette en argent sterling gravé _ bijoux de mariage personnalisés en argent 925 martelé.jpg",

            "5be927357d0f12d9ff7bfc740c489c66.jpg",

            "774744361_1760102535092611_3224228662679852210_n.jpg"

        ],

        details: [

            "Hammered finish",

            "Engraved detail",

            "Timeless design",

            "Elegant style"

        ]

    },


    // ==========================================
    // PRODUCT 2
    // ==========================================

    necklace1: {

        name:
            "Rope Chain Necklace",

        price:
            14.000,

        category:
            "NECKLACES",

        description:
            "A classic rope chain necklace designed to bring a timeless finish to your everyday style.",

        images: [

            "864831934681442016.jpg",

            "1142788474361980208.jpg",

            "773908519_885779744328518_7055196251377693249_n.jpg",
            "Um design clássico que valoriza o seu visual com….jpg"

        
        ],

        details: [

            "Rope chain design",

            "Classic finish",

            "Versatile style",

            "Perfect for everyday wear"

        ]

    },


    // ==========================================
    // PRODUCT 3
    // ==========================================

    bracelet2: {

        name:
            "Tennis Bracelet",

        price:
            25.000,

        category:
            "BRACELETS",

        description:
            "A sophisticated tennis bracelet designed to add elegance and sparkle to every occasion.",

        images: [

            "774593286_4411558805776914_7859509331527275788_n (1).png",

            "774510577_1745789213340640_2106112490075338320_n.png",

            "774466756_1450687283747080_7391769717909611132_n.png",

            "a553335aaa2cd8e6d47b089b523ed191.jpg"

        ],

        details: [

            "Classic tennis design",

            "Elegant finish",

            "Timeless style",

            "Perfect for special occasions"

        ]

    },


    // ==========================================
    // PRODUCT 4
    // ==========================================

    bracelet3: {

        name:
            "Islamic Bracelet",

        price:
            25.000,

        category:
            "BRACELETS",

        description:
            "A beautiful Islamic-inspired bracelet with an elegant and timeless design.",

        images: [

            "BRACELET AYAT AL KURSI HOMME - Noir.jpg",

            "775940901_27830310596634355_5591918500902639969_n.jpg",

            "775468128_964842406653695_282708898472657784_n.jpg",

            "775424331_1780903716264502_2292880215808097477_n.jpg"

        ],

        details: [

            "Islamic-inspired design",

            "Elegant finish",

            "Timeless style",

            "Perfect for everyday wear"

        ]

    }

};


// ==========================================
// GET PRODUCT ID
// ==========================================

const params =
    new URLSearchParams(
        window.location.search
    );

const productId =
    params.get("id");

const product =
    products[productId];


// ==========================================
// DISPLAY PRODUCT
// ==========================================

if (product) {

    document
        .getElementById("product-name")
        .textContent =
        product.name;


    document
        .getElementById("product-price")
        .textContent =
        product.price.toFixed(3)
        + " TND";


    document
        .getElementById("category")
        .textContent =
        product.category;


    document
        .getElementById("description")
        .textContent =
        product.description;



    // MAIN PHOTO

    document
        .getElementById("main-image")
        .src =
        product.images[0];


    // THUMBNAILS

    document
        .getElementById("thumb1")
        .src =
        product.images[0];


    document
        .getElementById("thumb2")
        .src =
        product.images[1];


    document
        .getElementById("thumb3")
        .src =
        product.images[2];


    document
        .getElementById("thumb4")
        .src =
        product.images[3];



    // DETAILS

    const details =
        document.getElementById(
            "details"
        );


    details.innerHTML = "";


    product.details.forEach(
        function(detail) {

            const li =
                document.createElement(
                    "li"
                );

            li.textContent =
                detail;

            details.appendChild(li);

        }
    );

}


// ==========================================
// CHANGE PHOTO
// ==========================================

function changeImage(image) {

    document
        .getElementById("main-image")
        .src =
        image;

}


// ==========================================
// ADD TO BAG
// ==========================================

function addProductToBag() {

    if (!product) {
        return;
    }


    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    cart.push({

        name:
            product.name,

        price:
            Number(product.price)

    });


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(
        product.name +
        " added to your bag 🛍️"
    );

}