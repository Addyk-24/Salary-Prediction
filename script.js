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
    
    // Show loading state
    predictBtn.disabled = true;
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate mock prediction
        const baseSalary = generateSalaryPrediction(data);
        
        // Show success message with prediction
        showToast(`Predicted salary: $${baseSalary.toLocaleString()} annually`, 'success');
        
        // Reset form
        predictionForm.reset();
        
    } catch (error) {
        showToast('An error occurred while processing your request', 'error');
        console.error('Prediction error:', error);
    } finally {
        // Reset button state
        predictBtn.disabled = false;
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
    }
}

// Mock Salary Prediction Algorithm
function generateSalaryPrediction(data) {
    // Base salary mapping by department
    const departmentBase = {
        'engineering': 90000,
        'data': 85000,
        'product': 80000,
        'design': 70000,
        'marketing': 65000,
        'sales': 60000,
        'finance': 75000,
        'hr': 60000,
        'operations': 55000,
        'other': 50000
    };
    
    // Education multipliers
    const educationMultiplier = {
        'high-school': 0.8,
        'associate': 0.9,
        'bachelor': 1.0,
        'master': 1.2,
        'phd': 1.4,
        'other': 0.95
    };
    
    // Location multipliers (simplified)
    const locationMultipliers = {
        'san francisco': 1.6,
        'new york': 1.5,
        'seattle': 1.4,
        'boston': 1.3,
        'austin': 1.2,
        'chicago': 1.1,
        'denver': 1.05,
        'atlanta': 1.0,
        'default': 0.9
    };
    
    let baseSalary = departmentBase[data.department] || departmentBase['other'];
    
    // Apply experience multiplier
    const experienceYears = parseInt(data.experience_years);
    const experienceMultiplier = Math.min(1 + (experienceYears * 0.05), 2.5);
    baseSalary *= experienceMultiplier;
    
    // Apply education multiplier
    baseSalary *= educationMultiplier[data.education_level] || 1;
    
    // Apply location multiplier
    const location = data.location.toLowerCase();
    let locationMultiplier = locationMultipliers['default'];
    
    for (const [city, multiplier] of Object.entries(locationMultipliers)) {
        if (location.includes(city)) {
            locationMultiplier = multiplier;
            break;
        }
    }
    
    baseSalary *= locationMultiplier;
    
    // Add some randomness (±10%)
    const randomFactor = 0.9 + (Math.random() * 0.2);
    baseSalary *= randomFactor;
    
    // Round to nearest thousand
    return Math.round(baseSalary / 1000) * 1000;
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