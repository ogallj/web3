// Toggle mobile navigation
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for internal links
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

// Close mobile navigation on link click
navLinks.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Toggle custom donation amount input
document.getElementById('donationAmount').addEventListener('change', function () {
    const customAmountInput = document.getElementById('customAmount');
    if (this.value === 'other') {
        customAmountInput.style.display = 'block';
    } else {
        customAmountInput.style.display = 'none';
    }
});

// Handle donation form submission
document.getElementById('donationForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission for demonstration purposes
    const amount = document.getElementById('donationAmount').value === 'other' ? document.getElementById('customAmount').value : this.donationAmount.value;
    
    if (amount) {
        document.getElementById('thankYouMessage').style.display = 'block';
        this.reset(); // Reset form after submission
    }
});

// Handle volunteer form submission
document.getElementById('volunteerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const name = document.getElementById('volunteerName').value;
    const email = document.getElementById('volunteerEmail').value;
    const phone = document.getElementById('volunteerPhone').value;
    const message = document.getElementById('volunteerMessage').value;

    // Basic validation
    if (!name || !email || !phone || !message) {
        alert('Please fill out all fields.');
        return;
    }

    // Create a data object
    const formData = {
        name: name,
        email: email,
        phone: phone,
        message: message
    };

    // Send data to the server
    fetch('http://localhost:3000/submit-volunteer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            alert(`Thank you, ${name}! Your application has been submitted successfully.`);
            document.getElementById('volunteerForm').reset(); // Reset form after submission
        } else {
            alert('There was an error submitting your application. Please try again.');
        }
    })
    .catch(error => {
        alert('There was a network error. Please check your connection and try again.');
    });
});
