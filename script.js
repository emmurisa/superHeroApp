
// https://superheroapi/com/access-token/character-id

const SUPERHERO_TOKEN = '10223569763528853'
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`

const randomHeroButton = document.getElementById('randomHero')
const heroImageDiv = document.getElementById('heroImage')
const heroSearch = document.getElementById('heroSearch')
const searchHeroButton = document.getElementById('searchHeroButton')
const heroName = document.getElementById('heroName')

const getRandomSuperHero = (id) => {
    fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => {
        const stats = getStatsHTML(json)
        const name = `<h2>${json.name}</h2>`
        heroImageDiv.innerHTML = `${name}<img src="${json.image.url}" height = 300px width = 300px/>${stats.toUpperCase()}`
    })
}

const getSuperHero = (name) => {
    fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
        const hero = json.results[0]
        const stats = getStatsHTML(hero)
        const name = `<h2>${hero.name}</h2>`
        heroImageDiv.innerHTML = `${name}<img src="${hero.image.url}" height = 300px width = 300px/>${stats.toUpperCase()}`
    })
}

const statToEmoji = {
    intelligence: '🧠',
    strength: '💪',
    speed: '💨',
    durability: '🏋️',
    power: '📊',
    combat: '⚔️',
}

const getStatsHTML = (character) => {
    const stats = Object.keys(character.powerstats).map(stat => {
        return `<p>${statToEmoji[stat]} ${stat}: ${character.powerstats[stat]}</p>`
    })
    return stats.join('')
}

const randomHero = () => {
    const numberOfHeroes = 731
    return Math.floor(Math.random() * numberOfHeroes) + 1    
}

randomHeroButton.onclick = () => getRandomSuperHero(randomHero())

searchHeroButton.onclick = () => getSuperHero(heroSearch.value)