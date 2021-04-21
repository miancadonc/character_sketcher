const BASE_URL = "http://localhost:3000"
const CHARACTERS_URL = `${BASE_URL}/characters`
const ENVIRONMENTS_URL = `${BASE_URL}/environments`

const characterArray = []
const charContainer = document.getElementById("character-container")

const environmentArray = []
const envContainer = document.getElementById("environment-container")
const header = document.querySelector("h1")

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
    renderNewCharForm(1)
}

function renderCharacter(char){
    let div = document.createElement("div")
    div.id = `char${char.id}`
    div.classList.add("char-card")

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

    let deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete This Character"
    deleteButton.addEventListener("click", e => {
        e.preventDefault()
        deleteCharacterFetch(char.id)
    })

    div.appendChild(name)
    div.appendChild(age)
    div.appendChild(gender)
    div.appendChild(description)

    // goals and backstory may eventually be turned into buttons instead so they are held separately. At the moment though, simple overflow scrolling on the divs seems fine to me.

    div.appendChild(goals)
    div.appendChild(backstory)

    div.appendChild(deleteButton)

    charContainer.appendChild(div)
}

function deleteCharacterFetch(id){
    let configObject = {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify({char_id: id})
    }

    fetch(`${CHARACTERS_URL}/${id}`, configObject)

}

function fetchEnvironments(){
    fetch(ENVIRONMENTS_URL)
    .then(resp => resp.json())
    .then(json => createEnvironmentObjects(json))
}

function createEnvironmentObjects(json){
    
    json.forEach(function(e){
        let env = new Environment(e.id, e.name, e.medium, e.characters)
        environmentArray.push(env)
    })
    environmentArray.forEach(e => renderEnvironment(e))
    renderNewEnvButton()
}

function renderNewEnvButton(){
    let div = document.createElement("div")
    div.id = environmentArray.length + 1
    div.classList.add("env-card")

    let name = document.createElement("h1")
    name.textContent = "Create New Environment!"

    div.appendChild(name)

    // div.addEventListener("click", function(e){
    //     e.preventDefault()
    //     if(div.childElementCount > 1){
    //         div.remove()
    //         renderNewEnvButton()
    //     }else{
    //         renderNewEnvForm(div)
    //     }
    // })

    let nameInput = document.createElement("input")
    // nameInput.id = "nameinput"
    nameInput.placeholder = "Name"

    let mediumInput = document.createElement("input")
    // mediumInput.id = "mediuminput"
    mediumInput.placeholder = "Medium"

    let submit = document.createElement("button")
    submit.textContent = "Submit"
    //  Pretty sure the below preventDefault is the only necessary one so far
    
    submit.addEventListener("click", e => {
        e.preventDefault()
        // removeChildNodes(envContainer)
        // I truly can not figure out why this function isn't working so I'm going to move on for now.
        let envData = {
            name: nameInput.value,
            medium: mediumInput.value
        }
        newEnvFetch(envData)
    })

    div.appendChild(nameInput)
    div.appendChild(mediumInput)
    div.appendChild(submit)

    envContainer.appendChild(div)
}

// function renderNewEnvForm(div){
    

//     // submit.addEventListener("click", e => {
//     //     e.preventDefault()
//     //     let envData = {
//     //         name: nameInput.value,
//     //         medium: mediumInput.value
//     //     }
//     //     newEnvFetch(envData)
//     // })

//     div.appendChild(nameInput)
//     div.appendChild(mediumInput)
//     div.appendChild(submit)
// }

function renderNewCharForm(id){
    let form = document.createElement("div")
    form.classList.add("char-card")
    form.id = `charForm-env${id}`

    let formName = document.createElement("h2")
    formName.textContent = "Create New Character!"

    let nameInput = document.createElement("input")
    let ageInput = document.createElement("input")
    let genderInput = document.createElement("input")
    let descriptionInput = document.createElement("TEXTAREA")
    let goalsInput = document.createElement("TEXTAREA")
    let backstoryInput = document.createElement("TEXTAREA")

    nameInput.placeholder = "Character Name"
    ageInput.placeholder = "Age"
    genderInput.placeholder = "Gender"
    descriptionInput.placeholder = "Physical Description"
    goalsInput.placeholder = "Personal Goals"
    backstoryInput.placeholder = "Personal History or Backstory"

    let submit = document.createElement("button")
    submit.textContent = "Submit"

    submit.addEventListener("click", e => {
        e.preventDefault()
        let charData = new Character(id, nameInput.value, ageInput.value, genderInput.value, descriptionInput.value, goalsInput.value, backstoryInput.value)
        newCharFetch(charData)
    })
    
    let inputs = [formName, nameInput, ageInput, genderInput, descriptionInput, goalsInput, backstoryInput, submit]
    inputs.forEach(e => form.appendChild(e))
    
    charContainer.appendChild(form)
}

function newCharFetch(charData){
    let env = environmentArray.find(e => e.id === charData.id)

    let configObject = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify(charData)
    }

    fetch(CHARACTERS_URL, configObject)
    .catch(function(e){
        document.body.innerHTML = e.message
    })
    renderEnvChars(env)
}

// In the above fetch method, and in the other post fetch method, I can't seem to get the dom to re-render automatically.

function newEnvFetch(envData){
    
    let configObject = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify(envData)
    }

    fetch(ENVIRONMENTS_URL, configObject)
    .then(fetchEnvironments)
    .catch( function(error){
        document.body.innerHTML = error.message
    })
}

function renderEnvironment(env){

    let div = document.createElement("div")
    div.id = `env${env.id}`
    div.classList.add("env-card")

    let name = document.createElement("h3")
    name.textContent = env.name
    let medium = document.createElement("p")
    medium.textContent = `Medium: ${env.medium}`

    div.appendChild(name)
    div.appendChild(medium)

    div.addEventListener("click", function(e){
        e.preventDefault()
        renderEnvChars(env)

    })

    envContainer.appendChild(div)
}

function renderEnvChars(env){
    removeChildNodes(charContainer)
    header.textContent = `Current Environment: ${env.name} (${env.medium})`
    env.charArray.forEach(e => renderCharacter(e))
    renderNewCharForm(env.id)
}

function removeChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

document.addEventListener("DOMContentLoaded", fetchCharacters)
document.addEventListener("DOMContentLoaded", fetchEnvironments)