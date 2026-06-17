class Pet {
    #isAlive = false
    #energy = 100
    #satiety = 100

    constructor(name, type){
        this.name = name
        this.type = type
    }

    // abstracción
    eat() {
        if (!this.#isAlive) {
            console.log(`Oye oye... ${this.name} ya está muerto... no le puedes dar comida.`)
            return
        }

        this.#energy += 60
        this.#satiety += 20

        if (this.#energy > 100) {
            this.#energy = 100
        }

        if (this.#satiety > 100) {
            this.#satiety = 100
            console.log(`${this.name} ya no puede comer más... se puso a llorar :(`)
            return
        }

        this.status()
    }

    play() {
        this.#energy -= 30
        this.#satiety -= 20

        if (!this.isAlive) {
            this.#satiety = 0
            this.#energy = 0
            console.log(`${this.name} no puede jugar... está muerto. POR TU CULPA!`)
            return // early return
        }

        if (this.#satiety < 0) {
            this.#satiety = 0
            this.die()
            return
        }

        if (this.#energy < 0) {
            this.#energy = 0
            console.log(`${this.name} no tiene energía suficiente :c`)
        }

        this.status()
    }

    die() {
        this.#isAlive = false
        console.log(`${this.name}, acaba de morir... a llorar :c`)
    }

    // encapsulacion
    //getter -> utilizado para leer información
    get status() {
        return `${this.name} tiene ahora ${this.#satiety} puntos de saciedad y ${this.#energy} puntos de energia`
    }

    get isAlive() {
        if(this.#isAlive) {
            return `${this.name} está vivo`
        }
        return `${this.name} está muerto`
    }
}

const pet5 = new Pet("Guliber Meridio III", "slime")

// herencia
class Pokemon extends Pet {
    constructor(name, type, personality) {
        super(name, type)
        this.personality = personality
        this.hp = 100
    }

    attack(target) {
        target.hp -= 10
        return `${this.name} atacó fuerte`
    }
}

// Polimorfismo
class PokemonLegendary extends Pokemon {
    attack(target) {
        target.hp -= 50
        return `${this.name} atacó muy fuerte... como un dios`
    }
}

const pet1 = new Pokemon("Bulbasaur","planta", "obstinado")
const pet2 = new Pokemon("Squirtle", "agua", "timido")
const pet3 = new Pokemon("Charmander", "fuego", "enojon")
const pet4 = new Pokemon("Pikachu", "eléctrico", "porfiado")
const pet6 = new PokemonLegendary("Suicune", "agua", "altivo")

pet1.isAlive = true
console.log(pet1.status)

const comidas = [
    {
        nombre: "Pollo",
        stock: 2,
        recupera: {
            saciedad: 20,
            energia: 10
        }
    },
    {
        nombre: "Queque mágico",
        stock: 1,
        recupera: {
            saciedad: 80,
            energia: 80
        }
    }
]

// UI - User Interface _ UX User Experience
function actualizarUI(mascota) {
    const mascotaNombre = document.getElementById('mascota-nombre')
    const mascotaTipo = document.getElementById('mascota-tipo')
    const mascotaEnergia = document.getElementById('mascota-energia')
    const mascotaSaciedad = document.getElementById('mascota-saciedad')

    mascotaNombre.textContent = mascota.name
    mascotaTipo.textContent = mascota.type
    mascotaEnergia.style.width = `${mascota.energy}%`
    mascotaEnergia.textContent = `Energía: ${mascota.energy}%`
    mascotaSaciedad.style.width = `${mascota.satiety}%`
    mascotaSaciedad.textContent = `Saciedad: ${mascota.satiety}%`

    setTimeout(() => {
        const mascotaImg = document.getElementById('mascota-img')
        mascotaImg.src = "./assets/img/pet-standby.png"
    }, 1000)
}

const btnComer = document.getElementById('btn-comer')
const btnJugar = document.getElementById('btn-jugar')

btnComer.addEventListener('click', () => {
    const mascotaImg = document.getElementById('mascota-img')
    mascota.eat()
    mascotaImg.src = "./assets/img/pet-eating.png"
    actualizarUI()
})

btnJugar.addEventListener('click', () => {
    const mascotaImg = document.getElementById('mascota-img')
    mascota.play()
    mascotaImg.src = "./assets/img/pet-play.png"
    actualizarUI()
})

const mascotaImg = document.getElementById('mascota-img')
mascotaImg.src = "./assets/img/pet-standby.png"

actualizarUI(pet5)