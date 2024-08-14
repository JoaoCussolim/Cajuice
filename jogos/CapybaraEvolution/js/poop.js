class Poop{
    constructor(position = {x: 0, y: 0}, duration, pooplevel, left, capybaraSize, poopvalue){
        this.position = {
            x: position.x,
            y: position.y
        }
        this.left = left
        this.capybaraSize = capybaraSize
        this.coinDuration = 200;
        this.coinForm = false;
        this.index = 0
        this.duration = duration
        this.icon = new Image()
        this.icon.onload = () => {
        this.size = 50}
        if(currentWorld == 0){
        this.icon.src = capybarasInfoList[pooplevel].poopmodel
        }else{
            this.icon.src = monsterbarasInfoList[pooplevel].poopmodel
        }
        this.poopvalue =  poopvalue
    }
    draw(){
        if(this.left && !this.coinForm){
        ctx.drawImage(this.icon, this.position.x + this.capybaraSize, this.position.y, this.size, this.size)
    }else{
        ctx.drawImage(this.icon, this.position.x, this.position.y, this.size, this.size)
    }
    }
    removeAfterDelay(index){
        this.index = index
        if(this.coinDuration <= 0){
            if(currentWorld == 0){
            poops.splice(this.index, 1)
            }else{
                poops2.splice(this.index, 1)
            }
        }
    }
    transformIntoCoin(){
        this.coinForm = true
        if(currentWorld == 0){
        this.icon.src = menumodels[3]
        }else{
            this.icon.src = menumodels[21]
        }
        this.position.y --
        ctx.font = "30px Times New Romans"
        ctx.fillStyle = "black"
        ctx.fillText(`+ ${this.poopvalue}`, this.position.x + 50, this.position.y + 40)
    }
    update(){
        this.draw()
        this.coinDuration--
    }
}
let poops = []
let poops2 = []