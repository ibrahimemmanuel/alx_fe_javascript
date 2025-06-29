// Initial quotes array
const quotes = [
  { text: "Stay hungry, stay foolish.", category: "Motivation" },
  { text: "Simplicity is the soul of efficiency.", category: "Work" },
  { text: "Talk is cheap. Show me the code.", category: "Programming" }
];

// Function to display a random quote
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" - (${quote.category})`;
}

// Function to add a new quote to the array and update DOM
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (quoteText && quoteCategory) {
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    displayRandomQuote();
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

  // Display an initial quote on load
  displayRandomQuote();
});
