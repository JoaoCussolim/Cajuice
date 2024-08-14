class Minion extends Boss{
    constructor({position = {x: 0, y: 0}, baseDirections = {first: '', second: ''}, specialNecessitation, healthbarcolor, source, attackCooldown, specialAttackCooldown, attackDamage, maxHealth, name, hitbox = {x: 0, y: 0, width: 0, height: 0}, attackbox = {x: 0, y: 0, width: 0, height: 0}, frameRate, frameBuffer, scale, animations}){
    super({source, frameRate, frameBuffer, scale, position, baseDirections, specialNecessitation, healthbarcolor, attackCooldown, specialAttackCooldown, attackDamage, maxHealth, name, hitbox, attackbox, animations})
    
    this.maxHealth = maxHealth
    this.health = this.maxHealth
    }

    death(){
        if(this.alive){
            this.alive = false
            this.currentFrame = 0
            setTimeout(() => {
                this.health = null
            }, 1400);
        }
    }
}

// let whiteskeleton = new Minion({position: {x: 1000, y: 960}, baseDirections: {first: 'Right', second: 'Left'}, specialNecessitation: 4, 
// source: "./assets/whiteskeleton/idleset.png", attackCooldown: 1100, specialAttackCooldown: 1000, attackDamage: 2, maxHealth: 20, hitbox: {x: 30, y: 360, width: 80, height: 100}, attackbox: {x: 20, y: 320, width: 50, height: 50}, frameRate: 8, frameBuffer: 8, scale: 2, animations: {
//     Idle: {
//         source: "./assets/whiteskeleton/idleset.png",
//         frameRate: 8,
//         frameBuffer: 8,
//         image: new Image()
//     },
//     Run: {
//         source: "./assets/whiteskeleton/runset.png",
//         frameRate: 10,
//         frameBuffer: 10,
//         image: new Image()
//     },
//     Attack: {
//         source: "./assets/whiteskeleton/attackset.png",
//         frameRate: 10,
//         frameBuffer: 10,
//         image: new Image()
//     },
//     SpecialAttack: {
//         source: "./assets/whiteskeleton/spattackset.png",
//         frameRate: 9,
//         frameBuffer: 9,
//         image: new Image()
//     },
//     TakingDamage: {
//         source: "./assets/whiteskeleton/takingdamageset.png",
//         frameRate: 5,
//         frameBuffer: 5,
//         image: new Image()
//     },
//     Death: {
//         source: "./assets/whiteskeleton/deathset.png",
//         frameRate: 13,
//         frameBuffer: 13,
//         image: new Image()
//     }
// }})
// let yellowskeleton = new Minion({position: {x: 1000, y: 960}, baseDirections: {first: 'Right', second: 'Left'}, specialNecessitation: 4, 
// source: "./assets/yellowskeleton/idleset.png", attackCooldown: 1100, specialAttackCooldown: 1000, attackDamage: 2, maxHealth: 20, hitbox: {x: 30, y: 360, width: 80, height: 100}, attackbox: {x: 20, y: 320, width: 50, height: 50}, frameRate: 8, frameBuffer: 8, scale: 2, animations: {
//     Idle: {
//         source: "./assets/yellowskeleton/idleset.png",
//         frameRate: 8,
//         frameBuffer: 8,
//         image: new Image()
//     },
//     Run: {
//         source: "./assets/yellowskeleton/runset.png",
//         frameRate: 10,
//         frameBuffer: 10,
//         image: new Image()
//     },
//     Attack: {
//         source: "./assets/yellowskeleton/attackset.png",
//         frameRate: 10,
//         frameBuffer: 10,
//         image: new Image()
//     },
//     SpecialAttack: {
//         source: "./assets/yellowskeleton/spattackset.png",
//         frameRate: 9,
//         frameBuffer: 9,
//         image: new Image()
//     },
//     TakingDamage: {
//         source: "./assets/yellowskeleton/takingdamageset.png",
//         frameRate: 5,
//         frameBuffer: 5,
//         image: new Image()
//     },
//     Death: {
//         source: "./assets/yellowskeleton/deathset.png",
//         frameRate: 13,
//         frameBuffer: 13,
//         image: new Image()
//     }
// }})
// let zombie = new Minion({position: {x: 1000, y: 980}, baseDirections: {first: 'Right', second: 'Left'}, specialNecessitation: 4, 
//     source: "./assets/zombie/idleset.png", attackCooldown: 670, specialAttackCooldown: 670, attackDamage: 2, maxHealth: 20, hitbox: {x: 30, y: 360, width: 50, height: 80}, attackbox: {x: 20, y: 350, width: 50, height: 50}, frameRate: 8, frameBuffer: 8, scale: 3, animations: {
//         Idle: {
//             source: "./assets/zombie/idleset.png",
//             frameRate: 8,
//             frameBuffer: 8,
//             image: new Image()
//         },
//         Run: {
//             source: "./assets/zombie/runset.png",
//             frameRate: 8,
//             frameBuffer: 8,
//             image: new Image()
//         },
//         Attack: {
//             source: "./assets/zombie/attackset.png",
//             frameRate: 7,
//             frameBuffer: 9,
//             image: new Image()
//         },
//         SpecialAttack: {
//             source: "./assets/zombie/attackset.png",
//             frameRate: 7,
//             frameBuffer: 7,
//             image: new Image()
//         },
//         TakingDamage: {
//             source: "./assets/zombie/takingdamageset.png",
//             frameRate: 3,
//             frameBuffer: 8,
//             image: new Image()
//         },
//         Death: {
//             source: "./assets/zombie/deathset.png",
//             frameRate: 8,
//             frameBuffer: 17,
//             image: new Image()
//         }
//     }})

let minions = []
let currentWaves = 0
let maxCurrentlyWaves = 5
let maxCurrentlyMinions = 1

let pushMinions = () => {
    for(let i = 0; i < maxCurrentlyMinions; i++){
        let valoraleatorio = RandomInt(0, 1)
        let side = valoraleatorio === 0 ? -10 : 1300
        valoraleatorio = RandomInt(0, 1)
        let realside = side === -10 ? side + RandomInt(0, 600) : side - RandomInt(0,600)
        valoraleatorio = RandomInt(0, 2)
        let minionType = 0
        switch(valoraleatorio){
            case 0:
                minionType = new Minion({position: {x: realside, y: 960}, baseDirections: {first: 'Right', second: 'Left'}, specialNecessitation: 4, 
                    source: "./assets/whiteskeleton/idleset.png", attackCooldown: 1100, specialAttackCooldown: 1000, attackDamage: 2, maxHealth: 20, hitbox: {x: 30, y: 360, width: 80, height: 100}, attackbox: {x: 20, y: 320, width: 50, height: 50}, frameRate: 8, frameBuffer: 8, scale: 2, animations: {
                        Idle: {
                            source: "./assets/whiteskeleton/idleset.png",
                            frameRate: 8,
                            frameBuffer: 8,
                            image: new Image()
                        },
                        Run: {
                            source: "./assets/whiteskeleton/runset.png",
                            frameRate: 10,
                            frameBuffer: 10,
                            image: new Image()
                        },
                        Attack: {
                            source: "./assets/whiteskeleton/attackset.png",
                            frameRate: 10,
                            frameBuffer: 10,
                            image: new Image()
                        },
                        SpecialAttack: {
                            source: "./assets/whiteskeleton/spattackset.png",
                            frameRate: 9,
                            frameBuffer: 9,
                            image: new Image()
                        },
                        TakingDamage: {
                            source: "./assets/whiteskeleton/takingdamageset.png",
                            frameRate: 5,
                            frameBuffer: 5,
                            image: new Image()
                        },
                        Death: {
                            source: "./assets/whiteskeleton/deathset.png",
                            frameRate: 13,
                            frameBuffer: 13,
                            image: new Image()
                        }
                    }})
                break
            case 1:
                minionType = new Minion({position: {x: realside, y: 960}, baseDirections: {first: 'Right', second: 'Left'}, specialNecessitation: 4, 
                    source: "./assets/yellowskeleton/idleset.png", attackCooldown: 1100, specialAttackCooldown: 1000, attackDamage: 2, maxHealth: 20, hitbox: {x: 30, y: 360, width: 80, height: 100}, attackbox: {x: 20, y: 320, width: 50, height: 50}, frameRate: 8, frameBuffer: 8, scale: 2, animations: {
                        Idle: {
                            source: "./assets/yellowskeleton/idleset.png",
                            frameRate: 8,
                            frameBuffer: 8,
                            image: new Image()
                        },
                        Run: {
                            source: "./assets/yellowskeleton/runset.png",
                            frameRate: 10,
                            frameBuffer: 10,
                            image: new Image()
                        },
                        Attack: {
                            source: "./assets/yellowskeleton/attackset.png",
                            frameRate: 10,
                            frameBuffer: 10,
                            image: new Image()
                        },
                        SpecialAttack: {
                            source: "./assets/yellowskeleton/spattackset.png",
                            frameRate: 9,
                            frameBuffer: 9,
                            image: new Image()
                        },
                        TakingDamage: {
                            source: "./assets/yellowskeleton/takingdamageset.png",
                            frameRate: 5,
                            frameBuffer: 5,
                            image: new Image()
                        },
                        Death: {
                            source: "./assets/yellowskeleton/deathset.png",
                            frameRate: 13,
                            frameBuffer: 13,
                            image: new Image()
                        }
                    }})
                break
            case 2:
                minionType = new Minion({position: {x: realside, y: 980}, baseDirections: {first: 'Right', second: 'Left'}, specialNecessitation: 4, 
                    source: "./assets/zombie/idleset.png", attackCooldown: 670, specialAttackCooldown: 670, attackDamage: 2, maxHealth: 20, hitbox: {x: 30, y: 360, width: 50, height: 80}, attackbox: {x: 20, y: 350, width: 50, height: 50}, frameRate: 8, frameBuffer: 8, scale: 3, animations: {
                        Idle: {
                            source: "./assets/zombie/idleset.png",
                            frameRate: 8,
                            frameBuffer: 8,
                            image: new Image()
                        },
                        Run: {
                            source: "./assets/zombie/runset.png",
                            frameRate: 8,
                            frameBuffer: 8,
                            image: new Image()
                        },
                        Attack: {
                            source: "./assets/zombie/attackset.png",
                            frameRate: 7,
                            frameBuffer: 9,
                            image: new Image()
                        },
                        SpecialAttack: {
                            source: "./assets/zombie/attackset.png",
                            frameRate: 7,
                            frameBuffer: 7,
                            image: new Image()
                        },
                        TakingDamage: {
                            source: "./assets/zombie/takingdamageset.png",
                            frameRate: 3,
                            frameBuffer: 8,
                            image: new Image()
                        },
                        Death: {
                            source: "./assets/zombie/deathset.png",
                            frameRate: 8,
                            frameBuffer: 17,
                            image: new Image()
                        }
                    }})
                break
        }
    
        minions.push(minionType)}
}



let minionActions = (minion) => {
        minion.velocity.x = 0

        if(minion.attackbox.position.x + minion.attackbox.width >= player.hitbox.position.x && minion.attackbox.position.x <= player.hitbox.position.x + player.hitbox.width && minion.attackbox.position.y + minion.attackbox.height >= player.hitbox.position.y && minion.attackbox.position.y <= player.hitbox.position.y + player.hitbox.height && minion.normalAttacks < minion.specialNecessitation && !minion.attacking && !minion.takingDamage && minion.alive && player.alive && !upgradeMenuOpen){
            minion.attack()
            minion.switchSprite('Attack')
        }

        else if(minion.attackbox.position.x + minion.attackbox.width >= player.hitbox.position.x && minion.attackbox.position.x <= player.hitbox.position.x + player.hitbox.width && minion.attackbox.position.y + minion.attackbox.height >= player.hitbox.position.y && minion.attackbox.position.y <= player.hitbox.position.y + player.hitbox.height && minion.normalAttacks >= minion.specialNecessitation && !minion.attacking && !minion.takingDamage && minion.alive && player.alive && !upgradeMenuOpen){
            minion.specialAttack()
            minion.switchSprite('SpecialAttack')
        }

        if(minion.position.x < player.position.x && !minion.attacking && !minion.takingDamage && minion.alive && player.alive && !upgradeMenuOpen){
            minion.switchSprite('Run')
            minion.velocity.x = 2
            minion.direction = minion.baseDirections.first
        }
        else if(minion.position.x > player.position.x && !minion.attacking && !minion.takingDamage && minion.alive && player.alive && !upgradeMenuOpen){
            minion.switchSprite('Run')
            minion.velocity.x = -2
            minion.direction = minion.baseDirections.second
        }

        else if((minion.velocity.y === 0  && !minion.attacking && minion.alive) || upgradeMenuOpen){
            minion.switchSprite('Idle')
        }

        else if(minion.takingDamage && minion.alive && !minion.attacking && !upgradeMenuOpen){
            minion.switchSprite('TakingDamage')
        }
        else if(!minion.alive){
            minion.switchSprite('Death')
        }
    }

let updateMinions = (mIndex) => {
    minions[mIndex].death()
    if(minions[mIndex].health === null){
        minions.splice(mIndex, 1)
    }
}

let updateWave = () => {
    if(currentWaves >= maxCurrentlyWaves){
        maxCurrentlyWaves += 5
        inWaves = false
        bossfight = true
    }
    if(minions.length <= 0 && !bossfight){
        if(currentWaves % 5 === 0) statPoints++
        currentWaves ++
        maxCurrentlyMinions ++
        pushMinions()
        minionMultiplier = 1000/minions.length
    }
}
