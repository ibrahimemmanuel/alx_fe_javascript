const quotes = [
  { text: "Stay hungry, stay foolish.", category: "Inspiration" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
];

function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.textContent = `"${random.text}" - (${random.category})`;
}

function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    quotes.push({ text, category });
    textInput.value = "";
    categoryInput.value = "";
    alert("Quote added!");
  }
}

// ✅ Ensure the event listener is attached AFTER DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
});
