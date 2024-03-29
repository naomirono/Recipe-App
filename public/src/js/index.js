// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVsH0eTcLIGUqtqeLpL29bkEb6Acg99Ho",
  authDomain: "neyo-recipe-app.firebaseapp.com",
  projectId: "neyo-recipe-app",
  storageBucket: "neyo-recipe-app.appspot.com",
  messagingSenderId: "742274429283",
  appId: "1:742274429283:web:37a76743b5f4e568c86356",
  measurementId: "G-2GL7DPX11C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const searchForm = document.querySelector("form"); //Grabs details inside form from index.html
const searchResult = document.querySelector(".search-result");//Grabs details inside search-result from index.html
const container = document.querySelector(".container");//Grabs details inside container from index.html
let searchQuery = "";

//edaman food api
const APP_ID = "6219b320";
const APP_key = "a34bab09192e96a8d39ca34db1aeaf71";

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;//picks input of the search results
    fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=21`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
    container.classList.remove("initial");
    let generatedHTML = "";
    results.map((result) => {
      generatedHTML += `
                <div class="item">
                <img src="${result.recipe.image}" alt="img">
                    <div class="flex-container">
                        <h1 class="title">${result.recipe.label}</h1>
                        <a class="view-btn" href="${result.recipe.url}" target="_blank">View recipe</a>
                    </div>
                    <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
                </div>
      `;
    });
    searchResult.innerHTML = generatedHTML;
  }