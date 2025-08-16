class Button{
    constructor(source, size, position = {x: 0, y: 0}){
        this.icon = new Image()
        this.icon.src = source
        this.size = size
        this.position = {
            x: position.x,
            y: position.y
        }
        this.isInside = false;
    }
    draw(){
        ctx.drawImage(this.icon, this.position.x, this.position.y, this.size, this.size)
    }
}
let deleteButton = new Button(menumodels[9], 120, {x: 1150, y: 660})
let destroyDataButton = new Button(menumodels[15], 125, {x: 150, y: -10})
let saveButton = new Button(menumodels[8], 120, {x: 0, y: -10})
let leftarrow = new Button(menumodels[6], 120, {x: 400, y: 580})
let rightarrow = new Button(menumodels[5], 120, {x: 800, y: 580})
let coin = new Button(menumodels[3], 80, {x: 460, y: -5})
let blood = new Button(menumodels[21], 80, {x: 460, y: -5})
let shopMenuObject = new Button(menumodels[2], 600, {x: 350, y:95})
let monsterShopMenuObject = new Button(menumodels[23], 600, {x: 350, y:95})
let upgradeMenuObject = new Button(menumodels[11], 600, {x: 350, y:95})
let worldsMenuObject = new Button(menumodels[17], 600, {x: 350, y:95})
let closeButton = new Button(menumodels[1], 60, {x: 870, y: 110})
let worldsButton = new Button(menumodels[16], 90, {x: 340, y: 680})
let upgradeButton = new Button(menumodels[10], 90, {x: 180, y: 680})
let capybaraButtonObject = new Button(menumodels[0], 110, {x: 20, y: 650})
let deleteButtonCordinates = {x: deleteButton.position.x, y: deleteButton.position.y, width: deleteButton.size, height: deleteButton.size}
let destroyDataButtonCordinates = {x: destroyDataButton.position.x, y: destroyDataButton.position.y, width: destroyDataButton.size, height: destroyDataButton.size}
let saveButtonCordinates = {x: saveButton.position.x, y: saveButton.position.y, width: saveButton.size, height: saveButton.size}
let leftarrowCordinates = {x: leftarrow.position.x, y: leftarrow.position.y, width: leftarrow.size, height: leftarrow.size}
let rightarrowCordinates = {x: rightarrow.position.x, y: rightarrow.position.y, width: rightarrow.size, height: rightarrow.size}
let closeButtonCordinates = {x: closeButton.position.x, y: closeButton.position.y, width: closeButton.size, height: closeButton.size}
let worldsButtonCordinates = {x: worldsButton.position.x, y: worldsButton.position.y, width: worldsButton.size, height: worldsButton.size}
let upgradeButtonCordinates = {x: upgradeButton.position.x, y: upgradeButton.position.y, width: upgradeButton.size, height: upgradeButton.size}
let capybaraButtonCordinates = {x: capybaraButtonObject.position.x, y: capybaraButtonObject.position.y, width: capybaraButtonObject.size, height: capybaraButtonObject.size}
let coinMultiplicativeValue = 10
let coinBaseValue = 10
let coinsAmount = +localStorage.coinsAmount || 0
let bloodMultiplicativeValue = 5
let bloodbaseValue = 50
let bloodAmount = +localStorage.bloodAmount || 0
let menuHeight = 90
let drawMenu = () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 680, 1280, menuHeight);
    ctx.fillRect(0, 0, 1280, menuHeight);
    capybaraButtonObject.draw()
    drawCoins()
    if(currentWorld == 0){
    drawCapybaraDropCounter()
    }else{
        drawMonsterbaraDropCounter()
    }
    capybaraCounter()
    if(globalMaxLevel() == maxCapybaraGlobalLevel){
    worldsButton.draw()}
    saveButton.draw()
    deleteButton.draw()
    upgradeButton.draw()
    destroyDataButton.draw()
    drawSaveDescription()
}
let shopMenu = () => {
    if(currentWorld == 0){
    shopMenuObject.draw()
    closeButton.draw()
    shop.forEach((item) => {
            item.draw()
    })
    if(shopPage.capybaraShop < shopPage.item){
        rightarrow.draw()}
    if(shopPage.capybaraShop > 0){
        leftarrow.draw()}
    }else{
    monsterShopMenuObject.draw()
    closeButton.draw()
    monsterShop.forEach((item) => {
        item.draw(`Produz ${item.vps} sangue/s`)
    })
    if(shopPage.monsterbaraShop < shopPage.monsterItem){
        rightarrow.draw()}
    if(shopPage.monsterbaraShop > 1){
        leftarrow.draw()}
    }
}
let savedUpgradeValues = JSON.parse(localStorage.savedUpgradeValues || "[]")
let shopMenuOpen = false
let upgradeMenuOpen = false
let speedMulti = savedUpgradeValues[0] || 1
let actualEvo = savedUpgradeValues[1] || 0
let maxCapybaras = savedUpgradeValues[2] || 16
let maxEvo = maxCapybaraGlobalLevel
let speedMultiMax = 4
let upgradeText = ""
let upgradeSpaceMax = 30
let savedHowManys = JSON.parse(localStorage.howManyTimesBuyedUpgrade || "[]")
let howManyTimesBuyedUpgradeOne = savedHowManys[0] || 0
let howManyTimesBuyedUpgradeTwo = savedHowManys[1] || 0
let howManyTimesBuyedUpgradeThree = savedHowManys[2] || 0
let upgradeMenu = () => {
    upgradeMenuObject.draw()
    closeButton.draw()
    let upgradeOneText = "Velocidade atual: " + speedMulti + "/" + speedMultiMax
    let upgradeTwoText = "Evolução atual: " + actualEvo + "/" + maxEvo + " (" + capybarasInfoList[actualEvo].name + ")"
    let upgradeThreeText = "Espaço Máximo atual: " + maxCapybaras + "/" + upgradeSpaceMax
    upgradeShop.forEach((item, index) => {
        if(index == 0){
            upgradeText = upgradeOneText
        }
        if(index == 1){
            upgradeText = upgradeTwoText
        }
        if(index == 2){
            upgradeText = upgradeThreeText
        }
        item.draw(upgradeText)
    })
    if(shopPage.upgradeShop < 2){
    rightarrow.draw()}
    if(shopPage.upgradeShop > 1){
    leftarrow.draw()}
}
let worldsMenuOpen = false
let worldsMenu = () => {
    worldsMenuObject.draw()
    closeButton.draw()
    if(currentWorld == 0){
        worldsMenuList[1].draw("Outro mundo?")
    }else{
        worldsMenuList[0].draw("Lar doce lar")
    }
}
let drawCoins = () => {
    ctx.font = "50px Times New Romans"
    ctx.fillStyle = "black"
    if(currentWorld == 0){
    coin.draw()
    ctx.fillText(coinsAmount, 540, 50)
    ctx.font = "25px Times New Romans"
    ctx.fillText(`${coinspersecond()} moedas/seg`, 540, 80)
    }else{
        blood.draw()
        ctx.fillText(bloodAmount, 540, 50)
        ctx.font = "25px Times New Romans"
        ctx.fillText(`${bloodpersecond()} sangue/seg`, 540, 80)
    }
}
let capybaraDropCooldown = 1280
let capybaraDropLine = capybaraDropCooldown
let drawCapybaraDropCounter = () => {
    let capybaraDropRemoval = 1 * speedMulti
    ctx.fillStyle = "cyan"
    ctx.fillRect(0, 90, capybaraDropLine, 5)
    capybaraDropCooldown -= capybaraDropRemoval
    capybaraDropLine -= capybaraDropRemoval
    if(capybaraDropCooldown <= 0){
        capybaraDropCooldown = capybaraDropLine = 1280
        capivaraDrop()
    }
}
let monsterbaraDropCooldown = 1280
let monsterbaraDropLine = capybaraDropCooldown
let drawMonsterbaraDropCounter = () => {
    let monsterbaraDropRemoval = 1 * speedMulti
    ctx.fillStyle = "cyan"
    ctx.fillRect(0, 90, monsterbaraDropLine, 5)
    monsterbaraDropCooldown -= monsterbaraDropRemoval
    monsterbaraDropLine -= monsterbaraDropRemoval
    if(monsterbaraDropCooldown <= 0){
        monsterbaraDropCooldown = monsterbaraDropLine = 1280
        monsterbaraDrop()
    }
}
let manyFull = 0
let fullWarn = new Image()
fullWarn.src = menumodels[7]
let capybaraCounterValue = savedUpgradeValues[3] || 160/maxCapybaras
let capybaraCounter = () => {
    ctx.fillStyle="red"
    ctx.fillRect(1070, 15, manyFull, 50)
    ctx.drawImage(fullWarn, 1060, -40, 180, 180)
    if(manyFull < 160){
        if(currentWorld == 0){
    manyFull = capybaras.length * capybaraCounterValue
    }else{
        manyFull = monsterbaras.length * capybaraCounterValue
    }}
    if(manyFull == 160){
    if(currentWorld == 0){
        manyFull = capybaras.length * capybaraCounterValue
    }else{
        manyFull = monsterbaras.length * capybaraCounterValue}
    }
}
let cps = 0
let coinspersecond = () => {
    cps = 0
    capybaras.forEach(capivara => {
        cps += capivara.coinValue
    })
    cps = cps
    return Math.floor(cps)
}
let bps = 0
let bloodpersecond = () => {
    bps = 0
    monsterbaras.forEach(capivara => {
        bps += capivara.bloodValue
    })
    return Math.floor(bps)
}
let saveDescription = "Salvar"
let destroyDataDescription = "Deletar Save"
let destroyDataDescriptionX = 150
let drawSaveDescription = () => {
    ctx.fillStyle = "black"
    ctx.font = "25 Times New Romans"
    ctx.fillText(saveDescription, 30, 20, 100)
    ctx.fillText(destroyDataDescription, destroyDataDescriptionX, 20, 140)
}
let isInsideButton = (rect = {x: 0, y: 0, width: 0, height: 0}) => {
    return mouse.x > rect.x && mouse.x < rect.x+rect.width && mouse.y < rect.y+rect.height && mouse.y > rect.y
}