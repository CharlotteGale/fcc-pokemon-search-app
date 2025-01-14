// need to update to use external pokemon api
const pokeProxyAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAtk = document.getElementById('special-attack');
const specialDef = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const spriteContainer = document.getElementById('sprite-container');

const handleSearch = () => {
    const userInput = searchInput.value.trim().toLowerCase();
    if (!userInput) {
        return { valid: false, message: "Please enter a Pokémon name or ID" };
    }
    return { valid: true, query: userInput };
};

const fetchData = async () => {
    const searchParams = handleSearch();

    if (!searchParams.valid) {
        displayErrorMessage(searchParams.message);
        return;
    }

    try {
        const res = await fetch(`${pokeProxyAPI}/${searchParams.query}`);
        if (!res.ok) {
            throw new Error("Pokémon not found");
        }
        clearPreviousResults();
        const data = await res.json();
        showPokemonData(data);
    } catch (err) {
        displayErrorMessage(err.message);
    }
};

const clearPreviousResults = () => {
    pokemonName.textContent = "";
    pokemonId.textContent = "";
    weight.textContent = "";
    height.textContent = "";
    types.innerHTML = ""; 
    hp.textContent = "";
    attack.textContent = "";
    defense.textContent = "";
    specialAtk.textContent = "";
    specialDef.textContent = "";
    speed.textContent = "";
    spriteContainer.innerHTML = ""; 
};

const showPokemonData = (data) => {
    pokemonName.textContent = data.name;
    pokemonId.textContent = data.id;
    weight.textContent = data.weight;
    height.textContent = data.height;
    types.innerHTML = data.types.map(typeInfo => `<div>${typeInfo.type.name.toUpperCase()}</div>`).join(''); // Use innerHTML and template literals
    hp.textContent = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
    attack.textContent = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
    defense.textContent = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
    specialAtk.textContent = data.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
    specialDef.textContent = data.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
    speed.textContent = data.stats.find(stat => stat.stat.name === 'speed').base_stat;

    const sprite = document.createElement('img');
    sprite.id = "sprite";
    sprite.src = data.sprites.front_default;
    const spriteDiv = document.createElement('div');
    spriteDiv.appendChild(sprite);
    spriteContainer.appendChild(spriteDiv);
};

const displayErrorMessage = (message) => {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
};

searchBtn.addEventListener("click", fetchData);