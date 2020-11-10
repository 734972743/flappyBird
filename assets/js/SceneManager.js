var SceneManager = window.SceneManager = function(){
      

    //生成一个背景类
    this.background = new Background();
    
    //用管子数组来接纳管子
    this.pipeArr = new Array();


    this.land = new Land();

    this.bird = new Bird();
}


SceneManager.prototype.update = function(){
    this.background.update();

    //   要后画大地，用大地盖住管子
    //   更新，渲染管子
    //   我们每150帧绘制一个管子
           if (game.fno % game.pipeRate === 0) {
                new Pipe();
           }
            for (let i = 0; i < this.pipeArr.length; i++){
                this.pipeArr[i].update();
            }


            //更新，渲染大地
            this.land.update();

           //渲染，更新小鸟
           this.bird.update();
}


SceneManager.prototype.render = function(){

    //渲染背景
    this.background.render();

    for (let i = 0; i < this.pipeArr.length; i++){
        this.pipeArr[i].render();
    }

    // 渲染大地
    this.land.render();

    //渲染小鸟
    this.bird.render();

}