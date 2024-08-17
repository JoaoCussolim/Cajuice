let mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY

    if(playing){
        activeTile = null
        for (let i = 0; i < placementTiles.length; i++){
            let tile = placementTiles[i]
            if(mouse.x > tile.position.x && mouse.x < tile.position.x + tile.size && mouse.y > tile.position.y && mouse.y < tile.position.y + tile.size){
                activeTile = tile
                break
            }
        }
    }
})

canvas.addEventListener("mousedown", (e) => {
    if(!playing){
        if(isInsideButton(startButtonCordinates) && !levelSelectorOpen){
            playing = true
        }
        if(isInsideButton(levelButtonCordinates) && !levelSelectorOpen){
            levelSelectorOpen = true
        }
        if(isInsideButton(closeButtonCordinates) && levelSelectorOpen){
            levelSelectorOpen = false
            debugStartMenuClicking = false
        }
        if(isInsideButton(LevelOneButtonCordinates) && debugStartMenuClicking){
            actualLevel = 0
            levelSelectorOpen = false
            debugStartMenuClicking = false
            playing = true
        }
        if(isInsideButton(LevelTwoButtonCordinates) && debugStartMenuClicking && levelBeaten >= 0){
            actualLevel = 1
            levelSelectorOpen = false
            debugStartMenuClicking = false
            playing = true
        }
        if(isInsideButton(LevelThreeButtonCordinates) && debugStartMenuClicking && levelBeaten >= 1){
            actualLevel = 2
            levelSelectorOpen = false
            debugStartMenuClicking = false
            playing = true
        }
        if(isInsideButton(endlessModeButtonCordinates) && levelBeaten >= 2){
            endlessMode = true
            levelSelectorOpen = false
            debugStartMenuClicking = false
            maxWavesNumber = Infinity
            playing = true
        }
    }

    if(playing && rewardLevelOpen == false){
        let cardIndex = cards.findIndex(card => {
            return selectedCard === card || 0
        })

        if(activeTile && !activeTile.isOccupied && seeds >= currentBuilding.price && buildingSelected == true && !cards[cardIndex].inCooldown){
            activeTile.isOccupied = true
            seeds -= currentBuilding.price
            cards[cardIndex].cardUsed = true
            switch(currentBuilding.type){
                case 0:
                    buildings.push(new Shooter({position: {x: activeTile.position.x, y: activeTile.position.y}, imagePosition: {x: activeTile.position.x, y: activeTile.position.y + currentBuilding.fixY}, price: currentBuilding.price, projectileCooldown: currentBuilding.cooldown, projectileDamage: currentBuilding.damage, source: currentBuilding.source, scale: currentBuilding.scale, frameBuffer: currentBuilding.frameBuffer, frameRate: currentBuilding.frameRate, animations: currentBuilding.animations }))
                    break
                case 1:
                    buildings.push(new Farmer({position: {x: activeTile.position.x, y: activeTile.position.y}, imagePosition: {x: activeTile.position.x + currentBuilding.fixX, y: activeTile.position.y + currentBuilding.fixY}, price: currentBuilding.price, projectileCooldown: currentBuilding.cooldown, projectileDamage: currentBuilding.damage, source: currentBuilding.source, scale: currentBuilding.scale, frameBuffer: currentBuilding.frameBuffer, frameRate: currentBuilding.frameRate, animations: currentBuilding.animations }))
                    break
                case 2:
                    buildings.push(new Tank({position: {x: activeTile.position.x, y: activeTile.position.y}, imagePosition: {x: activeTile.position.x, y: activeTile.position.y + currentBuilding.fixY}, price: currentBuilding.price, projectileCooldown: currentBuilding.cooldown, projectileDamage: currentBuilding.damage, source: currentBuilding.source, scale: currentBuilding.scale, frameBuffer: currentBuilding.frameBuffer, frameRate: currentBuilding.frameRate, animations: currentBuilding.animations }))
                    break
                case 3:
                    buildings.push(new Bomb({position: {x: activeTile.position.x, y: activeTile.position.y}, imagePosition: {x: activeTile.position.x + currentBuilding.fixX, y: activeTile.position.y + currentBuilding.fixY}, price: currentBuilding.price, projectileCooldown: currentBuilding.cooldown, projectileDamage: currentBuilding.damage, source: currentBuilding.source, scale: currentBuilding.scale, frameBuffer: currentBuilding.frameBuffer, frameRate: currentBuilding.frameRate, animations: currentBuilding.animations }))
                    break
                case 4:
                    buildings.push(new Fighter({position: {x: activeTile.position.x, y: activeTile.position.y}, imagePosition: {x: activeTile.position.x + currentBuilding.fixX, y: activeTile.position.y + currentBuilding.fixY}, price: currentBuilding.price, projectileCooldown: currentBuilding.cooldown, projectileDamage: currentBuilding.damage, source: currentBuilding.source, scale: currentBuilding.scale, frameBuffer: currentBuilding.frameBuffer, frameRate: currentBuilding.frameRate, animations: currentBuilding.animations }))
                    break
                case 5:
                    buildings.push(new TripleShooter({position: {x: activeTile.position.x, y: activeTile.position.y}, imagePosition: {x: activeTile.position.x + currentBuilding.fixX, y: activeTile.position.y + currentBuilding.fixY}, price: currentBuilding.price, projectileCooldown: currentBuilding.cooldown, projectileDamage: currentBuilding.damage, source: currentBuilding.source, scale: currentBuilding.scale, frameBuffer: currentBuilding.frameBuffer, frameRate: currentBuilding.frameRate, animations: currentBuilding.animations }))
                    break
            }
        }

        if(isInsideButton(card1Cordinates)){
            currentBuilding.fixY = -50
            currentBuilding.price = 100
            currentBuilding.cooldown = 80
            currentBuilding.type = 0 // Shooter
            currentBuilding.damage = 20
            currentBuilding.source = './assets/buildings/grapeIdle.png'
            currentBuilding.frameBuffer = 22
            currentBuilding.frameRate = 4
            currentBuilding.scale = 0.25
            currentBuilding.animations = {
                Shooting: {
                    source: "./assets/buildings/grapeShooting.png",
                    frameBuffer: 10,
                    frameRate: 8,
                    image: new Image()
                },
                Idle: {
                    source: "./assets/buildings/grapeIdle.png",
                    frameBuffer: 22,
                    frameRate: 4,
                    image: new Image()
                }
            }
            buildingSelected = true
            selectedCard = card1
        }

        if(isInsideButton(card2Cordinates)){
            currentBuilding.fixX = 2
            currentBuilding.fixY = -5
            currentBuilding.price = 50
            currentBuilding.cooldown = 1500
            currentBuilding.type = 1 // Farmer
            currentBuilding.damage = null
            currentBuilding.source = './assets/buildings/pomegranateIdle.png'
            currentBuilding.frameBuffer = 1
            currentBuilding.frameRate = 1
            currentBuilding.scale = 0.5
            currentBuilding.animations = {
                Idle: {
                    source: "./assets/buildings/pomegranateIdle.png",
                    frameBuffer: 1,
                    frameRate: 1,
                    image: new Image()
                }
            }
            buildingSelected = true
            selectedCard = card2
        }

        if(isInsideButton(card3Cordinates)){
            currentBuilding.fixY = 0
            currentBuilding.price = 50
            currentBuilding.cooldown = null
            currentBuilding.type = 2 // Tank
            currentBuilding.damage = null
            currentBuilding.source = './assets/buildings/coconoutIdle.png'
            currentBuilding.frameBuffer = 1
            currentBuilding.frameRate = 1
            currentBuilding.scale = 0.15
            currentBuilding.animations = {
                Broken: {
                    source: "./assets/buildings/coconoutBroken.png",
                    frameBuffer: 1,
                    frameRate: 1,
                    image: new Image()
                },
                Idle: {
                    source: "./assets/buildings/coconoutIdle.png",
                    frameBuffer: 1,
                    frameRate: 1,
                    image: new Image()
                }
            }
            buildingSelected = true
            selectedCard = card3
        }

        if(isInsideButton(card4Cordinates)){
            currentBuilding.fixX = -6
            currentBuilding.fixY = -15
            currentBuilding.price = 25
            currentBuilding.cooldown = 400
            currentBuilding.type = 3 // Bomb
            currentBuilding.damage = 100
            currentBuilding.source = './assets/buildings/pinneapleUngrowth.png'
            currentBuilding.frameBuffer = 1
            currentBuilding.frameRate = 1
            currentBuilding.scale = 0.08
            currentBuilding.animations = {
                Growth: {
                    source: "./assets/buildings/pinneapleGrowth.png",
                    frameBuffer: 1,
                    frameRate: 1,
                    image: new Image()
                },
                Idle: {
                    source: "./assets/buildings/pinneapleUngrowth.png",
                    frameBuffer: 1,
                    frameRate: 1,
                    image: new Image()
                }
            }
            buildingSelected = true
            selectedCard = card4
        }

        if(isInsideButton(card5Cordinates) && levelBeaten >= 0){
            currentBuilding.fixY = -25
            currentBuilding.price = 150
            currentBuilding.cooldown = 90
            currentBuilding.type = 4 // Fighter
            currentBuilding.damage = 50
            currentBuilding.source = './assets/buildings/bananaIdle.png'
            currentBuilding.frameBuffer = 1
            currentBuilding.frameRate = 1
            currentBuilding.scale = 0.15
            currentBuilding.animations = {
                Attack: {
                    source: "./assets/buildings/bananaFlip.png",
                    frameBuffer: 30,
                    frameRate: 3,
                    image: new Image()
                },
                Idle: {
                    source: "./assets/buildings/bananaIdle.png",
                    frameBuffer: 1,
                    frameRate: 1,
                    image: new Image()
                }
            }
            buildingSelected = true
            selectedCard = card5
        }

        if(isInsideButton(card6Cordinates) && levelBeaten >= 1){
            currentBuilding.fixY = -50
            currentBuilding.price = 150
            currentBuilding.cooldown = 80
            currentBuilding.type = 5 // MultiShooter
            currentBuilding.damage = 20
            currentBuilding.source = './assets/buildings/greengrapeIdle.png'
            currentBuilding.frameBuffer = 22
            currentBuilding.frameRate = 4
            currentBuilding.scale = 0.25
            currentBuilding.animations = {
                Shooting: {
                    source: "./assets/buildings/greengrapeShooting.png",
                    frameBuffer: 10,
                    frameRate: 8,
                    image: new Image()
                },
                Idle: {
                    source: "./assets/buildings/greengrapeIdle.png",
                    frameBuffer: 22,
                    frameRate: 4,
                    image: new Image()
                }
            }
            buildingSelected = true
            selectedCard = card6
        }

        if(isInsideButton(shovelSpriteCordinates)){
            draggingShovel = true
        }
    }

    if(rewardLevelOpen){
        if(isInsideButton(nextLevelButtonCordinates) && actualLevel < 2){
            if(levelBeaten < actualLevel){
                levelBeaten = actualLevel
            }
            actualLevel++
            autoSave()
        }
        if(isInsideButton(returnMenuButtonCordinates)){
            if(levelBeaten < actualLevel){
                levelBeaten = actualLevel
            }
            returnToMenu = true
        }
    }
} ) 


canvas.addEventListener("mouseup", (e) => {
    if(draggingShovel){
    for (let i = 0; i < placementTiles.length; i++){
        let tile = placementTiles[i]
        if(mouse.x > tile.position.x && mouse.x < tile.position.x + tile.size && mouse.y > tile.position.y && mouse.y < tile.position.y + tile.size && tile.isOccupied){
            let buildIndex = buildings.findIndex(building => {
                return building.position.x == tile.position.x && building.position.y == tile.position.y
            })
            buildings.splice(buildIndex, 1)
            tile.isOccupied = false
            break
        }
    }
    draggingShovel = false
    shovelSprite.position.x = shovelSpriteCordinates.x
    shovelSprite.position.y = shovelSpriteCordinates.y
    shovelSprite.dimensions.width = shovelSpriteCordinates.width
    shovelSprite.dimensions.height = shovelSpriteCordinates.height
}
})

addEventListener("keydown", (event) => {
    if(event.key === "r" && hearts <= 0){
        location.reload()
    }
})