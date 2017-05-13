/**
 * Created by wlw on 2017/03/09.
 */
//绘制小鱼
 function LiFish (w, h){
     this.x;
     this.y;
    this.w = w;
    this.h = h;
    this.angle;

    this.babyTailCount;
    this.lastTime;

    this.babyEyeTimer;
    this.babyEyecount;
    this.eyeLastTime;
    this.eyeInterval;//眨眼睛的间隔

    this.bodyCount;
    this.bodyLastTime;


    //this.liEye = new Image();
    //this.libody = new Image();
    //this.liTail = new Image();
}
LiFish.prototype = {
    init: function(){
        this.angle = 0;
        this.x = this.w*0.5-50;
        this.y = this.h*0.5+50;//绘制在画布的中间，和大鱼有一点的小间ge

        this.babyTailCount = 0;
        this.lastTime = 0;

        this.babyEyecount = 0;
        this.babyEyeTimer = 0;
        this.eyeLastTime = 0;
        this.eyeInterval = 1000;

        this.bodyCount = 0;
        this.bodyLastTime = 0;

        //this.liEye.src = "./src/babyEye0.png"
       // this.libody.src = "./src/babyFade0.png"
        //this.liTail.src = "./src/babyTail0.png"
    },
    drawLi: function(ctx1, b, t, e, bd, db){





        //小鱼尾巴的变化
        var now = new Date().getTime();
        if(now-this.lastTime>200){
            this.babyTailCount = ++this.babyTailCount%8;
            this.lastTime = now;
        }



         //小鱼眼睛的变化
        if(!db.gameOver){//只有游戏没有结束才能眨眼睛
            var eyeNow = new Date().getTime();
            if(eyeNow - this.eyeLastTime>this.eyeInterval){
                this.babyEyecount = (++this.babyEyecount)%2//这是使指针再0和1之间变化
                if(this.babyEyecount == 0){
                    this.eyeInterval = Math.random()*1500+2000;
                }else{this.eyeInterval = 200;}//这是眨眼睛的时间
                this.eyeLastTime = eyeNow;//这是重新这是设置值，使eyeLastTime发生变化
                /***
                 * eyeInterval每次帧数发生改变的时间间隔
                 *
                 * **/



            }
        }




        //小鱼身体的帧数变化
        var bodyNow = new Date().getTime();
        if(bodyNow - this.bodyLastTime > 300){

            if(this.bodyCount == 19){
                this.bodyCount = 19;
                db.gameOver = true;
                //game over 判断
            }else{this.bodyCount = (++this.bodyCount)}
            this.bodyLastTime = bodyNow;
        }


        ctx1.save();


        this.x = lerpDistance(b.x, this.x, 0.93);
        //这是获得要获得接近的x 和y值
        this.y = lerpDistance(b.y, this.y, 0.93);



        var deletaX = b.x-this.x;
        //获得鱼妈妈和小鱼之间的距离差
        var deletaY = b.y-this.y;
        var dele = Math.atan2(deletaY, deletaX)+Math.PI;
        //这是获得要旋转的角度差
        this.angle = lerpAngle(dele, this.angle, 0.7)
        //这是要获得需要旋转的角度




        ctx1.translate(this.x, this.y);
        ctx1.rotate(this.angle);



        var bTC = this.babyTailCount;//使小鱼帧数发生变化
        var bEC = this.babyEyecount;
        var bC = this.bodyCount;
        ctx1.drawImage(t[bTC], -t[bTC].width*0.5+21, -t[bTC].height*0.5)
        ctx1.drawImage(bd[bC], -bd[bC].width*0.5, -bd[bC].height*0.5)

        ctx1.drawImage(e[bEC], -e[bEC].width*0.5, -e[bEC].height*0.5)
        ctx1.restore();
    }
}





