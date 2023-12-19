// Asynchronous function to generate a random recipe
async function generateRecipe() {
    try {
        // Fetch a random recipe from the API
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        
        // Parse the response as JSON
        const data = await response.json();
        
        // Extract the first meal from the response
        const recipe = data.meals[0];

        // Build the HTML content for the recipe
        const html = `
            <h2>${recipe.strMeal}</h2>
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h3>Ingredients:</h3>
            <ul>
                ${generateIngredientList(recipe)}
            </ul>
        `;

        // Set the generated HTML content in the 'recipe' element
        document.getElementById('recipe').innerHTML = html;
    } catch (error) {
        // Handle errors and log them to the console
        console.error('Error:', error);
    }
}

// Function to generate an ingredient list from the recipe data
function generateIngredientList(recipe) {
    let ingredientList = '';
    
    // Loop through possible ingredients (up to 20)
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        
        // Add the ingredient and measure to the list if both are present
        if (ingredient && measure) {
            ingredientList += `<li>${ingredient} - ${measure}</li>`;
        }
    }
    
    return ingredientList;
}

// Attach the generateRecipe function to the 'click' event of the specified button
document.getElementById('generateRecipe').addEventListener('click', generateRecipe);
