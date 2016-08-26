/**
 * Created by Administrator on 2016/8/26.
 */
var box=document.getElementById('box');
var ul=box.getElementsByTagName('ul')[0];
var arr=[];//用于记录每个格子的数字
var randomArr=[];//存放位置的数组
var liAndBorderWidth=105;
var spanArr=[];//所有span节点
var startSpan=[];

function boxFun(){
    var frag=document.createDocumentFragment();
    for(var i= 0,n=0;i<4;i++){//i表示列
        arr[i]=[];
        spanArr[i]=[];
        for(var j=0;j<4;j++,n++){//j表示行
            arr[i][j]=false;//false表示格子没有数字
            spanArr[i][j]='';
            randomArr[n]=n;//数组元素为0-15
            var li=document.createElement('li');
            frag.appendChild(li);
        }
    }
    ul.appendChild(frag);


    for(var i=0;i<2;i++){
        var randomIndex=Math.floor(Math.random()*randomArr.length);
        var randomVal=randomArr[randomIndex];
        var spanX=randomVal%4;
        var spanY=Math.floor(randomVal/4);

        var span=document.createElement('span');
        span.style.left=liAndBorderWidth*spanX+'px';
        span.style.top=liAndBorderWidth*spanY+'px';
        if(i==0){//表示第一次进入循环，即固定第一个是2
            span.innerHTML=2
        }
        else{
            span.innerHTML=Math.floor(Math.random()*2+1)*2;//第二个随机生成2或4
        }
        arr[spanX][spanY]=span.innerHTML;

        if(span.innerHTML==4){
            span.className='span4';
        }
        spanArr[spanX][spanY]=span;
        startSpan[i]=span;
        //console.log(spanArr);
        frag.appendChild(span);
        randomArr.splice(randomIndex,1);//删除生成过的数字
        //console.log(spanX,spanY);

    }
    box.appendChild(frag);
    window.setTimeout(function(){
        startSpan[0].style.transform="scale(1,1)";
        startSpan[1].style.transform="scale(1,1)";
    },0);
}
boxFun();
//console.log(arr);

document.onkeydown=function(e){
    var event=e||window.event;
    var keyCode=event.which||event.keyCode;
    //alert(keyCode);//左37，上38，右39，下40
    keyDownFun(keyCode);

    //console.log(arr);

}
function keyDownFun(keyCode) {
    var bool = false;//false表示没有移动
    if (keyCode == 38) {//按上键，向上移

        for (var i = 0; i < 4; i++) {//i表示列
            for (var j = 0; j < 4; j++) {//j表示行
                if (arr[i][j] != false) {
                    var indexArr = keyUp(i, j);
                    //console.log(indexArr,i,j);
                    if (i == indexArr[0] && j == indexArr[1]) {//没有移动
                        continue;//继续循环
                    }
                    bool = true;
                    spanArr[i][j].style.left = liAndBorderWidth * indexArr[0] + 'px';
                    spanArr[i][j].style.top = liAndBorderWidth * indexArr[1] + 'px';//变到新位置
                    if (spanArr[indexArr[0]][indexArr[1]] != '')
                        spanArr[indexArr[0]][indexArr[1]].parentNode.removeChild(spanArr[indexArr[0]][indexArr[1]]);

                    spanArr[indexArr[0]][indexArr[1]] = spanArr[i][j];
                    spanArr[indexArr[0]][indexArr[1]].innerHTML = arr[indexArr[0]][indexArr[1]];//给新位置赋值
                    spanArr[indexArr[0]][indexArr[1]].className = 'span' + arr[indexArr[0]][indexArr[1]];
                    spanArr[i][j] = '';//清空原来的
                    //console.log(spanArr,'原来的'+i,j);

                }
            }
        }
        //console.log(indexArr[0],indexArr[1],'开始列数:'+i,j);
//            if (bool) {
//                createOne();
//            }
        //console.log(arr);
    }

    if (keyCode == 37) {//按左键，向左移动
        //var bool = false;//false表示没有移动
        for (var i = 0; i < 4; i++) {//i表示行
            for (var j = 0; j < 4; j++) {//j表示列
                if (arr[j][i] != false) {
                    var indexArr = keyLeft(j, i);
                    //console.log(indexArr,i,j);
                    if (j == indexArr[0] && i == indexArr[1]) {//没有移动
                        continue;//继续循环
                    }
                    bool = true;
                    spanArr[j][i].style.left = liAndBorderWidth * indexArr[0] + 'px';
                    spanArr[j][i].style.top = liAndBorderWidth * indexArr[1] + 'px';//变到新位置
                    if (spanArr[indexArr[0]][indexArr[1]] != '')
                        spanArr[indexArr[0]][indexArr[1]].parentNode.removeChild(spanArr[indexArr[0]][indexArr[1]]);

                    spanArr[indexArr[0]][indexArr[1]] = spanArr[j][i];
                    spanArr[indexArr[0]][indexArr[1]].innerHTML = arr[indexArr[0]][indexArr[1]];//给新位置赋值
                    spanArr[indexArr[0]][indexArr[1]].className = 'span' + arr[indexArr[0]][indexArr[1]];
                    spanArr[j][i] = '';//清空原来的
                    //console.log(spanArr,'原来的'+i,j);

                }
            }
        }
        //console.log(indexArr[0],indexArr[1],'开始列数:'+i,j);
//            if (bool) {
//                createOne();
//            }
        //console.log(arr);
    }

    if (keyCode == 39) {//按右键，向右移动
        //var bool = false;//false表示没有移动
        for (var i = 3; i >= 0; i--) {//i表示行//从右往左，从上往下找
            for (var j = 3; j >= 0; j--) {//j表示列
                if (arr[j][i] != false) {
                    var indexArr = keyRight(j, i);
                    //console.log(indexArr,i,j);
                    if (j == indexArr[0] && i == indexArr[1]) {//没有移动
                        continue;//继续循环
                    }
                    bool = true;
                    spanArr[j][i].style.left = liAndBorderWidth * indexArr[0] + 'px';
                    spanArr[j][i].style.top = liAndBorderWidth * indexArr[1] + 'px';//变到新位置
                    if (spanArr[indexArr[0]][indexArr[1]] != '')
                        spanArr[indexArr[0]][indexArr[1]].parentNode.removeChild(spanArr[indexArr[0]][indexArr[1]]);

                    spanArr[indexArr[0]][indexArr[1]] = spanArr[j][i];
                    spanArr[indexArr[0]][indexArr[1]].innerHTML = arr[indexArr[0]][indexArr[1]];//给新位置赋值
                    spanArr[indexArr[0]][indexArr[1]].className = 'span' + arr[indexArr[0]][indexArr[1]];
                    spanArr[j][i] = '';//清空原来的
                    //console.log(spanArr,'原来的'+i,j);

                }
            }
        }
        //console.log(indexArr[0],indexArr[1],'开始列数:'+i,j);
//            if (bool) {
//                createOne();
//            }
        //console.log(arr);
    }

    if (keyCode == 40) {//按下键，向下移
        //var bool = false;//false表示没有移动
        for (var i = 0; i < 4; i++) {//i表示列
            for (var j = 3; j >= 0; j--) {//j表示行
                if (arr[i][j] != false) {
                    var indexArr = keyDown(i, j);
                    //console.log(indexArr,i,j);
                    if (i == indexArr[0] && j == indexArr[1]) {//没有移动
                        continue;//继续循环
                    }
                    bool = true;
                    spanArr[i][j].style.left = liAndBorderWidth * indexArr[0] + 'px';
                    spanArr[i][j].style.top = liAndBorderWidth * indexArr[1] + 'px';//变到新位置
                    if (spanArr[indexArr[0]][indexArr[1]] != '')
                        spanArr[indexArr[0]][indexArr[1]].parentNode.removeChild(spanArr[indexArr[0]][indexArr[1]]);

                    spanArr[indexArr[0]][indexArr[1]] = spanArr[i][j];
                    spanArr[indexArr[0]][indexArr[1]].innerHTML = arr[indexArr[0]][indexArr[1]];//给新位置赋值
                    spanArr[indexArr[0]][indexArr[1]].className = 'span' + arr[indexArr[0]][indexArr[1]];
                    spanArr[i][j] = '';//清空原来的
                    //console.log(spanArr,'原来的'+i,j);

                }
            }
        }
        //console.log(indexArr[0],indexArr[1],'开始列数:'+i,j);


    }
    if (bool) {
        createOne();
    }
}

if(document.addEventListener){//只针对手机端
    var startX,startY,endX,endY;
    document.addEventListener('touchstart',function(event){
        event.preventDefault();
        var touch=event.targetTouches[0];
        startX=touch.pageX;
        startY=touch.pageY;
    });
    document.addEventListener('touchend',function(event){
        var touch=event.changedTouches[0];
        endX=touch.pageX;
        endY=touch.pageY;
        var x=Math.abs(startX-endX);
        var y=Math.abs(startY-endY);
        if(x>y){
            if(startX-endX>10){//向左
                keyDownFun(37);
            }
            else if(startX-endX<-10){
                keyDownFun(39);
            }
        }
        else{
            if(startY-endY>10){//向上
                keyDownFun(38);
            }
            else if(startY-endY<-10){
                keyDownFun(40);
            }
        }
    });
}

function keyDown(col,row){
    var i=col,j=row+1;
    if(j<4){//递归过程
        if(arr[i][j]==false){//前一个为空
            arr[i][j]=arr[col][row];
            arr[col][row]=false;
            return keyDown(i,j);
        }
        else{//前一个有值
            if(arr[i][j]==arr[col][row]){//前一个值等于他本身
                arr[i][j]=Number(arr[i][j])*2;
                arr[col][row]=false;
                return [i,j];
            }
            else{//前一个值不等于他本身
                return [col,row];
            }
        }
    }
    else{//递归结束
        return [col,row];//返回数组，分别最终位置的列数和行数
    }
}

function keyUp(col,row){
    var i=col,j=row-1;
    if(j>=0){//递归过程
        if(arr[i][j]==false){//前一个为空
            arr[i][j]=arr[col][row];
            arr[col][row]=false;
            return keyUp(i,j);
        }
        else{//前一个有值
            if(arr[i][j]==arr[col][row]){//前一个值等于他本身
                arr[i][j]=Number(arr[i][j])*2;
                arr[col][row]=false;
                return [i,j];
            }
            else{//前一个值不等于他本身
                return [col,row];
            }
        }
    }
    else{//递归结束
        return [col,row];//返回数组，分别最终位置的列数和行数
    }
}

function keyLeft(col,row){
    var i=row,j=col-1;
    if(j>=0){//递归过程
        if(arr[j][i]==false){//前一个为空
            arr[j][i]=arr[col][row];
            arr[col][row]=false;
            return keyLeft(j,i);
        }
        else{//前一个有值
            if(arr[j][i]==arr[col][row]){//前一个值等于他本身
                arr[j][i]=Number(arr[j][i])*2;
                arr[col][row]=false;
                return [j,i];
            }
            else{//前一个值不等于他本身
                return [col,row];
            }
        }
    }
    else{//递归结束
        return [col,row];//返回数组，分别最终位置的列数和行数
    }
}

function keyRight(col,row){
    var i=row,j=col+1;
    if(j<4){//递归过程
        if(arr[j][i]==false){//前一个为空
            arr[j][i]=arr[col][row];
            arr[col][row]=false;
            return keyRight(j,i);
        }
        else{//前一个有值
            if(arr[j][i]==arr[col][row]){//前一个值等于他本身
                arr[j][i]=Number(arr[j][i])*2;
                arr[col][row]=false;
                return [j,i];
            }
            else{//前一个值不等于他本身
                return [col,row];
            }
        }
    }
    else{//递归结束
        return [col,row];//返回数组，分别最终位置的列数和行数
    }
}

function createOne(){//再生成一个
    var randomIndex=Math.floor(Math.random()*16);
    var spanX=randomIndex%4;
    var spanY=Math.floor(randomIndex/4);
    if(arr[spanX][spanY]){
        createOne();
    }
    else{
        var span=document.createElement('span');
        span.style.left=liAndBorderWidth*spanX+'px';
        span.style.top=liAndBorderWidth*spanY+'px';
        span.innerHTML=Math.floor(Math.random()*2+1)*2;//随机生成2或4
        if(span.innerHTML==4){
            span.className='span4';
        }
        arr[spanX][spanY]=span.innerHTML;
        spanArr[spanX][spanY]=span;
        box.appendChild(span);
        window.setTimeout(function(){
            span.style.transform="scale(1,1)";
        },0);
    }

}