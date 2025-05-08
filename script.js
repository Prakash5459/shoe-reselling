let featuredProducts = [
  {
    name: "Nike Air Max 90",
    price: 150,
    img: "nike1.jpg",
    images: ["nike1.jpg", "nike1-side.jpg", "nike1-back.jpg"]
  },
  {
    name: "Adidas Ultraboost",
    price: 140,
    img: "adidas1.png",
    images: ["adidas1.jpg", "adidas1-side.jpg"]
  },
  {
    name: "Puma RS-X",
    price: 130,
    img: "puma1.png",
    images: ["puma1-side.png", "puma1-top.png"]
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}
function registerUser() {
  const email = document.getElementById("signup-email").value;
  const pass = document.getElementById("signup-password").value;
  localStorage.setItem("user", JSON.stringify({ email, pass }));
  alert("Registered!");
  closeModal("signup-modal");
}
function loginUser() {
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-password").value;
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email === email && user.pass === pass) {
    alert("Login successful");
    closeModal("login-modal");
    localStorage.setItem("session", "token_" + Date.now());
  } else {
    alert("Invalid credentials");
  }
}
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = cart.length;
}
function showLoadingSkeletons() {
  const container = document.getElementById("featured-products");
  if (!container) return;
  container.innerHTML = `<div class="skeleton"></div>`.repeat(6);
}
function renderProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return;
  container.innerHTML = featuredProducts.map((p, i) => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}" class="zoom" />
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="openQuickView(${i})">Quick View</button>
    </div>
  `).join('');
}
function openQuickView(index) {
  const p = featuredProducts[index];
  document.getElementById("quick-img").src = p.img;
  document.getElementById("quick-title").textContent = p.name;
  document.getElementById("quick-desc").textContent = "Premium quality. Best comfort.";
  const carousel = document.getElementById("quick-images");
  carousel.innerHTML = p.images.map(img => `
    <img src="${img}" onclick="document.getElementById('quick-img').src='${img}'" />
  `).join('');
  document.getElementById("quickViewModal").style.display = "flex";
  document.getElementById("quickViewModal").dataset.index = index;
}
function closeQuickView() {
  document.getElementById("quickViewModal").style.display = "none";
}
function addQuickViewToCart() {
  const index = document.getElementById("quickViewModal").dataset.index;
  const size = document.getElementById("quick-size").value;
  const product = { ...featuredProducts[index], size };
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  showToast("Added with size " + size);
  updateCartCount();
  closeQuickView();
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
function openLogin() {
  document.getElementById("login-modal").style.display = "flex";
}
function openSignup() {
  document.getElementById("signup-modal").style.display = "flex";
}
function filterProducts() {
  const input = document.getElementById("searchBar").value.toLowerCase();
  const filtered = featuredProducts.filter(p => p.name.toLowerCase().includes(input));
  const container = document.getElementById("featured-products");
  if (!container) return;
  container.innerHTML = filtered.map((p, i) => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}" class="zoom" />
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="openQuickView(${i})">Quick View</button>
    </div>
  `).join('');
}
window.onload = function () {
  showLoadingSkeletons();
  setTimeout(() => {
    renderProducts();
    updateCartCount();
  }, 1000);
};
