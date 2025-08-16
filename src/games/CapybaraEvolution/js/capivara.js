class Capivara{
    constructor(level){
        this.icon = new Image();
        this.icon.src = capybarasInfoList[0].model
        this.position = {
            x: RandomInt(100, canvas.width - 80),
            y: RandomInt(100, canvas.height - 110 - menuHeight)
        };
        this.size = 80;
        this.moving = false;
        this.mousecolliding = false;
        this.dragging = false;
        this.mainCooldown = RandomInt(2500, 4500)
        this.movingCooldown = this.mainCooldown;
        this.lastPoopTime = 0;
        this.poopInterval = 5000;
        this.coinValue = 0;
        this.level = 0;
        this.left = false;
        this.newlevel = level || 0;
        this.maxlevel = maxCapybaraGlobalLevel
        this.moviment = {
            x: 0,
            y: 0
        };
    }
    move(){
        if(!this.moving){
            this.moviment.x = RandomInt(100, canvas.width - 80);
            this.moviment.y = RandomInt(100, canvas.height - 110 - menuHeight);
        }
        if (this.position.x != this.moviment.x) {
            if (this.position.x < this.moviment.x) {
                this.position.x++;
                this.left = false;
            }
            else {
                this.position.x--;
                this.left = true;
            }
        }
        if (this.position.y != this.moviment.y) {
            if (this.position.y < this.moviment.y) {
                this.position.y++
            } else {
                this.position.y--
            }
        }
        this.moving = true
        this.movingCooldown--
    }
    draw(){
        if (this.left){
            drawFlippedImage(this.icon, this.position.x, this.position.y, this.size, this.size)
        }else{
        ctx.drawImage(this.icon, this.position.x, this.position.y, this.size, this.size)}
    }
    mousecollision(){
        if(mouse.x > this.position.x && mouse.x < this.position.x + this.size && mouse.y > this.position.y && mouse.y < this.position.y + this.size && capivaradragged == false){
            this.mousecolliding = true
        }else{
        this.mousecolliding = false
        }
    }
    drag(){
        if(this.dragging){
        this.position.x = mouse.x - this.size/2
        this.position.y = mouse.y - this.size/2}
    }
    collidesWith(otherCapybara){
        let distance = getDistance(this.position.x, this.position.y, otherCapybara.position.x, otherCapybara.position.y);
        return distance <= Math.pow(this.size/2 + otherCapybara.size/2, 2);
    }
    levelup(){
        if(this.newlevel != this.level && this.newlevel <= this.maxlevel){
            this.icon.src = capybarasInfoList[this.newlevel].model
            this.level = this.newlevel
            this.updateSize()
        }
        if(this.newlevel > this.maxlevel){
            this.newlevel--
        }
    }
    updateSize(){
        if(specialSizeLevels.includes(this.level)){
            this.size = 130
        }else{
            this.size = 80
        }
    }
    canPoop(){
        return Date.now() - this.lastPoopTime > this.poopInterval;
    }
    poop(){
        if(this.canPoop())
            {
            this.coinValue = Math.floor(1 + coinBaseValue * (coinMultiplicativeValue * this.level * this.level))

            let poop = new Poop({x: this.position.x - this.size/4, y: this.position.y + this.size/2}, 1000, this.level, this.left, this.size, this.coinValue);
            this.lastPoopTime = Date.now();

            coinsAmount += this.coinValue

            return poop;
        }
        return null;
    }
    update(){
        this.move()
        this.drag()
        this.mousecollision()
        this.draw()
        this.levelup()
        if(this.movingCooldown <= 0 && !this.dragging){
            this.moving = false
            this.movingCooldown = this.mainCooldown
        }
    }
}
function RandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let getDistance = (xpos1, ypos1, xpos2, ypos2) => {
    let x = xpos2 - xpos1
    let y = ypos2 - ypos1
    let result = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    let squareresult = Math.pow(result, 2)
    return squareresult
}
function drawFlippedImage(img, x, y, width, height) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(img, -x - width, y, width, height);
    ctx.restore();
}
let capybaras = []
let savedCapys = JSON.parse(localStorage.capybaras || "[]")
savedCapys.forEach(savedcapy => {
    capybaras.push(new Capivara(savedcapy.level))
})
let globalMaxLevel = () => {
    let maxLevel = 0;
    let actualLevel = 0;
    capybaras.forEach(capybara => {
        actualLevel = capybara.level
        if(actualLevel > maxLevel){
            maxLevel = actualLevel
        }
    })
    return maxLevel
}
let globalMaxLevelMonster = () => {
    let maxLevel = 0;
    let actualLevel = 0;
    monsterbaras.forEach(capybara => {
        actualLevel = capybara.level
        if(actualLevel > maxLevel){
            maxLevel = actualLevel
        }
    })
    return maxLevel
}
let capivaraDrop = () => {
    if(maxCapybaras != capybaras.length){
    capybaras.push(new Capivara(actualEvo))}
}
let capivaradragged = false