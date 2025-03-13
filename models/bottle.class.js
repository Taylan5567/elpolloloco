class Bottle extends DrawableObject {
    
    
    offset = { top: 10, left: 45, right: 25, bottom: 5 };


    constructor(){
        super();
        this.loadImage([
            'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
          ]);
          
        this.x = 220 + Math.random() * 1000; 
        this.y = 335;

        this.height = 90;
        this.width = 100;
    }



}
