const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuotes = [];

// hiddening quote container when loading and reverse
//SHOW LOADING
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// COMPLETE FUNCTION
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

//Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from apiQuote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // to check if author field is blank and replace it with unknown
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //check the quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  complete();
  quoteText.textContent = quote.text;
}
// Get quotes from API
// Asynchronous function can run anytime and dosen't stop page from reloading
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  // try/catch help us to attempt a fetch request, but if it failed, return the error and we do sth with it

  try {
    // our const will be set only if we have data fetched from our api, otherwise it'll be undefined
    // if we didn't do asynchronous and await, it'll try  to set response value before it gets
    // anychance to fetch, and it'll return error
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //catch error here
    alert(error);
  }
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
// On Load
getQuotes();
