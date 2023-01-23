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