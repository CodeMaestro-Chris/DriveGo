// Get the car ID from the URL
const params = new URLSearchParams(window.location.search);
let carId = params.get("id");

// Ensure the ID matches the format in your JSON (e.g., "001")
carId = String(carId).padStart(3, '0'); // Converts "1" to "001"

// Fetch the car data from the JSON file
fetch('cars.json')
    .then(response => response.json())
    .then(data => {
        // Find the car with the formatted ID
        const car = data.find(c => c.id === carId);

        if (car) {
            // Update the page with car details
            document.getElementById("car-name").innerText = car.name;
            document.getElementById("car-description").innerText = car.description;
            document.getElementById("car-image").src = `/${car.image}`;
        } else {
            alert("Car not found!");
        }
    })
    .catch(error => console.error('Error loading car data:', error));

// Car Payment Form 
const form = document.getElementById("checkout-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear previous errors
    document.querySelectorAll(".text-danger").forEach((el) => (el.innerText = ""));

    // Form Inputs
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const dateNeeded = document.getElementById("date-needed").value;
    const dateReturn = document.getElementById("date-return").value;

    // Validation
    let isValid = true;

    if (name.length < 3) {
        document.getElementById("name-error").innerText = "Name must be at least 3 characters.";
        isValid = false;
    }

    if (!/^\d{10,15}$/.test(phone)) {
        document.getElementById("phone-error").innerText = "Phone Number must be between 10 to 15 digits.";
        isValid = false;
    }

    if (!dateNeeded) {
        document.getElementById("date-needed-error").innerText = "Date Needed is required.";
        isValid = false;
    }

    if (!dateReturn) {
        document.getElementById("date-return-error").innerText = "Date of Return is required.";
        isValid = false;
    }

    if (dateNeeded && dateReturn && new Date(dateReturn) <= new Date(dateNeeded)) {
        document.getElementById("date-return-error").innerText = "Date of Return must be after Date Needed.";
        isValid = false;
    }

    if (!isValid) return;

    // Calculate Rental Period
    const date1 = new Date(dateNeeded);
    const date2 = new Date(dateReturn);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


});
