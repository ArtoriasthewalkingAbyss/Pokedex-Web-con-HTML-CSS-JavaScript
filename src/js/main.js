import { fetchPokemons, pokemonCache } from "./services/poke-api";
const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");

function mostrarPokemon(poke) {

	let tipos = poke.types.map((type) => `<li class="${type.type.name} tipo">${type.type.name}</li>`);
	tipos = tipos.join("");

	let pokeId = poke.id.toString();
	if (pokeId.length === 1) {
		pokeId = "00" + pokeId;
	} else if (pokeId.length === 2) {
		pokeId = "0" + pokeId;
	}

	const li = document.createElement("li");
	li.classList.add("pokemon");
	li.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <section class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <ul class="pokemon-tipos">
                ${tipos}
            </ul>
            <ul class="pokemon-stats">
                <li class="stat">${poke.height}m</li>
                <li class="stat">${poke.weight}kg</li>
            </ul>
        </section>
    `;
	listaPokemon.append(li);
}

fetchPokemons();

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
	const botonId = event.currentTarget.id;

	listaPokemon.innerHTML = "";

	for (let i = 1; i <= 151; i++) {
		if(botonId === "ver-todos") {
			mostrarPokemon(pokemonCache[i]);
		} else {
			const tipos = pokemonCache[i].types.map(type => type.type.name);
			if (tipos.some(tipo => tipo.includes(botonId))) {
				mostrarPokemon(pokemonCache[i]);
			}
		}
	}
}));

export {mostrarPokemon};