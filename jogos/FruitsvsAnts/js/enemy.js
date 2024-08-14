class Enemy{
    constructor(position = {x: 0, y:0}, pathDistance){
        this.position = position
        this.dimensions = {
            width: 50,
            height: 50
        }
        this.center = {
            x: this.position.x + this.dimensions.width/2,
            y: this.position.y + this.dimensions.height/2
        }
        this.radius = 25
        this.waypointIndex = 0
        this.pathDistance = pathDistance
        this.health = 100
        this.velocity = {
            x: 0,
            y: 0
        }
        this.speed = 0.8
        this.inBuilding = false
        this.damage = 1
        this.target
    }

    draw(){
        ctx.fillStyle="red";
        //ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
        ctx.beginPath()
        ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
        ctx.fill()

        //health bar
        ctx.fillStyle="red"
        ctx.fillRect(this.position.x, this.position.y - 15, this.dimensions.width, 10)

        ctx.fillStyle="green"
        ctx.fillRect(this.position.x, this.position.y - 15, this.dimensions.width * this.health/100, 10)
    }

    walk(){
        let waypoint = basePath[this.waypointIndex]
        let yDistance = (waypoint.y + this.pathDistance) - this.center.y
        let xDistance = waypoint.x - this.center.x
        let angle = Math.atan2(yDistance, xDistance)
        this.velocity.x = Math.cos(angle) * this.speed
        this.velocity.y = Math.sin(angle) * this.speed
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.center = {
            x: this.position.x + this.dimensions.width/2,
            y: this.position.y + this.dimensions.height/2
        }

        if(Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) && Math.abs(Math.round(this.center.y) - Math.round(waypoint.y + this.pathDistance)) < Math.abs(this.velocity.y) && this.waypointIndex < basePath.length - 1){
            this.waypointIndex++
        }
    }

    buildingCollision(buildIndex){
        this.inBuilding = true
        this.target = buildings[buildIndex] 
        this.target.hp -= this.damage
    }

    update(){
        this.draw()
        if(!this.inBuilding){
        this.walk()}
    }
}

function RandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let howManyinPath = [{number: 0}, {number: 0}, {number: 0}, {number: 0}, {number: 0}, {number: 0}]
let spaceBetweenEnemies = 100

function getEnemies(){
    if(enemies.length === 0){
        howManyinPath[0].number = 0
        howManyinPath[1].number = 0
        howManyinPath[2].number = 0
        howManyinPath[3].number = 0
        howManyinPath[4].number = 0
        howManyinPath[5].number = 0
    }
    let path = RandomInt(0, 5)
    let pathDistance = distanceBetweenPaths * path
    let enemyDistance = spaceBetweenEnemies * howManyinPath[path].number
    enemies.push(new Enemy(position = {x: Math.floor(basePath[0].x + enemyDistance), y: Math.floor(basePath[0].y + pathDistance)}, pathDistance))
    howManyinPath[path].number++
}

let enemies = []

let waveEnemies = (numberOfEnemies) => {
    for(let i = 0; i < numberOfEnemies; i ++){
        getEnemies()
    }
}

let waveNumber = 0
let maxWavesNumber = +localStorage.maxWavesNumber || 10
let enemyCount = 1

waveEnemies(enemyCount)