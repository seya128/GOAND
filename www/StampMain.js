
// 定義
var STAMPS_H 	= STAMP_H;//STAMP_H + 15;
var nArrowSize	= 22;
var nGaugeMaxStlong = 3;

// スタンプ描画データ
var g_sActiveDrawData;

// スタンプバー
var stampBar;

// キャンバスのオフセット
var g_iCanvasOffsetY = 0;

var stamp_canvas;
var stamp_ctx;
	
//
var g_iEditSheetIndex = 0;					//シート番号
var BROWSER_STAMP_H = 0;

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


var SBarbTouch			= false;
var SBarbOldTouch		= false;
var SBarsTouchStartX 	= -200;
var SBarsTouchStartY 	= -200;
var SBarsTouchMoveX 	= -200;
var SBarsTouchMoveY 	= -200;	
	
// 描画禁止
function GetDrawOkFlg()
{
/*
	NON:					-1,	// なし
	NONE:					0,	// 何も
	INIT_WAIT:				1,	// 初めのウェイト(2秒)
	STAMP_TOUCH_SELECT:		2,	// スタンプをタッチして選んでね
	SHEET_TOUCH_WRITE:		3,	// シートにスタンプを押してね
	STAMP_TOUCH_DEAD:		4,	// スタンプがなくなった
	MENU_SELECT:			5,	// メニューセレクト
	MENU_WAIT:				6,	// メニュー表示にて少し待つ
	STAMP_CLEAR:			7,	// スタンプをクリア
	STAMP_CLEAR_WINDOW:		8,	// クリア確認ウィンドウ
	MENU_SELECT_END:		9,	// メニューセレクト	
	BACK:					11,	// 戻る
*/
	// OK
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.NONE) { return true; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.NON)  { return true; }
	
	// だめ
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.INIT_WAIT) 				{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_SELECT) 		{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.SHEET_TOUCH_WRITE_MES) 	{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.SHEET_TOUCH_WRITE) 		{ return true;  }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_DEAD) 		{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_DEAD_2) 		{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_DEAD_WAIT) 	{ return false; }	
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_SELECT) 				{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_WAIT)			 	{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_CLEAR) 				{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_CLEAR_WINDOW) 		{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_SELECT_END) 			{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.BACK) 					{ return false; }
	return false;
}

// キャンバス真っ黒
function GetCanvasBackBlack()
{
	// OK
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.NONE) { return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.NON)  { return false; }
	
	// だめ
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.INIT_WAIT) 				{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_SELECT) 		{ return true;  }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.SHEET_TOUCH_WRITE_MES) 	{ return true;  }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.SHEET_TOUCH_WRITE) 		{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_DEAD) 		{ return true;  }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_DEAD_2) 		{ return true; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_DEAD_WAIT) 	{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_SELECT) 				{ return true;  }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_WAIT)			 	{ return true;  }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_CLEAR) 				{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_CLEAR_WINDOW) 		{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_SELECT_END) 			{ return true;  }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.BACK) 					{ return true;  }	
	return true;
}

// メニュー選択禁止
function GetMenuSelectOkFlg()
{
	// OK
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.NONE) { return true; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.NON)  { return true; }
	
	// だめ
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.INIT_WAIT) 				{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_SELECT) 		{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.SHEET_TOUCH_WRITE_MES) 	{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.SHEET_TOUCH_WRITE) 		{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_DEAD) 		{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_DEAD_2) 		{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_DEAD_WAIT) 	{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_SELECT) 				{ return true;  }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_WAIT)			 	{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_CLEAR) 				{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_CLEAR_WINDOW) 		{ return false; }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_SELECT_END) 			{ return true;  }
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.BACK) 					{ return false; }
	return true;
}

//
// スタンプバー
//
var NUM_STAMPBAR_W = 5+2;   //スタンプバーが表示用に管理するスタンプの数

function StampBar() 
{
    this.offset    = 0;                      //オフセット座標
    this.offsetAdd = 0;
    this.leftHasStampId = 0;                //左端に表示されている所持スタンプＩＤ
    this.leftStampIx = 0;                   //左端のスタンプオブジェクトのインデックス
    this.leftDispOfs = 0;                   //表示オフセット
    this.selectedStampId = -1;				//選択された手持ちスタンプのID
	this.selectedStampIx = -1;    			//選択されたスタンプオブジェクトのインデックス
    this.isTouched = false;
    this.touchOffset = 0;
    this.isSlide = false;
	this.iSelectedX = 0;
	this.bTutorialTouch     = false;
	this.bOldTutorialTouch  = false;
	// キャンバスをスタンプの種類分作成
	this.sStampSheetCanvas = new Array();
	this.sStampSheetCtx    = new Array();	
	
 	SBarbTouch			= false;
 	SBarbOldTouch		= false;
 	SBarsTouchStartX 	= -200;
 	SBarsTouchStartY 	= -200;
 	SBarsTouchMoveX 	= -200;
 	SBarsTouchMoveY 	= -200;	
	
    this.canvas = document.getElementById("stamp_bar");
    this.ctx = this.canvas.getContext("2d");
	
	// イベントのセット
    this.updateDispInfo();
    this.imageLoad();
    this.setTouchEvent();	
}

//スタンプバー表示情報更新
StampBar.prototype.updateDispInfo = function()
{
    
	// 3つ以下なら固定する
	if(g_HaveStampImageData.length <= 0) 
	{ 
		this.leftDispOfs = 0;
		return;
	}
	if(g_HaveStampImageData.length <= 3) 
	{ 
		this.leftDispOfs = 0;
		this.offset = 0;
	}
    if (this.offsetAdd < -STAMP_W)  this.offsetAdd = -STAMP_W;
    if (this.offsetAdd > STAMP_W)   this.offsetAdd = STAMP_W;
    this.offset += this.offsetAdd;
	
	if(this.offset > (g_HaveStampImageData.length - 3)*STAMP_W) { this.offset = (g_HaveStampImageData.length - 3)*STAMP_W; }	
	if(this.offset < 0) { this.offset = 0; }

    //移動したら選択は解除
    if (this.offsetAdd !=0)	this.selectedStampId = -1;

    //計算用オフセット
    var offset = this.offset;
  
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
};

StampBar.prototype.SetupStampCanvas = function()
{
	// 手持ちのスタンプをインスタンス化
	for(var i = 0; i < g_HaveStampImageData.length; i ++)
	{
		// 一個づつ
		var s = getHasStampData(i);
		//var index = s.id;
		var index = i;		
		if(!this.sStampSheetCanvas[index])
		{
			// シート作成
		    this.sStampSheetCanvas[index] = document.createElement("canvas");
			this.sStampSheetCanvas[index].setAttribute("id","MoveCanvas" + index);
			this.sStampSheetCanvas[index].setAttribute("width", "" + STAMP_W);
			this.sStampSheetCanvas[index].setAttribute("height","" + STAMPS_H);
		    this.sStampSheetCtx[index]    = this.sStampSheetCanvas[index].getContext("2d");
			
			// 白バック
			this.sStampSheetCtx[index].fillStyle = 'rgb(255, 255, 255)';
			this.sStampSheetCtx[index].fillRect(0, 0, STAMP_W, STAMPS_H);	
			// 中身黒
			this.sStampSheetCtx[index].fillStyle = 'rgb(0, 0, 0)';
	        this.sStampSheetCtx[index].fillRect(2, 2, STAMP_W-4, STAMPS_H-4)		
			// スタンプの表示
			this.sStampSheetCtx[index].drawImage(GetStampGraphicHandle_Image(s.id), 0, 0, STAMP_W, STAMPS_H);
			// 耐久値の表示
			DrawStrNum(this.sStampSheetCtx[index], 110, 150, s.ink / 3, false, 0.25, 1.0, 22);
			
		}
	}
}

StampBar.prototype.ChangeStampCanvas = function(id, ink)
{
	if(!this.sStampSheetCanvas[id])
	{
		// シート作成
	    this.sStampSheetCanvas[id] = document.createElement("canvas");
		this.sStampSheetCanvas[id].setAttribute("id","MoveCanvas" + id);
		this.sStampSheetCanvas[id].setAttribute("width", "" + STAMP_W);
		this.sStampSheetCanvas[id].setAttribute("height","" + STAMPS_H);
	    this.sStampSheetCtx[id]    = this.sStampSheetCanvas[id].getContext("2d");
	}
	var s = getHasStampData(id);
	// 白バック
	this.sStampSheetCtx[id].fillStyle = 'rgb(255, 255, 255)';
	this.sStampSheetCtx[id].fillRect(0, 0, STAMP_W, STAMPS_H);	
	// 中身黒
	this.sStampSheetCtx[id].fillStyle = 'rgb(0, 0, 0)';
    this.sStampSheetCtx[id].fillRect(2, 2, STAMP_W-4, STAMPS_H-4)		
	// スタンプの表示
	this.sStampSheetCtx[id].drawImage(GetStampGraphicHandle_Image(s.id), 0, 0, STAMP_W, STAMPS_H);
	// 耐久値の表示
	DrawStrNum(this.sStampSheetCtx[id], 110, 150, ink / 3, false, 0.25, 1.0, 22);	
}
StampBar.prototype.DeleteStampCanvas = function(id)
{
	//this.sStampSheetCanvas[id] = null;
	this.sStampSheetCanvas.splice(id, 1);
	//this.sStampSheetCtx[id] = null;
	this.sStampSheetCtx.splice(id, 1);
}

StampBar.prototype.draw = function()
{

	var x  = Math.floor(this.leftDispOfs);
    var ix = this.leftStampIx;
    var id = this.leftHasStampId;
    
//    this.ctx.fillStyle = 'rgb(255, 255, 255)';
//   this.ctx.fillRect(0, 0, 640, STAMPS_H);
	// ------------------------------------------
	// スタンプの描画
	// ------------------------------------------    
	var iDrawNum = NUM_STAMPBAR_W - 2;
    for (i = 0; i < iDrawNum; i ++)
	{
		// ------------------------------------------
		// 空データ
		// ------------------------------------------
		if(id >= g_HaveStampImageData.length)
		{
	        this.ctx.fillStyle = 'rgb(0, 0, 0)';
	        this.ctx.fillRect(x, 0, STAMP_W, STAMPS_H);
			x += STAMP_W;
			continue;
		}	
		
		// ------------------------------------------
		// スタンプデータ
		// ------------------------------------------
        var s = getHasStampData(id);
		{
			// キャンバスを描画
			this.ctx.drawImage(this.sStampSheetCanvas[id], x, 0);
			
			// 選択時(赤色)
			if(id == this.selectedStampId) 
			{
		        this.selectedStampIx = ix;
				this.iSelectedX      = x;
			
				var LineSize  = 6;
				var LineSizeH = 3;
				this.ctx.lineWidth = LineSize; 
				this.ctx.strokeStyle="#ff0000";
				this.ctx.beginPath();
				this.ctx.moveTo(x + LineSizeH, 		 		1);
				this.ctx.lineTo(x + STAMP_W - LineSizeH, 	1);
				this.ctx.lineTo(x + STAMP_W - LineSizeH, 	0 + STAMPS_H - LineSizeH);
				this.ctx.lineTo(x + LineSizeH, 		 		0 + STAMPS_H - LineSizeH);
				this.ctx.closePath();
				this.ctx.stroke();				
			}
			
			// スタンプの表示
		//	this.ctx.drawImage(GetStampGraphicHandle_Image(s.id), x, 0, STAMP_W, STAMPS_H);
			// 耐久値の表示
		//	DrawStrNum(this.ctx, x + 114, 154, s.ink / 3, false, 0.25, 1.0, 22);
        }
        x += STAMP_W;
        ix ++;
        id ++;
    }
	// 矢印を描画
	ProcArrow();
	MoveArrowL();
	MoveArrowR();
	if(g_HaveStampImageData.length <= 3)
	{
	}
	else if(this.offset <= 0)
	{
		DrawArrowRM(this.ctx, 468, 88);
	}
	else if(this.offset >= (g_HaveStampImageData.length - 3) * STAMP_W)
	{
		DrawArrowLM(this.ctx, 32,  88);
	}
	else
	{
		DrawArrowLM(this.ctx, 32,  88);	
		DrawArrowRM(this.ctx, 468, 88);
	}
};


//スタンプバー描画
StampBar.prototype.drawmenu = function()
{
	// メニュー
	var event = -1;
	
	// 光ってるけど押せない
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.INIT_WAIT)
	{
		DrawMenu(this.ctx, ((!SBarbTouch) && SBarbOldTouch), SBarsTouchStartX, SBarsTouchStartY, SBarsTouchMoveX, SBarsTouchMoveY);
		this.ctx.globalAlpha = 0.6;
		this.ctx.fillStyle = 'rgb(0, 0, 0)';				
		this.ctx.fillRect(161, 0,  640 - 161,  160);
		this.ctx.globalAlpha = 1.0;	
	}
	// 正常
	else if(GetMenuSelectOkFlg())
	{
		event = DrawMenu(this.ctx, ((!SBarbTouch) && SBarbOldTouch), SBarsTouchStartX, SBarsTouchStartY, SBarsTouchMoveX, SBarsTouchMoveY);
	}
	// 下画面無効
	else if(g_TutorialMainFlg >= gTUTORIAL_MAINFLG.MENU_WAIT)
	{
		DrawMenu(this.ctx, ((!SBarbTouch) && SBarbOldTouch), SBarsTouchStartX, SBarsTouchStartY, SBarsTouchMoveX, SBarsTouchMoveY);
		this.ctx.globalAlpha = 0.6;
		this.ctx.fillStyle = 'rgb(0, 0, 0)';	
		this.ctx.fillRect(0, 0,  640,  160);
		this.ctx.globalAlpha = 1.0;		
	}
	else
	{
		DrawMenu(this.ctx, ((!SBarbTouch) && SBarbOldTouch), SBarsTouchStartX, SBarsTouchStartY, SBarsTouchMoveX, SBarsTouchMoveY);
		this.ctx.globalAlpha = 0.6;
		this.ctx.fillStyle = 'rgb(0, 0, 0)';	
		this.ctx.fillRect(161, 0,  640 - 161,  160);
		//this.ctx.fillRect(0, 0, 640,  160);
		this.ctx.globalAlpha = 1.0;		}
	
	if(g_iSwitch != 0)
	{
		if(g_TutorialMainFlg <= gTUTORIAL_MAINFLG.NONE)
		{
			DrawBack(this.ctx);
			if(g_iSwitch == 2) { DrawBack(this.ctx); }
		}
	}
	else
	{
		if(event != -1) 
		{ 
			g_iSwitch = 1; 
			// 押した
			if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_SELECT)
			{
				g_TutorialNextMainFlg = gTUTORIAL_MAINFLG.MENU_WAIT;
			}	
			else if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_SELECT_END)
			{
				g_TutorialNextMainFlg = gTUTORIAL_MAINFLG.BACK;
			}
			
		}
	}
	SBarbOldTouch = SBarbTouch;	
}

//タッチイベントリスナーの追加
StampBar.prototype.setTouchEvent = function() 
{
    var _this = this;
    var startX = 0;
    var startOffset;
    var touchX = 0;

    //タッチ開始
    var touchStartEvent = function(e) 
	{
		// 無視
		//if(g_TutorialMainFlg > gTUTORIAL_MAINFLG.STAMP_NONE && g_TutorialMainFlg < gTUTORIAL_MAINFLG.STAMP_TOUCH_SELECT)
		//{
		//	return;
		//}
		// 選択禁止
		_this.bTutorialTouch = true;
		if(g_TutorialMainFlg <= gTUTORIAL_MAINFLG.STAMP_TOUCH_SELECT || g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_SELECT || g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_SELECT_END)
		{
	        if(GGetEffectNum() == 0 && (g_iSwitch == 0))
			{
		        _this.isTouched = true;
		    	    
		        var pos = getTouchPos(e);
		        startX = touchX = pos.x;
		        startOffset = _this.touchOffset = _this.offset;
				
				SBarbTouch			= true;
				SBarsTouchStartX 	= pos.x;
				SBarsTouchStartY 	= pos.y;
				SBarsTouchMoveX 	= pos.x;
				SBarsTouchMoveY 	= pos.y;
			} 
			else 
			{ 
				_this.isTouched = false; 
				SBarbTouch = false;
			}
		}
        e.preventDefault(); //デフォルトイベント処理をしない
    };    

    //移動
    var touchMoveEvent = function(e) 
	{
		// 選択禁止
		if(_this.isTouched)
		{
	        if(GGetEffectNum() == 0 && (g_iSwitch == 0))
			{
		    	if (_this.isTouched) 
		    	{
		            var pos =  getTouchPos(e);
		            var ofs = pos.x - startX;
		            touchX = pos.x;
		            _this.touchOffset = startOffset - ofs;
		    		
					SBarbTouch			= true;
					//SBarsTouchStartX 	= pos.x;
					//SBarsTouchStartY 	= pos.y;
					SBarsTouchMoveX 	= pos.x;
					SBarsTouchMoveY 	= pos.y;	    		
		        }
			} 
	    	else 
	    	{ 
	    		SBarbTouch = false;
	    		_this.isTouched = false; 
	    	}
		}
        e.preventDefault(); //デフォルトイベント処理をしない
    };    

    //タッチ終了
    var touchEndEvent = function(e) 
	{
		_this.bTutorialTouch = false;
		if(_this.isTouched)
		{
	        _this.isTouched = false;
			SBarbTouch = false;
	        
	        //移動していなければスタンプ選択
	        if(GGetEffectNum() == 0 && (g_iSwitch == 0))
			{
				if(touchX < 495)
				{
		        	if (startX == touchX)
					{
		        		_this.selectStamp(touchX);
					}
				}
			}   
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
StampBar.prototype.selectStamp = function(x)
{	
	var offset = x + this.offset;
	if(offset > g_HaveStampImageData.length*STAMP_W) { offset = g_HaveStampImageData.length*STAMP_W; }
	if (offset < 0) { offset = 0; }
	
	var id = Math.floor(offset/STAMP_W);
	this.selectedStampId = id;
					
	// スタンプをタッチして選んでね
	if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_SELECT)
	{
		// 使い込みモード
		if(id == 0)
		{
			g_TutorialNextMainFlg = gTUTORIAL_MAINFLG.SHEET_TOUCH_WRITE_MES;
		}
	}
}

//選択スタンプ描画
StampBar.prototype.drawSelectedStamp_t = function(ctx,x,y, ink)
{
	var ix = this.selectedStampIx;		//選択された手持ちスタンプのID
	var id = this.selectedStampId;		//選択されたスタンプオブジェクトのインデックス
    var s = getHasStampData(id);
	
	ctx.drawImage(GetStampGraphicHandle_Image(s.id), Math.floor(x - STAMP_W / 2), Math.floor(y - STAMP_H / 2), STAMP_W, STAMP_H);
}

StampBar.prototype.DeleteStamp = function(_This)
{
	// スタンプデータを外す
	_This.nVal3.DeleteStampCanvas(_This.nVal2);
	DelHasStamp(_This.nVal2);
	SaveHaveStampData();
	this.selectedStampId = -1;

}

StampBar.prototype.AddStamp = function(_This)
{
	var ix = _This.nVal1;		//選択された手持ちスタンプのID
	var id = _This.nVal2;		//選択されたスタンプオブジェクトのインデックス

	// 持っているスタンプデータの取得
    var s = getHasStampData(id);
	var x = _This.nX;
	var y = _This.nY;
	
	// 描画
	_This.nVal3.drawImage(_This.sImage, Math.floor(x),
										Math.floor(y), 
										STAMP_W,
										STAMP_H);
	
    //描画データ保存
    g_sActiveDrawData.Add(Math.floor(x + (STAMP_W / 2)), Math.floor(y + (STAMP_H / 2)), s.id, 1.0);
    g_sActiveDrawData.Save();	//オートセーブ

	// インク切れの瞬間
	if(s.ink <= 0)      
	{
		var vData = AddScaleZoomEffect(stampBar.ctx, GetStampGraphicHandle_Image(s.id), Math.floor(stampBar.iSelectedX), 0, STAMP_W, STAMP_H, 1.0);
		vData.nCrsFlg 		= false;
		vData.nCrsW			= 0;
	    vData.nVal1 		= ix;
		vData.nVal2 		= id;
		vData.nVal3 		= _This.nVal4;
		vData.nMaxTime		= 2;
		vData.nStatus 		= G_EFFECT_STATUS.SCALE_FADE_ZOOM;
		vData.EndCallBack	= StampBar.prototype.DeleteStamp;
		
		// チュートリアル
		if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.SHEET_TOUCH_WRITE)
		{
			g_TutorialNextMainFlg = gTUTORIAL_MAINFLG.STAMP_TOUCH_DEAD;	
			vData.bWait			= true;
		}
	}
}

StampBar.prototype.InkMinus = function()
{
	var id = this.selectedStampId;		//選択されたスタンプオブジェクトのインデックス
    var s = getHasStampData(id);
	s.ink --;
	if(s.ink < 0) { s.ink = 0; return false; }
	return true;
}

StampBar.prototype.InkMinus5 = function()
{
	var id = this.selectedStampId;		//選択されたスタンプオブジェクトのインデックス
    var s = getHasStampData(id);
	
	if(s.ink >= nGaugeMaxStlong) { s.ink -= nGaugeMaxStlong; return true; }
	s.ink --;
	if(s.ink < 0) { s.ink = 0; }
	return false;
}

//選択スタンプ描画
StampBar.prototype.drawSelectedStamp = function(ctx,x,y,ink)
{
	var ix = this.selectedStampIx;		//選択された手持ちスタンプのID
	var id = this.selectedStampId;		//選択されたスタンプオブジェクトのインデックス

	// 持っているスタンプデータの取得
    var s = getHasStampData(id);
	
	// インクは０－５
/*
    var a = ink;  //残りインクを５段階に(6-1)
	if (a >= nGaugeMaxStlong)		{ a = 1.0;					}
	else if (a > 0)					{ a = a / nGaugeMaxStlong;	}
	else	 						{ a = 0;					}
  */      
 //   ctx.globalAlpha = a;
	ctx.drawImage(GetStampGraphicHandle_Image(s.id), Math.floor(x - STAMP_W / 2), Math.floor(y - STAMP_H / 2), STAMP_W, STAMP_H);
 //   ctx.globalAlpha = 1.0;
	
	//if((g_TutorialMainFlg == gTUTORIAL_MAINFLG.SHEET_TOUCH_WRITE) && ink <= nGaugeMaxStlong)
	/*{
		var vData = AddScaleZoomEffect(stamp_ctx, GetStampGraphicHandle_Image(s.id), 
							x - STAMP_W / 2,
							y - STAMP_H / 2, STAMP_W, STAMP_H, a);
		vData.bWait			= true;
	    vData.nVal1 		= ix;
		vData.nVal2 		= id;
		vData.nVal3 		= ctx;	
		vData.nVal4 		= ink;	
		vData.EndCallBack	= StampBar.prototype.AddStamp;
		g_TutorialNextMainFlg = gTUTORIAL_MAINFLG.STAMP_TOUCH_DEAD;		
	}
	else*/
	{
		var vData = AddScaleZoomEffect(stamp_ctx, GetStampGraphicHandle_Image(s.id), 
							x - STAMP_W / 2,
							y - STAMP_H / 2, STAMP_W, STAMP_H, 1.0);
	    vData.nVal1 		= ix;
		vData.nVal2 		= id;
		vData.nVal3 		= ctx;	
		vData.nVal4 		= this;	
		vData.EndCallBack	= StampBar.prototype.AddStamp;
	}
	this.ChangeStampCanvas(id, s.ink);

}


	
var nNextEvent = 0;

// MENUボタンクリック
function menuButtonClick(e)
{
	g_WindowsScaleRate = 0;
	g_iSwitch = 1;

}
// クリア
function clearButtonClick(e)
{
	g_iSwitch = 0;
	g_sActiveDrawData.Clear();	//削除
	g_sActiveDrawData.Save();	//オートセーブ
	g_eStatus = G_STATUS.FADEOUT;
	nNextEvent = 1;
}


var StampMain = function() 
{
	g_iCanvasOffsetY    = 0;
	var bTouch			= false;
	var bOldTouch		= false;
	var sTouchStartX 	= -200;
	var sTouchStartY 	= -200;
	var sTouchMoveX 	= -200;
	var sTouchMoveY 	= -200;		
	var canvas_canvas;
	var canvas_ctx;
	var nInkStlong      = 0;
	var nInkCounter		= 0;
	var canvas_img 		= new Image();
	var canvas_load_ix 	= 0;
	var iWaitCounter   	= 0;
	var bTutorialTouch     = false;
	var bOldTutorialTouch  = false;
	var bTutorialStartX  = -200;
	var bTutorialStartY  = -200;
	var bTutorialEndX    = -200;
	var bTutorialEndY    = -200;
	var bTempDrawX = 0;
	var bTempDrawY = 0;
	var bTempDrawFlg = false;

	// スタンプをタッチして選んでね
	var sStampTouchSelectMessage = null;
	// シートにスタンプを押してね
	var sSheetTouchSelectMessage = null;
	// スタンプは１５回押すと亡くなる
	var sStampTouch15Message = null;
	// メニューを押してね
	var sMenuTouchMessage = null;
	// 次はスタンプを消してみよう
	var sStampClearMessage = null;
	// 最後に初めの画面にもどるには
	var sMenuEndMessage1 = null;
	var sMenuEndMessage2 = null;
	// 終わるを押してね
	var sBackMessage = null;
	var sMenuClear01Message1 = null;
	var sMenuClear02Message1 = null;
	var sModoruMessage   = null;
	var sSmafo           = false;
	
	// ウィンドウサイズ
    BROWSER_WIDTH   = window.innerWidth  || document.body.clientWidth  || document.documentElement.clientWidth;
    BROWSER_HEIGHT  = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
    BROWSER_HEIGHT  += 30;
	BROWSER_RATE 		= (640 / BROWSER_WIDTH);
	BROWSER_STAMP_H 	= Math.floor(STAMP_H * BROWSER_RATE);
	BROWSER_SCREEN_H 	= Math.floor((BROWSER_HEIGHT * BROWSER_RATE) - BROWSER_STAMP_H);	// 画面領域
	
	//背景描画
	function canvas_Draw() 
	{
		// シートの表示
	    canvas_ctx.drawImage(canvas_img, 0,0);
	    // スタンプの表示
		canvas_StampDraw();
	}

	// キャンバス：初期化
	function canvas_Init() {
		
		canvas_canvas = document.getElementById("canvas");
		canvas_ctx = canvas_canvas.getContext("2d");	
		stamp_canvas = document.getElementById("stamp_c");
		stamp_ctx = stamp_canvas.getContext("2d");	
	    // マウスイベントリスナーの追加
	    if (navigator.userAgent.indexOf('iPhone')>0 ||
	        navigator.userAgent.indexOf('iPod')>0 ||
	        navigator.userAgent.indexOf('iPad')>0 ||
	        navigator.userAgent.indexOf('Android')>0) {
	        //canvas_canvas.addEventListener("touchstart", onTouchStart, false);
	        //canvas_canvas.addEventListener("touchmove" , onTouchMove,  false);
	        //canvas_canvas.addEventListener("touchend"  , onTouchEnd,   false);       
	        stamp_canvas.addEventListener("touchstart", onTouchStart, false);
	        stamp_canvas.addEventListener("touchmove" , onTouchMove,  false);
	        stamp_canvas.addEventListener("touchend"  , onTouchEnd,   false);  
	        sSmafo = true;
	    } 
		else 
		{
	        //canvas_canvas.addEventListener("mousedown", onTouchStart, false);
	        //canvas_canvas.addEventListener("mousemove", onTouchMove,  false);
	        //canvas_canvas.addEventListener("mouseup"  , onTouchEnd,   false);
	        stamp_canvas.addEventListener("mousedown", onTouchStart, false);
	        stamp_canvas.addEventListener("mousemove", onTouchMove,  false);
	        stamp_canvas.addEventListener("mouseup"  , onTouchEnd,   false);
	    }
		
	    //背景ロード
	    canvas_img = GetSheetGraphicHandle_Image(g_HaveStampSheetData[g_iEditSheetIndex]["id"]);
	//    canvas_img.src = gStampBgFileName[g_HaveStampSheetData[g_iEditSheetIndex]["id"]];
	}

	function canvas_StampDraw() 
	{
		canvas_load_ix = 0;
		for(;;)
		{
			var d = g_sActiveDrawData.Get(canvas_load_ix);
			if (d == null) { return; }

		   // canvas_ctx.globalAlpha = d.alpha;
			canvas_ctx.drawImage(GetStampGraphicHandle_Image(d.id), Math.floor(d.x-STAMP_W/2),
																	Math.floor(d.y-STAMP_H/2), STAMP_W,STAMP_H);
		   // canvas_ctx.globalAlpha = 1.0;
			canvas_load_ix++;
		}
	}
    //マウスイベント
    function onTouchStart(e)
	{	e.preventDefault(); //デフォルトイベント処理をしない
		if(sSmafo && e.touches.length > 1) { return; }
		bTutorialTouch = true;
		var pos = getTouchPos(e);
	    bTutorialStartX = pos.x;
	    bTutorialStartY = pos.y;
		
		if(GGetEffectNum() == 0)
		{
	        sTouchStartX = pos.x;
	        sTouchStartY = pos.y;
	        sTouchMoveX  = pos.x;
	        sTouchMoveY  = pos.y;
	        bTouch = true;
			nInkStlong = 1;
			nInkCounter = 0;
			if(g_iSwitch == 0 && (stampBar.selectedStampId < g_HaveStampImageData.length && stampBar.selectedStampId != -1) && GetDrawOkFlg())
			{
				if(stampBar.InkMinus5()) { nInkStlong = nGaugeMaxStlong; }
				if(bTempDrawFlg)
				{
					ClearRect(stamp_ctx, bTempDrawFlgX - 100, bTempDrawFlgY - 100, 200, 200);
				}
				
				bTempDrawFlg = true;
				bTempDrawFlgX = pos.x;
				bTempDrawFlgY = pos.y;
				drawStamp_t(pos.x, pos.y, nInkStlong);
				//setTimeout(onTouchDown , 100);
			}
			else if(g_iSwitch == 0) { bTouch = false; }
		} else { bTouch = false; }
    };
/*
	function onTouchDown()
	{
		if(g_iSwitch != 0) { return; }
		if(!bTouch)        { return; }
		//nInkCounter ++;
		//if(nInkCounter > 3)
		{
		//	nInkCounter = 0;
			if(nInkStlong < nGaugeMaxStlong) 
			{ 
				if(stampBar.InkMinus())
				{
					nInkStlong ++; 
				}
				else { return; }
			} else { return; }
		}
		drawStamp_t(sTouchMoveX, sTouchMoveY, nInkStlong);	
		setTimeout(onTouchDown , 100);	
	}
*/
    function onTouchMove(e) 
	{
		e.preventDefault(); //デフォルトイベント処理をしない
		if(sSmafo && e.touches.length > 1) { return; }
		var pos = getTouchPos(e);
	    bTutorialEndX = pos.x;
	    bTutorialEndY = pos.y;
		if(GGetEffectNum() == 0)
		{
	        if (bTouch) 
	    	{
				sTouchMoveX = pos.x;
				sTouchMoveY = pos.y;
				if(g_iSwitch == 0 && GetDrawOkFlg())
				{
					if(bTempDrawFlg)
					{
						ClearRect(stamp_ctx, bTempDrawFlgX - 100, bTempDrawFlgY - 100, 200, 200);
						bTempDrawFlgX = pos.x;
						bTempDrawFlgY = pos.y;	
					}
					drawStamp_t(sTouchMoveX, sTouchMoveY, nInkStlong);
					bTempDrawFlg = true;
				}
	        }
		} else { bTouch = false; }
        
    };
    function onTouchEnd(e)
	{
		e.preventDefault(); //デフォルトイベント処理をしない
		if(sSmafo && e.touches.length > 1) { return; }
		bTutorialTouch = false;
		if(GGetEffectNum() == 0)
		{
			if(bTouch)
			{
				if(g_iSwitch == 0 && GetDrawOkFlg())
				{
					if(bTempDrawFlg)
					{
						ClearRect(stamp_ctx, bTempDrawFlgX - 100, bTempDrawFlgY - 100, 200, 200);
						bTempDrawFlg = false;
					}
					drawStamp(sTouchMoveX, sTouchMoveY, nInkStlong);
					//canvas_ctx.drawImage(stamp_canvas, 0, 0, 640, 1200);
					
					// スタンプ座標を登録して自動セーブ
					SaveHaveStampData();
				}
				bTouch = false;
			}
		} else { bTouch = false; }
    };
	

	var timerID;

	function drawStamp(x,y,ink)
	{
		if (stampBar.selectedStampId >= 0)
		{	
			stampBar.drawSelectedStamp(canvas_ctx, x, y, ink);
	        //playAudioSE_Stamp();
		}
	}
	function drawStamp_t(x,y,ink)
	{
		if (stampBar.selectedStampId >= 0)
		{
			stampBar.drawSelectedStamp_t(stamp_ctx, x, y, ink);
	        //playAudioSE_Stamp();
		}
	}

	// タッチイベントの初期化
	//ClearTouch();
	
	// 描画データの設定
	g_iEditSheetIndex = LoadActiveSheetIndex();
	g_sActiveDrawData = GetStampDrawData(g_iEditSheetIndex);//new StampDrawData(g_iEditSheetIndex);
	var alpha = 0;
	var rootSceen = document.getElementById("sceen");
	var sceen = document.createElement("div");
	rootSceen.appendChild(sceen);
	sceen.style.opacity = alpha;
	
	// -----------------------------------------------
	// メインキャンバス
	// -----------------------------------------------
	var im =document.createElement('canvas');
	im.setAttribute('id', 'canvas');
 	im.width = 640;   
	im.height = 1200;  
	im.style.position = 'absolute';
 	//im.style.top = "0px"; 
 	//im.style.left ="0px"; 
	sceen.appendChild(im);		
	// -----------------------------------------------
	// スタンプキャンバス
	// -----------------------------------------------
	im =document.createElement('canvas');
	im.setAttribute('id', 'stamp_c');
 	im.width = 640;   
	im.height = 1200;   
	im.style.position = 'absolute';
 	im.style.top = "0px"; 
 	im.style.left ="0px"; 
	sceen.appendChild(im);	
	
	// -----------------------------------------------
	// クリアボタンの作成
	// -----------------------------------------------	
/*
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
*/	
	// -----------------------------------------------
	// ステータスバーキャンバスの作成
	// -----------------------------------------------
	var imstamp_bar =document.createElement('canvas');
	imstamp_bar.setAttribute('id', 'stamp_bar');
 	imstamp_bar.width = 640;   
	imstamp_bar.height = STAMPS_H;  
	imstamp_bar.style.position = "fixed";
    imstamp_bar.style.bottom = "0px";
    imstamp_bar.style.left = "0px";
	imstamp_bar.overflow = "hidden";  
	sceen.appendChild(imstamp_bar);		

	// -----------------------------------------------
	// メニューボタンの作成
	// -----------------------------------------------
/*
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
*/

    canvas_Init();
    stampBar = new StampBar();	
	g_iSwitch = 0;
	g_eStatus = G_STATUS.INIT;
	var next;
	var alpha = 0;
	// エフェクト
	GSetupEffect();
	// シートを必ずロード
	LoadSelectSheetGraphic(g_iEditSheetIndex);
	// デバッグチューチュートリアル
//	DEBUG_TUTORIAL();
	
	// チュートリアルならプラスα
	if(g_TutorialFlg)
	{
		// スタンプへ
		SetTutorialStatus(gTUTORIAL_STATUS.STAMP);
		// スタンプをタッチして選んでね
		sStampTouchSelectMessage = new Image();
	    sStampTouchSelectMessage.src = "img/10_asobikata/a_txt_a010.png";
		g_sTutorialLoadFlg.AddLoadFile(sStampTouchSelectMessage);
		// シートにスタンプを押してね
		sSheetTouchSelectMessage = new Image();
	    sSheetTouchSelectMessage.src = "img/10_asobikata/a_txt_a011.png";
		g_sTutorialLoadFlg.AddLoadFile(sSheetTouchSelectMessage);
		// スタンプは１５回押すと亡くなる
		sStampTouch15Message = new Image();
	    sStampTouch15Message.src = "img/10_asobikata/a_txt_a012.png";
		g_sTutorialLoadFlg.AddLoadFile(sStampTouch15Message);
		// メニューを押してね
		sMenuTouchMessage = new Image();
	    sMenuTouchMessage.src = "img/10_asobikata/a_txt_a013_02.png";
		g_sTutorialLoadFlg.AddLoadFile(sMenuTouchMessage);
		// 次はスタンプを消してみよう
		sStampClearMessage = new Image();
	    sStampClearMessage.src = "img/10_asobikata/a_txt_a015.png";
		g_sTutorialLoadFlg.AddLoadFile(sStampClearMessage);			
		// 最後に初めの画面にもどるには
		sMenuClear01Message1 = new Image();
	    sMenuClear01Message1.src = "img/10_asobikata/a_txt_a016.png";
		g_sTutorialLoadFlg.AddLoadFile(sMenuClear01Message1);	
		sMenuClear02Message1 = new Image();
	    sMenuClear02Message1.src = "img/10_asobikata/a_txt_a016_02.png";
		g_sTutorialLoadFlg.AddLoadFile(sMenuClear02Message1);	
		// 最後に初めの画面にもどるには
		sMenuEndMessage1 = new Image();
	    sMenuEndMessage1.src = "img/10_asobikata/a_txt_a017.png";
		g_sTutorialLoadFlg.AddLoadFile(sMenuEndMessage1);	
		sMenuEndMessage2 = new Image();
	    sMenuEndMessage2.src = "img/10_asobikata/a_txt_a017_02.png";
		g_sTutorialLoadFlg.AddLoadFile(sMenuEndMessage2);	
		// 終わるを押してね
		sBackMessage = new Image();
	    sBackMessage.src = "img/10_asobikata/a_txt_a018.png";		
		g_sTutorialLoadFlg.AddLoadFile(sBackMessage);	
		sModoruMessage = new Image();
	    sModoruMessage.src = "img/10_asobikata/a_btn_a000.png";
		g_sTutorialLoadFlg.AddLoadFile(sModoruMessage);
	}	
	g_sTutorialLoadFlg.Loading();

	var ArrowDocY 	= BROWSER_SCREEN_H - 140;
	var sTuLookFlg	= GetTutorialLookFlg();
	//
	// フレーム処理
	//
	this.onframe = function() {

		switch(g_eStatus) {

			//初期化
			case G_STATUS.INIT:
				// スタンプとシートのロードが終わってる
				if(g_sStampLoadFlg.bLoadFlg && g_sSheetLoadFlg.bLoadFlg && g_sTutorialLoadFlg.bLoadFlg)
				{
					//各データが読み込まれるまで待つ
					if (LoadingCounter <= 0) 
					{
						// スタンプのセットアップ
						stampBar.SetupStampCanvas();
						canvas_Draw();
						g_eStatus = G_STATUS.FADEIN;
			        	stampBar.slide();
			            stampBar.updateDispInfo();
			            stampBar.imageLoad();
			            stampBar.draw();
						stampBar.drawmenu();
						
					
					}
				}
				break;

			//フェードイン
			case G_STATUS.FADEIN:
				alpha += (1.0 / 4);
				if (alpha >= 1.0) 
				{
					alpha = 1.0;
					g_eStatus = G_STATUS.MAIN;
					g_WindowsScaleRate = 0;
				}
				sceen.style.opacity = alpha;
				break;

			//メイン処理
			case G_STATUS.MAIN:
				// メインキャンバスの描画
				var bCanvasBackBlack = GetCanvasBackBlack();
				if((g_iSwitch != 0) || bCanvasBackBlack)
				{
					ClearRect(stamp_ctx, 0, 0, 640, 1200);
				}
	        	stampBar.slide();
	            stampBar.updateDispInfo();
	            stampBar.imageLoad();
	            stampBar.draw();
			
				// 真っ黒
				if(bCanvasBackBlack) 
				{ 
					DrawBack(stamp_ctx); 
				}
			
				// ウィンドウの描画
				if(g_iSwitch == 1)
				{
					g_WindowsScaleRate += 0.15;
					if(g_WindowsScaleRate > 1.0) { g_WindowsScaleRate = 1.0; }
					var id = DrawStampWindow(stamp_ctx, g_WindowsScaleRate, ((!bTouch) && bOldTouch), sTouchStartX, sTouchStartY, sTouchMoveX, sTouchMoveY);	    
					if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_CLEAR)
					{
						if(id != 0) { id = -1; }
						else
						{
							g_TutorialNextMainFlg = gTUTORIAL_MAINFLG.STAMP_CLEAR_WINDOW;
						}
					}
					if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.BACK)
					{
						if(id != 1) { id = -1; }
						else
						{
							
						}
					}
					// ×
					if(id == 1) 
					{ 
						g_eStatus = G_STATUS.FADEOUT;
						nNextEvent = 0;
					}
					// 消す
					else if(id == 0)
					{
						g_iSwitch = 2;
						g_WindowsScaleRate = 0;
					}
					// 終わる
					else if(id == 2)
					{
						g_iSwitch = 0;
						ClearRect(stamp_ctx, 0, 0, 640, 1200);
						g_WindowsScaleRate = 0;
					}
				}
				else if(g_iSwitch == 2)
				{
					g_WindowsScaleRate += 0.15;
					if(g_WindowsScaleRate > 1.0) { g_WindowsScaleRate = 1.0; }
					DrawStampWindow(stamp_ctx, 1.0, false, sTouchStartX, sTouchStartY, sTouchMoveX, sTouchMoveY);
					//DrawBack(stamp_ctx);
					var id = DrawWindowYesNo(stamp_ctx, g_WindowsScaleRate, ((!bTouch) && bOldTouch), sTouchStartX, sTouchStartY, sTouchMoveX, sTouchMoveY);
					
					if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_CLEAR_WINDOW)
					{
						if(id != 0) { id = -1; }
					}					
					
					// クリア
					if(id == 0) 
					{ 
						g_iSwitch = 0;
						clearButtonClick();
						g_WindowsScaleRate = 0;
					}
					// 戻る
					else if(id == 1)
					{
						g_iSwitch = 1;
					}					
				}
				// エフェクト
				GExecEffect();
			
				// メニュー
				stampBar.drawmenu();
			
				// 各チュートリアル
			/*
				if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.INIT_WAIT) 				{ return true; }
				if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_SELECT) 		{ return true; }
				if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_DEAD) 		{ return false; }
				if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_SELECT) 				{ return false; }
				if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_WAIT)			 	{ return false; }
				if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_CLEAR) 				{ return false; }
				if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_CLEAR_WINDOW) 		{ return false; }
				if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_SELECT_END) 			{ return false; }
				if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_SELECT_END_WAIT) 	{ return false; }
				if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.BACK) 					{ return false; }
		*/
				// トリガー
				var CanTri = bOldTutorialTouch;
				var BarTri = stampBar.bOldTutorialTouch;
				if(bOldTutorialTouch)
				{
					if(bOldTutorialTouch == bTutorialTouch) { CanTri = false; }
				}
				if(stampBar.bOldTutorialTouch)
				{
					if(stampBar.bOldTutorialTouch == stampBar.bTutorialTouch) { BarTri = false; }
				}
			
				// ずっと主張
				if(sTuLookFlg && g_TutorialMainFlg >= gTUTORIAL_MAINFLG.STAMP_TOUCH_SELECT)
				{
					// 489,11
					var BackYesX = 489;
					var BackYesY = 11;
					var BackYesW = 137;
					var BackYesH = 42;				
					// ------------------------------------- 
					// メッセージファイル
					// ------------------------------------- 
					stamp_ctx.drawImage(sModoruMessage, BackYesX, BackYesY);	
					// 決定
					if(CanTri && g_eStatus == G_STATUS.MAIN)
					{		
						if(
							(BackYesX < bTutorialEndX)   && (BackYesX + BackYesW > bTutorialEndX)  &&
							(BackYesY < bTutorialEndY)   && (BackYesY + BackYesH > bTutorialEndY)  &&
							(BackYesX < bTutorialStartX) && (BackYesX + BackYesW > bTutorialStartX) &&
							(BackYesY < bTutorialStartY) && (BackYesY + BackYesH > bTutorialStartY))
						{	
							g_eStatus = G_STATUS.FADEOUT;
							nNextEvent = 0;
						
							// チュートリアル終了
							EndTutorial();
						}	
					}
				}				
			
				// ２秒待つ [---]
				if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.INIT_WAIT)
				{
					iWaitCounter ++;
					// 50*40=2秒
					if(iWaitCounter > 10)
					{
						g_TutorialMainFlg = gTUTORIAL_MAINFLG.STAMP_TOUCH_SELECT;
						//g_TutorialMainFlg = gTUTORIAL_SHOPFLG.STAMP_BUY_SELECT;
					}
				}
				// スタンプをタッチして選んでね[---]
				else if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_SELECT)
				{
					// -------------------------------------
					// 矢印とプロック
					// -------------------------------------  
					DrawDocumentArrow(stamp_ctx, 24, ArrowDocY, 0);
					// ------------------------------------- 
					// メッセージファイル
					// ------------------------------------- 
					stamp_ctx.drawImage(sStampTouchSelectMessage, 103, 415);	
				}
				// シートにスタンプを押してねメッセージ[---]
				else if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.SHEET_TOUCH_WRITE_MES)
				{
					if(g_TutorialNextMainFlg != gTUTORIAL_MAINFLG.SHEET_TOUCH_WRITE)
					{
						// -------------------------------------
						// 矢印とプロック
						// -------------------------------------  
						//DrawDocumentArrow(stamp_ctx, 24, 645, 0);
						// ------------------------------------- 
						// メッセージファイル
						// ------------------------------------- 
						stamp_ctx.drawImage(sSheetTouchSelectMessage, 103, 415);
						
						// -------------------------------------
						// キーを押したら次へ
						// ------------------------------------- 
						if(CanTri || BarTri)
						{
							g_TutorialMainFlg = gTUTORIAL_MAINFLG.SHEET_TOUCH_WRITE;
							ClearRect(stamp_ctx, 0, 0, 640, 1200);
						}
					
					}
					else
					{
						ClearRect(stamp_ctx,0, 0, 640, 1200);
					}
				}
				// シートにスタンプを押してね[---]
				else if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.SHEET_TOUCH_WRITE)
				{
				/*	if(g_TutorialNextMainFlg != gTUTORIAL_MAINFLG.SHEET_TOUCH_WRITE)
					{
						// -------------------------------------
						// 矢印とプロック
						// -------------------------------------  
						DrawDocumentArrow(stamp_ctx, 24, 645, 0);
						// ------------------------------------- 
						// メッセージファイル
						// ------------------------------------- 
						stamp_ctx.drawImage(sStampTouchSelectMessage, 103, 415);	
					}
					else
					{
						stamp_ctx.clearRect(0, 0, 640, 1200);
					}*/
				}
				// すたんぷは１５回押すと亡くなるよ！[---]
				else if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_DEAD)
				{
					// -------------------------------------
					// 矢印とプロック
					// -------------------------------------  
					DrawDocumentArrow(stamp_ctx, 24, ArrowDocY, 0);
					// ------------------------------------- 
					// メッセージファイル
					// ------------------------------------- 
					stamp_ctx.drawImage(sStampTouch15Message, 103, 415);						
					// -------------------------------------
					// キーを押したら次へ
					// ------------------------------------- 
					if(CanTri || BarTri)
					{
						AllWaitEffect(false);
						g_TutorialMainFlg = gTUTORIAL_MAINFLG.STAMP_TOUCH_DEAD_2;
						iWaitCounter = 0;
					}
				}
				else if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_DEAD_2)
				{
					// -------------------------------------
					// エフェクト終了後、次へ
					// ------------------------------------- 
					if(GGetEffectNum() == 0)
					{
						iWaitCounter ++;
						// 50*40=2秒
						if(iWaitCounter > 5)
						{					
							g_TutorialNextMainFlg = gTUTORIAL_MAINFLG.STAMP_TOUCH_DEAD_WAIT;
							iWaitCounter = 0;
						}
					}
				}		
				else if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_TOUCH_DEAD_WAIT)
				{
					// -------------------------------------
					// エフェクト終了後、次へ
					// ------------------------------------- 
					iWaitCounter ++;
					//stamp_ctx.clearRect(0, 0, 640, 1200);
					// 50*40=2秒
					if(iWaitCounter > 15)
					{					
						g_TutorialNextMainFlg = gTUTORIAL_MAINFLG.MENU_SELECT;
						iWaitCounter = 0;
					}
				}	
				// メニューセレクト[メニュを押してね！]
				else if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_SELECT)
				{
					// -------------------------------------
					// 矢印とプロック
					// -------------------------------------  
					DrawDocumentArrow(stamp_ctx, 497, ArrowDocY, 0);
					// ------------------------------------- 
					// メッセージファイル
					// ------------------------------------- 
					// 次は押したスタンプを消してみよう
					stamp_ctx.drawImage(sStampClearMessage, 103, 250 + 80);
					// できるよ！メニューを押してね
					// 画像xywh
					// 座標xywh
					stamp_ctx.drawImage(sMenuTouchMessage, 0, 86, 432, 180 - 86, 103 + 20, 415 + 120, 432, 180 - 86);
					//stamp_ctx.drawImage(sMenuTouchMessage, 103, 415);
					// ------------------------------------- 
					// メニュー以外を隠す
					// ------------------------------------- 					
					stampBar.ctx.globalAlpha = 0.6;
					stampBar.ctx.fillStyle = 'rgb(0, 0, 0)';				
					stampBar.ctx.fillRect(0, 0,  640 - 161,  160);
					stampBar.ctx.globalAlpha = 1.0;	
				}	
				// メニュー表示にて少し待つ
				else if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_WAIT)
				{
					iWaitCounter ++;
					// 50*40=2秒
					if(iWaitCounter > 10)
					{
						g_TutorialMainFlg = gTUTORIAL_MAINFLG.STAMP_CLEAR
						iWaitCounter = 0;
					}
				}		
				// スタンプをクリア
				else if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_CLEAR)
				{
					// ------------------------------------- 
					// メニュー以外を隠す
					// -------------------------------------
					DrawBack(stamp_ctx);
					var PosYesX = 85;
					var PosYesY = 270;
					var PosYesW = 480;
					var PosYesH = 170;
					stamp_ctx.drawImage(g_StampMainKesuImageHandle, PosYesX, PosYesY, PosYesW, PosYesH);    
					// -------------------------------------
					// 矢印とプロック
					// -------------------------------------  
					DrawDocumentArrow(stamp_ctx, 274, 168, 0);
					// ------------------------------------- 
					// メッセージファイル
					// ------------------------------------- 
					// 押したスタンプを消すには消すを押してね！
					stamp_ctx.drawImage(sMenuClear01Message1, 41 + 25 - 47, 0 - 15);
					// 消すを押すと押したスタンプが全部消えるよ！
					stamp_ctx.drawImage(sMenuClear02Message1, 41 - 42 - 47, 10 + 107);
				}	
				// クリア確認ウィンドウ
				else if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_CLEAR_WINDOW)
				{	
					// -------------------------------------
					// 矢印とプロック
					// -------------------------------------  
					iWaitCounter ++;
					// 50*40=2秒
					if(iWaitCounter > 20)
					{
						DrawDocumentArrow(stamp_ctx, 120, 390, 0);					
					}
				}
				// メニューセレクト[さいごにはじめの画面にもどるには・・・]
				else if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.MENU_SELECT_END)
				{
					if(iWaitCounter < 20) { ClearRect(stamp_ctx,0, 0, 640, 1200); iWaitCounter ++; }
					else
					{
						// -------------------------------------
						// 矢印とプロック
						// -------------------------------------  
						DrawDocumentArrow(stamp_ctx, 497, ArrowDocY, 0);
						// ------------------------------------- 
						// メッセージファイル
						// ------------------------------------- 
						// 最後に初めの画面に戻るには
						stamp_ctx.drawImage(sMenuEndMessage1, 103, 200);
						// もう一度メニューを押してね
						stamp_ctx.drawImage(sMenuEndMessage2, 103 + 20, 415);
						// ------------------------------------- 
						// メニュー以外を隠す
						// ------------------------------------- 					
						stampBar.ctx.globalAlpha = 0.6;
						stampBar.ctx.fillStyle = 'rgb(0, 0, 0)';				
						stampBar.ctx.fillRect(0, 0,  640 - 161,  160);
						stampBar.ctx.globalAlpha = 1.0;					
					}					
				}
				// 戻る[---]
				else if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.BACK)
				{
					if(iWaitCounter < 10) { iWaitCounter ++; }
					else
					{
						// ------------------------------------- 
						// メニュー以外を隠す
						// -------------------------------------
						DrawBack(stamp_ctx);
						var PosNoX  = 85;
						var PosNoY  = 450;
						var PosNoW  = 480;
						var PosNoH  = 170;
						stamp_ctx.drawImage(g_StampMainEndImageHandle, PosNoX, PosNoY, PosNoW, PosNoH);    
						// -------------------------------------
						// 矢印とプロック
						// -------------------------------------  
						DrawDocumentArrow(stamp_ctx, 274, 350, 0);
						// ------------------------------------- 
						// メッセージファイル
						// ------------------------------------- 
						// 初めの画面に戻るには終わるを押してね
						stamp_ctx.drawImage(sBackMessage, 41, 10 + 100);		
					}					
				}			
				// 遅延
				if(g_TutorialNextMainFlg != gTUTORIAL_MAINFLG.NON)
				{
					if(g_TutorialMainFlg != g_TutorialNextMainFlg)
					{
						g_TutorialMainFlg = g_TutorialNextMainFlg;
						iWaitCounter = 0;
					}
					g_TutorialNextMainFlg = gTUTORIAL_MAINFLG.NON;
				}
				bOldTutorialTouch			= bTutorialTouch;
				stampBar.bOldTutorialTouch	= stampBar.bTutorialTouch;		
				// メモリ
				bOldTouch = bTouch;
				break;
			
			//フェードアウト
			case G_STATUS.FADEOUT:
				alpha -= (1.0 / 4);
				if (alpha <= 0) {
					alpha = 0;
					g_eStatus = G_STATUS.END;
				}
				sceen.style.opacity = alpha;
				break;

			//終了
			case G_STATUS.END:
				//DOMエレメントの削除
				rootSceen.removeChild(sceen);
				// 解放
				g_sTutorialLoadFlg.Delete();			
				canvas_img = null;
			
				//次のシーンをセット
				if(nNextEvent == 0)
				{
					// チュートリアル終了チェック
					CheckTutorial();
				//	nextSceen = new StampSelect();
					nextSceen = new SceenTitle();
				}
				else
				{		
					if(g_TutorialMainFlg == gTUTORIAL_MAINFLG.STAMP_CLEAR_WINDOW)
					{
						g_TutorialMainFlg = gTUTORIAL_MAINFLG.MENU_SELECT_END;
						iWaitCounter      = 0;
					}
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


