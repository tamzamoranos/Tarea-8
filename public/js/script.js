const pokemonListContainer = document.getElementById('pokemon-list');
const loadingMessage = document.querySelector('.pokemon-cards-container h2');

//Función asíncrona para obtener a los primeros 20 pokemón usando Fetch

async function fetchPokemons() {
 try{
    //ocultar mensaje Cargando pokemón
    if (loadingMessage){
        loadingMessage.style.display = 'none';
    }
    //Petición con fetch para obtener la lista de Pokemón
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20');

    if (!response.ok){
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    const pokemons = data.results;

    for (const pokemon of pokemons) {
        const pokemonDetailResponse = await fetch(pokemon.url);
        if (!pokemonDetailResponse.ok) {
            throw new Error(`Error al obtener detalles de ${pokemon.name}: ${pokemonDetailResponse.status}`);
        }
        const pokemonDetail = await pokemonDetailResponse.json();
        createPokemonCard(pokemonDetail);
    }
 } catch (error){
    console.error("Ocurrió un error al cargar los Pokemon!", error);
    
            if (pokemonListContainer) {
                pokemonListContainer.innerHTML = `
                    <div class="error-message">
                        <p>Lo sentimos, no pudimos cargar los Pokemón.</p>
                        <p>Por favor intenta de nuevo más tarde o verifica tu conexión de internet.</p>
                        <p>Detalle del error: ${error.message}</p>
                    `;
            }
            if (loadingMessage){
                loadingMessage.style.display = 'none';
            }
        } finally{
        console.log("Proceso de carga Pokemón finalizado.");
    }
}
function createPokemonCard(pokemon){
    const card = document.createElement('article');
    card.classList.add('pokemon-card');

    const imageURL = pokemon.sprites.front_default;
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    card.innerHTML = `
        <img src="${imageURL}" alt="${pokemonName}">
        <h3>${pokemonName}</h3>
    `;

    pokemonListContainer.appendChild(card);
}
document.addEventListener('DOMContentLoaded', fetchPokemons);