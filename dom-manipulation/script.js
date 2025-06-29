// Get DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const categoryFilter = document.getElementById('categoryFilter');
const exportBtn = document.getElementById('exportBtn');
const importInput = document.getElementById('importFile');

// Quotes array (with fallback to localStorage)
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only limit is your mind.", category: "Motivation" },
  { text: "Stay hungry. Stay foolish.", category: "Inspiration" },
  { text: "Simplicity is the soul of efficiency.", category: "Tech" }
];

// Load last selected category
let selectedCategory = localStorage.getItem('selectedCategory') || 'all';

// Show a random quote
function displayRandomQuote() {
  const filtered = selectedCategory === 'all' 
    ? quotes 
    : quotes.filter(q => q.category === selectedCategory);

  if (filtered.length === 0) {
    quoteDisplay.textContent = "No quotes available in this category.";
    return;
  }

  const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
  quoteDisplay.textContent = `"${randomQuote.text}" — ${randomQuote.category}`;
}

// Add new quote
function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  if (!text || !category) {
    alert("Please fill in both quote and category.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  displayRandomQuote();

  newQuoteText.value = '';
  newQuoteCategory.value = '';
}

// Save to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate dropdown with categories
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    if (cat === selectedCategory) option.selected = true;
    categoryFilter.appendChild(option);
  });
}

// Filter quote list based on selected category
function filterQuotes() {
  selectedCategory = categoryFilter.value;
  localStorage.setItem('selectedCategory', selectedCategory);
  displayRandomQuote();
}

// Export to JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (!Array.isArray(imported)) throw new Error("Invalid format");
      quotes.push(...imported);
      saveQuotes();
      populateCategories();
      displayRandomQuote();
      alert("Quotes imported successfully!");
    } catch (err) {
      alert("Failed to import quotes. Check your file format.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event Listeners
newQuoteBtn.addEventListener("click", displayRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);
categoryFilter.addEventListener("change", filterQuotes);
exportBtn.addEventListener("click", exportToJsonFile);
importInput.addEventListener("change", importFromJsonFile);

// Init on page load
populateCategories();
displayRandomQuote();
