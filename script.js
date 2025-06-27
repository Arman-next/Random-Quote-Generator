const container = document.querySelector(".container-quote");
const quoteText = document.querySelector("#quote");
const authorName = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector(".loader");

function loading() {
  container.hidden = true;
  loader.hidden = false;
}

function loadComplete() {
  container.hidden = false;
  loader.hidden = true;
}

let data = [];

function newQuote() {
  loading();
  const quote = data[Math.floor(Math.random() * data.length)];
  if (!quote.author) {
    authorName.textContent = "Unknown";
  } else {
    authorName.textContent = quote.author;
  }
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  loadComplete();
}

async function getQuotes() {
  loading();
  const API = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(API);
    data = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
}

function tweetQuote() {
  const tweetURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorName.textContent}`;
  window.open(tweetURL, "_blank");
}

twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuote);

getQuotes();
