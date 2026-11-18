
/* =========================================
   MARKETX JAVASCRIPT
========================================= */


/* =========================================
   TAB SWITCHING
========================================= */

const tabs = document.querySelectorAll(".tab");

tabs.forEach(function(tab) {

    tab.addEventListener("click", function() {

        tabs.forEach(function(item) {
            item.classList.remove("active");
        });

        tab.classList.add("active");

    });

});


/* =========================================
   WATCHLIST FILTER
========================================= */

const watchTabs = document.querySelectorAll(".watch-tab");

watchTabs.forEach(function(tab) {

    tab.addEventListener("click", function() {

        watchTabs.forEach(function(item) {
            item.classList.remove("active");
        });

        tab.classList.add("active");

    });

});


/* =========================================
   CHART PERIOD BUTTONS
========================================= */

const chartButtons = document.querySelectorAll(".chart-buttons button");

chartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        chartButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

    });

});


/* =========================================
   PORTFOLIO PERIOD SELECT
========================================= */

const periodSelect = document.getElementById("periodSelect");

if (periodSelect) {

    periodSelect.addEventListener("change", function() {

        console.log("Selected period:", periodSelect.value);

    });

}


/* =========================================
   AI SEARCH
========================================= */

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            const query = searchInput.value.trim();

            if (query === "") {

                alert("Please enter a question or stock name.");

                return;

            }

            const result = findStock(query);

            if (result) {

                alert(
                    "Stock Found: " + result.name +
                    "\nPrice: " + result.price
                );

            } else {

                alert(
                    "MarketX is analyzing: " + query +
                    "\n\nNo matching stock found in the current demo list."
                );

            }

        }

    });

}


/* =========================================
   STOCK DATA
========================================= */

const stocks = [

    {
        name: "RELIANCE",
        price: "₹1,421.30"
    },

    {
        name: "TCS",
        price: "₹3,982.15"
    },

    {
        name: "HDFCBANK",
        price: "₹1,006.70"
    },

    {
        name: "INFY",
        price: "₹1,487.40"
    }

];


/* =========================================
   FIND STOCK FUNCTION
========================================= */

function findStock(search) {

    search = search.toUpperCase().trim();

    const result = stocks.find(function(stock) {

        return stock.name.includes(search);

    });

    return result;

}


/* =========================================
   SEARCH SUGGESTION
========================================= */

if (searchInput) {

    searchInput.addEventListener("input", function() {

        const search = searchInput.value.trim();

        if (search.length >= 2) {

            const result = findStock(search);

            if (result) {

                searchInput.style.border =
                    "1px solid rgba(100,220,150,0.5)";

            } else {

                searchInput.style.border =
                    "1px solid rgba(220,100,120,0.5)";

            }

        } else {

            searchInput.style.border = "";

        }

    });

}


/* =========================================
   SIDEBAR NAVIGATION
========================================= */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.forEach(function(item) {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


/* =========================================
   CIRCLE BUTTON ANIMATION
========================================= */

const circleButtons = document.querySelectorAll(".circle-button");

circleButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        button.style.transform = "scale(0.90)";

        setTimeout(function() {

            button.style.transform = "scale(1)";

        }, 120);

    });

});


/* =========================================
   NUMBER ANIMATION
========================================= */

function animateNumber(element, target) {

    if (!element) return;

    let current = 0;

    const increment = target / 50;

    const interval = setInterval(function() {

        current += increment;

        if (current >= target) {

            current = target;

            clearInterval(interval);

        }

        element.innerText =
            "₹" + current.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

    }, 20);

}


/* =========================================
   PAGE LOAD
========================================= */

window.addEventListener("load", function() {

    const holdingValue = document.querySelector(".holding-card h2");

    if (holdingValue) {

        holdingValue.innerText = "₹12,304.11";

    }

});