let placementTilesData2D = []

for (let i = 0; i < placementTilesData.length; i += 20){
    placementTilesData2D.push(placementTilesData.slice(i, i + 20))
}

class PlacementTile{
    constructor(position = {x: 0, y: 0}){
        this.position = position
        this.size = 64
        this.color = "rgba(255, 255, 255, 0.1)"
        this.isOccupied = false
    }

    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size)
    }

    update(mouse){
        this.draw()

        if(mouse.x > this.position.x && mouse.x < this.position.x + this.size && mouse.y > this.position.y && mouse.y < this.position.y + this.size){
            this.color = "rgba(11, 156, 49, 0.5)"
        }else{this.color=  "rgba(255, 255, 255, 0.1)"}
    }
}

let placementTiles = []

placementTilesData2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol === 24){
            // vai adicionar um lugar pra colocar
            placementTiles.push(new PlacementTile(position = {x: x * 64, y: y * 64}))
        }
    })
})