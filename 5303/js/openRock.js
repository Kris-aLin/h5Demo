// window.onload = function(){
    var oTuo = document.getElementsByClassName("hand2");
   let test = document.getElementById('test'); 
      //获取图片
      let walkImg = document.getElementById('walk'); 
      let _w = document.body.offsetWidth;
      let _h = document.body.offsetHeight;

      // let _w = window.screen.width;
      // let _h = window.screen.height;
      //  alert(document.body.offsetWidth+'----'+document.body.offsetHeight)
      //  alert(window.screen.Width+'----'+window.screen.height)
      let _rr = (_w/_h).toFixed(2);
      let moveDis = 1;
      if(_rr>0.45&&_rr<=0.5){
          $("#walk").attr('src','./img/IX.png');
          moveDis = 5;
      }
      
      //获取绘图上下文
      let canvas = document.getElementById('canvas')
      canvas.width = document.body.offsetWidth;
      canvas.height = document.body.offsetHeight;
      
      let ctx = canvas.getContext('2d');
      //这个参数是用来标识，现在改用哪个用作，初始值是4，图片最有边的动作，开始行走的动作。取值是4~0，循环
      let index = 0;
      //运动方向，true代表从下至上， false代表从上至下
      let direct = false;
  
      //定时器，确保图片加载完成再绘制动画
      let timer = null;
      var startX = 0;
      var startY = 0;
      let out = document.getElementById('out'); //开盅按钮隐藏
      // let _top = $("#test").css("top");
      // var _top1=parseInt(_top.split("px")[0]);
  for(var i = 0;i < oTuo.length; i++)
  {
      let top= 150
  //手指触摸开始， 记录的初始位置
  oTuo[i].addEventListener("touchstart",function(evt)
  
  {     
    //  document.getElementById('upArrow').style.display = 'none'
      //手指触摸开始的时候改变样式
         var e = window.event || evt;
          //手指触摸初始位置
          var touch = e.targetTouches[0];
          _startX = touch.pageX;
          _startY = touch.pageY;
          startX = touch.pageX;
          startY = touch.pageY;
          //手指触摸点
      // oL = touch.pageX - this.offsetLeft;
          oT = touch.pageY - this.offsetTop;
     //阻止默认事件
            //  e.preventDefault();
  },false)
  let aaa=null;
  //拖动中的，位置记录
  oTuo[i].addEventListener("touchmove",function(evt)
  {       console.log('拖动')
     // clearTimeout(aaa);
          out.style.display = 'none';
          var e = window.event || evt;
          console.log(e.touches.length,e)
          if (e.touches.length > 1 || e.scale && e.scale !== 1) return;//防止多根手指滑动
          //手指拖动位置
          var touch = e.targetTouches[0];
  
  
          var endX = touch.pageX;
          var endY = touch.pageY;
          //获取和上一次的滑动距离
          var distanceX = endX-startX;
          var distanceY = endY-startY;
          //初始值的滑动距离
         // var _distanceX = endX-startX;
          var _distanceY = endY-_startY;
         
          // if(Math.abs(distanceY)>2.5){
              // if (direct) {
              //     index -=1 ;
              // }else{
              //     index += 1;
              // }
              // if (index < 0) {
              //     index =0;
              // }
              // if(index>19){
              //     index = 19;
              // }    
          // }    
          //判断滑动方向
          if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX>0){
             // console.log('往右滑动');
          }else if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX<0){
             // console.log('往左滑动');
          }else if(Math.abs(distanceX)<Math.abs(distanceY) && distanceY<0){
              direct = false;
              if (direct) {
                  index -=1 ;
              }else{
                  index += 1;
              }
              if (index < 0) {
                  index =0;
              }
              if(index>17){
                  index = 17;
              }    
             // console.log('往上滑动');
          }else if(Math.abs(distanceX)<Math.abs(distanceY) && distanceY>0){
              direct = true;
              if (direct) {
                  index -=1 ;
              }else{
                  index += 1;
              }
              if (index < 0) {
                  index =0;
              }
              if(index>17){
                  index = 17;
              }    
              //console.log('往下滑动');
          }else{
             // console.log('点击未滑动');
          }
          //手指拖动位置    -  手指触摸开始
          //	var oLeft = touch.pageX - oL;
          var oTop = touch.pageY - oT;
          startX = endX; //上次滑动的位置
          startY = endY; //
          //阻止默认事件
        //  e.preventDefault();
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          addWalk();
          this.style.opacity= 1;
  },false);
  
  let timer11=null;
  //触摸结束时的处理
  oTuo[i].addEventListener('touchend', function(evt)
      { 
          //clearTimeout(aaa);
          out.style.display = 'inline';
          var e = window.event || evt;
         // e.preventDefault();//阻止其他事件S
          //手指触摸结束的时候改变样式
           direct = true;
           index =0;
           ctx.clearRect(0, 0, canvas.width, canvas.height);
           addWalk();
          //  document.getElementById('upArrow').style.display = 'inline'
         
  },false)
  }
      var isMobile = {
          Android: function () {
              return navigator.userAgent.match(/Android/i);
          },
          BlackBerry: function () {
              return navigator.userAgent.match(/BlackBerry/i);
          },
          iOS: function () {
              return navigator.userAgent.match(/iPhone|iPad|iPod/i);
          },
          Opera: function () {
              return navigator.userAgent.match(/Opera Mini/i);
          },
          Windows: function () {
              return navigator.userAgent.match(/IEMobile/i);
          },
          any: function () {
              return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
          }
      };
      var isPhone = isMobile.any();
        if (isPhone) {
          //如果是手机访问，将canvas大小设为网页可见的大小，乘以0.96是为了四边留些空隙
          //   canvas.width = parseInt(document.body.offsetWidth * 0.96);
          //   canvas.height = parseInt(document.body.offsetHeight * 0.96);
  
          // canvas.width = document.body.offsetWidth;
          // canvas.height = document.body.offsetHeight;
          // canvas.width = 375;
          // canvas.height = 667;
        } else {
          //   canvas.width = 300;
          //   canvas.height = 500;
        }
  
      //确保图片加载完成再绘制到
      if (!walkImg.complete) {
        timer = setInterval(() => {
          //两张图片加载完成
          if (walkImg.complete) {
            //清除定时器
            clearInterval(timer);
            timer = null;
            //绘制
            drawAll();
          }
        }, 200);
      } else {
        drawAll();
      }
  
      function drawAll() {
        //清除原来的图层
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        //添加初始动作
        addWalk();
        //使用定时器，不断重绘画面，形成动画
      //   setInterval(() => {
      //     ctx.clearRect(0, 0, canvas.width, canvas.height);
      //     addWalk();
      //   }, 1000);
      }
       //添加不同位置图片
      function addWalk() { 
        ctx.save();
      //  console.log('图片大小',walkImg.width,walkImg.height);
      //   walkImg.width = canvas.width;
      //   walkImg.height = canvas.height*10;
        let imgW = walkImg.width;
        let imgH = walkImg.height/18;
        
  
       // console.log('图片大小2222',walkImg.width,walkImg.height);
      //   let selfImgW = canvas.width;
      //   let selfImgH = (canvas.height*imgW)/canvas.width;
      //   console.log('图片大小',selfImgW,walkImg.height);
      let movePostion = (walkImg.height/18)*index;
      // console.log('movePostion----------------',movePostion)
        /**
         * 行走分为两个方向，从左至右和从右至左，我们分别说明
         * 1、从右至左：图片资源的5个动作就是从右至左方向走的，所以从右至左行走时，无需
         * 额外处理图片，只需将对应动作放在规定位置即可。
         * 
         * 2、从左至右：这与图片资源的工作方向相反，所以，提取动作后，需要翻转（利用scale进行翻转）。
         * */
        //根据index不同，从图片资源中提取不同的行走动作
        // let _top2 =  _top1+index*moveDis;
        // test.style.setProperty('top', _top2+'px', 'important');
        if(index==0){
          ctx.drawImage(walkImg, 0, 0, imgW, imgH, 0, 0, canvas.width, canvas.height);
        }else{
          ctx.drawImage(walkImg, 0, movePostion, imgW, imgH, 0, 0, canvas.width, canvas.height);
        }
       
        ctx.restore();
      }
  
  //图片移动位置
      function handleMovePostion(){
        let imgW = walkImg.width;
        let imgH = walkImg.height/18;
        let movePostion = (walkImg.height/18)*index;
        // let _top2 =  _top1+index*moveDis;
        // test.style.setProperty('top', _top2+'px', 'important');
        if(index==0){
          ctx.drawImage(walkImg, 0, 0, imgW, imgH, 0, 0, canvas.width, canvas.height);
        }else{
          ctx.drawImage(walkImg, 0, movePostion, imgW, imgH, 0, 0, canvas.width, canvas.height);
        }
       
      }
  
      //开盖的功能
      let open_time = null;
      let restart = document.getElementById('restart'); //重新开始按钮
      let handleCanvas = document.getElementById('handleCanvas'); //画布
      let topOpen = document.getElementById('topOpen');//开盖后的图片
      let hand = document.getElementById('hand');//摇一摇的图片

    
      out.style.zIndex = 886;
  
      let rock = document.getElementById('rock'); //重新开始按钮
      let resultPoints = document.getElementById('resultPoints')
      // let upArrow = document.getElementById('upArrow'); //画布
    //   let btnX = $(".button").css("margin-left");
    //   let btnY = $(".button").css("margin-top");
    //   let btnW = $(".button").css("width");
    //   let btnH = $(".button").css("height");
    //   console.log(3333333333333333333)
    //   var rect={x:130,y:40,w:130,h:50};//定义要画的矩形的位置属性
    //   var rect={x:btnX,y:btnY,w:btnW,h:btnH};//定义要画的矩形的位置属性
  
    //   ctx.fillStyle="transparent";
    //   ctx.fillStyle="9999";
    //   ctx.fillRect(130,40,130,50);//绘制矩形（就是开盅的按钮位置）
    //  // ctx.fillRect(rect.x,rect.y,rect.w,rect.h);//绘制矩形（就是开盅的按钮位置）
      
    //   canvas.onclick=function(e){
    //     e=e||event;//获取事件对象
    //     //获取事件在canvas中发生的位置
    //     var x=e.clientX-canvas.offsetLeft;
    //     var y=e.clientY-canvas.offsetTop;
    //     //如果事件位置在矩形区域中
    //     if(x>=rect.x&&x<=rect.x+rect.w&&y>=rect.y&&y<=rect.y+rect.h){//就是开盅的按钮位置
        
    //       out.style.display = 'none';
  
    //       index = 0;
    //       //运动方向，true代表从下至上， false代表从上至下
    //       direct = false;
    //        //清除原来的图层
    //       ctx.clearRect(0, 0, canvas.width, canvas.height);
    //       //添加初始动作
    //       openMove();
    //       points();
    //       //使用定时器，不断重绘画面，形成动画
    //       open_time = setInterval(() => {
    //           ctx.clearRect(0, 0, canvas.width, canvas.height);
    //           openMove();
    //         }, 50);
    //       }
    //   } 

      function outMovePostion(){
          out.style.display = 'none';
  
          index = 0;
          //运动方向，true代表从下至上， false代表从上至下
          direct = false;
           //清除原来的图层
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          //添加初始动作
          openMove();
          points();
          //使用定时器，不断重绘画面，形成动画
          open_time = setInterval(() => {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            openMove();
            
            }, 50);
          
      } 

      //开盅 动画
      function points(){
        let totalNum = 0;
        // let dices = $("#test").children($(".dice"));
        let html='';
        let diceArrary = [];
        let dices = document.getElementsByClassName("dice");
        for(var i = 0;i<dices.length;i++){
            let dice = dices[i].src;
            var arr= dice.split("imgs/");
            let str=arr[1].substring(1,2); // or str=str.Remove(0,str.Length-i);
            totalNum = totalNum+parseInt(str);
            diceArrary.push(parseInt(str))
            
        }
        var countedNames = diceArrary.reduce(function (allNames, name) { 
          if (name in allNames) {
            allNames[name]++;
          }
          else {
            allNames[name] = 1;
          }
          return allNames;
        }, {});
        for(var key in countedNames){
          // html += "" + key + " 點 個 數：<span>" + countedNames[key] + "</span><br>";
          
          if (key == 1) $("#count-one").text(countedNames[key]  );
          if (key == 2) $("#count-two").text(countedNames[key] );
          if (key == 3) $("#count-three").text(countedNames[key] );
          if (key == 4) $("#count-four").text(countedNames[key] );
          if (key == 5) $("#count-five").text(countedNames[key] );
          if (key == 6) $("#count-six").text(countedNames[key] );
        }
     //   html += "您 擲 的 總 點 數：<span>" + totalNum + "</span><br>"  
        $("#count-total").text(totalNum + "點");
      //  document.querySelector("#resultPoints").innerHTML = html;
      }
       
       
      function openMove() {
        console.log('222222222222222222')
        ctx.save();
        handleMovePostion();
        index += 1;
        if(index>17){
          clearInterval(open_time);
            $("#footerFlex2").css({"display":"flex"});
        $(".sumbox").css({ "display": "flex" });
        $(".setting").hide();
          restart.style.display = 'inline'; //重新开始按钮显示
          let top = parseInt(($("#test").css("top")).replace("px","")-70)+'px';
          restart.style.top = top; //重新开始按钮显示
           restart.style.zIndex = 999; //重新开始按钮显示
         

          topOpen.style.display = 'inline';
          topOpen.style.zIndex = 888;

          // let w = document.body.offsetWidth;
          // let h = document.body.offsetHeight;

          // if(_rr>0.45&&_rr<=0.50){
          //   $("#topOpenI").attr('src','./img/IX_20.png')
          // }
          // $("#topOpenI").css("height", document.body.offsetHeight)
          // $("#topOpenI").css("width", document.body.offsetWidth)  
         // handleCanvas.style.display = 'none';
          // upArrow.style.display = 'none';

          resultPoints.style.display = "inline";
          resultPoints.style.zIndex = 887;
         

        
        

        }
        ctx.restore();
      }

    
    //重新开始的动画
    let re_timer = null;
      function restartMove(){
        handleCanvas.style.display = 'inline';
        index = 19;
        //运动方向，true代表从下至上， false代表从上至下
        direct = true;
          //清除原来的图层
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //添加初始动作
        closeMove();
        //使用定时器，不断重绘画面，形成动画
        re_timer = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            closeMove();
          }, 20);
      }
      function closeMove() {
        ctx.save();
        handleMovePostion();
      
        index -= 1;
        if(index<0){
          clearInterval(re_timer)
          handleCanvas.style.display = 'none';
          hand.style.display = 'inline';
          resultPoints.style.display = "none";
          rock.style.display = 'inline';
          createBubble(5)
          
        }
        ctx.restore();
      }

      
  
  // }