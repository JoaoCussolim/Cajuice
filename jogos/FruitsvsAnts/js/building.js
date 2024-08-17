class Projectile {
    constructor(position = {x: 0, y: 0}, enemy, damage, type){
        this.position = position
        this.velocity = {
            x: 0,
            y: 0
        }
        this.enemy = enemy
        this.radius = 10
        this.speed = 5
        this.damage = damage
        this.type = type
        this.image = new Image()
        if(this.type === 0) this.image.src = "./assets/buildings/grapeProjectile.png"
        else if(this.type === 5) this.image.src = "./assets/buildings/greengrapeProjectile.png"
        else this.image.src = "./assets/buildings/none.png"
    }

    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y - 20, 60, 30)
    }

    update(){
        if(this.enemy){
        this.draw()}

        let angle = Math.atan2(this.enemy.center.y - this.position.y, this.enemy.center.x - this.position.x)

        this.velocity.x = Math.cos(angle) * this.speed 
        this.velocity.y = Math.sin(angle) * this.speed

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Building extends animatedSprite {
    constructor({position = {x: 0, y:0}, imagePosition = {x: 0, y:0}, price, projectileCooldown, projectileDamage, source, frameRate = 1, frameBuffer = 3, scale = 1, animations}){
        super({ position, source, frameRate, frameBuffer, scale, animations})
        this.position = position
        this.size = 64
        this.center = {
            x: this.position.x + this.size/2,
            y: this.position.y + this.size/2
        }
        this.projectiles = []
        this.target
        this.frames = 1
        this.price = price
        this.projectileCooldown = projectileCooldown
        this.projectileDamage = projectileDamage
        this.hp = 100
        this.imagePosition = imagePosition
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

        ctx.drawImage(this.image, cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, this.imagePosition.x, this.imagePosition.y, this.width, this.height)
    }
}

class Shooter extends Building{
    constructor({position = {x: 0, y:0}, imagePosition = {x: 0, y:0}, price, projectileCooldown, projectileDamage, source, frameRate = 1, frameBuffer = 3, scale = 1, animations}){
        super({price, imagePosition, projectileCooldown, projectileDamage, position, source, frameRate, frameBuffer, scale, animations})
        this.type = 0
    }

    update(){
        this.draw()
        this.updateFrames()
        if(this.frames % this.projectileCooldown === 0 && this.target){
        this.projectiles.push(new Projectile(position = {x: this.center.x, y: this.center.y}, this.target, this.projectileDamage, 0))
    }
        this.frames++
    }
}

class TripleShooter extends Building{
    constructor({position = {x: 0, y:0}, imagePosition = {x: 0, y:0}, price, projectileCooldown, projectileDamage, source, frameRate = 1, frameBuffer = 3, scale = 1, animations}){
        super({price, imagePosition, projectileCooldown, projectileDamage, position, source, frameRate, frameBuffer, scale, animations})
        this.tripleShooter = true
        this.type = 5
        this.secondPosition = {
            x: position.x,
            y: position.y+65
        }
        this.thirdPosition = {
            x: position.x,
            y: position.y-65
        }
        this.secondCenter = {
            x: this.secondPosition.x + this.size/2,
            y: this.secondPosition.y + this.size/2
        }
        this.thirdCenter = {
            x: this.thirdPosition.x + this.size/2,
            y: this.thirdPosition.y + this.size/2
        }
        this.secondTarget
        this.secondTargetOption = {
            center: {
                x: 1320,
                y: this.secondPosition.y + 25
            }
        }
        this.thirdTarget
        this.thirdTargetOption = {
            center: {
                x: 1320,
                y: this.thirdPosition.y + 25
            }
        }
        this.firstTargetOption = {
            center: {
                x: 1320,
                y: this.position.y + 25
            }
        }
    }

    update(){
        this.draw()
        this.updateFrames()
        if(this.frames % this.projectileCooldown === 0 && (this.target || this.secondTarget || this.thirdTarget)){
        this.projectiles.push(new Projectile(position = {x: this.center.x, y: this.center.y}, this.target || this.firstTargetOption, this.projectileDamage, 5))
        if(this.position.y < 500)
        this.projectiles.push(new Projectile(position = {x: this.secondCenter.x, y: this.secondCenter.y}, this.secondTarget || this.secondTargetOption, this.projectileDamage, 5))
        if(this.position.y > 200){
        this.projectiles.push(new Projectile(position = {x: this.thirdCenter.x, y: this.thirdCenter.y}, this.thirdTarget || this.thirdTargetOption, this.projectileDamage, 5))}
    }
        this.frames++
    }
}

class Farmer extends Building{
    constructor(position = {x: 0, y:0}, price, color, projectileCooldown, projectileDamage){
        super(position, price, color, projectileCooldown, projectileDamage)
        this.frames = this.projectileCooldown - 100
    }
    update(){
        this.draw()
        if(this.frames % this.projectileCooldown === 0){
        seedsOnGround.push(new BagOfSeeds({x: this.center.x, y: this.center.y},{width: 50, height: 50}, {x: this.center.x, y: this.center.y}))
        }
        this.frames++
    }
}

class Tank extends Building{
    constructor({position = {x: 0, y:0}, imagePosition = {x: 0, y:0}, price, projectileCooldown, projectileDamage, source, frameRate = 1, frameBuffer = 3, scale = 1, animations}){
        super({price, imagePosition, projectileCooldown, projectileDamage, position, source, frameRate, frameBuffer, scale, animations})
        this.hp = 500
        this.type = 2
    }
}

class Fighter extends Building{
    constructor({position = {x: 0, y:0}, imagePosition = {x: 0, y:0}, price, projectileCooldown, projectileDamage, source, frameRate = 1, frameBuffer = 3, scale = 1, animations}){
        super({price, imagePosition, projectileCooldown, projectileDamage, position, source, frameRate, frameBuffer, scale, animations})
        this.validTarget = false
        this.type = 4
    }

    checkTarget(){
        if(this.target.position.x + 128 > this.position.x && this.target.position.x - 128 < this.position.x && this.target.position.y + 30 > this.position.y && this.target.position.y - 30 < this.position.y){
            this.validTarget = true
        }else{
            this.validTarget = false
        }
    }

    update(){
        this.draw()
        this.updateFrames()
        if(this.target) this.checkTarget()
        if(this.frames % this.projectileCooldown === 0 && this.validTarget && this.target) this.projectiles.push(new Projectile(position = {x: this.target.center.x, y: this.target.center.y}, this.target, this.projectileDamage))
        this.frames++
    }
}

class Bomb extends Building{
    constructor({position = {x: 0, y:0}, imagePosition = {x: 0, y:0}, price, projectileCooldown, projectileDamage, source, frameRate = 1, frameBuffer = 3, scale = 1, animations}){
        super({price, imagePosition, projectileCooldown, projectileDamage, position, source, frameRate, frameBuffer, scale, animations})
        this.ready = false
        this.type = 3
    }

    explode(){
        if(this.target.position.x + 50 > this.position.x && this.target.position.x - 50 < this.position.x && this.target.position.y + 50 > this.position.y && this.target.position.y - 50 < this.position.y){
            this.projectiles.push(new Projectile(position = {x: this.target.center.x, y: this.target.center.y}, this.target, this.projectileDamage))
            this.hp -= 100
        }
    }

    getReady(){
        if(this.frames % this.projectileCooldown === 0){
            this.ready = true
        }
        this.frames++
    }

    update(){
        this.draw()
        if(!this.ready){
        this.getReady()}
        if(this.ready && this.target){
        this.explode()}
    }
}

let buildings = []

let activeTile = undefined