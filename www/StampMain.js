
// 定義
var STAMP_W = 160;
var STAMP_H = 160;


//
var gStampSheetNo = 0;					//シート番号


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
    this.selectedStampId = -1;				//選択された手持ちスタンプのID
	this.selectedStampIx = -1;    			//選択されたスタンプオブジェクトのインデックス
    this.isTouched = false;
    this.touchOffset = 0;
    this.isSlide = false;
    
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
    
    //移動したら選択は解除
    if (this.offsetAdd !=0)	this.selectedStampId = -1;

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
    var id = this.leftHasStampId;
    
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.ctx.fillRect(0, 0, 640, STAMP_H);
    
    for (i=0; i<NUM_STAMPBAR_W-2; i++){
        var s = getHasStampData(this.id);
        
		//バック
		if (id == this.selectedStampId) {
	        this.ctx.fillStyle = 'rgb(255, 0, 0)';
	        this.ctx.fillRect(x+0, 0, STAMP_W-0, STAMP_H-0);
	        this.ctx.fillStyle = 'rgb(0, 0, 0)';
	        this.ctx.fillRect(x+8, 8, STAMP_W-8*2, STAMP_H-8*2);
	        this.selectedStampIx = ix;
		} else {
	        this.ctx.fillStyle = 'rgb(0, 0, 0)';
	        this.ctx.fillRect(x+2, 2, STAMP_W-4, STAMP_H-4);
    	}
    	    
        //スタンプ
        this.ctx.drawImage(this.stamp[ix].img, x,0, STAMP_W,STAMP_H);
        
        x += STAMP_W;
        ix ++;
        ix %= NUM_STAMPBAR_W;
        id ++;
        id %= hasStampData.length;
    }
    
};

//タッチイベントリスナーの追加
StampBar.prototype.setTouchEvent = function() {
    var _this = this;
    var startX = 0;
    var startOffset;
    var touchX = 0;
    
    //タッチ開始
    var touchStartEvent = function(e) {
        _this.isTouched = true;
    	    
        var pos = getTouchPos(e);
        startX = touchX = pos.x;
        startOffset = _this.touchOffset = _this.offset;
        
        event.preventDefault(); //デフォルトイベント処理をしない
    };    

    //移動
    var touchMoveEvent = function(e) {
        if (_this.isTouched) {
            var pos =  getTouchPos(e);
            var ofs = pos.x - startX;
            touchX = pos.x;
            _this.touchOffset = startOffset - ofs;
        }
        event.preventDefault(); //デフォルトイベント処理をしない
    };    

    //タッチ終了
    var touchEndEvent = function(e) {
        _this.isTouched = false;
        
        //移動していなければスタンプ選択
        if (startX == touchX){
        	_this.selectStamp(touchX);
		}
		        
        event.preventDefault(); //デフォルトイベント処理をしない
    };    

    if (navigator.userAgent.indexOf('iPhone')>0 ||
        navigator.userAgent.indexOf('iPod')>0 ||
        navigator.userAgent.indexOf('iPad')>0 ||
        navigator.userAgent.indexOf('Android')>0) {
        this.canvas.addEventListener("touchstart",touchStartEvent,false);
        this.canvas.addEventListener("touchmove",touchMoveEvent,false);
        this.canvas.addEventListener("touchend",touchEndEvent,false);
    } else {
        this.canvas.addEventListener("mousedown",touchStartEvent,false);
        this.canvas.addEventListener("mousemove",touchMoveEvent,false);
        this.canvas.addEventListener("mouseup",touchEndEvent,false);
    }
    
};

//スライド処理
StampBar.prototype.slide = function(){
    
    if (this.isSlide){
        if (this.isTouched){
            var ADD = 25;
            var d = this.touchOffset - this.offset;
            if (d < -ADD){
            	this.offsetAdd -= ADD;
            	if (this.offsetAdd > 0)		this.offsetAdd = 0;
            } else if (d > ADD) {
            	this.offsetAdd += ADD;
            	if (this.offsetAdd < 0)		this.offsetAdd = 0;
            } else {
            	this.offsetAdd = d;
            }
        }
        else {
        	var BRK = 8;
        	if (this.offsetAdd < 0) {
        		this.offsetAdd += BRK;
        		if (this.offsetAdd > 0) this.offsetAdd=0; 
        	} else if (this.offsetAdd > 0) {
        		this.offsetAdd -= BRK;
        		if (this.offsetAdd < 0) this.offsetAdd=0; 
        	}
        	
        	if (this.offsetAdd == 0)
	            this.isSlide = false;
        }
    } else {
        if (this.isTouched){
            this.isSlide = true;
        }
    }
};

//スタンプ選択
StampBar.prototype.selectStamp = function(x){
	var offset = x + this.offset;
    offset %= hasStampData.length*STAMP_W;
    if (offset < 0)    offset += hasStampData.length*STAMP_W;
	
	var id = Math.floor(offset/STAMP_W);
	this.selectedStampId = id;
}

//選択スタンプ描画
StampBar.prototype.drawSelectedStamp = function(ctx,x,y){
	var ix = this.selectedStampIx;
	var id = this.selectesStampId;
	
	ctx.drawImage(this.stamp[ix].img, x-STAMP_W/2,y-STAMP_H/2, STAMP_W,STAMP_H);

}


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
    canvas_img.src = bgImgName[gStampSheetNo];
}

function canvas_Draw() {
    canvas_ctx.drawImage(canvas_img, 0,0);
}
// キャンバス：マウスタッチイベント
function canvas_onTouchEvent(e) {
    var pos = getTouchPos(e);
    
    drawStamp(pos.x, pos.y);

    event.preventDefault(); //デフォルトイベント処理をしない
    
}










var timerID;
var stampBar;

function drawStamp(x,y){
	if (stampBar.selectedStampId >= 0){
		stampBar.drawSelectedStamp(canvas_ctx, x,y);
        playAudioSE_Stamp();
	}
}


//ロード
function load(){
    var sheet = localStorage.getItem("SelectedStampSheet");
    if (!sheet)    sheet = 0;
	
	gStampSheetNo = sheet;
}

window.onload = function() {

	load();
	
    canvas_Init();
    
    stampBar = new StampBar(3);

    clearInterval(timerID);
    timerID = setInterval(
        function(){
        	stampBar.slide();
            stampBar.updateDispInfo();
            stampBar.imageLoad();
            stampBar.draw();
            
            //dubugDisp();
        },
        50);

};


// MENUボタンクリック
function menuButtonClick(){
	document.location="StampSelect.html";
}


//debug
var debugValue1;
var debugValue2;
var debugValue3;
function dubugDisp() {
    document.getElementById("body").innerHTML = 
        "offset = " + stampBar.offset + "<br/>" +
        "imageLoadCounter = " + imageLoadCounter + "<br/>" +
        "isTuched = " + stampBar.isTouched + "<br/>" +
        "touchOffset = " + stampBar.touchOffset + "<br/>" +
        "debugValue1 = " + debugValue1 + "<br/>" +
        "debugValue2 = " + debugValue2 + "<br/>" +
        "debugValue3 = " + debugValue3 + "<br/>"
        ;
}


