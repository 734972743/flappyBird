/*
 * @Author: your name
 * @Date: 2020-11-08 15:12:16
 * @LastEditTime: 2020-11-08 16:07:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \canvas\flappyBird\assets\js\Land.js
 */
/**
 * 大地类
 */
(function(){
    var Land = window.Land = function () {
        this.x = 0;
        this.y = 0.75 * game.canvas.height -15;
        this.w = 336;
        this.h = 112;
        this.speed = 2;  //速度
        this.image = game.R.land;
    }


    Land.prototype.update = function () {
        this.x = this.x - this.speed;
        if (this.x < -336) {
            this.x = 0;
        }
    }

    Land.prototype.render = function () {
        

        //渲染图片
        game.ctx.drawImage(this.image, this.x, this.y);
        game.ctx.drawImage(this.image, this.x + this.w, this.y);
        game.ctx.drawImage(this.image, this.x + this.w * 2, this.y);
    }
})()