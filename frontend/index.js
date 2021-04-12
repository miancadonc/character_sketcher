const BASE_URL = "http://localhost:3000"
const CHARACTERS_URL = `${BASE_URL}/characters`

const characterArray = []

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



document.addEventListener("DOMContentLoaded", fetchCharacters)