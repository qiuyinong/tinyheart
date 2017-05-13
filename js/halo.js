/**
 * Created by wlw on 2017/03/10.
 */
//大鱼喂小鱼的特效
function Halo (){
    this.x = [];
    this.y = [];
    this.r = [];
    this.alive= [];//判断是否可用，也就是能不能绘画
    this.alpha;//控制透明度的变化
}
Halo.prototype = {
    num: 10,
    init: function(){
        for(var i = 0; i< this.num; i++){
            this.alive[i] = false;
            this.r[i] = 0;
        }
    },
    draw: function(ctx1){
        ctx1.save();
        ctx1.lineWidth = 2;
        ctx1.shadowBlur = 10;
        ctx1.shadowColor = "rgb(203, 91, 0)";
        for(var i = 0; i<this.num; i++){
            //遍历，得到每个需要绘画的图形
            if(this.alive[i]){
                //是存活的就进行绘画
                this.r[i] += 10;
                if(this.r[i] > 100){//判断气泡是否超过100
                    this.alive[i] = false;//超过一百收回重新利用
                    break;
                }
                this.alpha = 1 - this.r[i]/100;
                //绘画
                ctx1.beginPath();
                ctx1.arc(this.x[i], this.y[i], this.r[i], 0, 2*Math.PI);
                ctx1.closePath();
                ctx1.strokeStyle = "rgba(203, 91, 0, " + this.alpha + ")";
                ctx1.stroke();
            }
        }
        ctx1.restore();
    },
    born: function(x, y){
        //气泡出生，得到绘画的位置
        for(var i = 0; i < this.num; i++){
            if(!this.alive[i]){
                this.alive[i] = true;
                this.x[i] = x;
                this.y[i] = y;
                this.r[i] = 10;
                return;

            }
        }

    }
}