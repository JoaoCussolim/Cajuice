let gravity = 0.8
let floorHeight = 500

class Sprite {
    constructor({ position = { x: 0, y: 0 }, source, frameRate = 1, frameBuffer = 3, scale = 1 }) {
        this.position = position;
        this.scale = scale;
        this.loaded = false;
        this.image = new Image();
        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * this.scale
            this.height = this.image.height * this.scale
            this.loaded = true
        };
        this.image.src = source;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.frameBuffer = frameBuffer;
        this.elapsedFrames = 0;
    }

    draw() {
        if (!this.image) return;
        
        let cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        };

        ctx.drawImage(this.image, cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, this.position.x, this.position.y, this.width, this.height)
    }

    updateFrames() {
        this.elapsedFrames++;
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++;
            } else {
                this.currentFrame = 0;
            }
        }
    }

    update() {
        this.draw()
        this.updateFrames()
    }
}

let background = new Sprite({ position: { x: 0, y: 0 }, source: './assets/background.png' })
let playerIcon = new Sprite({ position: { x: 10, y: 10 }, source: './assets/player/icon.png' })

let playerHealthBar = () => {

    let playerCD = player.specialInCooldown === true ? 0 : 200
    let playerHealth = player.health >= 0 ? Math.floor(player.health) : 0

    ctx.beginPath()
    playerIcon.update()
    playerUpgrades()
    playerUpgradeMenuButton()
    if (upgradeMenuOpen) playerUpgradeMenu()
    ctx.fillStyle = 'red';
    ctx.fillRect(88, 20, 200, 30);
    ctx.fillStyle = 'green';
    ctx.fillRect(88, 20, 200 * (playerHealth / playerMaxHealth), 30);
    ctx.rect(88, 20, 200, 30)
    ctx.fillStyle = 'rgba(201, 49, 0)'
    ctx.fillRect(88, 50, playerCD, 20);
    ctx.rect(88, 50, 200, 20)
    ctx.strokeStyle = "black";
    ctx.stroke()
    ctx.fillStyle = 'black'
    ctx.font = '25px MinimalPixel'
    ctx.textAlign = 'center'
    ctx.fillText(`${playerHealth}/${playerMaxHealth}`, 190, 50, 150)
    ctx.closePath()
}

let playerUpgrades = () => {
    let colors = ['darkred', 'green', 'blue'];

    let positions = [
        { x: 20, y: 110 },
        { x: 50, y: 110 },
        { x: 80, y: 110 }
    ];

    let upgradeValues = [
        strenghtStat,
        vitalityStat,
        specialStat
    ];

    ctx.font = '25px MinimalPixel';
    ctx.textAlign = 'center';
    for (let i = 0; i < 3; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillText(upgradeValues[i], positions[i].x, positions[i].y);
    };
}

let playerUpgradeMenuButton = () => {
    let color = isInsideButton(upgradeMenuButton) === true ? 'rgba(207, 107, 0)' : 'orange'

    ctx.beginPath()
    ctx.fillStyle = color
    ctx.fillRect(100, 80, 200, 30)
    ctx.rect(100, 80, 200, 30)
    ctx.stroke()
    ctx.font = '25px MinimalPixel'
    ctx.textAlign = 'center'
    ctx.fillStyle = 'black'
    ctx.fillText('Status', 200, 110, 300)
    if (statPoints > 0) {
        ctx.beginPath()
        ctx.fillStyle = 'red'
        ctx.rect(290, 50, 10, 40)
        ctx.rect(290, 95, 10, 10)
        ctx.fillRect(290, 50, 10, 40)
        ctx.fillRect(290, 95, 10, 10)
        ctx.stroke()
        ctx.closePath()
    }
    ctx.closePath()
}
let scrollImage = new Image()
scrollImage.src = './assets/player/scroll.png'
let playerUpgradeMenu = () => {
    ctx.beginPath()
    ctx.fillStyle = 'orange'
    ctx.drawImage(scrollImage, 260, 0, 750, 750)
    ctx.stroke()
    ctx.font = '50px MinimalPixel'
    ctx.textAlign = 'center'
    ctx.fillStyle = 'black'
    ctx.fillText('Status', 660, 180, 300)
    ctx.fillText('Poder', 570, 320, 300)
    ctx.fillText(strenghtStat, 780, 320, 300)
    ctx.fillText('+', 820, 320, 300)
    ctx.fillText('Vitalidade', 620, 400, 300)
    ctx.fillText(vitalityStat, 780, 400, 300)
    ctx.fillText('+', 820, 400, 300)
    ctx.fillText('Especial', 600, 480, 300)
    ctx.fillText(specialStat, 780, 480, 300)
    ctx.fillText('+', 820, 480, 300)
    ctx.fillText('Pontos disponiveis:', 600, 640, 300)
    ctx.fillText(statPoints, 780, 640, 300)
    ctx.closePath()
}

let bossBarValues = {
    x: 140,
    y: 150,
    width: 1000,
    height: 30
}

let BossHealthBar = () => {
    let bossHealth = boss.health >= 0 ? Math.floor(boss.health) : 0

    ctx.beginPath()
    ctx.fillStyle = 'gray';
    ctx.fillRect(bossBarValues.x, bossBarValues.y, bossBarValues.width, bossBarValues.height);
    ctx.fillStyle = boss.healthbarcolor;
    ctx.fillRect(bossBarValues.x, bossBarValues.y, 1000 * (bossHealth/boss.maxHealth), bossBarValues.height);
    ctx.rect(bossBarValues.x, bossBarValues.y, bossBarValues.width, bossBarValues.height)
    ctx.stroke()
    ctx.fillStyle = 'black'
    ctx.font = '30px MinimalPixel'
    ctx.textAlign = 'center'
    ctx.fillText(`${boss.name}`, 640, 140, 500)
    ctx.font = '25px MinimalPixel'
    ctx.fillText(`${bossHealth} / ${currentBossMaxHealth}`, 640, 180, 500)
    ctx.closePath()
}

let waveCounter = () => {
    let waves = currentWaves <= maxCurrentlyWaves ? currentWaves : maxCurrentlyWaves

    ctx.beginPath()
    ctx.fillStyle = 'gray';
    ctx.fillRect(bossBarValues.x, bossBarValues.y, bossBarValues.width, bossBarValues.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(bossBarValues.x, bossBarValues.y, minions.length * minionMultiplier, bossBarValues.height);
    ctx.rect(bossBarValues.x, bossBarValues.y, bossBarValues.width, bossBarValues.height)
    ctx.stroke()
    ctx.fillStyle = 'black'
    ctx.font = '30px MinimalPixel'
    ctx.textAlign = 'center'
    ctx.fillText(`Onda ${waves} / ${maxCurrentlyWaves}`, 640, 140, 500)
    ctx.font = '25px MinimalPixel'
    ctx.fillText(`${minions.length} / ${maxCurrentlyMinions}`, 640, 180, 500)
    ctx.closePath()
}