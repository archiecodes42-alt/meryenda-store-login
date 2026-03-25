// Global variables
let currentOrder = [];
let orderType = null;
let currentCategory = 'all';
let selectedPaymentMethod = null;
let productCatalog = [];

// Fixed table number - always 1
const TABLE_NUMBER = '1';

// Menu database - ALL PRODUCTS WITH SIMPLE AVAILABILITY TOGGLE
const menuDatabase = [
    // ==================== PANCIT CANTON FLAVORS ====================
    {
        id: 101,
        name: "Pancit Canton - Sweet & Spicy",
        price: 25,
        category: "Pancit Canton",
        image: "/images/pancitcantonsweet&spicy.png",
        available: true
    },
    {
        id: 102,
        name: "Pancit Canton - Chilimansi",
        price: 25,
        category: "Pancit Canton",
        image: "/images/chilimansi.png",
        available: true
    },
    {
        id: 103,
        name: "Pancit Canton - Extra Hot",
        price: 25,
        category: "Pancit Canton",
        image: "/images/pancitcantonextrahot.png",
        available: true
    },
    {
        id: 104,
        name: "Pancit Canton - Kalamansi",
        price: 25,
        category: "Pancit Canton",
        image: "/images/pancitcantonkalamansi.png",
        available: true
    },
    
    // ==================== SANDWICHES ====================
    {
        id: 201,
        name: "Burger",
        price: 20,
        category: "Sandwiches",
        image: "/images/burger.png",
        available: true
    },
    {
        id: 202,
        name: "Burger With Egg",
        price: 39,
        category: "Sandwiches",
        image: "/images/burgerwithegg.png",
        available: true
    },
    {
        id: 203,
        name: "Egg Sandwich",
        price: 39,
        category: "Sandwiches",
        image: "/images/Egg Sandwich.png",
        available: true
    },
    {
        id: 204,
        name: "Burger with Fries",
        price: 45,
        category: "Sandwiches",
        image: "/images/burgerwithfries.png",
        description: "Burger served with french fries",
        available: true
    },
    
    // ==================== HOTDOG SANDWICHES ====================
    {
        id: 301,
        name: "Hotdog Sandwich",
        price: 35,
        category: "Hotdog Sandwich",
        image: "/images/hotdogsandwhich.png",
        available: true
    },

    // ==================== DRINKS FLAVORS ====================
    {
        id: 401,
        name: "Sprite Mismo",
        price: 25,
        category: "Drinks",
        image: "/images/spritemismo.png",
        available: true
    },
    {
        id: 402,
        name: "Coke Mismo",
        price: 25,
        category: "Drinks",
        image: "/images/cokemismo.png",
        available: true
    },
    {
        id: 403,
        name: "Ice Tubig",
        price: 3,
        category: "Drinks",
        image: "/images/icewater.png",
        available: true
    },
    {
        id: 404,
        name: "Ice Water Bottle",
        price: 12,
        category: "Drinks",
        image: "/images/icewaterbottle.png",
        available: true
    },
    {
        id: 405,
        name: "Yelo",
        price: 5,
        category: "Drinks",
        image: "/images/Ice.png",
        description: "Ice",
        available: true
    },
    {
        id: 406,
        name: "Sting",
        price: 25,
        category: "Drinks",
        image: "/images/sting.png",
        available: true
    },
    {
        id: 407,
        name: "Cobra Energy Drink",
        price: 25,
        category: "Drinks",
        image: "/images/cobraenergydrink.png",
        description: "Energy drink",
        available: false
    },
    
    // ==================== COFFEE FLAVORS ====================
    {
        id: 501,
        name: "Kopiko Black Coffee",
        price: 10,
        category: "Coffee",
        image: "/images/kopikoblackcoffee.png",
        available: true
    },
    {
        id: 502,
        name: "Great Taste White",
        price: 10,
        category: "Coffee",
        image: "/images/greattastewhite.png",
        available: true
    },
    {
        id: 503,
        name: "Great Taste White Choco",
        price: 10,
        category: "Coffee",
        image: "/images/Great Taste White Choco.png",
        available: true
    },
    {
        id: 504,
        name: "Kopiko Blanca",
        price: 10,
        category: "Coffee",
        image: "/images/Kopiko Blanca.png",
        available: true
    },
    {
        id: 505,
        name: "Nescafe Original",
        price: 10,
        category: "Coffee",
        image: "/images/Nescafe Original.png",
        available: true
    },
    {
        id: 506,
        name: "Coffee Stick",
        price: 10,
        category: "Coffee",
        image: "/images/coffeestick.png",
        available: true
    },
    
    // ==================== SNACKS ====================
    {
        id: 601,
        name: "French Fries - Cheese Powder",
        price: 20,
        category: "Snacks",
        image: "/images/frenchfriescheesepowder.png",
        available: true
    },
    {
        id: 602,
        name: "Hotdog (Red)",
        price: 22,
        category: "Snacks",
        image: "/images/hotdogred.png",
        available: true
    },
    {
        id: 603,
        name: "Hotdog (Brown)",
        price: 35,
        category: "Snacks",
        image: "/images/brownhotdog2.png",
        available: true
    },
    {
        id: 604,
        name: "Cheesestick - Cheese Powder",
        price: 10,
        category: "Snacks",
        image: "/images/cheesestick.png",
        available: true
    },
    {
        id: 605,
        name: "Mang Juan",
        price: 10,
        category: "Snacks",
        image: "/images/mangjuan.png",
        available: true
    },
    {
        id: 606,
        name: "Chippy",
        price: 10,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=160&q=80",
        description: "Chippy crisps",
        available: true
    },
    {
        id: 607,
        name: "Richoco Wafer",
        price: 15,
        category: "Snacks",
        image: "/images/richocowafer.png",
        description: "Richoco chocolate wafer snack",
        available: true
    },
    {
        id: 608,
        name: "Hotcake (Small) - Margarine & Sugar",
        price: 5,
        category: "Snacks",
        image: "/images/hotcakemarginandsugar.png",
        description: "Small hotcake with margarine and sugar only",
        available: true
    },
    {
        id: 609,
        name: "Hotcake (Medium) - Margarine & Sugar",
        price: 10,
        category: "Snacks",
        image: "/images/hotcakemarginandsugar.png",
        description: "Medium hotcake with margarine and sugar only",
        available: true
    },
    {
        id: 610,
        name: "Hotdog on Stick",
        price: 22,
        category: "Snacks",
        image: "/images/redhotdog.png",
        description: "Hotdog on a stick",
        available: true
    },
    {
        id: 611,
        name: "Siomai - 4 pieces",
        price: 20,
        category: "Snacks",
        image: "/images/siomai.png",
        description: "4 pieces of siomai",
        pieceCount: 4,
        available: true
    },
    {
        id: 612,
        name: "Siomai - 5 pieces",
        price: 25,
        category: "Snacks",
        image: "/images/siomai.png",
        description: "5 pieces of siomai",
        pieceCount: 5,
        available: true
    },
    {
        id: 613,
        name: "Siomai - 6 pieces",
        price: 30,
        category: "Snacks",
        image: "/images/siomai.png",
        description: "6 pieces of siomai",
        pieceCount: 6,
        available: true
    },
    {
        id: 614,
        name: "Siomai - 7 pieces",
        price: 35,
        category: "Snacks",
        image: "/images/siomai.png",
        description: "7 pieces of siomai",
        pieceCount: 7,
        available: true
    },
    {
        id: 615,
        name: "Siomai - 8 pieces",
        price: 40,
        category: "Snacks",
        image: "/images/siomai.png",
        description: "8 pieces of siomai",
        pieceCount: 8,
        available: true
    },
    {
        id: 616,
        name: "Siomai - 9 pieces",
        price: 45,
        category: "Snacks",
        image: "/images/siomai.png",
        description: "9 pieces of siomai",
        pieceCount: 9,
        available: true
    },
    {
        id: 617,
        name: "Siomai - 10 pieces",
        price: 50,
        category: "Snacks",
        image: "/images/siomai.png",
        description: "10 pieces of siomai",
        pieceCount: 10,
        available: true
    },
    {
        id: 618,
        name: "Choco Flakes",
        price: 10,
        category: "Snacks",
        image: "/images/oishichocoflakes.png",
        description: "Chocolate flavored flakes",
        available: true
    },
    {
        id: 619,
        name: "Patata",
        price: 10,
        category: "Snacks",
        image: "/images/crispypatata.png",
        description: "patata snacks",
        available: true
    },
    {
        id: 620,
        name: "MrChips",
        price: 10,
        category: "Snacks",
        image: "/images/mrchips.png",
        description: "Classic potato chips",
        available: true
    },
    {
        id: 621,
        name: "Loaded",
        price: 10,
        category: "Snacks",
        image: "/images/loaded.png",
        description: "Loaded",
        available: true
    },
    {
        id: 622,
        name: "LavaCake",
        price: 12,
        category: "Snacks",
        image: "/images/lavacake.png",
        description: "Lava cake snack",
        available: true
    },
    {
        id: 623,
        name: "Pillows",
        price: 12,
        category: "Snacks",
        image: "/images/pillowschocolate.png",
        description: "Pillow shaped chocolate snacks",
        available: true
    },
    {
        id: 624,
        name: "Cheese clubs",
        price: 10,
        category: "Snacks",
        image: "/images/cheeseclubs.png",
        description: "Cheese snacks",
        available: true
    },
    {
        id: 625,
        name: "Rinbee",
        price: 10,
        category: "Snacks",
        image: "/images/rinbee.png",
        description: "Rinbee Snacks",
        available: true
    },
    {
        id: 626,
        name: "Piattos",
        price: 12,
        category: "Snacks",
        image: "/images/piattos.png",
        description: "Piattos cheese flavored chips",
        available: true
    },
    {
        id: 627,
        name: "Hansel",
        price: 10,
        category: "Snacks",
        image: "/images/hansel.png",
        description: "Hansel snack",
        available: true
    },
    {
        id: 628,
        name: "Mikmik",
        price: 5,
        category: "Snacks",
        image: "/images/mikmik.png",
        description: "Mikmik powder snack - 3 sticks",
        pieceCount: 3,
        available: true
    },
    {
        id: 635,
        name: "Ice Candy - 3 Pesos",
        price: 3,
        category: "Snacks",
        image: "/images/icecandy.png",
        description: "Ice Candy - 3 pesos",
        available: true
    },
    {
        id: 636,
        name: "Ice Candy - 6 Pesos",
        price: 6,
        category: "Snacks",
        image: "/images/icepop.png",
        description: "Ice Candy - 6 pesos",
        available: true
    },
    {
        id: 629,
        name: "Candy - Minty",
        price: 5,
        category: "Candy",
        image: "/images/minty.png",
        description: "Minty candies - 4 pieces",
        pieceCount: 4,
        available: true
    },
    {
        id: 630,
        name: "Candy - Sunny",
        price: 5,
        category: "Candy",
        image: "/images/bubblegum.png",
        description: "Sunny candies - 4 pieces",
        pieceCount: 4,
        available: true
    },
    {
        id: 631,
        name: "Mr. Asimo",
        price: 5,
        category: "Candy",
        image: "/images/mrasim.png",
        description: "Mr. Asimo candies - 4 pieces",
        pieceCount: 4,
        available: true
    },
    {
        id: 632,
        name: "Mr. Keso",
        price: 5,
        category: "Candy",
        image: "/images/Mrkeso.png",
        description: "Mr. Keso Candies - 4 pieces",
        pieceCount: 4,
        available: true
    },
    {
        id: 633,
        name: "Kopiko",
        price: 5,
        category: "Candy",
        image: "/images/kopiko.png",
        description: "Kopiko Candies - 4 pieces",
        pieceCount: 4,
        available: true
    },
    {
        id: 634,
        name: "Maxx",
        price: 5,
        category: "Candy",
        image: "/images/Maxx.png",
        description: "Maxx Candies - 4 pieces",
        pieceCount: 4,
        available: true
    },
    
    // ==================== RICE MEALS ====================
    {
        id: 701,
        name: "Siomai Rice",
        price: 39,
        category: "Rice Meals",
        image: "/images/siomairice.png",
        available: true
    },
    {
        id: 702,
        name: "Rice",
        price: 15,
        category: "Rice Meals",
        image: "/images/plainrice.png",
        available: true
    },
    {
        id: 703,
        name: "Hotdog with Rice",
        price: 45,
        category: "Rice Meals",
        image: "/images/hotdog with rice.png",
        description: "Hotdog served with rice",
        available: true
    },
    {
        id: 704,
        name: "Pattys with Rice",
        price: 45,
        category: "Rice Meals",
        image: "/images/ricewithburgerpatty.png",
        description: "Burger patty served with rice",
        available: true
    },
    {
        id: 705,
        name: "Egg with Rice",
        price: 35,
        category: "Rice Meals",
        image: "/images/ricewithegg.png",
        description: "Fried egg served with rice",
        available: true
    },

    {
        id: 801,
        name: "Chicken Pastil with Rice",
        price: 35,
        category: "Rice Meals",
        image: "/images/chickenpastilwithrice.png",
        available: true
    },

    // ======================= YAKISOBA =======================
    {
        id: 901,
        name: "Yakisoba Spicy Chicken Flavor",
        price: 25,
        category: "Yakisoba",
        image: "/images/yakisoba.png",
        description: "Spicy chicken flavored yakisoba with vegetables",
        available: true
    },
    
    // ======================= PASTA EXPRESS =======================
    {
        id: 1001,
        name: "Pasta Express Spaghetti in an Instant",
        price: 25,
        category: "Pasta Express",
        image: "/images/pastaexpressinstantspaghetti.png",
        description: "1 pack for PHP - Spaghetti in an Instant Spaghetti",
        available: true
    }
];

// Category display mapping
const categoryDisplayNames = {
    'Pancit Canton': 'Pancit Canton',
    'Sandwiches': 'Sandwiches',
    'Hotdog Sandwich': 'Hotdog Sandwich',
    'Drinks': 'Drinks',
    'Coffee': 'Coffee',
    'Snacks': 'Snacks',
    'Rice Meals': 'Rice Meals',
    'Yakisoba': 'Yakisoba',
    'Pasta Express': 'Pasta Express'
};

// ==================== 🎯 TOAST NOTIFICATION ====================
function showToast(message, type = 'success', duration = 3000) {
    try {
        const existingToast = document.getElementById('activeToast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.id = 'activeToast';
        
        let bgColor = '#28a745';
        if (type === 'error') bgColor = '#dc3545';
        else if (type === 'warning') bgColor = '#ff9800';
        else if (type === 'info') bgColor = '#17a2b8';
        
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${bgColor};
            color: white;
            border-radius: 8px;
            z-index: 99999;
            font-weight: bold;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            animation: slideInRight 0.3s ease-in-out;
            max-width: 400px;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            try {
                if (toast.parentElement) toast.remove();
            } catch (e) {}
        }, duration);
    } catch (error) {
        console.error('Toast error:', error);
    }
}

// ==================== 🚪 LOGOUT HANDLER ====================
function handleLogout() {
    try {
        localStorage.removeItem('userSession');
        sessionStorage.removeItem('userSession');
        
        showToast('Logging out...', 'info', 1000);
        
        setTimeout(() => {
            window.location.href = '/logout';
        }, 500);
    } catch (error) {
        window.location.href = '/logout';
    }
}

// ==================== 💾 SAVE/LOAD AVAILABILITY ====================
function saveAvailabilityToStorage() {
    try {
        const availabilityData = {};
        productCatalog.forEach(product => {
            availabilityData[product.id] = product.available;
        });
        localStorage.setItem('productAvailability', JSON.stringify(availabilityData));
        console.log('✅ Availability saved to localStorage');
    } catch (error) {
        console.error('Error saving availability:', error);
    }
}

function loadAvailabilityFromStorage() {
    try {
        const savedData = localStorage.getItem('productAvailability');
        if (savedData) {
            const availabilityData = JSON.parse(savedData);
            
            // Apply saved availability to productCatalog
            productCatalog.forEach(product => {
                if (availabilityData.hasOwnProperty(product.id)) {
                    product.available = availabilityData[product.id];
                }
            });
            
            console.log('✅ Availability loaded from localStorage');
        }
    } catch (error) {
        console.error('Error loading availability:', error);
    }
}

// ==================== 📋 LOAD MENU ITEMS ====================
function loadMenuItems() {
    try {
        productCatalog = JSON.parse(JSON.stringify(menuDatabase)); // Deep copy
        
        // Load saved availability from localStorage
        loadAvailabilityFromStorage();
        
        renderMenu();
        console.log(`✅ Loaded ${productCatalog.length} products`);
    } catch (error) {
        console.error('Error loading menu:', error);
    }
}

// ==================== 🖼️ FALLBACK IMAGE HANDLER ====================
function handleImageError(img, productName) {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 160;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    let displayText = productName;
    if (productName.length > 20) {
        displayText = productName.substring(0, 18) + '...';
    }
    ctx.fillText(displayText, canvas.width/2, canvas.height/2);
    
    img.src = canvas.toDataURL();
    img.onerror = null;
}

// ==================== 🔄 TOGGLE AVAILABILITY ====================
function toggleAvailability(productId, buttonElement) {
    try {
        const product = productCatalog.find(p => p.id === productId);
        if (product) {
            // Toggle availability
            product.available = !product.available;
            
            // Update button appearance
            if (product.available) {
                buttonElement.textContent = 'Available';
                buttonElement.style.backgroundColor = '#28a745';
                buttonElement.style.color = 'white';
            } else {
                buttonElement.textContent = 'Not Available';
                buttonElement.style.backgroundColor = '#dc3545';
                buttonElement.style.color = 'white';
            }
            
            // Update the add to cart button state
            const menuCard = buttonElement.closest('.menu-item');
            if (menuCard) {
                const addToCartBtn = menuCard.querySelector('.add-to-cart-btn');
                if (addToCartBtn) {
                    if (product.available) {
                        addToCartBtn.disabled = false;
                        addToCartBtn.style.backgroundColor = '#28a745';
                        addToCartBtn.style.cursor = 'pointer';
                        addToCartBtn.style.opacity = '1';
                        addToCartBtn.title = '';
                    } else {
                        addToCartBtn.disabled = true;
                        addToCartBtn.style.backgroundColor = '#6c757d';
                        addToCartBtn.style.cursor = 'not-allowed';
                        addToCartBtn.style.opacity = '0.6';
                        addToCartBtn.title = 'This item is currently not available';
                    }
                }
            }
            
            // Save to localStorage
            saveAvailabilityToStorage();
            
            showToast(`${product.name} is now ${product.available ? 'available' : 'not available'}`, 'info');
        }
    } catch (error) {
        console.error('Toggle availability error:', error);
    }
}

// ==================== 🎯 RENDER MENU ====================
function renderMenu() {
    try {
        const container = document.getElementById('menuContainer');
        if (!container) return;

        container.innerHTML = '';

        const items = currentCategory === 'all'
            ? productCatalog
            : productCatalog.filter(p => p.category === currentCategory);

        if (items.length === 0) {
            container.innerHTML = `<div style="padding:40px;text-align:center;">No Products Found</div>`;
            return;
        }

        items.forEach(product => {
            try {
                const card = document.createElement('div');
                card.className = 'menu-item';
                card.setAttribute('data-category', product.category);
                card.setAttribute('data-name', product.name.toLowerCase());
                
                let pieceInfo = '';
                if (product.pieceCount) {
                    pieceInfo = `<div style="font-size:0.8rem; color:#666; margin-bottom:5px;">${product.pieceCount} pieces per pack</div>`;
                }
                
                // Set availability button color based on status
                const availabilityBtnColor = product.available ? '#28a745' : '#dc3545';
                const availabilityBtnText = product.available ? 'Available' : 'Not Available';
                
                // Set add to cart button state
                const addBtnDisabled = product.available ? '' : 'disabled';
                const addBtnColor = product.available ? '#28a745' : '#6c757d';
                const addBtnCursor = product.available ? 'pointer' : 'not-allowed';
                const addBtnOpacity = product.available ? '1' : '0.6';
                
                card.innerHTML = `
                    <img src="${product.image}" class="menu-item-img" alt="${product.name}" 
                         style="width:100%; height:160px; object-fit:cover; background-color:#f0f0f0;">
                    <div class="menu-item-details">
                        <h4 class="menu-item-name">${product.name}</h4>
                        ${pieceInfo}
                        <div class="menu-item-price">₱${product.price.toFixed(2)}</div>
                        <div style="display: flex; gap: 5px; margin-top: 10px;">
                            <button class="availability-toggle-btn" 
                                    data-id="${product.id}"
                                    style="flex: 1; padding: 8px; border: none; border-radius: 4px; 
                                           background-color: ${availabilityBtnColor}; color: white; 
                                           font-weight: bold; cursor: pointer; font-size: 0.8rem;">
                                ${availabilityBtnText}
                            </button>
                            <button class="add-to-cart-btn" 
                                    data-id="${product.id}" 
                                    ${addBtnDisabled}
                                    style="flex: 1; padding: 8px; border: none; border-radius: 4px; 
                                           background-color: ${addBtnColor}; color: white; 
                                           font-weight: bold; cursor: ${addBtnCursor}; 
                                           opacity: ${addBtnOpacity}; font-size: 0.8rem;">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `;
                
                const img = card.querySelector('img');
                img.onerror = function() { handleImageError(this, product.name); };
                
                // Add event listener for availability toggle button
                const availabilityBtn = card.querySelector('.availability-toggle-btn');
                if (availabilityBtn) {
                    availabilityBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleAvailability(product.id, availabilityBtn);
                    });
                }
                
                // Add event listener for add to cart button
                const addBtn = card.querySelector('.add-to-cart-btn');
                if (addBtn && product.available) {
                    addBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product.id);
                    });
                }
                
                container.appendChild(card);
            } catch (error) {
                console.error('Error creating card:', error);
            }
        });
    } catch (error) {
        console.error('Render error:', error);
    }
}

// ==================== 🛒 CART FUNCTIONS ====================
function addToCart(productId) {
    try {
        const product = productCatalog.find(p => p.id === productId);
        if (!product) return;
        
        // Check if product is available
        if (!product.available) {
            showToast(`${product.name} is not available`, 'error');
            return;
        }
        
        const existingItem = currentOrder.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity++;
            existingItem.subtotal = existingItem.quantity * existingItem.price;
        } else {
            currentOrder.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: 1,
                subtotal: product.price,
                pieceCount: product.pieceCount || null
            });
        }
        
        renderOrder();
        updatePayButtonState();
        showToast(`${product.name} added to cart!`);
    } catch (error) {
        console.error('Add to cart error:', error);
    }
}

function renderOrder() {
    try {
        const list = document.getElementById('productlist');
        const subtotalEl = document.getElementById('subtotal');
        const taxEl = document.getElementById('tax');
        const totalEl = document.getElementById('totals');

        if (!list) return;

        list.innerHTML = '';
        let subtotal = 0;

        currentOrder.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            let itemDisplayName = item.name;
            if (item.pieceCount) {
                itemDisplayName = `${item.name} (${item.quantity * item.pieceCount} pieces)`;
            }
            
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <div class="item-name">${itemDisplayName}</div>
                <div class="item-quantity">x${item.quantity}</div>
                <div class="item-price">₱${itemTotal.toFixed(2)}</div>
                <button class="remove-item-btn" onclick="removeFromCart(${index})">×</button>
            `;
            list.appendChild(li);
        });

        const total = subtotal;

        if (subtotalEl) subtotalEl.textContent = subtotal.toFixed(2);
        if (taxEl) taxEl.textContent = '0.00';
        if (totalEl) totalEl.textContent = total.toFixed(2);
        
        updateChangeDisplay();
    } catch (error) {
        console.error('Render order error:', error);
    }
}

function removeFromCart(index) {
    try {
        if (index >= 0 && index < currentOrder.length) {
            const item = currentOrder[index];
            currentOrder.splice(index, 1);
            renderOrder();
            updatePayButtonState();
            showToast(`${item.name} removed from cart`);
        }
    } catch (error) {
        console.error('Remove error:', error);
    }
}

// ==================== 🗑️ CLEAR CURRENT ORDER WITH POPUP ====================
function clearCurrentOrder() {
    try {
        if (currentOrder.length === 0) {
            showToast('No items to clear', 'info');
            return;
        }
        
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'clearOrderModal';
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-in-out;
        `;

        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background-color: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            width: 90%;
            text-align: center;
            animation: slideInUp 0.3s ease-in-out;
        `;

        // Add warning icon
        const warningIcon = document.createElement('div');
        warningIcon.innerHTML = '⚠️';
        warningIcon.style.cssText = `
            font-size: 48px;
            margin-bottom: 15px;
        `;

        // Add title
        const title = document.createElement('h3');
        title.textContent = 'Clear Current Order';
        title.style.cssText = `
            color: #dc3545;
            margin-bottom: 15px;
            font-size: 1.5rem;
        `;

        // Add message
        const message = document.createElement('p');
        message.textContent = `Are you sure you want to clear ${currentOrder.length} item(s) from your order?`;
        message.style.cssText = `
            color: #666;
            margin-bottom: 25px;
            font-size: 1rem;
            line-height: 1.5;
        `;

        // Calculate total for additional info
        const total = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Add order summary preview (optional)
        const summaryPreview = document.createElement('div');
        summaryPreview.style.cssText = `
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 25px;
            text-align: left;
            max-height: 200px;
            overflow-y: auto;
        `;
        
        let itemsList = '';
        currentOrder.slice(0, 5).forEach(item => {
            itemsList += `<div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9rem;">
                <span>${item.name} x${item.quantity}</span>
                <span>₱${(item.price * item.quantity).toFixed(2)}</span>
            </div>`;
        });
        
        if (currentOrder.length > 5) {
            itemsList += `<div style="text-align: center; color: #666; margin-top: 5px;">...and ${currentOrder.length - 5} more item(s)</div>`;
        }
        
        itemsList += `<div style="border-top: 1px solid #ddd; margin-top: 10px; padding-top: 10px; font-weight: bold; display: flex; justify-content: space-between;">
            <span>Total:</span>
            <span>₱${total.toFixed(2)}</span>
        </div>`;
        
        summaryPreview.innerHTML = itemsList;

        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
            display: flex;
            gap: 10px;
            justify-content: center;
        `;

        // Create confirm button
        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = 'Yes, Clear Order';
        confirmBtn.style.cssText = `
            padding: 12px 25px;
            background-color: #dc3545;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s;
            flex: 1;
        `;
        confirmBtn.onmouseover = () => {
            confirmBtn.style.backgroundColor = '#c82333';
        };
        confirmBtn.onmouseout = () => {
            confirmBtn.style.backgroundColor = '#dc3545';
        };

        // Create cancel button
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.style.cssText = `
            padding: 12px 25px;
            background-color: #6c757d;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s;
            flex: 1;
        `;
        cancelBtn.onmouseover = () => {
            cancelBtn.style.backgroundColor = '#5a6268';
        };
        cancelBtn.onmouseout = () => {
            cancelBtn.style.backgroundColor = '#6c757d';
        };

        // Add click handlers
        confirmBtn.onclick = () => {
            currentOrder = [];
            renderOrder();
            updatePayButtonState();
            document.body.removeChild(modalOverlay);
            showToast('Order cleared successfully', 'info');
        };

        cancelBtn.onclick = () => {
            document.body.removeChild(modalOverlay);
        };

        // Close when clicking outside
        modalOverlay.onclick = (e) => {
            if (e.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        };

        // Add ESC key handler
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(modalOverlay);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        // Assemble modal
        buttonContainer.appendChild(confirmBtn);
        buttonContainer.appendChild(cancelBtn);
        
        modalContent.appendChild(warningIcon);
        modalContent.appendChild(title);
        modalContent.appendChild(message);
        modalContent.appendChild(summaryPreview);
        modalContent.appendChild(buttonContainer);
        
        modalOverlay.appendChild(modalContent);
        
        // Add animation styles if not already present
        if (!document.querySelector('#modalAnimations')) {
            const style = document.createElement('style');
            style.id = 'modalAnimations';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideInUp {
                    from {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Add modal to body
        document.body.appendChild(modalOverlay);
        
    } catch (error) {
        console.error('Clear error:', error);
        showToast('Error clearing order', 'error');
    }
}

// ==================== 💳 ORDER TYPE FUNCTIONS ====================
function setOrderType(type) {
    try {
        orderType = type;
        const display = document.getElementById('orderTypeDisplay');
        if (display) display.textContent = type;
        
        const dineInBtn = document.getElementById('dineInBtn');
        const takeOutBtn = document.getElementById('takeOutBtn');
        
        if (dineInBtn) dineInBtn.classList.remove('selected');
        if (takeOutBtn) takeOutBtn.classList.remove('selected');
        
        if (type === 'Dine In') {
            if (dineInBtn) dineInBtn.classList.add('selected');
        } else {
            if (takeOutBtn) takeOutBtn.classList.add('selected');
        }
        
        updatePayButtonState();
    } catch (error) {
        console.error('Order type error:', error);
    }
}

// ==================== 💰 PAYMENT FUNCTIONS ====================
function selectPaymentMethod(method) {
    try {
        selectedPaymentMethod = method;
        const display = document.getElementById('paymentMethodDisplay');
        if (display) display.textContent = method === 'cash' ? 'Cash' : 'Gcash';
        
        const cashBtn = document.getElementById('cash-btn');
        const gcashBtn = document.getElementById('gcash-btn');
        const cashSection = document.getElementById('cashPaymentSection');
        
        if (cashBtn) cashBtn.classList.remove('selected');
        if (gcashBtn) gcashBtn.classList.remove('selected');
        
        if (method === 'cash') {
            if (cashBtn) cashBtn.classList.add('selected');
            if (cashSection) cashSection.style.display = 'block';
            calculateChange();
        } else {
            if (gcashBtn) gcashBtn.classList.add('selected');
            if (cashSection) cashSection.style.display = 'none';
            document.getElementById('changeAmount').textContent = '0.00';
            document.getElementById('changeDisplay').textContent = '0.00';
        }
        
        updatePayButtonState();
    } catch (error) {
        console.error('Payment method error:', error);
    }
}

function calculateChange() {
    try {
        if (selectedPaymentMethod !== 'cash') return;
        
        const paymentInput = document.getElementById('inputPayment');
        if (!paymentInput) return;
        
        const subtotal = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal;
        const payment = parseFloat(paymentInput.value) || 0;
        const change = payment - total;
        
        const changeAmount = document.getElementById('changeAmount');
        const changeDisplay = document.getElementById('changeDisplay');
        
        if (changeAmount) changeAmount.textContent = change >= 0 ? change.toFixed(2) : '0.00';
        if (changeDisplay) changeDisplay.textContent = change >= 0 ? change.toFixed(2) : '0.00';
        
        updatePayButtonState();
    } catch (error) {
        console.error('Calculate error:', error);
    }
}

function updateChangeDisplay() {
    try {
        if (selectedPaymentMethod === 'cash') calculateChange();
    } catch (error) {
        console.error('Update change error:', error);
    }
}

function updatePayButtonState() {
    try {
        const payButton = document.getElementById('payment-btn');
        if (!payButton) return;
        
        const subtotal = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal;
        
        let isValid = true;
        
        if (currentOrder.length === 0) isValid = false;
        if (!orderType) isValid = false;
        if (!selectedPaymentMethod) isValid = false;
        
        if (selectedPaymentMethod === 'cash') {
            const payment = parseFloat(document.getElementById('inputPayment')?.value) || 0;
            if (payment < total) isValid = false;
        }
        
        payButton.disabled = !isValid;
        payButton.style.opacity = payButton.disabled ? '0.6' : '1';
        payButton.style.backgroundColor = payButton.disabled ? '#6c757d' : '#28a745';
    } catch (error) {
        console.error('Update button error:', error);
    }
}

function processPayment() {
    try {
        if (currentOrder.length === 0) {
            showToast('Please add items to cart', 'error');
            return;
        }
        
        if (!orderType) {
            showToast('Please select order type', 'error');
            return;
        }
        
        if (!selectedPaymentMethod) {
            showToast('Please select payment method', 'error');
            return;
        }
        
        const subtotal = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal;
        
        if (selectedPaymentMethod === 'cash') {
            const payment = parseFloat(document.getElementById('inputPayment')?.value) || 0;
            if (payment < total) {
                showToast('Insufficient payment amount', 'error');
                return;
            }
        }
        
        showToast('Payment processed successfully!', 'success');
        generateReceipt();
        
        setTimeout(() => {
            clearCurrentOrder();
            resetPaymentForm();
        }, 1000);
    } catch (error) {
        console.error('Payment error:', error);
        showToast('Error processing payment', 'error');
    }
}

function generateReceipt() {
    try {
        const subtotal = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal;
        const payment = selectedPaymentMethod === 'cash' ? parseFloat(document.getElementById('inputPayment')?.value) || 0 : total;
        const change = payment - total;
        
        const receiptModal = document.getElementById('receiptModal');
        if (!receiptModal) return;
        
        document.getElementById('receiptOrderType').textContent = 
            `${orderType}${orderType === 'Dine In' ? ' - Table ' + TABLE_NUMBER : ''}`;
        document.getElementById('receiptDateTime').textContent = new Date().toLocaleString();
        document.getElementById('receiptOrderId').textContent = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        const tbody = document.querySelector('#receiptTable tbody');
        if (tbody) {
            tbody.innerHTML = '';
            currentOrder.forEach(item => {
                const row = tbody.insertRow();
                let itemName = item.name;
                if (item.pieceCount) {
                    itemName = `${item.name} (${item.quantity * item.pieceCount} pieces)`;
                }
                row.innerHTML = `<td>${itemName}</td><td>${item.quantity}</td><td>₱${(item.price * item.quantity).toFixed(2)}</td>`;
            });
        }
        
        document.getElementById('receiptSubtotal').textContent = subtotal.toFixed(2);
        document.getElementById('receiptTax').textContent = '0.00';
        document.getElementById('receiptTotal').textContent = total.toFixed(2);
        document.getElementById('receiptAmountPaid').textContent = payment.toFixed(2);
        document.getElementById('receiptChange').textContent = change >= 0 ? change.toFixed(2) : '0.00';
        
        receiptModal.style.display = 'flex';
    } catch (error) {
        console.error('Receipt error:', error);
    }
}

function closeReceipt() {
    try {
        document.getElementById('receiptModal').style.display = 'none';
    } catch (error) {
        console.error('Close receipt error:', error);
    }
}

function resetPaymentForm() {
    try {
        orderType = null;
        selectedPaymentMethod = null;
        
        document.getElementById('orderTypeDisplay').textContent = 'None';
        document.getElementById('paymentMethodDisplay').textContent = 'None';
        document.getElementById('inputPayment').value = '';
        document.getElementById('changeAmount').textContent = '0.00';
        document.getElementById('changeDisplay').textContent = '0.00';
        
        document.querySelectorAll('.dineinandtakeout-btn, .payment-method-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        document.getElementById('cashPaymentSection').style.display = 'none';
    } catch (error) {
        console.error('Reset error:', error);
    }
}

// ==================== 🔍 SEARCH AND FILTER ====================
function filterCategory(category) {
    try {
        currentCategory = category;
        
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) btn.classList.add('active');
        });
        
        renderMenu();
    } catch (error) {
        console.error('Filter error:', error);
    }
}

function searchFood(searchTerm) {
    try {
        const container = document.getElementById('menuContainer');
        if (!container) return;
        
        if (!searchTerm.trim()) {
            renderMenu();
            return;
        }
        
        const term = searchTerm.toLowerCase().trim();
        const filtered = productCatalog.filter(product => {
            if (currentCategory !== 'all' && product.category !== currentCategory) return false;
            return product.name.toLowerCase().includes(term);
        });
        
        container.innerHTML = '';
        
        if (filtered.length === 0) {
            container.innerHTML = `<div style="padding:40px;text-align:center;">No products match "${term}"</div>`;
            return;
        }
        
        filtered.forEach(product => {
            try {
                const card = document.createElement('div');
                card.className = 'menu-item';
                card.setAttribute('data-category', product.category);
                card.setAttribute('data-name', product.name.toLowerCase());
                
                let pieceInfo = '';
                if (product.pieceCount) {
                    pieceInfo = `<div style="font-size:0.8rem; color:#666; margin-bottom:5px;">${product.pieceCount} pieces per pack</div>`;
                }
                
                // Set availability button color based on status
                const availabilityBtnColor = product.available ? '#28a745' : '#dc3545';
                const availabilityBtnText = product.available ? 'Available' : 'Not Available';
                
                // Set add to cart button state
                const addBtnDisabled = product.available ? '' : 'disabled';
                const addBtnColor = product.available ? '#28a745' : '#6c757d';
                const addBtnCursor = product.available ? 'pointer' : 'not-allowed';
                const addBtnOpacity = product.available ? '1' : '0.6';
                
                card.innerHTML = `
                    <img src="${product.image}" class="menu-item-img" alt="${product.name}" 
                         style="width:100%; height:160px; object-fit:cover; background-color:#f0f0f0;">
                    <div class="menu-item-details">
                        <h4 class="menu-item-name">${product.name}</h4>
                        ${pieceInfo}
                        <div class="menu-item-price">₱${product.price.toFixed(2)}</div>
                        <div style="display: flex; gap: 5px; margin-top: 10px;">
                            <button class="availability-toggle-btn" 
                                    data-id="${product.id}"
                                    style="flex: 1; padding: 8px; border: none; border-radius: 4px; 
                                           background-color: ${availabilityBtnColor}; color: white; 
                                           font-weight: bold; cursor: pointer; font-size: 0.8rem;">
                                ${availabilityBtnText}
                            </button>
                            <button class="add-to-cart-btn" 
                                    data-id="${product.id}" 
                                    ${addBtnDisabled}
                                    style="flex: 1; padding: 8px; border: none; border-radius: 4px; 
                                           background-color: ${addBtnColor}; color: white; 
                                           font-weight: bold; cursor: ${addBtnCursor}; 
                                           opacity: ${addBtnOpacity}; font-size: 0.8rem;">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `;
                
                const img = card.querySelector('img');
                img.onerror = function() { handleImageError(this, product.name); };
                
                // Add event listener for availability toggle button
                const availabilityBtn = card.querySelector('.availability-toggle-btn');
                if (availabilityBtn) {
                    availabilityBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleAvailability(product.id, availabilityBtn);
                    });
                }
                
                // Add event listener for add to cart button
                const addBtn = card.querySelector('.add-to-cart-btn');
                if (addBtn && product.available) {
                    addBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product.id);
                    });
                }
                
                container.appendChild(card);
            } catch (error) {
                console.error('Error creating search card:', error);
            }
        });
    } catch (error) {
        console.error('Search error:', error);
    }
}

// ==================== 🚀 INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('🚀 Initializing POS System...');
        
        const yearEl = document.getElementById('currentYear');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
        
        const logoImg = document.querySelector('.logo-img');
        if (logoImg) {
            logoImg.onerror = function() {
                const canvas = document.createElement('canvas');
                canvas.width = 60;
                canvas.height = 60;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#FFA500';
                ctx.beginPath();
                ctx.arc(30, 30, 30, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#FFFFFF';
                ctx.font = 'bold 24px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('MS', 30, 30);
                this.src = canvas.toDataURL();
                this.onerror = null;
            };
        }
        
        if (!document.querySelector('link[rel="icon"]')) {
            const favicon = document.createElement('link');
            favicon.rel = 'icon';
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#FFA500';
            ctx.beginPath();
            ctx.arc(16, 16, 16, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('MS', 16, 16);
            favicon.href = canvas.toDataURL();
            document.head.appendChild(favicon);
        }
        
        loadMenuItems();
        
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => searchFood(e.target.value));
        }
        
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => filterCategory(btn.dataset.category));
        });
        
        document.getElementById('dineInBtn')?.addEventListener('click', () => setOrderType('Dine In'));
        document.getElementById('takeOutBtn')?.addEventListener('click', () => setOrderType('Take Out'));
        
        document.getElementById('cash-btn')?.addEventListener('click', () => selectPaymentMethod('cash'));
        document.getElementById('gcash-btn')?.addEventListener('click', () => selectPaymentMethod('gcash'));
        
        document.getElementById('inputPayment')?.addEventListener('input', calculateChange);
        
        document.getElementById('payment-btn')?.addEventListener('click', processPayment);
        
        document.getElementById('closeReceiptBtn')?.addEventListener('click', closeReceipt);
        
        const logoutBtn = document.querySelector('.logout-btn button');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handleLogout();
            });
        }
        
        console.log(`✅ POS System initialized with ${productCatalog.length} products`);
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

// ==================== EXPORT GLOBAL FUNCTIONS ====================
window.setOrderType = setOrderType;
window.selectPaymentMethod = selectPaymentMethod;
window.processPayment = processPayment;
window.clearCurrentOrder = clearCurrentOrder;
window.removeFromCart = removeFromCart;
window.closeReceipt = closeReceipt;
window.filterCategory = filterCategory;
window.searchFood = searchFood;
window.handleLogout = handleLogout;
window.toggleAvailability = toggleAvailability;