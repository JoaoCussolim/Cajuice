let floorHeightBoss = 560

class Boss extends Sprite{
    constructor({position = {x: 0, y: 0}, baseDirections = {first: '', second: ''}, specialNecessitation, healthbarcolor, source, attackCooldown, specialAttackCooldown, attackDamage, maxHealth, name, hitbox = {x: 0, y: 0, width: 0, height: 0}, attackbox = {x: 0, y: 0, width: 0, height: 0}, frameRate, frameBuffer, scale, animations}){
        super({source, frameRate, frameBuffer, scale})
        this.position = position
        this.velocity = {
            x: 0,
            y: 1
        }

        this.hitboxValues = hitbox
        this.healthbarcolor = healthbarcolor
        this.attackboxValues = attackbox
        this.attackDamage = attackDamage
        this.maxHealth = maxHealth
        this.health = this.maxHealth
        this.name = name
        this.alive = true
        this.hasSpecial = true

        this.hitbox = {
            position: {
                x: this.position.x - this.hitboxValues.x,
                y: this.position.y - this.hitboxValues.y
            },
            width: this.hitboxValues.width,
            height: this.hitboxValues.height
        }

        this.animations = animations
        
        for(let anim in this.animations){
            let image = new Image()
            image.src = this.animations[anim].source

            this.animations[anim].image = image
        }

        this.attackbox = {
            position: {
                x: this.position.x - this.attackboxValues.x,
                y: this.position.y - this.attackboxValues.y
            },
            width: this.attackboxValues.width,
            height: this.attackboxValues.height
        }

        this.normalAttacks = 0
        this.attackCooldown = attackCooldown
        this.specialAttackCooldown = specialAttackCooldown

        this.baseDirections = baseDirections

        this.onGround
        this.attacking
        this.direction
        this.takingDamage
        this.invulnerability
        this.specialNecessitation = specialNecessitation
    }

    collision(damage){
        if(this.attackbox.position.x + this.attackbox.width >= player.hitbox.position.x && this.attackbox.position.x <= player.hitbox.position.x + player.hitbox.width && this.attackbox.position.y + this.attackbox.height >= player.hitbox.position.y && this.attackbox.position.y <= player.hitbox.position.y + player.hitbox.height && player.health > 0 && !player.invulnerability && this.alive && !upgradeMenuOpen){
        player.health -= damage
        player.takingDamage = true
        player.receivingDamage()
        }
    }

    receivingDamage(){
        if(this.takingDamage && !this.attacking){
            this.currentFrame = 0
            setTimeout(() => {
                this.takingDamage = false
            }, 500);
        } else if(this.takingDamage) this.takingDamage = false
    }

    death(){
        if(this.alive){
            this.alive = false
            this.currentFrame = 0
            setTimeout(() => {
                this.health = null
            }, 2900);
        }
    }

    attack(){
        if(!this.attacking){
            this.attacking = 'Normal'
            this.currentFrame = 0
            this.normalAttacks++

            setTimeout(() => {
                this.collision(this.attackDamage)
            }, this.attackCooldown/1.4);

            setTimeout(() => {
                this.attacking = false
            }, this.attackCooldown);
        }
    }

    specialAttack(){
        if(!this.attacking){
            this.attacking = 'Special'
            this.currentFrame = 0

            setTimeout(() => {
                this.collision(this.attackDamage * 2)
            }, this.specialAttackCooldown/1.4);

            setTimeout(() => {
                this.attacking = false
                this.normalAttacks = 0
            }, this.specialAttackCooldown);
        }
    }

    updateHitbox(){
        this.hitbox = {
            position: {
                x: this.position.x - this.hitboxValues.x,
                y: this.position.y - this.hitboxValues.y
            },
            width: this.hitboxValues.width,
            height: this.hitboxValues.height
        }
    }

    updateAttackbox(){
        let xScale = this.direction === this.baseDirections.second ? -1 : 1
        
        this.attackbox = {
            position: {
                x: this.position.x + (-this.attackboxValues.x + this.attackboxValues.x * xScale),
                y: this.position.y - this.attackboxValues.y
            },
            width: this.attackboxValues.width,
            height: this.attackboxValues.height
        }
    }

    switchSprite(anim){
        if(this.image === this.animations[anim].image || !this.loaded) return
        this.image = this.animations[anim].image
        this.frameBuffer = this.animations[anim].frameBuffer
        this.frameRate = this.animations[anim].frameRate
    }

    applyGravity(){
        this.velocity.y += gravity
        this.position.y += this.velocity.y
    }

    draw() {
        let xScale = this.direction === 'Left' ? -1 : 1
    
        if (!this.image) return;
        let cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        }
    
        ctx.save()
    
        ctx.translate(this.position.x, this.position.y - 380)
        ctx.scale(xScale, 1)
    
        ctx.drawImage(this.image, cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, -this.width / 2, 0, this.width, this.height)
    
        ctx.restore()

    }
    

    update(){

        this.updateFrames()
        this.updateAttackbox()
        this.updateHitbox()
        this.position.x += this.velocity.x

        //ctx.fillStyle = 'black'
        //ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

        //ctx.fillStyle = 'orange'
        //ctx.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.width, this.attackbox.height)

        this.draw()
    }
}

class RangedBoss extends Boss{
    constructor({position = {x: 0, y: 0}, projectile = { position: {x: 0, y: 0}, source: 0, frameRate: 0, frameBuffer: 0, scale: 0, hitboxValues: { x: 0, y: 0, width: 0, height: 0}, damage: 0, cooldown: 0}, baseDirections = {first: '', second: ''}, specialNecessitation, healthbarcolor, source, attackCooldown, specialAttackCooldown, attackDamage, maxHealth, name, hitbox = {x: 0, y: 0, width: 0, height: 0}, attackbox = {x: 0, y: 0, width: 0, height: 0}, frameRate, frameBuffer, scale, animations}){
        super({position, baseDirections, healthbarcolor, source, attackCooldown, specialAttackCooldown, attackDamage, maxHealth, name, hitbox, attackbox, frameRate, frameBuffer, scale, animations, specialNecessitation})
        this.projectile = projectile
        this.hasRanged = true
        this.hasSpecial = false
    }
    specialAttack(){
        if(!this.attacking){
            this.attacking = 'Ranged'
            this.currentFrame = 0
            this.normalAttacks = 0
            if(projectiles.length <= 0) projectiles.push(new Projectile({position: {x: player.hitbox.position.x - this.projectile.position.x, y: player.hitbox.position.y - this.projectile.position.y}, source: this.projectile.source, frameRate: this.projectile.frameRate, frameBuffer: this.projectile.frameBuffer, scale: this.projectile.scale, hitboxValues: this.projectile.hitboxValues, damage: this.projectile.damage, cooldown: this.projectile.cooldown}))

            setTimeout(() => {
                this.attacking = false
            }, this.specialAttackCooldown);
        }
    }
}

class Necromancer extends Boss{
    constructor({position = {x: 0, y: 0}, baseDirections = {first: '', second: ''}, specialNecessitation, healthbarcolor, source, attackCooldown, specialAttackCooldown, attackDamage, maxHealth, name, hitbox = {x: 0, y: 0, width: 0, height: 0}, attackbox = {x: 0, y: 0, width: 0, height: 0}, frameRate, frameBuffer, scale, animations}){
        super({position, baseDirections, healthbarcolor, source, attackCooldown, specialAttackCooldown, attackDamage, maxHealth, name, hitbox, attackbox, frameRate, frameBuffer, scale, animations, specialNecessitation})
    }
    
    specialAttack(){
        if(!this.attacking){
            this.attacking = 'Special'
            this.currentFrame = 0

            setTimeout(() => {
                this.health += 50 + (10 * vitalityStat)
                if(this.health > this.maxHealth) this.health = this.maxHealth
            }, this.specialAttackCooldown/1.4);

            setTimeout(() => {
                this.attacking = false
                this.normalAttacks = 0
            }, this.specialAttackCooldown);
        }
    }

    death(){
        if(this.alive){
            this.alive = false
            this.currentFrame = 0
            setTimeout(() => {
                this.health = null
            }, 1000);
        }
    }
}

class BringerOfDeath extends RangedBoss{
    constructor({position = {x: 0, y: 0}, projectile = { position: {x: 0, y: 0}, source: 0, frameRate: 0, frameBuffer: 0, scale: 0, hitboxValues: { x: 0, y: 0, width: 0, height: 0}, damage: 0, cooldown: 0}, baseDirections = {first: '', second: ''}, specialNecessitation, healthbarcolor, source, attackCooldown, specialAttackCooldown, attackDamage, maxHealth, name, hitbox = {x: 0, y: 0, width: 0, height: 0}, attackbox = {x: 0, y: 0, width: 0, height: 0}, frameRate, frameBuffer, scale, animations}){
        super({position, projectile, baseDirections, healthbarcolor, source, attackCooldown, specialAttackCooldown, attackDamage, maxHealth, name, hitbox, attackbox, frameRate, frameBuffer, scale, animations, specialNecessitation})
    }
    death(){
        if(this.alive){
            this.alive = false
            this.currentFrame = 0
            setTimeout(() => {
                this.health = null
            }, 700);
        }
    }
}

class MechaGolem extends RangedBoss{
    constructor({position = {x: 0, y: 0}, projectile = { position: {x: 0, y: 0}, source: 0, frameRate: 0, frameBuffer: 0, scale: 0, hitboxValues: { x: 0, y: 0, width: 0, height: 0}, damage: 0, cooldown: 0}, baseDirections = {first: '', second: ''}, specialNecessitation, healthbarcolor, source, attackCooldown, specialAttackCooldown, attackDamage, maxHealth, name, hitbox = {x: 0, y: 0, width: 0, height: 0}, attackbox = {x: 0, y: 0, width: 0, height: 0}, frameRate, frameBuffer, scale, animations}){
        super({position, projectile, baseDirections, healthbarcolor, source, attackCooldown, specialAttackCooldown, attackDamage, maxHealth, name, hitbox, attackbox, frameRate, frameBuffer, scale, animations, specialNecessitation})
        this.aim = true
    }
    death(){
        if(this.alive){
            this.alive = false
            this.currentFrame = 0
            setTimeout(() => {
                this.health = null
            }, 2000);
        }
    }
    specialAttack(){
        if(!this.attacking){
            this.attacking = 'Ranged'
            this.currentFrame = 0
            this.normalAttacks = 0
            if(projectiles.length <= 0) projectiles.push(new Projectile({position: {x: this.hitbox.position.x - this.projectile.position.x, y: this.hitbox.position.y - this.projectile.position.y}, source: this.projectile.source, frameRate: this.projectile.frameRate, frameBuffer: this.projectile.frameBuffer, scale: this.projectile.scale, hitboxValues: this.projectile.hitboxValues, damage: this.projectile.damage, cooldown: this.projectile.cooldown}))

            setTimeout(() => {
                this.attacking = false
            }, this.specialAttackCooldown);
        }
    }
}

let nightborne = new Boss({position: {x: 1000, y: 755}, baseDirections: {first: 'Right', second: 'Left'}, specialNecessitation: 5, healthbarcolor: 'purple', 
source: "./assets/nightborne/idleset.png", attackCooldown: 1500, specialAttackCooldown: 720, attackDamage: 10, maxHealth: 200, name: 'Blair, A Sombra', hitbox: {x: 30, y: 180, width: 90, height: 120}, attackbox: {x: 50, y: 200, width: 110, height: 150}, frameRate: 9, frameBuffer: 7, scale: 4, animations: {
    Idle: {
        source: "./assets/nightborne/idleset.png",
        frameRate: 9,
        frameBuffer: 7,
        image: new Image()
    },
    Run: {
        source: "./assets/nightborne/runset.png",
        frameRate: 6,
        frameBuffer: 8,
        image: new Image()
    },
    Attack: {
        source: "./assets/nightborne/attackset.png",
        frameRate: 12,
        frameBuffer: 12,
        image: new Image()
    },
    SpecialAttack: {
        source: "./assets/nightborne/spattackset.png",
        frameRate: 9,
        frameBuffer: 8,
        image: new Image()
    },
    TakingDamage: {
        source: "./assets/nightborne/takingdamageset.png",
        frameRate: 5,
        frameBuffer: 6,
        image: new Image()
    },
    Death: {
        source: "./assets/nightborne/deathset.png",
        frameRate: 23,
        frameBuffer: 12,
        image: new Image()
    }
}})

let demonslime = new Boss({position: {x: 1000, y: 590}, baseDirections: {first: 'Left', second: 'Right'}, specialNecessitation: 3, healthbarcolor: 'rgba(189, 72, 1)', 
source: "./assets/demonslime/idleset.png", attackCooldown: 2200, specialAttackCooldown: 2200, attackDamage: 30, maxHealth: 300, name: 'Agni, O Demonio', hitbox: {x: 120, y: 160, width: 200, height: 280}, attackbox: {x: 160, y: 60, width: 300, height: 150}, frameRate: 6, frameBuffer: 6, scale: 3, animations: {
    Idle: {
        source: "./assets/demonslime/idleset.png",
        frameRate: 6,
        frameBuffer: 6,
        image: new Image()
    },
    Run: {
        source: "./assets/demonslime/runset.png",
        frameRate: 12,
        frameBuffer: 12,
        image: new Image()
    },
    Attack: {
        source: "./assets/demonslime/attackset.png",
        frameRate: 15,
        frameBuffer: 12,
        image: new Image()
    },
    SpecialAttack: {
        source: "./assets/demonslime/spattackset.png",
        frameRate: 15,
        frameBuffer: 12,
        image: new Image()
    },
    TakingDamage: {
        source: "./assets/demonslime/takingdamageset.png",
        frameRate: 5,
        frameBuffer: 10,
        image: new Image()
    },
    Death: {
        source: "./assets/demonslime/deathset.png",
        frameRate: 22,
        frameBuffer: 13,
        image: new Image()
    }
}})

let necromancer = new Necromancer({position: {x: 1000, y: 720}, baseDirections: {first: 'Right', second: 'Left'}, specialNecessitation: 8, healthbarcolor: 'darkred', 
source: "./assets/necromancer/idleset.png", attackCooldown: 1800, specialAttackCooldown: 2200, attackDamage: 20, maxHealth: 80, name: 'Laugan, O Mago', hitbox: {x: 50, y: 180, width: 120, height: 140}, attackbox: {x: 200, y: 170, width: 400, height: 150}, frameRate: 8, frameBuffer: 8, scale: 3, animations: {
    Idle: {
        source: "./assets/necromancer/idleset.png",
        frameRate: 8,
        frameBuffer: 8,
        image: new Image()
    },
    Run: {
        source: "./assets/necromancer/runset.png",
        frameRate: 8,
        frameBuffer: 8,
        image: new Image()
    },
    Attack: {
        source: "./assets/necromancer/attackset.png",
        frameRate: 13,
        frameBuffer: 13,
        image: new Image()
    },
    SpecialAttack: {
        source: "./assets/necromancer/spattackset.png",
        frameRate: 17,
        frameBuffer: 12,
        image: new Image()
    },
    TakingDamage: {
        source: "./assets/necromancer/takingdamageset.png",
        frameRate: 5,
        frameBuffer: 10,
        image: new Image()
    },
    Death: {
        source: "./assets/necromancer/deathset.png",
        frameRate: 9,
        frameBuffer: 12,
        image: new Image()
    }
}})

let bringerofdeath = new BringerOfDeath({position: {x: 1000, y: 860}, projectile: {position: {x: 150, y: 150}, source: "./assets/bringerofdeath/magicset.png", frameRate: 16, frameBuffer: 16, scale: 3, hitboxValues: {x: -150, y: -100, width: 100, height: 200}, damage: 30, cooldown: 2500}, baseDirections: {first: 'Left', second: 'Right'}, specialNecessitation: 4, healthbarcolor: 'rgba(144, 94, 169)', 
source: "./assets/bringerofdeath/idleset.png", attackCooldown: 800, specialAttackCooldown: 800, attackDamage: 40, maxHealth: 100, name: 'Dimitri, O Ceifeiro', hitbox: {x: -20, y: 320, width: 160, height: 160}, attackbox: {x: 20, y: 300, width: 100, height: 150}, frameRate: 8, frameBuffer: 8, scale: 3, animations: {
    Idle: {
        source: "./assets/bringerofdeath/idleset.png",
        frameRate: 8,
        frameBuffer: 8,
        image: new Image()
    },
    Run: {
        source: "./assets/bringerofdeath/runset.png",
        frameRate: 8,
        frameBuffer: 8,
        image: new Image()
    },
    Attack: {
        source: "./assets/bringerofdeath/attackset.png",
        frameRate: 8,
        frameBuffer: 9,
        image: new Image()
    },
    SpecialAttack: {
        source: "./assets/bringerofdeath/spattackset.png",
        frameRate: 8,
        frameBuffer: 8,
        image: new Image()
    },
    TakingDamage: {
        source: "./assets/bringerofdeath/takingdamageset.png",
        frameRate: 3,
        frameBuffer: 10,
        image: new Image()
    },
    Death: {
        source: "./assets/bringerofdeath/deathset.png",
        frameRate: 7,
        frameBuffer: 10,
        image: new Image()
    }
}})

let boss = necromancer

let currentBoss = 0
let bosses = [necromancer, demonslime, nightborne, bringerofdeath]
let maxBosses = 3
let currentBossMaxHealth = boss.maxHealth
let bossMultiplier = 1000/currentBossMaxHealth // Precisa cumprir um valor de 1000, no caso inicial, 200 x 5 = 1000

let updateBoss = () => {
    boss.death()
    if (boss.health == null){
        bosses.splice(0, 1)
        if(bosses[0]){
            boss = bosses[0]
            currentBossMaxHealth = boss.maxHealth
            bossMultiplier = 1000/currentBossMaxHealth
            bossfight = false
            inWaves = true
            statPoints += 3
        }
        else{
            boss = null
            document.querySelector('#Won').style.display = 'flex'
        }
    }
}

let buffBoss = () => {
    let bossDamage = boss.damage
    boss.maxHealth = currentBossMaxHealth + (20 * (strenghtStat + specialStat) )
    boss.health = currentBossMaxHealth + (20 * (strenghtStat + specialStat))
    currentBossMaxHealth = boss.maxHealth
    boss.damage = bossDamage + (5 * vitalityStat)
}

let bossActions = () => {
    boss.velocity.x = 0

    if(boss.attackbox.position.x + boss.attackbox.width >= player.hitbox.position.x && boss.attackbox.position.x <= player.hitbox.position.x + player.hitbox.width && boss.attackbox.position.y + boss.attackbox.height >= player.hitbox.position.y && boss.attackbox.position.y <= player.hitbox.position.y + player.hitbox.height && boss.normalAttacks < boss.specialNecessitation && !boss.attacking && !boss.takingDamage && boss.alive && player.alive && !upgradeMenuOpen){
        boss.attack()
        boss.switchSprite('Attack')
    }

    else if(boss.hasSpecial && boss.attackbox.position.x + boss.attackbox.width >= player.hitbox.position.x && boss.attackbox.position.x <= player.hitbox.position.x + player.hitbox.width && boss.attackbox.position.y + boss.attackbox.height >= player.hitbox.position.y && boss.attackbox.position.y <= player.hitbox.position.y + player.hitbox.height && boss.normalAttacks >= boss.specialNecessitation && !boss.attacking && !boss.takingDamage && boss.alive && player.alive && !upgradeMenuOpen){
        boss.specialAttack()
        boss.switchSprite('SpecialAttack')
    }

    else if(boss.hasRanged && boss.normalAttacks >= boss.specialNecessitation && !boss.attacking && !boss.takingDamage && boss.alive && player.alive && !upgradeMenuOpen){
        boss.specialAttack()
        boss.switchSprite('SpecialAttack')
    }

    if(boss.position.x < player.position.x && !boss.attacking && !boss.takingDamage && boss.alive && player.alive && !upgradeMenuOpen){
        boss.switchSprite('Run')
        boss.velocity.x = 1 * bossMultiplier
        boss.direction = boss.baseDirections.first
    }
    else if(boss.position.x > player.position.x && !boss.attacking && !boss.takingDamage && boss.alive && player.alive && !upgradeMenuOpen){
        boss.switchSprite('Run')
        boss.velocity.x = -1 * bossMultiplier
        boss.direction = boss.baseDirections.second
    }

    else if((boss.velocity.y === 0  && !boss.attacking && boss.alive) || upgradeMenuOpen){
        boss.switchSprite('Idle')
    }

    else if(boss.takingDamage && boss.alive && !boss.attacking && !upgradeMenuOpen){
        boss.switchSprite('TakingDamage')
    }
    else if(!boss.alive){
        boss.switchSprite('Death')
    }
}