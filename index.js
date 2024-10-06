document.addEventListener("DOMContentLoaded", () => {
 const recipeGrid = document.getElementById("recipeGrid")

 fetch("https://api.sampleapis.com/recipes/recipes")
  .then((response) => response.json())
  .then((data) => {
   data.forEach((recipe, index) => {
    const recipeItem = document.createElement("div")
    recipeItem.classList.add("col-12", "col-sm-6", "col-md-4", "recipe-item")
    recipeItem.innerHTML = `
          <img src="${recipe.photoUrl}" alt="${recipe.title}">
          <h5 class="mt-2">${recipe.title}</h5>
          <div class="details" id="details-${index}">
            <h6>Ingredients:</h6>
            <ul id="ingredients-list-${index}"></ul>
            <a href="${recipe.url}" target="_blank" class="btn default mt-2">View Full Recipe</a>
          </div>
        `
    recipeGrid.appendChild(recipeItem)

    const ingredientsList = document.getElementById(`ingredients-list-${index}`)
    recipe.ingredients.split("\n").forEach((ingredient) => {
     const listItem = document.createElement("li")
     listItem.textContent = ingredient
     ingredientsList.appendChild(listItem)
    })

    recipeItem.addEventListener("click", () => {
     const details = document.getElementById(`details-${index}`)
     details.classList.toggle("active")
    })
   })
  })
  .catch((error) => console.error("Error fetching recipes:", error))
})
