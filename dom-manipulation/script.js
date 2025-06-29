const quoteDisplay = document.getElementById('quoteDisplay');
const categoryFilter = document.getElementById('categoryFilter');
const newQuoteBtn = document.getElementById('newQuote');

let quotes = [
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "tech" },
  { text: "Simplicity is the soul of efficiency.", category: "life" },
  { text: "Dream big, work hard, stay focused.", category: "motivation" }
];

newQuoteBtn.addEventListener('click', showRandomQuote);

function showRandomQuote() {
  const selected = categoryFilter.value;
  const filtered = selected === 'all'
    ? quotes
    : quotes.filter(q => q.category === selected);

  if (filtered.length === 0) {
    quoteDisplay.innerText = "No quotes found for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  quoteDisplay.innerText = filtered[randomIndex].text;
}

function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (!text || !category) {
    alert("Please enter both quote and category.");
    return;
  }

  quotes.push({ text, category });
  updateCategories();
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
  alert("Quote added!");
}

function updateCategories() {
  const uniqueCategories = Array.from(new Set(quotes.map(q => q.category)));
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  uniqueCategories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.innerText = cat.charAt(0).toUpperCase() + cat.slice(1);
    categoryFilter.appendChild(option);
  });
}

function filterQuotes() {
  showRandomQuote();
}

window.onload = () => {
  updateCategories();
  showRandomQuote();
};
