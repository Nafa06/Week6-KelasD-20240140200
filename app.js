const API_URL = "https://dummyjson.com/products?limit=100"; //[cite: 6]
const grid = document.getElementById("productGrid");
const statusMsg = document.getElementById("status");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");

let productsData = [];

function formatPrice(usd) {
  return `$${usd.toFixed(2)}`;
}

function render(products) {
  grid.innerHTML = "";
  if (products.length === 0) {
    statusMsg.textContent = "No products found.";
    statusMsg.style.display = "block";
    return;
  }
  
  statusMsg.style.display = "none";
  
  const html = products.map(p => `
    <div class="card">
      <img src="${p.thumbnail}" alt="${p.title}" class="card-img" loading="lazy">
      <div class="card-content">
        <span class="category">${p.category}</span>
        <h3 class="card-title">${p.title}</h3>
        <div class="card-footer">
          <span class="price">${formatPrice(p.price)}</span>
          <span class="rating">★ ${p.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  `).join('');
  
  grid.innerHTML = html;
}

function populateCategories(products) {
  const categories = [...new Set(products.map(p => p.category))].sort();
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categorySelect.appendChild(option);
  });
}

function handleFilter() {
  const keyword = searchInput.value.toLowerCase();
  const category = categorySelect.value;

  const filtered = productsData.filter(p => {
    const matchKeyword = p.title.toLowerCase().includes(keyword);
    const matchCategory = category ? p.category === category : true;
    return matchKeyword && matchCategory;
  });

  render(filtered);
}

async function fetchData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    
    const data = await response.json();
    productsData = data.products;
    
    populateCategories(productsData);
    render(productsData);
  } catch (error) {
    statusMsg.textContent = `Error loading data: ${error.message}`;
    console.error(error);
  }
}

searchInput.addEventListener("input", handleFilter);
categorySelect.addEventListener("change", handleFilter);
document.addEventListener("DOMContentLoaded", fetchData);