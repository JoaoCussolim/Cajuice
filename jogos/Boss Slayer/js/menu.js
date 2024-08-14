class Button {
    constructor({position, velocity, src_left, src_right}){
        this.position = position
        this.velocity = velocity
        this.left_img = new Image();
        this.right_img = new Image();
        this.left_img.src = src_left;
        this.right_img.src = src_right;
        this.height = 300;
        this.width = 600;
        this.mouseOn = false;
        this.rotate_left = 0;
        this.rotate_right = 0;

    }

    draw(){
        ctx.save();
        ctx.rotate(this.rotate_left)
        ctx.drawImage(this.left_img,(this.position.x + 130),(this.position.y + 0),this.width,this.height)
        ctx.restore();


        ctx.save();
        ctx.translate(canvas.width,0)
        ctx.rotate(this.rotate_right)
        ctx.drawImage(this.right_img,-(this.position.x + 790),(this.position.y + 0),this.width,this.height)
        ctx.restore();
        
        // ctx.rect(this.position.x + 250,this.position.y + 90,this.width - 238,this.height - 180)
        // ctx.stroke();
    }


    updt_pos(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    updt_mouse(){
        if(isInsideButton(
            {x: this.position.x + 250, y:this.position.y + 90, height:this.height - 180, width:this.width - 238,}
        )){
            this.mouseOn = true;

        }else{
            this.mouseOn = false;
        }
    }

    breakButton(){
        this.rotate_left += 0.01
        this.rotate_right -= 0.01
    }

    updt(){
        this.draw();
        this.updt_pos();
        this.updt_mouse();
     

    }
}

playbtn = new Button({
    position: {x:180 ,y:80},
    velocity: {x:0,y:0},
    src_left: "./assets/menu/jogar_esq.png",
    src_right: "./assets/menu/jogar_dir.png"
})

creditbtn = new Button({
position: {x:180 ,y:450},
velocity: {x:0,y:0},
src_left: "./assets/menu/credito_esq.png",
src_right: "./assets/menu/credito_dir.png"
})

controlbtn = new Button({
    position: {x:180 ,y:260},
    velocity: {x:0,y:0},
    src_left: "./assets/menu/controle_esq.png",
    src_right: "./assets/menu/controle_dir.png"
    })

closebtn = {
    x: 750,
    y: 250,
    width: 70,
    height: 70,
    mouseOn: false,

    draw(){
    ctx.font = '50px MinimalPixel';
    ctx.fillText("X",this.x,this.y);
    },

    updt(){
        this.draw();

        if(isInsideButton(
            {x: this.x - 18, y:this.y - 60, height:this.height, width:this.width}
        )){
            this.mouseOn = true;

        }else{
            this.mouseOn = false;
        }
    }



}
    
    
let creditsScreen = false;
let controlScreen = false;


let holdPlayer = () => {
    player.position.y = 0;
    player.velocity.y = 0;
}




let playedTrue = () => {
    if(player.position.y > camera.position.y){
        camera.position.y = player.position.y
    }

    if(player.position.y - 200 > playbtn.position.y+90){
        playbtn.breakButton();
    }

    if(player.position.y-200 > controlbtn.position.y+90){
        controlbtn.breakButton();
    }

    if(player.position.y-200 > creditbtn.position.y+90){
        creditbtn.breakButton();
    }
}


let controlDrawScreen = () =>{
    let controlscroll = new Image();
    controlscroll.src = './assets/menu/controlScroll.png';
    ctx.drawImage(controlscroll,-290,-350,1800,1500);
}

let creditDrawScreen = () =>{
    let creditscroll = new Image();
    creditscroll.src = './assets/menu/creditScroll.png';
    ctx.drawImage(creditscroll,20,-20,1200,800);}

let Menu = () => {
    gravity = 0.03
    playbtn.updt();
    creditbtn.updt();
    controlbtn.updt();


    if(played){
    playedTrue();


    }else{
    holdPlayer();
    }


    if(controlScreen){
        controlDrawScreen()
        closebtn.x = 750,
        closebtn.y = 250,
        closebtn.updt();

        ctx.font = "50px MinimalPixel";
        ctx.fillText("CONTROLES",430,170);
        ctx.font = "35px MinimalPixel";
        ctx.fillText("ANDAR: A/D",450,300);
        ctx.fillText("PULAR: W",450,370);
        ctx.fillText("ATAQUE: F",450,440);
        ctx.fillText("ESPECIAL: Z",450,510);
        ctx.fillText("ROLAR: Q",450,580);
        ctx.fillText("STATUS: K",450,650);


    }

    if(creditsScreen){
        creditDrawScreen();
        closebtn.x = 830;
        closebtn.y = 260;
        closebtn.updt();

        ctx.font = "50px MinimalPixel";
        ctx.fillText("CREDITOS",470,270);

        ctx.font = "35px MinimalPixel";
        ctx.fillText("DESENVOLVEDOR:",450,325);
        ctx.fillText("JOAO V. CUSSOLIM",450,380);
        ctx.fillText("MENU MAKER:",470,460);
        ctx.fillText("RAFAEL B. ULBRICH",430,505);
    }

    if(player.onGround){
        menu = false;
        gravity = 0.8;
    }
    

}