//var obj = $(function(){
    let w = document.body.offsetWidth;
    let h = document.body.offsetHeight;

    // let w = window.screen.width;
    // let h = window.screen.height;


    let rr = (w/h).toFixed(2);

    let handIH = ($("#handI").css("height")).replace("px","");
    // if(rr>0.45&&rr<=0.47){
    if(rr>0.45&&rr<=0.5){
        handIH = 812;
        $("#handI").attr('src','./img/IX_01.png')
    }
    // let hh = (document.body.offsetHeight/handIH).toFixed(4);

    let hh = (window.screen.availHeight/handIH).toFixed(2);
    let testT = ($("#test").css("top")).replace("px","");
    let testTop = parseInt(testT*hh);
  
    // $("#handI").css("height",document.body.offsetHeight);
    // $("#handI").css("width",document.body.offsetWidth);

    $("#handI").css("height",window.screen.availHeight);
    $("#handI").css("width",window.screen.availWidth);

    $("#test").css("top",testTop);
    
    if(rr>0.45&&rr<=0.5){
        $(".button").css("top",testTop+100);
    }else{
        $(".button").css("top",testTop+50);
    }
    
    let diceSizeW = ($('.diceSize').css('width')).replace("px","");
    let diceSizeH = ($('.diceSize').css('height')).replace("px","");
    let diceNum = 6;
    let initTotal = 0;

    createBubble(diceNum); //随机生成div
    function createBubble(num){

        var iconWidth =parseInt(diceSizeW)+3;  //值越大，元素左右间隔越大
        var iconHeight = parseInt(diceSizeH)+3;  //值越大，元素上下间隔越大
    //     if(w<=320){
    //         var iconWidth = 55;   //值越大，元素左右间隔越大
    //         var iconHeight = 55;  //值越大，元素上下间隔越大
    //     }else if(w<375){
    //         var iconWidth = 60;   //值越大，元素左右间隔越大
    //         var iconHeight = 60;  //值越大，元素上下间隔越大
    //    }else{
    //         var iconWidth = 65;   //值越大，元素左右间隔越大
    //         var iconHeight = 65;  //值越大，元素上下间隔越大
    //    }

        var targetHeight = $("#test").height();
        
        var targetWidth = $("#test").width();
        var _tmpArray = [];
        var html = '';
        //当放置的元素的宽高大于浏览器窗口的宽高时，直接返回
        if(targetWidth < iconWidth || targetHeight < iconHeight){
            return false;
        }
        var xNum = parseInt(targetWidth / iconWidth, 10);    //用浏览器的宽度除以一个元素的宽度可算出浏览器窗口内一行可以放置元素的个数
        var yNum = parseInt(targetHeight / iconHeight, 10);  //用浏览器的高度除以一个元素的高度可算出浏览器窗口内一列可以放置元素的个数
        var allNum = xNum * yNum;   //浏览器窗口内总共可以放置元素的个数
        //当需要放置的元素的个数超过浏览器窗口内总共可以放置的元素的个数时，则返回
        if(num >= allNum){
            return false;
        }        
        for(var i = 0; i < allNum; i++){
            _tmpArray.push(i);
        }
        var xStart = 0, yStart = 0;
        while(num){
            var pointer = Math.floor(Math.random() * allNum);    //向下取整取出0到allnum之间的任意一个整数
            //如果数组_tmpArray中不存在第pointer值，则继续
            if(!_tmpArray[pointer]){
                continue;
            }
            delete _tmpArray[pointer];   //删除数组_tmpArray中第pointer个值
            yStart = parseInt(pointer / xNum, 10) * iconWidth;
            xStart = (pointer % xNum) * iconHeight;
            let inin =  Math.floor(Math.random() * 5 + 1); 
            let initNum = Math.floor(Math.random() * 6 + 1); //产生随机数1-6
            initTotal = initTotal+initNum;
            let leftsss = 1;
            html += "<img id='dice"+parseInt(i+1)+"' class='dice' src='./imgs/"+inin+initNum+".png' style='position:absolute;top:" + yStart + "px;left:" + xStart + "px'/>";
            num--;
        }
        document.querySelector("#test").innerHTML = html;
    }
    
    // for(var i = 0;i<diceNum;i++){
    //     let initNum = Math.floor(Math.random() * 12 + 1); //产生随机数1-6
    //     let tem = "";
    //     initTotal = initTotal+initNum;
    //     let leftsss = 1;
    //     tem += "<img id='dice"+parseInt(i+1)+"' class='dice' src='./imgs/"+initNum+".png' style='-moz-border-radius: 50px;-webkit-border-radius: 50px; border-radius: 50px;top:10px;padding-left:"+leftsss+"px;padding-right:"+leftsss+"px;' alt=''/>";
    //     $("#test").append(tem); 
    // }


    // $("#resultPoints").html("您掷得点数是<span>" + initTotal + "</span>");
    var button1 = $("#button1");
    var button2 = $("#button2");
    var BBB = "";

    function TEST(){
        clearTimeout(BBB)
        let numTotal = 0;
    // createBubble(6); 
        let dices = $("#test").children($(".dice"));
        $("#test").append("<div id='dice_mask'></div>"); //加遮罩
        for(var i = 0;i<dices.length;i++){
            //let num1 = Math.floor(Math.random() * 30 + 1); //产生随机数1-6
            let dice = "#"+dices[i].id;
            $(dice).attr("class", "dice"); //清除上次动画后的点数
            $(dice).css('cursor', 'default');
            // setTimeout(function(){ 
            //     $(dice).attr('src','./imgs/'+num1+'.png')
            //  },100); 
            // setTimeout(function(){
            //     $(dice).attr('src','./imgs/'+num1+'.png')
            // },150);
            // setTimeout(function(){
            //     $(dice).attr('src','./imgs/'+num1+'.png')
            // },200);  
            setTimeout(function(){
                let n = Math.floor(Math.random() * 5 + 1); //产生随机数1-6
                let num = Math.floor(Math.random() * 6 + 1); //产生随机数1-6
                $(dice).attr('src','./imgs/'+n+num+'.png')
                // $("#resultPoints").html("您掷得点数是<span>" + numTotal + "</span>");
                $(dice).css('cursor', 'pointer');
                $("#dice_mask").remove(); //移除遮罩
            },250);
        }
        BBB = setTimeout(TEST,300)
    };
    function stop () {
        clearTimeout(BBB)
    };
    button1.click(TEST);
    button2.click(stop)

//});