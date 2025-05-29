// For a sticky navbar 
window.addEventListener("scroll", function () {
    const navBar = document.querySelector(".nav-bar");
    if (window.scrollY > 100) {
        navBar.classList.add("sticky-nav");
    } else {
        navBar.classList.remove("sticky-nav");
    }
});

// USER REGISTRATION 
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop form from submitting immediately

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('message');

    // Clear previous message
    message.textContent = '';

    // Validation rules
    if (fullName.length < 1) {
        message.textContent = 'Full name must be entered.';
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailPattern.test(email)) {
        message.textContent = 'Please enter a valid email address.';
        return;
    }

    if (password.length < 6) {
        message.textContent = 'Password must be at least 6 characters long.';
        return;
    }

    // All validations passed
    // Now allow the form to submit
    this.submit();
});

// Button ripple effect
const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const circle = document.createElement('span');
            circle.classList.add('ripple');
            this.appendChild(circle);

            const diameter = Math.max(this.clientWidth, this.clientHeight);
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.offsetX - diameter / 2}px`;
            circle.style.top = `${e.offsetY - diameter / 2}px`;

            setTimeout(() => circle.remove(), 600); // Remove ripple after animation
        });
    });


// Dark mode effect 
// const toggle = document.getElementById("darkToggle");
// const body = document.body;

// toggle.addEventListener("change", () => {
//   body.classList.toggle("dark-theme");
// });