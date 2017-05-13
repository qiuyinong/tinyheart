/**
 * Created by wlw on 2017/03/07.
 */
//创建一个池子存放创建的果实
var num = 0;//num用来计数alive=true的个数
function Fruit (canHeight, ane) {
    this.alive = [];//判断果实是否在canvas之外，也就是存活
    this.x = [];//果实的出生位置
    this.y = [];
    this.l = [];//这是使果实慢慢长大
    this.spd = [];//这是定义果实上浮的速度
    this.fruitType = [];//保存图片的类型
    this.moniterNum = 0;
    this.canHeight = canHeight;
    this.ane = ane;
    this.lastTime = 0;
    this.fruit = new Image();
    this.blue = new Image();
}
Fruit.prototype = {
    num: 30,
    init: function(){
        for(var i = 0;i<this.num; i++){
            this.alive[i] = false;//每一个果实都是没有出去的，是存在的
            this.spd[i] = Math.random()*30+0.6;
            this.fruitType[i] ='';
        }
        this.fruit.src = "./src/fruit.png"//这是引进图片
        this.blue.src = "./src/blue.png"
        //console.log(this.fruit)
    },
    drawFruit: function(ctx2){
     //是在海葵上绘画的，所以应该知道海葵的位置
           for(var i = 0;i<this.num; i++) {
               if (this.alive[i]) {//这是判断海葵是否是活着，活着才绘制
                   if (this.l[i] <= 14) {//这是判断海葵是否长大到指定的数字
                       this.l[i] += 0.01 * 200;//缓慢成长

                   } else {
                       this.y[i] -= this.spd[i];//这是改变绘画的坐标使果实上浮
                   }
                   //
                   //
                   if(this.fruitType[i] == "blue"){
                       var pic = this.blue;
                   }else if(this.fruitType[i] == "orange"){
                       var pic = this.fruit;
                   }//这是判断pic是等于橙色的果实还是蓝色的果实
                   ctx2.drawImage(pic, this.x[i] - this.l[i] / 2, this.y[i] - this.l[i] / 2, this.l[i], this.l[i]);
                  //
                 //
                   
               
               }
               //绘画的时候宽度和高度是在不断地发生着变化
               if(this.y[i]<10){//判断海葵是否出去
                   num-=1;//出去的同时num减一
                   this.alive[i] = false;//出去生命为false
               }
           }
           },
    born: function(i){
        //这是获得果实出生的位置
        var aneID = Math.floor(Math.random()*this.ane.num);//随机的获得到海葵的位置
        this.x[i] = this.ane.rootx[aneID];//这是获得绘画的时候的位置
        this.y[i] = this.ane.heady[aneID]
        this.l[i] = 0;//果实每次出生的时候为0
        this.alive[i] = true;
        //
        //这是判断海葵类型出现的概率
        var ran = Math.random();
        if(ran<0.2){
            this.fruitType[i] = "blue";
        }else{this.fruitType[i] = "orange";
        }
        //
        //
    },
    dead: function(i) {

        this.alive[i] = false;


    }
};
//现在判断屏幕上的海葵是否是十五个
function fruitMonitor (f){
    for(var i = 0; i<f.num; i++){
        if(f.alive[i]){
            if(num<15){//如果不进行判断num会无限的加上去
                num++
            }
        }
        if(num<15){
            sendFruit(f);
            return;
        }
    }
}
function sendFruit (f){
    for(var i = 0; i<f.num; i++){
        if(!f.alive[i]){
            f.born(i);
            return;
        }
    }
}
