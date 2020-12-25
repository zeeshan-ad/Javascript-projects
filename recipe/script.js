const searchVal = document.getElementById("searchVal");

async function searchMeal(searchVal){
    const resp = await  fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchVal
    );
    const respData = await resp.json();
    const meals = respData.meals;
    return meals;
}

searchVal.addEventListener("keypress", function(event) {
  if (event.key === 'Enter') {
   document.getElementById("submitBtn").click();
  }
});

submitBtn.addEventListener("click", async () => {
    const searchVal = document.getElementById("searchVal").value;
    const meals = await searchMeal(searchVal);
    const feed = document.getElementById("feed");
    if(meals){
        feed.innerHTML="";
        meals.forEach((meal) =>{
            const mealAr = Object.values(meal);
            const ingredientsList = mealAr.slice(9,29);
            const ingredients = ingredientsList.filter((value)=>{
                if(value!=="")
                return value;
            });
            feed.innerHTML += `<table class="tableDesign">
            <tr class="rowHead">
            <td><h3>${meal.strMeal}</h3></td>
            <td><h4>Ingredients</h4></td>
            <td><h4>Direction</h4></td>
            </tr>
            <tr>
            <td valign="top">
            <img src="${meal.strMealThumb}">
            </td>
            <td class="ingred" valign="top">
            <ul>${ingredients
                .map(
                    (ing) =>`
                    
            <li>${ing}</li>`
            
                )
                .join("")}

            </ul></td>
            <td class="direction" valign="top">
            <p>${meal.strInstructions}</p>
            </td>
            </tr>
            <table>`;
        });
    }
});