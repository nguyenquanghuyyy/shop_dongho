let slider = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let dots = document.querySelectorAll(".slider .dots li");

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function () {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
};
prev.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
};
let refreshInterval = setInterval(() => {
    next.click();
}, 3000);
function reloadSlider() {
    slider.style.left = -items[active].offsetLeft + "px";
    //
    let last_active_dot = document.querySelector(".slider .dots li.active");
    last_active_dot.classList.remove("active");
    dots[active].classList.add("active");

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 3000);
}

dots.forEach((li, key) => {
    li.addEventListener("click", () => {
        active = key;
        reloadSlider();
    });
});
window.onresize = function (event) {
    reloadSlider();
};
/* cart */
function toggleCartMenu() {
    var cartMenu = document.getElementById("cartMenu");
    if (cartMenu.style.display === "block") {
        cartMenu.style.display = "none";
    } else {
        cartMenu.style.display = "block";
    }
}

function updateCartCount() {
    var cartItems = document.querySelectorAll(".cart-item");
    var totalCount = 0;

    cartItems.forEach(function (item) {
        var quantityInput = item.querySelector(".cart-item-quantity input");
        totalCount += parseInt(quantityInput.value);
    });

    document.getElementById("cartCount").innerText = totalCount;
}
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("cart-item-quantity-decrease")) {
        var input = event.target.nextElementSibling;
        if (input.value > 1) {
            input.value = parseInt(input.value) - 1;
            updateCartCount();
        }
    }

    if (event.target.classList.contains("cart-item-quantity-increase")) {
        var input = event.target.previousElementSibling;
        input.value = parseInt(input.value) + 1;
        updateCartCount();
    }
});

document.addEventListener("input", function (event) {
    if (event.target.closest(".cart-item-quantity input")) {
        updateCartCount();
    }
});