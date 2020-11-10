/*
 * @Author: your name
 * @Date: 2020-11-08 12:39:49
 * @LastEditTime: 2020-11-08 15:23:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \canvas\flappyBird\assets\js\Background.js
 */
(function () {
    var Background = window.Background = function () {
        this.image = game.R.bg_day;
        this.x = 0,
        //如何让背景图片永远处于页面的0.75位置
        // (y + 396) / canvas.height  = 0.75
        this.y = 0.75 * game.canvas.height - 396;
        this.w = 288;  //图片的宽高可以从图片中获取
        this.h = 512;  
        this.speed = 1; //速度
    }

    //背景更新
    Background.prototype.update = function () {
        this.x = this.x - this.speed;
        //当背景图片超过屏幕时，要还原为原来的位置
        if (this.x < -288) {
            this.x = 0;
        }
    }


    //背景图片渲染
    Background.prototype.render = function () {

        

        //渲染天空的猫腻矩形
        game.ctx.fillStyle = "#4ec0ca";
        game.ctx.fillRect(this.x, 0, game.canvas.width + 288  ,this.y);

        //渲染图片
        //利用三张图片来平铺
        game.ctx.drawImage(this.image, this.x, this.y);
        game.ctx.drawImage(this.image, this.x + 288 , this.y);
        game.ctx.drawImage(this.image, this.x + 288 * 2, this.y);

        //渲染图片下面的大地猫腻矩形
        game.ctx.fillStyle = "#ded895";
        game.ctx.fillRect(this.x, this.y + this.h-75, game.canvas.width + 288, game.canvas.height);
    }

})()