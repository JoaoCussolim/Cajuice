class Monsterbara{
    constructor(level){
        this.icon = new Image();
        this.icon.src = monsterbarasInfoList[0].model
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
        this.bloodValue = 0;
        this.level = 0;
        this.left = false;
        this.newlevel = level || 0;
        this.maxlevel = maxMonsterbaraGlobalLevel
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
            this.icon.src = monsterbarasInfoList[this.newlevel].model
            this.level = this.newlevel
        }
        if(this.newlevel > this.maxlevel){
            this.newlevel--
        }
    }
    canPoop(){
        return Date.now() - this.lastPoopTime > this.poopInterval;
    }
    poop(){
        if(this.canPoop()){
            this.bloodValue = Math.floor(100 + bloodbaseValue * (bloodMultiplicativeValue * this.level * this.level))
            let poop = new Poop({x: this.position.x - this.size/4, y: this.position.y + this.size/2}, 1000, this.level, this.left, this.size, this.bloodValue);
            this.lastPoopTime = Date.now();
            
            bloodAmount += this.bloodValue

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
let monsterbaras = []
let savedMonsters = JSON.parse(localStorage.monsterbaras || "[]")
savedMonsters.forEach(savedcapy => {
    monsterbaras.push(new Monsterbara(savedcapy.level))
})
let monsterbaradragged = false
let monsterbaraDrop = () => {
    if(maxCapybaras != monsterbaras.length){
    monsterbaras.push(new Monsterbara())}
}
let upgradeOneMultiplier = 4
let upgradeTwoMultiplier = 2
let upgradeThreeMultiplier = 1.5
let upgradeCurrentCoin = coinsAmount
let updateUpgradesforMonster = () => {
    if(howManyTimesBuyedUpgradeOne >= 2){
        upgradeOne.buttonBuyIcon.src = menumodels[22]
    }
    if(howManyTimesBuyedUpgradeTwo >= 6){
        upgradeTwo.buttonBuyIcon.src = menumodels[22]
    }
    if(howManyTimesBuyedUpgradeThree >= 9){
        upgradeThree.buttonBuyIcon.src = menumodels[22]
    }
    
}
let fixUpgrades = () => {
    if(howManyTimesBuyedUpgradeOne == 2){
        upgradeOneMultiplier = 2
        upgradeOne.price = 20000
    }
    if(howManyTimesBuyedUpgradeTwo == 6){
        upgradeTwoMultiplier = 2
        upgradeTwo.price = 100000
    }
    if(howManyTimesBuyedUpgradeThree == 9){
        upgradeThreeMultiplier = 2
        upgradeThree.price = 10000
    }
}
let howManyinPageMonster = localStorage.howManyinPageMonster || 0;
let howManySpaceMonster = 0
let choosePageMonster = () => {
    if(howManyinPageMonster < 2){
        if(howManyinPageMonster >= 1){howManySpaceMonster++}
        howManyinPageMonster++
        return shopPage.monsterItem
    }
    if(howManyinPageMonster == 2){
        howManySpaceMonster = 0
        howManyinPageMonster = 1
        shopPage.monsterItem++
        return shopPage.monsterItem
    }
}
let spaceBetweenMonster = 200
let monsterShop = []
let savedMonsterShop = JSON.parse(localStorage.monsterShop || "[]")
savedMonsterShop.forEach((savedShopSprite, index) => {
    monsterShop.push(new ShopSprite(monsterbarasInfoList[savedShopSprite.capyLevel].model, savedShopSprite.capybaraPage, {x: savedShopSprite.position.x, y: savedShopSprite.position.y}, savedShopSprite.name, savedShopSprite.vps, savedShopSprite.price, savedShopSprite.capyLevel, undefined, undefined, menumodels[22], savedShopSprite.capybaraMonsterPage))
})
let monsterShopButtonList = []
let previousMaxLevelMonster = localStorage.previousMaxLevelMonster || -1
let previousShopMonsterLength = 0
function isMonsterEqual(obj1, obj2) {
    return obj1.y === obj2.y && obj1.monsterPage === obj2.monsterPage;
}
let updateShopMonster = () => {
    let actualMaxLevel = globalMaxLevelMonster() - 1;
    if(actualMaxLevel > previousMaxLevelMonster){
        actualMonsterPage = choosePageMonster()
        monsterShop.push(new ShopSprite(monsterbarasInfoList[actualMaxLevel].model, undefined,{x: 400, y: 190 + howManySpaceMonster*spaceBetweenMonster}, monsterbarasInfoList[actualMaxLevel].name, (Math.floor(100 + bloodbaseValue * (bloodMultiplicativeValue * actualMaxLevel * actualMaxLevel))), 500 + Math.floor(320 * actualMaxLevel * actualMaxLevel), actualMaxLevel, undefined, undefined, menumodels[22], actualMonsterPage))
    }
    let actualShopLenght = monsterShop.length
    if(actualShopLenght > previousShopMonsterLength){
        monsterShop.forEach(button => {
            buttonCordinates = button.getButtonCordinates()
            if(!monsterShopButtonList.some(coord => isMonsterEqual(coord, buttonCordinates))){
            monsterShopButtonList.push(buttonCordinates)}
    })
    previousShopMonsterLength = actualShopLenght
        previousMaxLevelMonster = actualMaxLevel}
}