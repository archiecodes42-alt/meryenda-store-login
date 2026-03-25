// Register page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const registerForm = document.getElementById('registerForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const registerBtn = document.getElementById('registerBtn');
    const clientErrorMessage = document.getElementById('clientErrorMessage');
    const successMessage = document.getElementById('successMessage');
    const serverErrorMessage = document.getElementById('serverErrorMessage');
    const togglePasswordBtn = document.getElementById('togglePassword');
    
    // Toggle password visibility for password field
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            // Get current type
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            
            // Toggle the input type
            passwordInput.setAttribute('type', type);
            
            // Update button emoji based on visibility state
            if (type === 'password') {
                // Password hidden - show eye emoji
                this.textContent = '👁️';
                this.setAttribute('aria-label', 'Show password');
            } else {
                // Password visible - show eye with slash emoji
                this.textContent = '👁️‍🗨️';
                this.setAttribute('aria-label', 'Hide password');
            }
            
            // Keep focus on password input for better UX
            passwordInput.focus();
        });

        // Add keyboard accessibility (Enter and Space keys)
        togglePasswordBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Auto-hide server error message after 5 seconds
    if (serverErrorMessage) {
        setTimeout(() => {
            serverErrorMessage.style.opacity = '0';
            serverErrorMessage.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                serverErrorMessage.style.display = 'none';
            }, 500);
        }, 5000);
    }
    
    // Form submission handler
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Clear previous messages
            hideClientError();
            hideSuccessMessage();
            
            // Get form data
            const username = usernameInput.value.trim().toLowerCase();
            const password = passwordInput.value.trim();
            
            // Validate inputs
            if (!validateInputs(username, password)) {
                return;
            }
            
            // Show loading state
            setLoadingState(true);
            
            try {
                // Submit form
                const formData = new FormData();
                formData.append('username', username);
                formData.append('password', password);
                
                console.log('Submitting registration with:', { username, passwordLength: password.length });
                
                const response = await fetch('/register', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                console.log('Response status:', response.status);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('Success response:', data);
                    if (data.success) {
                        // Successful registration - show success message
                        showSuccessMessage('Registration successful! Redirecting to login...');
                        setTimeout(() => {
                            window.location.href = '/login';
                        }, 1500);
                    } else {
                        showClientError(data.error || 'Registration failed. Please try again.');
                        setLoadingState(false);
                    }
                } else {
                    // Check if response is JSON
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const data = await response.json();
                        console.log('Error response (JSON):', data);
                        if (data.error) {
                            showClientError(data.error);
                        } else {
                            showClientError('Registration failed. Please try again.');
                        }
                    } else {
                        // Handle HTML response (register page with error)
                        const html = await response.text();
                        console.log('Error response (HTML)');
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const errorDiv = doc.getElementById('serverErrorMessage');
                        if (errorDiv && errorDiv.textContent) {
                            showClientError(errorDiv.textContent);
                        } else {
                            showClientError('Registration failed. Please try again.');
                        }
                    }
                    setLoadingState(false);
                }
            } catch (error) {
                console.error('Registration error:', error);
                showClientError('Network error. Please check your connection.');
                setLoadingState(false);
            }
        });
    }
    
    // Input validation
    function validateInputs(username, password) {
        if (!username) {
            showClientError('Username is required');
            usernameInput.focus();
            return false;
        }
        
        if (username.length < 3) {
            showClientError('Username must be at least 3 characters');
            usernameInput.focus();
            return false;
        }
        
        if (username.length > 20) {
            showClientError('Username cannot exceed 20 characters');
            usernameInput.focus();
            return false;
        }
        
        // Validate username format (lowercase letters, numbers, underscores)
        const usernameRegex = /^[a-z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            showClientError('Username can only contain lowercase letters, numbers, and underscores');
            usernameInput.focus();
            return false;
        }
        
        if (!password) {
            showClientError('Password is required');
            passwordInput.focus();
            return false;
        }
        
        return true;
    }
    
    // Show client error message
    function showClientError(message) {
        if (clientErrorMessage) {
            clientErrorMessage.textContent = message;
            clientErrorMessage.classList.add('show');
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                hideClientError();
            }, 5000);
        }
    }
    
    // Hide client error message
    function hideClientError() {
        if (clientErrorMessage) {
            clientErrorMessage.textContent = '';
            clientErrorMessage.classList.remove('show');
        }
    }
    
    // Show success message
    function showSuccessMessage(message) {
        if (successMessage) {
            successMessage.textContent = message;
            successMessage.classList.add('show');
            successMessage.style.display = 'block'; // Make sure it's visible
        }
    }
    
    // Hide success message
    function hideSuccessMessage() {
        if (successMessage) {
            successMessage.textContent = '';
            successMessage.classList.remove('show');
            successMessage.style.display = 'none';
        }
    }
    
    // Set loading state
    function setLoadingState(isLoading) {
        if (!registerBtn) return;
        
        const buttonText = registerBtn.querySelector('.button-text');
        const loader = registerBtn.querySelector('.loader');
        
        if (isLoading) {
            registerBtn.disabled = true;
            if (buttonText) buttonText.textContent = 'Creating Account...';
            if (loader) loader.style.display = 'inline-block';
        } else {
            registerBtn.disabled = false;
            if (buttonText) buttonText.textContent = 'Create Account';
            if (loader) loader.style.display = 'none';
        }
    }
    
    // Add input event listeners to clear errors when typing
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            hideClientError();
            if (serverErrorMessage) {
                serverErrorMessage.style.display = 'none';
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            hideClientError();
            if (serverErrorMessage) {
                serverErrorMessage.style.display = 'none';
            }
        });
    }
    
    // Handle Enter key press
    function handleEnterKey(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            registerForm.dispatchEvent(new Event('submit'));
        }
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('keypress', handleEnterKey);
    }
    
    if (usernameInput) {
        usernameInput.addEventListener('keypress', handleEnterKey);
    }
});
