let keys = {
    d:{
        pressed: false
    },
    a: {
        pressed: false
    },
}

addEventListener('keydown', (e) => {
    switch(e.key){
        case 'd':
        case 'D':
        case 'ArrowRight':
            if(player.alive && !upgradeMenuOpen) keys.d.pressed = true
            else if(upgradeMenuOpen) keys.d.pressed = false
        break
        case 'a':
        case 'A':
        case 'ArrowLeft':
            if(player.alive && !upgradeMenuOpen) keys.a.pressed = true
            else if(upgradeMenuOpen) keys.a.pressed = false
        break
        case 'w':
        case 'W':
        case 'ArrowUp':
        case ' ':
            if(!player.attacking && player.alive && !upgradeMenuOpen) player.jump()
        break
        case 'q':
        case 'Q':
            if(rolled && player.velocity.y === 0 && !player.attacking && player.alive && !upgradeMenuOpen) player.roll()
        break
        case 'f':
        case 'F':
            if(!player.rolling && player.alive && !upgradeMenuOpen) player.attack()
        break
        case 'z':
        case 'Z':
            if(!player.rolling && player.alive && !upgradeMenuOpen) player.SpecialAttack()
        break
        case 'k':
        case 'K':
            if(player.alive){
                let universal = upgradeMenuOpen === false ? true : false
                upgradeMenuOpen = universal
                keys.a.pressed = false
                keys.d.pressed = false
            }
        break
        case 'r':
        case 'R':
            if(player.died){
                location.reload()
            }
    }
})

addEventListener('mousedown', (e) => {
    if(!player.rolling && player.alive && !upgradeMenuOpen) player.attack()
})

addEventListener('keyup', (e) => {
    switch(e.key){
        case 'd':
        case 'D':
        case 'ArrowRight':
            if(player.alive) keys.d.pressed = false
        break
        case 'a':
        case 'A':
        case 'ArrowLeft':
            if(player.alive) keys.a.pressed = false
        break
    }
})