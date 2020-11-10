/*
 * @Author: your name
 * @Date: 2020-11-08 16:37:33
 * @LastEditTime: 2020-11-08 21:41:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \canvas\flappyBird\assets\js\Bird.js
 */
/**
 * 小鸟类
 */
(function () { 
    var Bird = window.Bird = function () {
        //鸟的种类
        this.color = parseInt(Math.random() * 3) ;
    
        this.imageArr = [
            game.R[`bird${this.color}_0`],
            game.R[`bird${this.color}_1`],
            game.R[`bird${this.color}_2`]
            
        ]
    
        this.x = game.canvas.width * (1 - 0.618);
        this.y = 100;
    
        this.fno = 0;  //这是小鸟自己的帧编号，
        this.d = 0; //小鸟旋转的角度
    
        this.a = 0.06; //小鸟下落的加速度
        this.v = 1;  //小鸟下落的速度
    
        this.wingStep = 0; // 小鸟翅膀的编号

        
        
    }
    
    Bird.prototype.update = function () {
        this.fno++;

        //小鸟的碰撞检测参数 ,注意： 坐标原点是小鸟中心点
        this.T = parseInt(this.y - 12);
        this.L = parseInt(this.x - 17);
        this.B = parseInt(this.y + 12);
        this.R = parseInt(this.x + 17);
    
        //改变小鸟翅膀扇动
        this.fno % 20 === 0 && this.wingStep++;
        if (this.wingStep > 2) {
            this.wingStep = 0;
        }
    
        
       if (this.fno % 10 === 0 && this.d <= 1.5) {
            this.d += 0.43;
        }
    
        this.v = this.v + this.a ;
    
        this.y += this.v;

        //小鸟掉地上也是输
        if (this.B >= game.land.y) {
            clearInterval(game.time);
        }
    }
    
    Bird.prototype.render = function () {
        
        //渲染小鸟
        game.ctx.save();
        //小鸟图片 48 *48；
        game.ctx.translate(this.x, this.y);
        game.ctx.rotate(this.d);
        game.ctx.drawImage(this.imageArr[this.wingStep], -24, -24);
        game.ctx.restore();
    }

    //小鸟飞翔
    Bird.prototype.fly = function () {
        // alert("fly");
        this.v = - 2;
        if (this.d > 0.5) {
            this.d -= 1.5;
         }
        
    }
})()



    
    
