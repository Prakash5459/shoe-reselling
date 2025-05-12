let featuredProducts = [
  { name: "Nike Air Max 90", price: 150, img: "nike1.jpg", images: ["nike1.jpg", "nike1-side.jpg", "nike1-back.jpg"] },
  { name: "Adidas Ultraboost", price: 140, img: "adidas1.png", images: ["adidas1.png", "adidas1-side.png"] },
  { name: "Puma RS-X", price: 130, img: "puma1.png", images: ["puma1-side.png", "puma1-top.png"] }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = cart.length;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

function openQuickView(index) {
  const p = featuredProducts[index];
  document.getElementById("quick-img").src = p.img;
  document.getElementById("quick-title").textContent = p.name;
  document.getElementById("quick-desc").textContent = `$${p.price} - Premium quality. Best comfort.`;
  const carousel = document.getElementById("quick-images");
  carousel.innerHTML = p.images.map(img => `<img src="${img}" onclick="document.getElementById('quick-img').src='${img}'" />`).join('');
  document.getElementById("quickViewModal").style.display = "flex";
  document.getElementById("quickViewModal").dataset.index = index;
}

function closeQuickView() {
  document.getElementById("quickViewModal").style.display = "none";
}

function addQuickViewToCart() {
  const index = document.getElementById("quickViewModal").dataset.index;
  const size = document.getElementById("quick-size").value;
  const product = featuredProducts[index];
  const selectedImage = document.getElementById("quick-img").src;
  const item = { name: product.name, price: parseFloat(product.price), size: size, image: selectedImage };
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast("Item added to cart!");
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
  container.innerHTML = filtered.map((p, i) => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="openQuickView(${i})">Quick View</button>
    </div>
  `).join('');
}

window.onload = function () {
  const container = document.getElementById("featured-products");
  container.innerHTML = featuredProducts.map((p, i) => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="openQuickView(${i})">Quick View</button>
    </div>
  `).join('');
  updateCartCount();
};
