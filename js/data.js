/**
 * Created by wlw on 2017/03/09.
 */
//吃到果实数据
function Data (){
    this.fruitNum = 0;//吃到果实的数目
    this.double = 1;//判断是否吃吃到蓝果实
    this.fruitScore = 0;
    this.lastTime = 0;
    this.gameOver = false;//判断游戏是否结束
    this.alpha = 0;
}
Data.prototype = {
    drawScore: function(ctx1, w, h){
        ctx1.save();
        ctx1.shadowBlur = 10;//加模糊的效果
        ctx1.shadowColor = "white";
        ctx1.fillStyle = "white";
        ctx1.align = "center";
        ctx1.font = "30px verdana";
        ctx1.fillText("SCORE: " + this.fruitScore, w*0.5-50, h-30);//绘画的位置
        if(this.gameOver){
            var now = new Date().getTime();
            if(now - this.lastTime>100){//获得时间间隔固定的模式
                this.alpha +=0.07;
                this.lastTime = now;
            }

            if(this.alpha > 1){this.alpha = 1};
            ctx1.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
            ctx1.fillText("GAME OVER", w*0.5-75, h*0.5)
        }
        ctx1.restore();
    },
    score: function(){
        this.fruitScore +=this.fruitNum*10*this.double;//分数不断地叠加
        this.fruitNum = 0;//大鱼小鱼相遇之后果实数变成0
        this.double = 1;//相遇之后重置
    }
}