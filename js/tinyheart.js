/**
 * Created by wlw on 2017/03/05.
 */
window.onload = game;
function game () {

    can1 = document.getElementById("canvas1");//绘画 鱼，气泡， UI， 圈圈
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById("canvas2");
    //绘画 背景， 果实 ，海葵
    ctx2 = can2.getContext('2d');


    var canWidth = can1.width;
    var canHeight = can1.height;
    // 因为这是在index中使用的，直接在src中应用就可以了



    //小鱼尾巴的摆动图片数组
    var babyTail = [];
    for(var i = 0; i<8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = "./src/babyTail" + i + ".png";
    }


    //小鱼眼睛的图片数组
    var babyEye = [];
    for(var i = 0; i < 2; i++){
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye" + i + ".png";
    }



    //小鱼身体的变化
    var babyBody = [];
    for(var i = 0; i < 20; i++){
        babyBody[i] = new Image();
        babyBody[i].src = "./src/babyFade" + i + ".png";
    }


   //大鱼尾巴的变化
    var bigTail = [];
    for(var i = 0;i < 8; i++){
        bigTail[i] = new Image();
        bigTail[i].src = "./src/bigTail" + i + ".png"
    }


    //大鱼眼睛的变化
    var bigEye = [];
    for(var i = 0; i < 2; i++){
        bigEye[i] = new Image();
        bigEye[i].src = "./src/bigEye" + i + ".png";
    }


    //加载大鱼身体的变化
    var bigOrange = [];
    var bigBlue = [];
    for( var i = 0; i < 8; i++ ){
        bigOrange[i] = new Image();
        bigBlue[i] = new Image();
        bigOrange[i].src = "./src/bigEat" + i + ".png";
        bigBlue[i].src = "./src/bigEatBlue" + i + ".png";
    }



    var mx = 0;
    var my = 0;//获得鼠标的位置


    can1.addEventListener("mousemove", onMouseMove, false);
    function onMouseMove(e){//给画布加上mousemove方法
        if(!data.gameOver){
            mx = (e.offsetX||e.layerX)
            my = (e.offsetY||e.layerY)
        }
    }


    var ane = new Ane(canHeight);//实例化海葵
    ane.init();


    var fruit = new Fruit(canHeight, ane);
    fruit.init();//实例化果实



    var bigFish = new BigFish(canWidth, canHeight);
    bigFish.init();//实例化大鱼


    var liFish = new LiFish(canWidth, canHeight);
         liFish.init();//实例化小鱼


    var data = new Data();//实例化数据



    var wave = new Wave();//大鱼吃果实的特效实例化
    wave.init();



    var halo = new Halo();
    halo.init();







    setInterval(function(){//这个是不断的执行某一个函数
        //绘画背景图



        draBg(canWidth, canHeight);


        ane.drawAne();
       // fruit.fruitMoniter();


        fruitMonitor(fruit);//监控屏幕上有多少海葵
        fruit.drawFruit(ctx2);

        ctx1.clearRect(0,0,canWidth,canHeight);
        bigFish.drawBig(ctx1, mx, my, bigTail, bigEye, data, bigOrange, bigBlue);


        collision(fruit, bigFish, data, wave);//检查大鱼和果实是否发生碰撞
        collision3(bigFish, liFish, data, halo);//检测大鱼和小鱼之间是否有碰撞


        liFish.drawLi(ctx1, bigFish, babyTail, babyEye, babyBody, data);

        data.drawScore(ctx1, canWidth, canHeight);


        wave.drawWave(ctx1)

        halo.draw(ctx1);

    }, 200)
}





//这两个要熟记
function lerpDistance (aim, cur, ratio){
    var delta = cur-aim;//这是不断的去接近某一个值的函数
    /*
     * cur-aim当前值减去目标值
     * 这个需要记住
     * */
    return aim+delta*ratio;
}

function lerpAngle(a, b, c){
    /*这个是不断的接近某一角度的函数
     * 同样需要记住a是角度差b是当前的角度
     * */
    var d = b-a;
    if(d>Math.PI){d = d-2*Math.PI;}
    if(d<-Math.PI){d = d+2*Math.PI;}
    return a+d*c;
}


