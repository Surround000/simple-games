/**
 * Created by Administrator on 2016/12/2 0002.
 */
//创建一个canvas对象
var canvas = document.createElement('canvas'),
    ctx = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 480;
document.body.appendChild(canvas);
//载入图片 bgready 用来标识图片是否已经完全载入，只有图片完全载入完成后我们才可以使用它，如果在载入完成前就对其进行绘制和渲染，js会报DOM err的错误
var bgready = false,
    bgImage = new Image();
bgImage.onload = function(){
    bgready = true;
};
bgImage.src = "images/background.png";
var heroready = false,
    heroImage = new Image();
heroImage.onload = function(){
    heroready = true;
};
heroImage.src = "images/hero.png";
var monsterReady = false,
    monsterImage = new Image();
monsterImage.onload = function(){
    monsterReady = true;
};
monsterImage.src = "images/monster.png"
//定义游戏要使用的对象
var hero = {
    speed:256,// 表示英雄的移动速度
    x:0,
    y:0
};
var monster = {
    x:0,
    y:0
};
var monsterCaught = 0;
//处理玩家的输入
var keyDown = {};
addEventListener('keydown',function(e){
    keyDown[e.keyCode] = true;
},false);
addEventListener("keyup",function(e){
    delete  keyDown[e.keyCode];
},false);
//新游戏
var reset = function(){
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
    monster.x = 32 + (Math.random()*(canvas.width-64));
    monster.y = 32 + (Math.random()*(canvas.height-64));
};
//更新对象
var update = function(modifier){
    if(38 in keyDown){
        hero.y -= hero.speed*modifier;
        //console.log(hero.y)
    }
    if(40 in keyDown){
        hero.y += hero.speed*modifier;
    }
    if(37 in  keyDown){
        hero.x -= hero.speed*modifier;
    }
    if(39 in keyDown){
        hero.x += hero.speed*modifier;
    }
    if(
        hero.x <= (monster.x+32)
            && monster.x <= (hero.x+32)
            && hero.y <= (monster.y+32)
            && monster.y <= (hero.y+32)
    ){
        ++monsterCaught;
        reset();
    }
};
//渲染对象
var render = function(){
    if(bgready){
        ctx.drawImage(bgImage,0,0);
    }
    if(heroready){
        ctx.drawImage(heroImage,hero.x,hero.y);
    }
    if(monsterReady){
        ctx.drawImage(monsterImage,monster.x,monster.y);
    }
    ctx.fillStyle = "rgb(250,250,250)";//fillStyle 属性设置或返回用于填充绘画的颜色、渐变或模式
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught"+monsterCaught,32,32)
};
function main(){
    var now = Date.now();
    var delta = now - then;
    update(delta/1000);
    render();
    then = now;
    requestAnimationFrame(main);
}
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var then = Date.now();
reset();
main();
