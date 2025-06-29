let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "Stay hungry, stay foolish.", category: "Inspiration" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Tech" },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuote");
const categoryFilter = document.getElementById("categoryFilter");
const importFile = document.getElementById("importFile");
const exportBtn = document.getElementById("exportBtn");
const notification = document.getElementById("notification");

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote() {
  const selectedCategory = categoryFilter.value;
  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  quoteDisplay.textContent = filteredQuotes[randomIndex].text;
  sessionStorage.setItem("lastQuote", quoteDisplay.textContent);
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) return;

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  showNotification("New quote added!");
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

function populateCategories() {
  const uniqueCategories = Array.from(new Set(quotes.map(q => q.category)));
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter) categoryFilter.value = savedFilter;
}

function filterQuotes() {
  localStorage.setItem("selectedCategory", categoryFilter.value);
  showRandomQuote();
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        showNotification("Quotes imported successfully!");
      }
    } catch {
      showNotification("Invalid JSON file.", true);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

function exportQuotesToJson() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
  showNotification("Quotes exported.");
}

function showNotification(msg, isError = false) {
  notification.style.color = isError ? "red" : "green";
  notification.textContent = msg;
  setTimeout(() => notification.textContent = "", 3000);
}

// ========== Event Listeners ==========
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);
categoryFilter.addEventListener("change", filterQuotes);
importFile.addEventListener("change", importFromJsonFile);
exportBtn.addEventListener("click", exportQuotesToJson);

// ========== Initialization ==========
populateCategories();
if (sessionStorage.getItem("lastQuote")) {
  quoteDisplay.textContent = sessionStorage.getItem("lastQuote");
} else {
  showRandomQuote();
}

// Optional Task 3 Simulation Placeholder (To be implemented later)
// === Task 3: Server Sync Logic ===

async function fetchQuotesFromServer() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    const serverQuotes = data.slice(0, 5).map(post => ({ text: post.title, category: "Server" }));
    return serverQuotes;
  } catch (err) {
    console.error("Failed to fetch from server", err);
    return [];
  }
}

async function postQuoteToServer(quote) {
  try {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote)
    });
    console.log("Quote posted to server");
  } catch (err) {
    console.error("Failed to post quote", err);
  }
}

async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  const combined = [...quotes, ...serverQuotes];
  const unique = [];
  const seen = new Set();
  combined.forEach(q => {
    const key = `${q.text}-${q.category}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(q);
    }
  });
  quotes = unique;
  saveQuotes();
  populateCategories();
  alert("Quotes synced with server!");
}

// === Event listeners ===
newQuoteBtn.addEventListener("click", showRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
categoryFilter.addEventListener("change", filterQuotes);

// === Initial setup ===
populateCategories();
showRandomQuote();
syncQuotes();
setInterval(syncQuotes, 30000);
