class Line{
    constructor(canvas,point){
        this.point = point
        this.ctx = canvas.getContext('2d')
        this.backgroundColor = '#fff'
        this.width = canvas.width
        this.height = canvas.height
        this.start = 0
        this.end = 1
        this.currentX = 0
        this.currentY = 0
        this.animation()
        this.run = true
    }
    drawText(){
        this.ctx.beginPath();
        this.ctx.textAlign = 'center';
        this.ctx.font = '12px Microsoft YaHei';
        this.ctx.fillStyle = '#000';
        for(let i=0;i<this.point.length;i++){
            this.ctx.fillText(`(${this.point[i].x},${this.point[i].y})`,this.point[i].x,this.point[i].y)
        }
    }
    animation(){
        this.loop = window.requestAnimationFrame(this.animation.bind(this))
        var x = this.point[this.end].x-this.point[this.start].x
        var y = this.point[this.end].y-this.point[this.start].y
        var v = Math.sqrt(x*x+y*y)
        if(this.currentX<x){
            this.clearDraw()
            this.drawText()
            this.ctx.beginPath();
            this.ctx.strokeStyle ='#000';   
            this.ctx.moveTo(this.point[0].x,this.point[0].y)
            for(let i=1;i<=this.start;i++){
                this.ctx.lineTo(this.point[i].x,this.point[i].y)
            }
            this.ctx.lineTo(this.point[this.start].x+this.currentX,this.point[this.start].y+this.currentY)
            this.ctx.stroke()
            this.currentX+=x/v
            this.currentY+=y/v
        }else{
            window.cancelAnimationFrame(this.loop)
            this.loop=null;
            if(this.end<this.point.length-1){
                this.currentX=0
                this.currentY=0
                this.start++
                this.end++
                this.animation()
            }
        }
    }
    clearDraw(){
        this.ctx.fillStyle = this.backgroundColor;       
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    stop(){
        if(this.run){
            window.cancelAnimationFrame(this.loop)
            this.loop=null;
            this.run=false;
        }
    }
    play(){
        if(!this.run){
            this.animation()
            this.run=true
        }
    }
    replay(){
        this.stop()
        this.start = 0
        this.end = 1
        this.currentX = 0
        this.currentY = 0
        this.run = true
        this.animation()
    }
}
