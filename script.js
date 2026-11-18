
/* =========================================
   MARKETX — MAIN JAVASCRIPT
========================================= */


/* =========================================
   1. TOP TAB SWITCHING
   Market | Wallet | Tools | Profile
========================================= */

const topTabs = document.querySelectorAll(".top-tab");
const tabPanels = document.querySelectorAll(".tab-panel");

topTabs.forEach(function(tab) {

    tab.addEventListener("click", function() {

        const targetPanel = tab.dataset.tab;

        // Remove active class from all tabs
        topTabs.forEach(function(item) {
            item.classList.remove("active");
        });

        // Hide all panels
        tabPanels.forEach(function(panel) {
            panel.classList.remove("active");
        });

        // Activate selected tab
        tab.classList.add("active");

        const selectedPanel = document.getElementById(targetPanel);

        if (selectedPanel) {
            selectedPanel.classList.add("active");
        }

    });

});


/* =========================================
   2. WATCHLIST FILTER
========================================= */

const watchTabs = document.querySelectorAll(".watch-tab");
const watchStocks = document.querySelectorAll(".watch-stock");

watchTabs.forEach(function(tab) {

    tab.addEventListener("click", function() {

        watchTabs.forEach(function(item) {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        const filter = tab.dataset.filter;

        watchStocks.forEach(function(stock) {

            if (!filter || filter === "all") {
                stock.style.display = "flex";
            }

            else if (filter === "gain") {
                stock.style.display =
                    stock.classList.contains("gain") ? "flex" : "none";
            }

            else if (filter === "lose") {
                stock.style.display =
                    stock.classList.contains("lose") ? "flex" : "none";
            }

            else if (filter === "viewed") {
                stock.style.display = "flex";
            }

        });

    });

});


/* =========================================
   3. CHART PERIOD BUTTONS
========================================= */

const chartButtons = document.querySelectorAll(".chart-buttons button");

chartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        chartButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        console.log("Selected chart period:", button.textContent.trim());

    });

});


/* =========================================
   4. MARKET PERIOD SELECT
========================================= */

const periodSelect = document.getElementById("periodSelect");

if (periodSelect) {

    periodSelect.addEventListener("change", function() {

        console.log("Selected market period:", periodSelect.value);

    });

}


/* =========================================
   5. STOCK DATA — DEMO
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
    },

    {
        name: "ICICIBANK",
        price: "₹1,198.50"
    },

    {
        name: "ITC",
        price: "₹412.80"
    }

];


/* =========================================
   6. FIND STOCK FUNCTION
========================================= */

function findStock(search) {

    search = search.toUpperCase().trim();

    return stocks.find(function(stock) {

        return stock.name.includes(search);

    });

}


/* =========================================
   7. AI SEARCH
========================================= */

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            const query = searchInput.value.trim();

            if (query === "") {

                alert("Please enter a stock name.");

                return;

            }

            const result = findStock(query);

            if (result) {

                alert(
                    "Stock Found: " + result.name +
                    "\nDemo Price: " + result.price
                );

            } else {

                alert(
                    "MarketX could not find " + query +
                    " in its current demo stock list."
                );

            }

        }

    });


    // Search input feedback

    searchInput.addEventListener("input", function() {

        const query = searchInput.value.trim();

        if (query.length >= 2) {

            const result = findStock(query);

            searchInput.style.borderColor =
                result ? "#35cf91" : "#ff657a";

        } else {

            searchInput.style.borderColor = "";

        }

    });

}


/* =========================================
   8. SIDEBAR NAVIGATION
========================================= */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.forEach(function(item) {
            item.classList.remove("active");
        });

        link.classList.add("active");

        // Do not prevent default.
        // This allows the separate HTML pages to open.

    });

});


/* =========================================
   9. CIRCLE BUTTON ANIMATION
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
   10. NUMBER ANIMATION
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
   11. WALLET — DEMO BALANCE
========================================= */

const demoBalance = document.getElementById("demoBalance");

if (demoBalance) {

    demoBalance.textContent = "₹50,000.00";

}


/* =========================================
   12. SIP CALCULATOR
========================================= */

const sipButton = document.getElementById("calculateSIP");

if (sipButton) {

    sipButton.addEventListener("click", function() {

        const amount = Number(
            document.getElementById("sipAmount")?.value
        );

        const rate = Number(
            document.getElementById("sipRate")?.value
        );

        const years = Number(
            document.getElementById("sipYears")?.value
        );

        const resultBox = document.getElementById("sipResult");

        if (
            !Number.isFinite(amount) ||
            !Number.isFinite(rate) ||
            !Number.isFinite(years) ||
            amount <= 0 ||
            rate < 0 ||
            years <= 0
        ) {

            if (resultBox) {
                resultBox.textContent =
                    "Please enter valid positive values.";
            }

            return;

        }

        const months = years * 12;
        const monthlyRate = rate / 12 / 100;

        let futureValue;

        if (monthlyRate === 0) {

            futureValue = amount * months;

        } else {

            futureValue =
                amount *
                (
                    (Math.pow(1 + monthlyRate, months) - 1) /
                    monthlyRate
                ) *
                (1 + monthlyRate);

        }

        if (resultBox) {

            resultBox.textContent =
                "Estimated value: ₹" +
                futureValue.toLocaleString("en-IN", {
                    maximumFractionDigits: 2
                });

        }

    });

}


/* =========================================
   13. COMPOUND INTEREST CALCULATOR
========================================= */

const compoundButton = document.getElementById("calculateCompound");

if (compoundButton) {

    compoundButton.addEventListener("click", function() {

        const principal = Number(
            document.getElementById("compoundAmount")?.value
        );

        const rate = Number(
            document.getElementById("compoundRate")?.value
        );

        const years = Number(
            document.getElementById("compoundYears")?.value
        );

        const resultBox = document.getElementById("compoundResult");

        if (
            !Number.isFinite(principal) ||
            !Number.isFinite(rate) ||
            !Number.isFinite(years) ||
            principal <= 0 ||
            rate < 0 ||
            years <= 0
        ) {

            if (resultBox) {
                resultBox.textContent =
                    "Please enter valid positive values.";
            }

            return;

        }

        const finalAmount =
            principal * Math.pow(1 + rate / 100, years);

        const interest = finalAmount - principal;

        if (resultBox) {

            resultBox.textContent =
                "Estimated amount: ₹" +
                finalAmount.toLocaleString("en-IN", {
                    maximumFractionDigits: 2
                }) +
                " | Estimated interest: ₹" +
                interest.toLocaleString("en-IN", {
                    maximumFractionDigits: 2
                });

        }

    });

}


/* =========================================
   14. PROFILE SETTINGS
========================================= */

const saveProfileButton = document.getElementById("saveProfile");

if (saveProfileButton) {

    saveProfileButton.addEventListener("click", function() {

        const name = document.getElementById("profileName")?.value.trim();

        const email = document.getElementById("profileEmail")?.value.trim();

        const message = document.getElementById("profileMessage");

        if (!name || !email) {

            if (message) {
                message.textContent =
                    "Please fill in your name and email.";
            }

            return;

        }

        if (message) {

            message.textContent =
                "Profile changes updated in this demo.";

        }

    });

}


/* =========================================
   15. PAGE LOAD
========================================= */

window.addEventListener("load", function() {

    const holdingValue = document.querySelector(".holding-card h2");

    if (holdingValue) {

        holdingValue.innerText = "₹12,304.11";

    }

});
