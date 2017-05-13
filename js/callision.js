/**
 * Created by wlw on 2017/03/09.
 */
//检查大鱼和果实的碰撞
function collision (f, b, db, w){
    if(!db.gameOver){

        for(var i = 0;i<f.num;i++){
            if(f.alive[i]){
                var l = collision2(f.x[i], f.y[i], b.x, b.y)
                if(l < 900){
                    f.dead(i);
                    b.bigBodyCount++//当与果实相碰撞的时候帧数加一
                    if( b.bigBodyCount > 7 ){
                        b.bigBodyCount = 7;//如果大于7，那么帧数就等于7
                    }
                    db.fruitNum++;
                    if(f.fruitType[i] =="blue"){
                        db.double = 2;
                    }
                    w.born(f.x[i], f.y[i]);
                    /*
                    * 两个物体池之间，一个物体池想要使用另一个物体池的坐标
                    * 只需要遍历另一个物体池每个物体的坐标传进另一个物体池就行
                    * 就好像wave想要使用fruit的坐标就要先遍历fruit的每一个
                    * fruit的坐标，然后作为参数传给wave，wave得到之后，再遍历
                    * 自己然后单个fruit赋值给单个wave
                    *
                    * */
                }
            }


        }
    }
}



//检查大鱼和小鱼是否发生了碰撞

function collision3 (b, lf, db, hl){
    if(!db.gameOver){//当游戏没有结束的时候才能发生碰撞
        var l = collision2(b.x, b.y, lf.x, lf.y)
        if(db.fruitNum != 0){//当大鱼有吃到果实的时候才能碰撞
            if(l < 900){
                lf.bodyCount = 0;
                b.bigBodyCount = 0;//这个是判断如果和小鱼相碰，那么就变回原始状态
                db.score();
                hl.born(lf.x, lf.y);
            }
        }
    }
}

function collision2(x1, y1, x2, y2){//这是获得两者之间距离的平方
    return Math.pow(x1-x2, 2)+Math.pow(y1-y2, 2);
}




