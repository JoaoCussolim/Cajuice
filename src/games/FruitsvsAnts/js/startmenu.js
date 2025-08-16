class Button extends Sprite{
    constructor(position = {x: 0, y: 0}, dimensions = {width: 0, height: 0}, source){
        super(position, dimensions, source)
        this.BasePosition = position
    }
    animation(){
        if(this.position.x > -500 && this.position.y != 0){ this.position.x -= 7}
        if(this.position.x < 1500 && this.position.y == 0){ this.position.x += 12}
    }
    reset(){
        this.position = this.BasePosition
    }
}

let titleImage = new Button(position = {x: 230, y: 0}, dimensions = {width: 900, height: 200}, "./assets/menu/titleImage.png")
let startButton = new Button(position = {x: 480, y: 250}, dimensions = {width: 300, height: 100}, "./assets/menu/playButton.png")
let levelsButton = new Button(position = {x: 480, y: 400}, dimensions = {width: 300, height: 100}, "./assets/menu/levelsButton.png")
let endlessModeButton = new Button(position = {x: 480, y: 550}, dimensions = {width: 300, height: 100}, "./assets/menu/endlessButton.png")
let levelSelector = new Sprite(position = {x: 280, y: 10}, dimensions = {width: 750, height: 750}, "./assets/menu/levelSelectorBackground.png")
let closeButton = new Sprite(position = {x: 960, y: 40}, dimensions = {width: 50, height: 50}, "./assets/menu/closeButton.png")
let LevelOneButton = new Sprite(position = {x: 510, y: 100}, dimensions = {width: 300, height: 150}, "./assets/menu/levelOneButton.png")
let LevelTwoButton = new Sprite(position = {x: 510, y: 300}, dimensions = {width: 300, height: 150}, "./assets/menu/levelTwoButton.png")
let LevelThreeButton = new Sprite(position = {x: 510, y: 500}, dimensions = {width: 300, height: 150}, "./assets/menu/levelThreeButton.png")

let levelSelectorOpen = false

let drawLevelSelector = () => {
    levelSelector.draw()
    LevelOneButton.draw()
    if(levelBeaten >= 0){
    LevelTwoButton.draw()}
    if(levelBeaten >= 1){
    LevelThreeButton.draw()}
    closeButton.draw()
}

let endlessMode = false
let debugStartMenuClicking = false

let drawStartMenu = () => {
    titleImage.draw()
    startButton.draw()
    levelsButton.draw()
    if(levelBeaten >= 2){
    endlessModeButton.draw()
    }
    if(levelSelectorOpen){
        debugStartMenuClicking = true
        drawLevelSelector()
    }
}

let startButtonCordinates = {x: startButton.position.x, y: startButton.position.y, width: startButton.dimensions.width, height: startButton.dimensions.height}
let levelButtonCordinates = {x: levelsButton.position.x, y: levelsButton.position.y, width: levelsButton.dimensions.width, height: levelsButton.dimensions.height}
let endlessModeButtonCordinates = {x: endlessModeButton.position.x, y: endlessModeButton.position.y, width: endlessModeButton.dimensions.width, height: endlessModeButton.dimensions.height}
let closeButtonCordinates = {x: closeButton.position.x, y: closeButton.position.y, width: closeButton.dimensions.width, height: closeButton.dimensions.height}
let LevelOneButtonCordinates = {x: LevelOneButton.position.x, y: LevelOneButton.position.y, width: LevelOneButton.dimensions.width, height: LevelOneButton.dimensions.height}
let LevelTwoButtonCordinates = {x: LevelTwoButton.position.x, y: LevelTwoButton.position.y, width: LevelTwoButton.dimensions.width, height: LevelTwoButton.dimensions.height}
let LevelThreeButtonCordinates = {x: LevelThreeButton.position.x, y: LevelThreeButton.position.y, width: LevelThreeButton.dimensions.width, height: LevelThreeButton.dimensions.height}

let levelBeaten = +localStorage.levelBeaten || -1
let actualLevel = +localStorage.actualLevel || 0
let lastLevel = actualLevel

let passedLevel = () => {
    if(actualLevel != lastLevel && !endlessMode && !gameOver){
        rewardLevelOpen = false
        lastLevel = actualLevel
        waveNumber = 0
        maxWavesNumber = 10 + 5 * actualLevel
        seeds = 50
        enemyCount = 1
        enemies = []    
        waveEnemies(enemyCount)
        buildings = []
        seedsOnGround = []
        for (let i = 0; i < placementTiles.length; i++){
            let tile = placementTiles[i]
            tile.isOccupied = false
        }
    }
}

let nextLevelBackground = new Sprite(position = {x: 180, y: 30}, dimensions = {width: 900, height: 700}, "./assets/menu/levelSelectorBackground.png")
let nextLevelButton = new Sprite(position = {x: 750, y: 600}, dimensions = {width: 300, height: 100}, "./assets/menu/nextLevelButton.png")
let returnMenuButton = new Sprite(position = {x: 210, y: 600}, dimensions = {width: 300, height: 100}, "./assets/menu/backToMenuButton.png")
let rewardCard = new Sprite(position = {x: 550, y: 230}, dimensions = {width: 200, height: 320}, "./assets/hotbar/fighterModel.png")

let rewardLevelOpen = false
let returnToMenu = false

let nextLevelButtonCordinates = {x: nextLevelButton.position.x, y: nextLevelButton.position.y, width: nextLevelButton.dimensions.width, height: nextLevelButton.dimensions.height}
let returnMenuButtonCordinates = {x: returnMenuButton.position.x, y: returnMenuButton.position.y, width: returnMenuButton.dimensions.width, height: returnMenuButton.dimensions.height}

let drawRewardText = () => {
    if(actualLevel == 1){
        rewardCard.image.src = "./assets/hotbar/tripleShooterModel.png"
    }
    if(actualLevel == 2){
        rewardCard.position.x = 440
        rewardCard.position.y = 250
        rewardCard.dimensions.width = 400
        rewardCard.dimensions.height = 200
        rewardCard.image.src = "./assets/menu/endlessButton.png"
    }
    ctx.font = "100px Times New Roman"
    ctx.fillStyle = "Black"
    ctx.fillText(`Nível ${actualLevel+1} derrotado!`, 650, 120, 800)
    if(levelBeaten < actualLevel){
    ctx.font = "60px Times New Roman"
    ctx.fillText(`Você desbloqueou: `, 650, 200, 900)
    rewardCard.draw()}
}

let drawNextLevel = () => {
    nextLevelBackground.draw()
    drawRewardText()
    if(actualLevel < 2){
    nextLevelButton.draw()}
    returnMenuButton.draw()
}
