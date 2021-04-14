const BASE_URL = "http://localhost:3000"
const CHARACTERS_URL = `${BASE_URL}/characters`
const ENVIRONMENTS_URL = `${BASE_URL}/environments`

const characterArray = []
const charContainer = document.getElementById("character-container")

class Character {
    constructor (id, name, age, gender, description, goals, backstory) {
        this.id = id
        this.name = name
        this.age = age
        this.gender = gender
        this.description = description
        this.goals = goals
        this.backstory = backstory
    }
}

class Environment {
    constructor (id, name, medium, charArray) {
        this.id = id
        this.name = name
        this.medium = medium
        this.charArray = charArray
    }
}

function fetchCharacters(){
    fetch(CHARACTERS_URL)
    .then(resp => resp.json())
    .then(json => createCharacterObjects(json))
}

function createCharacterObjects(json){
    json.forEach(function(e){
        let char = new Character(e.id, e.name, e.age, e.gender, e.description, e.goals, e.backstory)
        characterArray.push(char)
    })
    characterArray.forEach(e => renderCharacter(e))
}

function renderCharacter(char){
    let div = document.createElement("div")
    div.id = char.id
    div.classList.add("card")
    let name = document.createElement("h2")
    name.textContent = char.name
    let gender = document.createElement("p")
    gender.textContent = `Gender: ${char.gender}`
    let age = document.createElement("p")
    age.textContent = `Age: ${char.age}`
    let description = document.createElement("p")
    description.textContent = char.description

    let goals = document.createElement("p")
    goals.textContent = `Goals: ${char.goals}`
    let backstory = document.createElement("p")
    backstory.textContent = `Personal History: ${char.backstory}`

    div.appendChild(name)
    div.appendChild(age)
    div.appendChild(gender)
    div.appendChild(description)

    // goals and backstory may eventually be turned into buttons instead so they are held separately. At the moment though, simple overflow scrolling on the divs seems fine to me.

    div.appendChild(goals)
    div.appendChild(backstory)

    charContainer.appendChild(div)
}

document.addEventListener("DOMContentLoaded", fetchCharacters)