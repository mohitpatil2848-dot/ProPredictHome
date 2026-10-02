// ProPredict Home - Main JavaScript

document.addEventListener("DOMContentLoaded", () => {

    // Mobile menu
    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (menuButton && nav) {
        menuButton.addEventListener("click", () => {
            nav.classList.toggle("show");
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // Search button
    const searchButton = document.querySelector(".search-button");

    if (searchButton) {
        searchButton.addEventListener("click", () => {

            const location =
                document.querySelector("#search-location")?.value;

            if (location && location.trim() !== "") {
                window.location.href =
                    "/properties?location=" +
                    encodeURIComponent(location);
            } else {
                window.location.href = "/properties";
            }
        });
    }

    // Prediction form
    const predictionForm =
        document.querySelector("#prediction-form");

    if (predictionForm) {

        predictionForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const area =
                Number(document.querySelector("#area")?.value || 0);

            const bedrooms =
                Number(document.querySelector("#bedrooms")?.value || 0);

            const bathrooms =
                Number(document.querySelector("#bathrooms")?.value || 0);

            if (area <= 0) {
                alert("Please enter a valid property area.");
                return;
            }

            // Temporary demo calculation.
            // Real ML model will replace this later.
            let estimatedPrice =
                (area * 4500) +
                (bedrooms * 250000) +
                (bathrooms * 150000);

            showPrediction(estimatedPrice);
        });
    }

    function showPrediction(price) {

        const result =
            document.querySelector("#prediction-result");

        if (!result) return;

        let formatted;

        if (price >= 10000000) {

            formatted =
                "₹" +
                (price / 10000000)
                    .toFixed(2) +
                " Crore";

        } else {

            formatted =
                "₹" +
                (price / 100000)
                    .toFixed(2) +
                " Lakh";
        }

        result.innerHTML = `
            <div class="prediction-result-card">
                <span>ESTIMATED PROPERTY VALUE</span>
                <strong>${formatted}</strong>
                <p>Based on the information provided.</p>
            </div>
        `;

        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    // Contact form
    const contactForm =
        document.querySelector("#contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const message =
                document.querySelector("#form-message");

            if (message) {

                message.innerHTML =
                    "✓ Thank you! Your enquiry has been received.";

                message.classList.add("success");
            }

            contactForm.reset();
        });
    }

    // Property filter
    const propertyCards =
        document.querySelectorAll(".property-card");

    const propertySearch =
        document.querySelector("#property-search");

    if (propertySearch && propertyCards.length) {

        propertySearch.addEventListener("input", function () {

            const value =
                this.value.toLowerCase().trim();

            propertyCards.forEach(card => {

                const text =
                    card.textContent.toLowerCase();

                if (text.includes(value)) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });
        });
    }

});