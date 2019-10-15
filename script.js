// Make sure SW is supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('sw.js')
        .catch(error => console.log(`Service Worker: Error: ${error}`))
    });    
}

let pageTitle = document.querySelector('#title');
let body = document.querySelector('body');
let pageExplanation = document.querySelector('#explanation');
let pageDate = document.querySelector('#date');
let button = document.querySelector('#read-more');

// retrieve Nasa API Data
fetch('https://api.nasa.gov/planetary/apod?api_key=OYmcFk9suUpheeKksdpSAAad2vyFmrDDE1qF5ie3')
.then(response => {
    let myResponse = response.json();    
    return myResponse;
})
.then(data => {
    let date = data.date;
    let newDate = date.split('-', 3);
    let month = newDate[1];
    let day = newDate[2];
    let year = newDate[0];   
    
    let title = data.title;
    let explanation = data.explanation;
    let url = data.hdurl;

    pageTitle.textContent = title;
    pageExplanation.textContent = explanation;
    pageDate.textContent = `${month} . ${day} . ${year}`;
    body.style.backgroundImage = `url(${url})`;
})
.catch(error => console.log(error));

button.addEventListener('click', (e) => {
    if (e.target.textContent === "Read More") {
        pageExplanation.style.opacity = '1';
        button.textContent = 'Hide';
    } else if (e.target.textContent === "Hide") {
        pageExplanation.style.opacity = '0';
        button.textContent = 'Read More';
    }
    
})
