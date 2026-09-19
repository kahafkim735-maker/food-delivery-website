const menu = [
    { id: 1, name: "Spicy Beef Burger", price: 12.99, category: "Burger", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { id: 2, name: "Pepperoni Passion Pizza", price: 15.99, category: "Pizza", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500" },
    { id: 3, name: "Fire Wings (10pcs)", price: 10.99, category: "Chicken", img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500" },
    { id: 4, name: "Loaded Chili Fries", price: 7.99, category: "Sides", img: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500" },
    { id: 5, name: "Red Velvet Shake", price: 5.99, category: "Drinks", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },
    { id: 6, name: "Hot Lava Cake", price: 6.99, category: "Dessert", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500" }
  ];
  
  let cart = [];
  
  // Render Menu
  function renderMenu() {
    const grid = document.getElementById('foodGrid');
    grid.innerHTML = menu.map(item => `
      <div class="bg-black border border-neutral-800 rounded-xl overflow-hidden hover:border-red-600/50 transition">
        <img src="${item.img}" alt="${item.name}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h4 class="font-bold text-lg mb-1">${item.name}</h4>
          <div class="flex justify-between items-center mt-3">
            <span class="text-red-500 font-extrabold text-lg">$${item.price.toFixed(2)}</span>
            <button onclick="addToCart(${item.id})" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg font-semibold text-sm transition">
              + Add to Cart
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }
  
  // Cart Functions
  function addToCart(id) {
    const item = menu.find(i => i.id === id);
    const cartItem = cart.find(i => i.id === id);
    if (cartItem) {
      cartItem.qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }
    updateCart();
  }
  
  function updateQty(id, change) {
    const cartItem = cart.find(i => i.id === id);
    if (cartItem) {
      cartItem.qty += change;
      if (cartItem.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
      }
    }
    updateCart();
  }
  
  function updateCart() {
    const cartBadge = document.getElementById('cartBadge');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
  
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
    cartBadge.innerText = totalCount;
    cartTotal.innerText = `$${totalPrice.toFixed(2)}`;
  
    if (cart.length === 0) {
      cartItems.innerHTML = `<p class="text-neutral-500 text-center py-10">Your cart is empty.</p>`;
    } else {
      cartItems.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center bg-neutral-800/50 p-3 rounded-lg border border-neutral-800">
          <div>
            <h5 class="font-bold text-sm">${item.name}</h5>
            <p class="text-red-500 text-xs font-semibold">$${(item.price * item.qty).toFixed(2)}</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="updateQty(${item.id}, -1)" class="w-7 h-7 bg-neutral-700 hover:bg-neutral-600 rounded flex items-center justify-center font-bold text-sm">-</button>
            <span class="text-sm font-bold w-4 text-center">${item.qty}</span>
            <button onclick="updateQty(${item.id}, 1)" class="w-7 h-7 bg-red-600 hover:bg-red-700 rounded flex items-center justify-center font-bold text-sm">+</button>
          </div>
        </div>
      `).join('');
    }
  }
  
  // Modal Controls
  document.getElementById('cartBtn').onclick = () => document.getElementById('cartModal').classList.remove('hidden');
  document.getElementById('closeCart').onclick = () => document.getElementById('cartModal').classList.add('hidden');
  
  // Order Form Submission
  document.getElementById('checkoutForm').onsubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty! Add items before placing an order.");
      return;
    }
    const name = document.getElementById('custName').value;
    alert(`Thank you, ${name}! Your order has been placed successfully.`);
    cart = [];
    updateCart();
    document.getElementById('checkoutForm').reset();
    document.getElementById('cartModal').classList.add('hidden');
  };
  
  // Initialize
  renderMenu();