class BarChart{
    constructor(id,data,options){
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        this.data = data
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.title = options.title
        this.padding = 50
        this.yPart = 5
        this.currentHeight = 0
        this.init()

    }
    init(){
        this.xWidth = this.width - this.padding*2
        this.yHeight = this.height - this.padding*2
        this.yOneHeight = this.yHeight / this.yPart
        this.yOneNum = this.getYOneLen()
        this.xOneWidth = this.xWidth / this.data.length
        this.draw()
    }
    getYOneLen(){
        var arr = this.data.slice(0)
        arr.sort((a,b)=>b.value-a.value)
        var yMax = arr[0].value
        var yOne = yMax/this.yPart
        var len = yOne.toString().length-1
        len = len>2 ? 2: len
        return Math.ceil(yOne/Math.pow(10,len))*Math.pow(10,len)
    }
    draw(){
        this.drawTitle()
        this.drawXY()
        this.drawYText()
        this.drawXText()
        this.animation()
        // this.watchHover()
    }
    drawTitle() {
        if(this.title){
            this.ctx.beginPath();
            this.ctx.textAlign = 'center';
            this.ctx.font = '16px Microsoft YaHei';
            this.ctx.fillText(this.title, this.width / 2, this.padding / 2)
        }
    }
    drawXY(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.padding,this.padding)
        this.ctx.lineTo(this.padding,this.height-this.padding)
        this.ctx.lineTo(this.width-this.padding,this.height-this.padding)
        this.ctx.stroke()
    }
    drawYText(){
        this.ctx.beginPath();
        this.ctx.textAlign = 'center';
        this.ctx.font = '12px Microsoft YaHei';
        this.ctx.fillStyle = '#666';
        var height = this.padding
        var num = this.yOneNum * this.yPart
        for(let i=0;i<this.yPart;i++){
            this.ctx.fillText(num,this.padding/2,height+15)
            this.ctx.moveTo(this.padding,height+10)
            this.ctx.lineTo(this.width-this.padding,height+10)
            height += this.yOneHeight
            num -= this.yOneNum
        }
        this.ctx.stroke()
    }
    drawXText(){
        this.ctx.beginPath();
        this.ctx.textAlign = 'center';
        this.ctx.font = '12px Microsoft YaHei';
        this.ctx.fillStyle = '#666';
        var width = this.padding
        var point = this.yHeight/(this.yOneNum*this.yPart)
        var height = 0;
        for(let i=0;i<this.data.length;i++){
            height=this.data[i].value*point*this.currentHeight/100
            this.ctx.fillText(this.data[i].xAxis,width+ this.xOneWidth/2,this.height-this.padding/2)
            this.ctx.fillRect(
                width+this.xOneWidth/4,
                this.height-this.padding-height+5,
                this.xOneWidth/2,
                height-5,
            );

            this.ctx.fillText(this.data[i].value,width+ this.xOneWidth/2,this.height-this.padding-height)
            width += this.xOneWidth
        }
    }
    animation(){
        this.loop = window.requestAnimationFrame(this.animation.bind(this))
        if(this.currentHeight<100){
            this.currentHeight = this.currentHeight+3>100?100: this.currentHeight+3
            this.ctx.fillStyle = '#ffffff';       
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.drawXText()
        }else{
            window.cancelAnimationFrame(this.loop)
            this.loop=null
        }
    }
    watchHover() {
        var self = this;
        self.canvas.addEventListener('mousemove', function(ev) {
            ev = ev || window.event;
            self.currentIndex = -1;
            var width = self.padding
            for (var i = 0; i < self.data.length; i ++){
                if(ev.offsetX > self.padding+self.xOneWidth*i && ev.offsetX <self.padding+self.xOneWidth*(i+1))
                {
                    self.currentIndex = i;
                }
                width += this.xOneWidth
            }
            console.log(self.currentIndex)
            self.drawHover();
        })
    }
    drawHover() {
        if(this.currentIndex !== -1){
            if(this.onceMove !== this.currentIndex){
                this.onceMove = this.currentIndex;
                this.ctx.fillRect(
                    this.padding+this.onceMove*this.xOneWidth,
                    this.padding,
                    this.xOneWidth,
                    this.yHeight,
                );
            }
        }else{
            if(this.onceMove !== -1){
                this.ctx.clearRect(
                    this.padding+this.onceMove*this.xOneWidth,
                    this.padding,
                    this.xOneWidth,
                    this.yHeight,
                )
                this.onceMove = -1;
            }
        }
    }
}