/**
 * Created by wlw on 2017/03/06.
 */
function draBg (canWidth, canHeight){
    var bacPic = new Image();//声明背景图片
    bacPic.src = "src/background.jpg";//注意不用向上级查找
    //函数之中用得到什么变量，如果不声明的话，就以参数的形式传进来
    //不要理所当然的以为不声明也不传参数函数自己就会使用全局变量
    ctx2.drawImage(bacPic, 0, 0,canWidth, canHeight);
}