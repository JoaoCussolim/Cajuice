let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let canvasWidth = 1280
let canvasHeight = 768

canvas.width = canvasWidth
canvas.height = canvasHeight

let scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
}

let played = false
let menu = true

let camera = {
    position: {
        x: 0,
        y: menu === true ? 360 : 768
    }
}
let rolled = true

let bossfight = false
let inWaves = false
let bossfightSpeed = 1
let target
let multiTarget

let desiredFPS = 90;
let frameTime = 1000 / desiredFPS; 

let prevTime = performance.now();
let lag = 0;

function RandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

pushMinions()
let minionMultiplier = 1000/minions.length

function animate() {
    let animationFrame = window.requestAnimationFrame(animate);
    let currentTime = performance.now();
    let elapsed = currentTime - prevTime;
    prevTime = currentTime;
    lag += elapsed;

    while (lag >= frameTime) {
        ctx.fillStyle = "black";
        ctx.imageSmoothingEnabled = false
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.save()
        ctx.scale(4, 4)
        ctx.translate(camera.position.x, -camera.position.y + scaledCanvas.height + 110)
        background.update()
        ctx.restore()

        if(menu){
            Menu()
        }

        player.update()
        playerActions()
            
        if(player.health <= 0 && player.velocity.y === 0){
            player.death()
            if(player.died) window.cancelAnimationFrame(animationFrame)
            document.querySelector('#gameOver').style.display = 'flex'
        }
        
        if(bossfight && boss){
            target = boss
            multiTarget = [boss]
            boss.update()
            BossHealthBar()
            bossActions()
            
            if(boss.health <= 0){
                updateBoss()
            }

            if(projectiles){
                for(let i = projectiles.length - 1; i >= 0; i--){
                    let projectile = projectiles[i]
                    projectile.update()
                    break
                }
            }
        }

        if(inWaves && minions){
            for(let i = minions.length - 1; i >= 0; i--){
                let minion = minions[i]
                let targetMinion = minions.findIndex(minion => {
                    return player.attackbox.position.x + player.attackbox.width >= minion.hitbox.position.x && minion.attackbox.position.x <= minion.hitbox.position.x + minion.hitbox.width && player.attackbox.position.y + player.attackbox.height >= minion.hitbox.position.y && player.attackbox.position.y <= minion.hitbox.position.y + minion.hitbox.height && minion.health > 0 && !minion.invulnerability && minion.direction != player.direction
                })
                let multiTargetMinions = minions.filter(minion => {
                    return player.attackbox.position.x + player.attackbox.width >= minion.hitbox.position.x && minion.attackbox.position.x <= minion.hitbox.position.x + minion.hitbox.width && player.attackbox.position.y + player.attackbox.height >= minion.hitbox.position.y && player.attackbox.position.y <= minion.hitbox.position.y + minion.hitbox.height && minion.health > 0 && !minion.invulnerability && minion.direction != player.direction
                    })
                target = minions[targetMinion]
                multiTarget = multiTargetMinions
                minion.update()
                minionActions(minion)
                if(minion.health <= 0) updateMinions(i)
            }
            waveCounter()
            updateWave()
        }

        if(!menu) playerHealthBar()

        lag -= frameTime;
    }
}

setTimeout(() => {
    animate()
}, 500);

//Credits: chierit - Fire Knight