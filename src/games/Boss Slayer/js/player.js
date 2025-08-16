class Player extends Sprite{
    constructor({position = {x: 0, y: 0}, source, frameRate, frameBuffer, scale, animations}){
        super({source, frameRate, frameBuffer, scale})
        this.position = position

        this.velocity = {
            x: 0,
            y: 1
        }

        this.dimensions = {
            width: 1000,
            height: 500
        }

        this.hitbox = {
            position: {
                x: this.position.x - 30,
                y: this.position.y - 180
            },
            width: 70,
            height: 120
        }

        this.attackDamage = 10 + 5 * strenghtStat
        this.health = playerMaxHealth + 20 * vitalityStat
        this.alive = true

        this.animations = animations
        
        for(let anim in this.animations){
            let image = new Image()
            image.src = this.animations[anim].source

            this.animations[anim].image = image
        }

        this.baseDirections = {first: "Right", second: "Left"}

        this.camerabox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 800,
            height: 320
        }

        this.attackbox = {
            position: {
                x: this.position.x - 30,
                y: this.position.y - 180
            },
            width: 100,
            height: 50
        }

        this.onGround
        this.rolling
        this.attacking
        this.specialInCooldown
        this.takingDamage
        this.direction
        this.died
        this.invulnerability
    }

    jump(){
        if(!this.onGround || this.rolling) return
        this.velocity.y -= 20
    }

    roll(){
        let xScale = this.direction === this.baseDirections.second ? -1 : 1
        
        if(bossfight || inWaves){ 
        this.rolling = true
        this.invulnerability = true
        rolled = false
        this.velocity.x = 4 * xScale
        this.currentFrame = 0
        setTimeout(() => {
            this.rolling = false
            this.velocity.x = 0
            this.invulnerability = false
        }, 790);
        setTimeout(() => {
            rolled = true
        }, 1200);
        }
    }

    collision(damage){
        if(target && this.attackbox.position.x + this.attackbox.width >= target.hitbox.position.x && this.attackbox.position.x <= target.hitbox.position.x + target.hitbox.width && this.attackbox.position.y + this.attackbox.height >= target.hitbox.position.y && this.attackbox.position.y <= target.hitbox.position.y + target.hitbox.height && target.health > 0 && !target.invulnerability){
        target.health -= damage
        target.takingDamage = true
        target.receivingDamage()
        }
    }

    multiCollision(damage){
        if(multiTarget && this.attackbox.position.x + this.attackbox.width >= target.hitbox.position.x && this.attackbox.position.x <= target.hitbox.position.x + target.hitbox.width && this.attackbox.position.y + this.attackbox.height >= target.hitbox.position.y && this.attackbox.position.y <= target.hitbox.position.y + target.hitbox.height && target.health > 0 && !target.invulnerability){
            for(let i = multiTarget.length - 1; i >= 0; i--){
                target = multiTarget[i]
                target.health -= damage
                target.takingDamage = true
                target.receivingDamage()
            }
        }
    }

    updateAtributes(){
        this.attackDamage = 10 + 10 * strenghtStat
        let previousHealth = this.health - 20 * vitalityStat
        if(this.health === playerMaxHealth) this.health = 100 + 20 * vitalityStat
        else this.health = previousHealth + 20 * vitalityStat
        playerMaxHealth = 100 + 20 * vitalityStat
    }

    baseRegen(){
        if(this.health < playerMaxHealth && !upgradeMenuOpen && this.alive) this.health += 0.005 + 0.002 * vitalityStat
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
            this.velocity.x = 0
            this.velocity.y = 0
            this.alive = false
            this.currentFrame = 0
            this.scale = 2
            this.position.y += 65 // gambiarra, um dia eu melhoro
            this.width = (this.image.width / this.frameRate) * this.scale
            this.height = this.image.height * this.scale
            setTimeout(() => {
                this.died = true
            }, 1500);
        }
    }

    attack(){
        if(!this.attacking){
            this.attacking = 'Normal'
            this.currentFrame = 0
            
            setTimeout(() => {
                this.collision(this.attackDamage)
            }, 858);

            setTimeout(() => {
                this.attacking = false
            }, 1200);
        }
    }

    SpecialAttack(){
        if(!this.attacking && !this.specialInCooldown){
            this.attacking = 'Special'
            this.currentFrame = 0
            this.specialInCooldown = true
            this.invulnerability = true

            setTimeout(() => {
                this.multiCollision(this.attackDamage * 2 + 0.5 * specialStat)
            }, 1785);

            setTimeout(() => {
                this.attacking = false
                this.invulnerability = false
            }, 2500);
            setTimeout(() => {
                this.specialInCooldown = false
            }, playerSpecialCooldown);
        }
    }

    updateHitbox(){
        this.hitbox = {
            position: {
                x: this.position.x - 30,
                y: this.position.y - 180
            },
            width: 70,
            height: 120
        }
    }

    updateAttackbox(){
        let xScale = this.direction === this.baseDirections.second ? -1 : 1
        
        this.attackbox = {
            position: {
                x: this.position.x + (-82 + 82 * xScale),
                y: this.position.y - 150
            },
            width: 165,
            height: 50
        }
    }

    updateCamerabox(){
        this.camerabox = {
            position: {
                x: this.position.x - 545,
                y: this.position.y
            },
            width: 800,
            height: 320
        }
    }

    shouldPanCameraToTheLeft(){
        let cameraBoxRightSide = this.camerabox.position.x + this.camerabox.width
        let scaledDownCanvasWidth = canvas.width / 4

        if(cameraBoxRightSide >= 1280 || bossfight || inWaves) return

        if(camera.position.x + 760 <= 200){
            inWaves = true
            bossfightSpeed = 5
        }

        if(cameraBoxRightSide >= scaledDownCanvasWidth + Math.abs(camera.position.x)){
            camera.position.x -= this.velocity.x
        }
    }

    shouldPanCameraToTheRight(){
        let cameraBoxRightSide = this.camerabox.position.x + this.camerabox.width

        if(cameraBoxRightSide <= 0 || bossfight || inWaves) return

        if(this.camerabox.position.x <= Math.abs(camera.position.x)){
            camera.position.x -= this.velocity.x
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
        let xScale = this.direction === 'Left' ? -1 : 1;
    
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
        if(Math.ceil(this.position.y + this.dimensions.height >= canvas.height + floorHeight)){
            this.onGround = true
        }else{
            this.onGround = false
        }

        if(this.position.y + this.dimensions.height + this.velocity.y < canvas.height + floorHeight){
            this.applyGravity()
        }else {this.velocity.y = 0}

        this.updateFrames()
        this.updateAttackbox()
        this.updateCamerabox()
        this.updateHitbox()
        this.baseRegen()
        if(bossfight || inWaves){
            this.position.x += this.velocity.x
        }

        //ctx.fillStyle = 'red'
        //ctx.fillRect(this.camerabox.position.x, this.camerabox.position.y, this.camerabox.width, this.camerabox.height)

        //ctx.fillStyle = 'black'
        //ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

        //ctx.fillStyle = 'orange'
        //ctx.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.width, this.attackbox.height)

        this.draw()
    }
}

let playerMaxHealth = 100
let playerSpecialCooldown = 10000

let player = new Player({position: {x: 625, y: 0}, source: "./assets/fire_knight/idleset.png", frameRate: 8, frameBuffer: 5, scale: 2.5, animations: {
    Idle: {
        source: "./assets/fire_knight/idleset.png",
        frameRate: 8,
        frameBuffer: 6,
        image: new Image()
    },
    Run: {
        source: "./assets/fire_knight/runset.png",
        frameRate: 8,
        frameBuffer: 6,
        image: new Image()
    },
    Jump: {
        source: "./assets/fire_knight/jumpupset.png",
        frameRate: 3,
        frameBuffer: 2,
        image: new Image()
    },
    Fall: {
        source: "./assets/fire_knight/jumpdownset.png",
        frameRate: 3,
        frameBuffer: 2,
        image: new Image()
    },
    Roll: {
        source: "./assets/fire_knight/rollset.png",
        frameRate: 8,
        frameBuffer: 10,
        image: new Image()
    },
    Attack: {
        source: "./assets/fire_knight/attackset.png",
        frameRate: 11,
        frameBuffer: 11,
        image: new Image()
    },
    SpecialAttack: {
        source: "./assets/fire_knight/spattackset.png",
        frameRate: 18,
        frameBuffer: 14,
        image: new Image()
    },
    TakingDamage: {
        source: "./assets/fire_knight/takingdamageset.png",
        frameRate: 6,
        frameBuffer: 9,
        image: new Image()
    },
    Death: {
        source: "./assets/fire_knight/deathset.png",
        frameRate: 13,
        frameBuffer: 13,
        image: new Image()
    },
}})

let playerActions = () => {
        if(!player.rolling || !(player.rolling && player.position.x + 30 < canvas.width && player.position.x - 30 > 0)) player.velocity.x = 0

        if(player.rolling){
            player.switchSprite('Roll')
        }

        if(player.attacking === 'Normal'){
            player.switchSprite('Attack')
        }
        else if(player.attacking === 'Special'){
            player.switchSprite('SpecialAttack')
        }

        if(keys.d.pressed && player.position.x + 35 < canvas.width && !player.rolling && !player.attacking && !player.takingDamage){
            player.switchSprite('Run')
            if(player.alive) player.velocity.x = 1 * bossfightSpeed
            player.direction = player.baseDirections.first
            player.shouldPanCameraToTheLeft()
        }
        else if(keys.a.pressed && player.position.x - 35 > 0 && !player.rolling && !player.attacking && !player.takingDamage){
            player.switchSprite('Run')
            if(player.alive) player.velocity.x = -1 * bossfightSpeed
            player.direction = player.baseDirections.second
            player.shouldPanCameraToTheRight()
        }
        else if(player.velocity.y === 0  && !player.rolling && !player.attacking && !player.takingDamage && player.alive){
            player.switchSprite('Idle')
        }
        
        if(player.velocity.y < 0 && player.onGround && !player.attacking && !player.takingDamage){
            player.switchSprite('Jump')
        } 
        else if(player.velocity.y > 0 && !player.attacking && !player.takingDamage){
            player.switchSprite('Fall')
        }

        if(player.takingDamage && !player.attacking && player.alive){
            player.switchSprite('TakingDamage')
        }
        else if(!player.alive && !player.died){
            player.switchSprite('Death')
        }
}