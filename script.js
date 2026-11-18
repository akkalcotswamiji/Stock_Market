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

/* =========================================
   MARKET VALUE — PERIOD SELECTOR
   Illustrative demo values, not live prices
========================================= */

const marketValue = document.getElementById("marketValue");
const marketChange = document.getElementById("marketChange");
const marketPeriod = document.getElementById("periodSelect");

const marketData = {
    "1D": {
        value: 12304.11,
        change: 2.45
    },
    "1W": {
        value: 12680.50,
        change: 3.12
    },
    "1M": {
        value: 13120.75,
        change: 5.36
    },
    "1Y": {
        value: 14850.25,
        change: 12.80
    }
};

function updateMarket(period) {

    const data = marketData[period];

    if (!data || !marketValue || !marketChange) return;

    marketValue.textContent = "₹" + data.value.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const arrow = data.change >= 0 ? "↗ " : "↘ ";

    marketChange.textContent = arrow + Math.abs(data.change).toFixed(2) + "%";

    marketChange.classList.toggle("positive", data.change >= 0);
    marketChange.classList.toggle("negative", data.change < 0);
}

if (marketPeriod) {

    marketPeriod.addEventListener("change", function() {
        updateMarket(marketPeriod.value);
    });

    updateMarket(marketPeriod.value);

}

/* =========================================
   PERFORMANCE GRAPH — PERIOD UPDATES
========================================= */

const chartLine = document.getElementById("chartLine");
const chartFill = document.getElementById("chartFill");

const chartPeriodButtons = document.querySelectorAll(
    ".chart-buttons button"
);

const periodDropdown = document.getElementById("periodSelect");

const chartData = {
    "1D": {
        values: [11200, 11500, 11350, 11800, 11600, 12000, 12100, 12304.11],
        change: 2.45
    },

    "1W": {
        values: [10800, 11100, 11000, 11600, 11800, 11500, 12200, 12680.50],
        change: 3.12
    },

    "1M": {
        values: [10500, 10800, 10700, 11400, 11800, 11600, 12500, 13120.75],
        change: 5.36
    },

    "1Y": {
        values: [8500, 9200, 8800, 10200, 11000, 12500, 13700, 14850.25],
        change: 12.80
    }
};

function updatePerformanceGraph(period) {

    const data = chartData[period];

    if (!data || !chartLine || !chartFill) return;

    // Convert values into SVG coordinates
    const points = data.values.map(function(value, index) {

        const x = index * (800 / (data.values.length - 1));
        const y = 250 - (value / 16000) * 230;

        return {
            x: x,
            y: y
        };

    });

    // Create the line
    let linePath = "M " + points[0].x + " " + points[0].y;

    for (let i = 1; i < points.length; i++) {
        linePath += " L " + points[i].x + " " + points[i].y;
    }

    // Create the shaded area
    const fillPath =
        linePath +
        " L 800 250 L 0 250 Z";

    chartLine.setAttribute("d", linePath);
    chartFill.setAttribute("d", fillPath);

    // Update the chart tooltip
    const tooltip = document.querySelector(".chart-tooltip");

    if (tooltip) {

        const valueElement = tooltip.querySelector("strong");
        const changeElement = tooltip.querySelector("span");

        if (valueElement) {
            valueElement.textContent =
                "₹" + data.values[data.values.length - 1].toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
        }

        if (changeElement) {
            changeElement.textContent =
                (data.change >= 0 ? "+" : "") +
                data.change.toFixed(2) + "%";
        }

    }

    // Update market value using the existing function
    if (typeof updateMarket === "function") {
        updateMarket(period);
    }

    // Synchronize the dropdown
    if (periodDropdown) {
        periodDropdown.value = period;
    }

    // Highlight selected chart button
    chartPeriodButtons.forEach(function(button) {

        button.classList.toggle(
            "active",
            button.dataset.period === period
        );

    });

}

// Chart button clicks
chartPeriodButtons.forEach(function(button) {

    button.addEventListener("click", function() {
        updatePerformanceGraph(button.dataset.period);
    });

});

// Dropdown changes
if (periodDropdown) {

    periodDropdown.addEventListener("change", function() {
        updatePerformanceGraph(periodDropdown.value);
    });

}

// Initial graph
updatePerformanceGraph(
    periodDropdown ? periodDropdown.value : "1D"
);
