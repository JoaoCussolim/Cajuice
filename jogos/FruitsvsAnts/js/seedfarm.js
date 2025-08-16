class BagOfSeeds{
    constructor(position = {x: 0, y: 0}, dimensions = {width: 0, height: 0}, buildingPosition = {x: 0, y: 0}){
        this.buildingPosition = buildingPosition
        this.position = position
        this.dimensions = dimensions
        this.image = new Image()
        this.image.src = "./assets/seeds/bagofseeds.png"
    }

    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
    }

    animation(){
        if(this.position.y + 50 > this.buildingPosition.y) this.position.y--;
        if(this.position.x - 40 < this.buildingPosition.x) this.position.x++;
    }

    remove(){
        if(mouse.x > this.position.x && mouse.x < this.position.x + this.dimensions.width && mouse.y > this.position.y && mouse.y < this.position.y + this.dimensions.width){
            let seedIndex = seedsOnGround.findIndex(seed => {
                return seed.position.x === this.position.x
            })
            seeds += 25
            seedsOnGround.splice(seedIndex, 1)
        }
    }

    update(){
        this.draw()
        this.animation()
        this.remove()
    }
}

let seedsOnGround = []

let dropSeeds = () => {
    let x = RandomInt(50, 1100)
    let y = RandomInt(250, 500)
    seedsOnGround.push(new BagOfSeeds({x: x, y: y},{width: 50, height: 50}, {x: x, y: y}))
}