var bgImgName = [
    "img/stamp/s_s01_sta_a/s_s01_bgd_a000.png",
    "img/stamp/s_s01_sta_a/s_s01_bgd_b000.png",
    "img/stamp/s_s01_sta_a/s_s01_bgd_c000.png",
    "img/stamp/s_s02_sta_a/s_s02_bgd_a000.png",
    "img/stamp/s_s02_sta_a/s_s02_bgd_b000.png",
    "img/stamp/s_s02_sta_a/s_s02_bgd_c000.png",
    "img/stamp/s_s03_sta_a/s_s03_bgd_a000.png",
    "img/stamp/s_s03_sta_a/s_s03_bgd_b000.png",
    "img/stamp/s_s03_sta_a/s_s03_bgd_c000.png"
    
    ];



//
// スタンプシート
//
var StampSheet = function(canvas_ctx, no){
    var _this = this;
    var ctx = canvas_ctx;
    var img = new Image();
    var isLoaded = false;
    this.sheetNo;
    
    //描画
    this.draw = function(ofs) {
        if (isLoaded) {
            var rate = Math.abs(ofs)/320 * 0.25 ;
            var w = img.naturalWidth * (0.65 - rate);
            var h = img.naturalHeight * (0.65 - rate);
            var x = (640 - w) / 2 + ofs - rate*ofs ;
            var y = (800 - h) / 2 + 20;
            ctx.drawImage(img, x,y, w,h);
        }
    };

    //イメージセット
    this.setImage = function(no) {
        if (no < 0) no+=bgImgName.length;
        this.sheetNo = no % bgImgName.length;
        isLoaded = false;
        img.onload = function() {
            isLoaded = true;
        };
        img.src = bgImgName[this.sheetNo];
    };
    
    
    this.setImage(no);
    
};


//
// メインキャンバス
//
var MainCanvas = function(){
    var _this = this;
    this.selectIx = 0;
    var startX=0;
    var ofsX=0;
    var addX=0, ofsXold=0;
    var ofsRate=1.2;
    var isTouch = false;
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //debug
    function dubugDisp() {
        document.getElementById("body").innerHTML = 
            "startX = " + startX + "<br>" +
            "ofsX = " + ofsX + "<br>" +
            "addX = " + addX + "<br>" +
            "isTouch = " + isTouch;
    }
    
    //スタンプシート準備
    var sheet = new Array();
    sheet[0] = new StampSheet(ctx,0);
    sheet[1] = new StampSheet(ctx,1);
    sheet[2] = new StampSheet(ctx,2);
    sheet[4] = new StampSheet(ctx,bgImgName.length-1);
    sheet[3] = new StampSheet(ctx,bgImgName.length-2);
    
    //キャンバスクリア
    this.clear = function(){
        ctx.beginPath();
        //グラデーション領域をセット
        var grad  = ctx.createLinearGradient(0,0, 0,1200);
        //グラデーション終点のオフセットと色をセット
        grad.addColorStop(0,'rgb(10, 10, 50)');
        grad.addColorStop(0.7,'rgb(150, 150, 240)');
        //グラデーションをfillStyleプロパティにセット
        ctx.fillStyle = grad;
        /* 矩形を描画 */
        ctx.rect(0,0, 640,1200);
        ctx.fill();
    };
    
    //描画
    this.draw = function() {
        var ofsMax = 376;

        //タッチされていない場合の位置調整
        if (!isTouch){
            if (addX>=-40 && addX<=40){
                if (ofsX >= -ofsMax/2 && ofsX<0){
                    addX = 40;
                }
                if (ofsX <= ofsMax/2 && ofsX>0){
                    addX = -40;
                }
            }

            if (addX < -60) addX=-60;
            if (addX > 60) addX=60;
            ofsX += addX;
            if (addX<0){
                if (ofsX < 0  && addX>=-40){
                    ofsX = 0;
                }
                addX += 4;
            } else {
                ofsX += addX;
                if (ofsX > 0 && addX<=40){
                    ofsX = 0;
                }
                addX -= 4;
            }
        } else {
            addX = ofsX - ofsXold;
        }

        if (ofsX < -ofsMax/2){
            startX -= ofsMax/ofsRate;
            ofsX += ofsMax;
            this.selectIx += 1;
            this.selectIx %= 5;
            sheet[(this.selectIx + 2)%5].setImage( sheet[this.selectIx].sheetNo + 2);
        }
        if (ofsX > ofsMax/2){
            startX += ofsMax/ofsRate;
            ofsX -= ofsMax;
            this.selectIx += 5-1;
            this.selectIx %= 5;
            sheet[(this.selectIx + 3)%5].setImage( sheet[this.selectIx].sheetNo - 2);
        }
        ofsXold = ofsX;
        
        this.clear();
        sheet[(this.selectIx + 4)%5].draw(ofsX-ofsMax);
        sheet[(this.selectIx + 1)%5].draw(ofsX+ofsMax);
        sheet[this.selectIx].draw(ofsX);
        
//        dubugDisp();
    };
    
    //タッチ座標取得
    this.getTouchPos = function(e){
        var r = { x:0, y:0};
        var x,y;
        if (e.type=="touchstart" || e.type=="touchmove") {
            x = e.touches[0].pageX;
            y = e.touches[0].pageY;
        } else if (e.type=="mousedown" || e.type=="mousemove") {
            x = e.pageX;
            y = e.pageY;
        } else
            return r;
   
        var rect = e.target.getBoundingClientRect();
    
        r.x = Math.round(x / monaca.viewport.zoomRatio - rect.left);
        r.y = Math.round(y / monaca.viewport.zoomRatio - rect.top);
        
        return r;
    };
    
    //マウスイベント
    this.onTouchStart = function(e){
        var pos = _this.getTouchPos(e);
        startX = pos.x - ofsX * ofsRate;
        isTouch = true;
        
        event.preventDefault(); //デフォルトイベント処理をしない
    };
    this.onTouchMove = function(e) {
        if (isTouch) {
            var pos = _this.getTouchPos(e);
            ofsX = (pos.x - startX) * ofsRate;
        }

        event.preventDefault(); //デフォルトイベント処理をしない
    };
    this.onTouchEnd = function(e){
        isTouch = false;

        event.preventDefault(); //デフォルトイベント処理をしない
    };
    
    //マウスイベントリスナーの追加
    if (navigator.userAgent.indexOf('iPhone')>0 ||
        navigator.userAgent.indexOf('iPod')>0 ||
        navigator.userAgent.indexOf('iPad')>0 ||
        navigator.userAgent.indexOf('Android')>0) {
        canvas.addEventListener("touchstart",this.onTouchStart,false);
        canvas.addEventListener("touchmove",this.onTouchMove,false);
        canvas.addEventListener("touchend",this.onTouchEnd,false);
    } else {
        canvas.addEventListener("mousedown",this.onTouchStart,false);
        canvas.addEventListener("mousemove",this.onTouchMove,false);
        canvas.addEventListener("mouseup",this.onTouchEnd,false);
    }
    //初期描画
    this.draw();
};


var timerID;
var mainCanvas;
window.onload = function() {
    mainCanvas = new MainCanvas();    
    clearInterval(timerID);
    timerID = setInterval('draw()', 50);
};

function draw() {
    mainCanvas.draw();
}

