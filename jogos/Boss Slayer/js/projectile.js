class Projectile extends Sprite{
    constructor({position = {x: 0, y: 0}, source, frameRate = 1, frameBuffer = 3, scale = 1, hitboxValues = {x: 0, y: 0, width: 0, height: 0}, damage, cooldown}){
        super({position, source, frameRate, frameBuffer, scale})
        this.hitboxValues = hitboxValues
        this.hitbox = {
            position: {
                x: this.position.x - this.hitboxValues.x,
                y: this.position.y - this.hitboxValues.y
            },
            width: this.hitboxValues.width,
            height: this.hitboxValues.height
        }
        this.damage = damage
        this.cooldown = cooldown
        this.shouldBeRemoved = true
        this.shouldDoDamage = false
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

    projectileRemove(){
            this.shouldBeRemoved = false
            this.shouldDoDamage = true
            setTimeout(() => {
                projectiles.splice(0, 1)
            }, this.cooldown)
    }

    projetileCollision(){
        this.shouldDoDamage = false
        console.log(this.hitbox.position.x, this.hitbox.position.y)
        setTimeout(() => {
            if(this.hitbox.position.x + this.hitbox.width >= player.hitbox.position.x && this.hitbox.position.x <= player.hitbox.position.x + player.hitbox.width && this.hitbox.position.y + this.hitbox.height >= player.hitbox.position.y && this.hitbox.position.y <= player.hitbox.position.y + player.hitbox.height && player.health > 0 && !player.invulnerability){
                player.health -= this.damage
                player.takingDamage = true
                player.receivingDamage()
            }
        }, this.cooldown/1.4)
    }

    update(){
        this.updateHitbox()
        if(this.shouldBeRemoved) this.projectileRemove()
        if(this.shouldDoDamage) this.projetileCollision()
        this.updateFrames()

        
        //ctx.fillStyle = 'black'
        //ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

        this.draw()
    }
}

let projectiles = []