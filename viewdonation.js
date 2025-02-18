document.addEventListener("DOMContentLoaded", function () {
    const donationsContainer = document.getElementById("donationsContainer");

    let donations = JSON.parse(localStorage.getItem("donations")) || [];

    if (donations.length === 0) {
        donationsContainer.innerHTML = "<p style='color: white; font-size: 1.2em;'>No donations available.</p>";
    } else {
        donationsContainer.innerHTML = "";
        donations.forEach((donation, index) => {
            let donationCard = document.createElement("div");
            donationCard.classList.add("donation-card");

            donationCard.innerHTML = `
                 <h2>${donation.name}</h2>
                 <p><strong>Email:</strong> ${donation.email}</p>
                 <p><strong>Address:</strong> ${donation.address}</p>
                 <p><strong>Phone:</strong> ${donation.phone}</p>
                 <p><strong>Category:</strong> ${donation.category}</p>
                 <p><strong>Expiry Date:</strong> ${donation.expiryDate ? donation.expiryDate : "N/A"}</p>
                 <p><strong>Quantity:</strong> ${donation.quantity}</p>
                 <p><strong>Note:</strong> ${donation.note}</p>
                 <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            donationsContainer.appendChild(donationCard);
        });
    }
});

function deleteDonation(index) {
    let donations = JSON.parse(localStorage.getItem("donations")) || [];
    donations.splice(index, 1);
    localStorage.setItem("donations", JSON.stringify(donations));
    location.reload();
}

function clearAllDonations() {
    localStorage.removeItem("donations");
    location.reload();
}
