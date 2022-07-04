const pokeName = document.querySelector("#pokeName")
const pokeImg = document.querySelector("#pokeimg")
const pokeDesc = document.querySelector("#desc")
const pokeHp = document.querySelector("#hp")
const pokeDmg = document.querySelector("#dmg")
const pokeDef = document.querySelector("#dfs")
const pokeVel = document.querySelector("#vel")
const pokeSpDmg = document.querySelector("#sp-dmg")
const pokeSpDef = document.querySelector("#sp-def")
const pokemonsList = document.querySelector('#pokemons')
const BASE_API = "https://pokeapi.co/api/v2"
const pokemon_API = `${BASE_API}/pokemon`



let currentPokemon;
let sprites = []
let currentSprite =0;
let listPokemons = '';

const fetchData = (API) =>{
    return fetch(API)
        .then((res)=> res.json()) //res de respuesta
        .then((data) => data)
}

const writeDescription = (API,node) => {
    fetchData(API).then(specie => {
        node.textContent = specie.flavor_text_entries[0].flavor_text;
    })
}

const printPokemon = (pokemon) => {
    window.scroll({
        top: 10,
        left: 100,
        behavior: 'smooth'
      });
    fetchData (`${pokemon_API}/${pokemon}`).then(data => {
        if(sprites.length>0){
            sprites = [];
        }
        //console.log(data)
        currentPokemon = data
        pokeName.textContent = data.name
        pokeImg.src = data.sprites.front_default
        pokeHp.textContent = data.stats[0].base_stat   
        pokeDmg.textContent = data.stats[1].base_stat
        pokeDef.textContent = data.stats[2].base_stat
        pokeSpDmg.textContent = data.stats[3].base_stat
        pokeSpDef.textContent = data.stats[4].base_stat
        pokeVel.textContent = data.stats[5].base_stat

        pokeHp.style.width = `${data.stats[0].base_stat/2}%`
        pokeDmg.style.width = `${data.stats[1].base_stat/2}%`
        pokeDef.style.width = `${data.stats[2].base_stat/2}%`
        pokeSpDmg.style.width = `${data.stats[3].base_stat/2}%`
        pokeSpDef.style.width = `${data.stats[4].base_stat/2}%`
        pokeVel.style.width = `${data.stats[5].base_stat/2}%`
        writeDescription(data.species.url , pokeDesc);
        pokeDesc.textContent = data.name
        const pokeSprites = currentPokemon.sprites;
        for (const key in pokeSprites) {
            if(typeof pokeSprites[key]==="string"){
                sprites.push(pokeSprites[key])
            }
        }
        //console.log(sprites)
    })

}

const printPokemons = (API) => {
    const loader = document.createElement("li")
    loader.innerHTML = '';
    loader.classList.add('loader')
    pokemonsList.append(loader)
    fetchData(API).then(pokemons => {
        loader.remove();
        listPokemons = pokemons
        pokemons.results.map(pokemon =>{
            const listItem = document.createElement("li")
            fetchData(pokemon.url).then(details =>{
                listItem.classList.add("default")
                listItem.classList.add(details.types[0].type.name)
                //console.log(details.sprites)
                listItem.innerHTML = `
                <img src=${details.sprites.front_default} alt=${details.name}/>
                <div>
                    <h3>${details.name}</h3>
                    <div class="types">
                    ${details.types.map((type) => `<span>${type.type.name}</span>`)}
                    </div>
                    <p id=${details.name}></p>
                    <button onclick=printPokemon(${details.id})>Show Pokemon</button>
                </div>
                `;
                const detailsPok = document.querySelector(`#${details.name}`)
                writeDescription(details.species.url, detailsPok);
            })
            pokemonsList.appendChild(listItem);
        })
    })
}

const prevImg = () => {
    if(currentSprite===0){
        currentSprite = sprites.length - 1;
    }else{
        currentSprite --
    }
    pokeImg.src = sprites[currentSprite];
}
const nextImg = () => {
    if(currentSprite===sprites.length - 1){
        currentSprite = 0;
    }else{
        currentSprite ++;
    }
    pokeImg.src = sprites[currentSprite];
}

const nextPokemon = () =>{
    
    printPokemon(currentPokemon.id + 1)
}
const prevPokemon = () =>{
    if(currentPokemon.id===1){
        currentPokemon.id = 251
    }
    printPokemon(currentPokemon.id - 1)
}


const nextPokemons = () => {
    pokemonsList.innerHTML="";
    fetchData(listPokemons.next).then( newData => {
        printPokemons(newData.next)
    })
}

const prevPokemons = () => {
    pokemonsList.innerHTML="";
    fetchData(listPokemons.previous).then( newData => {
        printPokemons(newData.previous)
    })
}

const searchPokemon = () => {
    event.preventDefault(); 
    const input= event.target.search
    fetchData(`${BASE_API}/pokemon/${input.value}`)
        .then(data => {
            printPokemon(data.name)
        })
    
}
printPokemon(1)
printPokemons(`${BASE_API}/pokemon?limit=16&offset=0`);

