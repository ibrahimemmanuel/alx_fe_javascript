// Initial Quotes Array
let quotes = [
  { text: "Success is not final, failure is not fatal", category: "Motivation" },
  { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
  { text: "The only way to do great work is to love what you do.", category: "Work" }
];

// Function to display a random quote
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Update DOM with quote text and category
  quoteDisplay.textContent = `"${randomQuote.text}" - (${randomQuote.category})`;
}

// Add event listener to "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// Function to add a new quote from form inputs
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText && newCategory) {
    const newQuote = { text: newText, category: newCategory };
    quotes.push(newQuote);
    textInput.value = "";
    categoryInput.value = "";
    alert("New quote added!");
  } else {
    alert("Please enter both quote and category.");
  }
}
