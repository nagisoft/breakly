const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];



//setting the theme color to be random colors each new quote
const setColor = () => {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        document.querySelector(".blockquote").style.borderLeft = "0.5rem solid #" +randomColor;
        var style = document.querySelector('.blockquote').style;
        const root = document.querySelector(":root"); //grabbing the root element
        root.style.setProperty("--pseudo-backgroundcolor", "#"+randomColor);
        newQuoteBtn.style.backgroundColor="#"+randomColor;
    }


// Show New Quote
function newQuote() {
    setColor();
    // Pick a random quote from array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // If Author field is blank replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    
    //  show quote
    quoteText.textContent = quote.text;
}

// Get Quotes From API
async function getQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    newQuote();
  }
}


//on each click generate new quote from API
newQuoteBtn.addEventListener('click', newQuote);

// after loading

getQuotes();
