document.addEventListener("DOMContentLoaded", function () {
    const donationsContainer = document.getElementById("donationsContainer");
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail"); // Get logged-in user email

    let donations = JSON.parse(localStorage.getItem("donations")) || [];

    function displayDonations() {
        donationsContainer.innerHTML = "";
        if (donations.length === 0) {
            donationsContainer.innerHTML = "<p style='color: black; font-size: 1.2em;'>No donations available.</p>";
            return;
        }

        donations.forEach((donation, index) => {
            const card = document.createElement("div");
            card.classList.add("donation-card");

            card.innerHTML = `
                <h3>${donation.name}</h3>
                <p><strong>Email:</strong> ${donation.email}</p>
                <p><strong>Address:</strong> ${donation.address}</p>
                <p><strong>Phone:</strong> ${donation.phone}</p>
                <p><strong>Category:</strong> ${donation.category}</p>
                <p><strong>Expiry Date:</strong> ${donation.expiryDate ? donation.expiryDate : "N/A"}</p>
                <p><strong>Quantity:</strong> ${donation.quantity}</p>
                <p><strong>Note:</strong> ${donation.note}</p>
                <div class="donation-buttons">
                    ${loggedInUserEmail === donation.email ? 
                        `<button class="delete-btn" onclick="deleteDonation(${index})">Delete</button>` : ""}
                    <button class="request-btn" onclick="requestFood('${donation.email}')">Request Food</button>
                </div>
            `;

            donationsContainer.appendChild(card);
        });
    }

    function deleteDonation(index) {
        let donations = JSON.parse(localStorage.getItem("donations")) || [];
        donations.splice(index, 1);
        localStorage.setItem("donations", JSON.stringify(donations));
        displayDonations();
    }

    function requestFood(donorEmail) {
        alert(`Request sent to donor: ${donorEmail}`);
    }

    window.deleteDonation = deleteDonation;
    window.requestFood = requestFood;
    displayDonations();
});

function clearAllDonations() {
    localStorage.removeItem("donations");
    location.reload();
}
