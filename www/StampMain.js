
// 定義
var STAMP_W = 160;
var STAMP_H = 160;


// スタンプ描画データ
var g_sActiveDrawData;

// スタンプバー
var stampBar;

//
var g_iEditSheetIndex = 0;					//シート番号

//持ってるスタンプ
function getHasStampData(no){
    if (no<0)   no+=g_HaveStampImageData.length;
    no %= g_HaveStampImageData.length;
    return g_HaveStampImageData[no];
}
//持ってるスタンプ
function getHasStampIndex(no){
    if (no<0)   no+=g_HaveStampImageData.length;
    no %= g_HaveStampImageData.length;
    return no;
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
    if (no < 0)  no += M_MAX_STAMP;
    no %= M_MAX_STAMP;
    
    //イメージロード
    this.isLoaded = true;
	this.img      = GetStampGraphicHandle_StampImage(no);
 //   this.img.onload = function(){ _this.isLoaded = true; };
 //   this.img.src = stampImgName[no];
    this.stampImageNo = no;
    
    imageLoadCounter ++;    //デバッグ用
};

var sTimeHandle = false;
var sEffectCtx;
var nEffectTime  = 0;
var nEffectCount = 0;
var nEffectX = 0;
var nEffectY = 0;
var nEffectW = 0;
var nEffectH = 0;
var nEffectA = 0;
var nEffectID= 0;
var nEffectNID= 0;
var nEffectSwitch= 0;
var nEffectWork= 0;

// エフェクトコールバック
function ExecEffect()
{
	if(nEffectWork == 1)
	{
		if(nEffectTime > 0)
		{	
			nEffectTime -= 10;
			nEffectA += 0.2;
			nEffectCount += 1;
			
			// 描画
			var ww = nEffectW / 1.0 + (nEffectCount * 2.0);
			var hh = nEffectH / 1.0 + (nEffectCount * 2.0);
	        sEffectCtx.globalAlpha = nEffectA;
	        sEffectCtx.drawImage(	stampBar.stamp[nEffectID].img, 
									nEffectX - (ww / 2) + nEffectW / 2, 
									nEffectY - (hh / 2) + nEffectH / 2, 
									ww, 
									hh);
	        sEffectCtx.globalAlpha = 1.0;
		}
		else
		{
			sTimeHandle = false;
			nEffectTime = 0;
		}
	}
	else
	{
		if(nEffectSwitch == 0)
		{
			if(nEffectTime > 0)
			{	
				nEffectTime -= 10;
				nEffectA -= 0.05;
				nEffectCount += 10;
				
				// 描画
				//var ww = nEffectW / 1.25 + (nEffectCount * 2.0);
				//var hh = nEffectH / 1.25 + (nEffectCount * 2.0);
				var ww = nEffectW / 1.0 - (nEffectCount * 2.0);
				var hh = nEffectH / 1.0 - (nEffectCount * 2.0);
		        sEffectCtx.globalAlpha = nEffectA;
		        sEffectCtx.drawImage(	stampBar.stamp[nEffectID].img, 
										nEffectX - (ww / 2) + nEffectW / 2, 
										nEffectY - (hh / 2) + nEffectH / 2, 
										ww, 
										hh);
		        sEffectCtx.globalAlpha = 1.0;

			}
			else
			{
				//sTimeHandle = false;
				nEffectTime = 30;
				nEffectCount = 0;
				DelHasStamp(nEffectNID);
				SaveHaveStampData();
				stampBar.selectedStampId = -1;	//選択された手持ちスタンプのID
				nEffectSwitch ++;
			}
		}
		else
		{
			if(nEffectTime > 0)
			{	
				nEffectTime -= 10;
				nEffectA += 0.2;
				nEffectCount += 10;
				
				// 描画
				var ww = nEffectW / 1.25 + (nEffectCount * 2.0);
				var hh = nEffectH / 1.25 + (nEffectCount * 2.0);
		        sEffectCtx.globalAlpha = nEffectA;
		        sEffectCtx.drawImage(	stampBar.stamp[nEffectID].img, 
										nEffectX - (ww / 2) + nEffectW / 2, 
										nEffectY - (hh / 2) + nEffectH / 2, 
										ww, 
										hh);
		        sEffectCtx.globalAlpha = 1.0;
			}
			else
			{
				sTimeHandle = false;
				nEffectTime = 0;
			}
		}
	}
}

// フェードエフェクトを発生させる
function SetScaleAlphaFadeEffect(ctx, id, nid, x, y, w, h, work)
{
	sTimeHandle 	= true;
	sEffectCtx  	= ctx
	nEffectWork		= work;
	nEffectTime 	= 30;
	nEffectID 		= id;
	nEffectNID		= nid;
	nEffectX 		= x;
	nEffectY 		= y;
	nEffectW 		= w;
	nEffectH 		= h;
	nEffectA 		= 0.3;
	nEffectCount	= 0;
	nEffectSwitch	= 0;
}

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
	this.iSelectedX = 0;
    
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
    
	// 3つ以下なら固定する
	if(g_HaveStampImageData.length <= 0) 
	{ 
		this.leftDispOfs = 0;
		this.selectedStampId = 0;
		return;
	}
	if(g_HaveStampImageData.length <= 3) 
	{ 
		this.leftDispOfs = 0;
		this.offset = 0;
	//	return;
	}
    if (this.offsetAdd < -STAMP_W)  this.offsetAdd = -STAMP_W;
    if (this.offsetAdd > STAMP_W)   this.offsetAdd = STAMP_W;
    this.offset += this.offsetAdd;
    
    //移動したら選択は解除
    if (this.offsetAdd !=0)	this.selectedStampId = -1;

    //計算用オフセット
    var offset = this.offset;
    offset %= g_HaveStampImageData.length*STAMP_W;
    if (offset < 0)    offset += g_HaveStampImageData.length*STAMP_W;
    
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
StampBar.prototype.imageLoad = function()
{
    var s;
    var ix = this.leftStampIx;

	var iDrawNum = NUM_STAMPBAR_W-1;
	if(iDrawNum > g_HaveStampImageData.length) { iDrawNum = g_HaveStampImageData.length; }
    if(iDrawNum <= 0) { return; }
	for (i=0; i<iDrawNum; i++)
	{
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
    
	var iDrawNum = NUM_STAMPBAR_W-2;
    for (i=0; i<iDrawNum; i++)
	{
        var s = getHasStampData(id);
        
		// 空データ
		if(i > g_HaveStampImageData.length - 1)
		{
	        this.ctx.fillStyle = 'rgb(0, 0, 0)';
	        this.ctx.fillRect(x+2, 2, STAMP_W-4, STAMP_H-4);	
		}
		else
		{
			//バック
			if (id == this.selectedStampId) {
		        this.ctx.fillStyle = 'rgb(255, 0, 0)';
		        this.ctx.fillRect(x+0, 0, STAMP_W-0, STAMP_H-0);
		        this.ctx.fillStyle = 'rgb(0, 0, 0)';
		        this.ctx.fillRect(x+8, 8, STAMP_W-8*2, STAMP_H-8*2);
		        this.selectedStampIx = ix;
				this.iSelectedX      = x;
			} else {
		        this.ctx.fillStyle = 'rgb(0, 0, 0)';
		        this.ctx.fillRect(x+2, 2, STAMP_W-4, STAMP_H-4);
	    	}
	    	    
	        //スタンプ
	        var a = Math.floor(s.ink / (STAMP_LIFE_MAX/5))+1;  //残りインクを５段階に(6-1)
		    if (a >= 6)			a = 1.0;
			else if (s.ink > 0)	a = a / 5;
			else 				a = 0;
	        
	        this.ctx.globalAlpha = a;
	        this.ctx.drawImage(this.stamp[ix].img, x,0, STAMP_W,STAMP_H);
	        this.ctx.globalAlpha = 1.0;
        }
        x += STAMP_W;
        ix ++;
        ix %= NUM_STAMPBAR_W;
        id ++;
        id %= g_HaveStampImageData.length;
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
        
        e.preventDefault(); //デフォルトイベント処理をしない
    };    

    //移動
    var touchMoveEvent = function(e) {
        if (_this.isTouched) {
            var pos =  getTouchPos(e);
            var ofs = pos.x - startX;
            touchX = pos.x;
            _this.touchOffset = startOffset - ofs;
        }
        e.preventDefault(); //デフォルトイベント処理をしない
    };    

    //タッチ終了
    var touchEndEvent = function(e) {
        _this.isTouched = false;
        
        //移動していなければスタンプ選択
        if (startX == touchX){
        	_this.selectStamp(touchX);
		}
		        
        e.preventDefault(); //デフォルトイベント処理をしない
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
StampBar.prototype.slide = function()
{
    
	if(g_HaveStampImageData.length <= 3) 
	{ 
		this.offsetAdd = 0;
		return;
	}
    if (this.isSlide){
        if (this.isTouched){
            var ADD = 40;
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
    offset %= g_HaveStampImageData.length*STAMP_W;
    if (offset < 0)    offset += g_HaveStampImageData.length*STAMP_W;
	
	var id = Math.floor(offset/STAMP_W);
	this.selectedStampId = id;
}

//選択スタンプ描画
StampBar.prototype.drawSelectedStamp = function(ctx,x,y)
{
	var ix = this.selectedStampIx;		//選択された手持ちスタンプのID
	var id = this.selectedStampId;		//選択されたスタンプオブジェクトのインデックス

	// 持っているスタンプデータの取得
    var s = getHasStampData(id);
	
    var a = Math.floor(s.ink / (STAMP_LIFE_MAX/5))+1;  //残りインクを５段階に(6-1)
    if (a >= 6)			a = 1.0;
    else if (s.ink > 0)	a = a / 5;
    else 				a = 0;
        
    ctx.globalAlpha = a;
	ctx.drawImage(this.stamp[ix].img, x-STAMP_W/2,y-STAMP_H/2, STAMP_W,STAMP_H);
    ctx.globalAlpha = 1.0;
    
    //描画データ保存
    g_sActiveDrawData.Add(x,y, s.id, a);
    g_sActiveDrawData.Save();	//オートセーブ
    
	// インク切れの瞬間
	if(s.ink == 1 || s.ink < 0)      
	{
		// 拡大しつつアルファでフェード
		//var dd = getHasStampIndex(id + 1);
		SetScaleAlphaFadeEffect
		(
		stampBar.ctx, 
		ix, id,
		stampBar.iSelectedX, 
		0, 
		STAMP_W, 
		STAMP_H, 
		0);
		// インクをなくし、スタンプを消す
		s.ink = 0; 
		// ここら辺の処理はエフェクト終了後にしたほうがいい・・・
		// [選択から解除する]:一応再描画
		stampBar.selectedStampId = -1;				//選択された手持ちスタンプのID
	}
    // インクを引く
	else if(s.ink > 0)	
	{ 
		SetScaleAlphaFadeEffect
		(
		stampBar.ctx, 
		ix, id,
		stampBar.iSelectedX, 
		0, 
		STAMP_W, 
		STAMP_H, 
		1);
		s.ink --; 
	}
}


//
// キャンバス
//
/*
var canvas_canvas;
var canvas_ctx;
var canvas_img = new Image();
var canvas_load_ix = 0;
var canvas_stamp_img = new Image();
*/
	
var nNextEvent = 0;

// MENUボタンクリック
function menuButtonClick(e){
	st = STATUS.FADEOUT;
	nNextEvent = 0;
   // e.preventDefault(); //デフォルトイベント処理をしない
}
// クリア
function clearButtonClick(e){
	g_sActiveDrawData.Clear();	//削除
	g_sActiveDrawData.Save();	//オートセーブ
	st = STATUS.FADEOUT;
	nNextEvent = 1;
  //  e.preventDefault(); //デフォルトイベント処理をしない
}


var StampMain = function() 
{
	
	var canvas_canvas;
	var canvas_ctx;
	var canvas_img = new Image();
	var canvas_load_ix = 0;
	var canvas_stamp_img = new Image();	
	
	//背景描画
	function canvas_Draw() {
	    canvas_ctx.drawImage(canvas_img, 0,0);
	    
	    //スタンプ描画イメージ読み込み開始
	    canvas_load_ix = 0;
	    canvas_stamp_img.fname = null;
	    canvas_StampImageLoad();
	}

	// キャンバス：初期化
	function canvas_Init() {
		
		canvas_canvas = document.getElementById("canvas");
		canvas_ctx = canvas_canvas.getContext("2d");	

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
	    canvas_img.src = gStampBgFileName[g_HaveStampSheetData[g_iEditSheetIndex]["id"]];
	}

	//スタンプ描画イメージ読み込み開始
	function canvas_StampImageLoad() 
	{
		var d = g_sActiveDrawData.Get(canvas_load_ix);
		if (d == null)
			return;
		
		if (canvas_stamp_img.fname == gStampImgFileName[d.id]) 
		{
			canvas_StampDraw();
		} else {
			canvas_stamp_img.fname = gStampImgFileName[d.id];
			canvas_stamp_img.onload = canvas_StampDraw;
			canvas_stamp_img.src = gStampImgFileName[d.id];
		}
	}
	function canvas_StampDraw() 
	{
		var d = g_sActiveDrawData.Get(canvas_load_ix);
		if (d == null)
			return;

	    canvas_ctx.globalAlpha = d.alpha;
		canvas_ctx.drawImage(canvas_stamp_img, d.x-STAMP_W/2,d.y-STAMP_H/2, STAMP_W,STAMP_H);
	    canvas_ctx.globalAlpha = 1.0;
		
		canvas_load_ix++;
		canvas_StampImageLoad();	
	}

	// キャンバス：マウスタッチイベント
	function canvas_onTouchEvent(e) {
	    var pos = getTouchPos(e);
	    
	    drawStamp(pos.x, pos.y);
		
		save();
		
	    e.preventDefault(); //デフォルトイベント処理をしない
	    
	}


	var timerID;

	function drawStamp(x,y){
		if (stampBar.selectedStampId >= 0){
			stampBar.drawSelectedStamp(canvas_ctx, x,y);
	        //playAudioSE_Stamp();
		}
	}


	//セーブ
	function save() 
	{
		SaveHaveStampData();
	}


	
	// 描画データの設定
	g_iEditSheetIndex = LoadActiveSheetIndex();
	g_sActiveDrawData = GetStampDrawData(g_iEditSheetIndex);//new StampDrawData(g_iEditSheetIndex);

	var rootSceen = document.getElementById("sceen");
	var sceen = document.createElement("div");
	rootSceen.appendChild(sceen);
	sceen.style.opacity = alpha;
	
	var im =document.createElement('canvas');
	im.setAttribute('id', 'canvas');
 	im.width = 640;   
	im.height = 1200;  
	sceen.appendChild(im);		
	
	//stamp_bar
   ///this.canvas = document.getElementById("stamp_bar");
  ///  this.ctx = this.canvas.getContext("2d");
/*	position: fixed;
    overflow:hidden;	// はみ出した部分表示しない
	position:fixed;
    bottom:0px;
    left:0px;
    background-color: #555;	
*/
	
	var iMenuDel =document.createElement('button');
	iMenuDel.setAttribute('id', 'menu_del');
	iMenuDel.style.position = "absolute";  
	iMenuDel.innerHTML = 'クリア'
 	iMenuDel.style.top = "50px";
 	iMenuDel.style.left = "50px";
 	iMenuDel.style.width = "60px";   
	iMenuDel.style.height = "60px";  
	var fd = new Function("clearButtonClick();");
 	iMenuDel.onclick = fd; 
	sceen.appendChild(iMenuDel);		
		
	
	var imstamp_bar =document.createElement('canvas');
	imstamp_bar.setAttribute('id', 'stamp_bar');
 	imstamp_bar.width = 640;   
	imstamp_bar.height = 160;  
	imstamp_bar.style.position = "fixed";
    imstamp_bar.style.bottom = "0px";
    imstamp_bar.style.left = "0px";
	imstamp_bar.overflow = "hidden";  
	sceen.appendChild(imstamp_bar);		

	
//	<button id="menu_button" onclick="menuButtonClick()">MENU</button>
/*
  var element = document.getElementById('hoge');	
  var e = document.createElement('button');
  e.innerHTML = 'ボタン';
  var f = new Function("alert('ok');");
  e.onclick = f;
  element.appendChild(e);
*/
/*
#menu_button {
	position: absolute;
	bottom:0px;
	right:0px;
	width: 120px;
	height: 160px;
}
	this.div.style.position = "fixed";
	this.div.style.overflow = "hidden";
	this.div.style.width = w + "px";
	this.div.style.height = h + "px";
	this.img.style.position = "absolute";
	this.img.style.top = "0px";
	this.img.style.left = "0px";
	this.img.style.overflow = "hidden";
	this.div.appendChild(this.img);
*/
	var iMenu =document.createElement('button');
	iMenu.setAttribute('id', 'menu_button');
	iMenu.style.position = "absolute";  
	iMenu.innerHTML = 'MENU'
 	iMenu.style.bottom = "0px";
 	iMenu.style.right = "0px";
 	iMenu.style.width = "120px";   
	iMenu.style.height = "160px";  
	var f = new Function("menuButtonClick();");
 	iMenu.onclick = f; 
	sceen.appendChild(iMenu);		

/*
#menu_button {
	position: absolute;
	bottom:0px;
	right:0px;
	width: 120px;
	height: 160px;
}
*/
    canvas_Init();
    stampBar = new StampBar(3);
	
	st = STATUS.INIT;
	var next;
	var alpha = 0;
	
/*
        <div id="ok"><img src="img/stamp/s_btn_d000.png" onMouseDown=goStamp() onTouchStart=goStamp()></img></div>
        <div id="cancel"><img src="img/stamp/s_btn_e000.png" onMouseDown=goTitle() onTouchStart=goTitle()></img></div>
#ok {
    position: fixed;
    bottom:5px;
    left:20px;
}

#cancel {
    position: fixed;
    bottom:5px;
    left:340px;
	
}

*/

	//
	// フレーム処理
	//
	this.onframe = function() {

		switch(st) {

			//初期化
			case STATUS.INIT:
				//各データが読み込まれるまで待つ
				if (LoadingCounter <= 0) {
					st = STATUS.FADEIN;
				}
				break;

			//フェードイン
			case STATUS.FADEIN:
				alpha += (1.0 / 4);
				if (alpha >= 1.0) {
					alpha = 1.0;
					st = STATUS.MAIN;
				}
				sceen.style.opacity = alpha;
				break;

			//メイン処理
			case STATUS.MAIN:
				// メインキャンバスの描画
			//	canvas_Draw();
    		//	mainCanvas.draw();
	        	stampBar.slide();
	            stampBar.updateDispInfo();
	            stampBar.imageLoad();
	            stampBar.draw();

				// スタンプエフェクト
				if(sTimeHandle) { ExecEffect(); }
				break;
			
			//フェードアウト
			case STATUS.FADEOUT:
				alpha -= (1.0 / 4);
				if (alpha <= 0) {
					alpha = 0;
					st = STATUS.END;
				}
				sceen.style.opacity = alpha;
				break;

			//終了
			case STATUS.END:
				//DOMエレメントの削除
				rootSceen.removeChild(sceen);
				canvas_img = null;
				//次のシーンをセット
				if(nNextEvent == 0)
				{
					nextSceen = new StampSelect();
				}
				else
				{
					nextSceen = new StampMain();
				}
				break;
		}
	};
	
};



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


