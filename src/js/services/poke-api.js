import { mostrarPokemon } from "../main.js";
const URL = "https://pokeapi.co/api/v2/pokemon/";
const pokemonCache = {};

async function fetchPokemonData(id) {
	if (!pokemonCache[id]) {
		const response = await fetch(URL + id);
		const data = await response.json();
		pokemonCache[id] = data;
	}
	return pokemonCache[id];
}

async function fetchPokemons() {
	const requests = [];
	for (let i = 1; i <= 151; i++) {
		requests.push(fetchPokemonData(i));
	}

	const responses = await Promise.all(requests);
	responses.forEach((data) => mostrarPokemon(data));
}

export {fetchPokemons, pokemonCache};