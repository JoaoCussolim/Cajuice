let mouse = {
    x: undefined,
    y: undefined
}
canvas.onmousemove = function(e){
    mouse.x = e.clientX
    mouse.y = e.clientY
}
canvas.onmousedown = function (e) {
    if(currentWorld == 0){
    capybaras.forEach((capivarinha) => {
        if(capivarinha.mousecolliding && capivaradragged == false){
            capivarinha.dragging = true
            capivaradragged = true
        }
    })
    }else{
        monsterbaras.forEach((capivarinha) => {
            if(capivarinha.mousecolliding && monsterbaradragged == false){
                capivarinha.dragging = true
                monsterbaradragged = true
            }
        })
    }   
    if(isInsideButton(capybaraButtonCordinates)){
        shopMenuOpen = true
        upgradeMenuOpen = false
        worldsMenuOpen = false
    }
    if(isInsideButton(closeButtonCordinates)){
        shopMenuOpen = false
        upgradeMenuOpen = false
        worldsMenuOpen = false
    }
    if(isInsideButton(upgradeButtonCordinates)){
        upgradeMenuOpen = true
        shopMenuOpen = false
        worldsMenuOpen = false
    }
    if(isInsideButton(worldsButtonCordinates) && globalMaxLevel() == maxCapybaraGlobalLevel){
        worldsMenuOpen = true
        shopMenuOpen = false
        upgradeMenuOpen = false 
    }
    if(isInsideButton(saveButtonCordinates)){
        saveGame()
        saveDescription = "Salvo!"
        setTimeout(() => {
            saveDescription = "Salvar"
        }, 500);
    }
    if(isInsideButton(destroyDataButtonCordinates)){
        localStorage.clear()
        destroyDataDescriptionX = 160
        destroyDataDescription = "Deletado!"
        setTimeout(() => {
            destroyDataDescriptionX = 150
            destroyDataDescription = "Deletar Save"
        }, 500);
    }
    if(shopMenuOpen && currentWorld == 0){
    shop.forEach((item, index) => {
        if(isInsideButton(shopbuttonlist[index]) && coinsAmount >= item.price && item.capybaraPage == shopPage.capybaraShop && capybaras.length != maxCapybaras){
            coinsAmount -= item.price
            item.price *= 2.8
            item.price = Math.floor(item.price)
            item.spawnCapy()
        }
    })
        if(isInsideButton(rightarrowCordinates) && shopPage.capybaraShop < shopPage.item){
            shopPage.capybaraShop ++
        }
        if(isInsideButton(leftarrowCordinates) && shopPage.capybaraShop > 0){
            shopPage.capybaraShop --
        }
    }
    if(shopMenuOpen && currentWorld == 1){
        monsterShop.forEach((item, index) => {
            if(isInsideButton(monsterShopButtonList[index]) && bloodAmount >= item.price && item.capybaraMonsterPage == shopPage.monsterbaraShop && monsterbaras.length != maxCapybaras){
                bloodAmount -= item.price
                item.price *= 2
                item.price = Math.floor(item.price)
                item.spawnMonster()
            }
        })
            if(isInsideButton(rightarrowCordinates) && shopPage.monsterbaraShop < shopPage.monsterItem){
                shopPage.monsterbaraShop ++
            }
            if(isInsideButton(leftarrowCordinates) && shopPage.monsterbaraShop > 1){
                shopPage.monsterbaraShop --
            }
        }
    if(upgradeMenuOpen){
        upgradeShop.forEach((item, index) => {
            if(isInsideButton(upgradeShopButtonList[index]) && item.upgradePage == shopPage.upgradeShop){
                if(index == 0 && speedMulti < speedMultiMax){
                    if(howManyTimesBuyedUpgradeOne >= 2 && bloodAmount >= item.price){
                        bloodAmount -= item.price
                        item.price *= upgradeOneMultiplier //4
                        speedMulti += 0.5
                        howManyTimesBuyedUpgradeOne++
                    }
                    if(howManyTimesBuyedUpgradeOne < 2 && coinsAmount >= item.price){
                        coinsAmount -= item.price
                        item.price *= upgradeOneMultiplier //4
                        speedMulti += 0.5
                        howManyTimesBuyedUpgradeOne++
                    }
                }
                if(index == 1 && actualEvo < maxEvo){
                    if(howManyTimesBuyedUpgradeTwo >= 6 && bloodAmount >= item.price){
                        bloodAmount -= item.price
                        item.price *= upgradeTwoMultiplier //2
                        actualEvo++
                        howManyTimesBuyedUpgradeTwo++
                    }
                    if(howManyTimesBuyedUpgradeTwo < 6 && coinsAmount >= item.price){
                        coinsAmount -= item.price
                        item.price *= upgradeTwoMultiplier //2
                        actualEvo++
                        howManyTimesBuyedUpgradeTwo++
                    }
                }
                if(index == 2 && maxCapybaras < upgradeSpaceMax){
                    if(howManyTimesBuyedUpgradeThree >= 9 && bloodAmount >= item.price){
                        bloodAmount -= item.price
                        item.price *= upgradeThreeMultiplier //1.5
                        item.price = Math.floor(item.price)
                        maxCapybaras++
                        capybaraCounterValue = 160/maxCapybaras
                        howManyTimesBuyedUpgradeThree++
                    }
                    if(howManyTimesBuyedUpgradeThree < 9 && coinsAmount >= item.price){
                        coinsAmount -= item.price
                        item.price *= upgradeThreeMultiplier //1.5
                        item.price = Math.floor(item.price)
                        maxCapybaras++
                        capybaraCounterValue = 160/maxCapybaras
                        howManyTimesBuyedUpgradeThree++
                    }
                }
            }
        })
        if(isInsideButton(rightarrowCordinates) && shopPage.upgradeShop < 2){
            shopPage.upgradeShop ++
        }
        if(isInsideButton(leftarrowCordinates) && shopPage.upgradeShop > 1){
            shopPage.upgradeShop --
        }
    }
    if(worldsMenuOpen){
        if(isInsideButton(worldsMenuButtonList[0])){
            if(currentWorld == 0){
            currentWorld = 1
            worldImage.src = './assets/map/secondMap.png'
        }else{
            currentWorld = 0
            worldImage.src = './assets/map/map.png'
        }
        }
    }
}
canvas.onmouseup = function (e) {
    if(currentWorld == 0){
    capybaras.forEach((capivarinha, index) => {
        if(capivarinha.dragging){
            if(isInsideButton(deleteButtonCordinates)){
                capybaras.splice(index, 1)
            }
            capivarinha.dragging = false
        }
    })
    capivaradragged = false
    }else{
        monsterbaras.forEach((capivarinha, index) => {
            if(capivarinha.dragging){
                if(isInsideButton(deleteButtonCordinates)){
                    monsterbaras.splice(index, 1)
                }
                capivarinha.dragging = false
            }
        })
        monsterbaradragged = false
    }
}