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
        const data = await res.json();
        showPokemonData(data);
    } catch (err) {
        displayErrorMessage(err.message);
    }
};

const showPokemonData = (data) => {
    // Update your DOM elements with the Pokémon data
    pokemonName.textContent = data.name;
    pokemonId.textContent = data.id;
    weight.textContent = data.weight;
    height.textContent = data.height;
    types.textContent = data.types.map(typeInfo => typeInfo.type.name).join(', ');
    hp.textContent = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
    attack.textContent = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
    defense.textContent = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
    specialAtk.textContent = data.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
    specialDef.textContent = data.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
    speed.textContent = data.stats.find(stat => stat.stat.name === 'speed').base_stat;
};

const displayErrorMessage = (message) => {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
};

searchBtn.addEventListener("click", fetchData);