window.onload = function(){

    function audioAutoPlay(id){
        var audio = document.getElementById(id),  
        play = function(){  
            audio.play();  
            audio.pause();//一開始加載是，不要播放
            audio.currentTime = 0;
            document.removeEventListener("touchstart",play, false);  
        };  
        // audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {  
            play();  
        }, false);  
        document.addEventListener('YixinJSBridgeReady', function() {  
            play();  
        }, false);  
        document.addEventListener("touchstart",play, false);  
    }
    audioAutoPlay('music1'); 
    var audio = document.getElementById('music1'); 
        //audio.currentTime = 0;
        // setTimeout(()=>{
        //     navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
        //     if(navigator.vibrate) {
        //         console.log("支持设备震动！");
        //     }

        // },1000);

    function rbf(){
        var audio = document.getElementById('music1'); 
        audio.currentTime = 0;
    }
    function bf(){
        var audio = document.getElementById('music1'); 
        if(audio!==null){             
            //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
            audio.play();
            if(audio.paused)                     {                 
            audio.play();//audio.play();// 这个就是播放  
        }else{
            //audio.pause();// 这个就是暂停
        }
    } 
}

    var SHAKE_THRESHOLD = 800;
    var last_update = 0;
    var x = y = z = last_x = last_y = last_z = 0;

    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
        alert('本设备不支持devicemotion事件');
    }

    function deviceMotionHandler(eventData) {
        var acceleration = eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        if ((curTime - last_update) > 100) {
            var diffTime = curTime - last_update;
            last_update = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
           // var status = document.getElementById("status");
            if (speed > SHAKE_THRESHOLD) {
                document.getElementById("hand").className="hand";
                doResult();
            }
            last_x = x;
            last_y = y;
            last_z = z;
        }
    }
    var isRun = true;
    var time = null;

    var rockFun = function(){
        $("#rock").hide();
         $(".setting").hide();
        clearTimeout(time);
        time = setTimeout(function(){
            startHand();
        },200);
       // $("#rock").unbind("click", rockFun); // ... 再也不会被触发 foo
     
    };
    $("#rock").click(rockFun);

    var confirmFun = function(){ 
        $("#confirm").hide();
       
        clearTimeout(time);
        time = setTimeout(function(){
        //$("#confirm").unbind("click", confirmFun); // ... 再也不会被触发 foo
        isRun = false;
        $("#out").show();
      
       
        $("#hand").hide();
        $("#handleCanvas").show();
    },500);
        // $("#upArrow").show();

    };

    $("#confirm").click(confirmFun);

    var outFun = function(){
        $("#out").hide();
      
        clearTimeout(time);
        time = setTimeout(function(){

       // $("#out").unbind("click", outFun); // ... 再也不会被触发 foo
        
     //   $("#restart").show();
        outMovePostion()
    },500);
      //  $("#handleCanvas").hide();
       // $("#hand").slideUp(200); 
    }
    $("#out").click(outFun);

    var restartFun= function(){

        $("#restart").hide();
        clearTimeout(time);
        time = setTimeout(function(){
       // $("#restart").unbind("click", outFun); // ... 再也不会被触发 foo
        isRun = true;
        $("#out").hide();
      
        $("#confirm").hide();
        $("#topOpen").hide();
       // $("#rock").show();
        restartMove();
        },500);
        //$("#hand").slideDown(100);
    }
    $("#restart").click(restartFun);
    //start();
    var sIndex = 0;
    function startHand()
    {
       setTimeout(function(){
            sIndex++;
            if(sIndex>=10)
            {
                sIndex=0;
                return;
            }
            doResult();
            startHand();
        },200);
    }
    var index = 0;
    var aaa = "";
    var ddd= "";
    function doResult() {
        if(!isRun)
        {
            $("#test").show();
            return;
        }
        $("#test").hide();
        clearTimeout(aaa);
        clearTimeout(ddd);
        index++;
        aaa =  setTimeout(function(){
            index=0;
            $("#test").show();
        },2000); 

        if(index <= 2)
        {
            return;
        }

        clearTimeout(ddd);
        TEST();
        document.getElementById("hand").className="hand hand-animate";
        if(audio.currentTime == 0 || audio.currentTime >= 1.1){
            // navigator.vibrate(0);
            // navigator.vibrate(800);
            audio.currentTime = 0.1;
            audio.play();
        }
        ddd = setTimeout(function(){
            $("#rock").hide();
            $("#confirm").show();
            $("#test").show();
            audio.currentTime = 0;
            audio.pause();
            //navigator.vibrate(0);
            document.getElementById("hand").className="hand";
            stop()
        }, 800);
    }
}