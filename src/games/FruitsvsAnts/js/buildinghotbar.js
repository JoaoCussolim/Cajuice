class Sprite{
    constructor(position = {x: 0, y: 0}, dimensions = {width: 0, height: 0}, source){
        this.position = position
        this.dimensions = dimensions
        this.source = source
        this.image = new Image()
        this.image.src = source
        
    }

    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
    }
}

class Card extends Sprite{
    constructor(position = {x: 0, y: 0}, dimensions = {width: 0, height: 0}, source, cooldownMultiplier){
        super(position, dimensions, source)
        this.cooldownMultiplier = cooldownMultiplier
        this.cardCooldownHeight = 110.4
        this.cardCooldownTime = 110.4 * this.cooldownMultiplier
        this.cardUsed = false
        this.inCooldown = false
    }

    cardCooldown(){
        if(this.cardCooldownTime > 0 && this.cardUsed){
        this.inCooldown = true
        ctx.fillStyle = "black"
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.cardCooldownHeight)
        this.cardCooldownHeight -= 1/this.cooldownMultiplier
        this.cardCooldownTime--}else{
            this.inCooldown = false
            this.cardCooldownHeight = 110.4
            this.cardCooldownTime = 110.4 * this.cooldownMultiplier
        }
    }

    update(){
        this.draw()
        this.cardCooldown()
        if(this.cardUsed && this.cardCooldownTime <= 0){
            this.cardUsed = false
        }
    }
}

let hotbarSprite = new Sprite(position = {x: 50, y: 0}, dimensions = {width: 800, height: 100}, "./assets/hotbar/buildingsHotbar.png")
let coinContainerSprite = new Sprite(position = {x: 70, y: 100}, dimensions = {width: 80, height: 50}, "./assets/hotbar/baseContainer.png")
let shovelContainerSprite = new Sprite(position = {x: 850, y: 0}, dimensions = {width: 120, height: 120}, "./assets/hotbar/baseContainer.png")
let shovelSprite = new Sprite(position = {x: 873, y: 20}, dimensions = {width: 80, height: 80}, "./assets/hotbar/shovel.png")
let card1 = new Card(position = {x: 210, y: 5 }, dimensions = {width: 80, height: 92}, "./assets/hotbar/shooterModel.png", 2) // Shooter
let card2 = new Card(position = {x: 310, y: 5 }, dimensions = {width: 80, height: 92}, "./assets/hotbar/farmerModel.png", 2) // Farmer
let card3 = new Card(position = {x: 410, y: 5 }, dimensions = {width: 80, height: 92}, "./assets/hotbar/tankModel.png", 2) // Tank
let card4 = new Card(position = {x: 510, y: 5 }, dimensions = {width: 80, height: 92}, "./assets/hotbar/bombModel.png", 2) // Bomb
let card5 = new Card(position = {x: 610, y: 5 }, dimensions = {width: 80, height: 92}, "./assets/hotbar/fighterModel.png", 2.5) // Fighter
let card6 = new Card(position = {x: 710, y: 5 }, dimensions = {width: 80, height: 92}, "./assets/hotbar/tripleShooterModel.png", 4) // Triple Shooter

let card1Cordinates = {x: card1.position.x, y: card1.position.y, width: card1.dimensions.width, height: card1.dimensions.height}
let card2Cordinates = {x: card2.position.x, y: card2.position.y, width: card2.dimensions.width, height: card2.dimensions.height}
let card3Cordinates = {x: card3.position.x, y: card3.position.y, width: card3.dimensions.width, height: card3.dimensions.height}
let card4Cordinates = {x: card4.position.x, y: card4.position.y, width: card4.dimensions.width, height: card4.dimensions.height}
let card5Cordinates = {x: card5.position.x, y: card5.position.y, width: card5.dimensions.width, height: card5.dimensions.height}
let card6Cordinates = {x: card6.position.x, y: card6.position.y, width: card6.dimensions.width, height: card6.dimensions.height}
let shovelSpriteCordinates = {x: shovelSprite.position.x, y: shovelSprite.position.y, width: shovelSprite.dimensions.width, height: shovelSprite.dimensions.height}

let cards = [card1, card2, card3, card4, card5, card6]

let seeds = 100

let draggingShovel = false
//source, frameRate = 1, frameBuffer = 3, scale = 1, animations
let currentBuilding = {
    fixY: null,
    fixX: 0,
    price: null,
    color: null,
    cooldown: null,
    type: null,
    damage: null,
    source: null,
    frameRate: null,
    frameBuffer: null,
    scale: null,
    animations: {
        animationName: {
            source: null,
            frameRate: null,
            frameBuffer: null,
            image: new Image()
        },
    }
}
let buildingSelected = false
let selectedCard = undefined

let drawSeeds = () => {
    ctx.font = "30px Times New Roman"
    ctx.fillStyle = "white"
    ctx.textBaseline = "middle"
    ctx.textAlign = "center"
    ctx.fillText(seeds, 109, 127, 50)
}

let drawWaves = () => {
    ctx.font = "50px Times New Roman"
    ctx.fillStyle = "Black"
    if(!endlessMode){
    ctx.fillText(`Waves: ${waveNumber}/${maxWavesNumber}`, 640, 700, 200)}
    else{
    ctx.fillText(`Waves: ${waveNumber}`, 640, 700, 200)}
}

let drawHotbar = () => {
    hotbarSprite.draw()
    coinContainerSprite.draw()
    shovelContainerSprite.draw()
    if(!draggingShovel){
    shovelSprite.draw()}
    if(levelBeaten >= 1){
    card6.update()}
    if(levelBeaten >= 0){
    card5.update()}
    card4.update()
    card3.update()
    card2.update()
    card1.update()
    drawSeeds()
    drawWaves()
}

let isInsideButton = (rect = {x: 0, y: 0, width: 0, height: 0}) => {
    return mouse.x > rect.x && mouse.x < rect.x+rect.width && mouse.y < rect.y+rect.height && mouse.y > rect.y
}