class Enemy extends animatedSprite{
    constructor({ position = { x: 0, y: 0 }, pathDistance, source, frameRate = 1, frameBuffer = 3, scale = 1, animations, health}){ 
        super({position, source, frameRate, frameBuffer, scale, animations})
        this.position = position
        this.dimensions = {
            width: 50,
            height: 50
        }
        this.center = {
            x: this.position.x + this.dimensions.width/2,
            y: this.position.y + this.dimensions.height/2
        }
        this.imageCenter = {
            x: this.position.x - 55,
            y: this.position.y - 55
        }
        this.radius = 25
        this.waypointIndex = 0
        this.pathDistance = pathDistance
        this.health = health
        this.velocity = {
            x: 0,
            y: 0
        }
        this.speed = 0.8
        this.inBuilding = false
        this.damage = 1
        this.target
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
        this.imageCenter = {
            x: this.position.x - 30,
            y: this.position.y - 30
        }

        if(Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) && Math.abs(Math.round(this.center.y) - Math.round(waypoint.y + this.pathDistance)) < Math.abs(this.velocity.y) && this.waypointIndex < basePath.length - 1){
            this.waypointIndex++
        }
    }

    draw() {
        if (!this.image && this.health <= 0) return;
        
        let cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        };

        ctx.drawImage(this.image, cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, this.imageCenter.x, this.imageCenter.y, this.width, this.height)
    }


    buildingCollision(buildIndex){
        this.inBuilding = true
        this.target = buildings[buildIndex] 
        this.target.hp -= this.damage
    }

    update(){
        this.draw()
        this.updateFrames()
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

let whatAnt = {
    1: (enemyDistance, pathDistance) => {let actualEnemy = new Enemy({position: {x: Math.floor(basePath[0].x + enemyDistance), y: Math.floor(basePath[0].y + pathDistance)}, pathDistance: pathDistance, source: './assets/ants/brownantRun.png', frameBuffer: 15, frameRate: 3, scale: 0.4, animations: {
        Run: {
            source: "./assets/ants/brownantRun.png",
            frameRate: 3,
            frameBuffer: 15,
            image: new Image()
        },
        
        Eating: {
            source: "./assets/ants/brownantEat.png",
            frameRate: 2,
            frameBuffer: 15,
            image: new Image()
        },
    
    }, health: 100})
    return actualEnemy},
    2: (enemyDistance, pathDistance) => {let actualEnemy = new Enemy({position: {x: Math.floor(basePath[0].x + enemyDistance), y: Math.floor(basePath[0].y + pathDistance)}, pathDistance: pathDistance, source: './assets/ants/redantRun.png', frameBuffer: 15, frameRate: 3, scale: 0.07, animations: {
        Run: {
            source: "./assets/ants/redantRun.png",
            frameRate: 3,
            frameBuffer: 15,
            image: new Image()
        },
        
        Eating: {
            source: "./assets/ants/redantEat.png",
            frameRate: 2,
            frameBuffer: 15,
            image: new Image()
        },
    
    }, health: 150})
    return actualEnemy},
    3: (enemyDistance, pathDistance) => {let actualEnemy = new Enemy({position: {x: Math.floor(basePath[0].x + enemyDistance), y: Math.floor(basePath[0].y + pathDistance)}, pathDistance: pathDistance, source: './assets/ants/blueantRun.png', frameBuffer: 15, frameRate: 3, scale: 0.5, animations: {
        Run: {
            source: "./assets/ants/blueantRun.png",
            frameRate: 3,
            frameBuffer: 15,
            image: new Image()
        },
        
        Eating: {
            source: "./assets/ants/blueantEat.png",
            frameRate: 2,
            frameBuffer: 15,
            image: new Image()
        },
    
    }, health: 300})
    return actualEnemy
    }
}

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
    let antNumber = 1
    if(waveNumber >= 5){
        antNumber = RandomInt(1, 3)
    }
    let pathDistance = distanceBetweenPaths * path
    let enemyDistance = spaceBetweenEnemies * howManyinPath[path].number
    enemies.push(whatAnt[antNumber](enemyDistance, pathDistance))
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