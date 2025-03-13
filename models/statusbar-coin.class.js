class CoinStatus extends DrawableObject {
    
    
    imgMoney = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ]

    money = 0;

    constructor () {
        super();
        this.loadImages(this.imgMoney);
        this.x = 30;
        this.y = 43;
        this.width = 200;
        this.height = 60;
        this.setCash(0);
    }

    setCash(money){
         this.money = money;
         let path = this.imgMoney[this.resolveImageIndexCoin()];
         this.img = this.imageCache[path];
    }

    resolveImageIndexCoin(){
        if (this.money == 0){
            return 0;
        } else if (this.money == 1){
            return 1;
        } else if (this.money == 2){
            return 2;
        } else if (this.money == 3){
            return 3;
        } else if (this.money == 4){
            return 4;
        } else if (this.money == 5){
            return 5;
        } 
}}