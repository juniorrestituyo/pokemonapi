
async function getData(url) {
    const res = await fetch(url)
    const data = await res.json()

    // Name
    const name = data.name
    document.getElementById('name').textContent = name.charAt(0).toUpperCase() + name.slice(1)

    // ID
    const pkId = data.id.toString().padStart(4, '0')
    document.getElementById('pkid').textContent = pkId

    // BIO
    const specieUrl = data.species.url
    const specieRes = await fetch(specieUrl)
    const specieData = await specieRes.json()
    const bioRed = specieData.flavor_text_entries[9].flavor_text
    const bioBlue = specieData.flavor_text_entries[10].flavor_text
    const bioContent = document.getElementById('bioContent')
    bioContent.textContent = bioRed
    const actRed = document.getElementById('actRed')
    const actBlue = document.getElementById('actBlue')
    document.getElementById('red').addEventListener('click', (e) => {
        actBlue.removeAttribute('class','act')
        actRed.setAttribute('class','act')
        bioContent.textContent = bioRed
    })
    document.getElementById('blue').addEventListener('click', (e) => {
        actRed.removeAttribute('class','act')
        actBlue.setAttribute('class','act')
        bioContent.textContent = bioBlue
    })

    // Atributes
    const weight = parseFloat(data.weight * 2.2046/Math.pow(10, 1)).toFixed(1)
    const height = parseFloat(data.height * 3.281/Math.pow(10, 1)).toFixed(1)
    const formattedWeight = `${weight} lbs`
    const formattedHeight = height.slice(0, height.indexOf('.')) + "' " + height.slice(height.indexOf('.') + 1).padStart(2, '0') + '"'
    document.getElementById('height').textContent = formattedHeight
    document.getElementById('weight').textContent = formattedWeight

    const abilityAmount = data.abilities.length
    for(let i = 0; i < abilityAmount; i++) {
        const ability = data.abilities[i].ability.name
        const is_hidden = data.abilities[i].is_hidden
        if(!is_hidden){
            const abilitySpan = document.createElement('span')
            const formattedAbility = ability.charAt(0).toUpperCase() + ability.slice(1)
            abilitySpan.textContent = formattedAbility
            const target = document.getElementById('abilities')
            target.appendChild(abilitySpan)
        }
        
    }
    
    // Image
    const imagen = data.sprites.other['official-artwork'].front_default
    const divImage = document.getElementById('image')
    const img = document.createElement('img')
    img.src = imagen
    divImage.append(img)

    // Type
    const typeAmount = data.types.length
    for(let i = 0; i < typeAmount; i++) {
        const li = document.createElement('li')
        const typeData = data.types[i].type.name
        const formattedType = typeData.charAt(0).toUpperCase() + typeData.slice(1)
        li.textContent = formattedType
        li.classList.add('type-atr')

        const target = document.getElementById('type-ul')
        target.appendChild(li)
    }

    // Stats
    const statsAmount = data.stats.length
    for(let i = 0; i < statsAmount; i++) {
        const statName = data.stats[i].stat.name
        const statNumber = data.stats[i].base_stat

        const skills = document.createElement('div')
        skills.setAttribute('class','skills')
        const details = document.createElement('div')
        details.setAttribute('class','details')
        skills.appendChild(details)

        const span1 = document.createElement('span')
        const span2 = document.createElement('span')
        span1.textContent = statName
        span2.textContent = statNumber

        details.appendChild(span1)
        details.appendChild(span2)

        const bar = document.createElement('div')
        bar.setAttribute('class','bar')
        const statBar = document.createElement('div')
        statBar.setAttribute('id',`${statName}-bar`)
        bar.appendChild(statBar)

        statBar.style.cssText = `animation: ${statName}-fill 2s forwards;`

        const css = window.document.styleSheets[0]
        css.insertRule(`
        @keyframes ${statName}-fill{
            100%{
                width: ${statNumber / 2}%;
            }
        }
        `)

        skills.appendChild(bar)

        const target = document.getElementById('stats')
        target.appendChild(skills)
    }
}

// search
document.getElementById('search').addEventListener('click', (e) => {
    e.preventDefault()
    
    const pokemon = document.getElementById('pokemon').value 
    localStorage.setItem('pokemon', pokemon)

    location.reload()
})



document.addEventListener("DOMContentLoaded", function() {
    const pokemon = localStorage.getItem('pokemon')
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    
    getData(url)
 });



