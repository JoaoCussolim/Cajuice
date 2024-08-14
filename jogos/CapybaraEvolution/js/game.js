let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let altura = 768;
let largura = 1280;
let worldImage = new Image()
worldImage.src = './assets/map/map.png'
canvas.width = largura;
canvas.height = altura;
let desiredFPS = 120;
let frameTime = 1000 / desiredFPS; 
let prevTime = performance.now();
let lag = 0;
let currentWorld = 0;
let saveGame = () => {
    localStorage.savedUpgradeValues = JSON.stringify([speedMulti, actualEvo, maxCapybaras, capybaraCounterValue])
    localStorage.howManyTimesBuyedUpgrade = JSON.stringify([howManyTimesBuyedUpgradeOne, howManyTimesBuyedUpgradeTwo, howManyTimesBuyedUpgradeThree])
    localStorage.upgradePrices = JSON.stringify([upgradeShop[0].price, upgradeShop[1].price, upgradeShop[2].price])
    localStorage.shopPageItem = shopPage.item
    localStorage.shopPageMonsterItem = shopPage.monsterItem
    localStorage.previousMaxLevel = previousMaxLevel
    localStorage.previousMaxLevelMonster = previousMaxLevelMonster
    localStorage.howManyinPage = howManyinPage
    localStorage.howManyinPageMonster = howManyinPageMonster
    localStorage.shop = JSON.stringify(shop)
    localStorage.monsterShop = JSON.stringify(monsterShop)
    localStorage.coinsAmount = coinsAmount
    localStorage.bloodAmount = bloodAmount
    localStorage.monsterbaras = JSON.stringify(monsterbaras)
    localStorage.capybaras = JSON.stringify(capybaras)
}
let saveCooldown = 1000
worldImage.onload = () => {
    setTimeout(() => {
        animate()
    }, 500);
}
let animate = () => {
    let currentTime = performance.now();
    let elapsed = currentTime - prevTime;
    prevTime = currentTime;
    lag += elapsed;

    while(lag >= frameTime){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(worldImage, 0, 0);
        drawMenu()
        updateUpgradesforMonster()
        fixUpgrades()
        if(currentWorld == 0){
        capybaras.forEach((capivarinha, index) => {
            capivarinha.update()
            let poop = capivarinha.poop();
            if(poop){
                poops.push(poop)
            }
        })

        poops.forEach((poop, index) => {
            poop.update()
            if(poop.coinDuration <= 100){
                poop.transformIntoCoin()
                poop.removeAfterDelay(index)
            }
        })
        
        updateShop()
        worldOneDetectCollisions()
        }

        if(currentWorld == 1){
            monsterbaras.forEach((capivarinha, index) => {
                capivarinha.update()
                let poop = capivarinha.poop();
                if(poop){
                    poops2.push(poop)
                }
            })
    
            poops2.forEach((poop, index) => {
                poop.update()
                if(poop.coinDuration <= 100){
                    poop.transformIntoCoin()
                    poop.removeAfterDelay(index)
                }
            })
            
            updateShopMonster()
            worldTwoDetectCollisions()
        }
        
        saveCooldown--

        if(saveCooldown <= 0){
            saveGame()
            saveCooldown = 1000
        }

        if(shopMenuOpen){
            shopMenu()
        }

        if(upgradeMenuOpen){
            upgradeMenu()
        }

        if(worldsMenuOpen){
            worldsMenu()
        }

        lag -= frameTime;
}
    requestAnimationFrame(animate)
}