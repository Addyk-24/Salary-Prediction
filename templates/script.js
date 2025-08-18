// DOM Elements
const heroSection = document.getElementById('hero-section');
const formSection = document.getElementById('form-section');
const getStartedBtn = document.getElementById('get-started-btn');
const backBtn = document.getElementById('back-btn');
const predictionForm = document.getElementById('prediction-form');
const predictBtn = document.getElementById('predict-btn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');
const toast = document.getElementById('toast');

// Navigation Functions
function showFormSection() {
    heroSection.classList.add('hidden');
    formSection.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function showHeroSection() {
    formSection.classList.add('hidden');
    heroSection.classList.remove('hidden');
    window.scrollTo(0, 0);
}

// Toast Notification
function showToast(message, type = 'success') {
    const toastMessage = document.querySelector('.toast-message');
    const toastIcon = document.querySelector('.toast-content i');
    
    toastMessage.textContent = message;
    
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle';
        toastIcon.style.color = 'hsl(142, 76%, 36%)';
    } else if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
        toastIcon.style.color = 'hsl(0, 84.2%, 60.2%)';
    }
    
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Form Validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name.trim()) {
        errors.push('Name is required');
    }
    
    if (!formData.age || formData.age < 18 || formData.age > 70) {
        errors.push('Age must be between 18 and 70');
    }
    
    if (!formData.gender) {
        errors.push('Gender is required');
    }
    
    if (!formData.location.trim()) {
        errors.push('Location is required');
    }
    
    if (!formData.department) {
        errors.push('Department is required');
    }
    
    if (!formData.job_title.trim()) {
        errors.push('Job title is required');
    }
    
    if (!formData.experience_years || formData.experience_years < 0) {
        errors.push('Experience years must be 0 or greater');
    }
    
    if (!formData.education_level) {
        errors.push('Education level is required');
    }
    
    return errors;
}

// Form Submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(predictionForm);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    // Validate form
    const errors = validateForm(data);
    if (errors.length > 0) {
        showToast(errors[0], 'error');
        return;
    }

    // Prepare data for backend (convert types as needed)
    const payload = {
        Employee_ID: parseInt(data.Employee_ID || 1),
        Name: data.name,
        Age: parseInt(data.age),
        Gender: data.gender, 
        Department: data.department,
        Job_Title: data.job_title,
        Experience_Years: parseInt(data.experience_years),
        Education_Level: data.education_level,
        Location: data.location
    };

    // Show loading state
    predictBtn.disabled = true;
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');

    try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        showToast(`Predicted salary: $${Number(result.predicted_salary).toLocaleString()} annually`, 'success');
        predictionForm.reset();
    } catch (error) {
        showToast('An error occurred while processing your request', 'error');
        console.error('Prediction error:', error);
    } finally {
        predictBtn.disabled = false;
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
    }
}



// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    getStartedBtn.addEventListener('click', showFormSection);
    backBtn.addEventListener('click', showHeroSection);
    
    // Form submission
    predictionForm.addEventListener('submit', handleFormSubmit);
    
    // Close toast on click
    toast.addEventListener('click', function() {
        toast.classList.add('hidden');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form field animations
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    // ESC key to go back
    if (event.key === 'Escape') {
        if (!formSection.classList.contains('hidden')) {
            showHeroSection();
        }
    }
    
    // Enter key to get started (only on hero section)
    if (event.key === 'Enter' && !heroSection.classList.contains('hidden')) {
        if (event.target.tagName !== 'BUTTON') {
            showFormSection();
        }
    }
});

// Add some interactive animations
function addHoverEffects() {
    const buttons = document.querySelectorAll('.btn');
    const statItems = document.querySelectorAll('.stat-item');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Initialize hover effects
document.addEventListener('DOMContentLoaded', addHoverEffects);