window.addEventListener("load", async (e) => {
    const url = 'https://the-vegan-recipes-db.p.rapidapi.com/';

    // Check if data is available in local storage
    const recipesData = localStorage.getItem('recipes');

    if (recipesData) {
        // If data is available, parse and use it directly
        const recipes = JSON.parse(recipesData);
        constructRecipes(recipes);
    } else {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'fc5b84e93fmsh3e50352ea650243p11d166jsn47ecbe7506b5',
                'x-rapidapi-host': 'the-vegan-recipes-db.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json(); // Parse response as JSON

            // Save data to localStorage
            localStorage.setItem('recipes', JSON.stringify(result)); // Store recipes in local storage

            constructRecipes(result); // Pass recipes array to constructRecipes function

        } catch (error) {
            console.error(error);
        }
    }
});

function constructRecipes(recipes) {
    const container = document.getElementById('main-container');

    recipes.forEach(recipe => {

        // Create a new recipe card div
        const card = document.createElement('div');
        card.classList.add('bg-white', 'shadow-lg', 'rounded-lg', 'overflow-hidden', 'recipe-card', 'p-4', 'md:p-6');

        // Create image element
        const image = document.createElement('img');
        image.src = recipe.image;
        image.alt = recipe.title;
        image.classList.add('w-full', 'h-48', 'md:h-64', 'object-cover', 'recipe-image', 'rounded-md');

        // Create title element
        const title = document.createElement('h3');
        title.textContent = recipe.title;
        title.classList.add('font-bold', 'text-lg', 'md:text-xl', 'mb-2', 'recipe-title');

        // Create difficulty level paragraph
        const difficulty = document.createElement('p');
        difficulty.textContent = `Difficulty: ${recipe.difficulty}`;
        difficulty.classList.add('font-semibold', 'text-base', 'md:text-lg', 'recipe-difficulty');

        // Create view recipe button
        const button = document.createElement('button');
        button.textContent = 'View Recipe';
        button.classList.add('mt-4', 'bg-yellow-500', 'hover:bg-yellow-400', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'recipe-button', 'w-full', 'md:w-auto', 'text-center');

        // Add event listener to button to navigate to recipe.html
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Use window.location.assign to navigate to recipe.html
            window.location.assign('recipe.html' + '?id=' + recipe.id);
        });

        // Append elements to card
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(difficulty);
        card.appendChild(button);

        // Append card to container
        container.appendChild(card);
    });
}
