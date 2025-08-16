class ShopSprite{
    constructor(source, actualPage ,position = {x: 0, y: 0}, name, valuepersecond, price, capyLevel, upgradePage, worldsPage, ButtonIcon, monsterPage){
        this.icon = new Image()
        this.icon.src = source
        this.buttonBuyIcon = new Image()
        this.buttonBuyIcon.src = ButtonIcon
        this.upgradePage = upgradePage || null
        this.worldsPage = worldsPage || null
        this.name = name
        this.vps = valuepersecond
        this.capybaraPage = actualPage
        this.capybaraMonsterPage = monsterPage || null
        this.width = 500
        this.height = 200
        this.iconSize = 100
        this.price = price
        this.position = {
            x: position.x,
            y: position.y
        }
        this.capyLevel = capyLevel
    }
    draw(optionalDescription){
        if(this.capybaraPage == shopPage.capybaraShop || this.capybaraMonsterPage == shopPage.monsterbaraShop || this.upgradePage == shopPage.upgradeShop || this.worldsPage == shopPage.worldsMenu){
        ctx.font = "30px Times New Romans"
        ctx.fillStyle = "rgba(255, 243, 163)"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = "rgba(230, 145, 255)"
        ctx.fillRect(this.position.x, this.position.y + this.height/4, this.iconSize, this.iconSize)
        ctx.drawImage(this.icon, this.position.x, this.position.y + this.height/4, this.iconSize, this.iconSize)
        ctx.drawImage(this.buttonBuyIcon, this.position.x + this.height*1.2, this.position.y + this.height/8, 250, 200)
        ctx.fillStyle = "black"
        ctx.fillText(this.name, this.position.x + this.height/1.5, this.position.y + this.height/6)
        ctx.font = "20px Times New Romans"
        if(optionalDescription){
            ctx.fillText(optionalDescription, this.position.x + this.height/1.2, this.position.y + this.height/3.5)
        }else{
            ctx.fillText(`Produz ${this.vps} moedas/s`, this.position.x + this.height/1.2, this.position.y + this.height/3.5)}
        ctx.fillText(this.price, this.position.x + this.height*1.8, this.position.y + this.height/1.8)}
    }
    getButtonCordinates(){
        return {x: (this.position.x + 200), y: (this.position.y + 25), width: 250, height: 200, page: this.capybaraPage, monsterPage: this.capybaraMonsterPage}
    }
    spawnCapy(){
        capybaras.push(new Capivara(this.capyLevel))
    }
    spawnMonster(){
        monsterbaras.push(new Monsterbara(this.capyLevel))
    }
}
let spaceBetween = 200
let previousMaxLevel = localStorage.previousMaxLevel || -1;
let shopbuttonlist = []
let shop = []
let savedShop = JSON.parse(localStorage.shop || "[]")
savedShop.forEach((savedShopSprite, index) => {
    shop.push(new ShopSprite(capybarasInfoList[savedShopSprite.capyLevel].model, savedShopSprite.capybaraPage, {x: savedShopSprite.position.x, y: savedShopSprite.position.y}, savedShopSprite.name, savedShopSprite.vps, savedShopSprite.price, savedShopSprite.capyLevel, undefined, undefined, menumodels[4]))
})
let previousShopLenght = 0;
let buttonCordinates
let shopPage = {
    worldsMenu: 1,
    capybaraShop: 0,
    monsterbaraShop: 1,
    upgradeShop: 1,
    item: localStorage.shopPageItem || 0,
    monsterItem: localStorage.shopPageMonsterItem || 1,
};
let howManyinPage = localStorage.howManyinPage || 0;
let howManySpace = 0
let choosePage = () => {
    if(howManyinPage < 2){
        if(howManyinPage >= 1){howManySpace++}
        howManyinPage++
        return shopPage.item
    }
    if(howManyinPage == 2){
        howManySpace = 0
        howManyinPage = 1
        shopPage.item++
        return shopPage.item
    }
}
let updateShop = () => {
    let actualMaxLevel = globalMaxLevel() - 1;
    if(actualMaxLevel > previousMaxLevel){
        shop.push(new ShopSprite(capybarasInfoList[actualMaxLevel].model, choosePage(),{x: 400, y: 190 + howManySpace*spaceBetween}, capybarasInfoList[actualMaxLevel].name, (1 + coinBaseValue * (coinMultiplicativeValue * actualMaxLevel * actualMaxLevel)), 10 + Math.floor(120 * actualMaxLevel * actualMaxLevel), actualMaxLevel, undefined, undefined, menumodels[4]))
    }
    let actualShopLenght = shop.length
    if(actualShopLenght > previousShopLenght){
        shop.forEach(button => {
            buttonCordinates = button.getButtonCordinates()
            if(!shopbuttonlist.some(coord => isEqual(coord, buttonCordinates))){
            shopbuttonlist.push(buttonCordinates)}
    })
        previousShopLenght = actualShopLenght
        previousMaxLevel = actualMaxLevel}
}
function isEqual(obj1, obj2) {
    return obj1.y === obj2.y && obj1.page === obj2.page;
}
let xBonus = 200
let yBonus = 25
let buttonWidth = 250
let buttonHeight = 200
let savedPrices = JSON.parse(localStorage.upgradePrices || "[]") 
let upgradeOnePrice = savedPrices[0]|| 15000
let upgradeTwoPrice = savedPrices[1] || 50000
let upgradeThreePrice = savedPrices[2] || 2000
let upgradeOne = new ShopSprite(menumodels[13], undefined, {x: 400, y:190}, "Capivara Delivery", undefined, upgradeOnePrice, undefined, 1, undefined, menumodels[4])
let upgradeTwo = new ShopSprite(menumodels[12], undefined, {x: 400, y:390}, "Evolução Inicial", undefined, upgradeTwoPrice, undefined,  1, undefined, menumodels[4])
let upgradeThree = new ShopSprite(menumodels[14], undefined, {x: 400, y:190}, "Espaço Máximo", undefined, upgradeThreePrice, undefined, 2, undefined, menumodels[4])
let upgradeShop = [upgradeOne, upgradeTwo, upgradeThree]
let upgradeShopButtonList = [{x: upgradeShop[0].position.x + xBonus, y: upgradeShop[0].position.y + yBonus, width: buttonWidth, height: buttonHeight}, {x: upgradeShop[1].position.x + xBonus, y: upgradeShop[1].position.y + yBonus, width: buttonWidth, height: buttonHeight}, {x: upgradeShop[2].position.x + xBonus, y: upgradeShop[2].position.y + yBonus, width: buttonWidth, height: buttonHeight}]
let worldOne = new ShopSprite(menumodels[19], undefined, {x: 400, y:190}, "Mundo Normal", undefined, "", undefined, undefined, 1, menumodels[18])
let worldTwo = new ShopSprite(menumodels[20], undefined, {x: 400, y:190}, "Mundo Corrompido", undefined, "", undefined, undefined, 1, menumodels[18])
let worldsMenuList = [worldOne, worldTwo]
let worldsMenuButtonList = [{x: worldsMenuList[0].position.x + xBonus, y: worldsMenuList[0].position.y + yBonus, width: buttonWidth, height: buttonHeight}]