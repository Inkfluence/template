const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes =[];

// show loading 
function loading(){
    loader.hidden = false; 
    quoteContainer.hidden =true;
}
// hide loading
function complete(){
   quoteContainer.hidden = false;
   loader.hidden = true; 
}

// new quote 
function newQuote(){
    loading();
    // randon quote from api quote arrary
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];

    // if Author field is blank replace it with unknwn
    if(!quote.author){
        quoteAuthor.textContent ='Unknown';
    }else{
        quoteAuthor.textContent = quote.author;
    }
    
    // Check the length of the quete to determine the style
    if(quote.text.length>100){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // set quote and hide loader
    quoteText.textContent =quote.text;
    complete();
} 
// getting the quotes from API we ll use async 
async function getQuotes(){
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
       newQuote();


    }catch(error){
        // catch the error here 
        alert(error);
    }
}

// Quote tweet and using the backtixk we can embed the variables into the strings without concatenating as below passing on the parameters 
function tweetQuote(){
const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent} `; 
window.open(twitterUrl,'_blank'); 
}
// `` is different than '' 
// on load 

// Event listeer

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
