/*
 * @Author: your name
 * @Date: 2020-11-08 15:24:39
 * @LastEditTime: 2020-11-08 22:23:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \canvas\flappyBird\assets\js\Pipe.js
 */
/**
 * 管子类
 */
(function () {
    var Pipe = window.Pipe = function () {
        this.imageUp = game.R["pipe_up"];
        this.imageDown = game.R["pipe_down"];

        this.height1 = 100 + parseInt(Math.random() * 221);  //上管子的高度
        this.x = game.canvas.width;
        this.interspace = 120; //两根管子之间的间隙

        //下管子的高度
        this.height2 = 0.78 * game.canvas.height - this.interspace - this.height1;

        this.speed = 2;

        this.isAlreadyPass = false;  // 判断小鸟是否已经通过这跟管道

        game.sm.pipeArr.push(this);  //把管子放入到管子数组中


    } 

    Pipe.prototype.update = function () {
        this.x = this.x - this.speed;
        //管子的碰撞检测参数 ,注意： 
        this.B = parseInt(this.height1);  //下管子
        this.L = parseInt(this.x);
        this.T = parseInt(this.height1 + this.interspace);   //上管子
        this.R = parseInt(this.x + 52);

        //管子与小鸟进行碰撞检测
        if (this.x < game.bird.R && this.x + 52 > game.bird.L) {  //判断小鸟进入管道中间
            if(this.B > game.bird.T  || this.T < game.bird.B ){
                //碰上了
                clearInterval(game.time);
            } 
        }
        
        //小鸟通过管道
        if (game.bird.L > this.R && !this.isAlreadyPass) {
            this.isAlreadyPass = true;
                    game.score++;  //分数加1
        }

        
        



        if (this.x < -52) {
            //要销毁这个管子
            for (let i = 0; i < game.pipeArr.length; i++){
                if (game.pipeArr[i] == this) {
                    game.pipeArr.splice(i,1);
                }
            }
        }
    }
    
    Pipe.prototype.render = function () {
        //绘制上管子
        game.ctx.drawImage(this.imageDown, 0, 320-this.height1, 52, this.height1, this.x, 0, 52, this.height1);
        
        //绘制下管子
        game.ctx.drawImage(this.imageUp, 0, 0, 52, this.height2, this.x, this.height1 + this.interspace, 52, this.height2);
    }
})()