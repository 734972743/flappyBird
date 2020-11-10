/*
 * @Author: your name
 * @Date: 2020-11-08 10:56:27
 * @LastEditTime: 2020-11-08 23:53:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \canvas\flappyBird\assets\js\Game.js
 */
//闭包
(function () {
    var Game = window.Game = function(params) {
        //得到画布
        this.canvas = document.querySelector(params.selecter);
        this.ctx = this.canvas.getContext("2d");
        this.RjsonUrl = params.RjsonUrl;  //图片资源url
        //帧编号
        this.fno = 0;

        // 我们每150帧绘制一个管子
        this.pipeRate = 150; // 管子更新的频率，值越大，更新约慢，游戏约简单，反之相反

        //分数
        this.score = 0;

        //初始化
        this.init();
        
        var self = this; 
        //读取资源 ，这是一个异步函数,所以其他的事情要放在这个异步函数的回调函数中执行
        this.loadAllResource(function () {
            self.start();
        });

    }

    // 游戏初始化
    
    Game.prototype.init = function () {

        // documentElement 和 body 相关说明：
        // body是DOM对象里的body子节点，即 <body> 标签；
        // documentElement 是整个节点树的根节点root，即<html> 标签；

        //得到屏幕的宽度和高度
        var windowW = document.documentElement.clientWidth;
        var windowH = document.documentElement.clientHeight;

        //设置屏幕的最大宽度和高度，让其不能太宽和太高
        if (windowW > 414) {
            windowW = 414;
        } else if (windowW < 320) {
            windowW = 320;
        }

        if (windowH > 736) {
            windowH = 736;
        } else if (windowH < 500) {
            windowH = 500;
        }

        //设置画布的宽度和高度
        this.canvas.width = windowW;
        this.canvas.height = windowH;

        this.bindEvent();
        
    }

    //读取资源
    Game.prototype.loadAllResource = function (callback) {
        //准备一个R对象
        this.R = {};
        var self = this;  //复制this
        //计数器（用于记录图片资源的个数）
        var alreadDoneNumber = 0;

        //使用ajax发送请求，获取资源文件
        var xhr = new XMLHttpRequest();

        //监听请求状态的变化
        xhr.onreadystatechange = function () { 
            if (xhr.readyState === 4) { 
                var Robj = JSON.parse(xhr.responseText);
                // alert(Robj.images.length);

                //遍历图片资源
                var length = Robj.images.length;
                for (let i = 0; i < length; i++) {
                    //创建一个同名的key
                    self.R[Robj.images[i].name] = new Image();
                    //请求图片资源
                    self.R[Robj.images[i].name].src = Robj.images[i].url;
                    //监听
                    self.R[Robj.images[i].name].onload = function () {
                        alreadDoneNumber++;  //

                        //清屏
                        self.clear();
                        //提示文字
                        var text = `正在加载资源${alreadDoneNumber}/${length},请稍等`;
                        //设置文字居中
                        self.ctx.textAlign = "center";   // 注意文字居中的基准点是下面fillText的x,y坐标点
                        self.ctx.font = "20px 微软雅黑";  //设置字体
                        
                        //屏幕的黄金分割点： 0.618
                        self.ctx.fillText(text, self.canvas.width / 2, self.canvas.height * (1 - 0.618));
                        //图片加载完成，
                        if (alreadDoneNumber === length) {
                            callback();  //指定callback回调函数的this为self
                        }
                    
                    }
                }
            }

            
        }

          //发送ajax请求
          xhr.open("get", this.RjsonUrl, true);  //这个参数true 规定请求是否异步处理。
          xhr.send(null); //方法接受一个可选的参数，其作为请求主体；如果请求方法是 GET 或者 HEAD，则应将请求主体设置为 nul
            
    }

    
    //游戏开始
    Game.prototype.start = function () {
        var self = this;

        // this.background = new Background();


        

        
       //Game.js只管理SceneManager这个类
        this.sm = new SceneManager();


        //设置定时器
         this.time = setInterval(() => {
            self.fno++ 
            self.clear();  //清屏

            //更新，渲染场景
            self.sm.render();
            self.sm.update();

            // //创建背景类，并渲染，更新它
            // self.background.render();
            // self.background.update();

            //要后画大地，用大地盖住管子
             //更新，渲染管子
            //  我们每150帧绘制一个管子
        //      if (this.fno % this.pipeRate === 0) {
        //         new Pipe();
        //    }
        //     for (let i = 0; i < this.pipeArr.length; i++){
        //         this.pipeArr[i].render();
        //         this.pipeArr[i].update();
        //     }


        //     //更新，渲染大地
        //     self.land.render();
        //     self.land.update();

        //    //渲染，更新小鸟
        //     self.bird.render();
        //     self.bird.update();

            //渲染分数
             var score_length = self.score.toString().length;
             for (let i = 0; i < score_length; i++){
                 self.ctx.drawImage(self.R["shuzi"+ self.score.toString().charAt(i)], self.canvas.width / 2 - score_length / 2 * 34 + 34 * i, 100);
             }
             
            //  this.sm.render();
            //  this.sm.update();


            //显示帧编号
            self.ctx.fillStyle = "black";
            self.ctx.textAlign = "left";
            self.ctx.fillText("fno:" + self.fno, 20, 20);

        }, 20);
    }

    Game.prototype.clear = function () {
        //清屏
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    }

    //绑定事件
    Game.prototype.bindEvent = function () {

        //当canvas点击事件
        var self = this;
        this.canvas.onclick = function () {
            self.bird.fly();
        }
       
    }

})();