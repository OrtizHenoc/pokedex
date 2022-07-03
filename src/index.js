const pokeImg = document.querySelector("#pokeimg")
const pokeDesc = document.querySelector("#desc")
const pokeHp = document.querySelector("#hp")
const pokeDmg = document.querySelector("#dmg")
const pokeDef = document.querySelector("#dfs")
const pokeVel = document.querySelector("#vel")
const pokeSpDmg = document.querySelector("#sp-dmg")
const pokeSpDef = document.querySelector("#sp-def")
const BASE_API = "https://pokeapi.co/api/v2"
const pokemon_API = `${BASE_API}/pokemon`
let currentPokemon;
let sprites = []
let currentSprite =0;
const fetchData = (API) =>{
    return fetch(API)
        .then((res)=> res.json()) //res de respuesta
        .then((data) => data)
}

const wirteDescription = (API) => {
    fetchData(API).then(specie => {
        console.log(specie.flavor_text_entries[0].flavor_text)
    })
}

const printPokemon = (pokemon) => {
    fetchData (`${pokemon_API}/${pokemon}`).then(data => {
        if(sprites.length>0){
            sprites = [];
        }
        let barra = 0;
        currentPokemon = data
        //console.log(currentPokemon)
        pokeImg.src = data.sprites.front_default
        pokeHp.textContent = data.stats[0].base_stat
        barra = `${data.stats[0].base_stat}`/2 ;
        //console.log(barra)
        pokeHp.style.width = `${barra}%`
        pokeDmg.textContent = data.stats[1].base_stat
        barra = `${data.stats[1].base_stat}`/2 ;
        pokeDmg.style.width = `${barra}%`
        pokeDef.textContent = data.stats[2].base_stat
        barra = `${data.stats[2].base_stat}`/2 ;
        pokeDef.style.width = `${barra}%`
        pokeVel.textContent = data.stats[5].base_stat
        barra = `${data.stats[5].base_stat}`/2 ;
        pokeVel.style.width = `${barra}%`
        pokeSpDmg.textContent = data.stats[3].base_stat
        barra = `${data.stats[3].base_stat}`/2 ;
        pokeSpDmg.style.width = `${barra}%`
        pokeSpDef.textContent = data.stats[4].base_stat
        barra = `${data.stats[4].base_stat}`/2 ;
        pokeSpDef.style.width = `${barra}%`
        wirteDescription(data.species.url);
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
printPokemon(1)