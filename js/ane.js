/**
 * Created by wlw on 2017/03/06.
 */
var Ane = function(canHeight){
    this.rootx = [];//创建二次贝塞尔的开始坐标
    this.headx = [];
    this.heady = [];//这是海葵的高
    this.h = canHeight;
    this.amp = 0;//摆动的幅度
    this.alpha = 0;//获得角度
    this.lastTime = 0;

}
Ane.prototype = {
    num: 65,//设置海葵的个数
    init: function(){
        for(var i = 0;i<this.num;i++){
            this.rootx[i] = i*16+Math.random()*18;//这是将每个
            //海葵的坐标存放到数组中,隔一段画一朵
            this.headx[i] = this.rootx[i];
            this.heady[i] = Math.random()*70+this.h - 240;
            console.log(this.headx[i])
            console.log(this.heady[i])
            //这是随机设置海葵的高度
        }
    },
    drawAne: function(){
        //绘制每一朵海葵
        var now = new Date().getTime();
        if(now - this.lastTime > 10){
            this.alpha += 0.07*Math.PI;//[-1, 1]的时间
            var l = Math.sin(this.alpha)
            this.amp = Math.random()*15+40;//摆动的幅度
            ctx2.save();//
            ctx2.globalAlpha = 0.6;
            ctx2.lineWidth = 13;
            ctx2.lineCap = "round";
            ctx2.strokeStyle = "#3b154e";
            for(var i = 0; i<this.num; i++){
                ctx2.beginPath();
                ctx2.moveTo(this.rootx[i], this.h);
                ctx2.quadraticCurveTo(this.rootx[i], this.h-100, this.headx[i] + l*this.amp, this.heady[i]);
                ctx2.stroke();
            }
            ctx2.restore();
           this.lastTime = now
        }

    }
}