class BottleStatus extends DrawableObject {
  imgMunition = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  munition = 0;

  constructor() {
    super();
    this.loadImages(this.imgMunition);
    this.x = 30;
    this.y = 93;
    this.width = 200;
    this.height = 60;
    this.setMunition(0);
  }

  setMunition(munition) {
    this.munition = munition;
    let path = this.imgMunition[this.resolveImageIndexMunition()];
    this.img = this.imageCache[path];
  }

  resolveImageIndexMunition() {
    if (this.munition == 0) {
      return 0;
    } else if (this.munition == 1) {
      return 1;
    } else if (this.munition == 2) {
      return 2;
    } else if (this.munition == 3) {
      return 3;
    } else if (this.munition == 4) {
      return 4;
    } else if (this.munition >= 5) {
      return 5;
    }
  }
}
