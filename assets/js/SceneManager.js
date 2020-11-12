/*
 * @Author: your name
 * @Date: 2020-11-10 22:10:27
 * @LastEditTime: 2020-11-11 01:28:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \canvas\flappyBird\assets\js\SceneManager.js
 */

(function () {
    var SceneManager = window.SceneManager = function(){
        //场景编号:  1:表示游戏开始界面； 2:游戏教程：  3：游戏中   4: 游戏结束
         this.sceneNumber = 1;  
     
         //生成一个背景类
         this.background = new Background();
         
         //用管子数组来接纳管子
         this.pipeArr = new Array();
     
     
         this.land = new Land();
     
        this.bird = new Bird();
        
        this.logoY = -48;

        this.playBtnX = game.canvas.width / 2 - 58;
        this.playBtnY = game.canvas.height + 70;

        this.tutorialOpacity = 1; //教程透明度
     }
     
     
     SceneManager.prototype.update = function () {
         
         switch (this.sceneNumber) {
             case 1:
                //  this.background.update();
                  //更新，渲染大地
                //  this.land.update();
                 
                 if (this.logoY <= 160) {
                    this.logoY++;
                 }

                 if (this.playBtnY >= 320) {
                     this.playBtnY = this.playBtnY -2;
                 } else {
                     //只有按钮图标停止后，才让点击按钮
                     this.bindEvent();
                 }

                 //渲染鸟
                 this.bird.y = 270;
                 this.bird.x = game.canvas.width / 2 ;
                 
                 break;
             
             case 2:
                 if (game.fno % 10 === 0) { 
                    this.tutorialOpacity -= 0.1;
                 }
                 if (this.tutorialOpacity <= 0) {
                     this.tutorialOpacity = 1;
                 }

                 break;
             
             case 3:
                this.background.update();
                //更新，渲染大地
                this.land.update();
                 
                this.bird.update();

                //渲染，更新小鸟
                this.bird.update();
                
                //   要后画大地，用大地盖住管子
                //   更新，渲染管子
                //   我们每150帧绘制一个管子
                if (game.fno % game.pipeRate === 0) {
                     new Pipe();
                }
                 for (let i = 0; i < this.pipeArr.length; i++){
                    this.pipeArr[i].update();
                 }
                 break;
         }
            
     }
     
    
    //场景渲染的时候
     SceneManager.prototype.render = function () {
         
         switch (this.sceneNumber) {
             case 1:
                 //渲染背景
                 this.background.render();
     
                  // 渲染大地
                 this.land.render();

                 this.bird.render();

                //渲染logo图片
                 game.ctx.drawImage(game.R.logo, game.canvas.width / 2 - 89, this.logoY); 
                 
                 //渲染开始按钮
                 game.ctx.drawImage(game.R.button_play ,this.playBtnX , this.playBtnY);
                 break;
             
             case 2:
                 //渲染背景
                 this.background.render();
     
                 // 渲染大地
                 this.land.render();

                 //渲染小鸟
                 this.bird.render();

                 //绘制教程动画化
                 game.ctx.save();
                 game.ctx.globalAlpha = this.tutorialOpacity;  //设置透明度
                 game.ctx.drawImage(game.R.tutorial, game.canvas.width / 2 - 57, 320);
                 game.ctx.restore();


                 break;
             
             case 3:
                 //渲染背景
                 this.background.render();
     
                 
 
                 //渲染小鸟
                 this.bird.render();

                //渲染管子数组
                 for (let i = 0; i < this.pipeArr.length; i++){
                    this.pipeArr[i].render();
                 }
                 
                 //渲染分数
                var score_length = game.score.toString().length;
                for (let i = 0; i < score_length; i++){
                    game.ctx.drawImage(game.R["shuzi"+ game.score.toString().charAt(i)], game.canvas.width / 2 - score_length / 2 * 34 + 34 * i, 100);
                 }
                 
                 if (game.score >= 10) {
                     game.checkpoint = 2;

                 } else if (game.score >= 20) {
                     checkpoint = 3;
                 }else if (game.score >= 30) {
                    checkpoint = 4;
                }else if (game.score >= 50) {
                    checkpoint = 5;
                }else if (game.score >= 70) {
                    checkpoint = 6;
                }

                 
                 // 渲染大地
                 this.land.render();
                 
                 break;
             
             case 4:
                
                 //渲染背景
                 this.background.render();
     
                 // 渲染大地
                 this.land.render();
 
                 //渲染小鸟
                 this.bird.render();

                  //渲染分数
                var score_length = game.score.toString().length;
                for (let i = 0; i < score_length; i++){
                    game.ctx.drawImage(game.R["shuzi"+ game.score.toString().charAt(i)], game.canvas.width / 2 - score_length / 2 * 34 + 34 * i, 100);
                 }
                 
                 game.ctx.drawImage(game.R.game_over, game.canvas.width / 2 - 102 , 360);
                 break;
          }
     
     
         
     
         
     
        
     
    }  
    

    //场景绑定事件
    // 监听套switch
    SceneManager.prototype.bindEvent = function () {
        var self = this;
        //canvas监听事件
        game.canvas.onclick = function (e) {
            //鼠标xy坐标
            let mouseX = e.clientX;
            let mouseY = e.clientY;
            // console.log("bindEvent",mouseX, mouseY);
            switch (self.sceneNumber) {
                case 1:
                    //点击开始按钮
                    //4点定位
                    if (mouseX > self.playBtnX && mouseX < self.playBtnX + 116 && mouseY > self.playBtnY && mouseY < self.playBtnY + 70) {
                        //开始游戏
                        self.enter(2);
                    }
                    break;
                case 2:
                    self.enter(3);
                    break;
                
                case 3:
                    //小鸟可以飞
                    self.bird.fly();
                    break;
                
                case 4:
                    self.enter(3);
                    break;
            }
        }

        
    }

    //场景进入函数
    SceneManager.prototype.enter = function (number) {
        this.sceneNumber = number;
        switch (number) {
            case 1:
                
                this.logoY = -48;
                this.playBtnY = game.canvas.height + 5;
                break;
            
            case 2:
                this.logoY = -48;
                this.playBtnY = game.canvas.height + 5;
                break;
            
            case 3:
                
                break;
            
            case 4:
                //游戏中的所有的数据要清零
                game.score = 0;
                this.bird.y = 270;
                this.bird.d = 0;
                this.pipeArr = [];
                this.bird.v = 1;

                break;
            
        }
    }
})();
