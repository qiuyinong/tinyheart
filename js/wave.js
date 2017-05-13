/**
 * Created by wlw on 2017/03/09.
 */
//特效气泡
function Wave (){
    this.x = [];//这个是要根据大雨和果实碰撞的位置
    this.y = [];//获得绘画的位置
    this.alive = [];//判断是否可用
    this.r = [];
    this.lastTime = 0;
    this.alpha = 0;
}
Wave.prototype = {
    num: 10,
    init: function(){
        for(var i = 0; i<this.num; i++){
            this.alive[i] = false;//false是可用的状态
            this.r[i] = 0;
        }
    },
    drawWave: function(ctx1){
        ctx1.save()
        ctx1.lineWidth = 2;//设置娟娟的宽度
        ctx1.shadowBlur = 10;
        ctx1.shadowColor = "white";
        for(var i = 0; i<this.num; i++){

            if(this.alive[i]){//是活的状态才进行绘画
                //要是可用的话就绘画
                //使用lastTime的意思是这次完成距离下一次多少时间才进行一次
                //而这里完成的时间是不固定的，所以不能用
                    this.r[i] += 8;
                    if(this.r[i] > 50){
                        this.alive[i] = false;
                        break;//跳出本次循环进行下一次循环
                    }
                    this.alpha = 1 - this.r[i]/50;
                ctx1.beginPath();
                ctx1.arc(this.x[i], this.y[i], this.r[i], 0, 2*Math.PI);
                ctx1.closePath();
                ctx1.strokeStyle = "rgba(255, 255, 255, " + this.alpha + ")";
                ctx1.stroke();
            }
        }
        ctx1.restore();
    },
    born: function(x,y){

        for(var i = 0; i < this.num; i++){
            if(!this.alive[i]){
                this.alive[i] = true;//这绘画当中
                this.r[i] = 10;
                this.x[i] = x;
                this.y[i] = y;
                return;//注意return跳出循环，不再循环
            }
        }

    }

}