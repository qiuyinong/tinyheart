/**
 * Created by wlw on 2017/03/08.
 */
//绘制大鱼
function BigFish(w, h){
    this.x = 0;
    this.y = 0;
    this.w = w;
    this.h = h;

    this.bigTailCount;
    this.bigLastTime;

    this.bigEyeCount;
    this.bigEyeLastTime;
    this.bigInterval;//这是定义一个基本的参数，当大于的眼睛处于不同的状态，执行的时间不同
                     //比如闭眼状态的化就就只需要200毫秒，睁眼的话就需要三秒等等

    this.bigBodyCount;//身体只需要帧数就行了，不需要时间间隔，吃到果实自动变化

    this.angle;//定义大鱼需要旋转角度

    this.bigEye = new Image();
    this.bigSwim = new Image();
    //this.bigTail = new Image();
}
BigFish.prototype = {
    init: function(){
        this.x = this.w*0.5;
        this.y = this.h*0.5;
        this.angle = 0;

        this.bigTailCount = 0;
        this.bigLastTime = 0;

        this.bigEyeCount = 0;
        this.bigEyeLastTime = 0;
        this.bigInterval = 1000;

        this.bigBodyCount = 0;

        this.bigEye.src = "./src/bigEye0.png"
        this.bigSwim.src = "./src/bigSwim0.png"
        //this.bigTail.src = "./src/bigTail0.png"
    },
    drawBig: function(ctx1, mx, my, bt, be, db, bo, bb){

        //大鱼尾巴的变化
        var bigTailNow = new Date().getTime();
        if(bigTailNow - this.bigLastTime>50){
            this.bigTailCount = (++this.bigTailCount)%8;
            this.bigLastTime = bigTailNow;
        }


        //大鱼眼睛的变化
        if(!db.gameOver){//只有游戏没有结束才能眨眼睛
            var bigEyeNow = new Date().getTime();
            if(bigEyeNow - this.bigEyeLastTime > this.bigInterval){
                this.bigEyeCount = (++this.bigEyeCount)%2;
                if(this.bigEyeCount == 0){
                    this.bigInterval = Math.random()*1500 + 1500;

                }else{
                    this.bigInterval = 200;
                }
                this.bigEyeLastTime = bigEyeNow;
            }
        }




        this.x = lerpDistance(mx, this.x, 0.79)
        this.y = lerpDistance(my, this.y, 0.79)


        //运用反正Math.atan2(y, x)
        var deltaY = my-this.y;//获得鼠标坐标和大鱼坐标差值
        var deltaX = mx-this.x;
        var deta = Math.atan2(deltaY, deltaX)+Math.PI//鼠标的坐标和大鱼坐标的夹角-PI-PI
        //加上Math.PI可以将鱼头和鼠标移动相一致
        //deta鼠标和大鱼角度的相差值
        this.angle = lerpAngle(deta, this.angle, 0.6);
        //获得需要旋转的坐标，需要旋转的坐标是根据鼠标的变化而变化的

        ctx1.save()
        ctx1.translate(this.x, this.y);//重新设置绘画的原点
        ctx1.rotate(this.angle);//在绘画的原点开始旋转

        //尾巴部分
        var bigTailCount = this.bigTailCount;
        ctx1.drawImage(bt[bigTailCount], -bt[bigTailCount].width*0.5+25, -bt[bigTailCount].height*0.5);

        //身体部分
        if( db.double == 2 ){//判断是否吃到的是蓝果实
            ctx1.drawImage(bb[this.bigBodyCount], -bb[this.bigBodyCount].width*0.5, -bb[this.bigBodyCount].height*0.5);
        }else{
            ctx1.drawImage(bo[this.bigBodyCount], -bo[this.bigBodyCount].width*0.5, -bo[this.bigBodyCount].height*0.5);
        }


        //眼睛部分
        var bigEyeCount = this.bigEyeCount;
        ctx1.drawImage(be[bigEyeCount], -be[bigEyeCount].width*0.5, -be[bigEyeCount].height*0.5);


        ctx1.restore();
    }
}

