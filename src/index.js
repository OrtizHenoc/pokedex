const pokeImg = document.querySelector("#pokeimg")
const pokeDesc = document.querySelector("#desc")
const pokeDmg = document.querySelector("#dmg")
const pokeDef = document.querySelector("#dfs")
const pokeVel = document.querySelector("#vel")
const pokeSpDef = document.querySelector("#sp-def")
const BASE_API = "https://pokeapi.co/api/v2"
const pokemon_API = `${BASE_API}/pokemon`
let currentPokemon;
const fetchData = (API) =>{
    return fetch(API)
        .then((res)=> res.json()) //res de respuesta
        .then((data) => data)
}

fetchData(`${pokemon_API}/1`)

const printPokemon = (pokemon) => {
    fetchData (`${pokemon_API}/${pokemon}`).then(data => {
        currentPokemon = data
        //console.log(currentPokemon)
        pokeImg.src = data.sprites.front_default
        pokeDmg.textContent = data.stats[1].base_stat
        pokeDef.textContent = data.stats[2].base_stat
        pokeVel.textContent = data.stats[5].base_stat
        pokeSpDef.textContent = data.stats[4].base_stat
        pokeDesc.textContent = data.name
    })

}


const prevImg = () => {
    // console.log(currentPokemon.sprites.back_default)
    pokeImg.src = currentPokemon.sprites.back_default
}
const nextImg = () => {
    
    pokeImg.src = currentPokemon.sprites.front_default
}

const nextPokemon = () =>{
    
    printPokemon(currentPokemon.id + 1)
}
const prevPokemon = () =>{
    if(currentPokemon.id===1){
        currentPokemon.id = 200
    }
    printPokemon(currentPokemon.id - 1)
}
printPokemon(1)