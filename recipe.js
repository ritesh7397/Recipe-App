window.addEventListener('load', async () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const recipeId = urlParams.get('id');

    const url = `https://the-vegan-recipes-db.p.rapidapi.com/${recipeId}`;
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
        console.log(result);

        // Call function to populate recipe details
        populateRecipeDetails(result);
    } catch (error) {
        console.error(error);
    }
});


function populateRecipeDetails(recipeData) {
    const container = document.getElementById('recipe-container');
    container.classList.add('max-w-screen-lg', 'mx-auto', 'p-4', 'md:p-8'); // Center the container and add padding

    // Create elements for recipe details
    const title = document.createElement('h1');
    title.textContent = recipeData.title;
    title.classList.add('text-2xl', 'md:text-4xl', 'font-bold', 'mb-4', 'text-center', 'md:text-left');

    const image = document.createElement('img');
    image.src = recipeData.image;
    image.alt = recipeData.title;
    image.classList.add('w-full', 'rounded', 'mb-6', 'object-cover', 'h-64', 'md:h-96');

    const difficulty = document.createElement('p');
    difficulty.textContent = `Difficulty: ${recipeData.difficulty}`;
    difficulty.classList.add('text-gray-700', 'mb-2', 'text-lg');

    const portion = document.createElement('p');
    portion.textContent = `Portion: ${recipeData.portion}`;
    portion.classList.add('text-gray-700', 'mb-2', 'text-lg');

    const time = document.createElement('p');
    time.textContent = `Time: ${recipeData.time}`;
    time.classList.add('text-gray-700', 'mb-2', 'text-lg');

    const description = document.createElement('p');
    description.textContent = recipeData.description;
    description.classList.add('text-gray-800', 'mb-4', 'text-base', 'md:text-lg');

    const ingredientsTitle = document.createElement('h2');
    ingredientsTitle.textContent = 'Ingredients';
    ingredientsTitle.classList.add('text-lg', 'md:text-xl', 'font-semibold', 'mb-2', 'mt-4');

    const ingredientsList = document.createElement('ul');
    ingredientsList.classList.add('list-disc', 'list-inside', 'pl-4');
    recipeData.ingredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient;
        listItem.classList.add('text-gray-700', 'mb-1', 'text-base', 'md:text-lg');
        ingredientsList.appendChild(listItem);
    });

    const methodTitle = document.createElement('h2');
    methodTitle.textContent = 'Method';
    methodTitle.classList.add('text-lg', 'md:text-xl', 'font-semibold', 'mb-2', 'mt-4');

    const methodList = document.createElement('ol');
    methodList.classList.add('list-decimal', 'list-inside', 'pl-4');
    recipeData.method.forEach((step, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${Object.keys(step)[0]}: ${Object.values(step)[0]}`;
        listItem.classList.add('text-gray-700', 'mb-1', 'text-base', 'md:text-lg');
        methodList.appendChild(listItem);
    });

    // Append elements to container in a logical order
    container.appendChild(title);
    container.appendChild(image);
    container.appendChild(difficulty);
    container.appendChild(portion);
    container.appendChild(time);
    container.appendChild(description);
    container.appendChild(ingredientsTitle);
    container.appendChild(ingredientsList);
    container.appendChild(methodTitle);
    container.appendChild(methodList);
}
