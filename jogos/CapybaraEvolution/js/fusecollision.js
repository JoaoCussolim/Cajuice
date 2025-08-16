function worldOneDetectCollisions() {
    let toRemove = [];
    for (let i = 0; i < capybaras.length; i++) {
        for (let j = i + 1; j < capybaras.length; j++) {
            if (capybaras[i].collidesWith(capybaras[j]) &&
                capybaras[i].level == capybaras[j].level &&
                (capybaras[i].level != maxCapybaraGlobalLevel || capybaras[j].level != maxCapybaraGlobalLevel) &&
                (capybaras[i].dragging || capybaras[j].dragging)) {

                if(toRemove.length <= 0){
                capybaras[i].newlevel++;}

                if(toRemove.length <= 0){
                toRemove.push(j);}
            }
        }
    }
    for (let k = toRemove.length - 1; k >= 0; k--) {
        capybaras.splice(toRemove[k], 1);
    }
}
function worldTwoDetectCollisions() {
    let toRemove = [];
    for (let i = 0; i < monsterbaras.length; i++) {
        for (let j = i + 1; j < monsterbaras.length; j++) {
            if (monsterbaras[i].collidesWith(monsterbaras[j]) &&
            monsterbaras[i].level == monsterbaras[j].level &&
                (monsterbaras[i].level != maxMonsterbaraGlobalLevel || monsterbaras[j].level != maxMonsterbaraGlobalLevel) &&
                (monsterbaras[i].dragging || monsterbaras[j].dragging)) {

                
                if(toRemove.length <= 0){
                    monsterbaras[i].newlevel++;}

                
                if(toRemove.length <= 0){
                toRemove.push(j);}
            }
        }
    }
    for (let k = toRemove.length - 1; k >= 0; k--) {
        monsterbaras.splice(toRemove[k], 1);
    }
}
// function detectCollisionsUniversal(){
//     let capybaras = currentWorld === 0 ? capybaras : monsterbaras

//     for(let i = )
// }