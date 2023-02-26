
const pokemon = 'charizard'
const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

async function getData() {
    const res = await fetch(url)
    const data = await res.json()

    // // info
    // document.getElementById('name').textContent = data.name
    // document.getElementById('pkid').textContent = data.id

    // document.getElementById('height').textContent = data.height
    // document.getElementById('weight').textContent = data.weight
    // document.getElementById('category').textContent = 'Flame'
    // document.getElementById('abilities').textContent = data.abilities[0].ability.name
    // document.getElementById('height').textContent = data.height
    
    // // Image
    // const imagen = data.sprites.other.dream_world.front_default
    // console.log(imagen)
    // const divImage = document.getElementById('image')
    // const img = document.createElement('img')
    // img.src = imagen
    // divImage.append(img)
    
    // // Type
    // const typeAmount = data.types.length
    // for(let i = 0; i < typeAmount; i++) {
    //     const p = document.createElement('p')
    //     const typeData = data.types[i].type.name
    //     p.textContent = typeData

    //     const target = document.getElementById('div-type')
    //     target.appendChild(p)
    // }

    // // Stats
    // const statsAmount = data.stats.length
    // for(let i = 0; i < statsAmount; i++) {
    //     const p = document.createElement('p')
    //     const name = data.stats[i].stat.name
    //     const number = data.stats[i].base_stat
    //     p.textContent = `${name} ${number}`

    //     const target = document.getElementById('stats')
    //     target.appendChild(p)
    // }
}     

getData()

 

