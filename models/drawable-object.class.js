class DrawableObject {
    img;
    imageCache = {};
    x = 120;
    y = 180;
    height = 250;
    width = 100;

   

    draw(ctx){
        try {
            if (this.img) {
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            } else {
                console.warn('Image is not loaded', this.img);
            }
        } catch (e) {
            console.warn('Fehler beim Laden', e);
            console.log('Dieses Bild konnte nicht geladen werden', this.img ? this.img.src : 'undefined');
        }
    }

    playAnimate(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    isColliding(mo) {
        const myBox = this.getHitbox();
        const otherBox = mo.getHitbox();
            return (
            myBox.x + myBox.width  > otherBox.x &&
            myBox.y + myBox.height > otherBox.y &&
            myBox.x < otherBox.x + otherBox.width &&
            myBox.y < otherBox.y + otherBox.height
        );
    }
    
    getHitbox() {
        return {
            x: this.x + this.offset.left,
            y: this.y + this.offset.top,
            width: this.width - this.offset.left - this.offset.right,
            height: this.height - this.offset.top - this.offset.bottom
        };
    }
    
        
    loadImages(arr) {
        arr.forEach(path => {
          const img = new Image();
          img.src = path;
          this.imageCache[path] = img;
        });
      }
      
    
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    
    
}