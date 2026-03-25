// Login page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const clientErrorMessage = document.getElementById('clientErrorMessage');
    const successMessage = document.getElementById('successMessage');
    const serverErrorMessage = document.getElementById('serverErrorMessage');
    const togglePasswordBtn = document.getElementById('togglePassword');
    
    // Toggle password visibility
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
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Clear previous messages
            hideClientError();
            hideSuccessMessage();
            
            // Get form data
            const username = usernameInput.value.trim();
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
                
                const response = await fetch('/login', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.redirected) {
                    // Successful login - redirect to dashboard
                    showSuccessMessage('Login successful! Redirecting...');
                    setTimeout(() => {
                        window.location.href = response.url;
                    }, 500);
                } else {
                    // Check if response is JSON
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const data = await response.json();
                        if (data.error) {
                            showClientError(data.error);
                        } else {
                            showClientError('Login failed. Please try again.');
                        }
                    } else {
                        // Handle HTML response (login page with error)
                        const html = await response.text();
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const errorDiv = doc.getElementById('serverErrorMessage');
                        if (errorDiv && errorDiv.textContent) {
                            showClientError(errorDiv.textContent);
                        } else {
                            showClientError('Invalid username or password');
                        }
                    }
                    setLoadingState(false);
                }
            } catch (error) {
                console.error('Login error:', error);
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
        
        if (!password) {
            showClientError('Password is required');
            passwordInput.focus();
            return false;
        }
        
        if (password.length < 6) {
            showClientError('Password must be at least 6 characters');
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
        if (!loginBtn) return;
        
        const buttonText = loginBtn.querySelector('.button-text');
        const loader = loginBtn.querySelector('.loader');
        
        if (isLoading) {
            loginBtn.disabled = true;
            if (buttonText) buttonText.textContent = 'Logging in...';
            if (loader) loader.style.display = 'inline-block';
        } else {
            loginBtn.disabled = false;
            if (buttonText) buttonText.textContent = 'Login';
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
            loginForm.dispatchEvent(new Event('submit'));
        }
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('keypress', handleEnterKey);
    }
    
    if (usernameInput) {
        usernameInput.addEventListener('keypress', handleEnterKey);
    }
});