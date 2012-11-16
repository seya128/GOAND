
// 定義
var STAMP_W = 160;
var STAMP_H = 160;


//
var selectedStampImg = 0;

//スタンプ種類の数
var NUM_STAMP_MAX = stampImgName.length;

//持ってるスタンプ
function getHasStampData(no){
    if (no<0)   no+=hasStampData.length;
    no %= hasStampData.length;
    return hasStampData[no];
}


var imageLoadCounter = 0;  //デバッグ用

//
// スタンプ
//
function Stamp(){
    this.stampImageNo = -1;          //スタンプの画像番号
    this.isLoaded = false;
    this.img = new Image();
}
// 画像ロード
Stamp.prototype.loadImage = function(no){
    var _this = this;

    if (no == this.stampImageNo)
        return;
    
    //範囲チェック
    if (no < 0)  no += NUM_STAMP_MAX;
    no %= NUM_STAMP_MAX;
    
    //イメージロード
    this.isLoaded = false;
    this.img.onload = function(){ _this.isLoaded = true; };
    this.img.src = stampImgName[no];
    this.stampImageNo = no;
    
    imageLoadCounter ++;    //デバッグ用
};


//
// スタンプバー
//
var NUM_STAMPBAR_W = 5+2;   //スタンプバーが表示用に管理するスタンプの数

function StampBar(ofs) {
    this.offset = ofs;                      //オフセット座標
    this.offsetAdd = 0;
    this.stamp = Array(NUM_STAMPBAR_W);     //スタンプオブジェクト

    this.leftHasStampId = 0;                //左端に表示されている所持スタンプＩＤ
    this.leftStampIx = 0;                   //左端のスタンプオブジェクトのインデックス
    this.leftDispOfs = 0;                   //表示オフセット
    
    this.isTouched = false;
    this.touchOffset = 0;
    
    this.canvas = document.getElementById("stamp_bar");
    this.ctx = this.canvas.getContext("2d");
    
    for (i=0; i<NUM_STAMPBAR_W; i++){
        this.stamp[i] = new Stamp();
    }
    
    this.updateDispInfo();
    this.imageLoad();
    this.setTouchEvent();
}

//スタンプバー表示情報更新
StampBar.prototype.updateDispInfo = function(){
    
    if (this.offsetAdd < -STAMP_W)  this.offsetAdd = -STAMP_W;
    if (this.offsetAdd > STAMP_W)  this.offsetAdd = STAMP_W;
    this.offset += this.offsetAdd;

    //計算用オフセット
    var offset = this.offset;
    offset %= hasStampData.length*STAMP_W;
    if (offset < 0)    offset += hasStampData.length*STAMP_W;
    
    //左端に表示されている所持スタンプＩＤ
    var idOld = this.leftHasStampId;
    this.leftHasStampId = Math.floor(offset / STAMP_W);

    //左端のスタンプオブジェクトのインデックス
    if (idOld != this.leftHasStampId) {
        if (this.offsetAdd < 0)     this.leftStampIx--;
        else                        this.leftStampIx++;
        
        if (this.leftStampIx < 0)   this.leftStampIx += NUM_STAMPBAR_W;
        this.leftStampIx %= NUM_STAMPBAR_W;
    }
    
    //表示オフセット
    this.leftDispOfs = -(offset % STAMP_W);
    
    
};

//表示情報にあわせてスタンプイメージロード
StampBar.prototype.imageLoad = function(){
    var s;
    var ix = this.leftStampIx;

    for (i=0; i<NUM_STAMPBAR_W-1; i++){
        s = getHasStampData(this.leftHasStampId+i);
        this.stamp[ix++].loadImage(s.id);
        ix %= NUM_STAMPBAR_W;
    }
    //左にはみ出る分
    s = getHasStampData(this.leftHasStampId-1);
    this.stamp[ix].loadImage(s.id);
};

//スタンプバー描画
StampBar.prototype.draw = function(){

    var x = this.leftDispOfs;
    var ix = this.leftStampIx;
    
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.ctx.fillRect(0, 0, 640, STAMP_H);
    
    for (i=0; i<NUM_STAMPBAR_W-2; i++){
        var s = getHasStampData(this.leftHasStampId-i);
        
        this.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.ctx.fillRect(x+2, 2, STAMP_W-4, STAMP_H-4);
        this.ctx.drawImage(this.stamp[ix].img, x,0, STAMP_W,STAMP_H);
        
        x += STAMP_W;
        ix ++;
        ix %= NUM_STAMPBAR_W;
    }
};

//タッチイベントリスナーの追加
StampBar.prototype.setTouchEvent = function() {
    var _this = this;
    var startX = 0;
    var startOffset;
    
    //タッチ開始
    var touchStartEvent = function(e) {
        _this.isTouched = true;
        
        var pos = getTouchPos(e);
        startX = pos.x;
        startOffset = _this.touchOffset = _this.offset;
        
        event.preventDefault(); //デフォルトイベント処理をしない
    };    

    //移動
    var touchMoveEvent = function(e) {
        if (_this.isTouched) {
            var pos =  getTouchPos(e);
            var ofs = pos.x - startX;
            _this.touchOffset = startOffset + ofs;
        }
        event.preventDefault(); //デフォルトイベント処理をしない
    };    

    //タッチ終了
    var touchEndEvent = function(e) {
        _this.isTouched = false;
        
        event.preventDefault(); //デフォルトイベント処理をしない
    };    

    if (navigator.userAgent.indexOf('iPhone')>0 ||
        navigator.userAgent.indexOf('iPod')>0 ||
        navigator.userAgent.indexOf('iPad')>0 ||
        navigator.userAgent.indexOf('Android')>0) {
        this.canvas.addEventListener("touchstart",touchStartEvent,false);
        this.canvas.addEventListener("touchmove",touchMoveEvent,false);
        this.canvas.addEventListener("touchend",_touchEndEvent,false);
    } else {
        this.canvas.addEventListener("mousedown",touchStartEvent,false);
        this.canvas.addEventListener("mousemove",touchMoveEvent,false);
        this.canvas.addEventListener("mouseup",touchEndEvent,false);
    }
    
};

//スライド処理
StampBar.prototype.slide = function(){
    var isSliding = false;
    
    if (isSliding){
        if (this.isTouched){
            var d = this.touchOffset - this.offset;
            if (d < 0){
                if (d > this.offsetAdd)     this.offsetAdd = d;
                else                        this.offsetAdd -= 5;
            } else {
                if (d < this.offsetAdd)     this.offsetAdd = d;
                else                        this.offsetAdd += 5;
            }
        }
        else {
            isSliding = false;
        }
    } else {
        if (this.isTouched){
            isSliding = true;
        }
    }
};




//
// キャンバス
//
var canvas_canvas = document.getElementById("canvas");
var canvas_ctx = canvas_canvas.getContext("2d");
var canvas_img = new Image();

// キャンバス：初期化
function canvas_Init() {

    //マウスイベントリスナーの追加
    if (navigator.userAgent.indexOf('iPhone')>0 ||
        navigator.userAgent.indexOf('iPod')>0 ||
        navigator.userAgent.indexOf('iPad')>0 ||
        navigator.userAgent.indexOf('Android')>0) {
        canvas_canvas.addEventListener("touchstart",canvas_onTouchEvent,false);
    } else {
        canvas_canvas.addEventListener("mousedown",canvas_onTouchEvent,false);
    }
    
    //背景ロード
    canvas_img.onload = canvas_Draw;
    canvas_img.src = "img/stamp/s_s01_sta_a/s_s01_bgd_b000.png";
}

function canvas_Draw() {
    canvas_ctx.drawImage(canvas_img, 0,0);
}
// キャンバス：マウスタッチイベント
function canvas_onTouchEvent(e) {
    var pos = getTouchPos(e);

    if (selectedStampImg !== 0) {
        canvas_ctx.drawImage(selectedStampImg, pos.x - STAMP_W/2, pos.y - STAMP_H/2, STAMP_W, STAMP_H);
        playAudioSE_Stamp();
    }
    event.preventDefault(); //デフォルトイベント処理をしない
    
}






//
// スタンプバー
//
var stampBar_canvas = document.getElementById("stamp_bar");
var stampBar_ctx = stampBar_canvas.getContext("2d");
var stampBar_touchFlag = false;		// タッチ中 = true

// スタンプバー：初期化
function stampBar_Init() {

    //マウスイベントリスナーの追加
    if (navigator.userAgent.indexOf('iPhone')>0 ||
        navigator.userAgent.indexOf('iPod')>0 ||
        navigator.userAgent.indexOf('iPad')>0 ||
        navigator.userAgent.indexOf('Android')>0) {
        stampBar_canvas.addEventListener("touchstart",stampBar_onTouchEvent,false);
        stampBar_canvas.addEventListener("touchmove",stampBar_onTouchEvent,false);
        stampBar_canvas.addEventListener("touchend",stampBar_onTouchEvent,false);
    } else {
        stampBar_canvas.addEventListener("mousedown",stampBar_onTouchEvent,false);
        stampBar_canvas.addEventListener("mousemove",stampBar_onTouchEvent,false);
        stampBar_canvas.addEventListener("mouseup",stampBar_onTouchEvent,false);
    }

	//初期描画
	stampBar_Draw();
    stamp1_ImageLoad("img/stamp/s_s01_sta_a/s_s01_sta_a000.png");
    stamp2_ImageLoad("img/stamp/s_s01_sta_a/s_s01_sta_b000.png");
    stamp3_ImageLoad("img/stamp/s_s01_sta_a/s_s01_sta_c000.png");
    
    selectedStampImg = stampImg1;
}


// スタンプバー：マウスタッチイベント
function stampBar_onTouchEvent(e) {
    if (e.type=="touchstart" || e.type=="mousedown")	stampBar_touchFlag=true;
    if (e.type=="touchend" || e.type=="mouseup")		stampBar_touchFlag=false;
    
    var pos = getTouchPos(e);
    
    if (e.type=="touchstart" || e.type=="mousedown") {
        var id = Math.floor(pos.x / STAMP_W);
        switch (id) {
            case 0: selectedStampImg = stampImg1;   break;
            case 1: selectedStampImg = stampImg2;   break;
            case 2: selectedStampImg = stampImg3;   break;
            default: document.location = "StampSelect.html"; break;
        }
    }    
    event.preventDefault(); //デフォルトイベント処理をしない
    
}

// スタンプバー：描画
function stampBar_Draw() {
    for (i=0; i<4; i++) {
        stampBar_ctx.fillRect(STAMP_W*i+2, 2, STAMP_W-4, STAMP_H-4);
    }
}



//
// スタンプ
//
var stampImg1 = new Image();
var stampImg2 = new Image();
var stampImg3 = new Image();
function stamp1_ImageLoad(src) {
	stampImg1.onload = stamp1_Draw;
    stampImg1.src = src;
}
function stamp1_Draw() {
    stampBar_ctx.drawImage(stampImg1, STAMP_W*0,0, STAMP_W,STAMP_H);
}
function stamp2_ImageLoad(src) {
    stampImg2.onload = stamp2_Draw;
    stampImg2.src = src;
}
function stamp2_Draw() {
    stampBar_ctx.drawImage(stampImg2, STAMP_W*1,0, STAMP_W,STAMP_H);
}
function stamp3_ImageLoad(src) {
    stampImg3.onload = stamp3_Draw;
    stampImg3.src = src;
}
function stamp3_Draw() {
    stampBar_ctx.drawImage(stampImg3, STAMP_W*2,0, STAMP_W,STAMP_H);
}








var timerID;
var stampBar;

window.onload = function() {

    canvas_Init();
    
    stampBar = new StampBar(3);

    clearInterval(timerID);
    timerID = setInterval(
        function(){
            stampBar.updateDispInfo();
            stampBar.imageLoad();
            stampBar.draw();
            
            dubugDisp();
        },
        50);

    
    
//    stampBar_Init();
    
};


//debug
function dubugDisp() {
    document.getElementById("body").innerHTML = 
        "offset = " + stampBar.offset + "<br/>" +
        "imageLoadCounter = " + imageLoadCounter + "<br/>" +
        "isTuched = " + stampBar.isTouched + "<br/>" +
        "touchOffset = " + stampBar.touchOffset + "<br/>"
        ;
}


