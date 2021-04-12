const BASE_URL = "http://localhost:3000"
const CHARACTER_URL = `${BASE_URL}/characters`

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

