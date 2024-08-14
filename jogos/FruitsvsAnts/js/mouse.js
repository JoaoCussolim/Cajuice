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
                    buildings.push(new Shooter(position = {x: activeTile.position.x, y: activeTile.position.y}, currentBuilding.price, currentBuilding.color, currentBuilding.cooldown, currentBuilding.damage))
                    break
                case 1:
                    buildings.push(new Farmer(position = {x: activeTile.position.x, y: activeTile.position.y}, currentBuilding.price, currentBuilding.color, currentBuilding.cooldown, currentBuilding.damage))
                    break
                case 2:
                    buildings.push(new Tank(position = {x: activeTile.position.x, y: activeTile.position.y}, currentBuilding.price, currentBuilding.color, currentBuilding.cooldown, currentBuilding.damage))
                    break
                case 3:
                    buildings.push(new Bomb(position = {x: activeTile.position.x, y: activeTile.position.y}, currentBuilding.price, currentBuilding.color, currentBuilding.cooldown, currentBuilding.damage))
                    break
                case 4:
                    buildings.push(new Fighter(position = {x: activeTile.position.x, y: activeTile.position.y}, currentBuilding.price, currentBuilding.color, currentBuilding.cooldown, currentBuilding.damage))
                    break
                case 5:
                    buildings.push(new TripleShooter(position = {x: activeTile.position.x, y: activeTile.position.y}, currentBuilding.price, currentBuilding.color, currentBuilding.cooldown, currentBuilding.damage))
                    break
            }
        }

        if(isInsideButton(card1Cordinates)){
            currentBuilding.price = 100
            currentBuilding.color = "red"
            currentBuilding.cooldown = 80
            currentBuilding.type = 0 // Shooter
            currentBuilding.damage = 20
            buildingSelected = true
            selectedCard = card1
            console.log("clicou em")
        }

        if(isInsideButton(card2Cordinates)){
            currentBuilding.price = 50
            currentBuilding.color = "green"
            currentBuilding.cooldown = 1500
            currentBuilding.type = 1 // Farmer
            currentBuilding.damage = null
            buildingSelected = true 
            selectedCard = card2
        }

        if(isInsideButton(card3Cordinates)){
            currentBuilding.price = 50
            currentBuilding.color = "purple"
            currentBuilding.type = 2 // Tank
            currentBuilding.damage = null
            currentBuilding.cooldown = null
            buildingSelected = true
            selectedCard = card3
        }

        if(isInsideButton(card4Cordinates)){
            currentBuilding.price = 25
            currentBuilding.color = "cyan"
            currentBuilding.cooldown = 400
            currentBuilding.type = 3 // Bomb
            currentBuilding.damage = 100
            buildingSelected = true
            selectedCard = card4
        }

        if(isInsideButton(card5Cordinates) && levelBeaten >= 0){
            currentBuilding.price = 150
            currentBuilding.color = "yellow"
            currentBuilding.cooldown = 60
            currentBuilding.type = 4 // Fighter
            currentBuilding.damage = 50
            buildingSelected = true
            selectedCard = card5
        }

        if(isInsideButton(card6Cordinates) && levelBeaten >= 1){
            currentBuilding.price = 150
            currentBuilding.color = "black"
            currentBuilding.cooldown = 140
            currentBuilding.type = 5 // Triple Shooter
            currentBuilding.damage = 20
            tripleShooterActive = true
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
                building.position.x == tile.position.x && building.position.y == tile.position.y
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