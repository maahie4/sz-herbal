// SZ Herbals Shopping Cart Script

// Product Database
const PRODUCTS_DB = {
  "Diabetes Reversal Bundle": {
    price: 399,
    image: "glukora-product-image-bundle-united-states.png",
    url: "products.html"
  },
  "Glukora": {
    price: 299,
    image: "glukora-product-image-united-states.png",
    url: "glukora.html"
  },
  "Livokara Gold": {
    price: 249,
    image: "livokara-gold-product-image.png",
    url: "livokara-gold.html"
  },
  "Figuva": {
    price: 149,
    image: "figuva-product-image-united-states.png",
    url: "Figuva.html"
  },
  "Slimzest": {
    price: 129,
    image: "slimzest-product-box-image-united-states.png",
    url: "slimzest.html"
  },
  "Globivin": {
    price: 149,
    image: "globivin-product-image-united-states.png",
    url: "globvin.html"
  }
};

// Cart State
let cart = [];

// Load Cart from localStorage
function loadCart() {
  const stored = localStorage.getItem("sz_herbals_cart");
  if (stored) {
    try {
      cart = JSON.parse(stored);
    } catch (e) {
      cart = [];
    }
  }
  updateNavBadges();
}

// Save Cart to localStorage
function saveCart() {
  localStorage.setItem("sz_herbals_cart", JSON.stringify(cart));
  updateNavBadges();
}

// Open / Close Cart Drawer
function openCart() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer && overlay) {
    drawer.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeCart() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer && overlay) {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// Add Item to Cart
function addToCart(name, qty = 1) {
  const prod = PRODUCTS_DB[name];
  if (!prod) return;

  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      name: name,
      price: prod.price,
      image: prod.image,
      qty: qty
    });
  }

  saveCart();
  renderCart();
  showToast(`${name} added to cart!`);
  openCart();
}

// Remove Item from Cart
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  saveCart();
  renderCart();
}

// Update Quantity
function updateQty(name, delta) {
  const item = cart.find(item => item.name === name);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(name);
      return;
    }
  }
  saveCart();
  renderCart();
}

// Render Cart Drawer Contents
function renderCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartFooter = document.getElementById("cartFooter");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItemsContainer) return;

  // Clear previous items
  cartItemsContainer.querySelectorAll('.cart-item').forEach(el => el.remove());

  if (cart.length === 0) {
    if (cartEmpty) cartEmpty.style.display = "flex";
    if (cartFooter) cartFooter.style.display = "none";
  } else {
    if (cartEmpty) cartEmpty.style.display = "none";
    if (cartFooter) cartFooter.style.display = "block";

    let total = 0;
    cart.forEach(item => {
      total += item.price * item.qty;
      const el = document.createElement("div");
      el.className = "cart-item";
      el.innerHTML = `
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price} USD</div>
          <div class="cart-item-meta">
            <div class="cart-qty">
              <button onclick="updateQty('${item.name}', -1)">−</button>
              <span>${item.qty}</span>
              <button onclick="updateQty('${item.name}', 1)">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.name}')">Remove</button>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(el);
    });

    if (cartTotal) {
      cartTotal.textContent = `$${total} USD`;
    }
  }
}

// Update navigation icons and badges
function updateNavBadges() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll(".nav-cart-badge, #cartBadge").forEach(badge => {
    badge.textContent = totalQty;
    badge.style.display = totalQty > 0 ? "flex" : "none";
  });
}

// Show temporary toast message
function showToast(message) {
  let toast = document.getElementById("cartToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cartToast";
    toast.className = "cart-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Inject Drawer HTML to body
function injectCartMarkup() {
  // Create overlay
  if (!document.getElementById("cartOverlay")) {
    const overlay = document.createElement("div");
    overlay.id = "cartOverlay";
    overlay.className = "cart-overlay";
    overlay.addEventListener("click", closeCart);
    document.body.appendChild(overlay);
  }

  // Create drawer
  if (!document.getElementById("cartDrawer")) {
    const drawer = document.createElement("div");
    drawer.id = "cartDrawer";
    drawer.className = "cart-drawer";
    drawer.innerHTML = `
      <div class="cart-header">
        <h3>Your Cart</h3>
        <button class="cart-close" id="cartClose">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="cart-items" id="cartItems">
        <div class="cart-empty" id="cartEmpty" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <svg viewBox="0 0 24 24" fill="none" stroke="#a6a6a6" stroke-width="1" style="width:48px;height:48px;"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          <p>Your cart is empty</p>
        </div>
      </div>
      <div class="cart-footer" id="cartFooter" style="display: none;">
        <div class="cart-total">
          <span>Total</span>
          <span id="cartTotal">$0 USD</span>
        </div>
        <a href="checkout.html" class="btn-checkout">Proceed to Checkout →</a>
      </div>
    `;
    document.body.appendChild(drawer);
    document.getElementById("cartClose").addEventListener("click", closeCart);
  }
}

// Modify existing headers/navs to add Cart Toggle
function setupNavbar() {
  // Find navigations and inject Cart Toggle button
  const navs = document.querySelectorAll("nav");
  navs.forEach(nav => {
    // Check if cart button is already injected
    if (nav.querySelector(".nav-cart-btn")) return;

    // Find the standard cta (Order Now button)
    const cta = nav.querySelector(".nav-cta");
    if (cta) {
      // Create a wrapper for CTA + Cart
      const cartBtn = document.createElement("button");
      cartBtn.className = "nav-cart-btn";
      cartBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        Cart
        <span class="nav-cart-badge" style="display:none;">0</span>
      `;
      cartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openCart();
      });

      // Insert before or replace Order Now link
      cta.parentNode.insertBefore(cartBtn, cta);
      
      // Let's modify the "Order Now" link to open the cart instead of orderform.html
      cta.href = "#";
      cta.addEventListener("click", (e) => {
        e.preventDefault();
        openCart();
      });
      cta.textContent = "Order Now";
    }
  });

  // Mobile menu overlays - replace orderform link with Cart open trigger
  const mobileLinks = document.querySelectorAll(".mobile-overlay a, .mobile-nav-link");
  mobileLinks.forEach(link => {
    if (link.getAttribute("href") === "orderform.html") {
      link.href = "#";
      link.textContent = "View Cart";
      link.addEventListener("click", (e) => {
        e.preventDefault();
        // Close mobile overlay if it has trigger classes
        const hamburger = document.getElementById("hamburger");
        const overlay = document.getElementById("mobileOverlay");
        if (hamburger) hamburger.classList.remove("active");
        if (overlay) overlay.classList.remove("open");
        document.body.style.overflow = "";

        setTimeout(openCart, 300);
      });
    }
  });
}

// Convert normal Order links to Add to Cart buttons
function interceptOrderLinks() {
  document.querySelectorAll("a, button").forEach(el => {
    const text = (el.textContent || "").toLowerCase();
    const href = el.getAttribute("href") || "";

    // If it points to orderform.html, it's a purchase intent
    if (href.includes("orderform.html") || el.classList.contains("btn-buy-now") || el.classList.contains("btn-order")) {
      // Determine product name based on context/page
      let productName = "";
      if (text.includes("glukora")) productName = "Glukora";
      else if (text.includes("livokara")) productName = "Livokara Gold";
      else if (text.includes("figuva")) productName = "Figuva";
      else if (text.includes("slimzest")) productName = "Slimzest";
      else if (text.includes("globivin")) productName = "Globivin";
      else if (text.includes("bundle")) productName = "Diabetes Reversal Bundle";
      else {
        // Fallback to active page title or context
        const path = window.location.pathname.toLowerCase();
        if (path.includes("glukora")) productName = "Glukora";
        else if (path.includes("livokara")) productName = "Livokara Gold";
        else if (path.includes("figuva")) productName = "Figuva";
        else if (path.includes("slimzest")) productName = "Slimzest";
        else if (path.includes("globvin")) productName = "Globivin";
      }

      if (productName) {
        // Prevent default navigation
        el.addEventListener("click", (e) => {
          e.preventDefault();
          addToCart(productName, 1);
        });
        // Update text/appearance
        if (el.tagName === "A") {
          el.removeAttribute("href");
          el.style.cursor = "pointer";
        }
        if (!text.includes("add")) {
          el.textContent = `Add ${productName} to Cart`;
        }
      }
    }
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  injectCartMarkup();
  setupNavbar();
  loadCart();
  renderCart();
  interceptOrderLinks();
});
