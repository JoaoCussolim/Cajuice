let mouse = {
    x:0,
    y:0
}


addEventListener('mousemove', (e) => {
mouse.x = e.clientX;
mouse.y = e.clientY;
})

addEventListener('click', (e) => {
    if(playbtn.mouseOn && controlScreen == false && creditsScreen == false && menu){
        played = true;
    }

    if(controlbtn.mouseOn && creditsScreen == false && menu){
        controlScreen = true;
        controlbtn.mouseOn = false;
    }

    if(creditbtn.mouseOn && controlScreen == false && menu){
        creditsScreen = true;
        creditbtn.mouseOn = false;
    }

    if(closebtn.mouseOn && menu){
        closebtn.mouseOn = false;
        controlScreen = false;
        creditsScreen = false;
    }

    if(isInsideButton(upgradeMenuButton)){
        let universal = upgradeMenuOpen === false ? true : false
        upgradeMenuOpen = universal
    }
    if(upgradeMenuOpen){
        if(isInsideButton(upgradeStrenght) && statPoints > 0){
            statPoints--
            strenghtStat++
            player.updateAtributes()
            buffBoss()
        }
        if(isInsideButton(upgradeVitality) && statPoints > 0){
            statPoints--
            vitalityStat++
            player.updateAtributes()
            buffBoss()
        }
        if(isInsideButton(upgradeSpecial) && statPoints > 0){
            statPoints--
            specialStat++
            player.updateAtributes()
            buffBoss()
        }
    }
})


let isInsideButton = (rect = {x: 0, y: 0, width: 0, height: 0}) => { 
return mouse.x > rect.x && mouse.x < rect.x+rect.width && mouse.y < rect.y+rect.height && mouse.y > rect.y }