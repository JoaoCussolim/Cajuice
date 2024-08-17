let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let height = 768;
let width = 1280;
let map = new Image();
map.src = "./assets/map/map.png";
canvas.width = width;
canvas.height = height;

let hearts = 1
let dropSeedsCooldown = 400
let playing = JSON.parse(localStorage.playing || "false")
let gameOver = false

let autoSave = () => {
    localStorage.levelBeaten = levelBeaten
    localStorage.actualLevel = actualLevel
    localStorage.playing = JSON.stringify(playing)
    localStorage.maxWavesNumber = maxWavesNumber
}

map.onload = () => {
    if(!playing){
        startingMenu()
    }else{
        animate()
    }
}

let desiredFPS = 80;
let frameTime = 1000 / desiredFPS; 

let prevTime = performance.now();
let lag = 0;

let startingMenu = () => {
    let currentTime = performance.now();
    let elapsed = currentTime - prevTime;
    prevTime = currentTime;
    lag += elapsed;
    let startMenuAnimationId = requestAnimationFrame(startingMenu)

    while(lag >= frameTime){

    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'lightgreen'
    
    drawStartMenu()

    if(playing){
        window.cancelAnimationFrame(startMenuAnimationId)
        requestAnimationFrame(animate)
    }
    lag -= frameTime;
    }
}

let animate = () => {
    let currentTime = performance.now();
    let elapsed = currentTime - prevTime;
    prevTime = currentTime;
    lag += elapsed;
    let animationId = requestAnimationFrame(animate)

    while(lag >= frameTime){

    ctx.drawImage(map, 0, 0)
    placementTiles.forEach(tile => {
        tile.update(mouse)
    })

    drawHotbar()

    if(dropSeedsCooldown <= 0){
        dropSeeds()
        dropSeedsCooldown = 400
    }
    dropSeedsCooldown--

    cards.forEach((card, index) => {
        if(selectedCard === card && card.dimensions.width < 96){
            card.dimensions.width = 96
            card.dimensions.height = 110.4
            card.position.x -= 10
        }
        if(card != selectedCard){
            card.dimensions.width = 80
            card.dimensions.height = 92
            card.position.x = 210 + (100*index)
        }
    })

    for(let i = buildings.length - 1; i>= 0; i--){
        let building = buildings[i]
        building.update()
        building.target = null
        let validEnemies = enemies.filter(enemy => {
            return enemy.center.y + 30 > building.center.y && enemy.center.y - 30 < building.center.y && enemy.center.x < 1320
        })
        
        building.target = validEnemies[0]

        if(validEnemies[0] && building.type === 0) building.switchSprite('Shooting')
        else building.switchSprite("Idle")

        if(building.type === 4 && building.validTarget && building.target) building.switchSprite('Attack')
        
        if(building.hp < 250 && building.type === 2) building.switchSprite('Broken')


        if(building.ready === true && building.type === 3) building.switchSprite('Growth')
        
        if(building.tripleShooter){
        let secondValidEnemies = enemies.filter(enemy => {
            return building.center.y + 70 > enemy.center.y && building.center.y < enemy.center.y && enemy.center.x < 1320 && !(validEnemies.includes(enemy)) // de baixo
        }) 
        let thirdValidEnemies = enemies.filter(enemy => {
            return building.center.y - 70 < enemy.center.y && building.center.y > enemy.center.y && enemy.center.x < 1320 // de cima
        })
        building.secondTarget = secondValidEnemies[0] 
        building.thirdTarget = thirdValidEnemies[0]
        if(secondValidEnemies[0] || thirdValidEnemies[0] || validEnemies[0]) building.switchSprite('Shooting')
        }

        let tileIndex = placementTiles.findIndex(tile => {
            return building.position.x === tile.position.x && building.position.y === tile.position.y
        })
        if(building.hp <= 0){
            placementTiles[tileIndex].isOccupied = false
            buildings.splice(i, 1)
        }

        for(let i = building.projectiles.length - 1; i >= 0; i--){
            let projectile = building.projectiles[i]
            projectile.update()

            let xDifference = projectile.enemy.center.x - projectile.position.x
            let yDifference = projectile.enemy.center.y - projectile.position.y
            let distance = Math.hypot(xDifference, yDifference)
            //quando o projétil acerta
            if(distance < projectile.enemy.radius + projectile.radius){
                // vida do inimigo e tirar ele da lista
                projectile.enemy.health -= projectile.damage
                if(projectile.enemy.health <= 0){
                    let enemyIndex = enemies.findIndex((enemy) => {
                        return projectile.enemy === enemy
                    })
                    if(enemyIndex > -1){
                    enemies.splice(enemyIndex, 1)}
                }

                building.projectiles.splice(i, 1)
            }
        }
    }

    for(let i = seedsOnGround.length - 1; i >= 0; i--){
        let seed = seedsOnGround[i]
        seed.update()
    }

    for(let i = enemies.length - 1; i >= 0; i--){
        let enemy = enemies[i]
        enemy.update()
        let buildIndex = buildings.findIndex(building => {
            return building.position.x + 50 > enemy.position.x && building.position.x - 50 < enemy.position.x && building.position.y + 50 > enemy.position.y && building.position.y - 50 < enemy.position.y
        })
        if(buildIndex != -1 && !buildings[buildIndex].ready){
            enemy.buildingCollision(buildIndex)
            enemy.switchSprite('Eating')
            if(buildings[buildIndex].hp <= 0){
                let enemiesSameTarget = enemies.filter(enemy => {
                    return enemy.target == buildings[buildIndex]
                })
                for(let i = enemiesSameTarget.length - 1; i >= 0; i--){
                    let enemy = enemiesSameTarget[i]
                    enemy.switchSprite('Run')
                    enemy.inBuilding = false
                }
            }}

        if(enemy.position.x < -20){
            hearts--
            enemies.splice(i, 1)
            if(hearts <= 0){
                gameOver = true
                localStorage.playing = playing
                document.querySelector('#gameOver').style.display = 'flex'
                window.cancelAnimationFrame(animationId)
            }
        }
    }

     //buscar a quantidade total de inimigos
    if (enemies.length === 0 && waveNumber < maxWavesNumber){
        waveNumber++
        enemyCount = 1 + 2 * waveNumber
        waveEnemies(enemyCount)
    }

    if(waveNumber === maxWavesNumber && enemies.length === 0 && !endlessMode && !gameOver){
        rewardLevelOpen = true
        drawNextLevel()
    }

    if(returnToMenu){
        returnToMenu = false
        playing = false
        autoSave()
        window.cancelAnimationFrame(animationId)
        requestAnimationFrame(startingMenu)
    }

    if(draggingShovel){
        shovelSprite.draw()
        shovelSprite.position.x = mouse.x - 40
        shovelSprite.position.y = mouse.y - 40
    }

    passedLevel()
    lag -= frameTime;
    }
}