class EndbossStatus extends DrawableObject {

    imgStatus = [
        'img/7_statusbars/2_statusbar_endboss/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green100.png',
    ]



    constructor () {
        super();
        this.loadImages(this.imgStatus);
        this.loadImage(this.imgStatus[5]);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPrecentage(100);
    }

    setPrecentage(precentage){
        this.precentage = precentage;
        let path = this.imgStatus[this.resolveImageIndex()];
        this.img = this.imageCache[path];
   }

   resolveImageIndex(){
       if (this.precentage == 100){
           return 5;
       } else if (this.precentage > 80){
           return 4;
       } else if (this.precentage > 60){
           return 3;
       } else if (this.precentage > 40){
           return 2;
       } else if (this.precentage > 20){
           return 1;
       } else if (this.precentage > 0){
           return 0;
       } 
}
}