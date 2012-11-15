window.onload = function() {
    canvas_Init();
    stampBar_Init();
    
};


// 定義
var STAMP_W = 160;
var STAMP_H = 160;


//
var selectedStampImg = 0;


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



// タッチ座標処理
function getTouchPos(e) {
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
    
    rect = e.target.getBoundingClientRect();

    r.x = Math.round(x / monaca.viewport.zoomRatio - rect.left);
    r.y = Math.round(y / monaca.viewport.zoomRatio - rect.top);
    
    return r;
}

function $(id) { return document.getElementById(id); }
