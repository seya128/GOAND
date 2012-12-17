
// -------------------------------------
// お店データ[3*3]
// -------------------------------------
var MAX_SHOP_DISP_WIDTH  = 3;
var MAX_SHOP_DISP_HEIGHT = 3;
var MAX_SHOP_LIST_WIDTH  = 3;
var MAX_SHOP_LIST_HEIGHT = 34;
var MAX_SHOP_PANEL_WIDTH  = 215;
var MAX_SHOP_PANEL_HEIGHT = 250;
var MAX_SHOP_PANEL_START_X = 105;
var MAX_SHOP_PANEL_START_Y = 340;
var MAX_SHOP_PANEL_INTERVAL_Y = 60;
var sHeightSize = (MAX_SHOP_PANEL_HEIGHT * MAX_SHOP_DISP_HEIGHT);

// -------------------------------------
// 定義
// -------------------------------------
var CoinNum         = 100;
var STAMP_W 		= 160;
var STAMP_H 		= 160;
var sTouchStartX 	= -200;
var sTouchStartY 	= -200;
var sTouchMoveX 	= -200;
var sTouchMoveY 	= -200;
var sTouchLastX 	= -200;
var sTouchLastY 	= -200;
var sTouchNo 		= -1;
var bTouch 			= false;
var bOldTouch		= false;
var bBuyTouch	 	= false;
var bMoveList		= false;
var sActiveSheetNo = 0;
var sPrevSheetNo = 0;
var sTouchAccelerator = 0;
var eSwitch = 0;
var sResYesNo = 0;
var sScaleRate = 0;
// -------------------------------------
// リダクションサイズを設定する「処理を軽くするためサムネイル」
// -------------------------------------
var REDUCTION_SIZE = 2.0;
var SCREEN_WIDTH   = 640;
var SCREEN_HEIGHT  = 1200;
var CANVAS_WIDTH   = SCREEN_WIDTH  / REDUCTION_SIZE;
var CANVAS_HEIGHT  = SCREEN_HEIGHT / REDUCTION_SIZE;

// -------------------------------------
// スタンプの最大数を取得しデバッグ表示
// -------------------------------------
var MAX_STAMP_IMAGE = stampImgName.length;
var timerID;


var STATUS = {
	INIT:			0,
	FADEIN:			1,
	MAIN:			2,
	FADEOUT:		3,
	END:			4,
	
	SELECTED_INIT:	5,
	SELECTED_MOVE:	6,
	SELECTED_END:	7,
};
var st = STATUS.INIT;

//
// スタンプシート
//
function StampSheet(canvas_ctx, no)
{
    var _this = this;
    this.ctx = canvas_ctx;
    this.isLoaded = false;
    this.sheetNo = no;
    this.sheetSrc = "";

	// イメージ
	this.img = new Image();											// イメージクラス
    this.img.onload = function(){ _this.isLoaded = true; }			// ロードが終わっていたらフラグを立てる
    this.img.src = "img/07_shop/004.png";								// イメージの名前を代入[StampData.js]
    this.stampImageNo = no;											// イメージ番号  
	// ウィンドウ
	this.window = new Image();										// イメージクラス
    this.window.onload = function(){ _this.isLoaded = true; }		// ロードが終わっていたらフラグを立てる
    this.window.src = "img/07_shop/o_wak_a.png";						// イメージの名前を代入[StampData.js]
	// ウィンドウ
	this.YesNoImage = new Image();										// イメージクラス
    this.YesNoImage.onload = function(){ _this.isLoaded = true; }		// ロードが終わっていたらフラグを立てる
    this.YesNoImage.src = "img/07_shop/o_txt_a.png";						// イメージの名前を代入[StampData.js]
	// はい
	this.YesImage = new Image();										// イメージクラス
    this.YesImage.onload = function(){ _this.isLoaded = true; }		// ロードが終わっていたらフラグを立てる
    this.YesImage.src = "img/07_shop/k_btn_a.png";						// イメージの名前を代入[StampData.js]
	// いいえ
	this.NoImage = new Image();										// イメージクラス
    this.NoImage.onload = function(){ _this.isLoaded = true; }		// ロードが終わっていたらフラグを立てる
    this.NoImage.src = "img/07_shop/k_btn_b.png";						// イメージの名前を代入[StampData.js]
	// ウィンドウ
	this.BuyOkImage = new Image();										// イメージクラス
    this.BuyOkImage.onload = function(){ _this.isLoaded = true; }		// ロードが終わっていたらフラグを立てる
    this.BuyOkImage.src = "img/07_shop/o_txt_d.png";						// イメージの名前を代入[StampData.js]
	// ウィンドウ
	this.BuyNoImage = new Image();										// イメージクラス
    this.BuyNoImage.onload = function(){ _this.isLoaded = true; }		// ロードが終わっていたらフラグを立てる
    this.BuyNoImage.src = "img/07_shop/o_txt_b.png";						// イメージの名前を代入[StampData.js]
	// ウィンドウ
	this.BuyIppaiImage = new Image();										// イメージクラス
    this.BuyIppaiImage.onload = function(){ _this.isLoaded = true; }		// ロードが終わっていたらフラグを立てる
    this.BuyIppaiImage.src = "img/07_shop/o_txt_c.png";						// イメージの名前を代入[StampData.js]

	// コイン
	this.CoinImage = new Image();										// イメージクラス
    this.CoinImage.onload = function(){ _this.isLoaded = true; }		// ロードが終わっていたらフラグを立てる
    this.CoinImage.src = "img/07_shop/002.png";							// イメージの名前を代入[StampData.js]
	// ショップ
	this.ShopImage = new Image();										// イメージクラス
    this.ShopImage.onload = function(){ _this.isLoaded = true; }		// ロードが終わっていたらフラグを立てる
    this.ShopImage.src = "img/07_shop/001.png";							// イメージの名前を代入[StampData.js]
	// 戻る
	this.BackImage = new Image();										// イメージクラス
    this.BackImage.onload = function(){ _this.isLoaded = true; }		// ロードが終わっていたらフラグを立てる
    this.BackImage.src = "img/07_shop/003.png";							// イメージの名前を代入[StampData.js]
}

// プロック
StampSheet.prototype.Proc = function(ofs)
{
	// 交換を押したとき(38, 170) - (174, 170)
	//				   (38, 215) - (174, 215)
    var x = 0;
    var y = 20 + ofs - ofs;
	if(bMoveList == false && (eSwitch == 0))
	{
		var vS = (sActiveSheetNo * MAX_SHOP_DISP_HEIGHT) - MAX_SHOP_DISP_HEIGHT;
		if(vS < 0) { vS = 0; }
		for(var i = vS; i < vS + (MAX_SHOP_DISP_HEIGHT * 3); i ++)
		//for(var i = 0; i < MAX_SHOP_LIST_HEIGHT; i ++)
		{
			var YVal = i / MAX_SHOP_DISP_HEIGHT;
			YVal  = Math.floor(YVal);
			YVal *= MAX_SHOP_PANEL_INTERVAL_Y;
			for(var j = 0; j < MAX_SHOP_LIST_WIDTH; j ++)
			{
				var xx  = j  * MAX_SHOP_PANEL_WIDTH   + MAX_SHOP_PANEL_START_X;
				var yy  = (i * MAX_SHOP_PANEL_HEIGHT) + MAX_SHOP_PANEL_START_Y + YVal;
		
				var PosX = (xx)-214/2 + x + 38;
				var PosY = (yy)-237/2 + y + 170 + ofs;
				var PosW = 137;
				var PosH = 46;

				//this.ctx.globalAlpha = 0.5f;
				if(bTouch && 
					(PosX < sTouchMoveX) && (PosX + PosW > sTouchMoveX) &&
					(PosY < sTouchMoveY) && (PosY + PosH > sTouchMoveY))
				{
					bBuyTouch = true;	
					sTouchNo  = (i * MAX_SHOP_DISP_WIDTH) + j;	
				}	
				else
				{
				}	
			}
		}
	}
}

StampSheet.prototype.drawWindow = function()
{
	var GPosY = (1.0 - sScaleRate) * -64;

	//var xx  = j  *  MAX_SHOP_PANEL_WIDTH  + MAX_SHOP_PANEL_START_X;
	//var yy  = (i * MAX_SHOP_PANEL_HEIGHT) + MAX_SHOP_PANEL_START_Y + YVal;
	this.ctx.globalAlpha = sScaleRate;
	this.ctx.drawImage(this.window, 
		89  /*- 460 / 2*/, 
		GPosY + 214 /*- 440 / 2*/, 
		460, 
		440);
	this.ctx.drawImage(this.YesNoImage, 
		128  /*- 460 / 2*/, 
		GPosY + 380 /*- 440 / 2*/, 
		386, 
		162);

	this.ctx.drawImage(gStampGraphicHandle[sTouchNo%27].img, 
		262/* - (STAMP_W * 0.7)/2*/, 
		GPosY + 237/* - (STAMP_H * 0.7)/2*/, 
		STAMP_W * 0.7, 
		STAMP_H * 0.7);

	var PosYesX = 33;
	var PosYesY = GPosY + 565;
	var PosYesW = 281;
	var PosYesH = 184;
	var PosNoX = 317;
	var PosNoY = GPosY + 565;
	var PosNoW = 281;
	var PosNoH = 184;
	this.ctx.globalAlpha = sScaleRate;// - 1.0;
	//if(this.ctx.globalAlpha < 0) { this.ctx.globalAlpha = 0; }
	this.ctx.drawImage(this.YesImage, 
		PosYesX  /*- 460 / 2*/, 
		PosYesY /*- 440 / 2*/, 
		PosYesW, 
		PosYesH);
	this.ctx.drawImage(this.NoImage, 
		PosNoX  /*- 460 / 2*/, 
		PosNoY /*- 440 / 2*/, 
		PosNoW, 
		PosNoH);
	this.ctx.fillStyle = 'rgb(255, 255, 255)';
	this.ctx.font = "20pt Arial";
	this.ctx.fillText("" + 10, 128 + 320 + 24, 335); 
	this.ctx.fillStyle = 'rgb(0, 0, 0)';
	this.ctx.globalAlpha = 0.5;
	
	if(sScaleRate >= 1.0)
	{
		if(bTouch && 
			(PosYesX < sTouchMoveX) && (PosYesX + PosYesW > sTouchMoveX) &&
			(PosYesY < sTouchMoveY) && (PosYesY + PosYesH > sTouchMoveY))
		{
			sResYesNo = 0;
	   // 	this.ctx.fillStyle = 'rgb(255, 0, 0)';			
		}	
		else
		{
	    //	this.ctx.fillStyle = 'rgb(0, 0, 255)';
		}	
	    //this.ctx.fillRect(PosYesX, PosYesY, PosYesW, PosYesH);

		if(bTouch && 
			(PosNoX < sTouchMoveX) && (PosNoX + PosNoW > sTouchMoveX) &&
			(PosNoY < sTouchMoveY) && (PosNoY + PosNoH > sTouchMoveY))
		{
			sResYesNo = 1;
	    //	this.ctx.fillStyle = 'rgb(255, 0, 0)';			
		}	
		else
		{
	   // 	this.ctx.fillStyle = 'rgb(0, 0, 255)';
		}	
	}
    //this.ctx.fillRect(PosNoX, PosNoY, PosNoW, PosNoH);

	this.ctx.globalAlpha = 1.0;
	sScaleRate += 0.15;
	if(sScaleRate > 1.0) { sScaleRate = 1.0; } 
}
StampSheet.prototype.drawOK= function()
{
	//var xx  = j  *  MAX_SHOP_PANEL_WIDTH  + MAX_SHOP_PANEL_START_X;
	//var yy  = (i * MAX_SHOP_PANEL_HEIGHT) + MAX_SHOP_PANEL_START_Y + YVal;
	this.ctx.globalAlpha = sScaleRate;
	this.ctx.drawImage(this.window, 
		89  /*- 460 / 2*/, 
		214 /*- 440 / 2*/, 
		460, 
		440);
	if(eSwitch == 2)
	{
		this.ctx.drawImage(this.BuyOkImage, 
			128  /*- 460 / 2*/, 
			380 /*- 440 / 2*/, 
			386, 
			162);
	}
	else if(eSwitch == 3)
	{
		this.ctx.drawImage(this.BuyNoImage, 
			128  /*- 460 / 2*/, 
			380 /*- 440 / 2*/, 
			386, 
			162);
	}
	else if(eSwitch == 4)
	{
		this.ctx.drawImage(this.BuyIppaiImage, 
			128  /*- 460 / 2*/, 
			380 /*- 440 / 2*/, 
			386, 
			162);
	}

	this.ctx.drawImage(gStampGraphicHandle[sTouchNo%27].img, 
		262/* - (STAMP_W * 0.7)/2*/, 
		237/* - (STAMP_H * 0.7)/2*/, 
		STAMP_W * 0.7, 
		STAMP_H * 0.7);

	var PosYesX = 180;
	var PosYesY = 565;
	var PosYesW = 281;
	var PosYesH = 184;

	this.ctx.drawImage(this.YesImage, 
		PosYesX  /*- 460 / 2*/, 
		PosYesY /*- 440 / 2*/, 
		PosYesW, 
		PosYesH);

	this.ctx.globalAlpha = 0.5;

	if(sScaleRate >= 1.0)
	{
		if(bTouch && 
			(PosYesX < sTouchMoveX) && (PosYesX + PosYesW > sTouchMoveX) &&
			(PosYesY < sTouchMoveY) && (PosYesY + PosYesH > sTouchMoveY))
		{
			sResYesNo = 0;
	    	//this.ctx.fillStyle = 'rgb(255, 0, 0)';			
		}	
		else
		{
	    	//this.ctx.fillStyle = 'rgb(0, 0, 255)';
		}
	}
   // this.ctx.fillRect(PosYesX, PosYesY, PosYesW, PosYesH);
	this.ctx.globalAlpha = 1.0;
	sScaleRate += 0.25;
	if(sScaleRate > 1.0) { sScaleRate = 1.0; } 
}


//描画
StampSheet.prototype.draw = function(ofs)
{
	//if (this.isLoaded) 
	{
        var rate = 0;//Math.abs(ofs)/320 * 0.25 ;
        var w = SCREEN_WIDTH;
        var h = SCREEN_HEIGHT;
        var x = (SCREEN_WIDTH - w)  / 2;// + ofs - rate*ofs ;
        var y = (SCREEN_HEIGHT - h) / 2 + 20 + ofs - rate*ofs ;

		// -------------------------------------
		// 小物を表示[ここは領域に制限をかけてのちのち高速化]
		// -------------------------------------  
		var vS = (sActiveSheetNo * MAX_SHOP_DISP_HEIGHT) - MAX_SHOP_DISP_HEIGHT;
		if(vS < 0) { vS = 0; }
		for(var i = vS; i < vS + (MAX_SHOP_DISP_HEIGHT * 3); i ++)
		{
			var YVal = i / MAX_SHOP_DISP_HEIGHT;
			YVal  = Math.floor(YVal);
			YVal *= MAX_SHOP_PANEL_INTERVAL_Y;
			for(var j = 0; j < MAX_SHOP_LIST_WIDTH; j ++)
			{
				var xx  = j  * MAX_SHOP_PANEL_WIDTH   + MAX_SHOP_PANEL_START_X;
				var yy  = (i * MAX_SHOP_PANEL_HEIGHT) + MAX_SHOP_PANEL_START_Y + YVal;
				this.ctx.drawImage(this.img, 
					(xx)-214/2 + x, 
					(yy)-237/2 + y, 
					214, 
					237);

				this.ctx.drawImage(gStampGraphicHandle[((i * MAX_SHOP_DISP_WIDTH) + j)%27].img, 
					(xx)-STAMP_W/2 + x, 
					(yy)-STAMP_H/2 + y - 70, 
					STAMP_W, 
					STAMP_H);

				this.ctx.font = "20pt Arial";
				this.ctx.fillText("10", xx - 25 + x, yy + 35 + y); 
			}
		}
/*
		for(var i = 0; i < MAX_SHOP_LIST_HEIGHT; i ++)
		{
			var YVal = i / MAX_SHOP_DISP_HEIGHT;
			YVal  = Math.floor(YVal);
			YVal *= MAX_SHOP_PANEL_INTERVAL_Y;
			for(var j = 0; j < MAX_SHOP_LIST_WIDTH; j ++)
			{
				var xx  = j  *  MAX_SHOP_PANEL_WIDTH  + MAX_SHOP_PANEL_START_X;
				var yy  = (i * MAX_SHOP_PANEL_HEIGHT) + MAX_SHOP_PANEL_START_Y + YVal;
				this.ctx.drawImage(gStampGraphicHandle[((i * MAX_SHOP_DISP_WIDTH) + j)%27].img, 
					(xx)-STAMP_W/2 + x, 
					(yy)-STAMP_H/2 + y - 70, 
					STAMP_W, 
					STAMP_H);

				this.ctx.font = "20pt Arial";
				this.ctx.fillText("10", xx - 25 + x, yy + 35 + y); 
			}
		}*/
		// -------------------------------------
		// 小物を表示[ここは領域に制限をかけてのちのち高速化]
		// -------------------------------------  
/*
		if(bMoveList == false && (eSwitch == 0))
		{
			for(var i = 0; i < MAX_SHOP_LIST_HEIGHT; i ++)
			{
				var YVal = i / MAX_SHOP_DISP_HEIGHT;
				YVal  = Math.floor(YVal);
				YVal *= MAX_SHOP_PANEL_INTERVAL_Y;
				for(var j = 0; j < MAX_SHOP_LIST_WIDTH; j ++)
				{
					var xx  = j  * MAX_SHOP_PANEL_WIDTH   + MAX_SHOP_PANEL_START_X;
					var yy  = (i * MAX_SHOP_PANEL_HEIGHT) + MAX_SHOP_PANEL_START_Y + YVal;
			
					var PosX = (xx)-214/2 + x + 38;
					var PosY = (yy)-237/2 + y + 170;
					var PosW = 137;
					var PosH = 46;

					this.ctx.globalAlpha = 0.5;
					if(bTouch && 
						(PosX < sTouchMoveX) && (PosX + PosW > sTouchMoveX) &&
						(PosY < sTouchMoveY) && (PosY + PosH > sTouchMoveY))
					{
			        	this.ctx.fillStyle = 'rgb(255, 0, 0)';	
					//	bBuyTouch = true;		
					}	
					else
					{
			        	this.ctx.fillStyle = 'rgb(0, 0, 255)';
					}	
			        this.ctx.fillRect(PosX, PosY, PosW, PosH);
					this.ctx.globalAlpha = 1.0;

				}
			}
		}*/
		// -------------------------------------
		// ショップの描画
		// -------------------------------------  
		this.ctx.drawImage(this.ShopImage, 
			0, 
			0, 
			640, 
			200);
		// --------------------------------------    
		// 残り金額の描画
		// --------------------------------------
		this.ctx.drawImage(this.CoinImage, 
			380, 
			0, 
			260, 
			101);
		// --------------------------------------    
	    // タイトルへ戻る
		// --------------------------------------
		var PosYesX = 0;
		var PosYesY = 0;
		var PosYesW = 260;
		var PosYesH = 101;
		this.ctx.drawImage(this.BackImage, 
			0, 
			0, 
			190, 
			101);
		this.ctx.font = "20pt Arial";
		this.ctx.fillText("" + CoinNum, 500, 70); 
		if(bTouch && 
			(PosYesX < sTouchMoveX) && (PosYesX + PosYesW > sTouchMoveX) &&
			(PosYesY < sTouchMoveY) && (PosYesY + PosYesH > sTouchMoveY))
		{	
			goTitle();		
		}	
    }
};
   

var StampShop = function() 
{
	var mainCanvas;
	//
	// メインキャンバス
	//
	var MainCanvas = function()
	{
	    var _this = this;
	    this.selectIx = 0;
		var sScrollY    = 0;
		var sMoveRate   = (0.4);
	    var ofsX=0;
	    var addX=0, ofsXold=0;
	    var ofsRate=1.2;

		// デフォルトキャンバス
	    var canvas = document.getElementById("canvas");
		var ctx    = canvas.getContext("2d");
	    var sheet = new StampSheet(ctx, 0);
		
	    //キャンバスクリア
	    this.clear = function()
		{
	        ctx.beginPath();
	        //グラデーション領域をセット
	        var grad  = ctx.createLinearGradient(0,0, 0,1200);
	        //グラデーション終点のオフセットと色をセット
	        grad.addColorStop(0,'rgb(10, 10, 50)');
	        grad.addColorStop(0.7,'rgb(150, 150, 240)');
	        //グラデーションをfillStyleプロパティにセット
	        ctx.fillStyle = grad;
	        /* 矩形を描画 */
	        ctx.rect(0,0, 640, 1200);
	        ctx.fill();
	    };
	    
		this.draw_BuyWindow = function() 
		{
			// 画面クリア
	        this.clear();
			// シートの描画
	        sheet.draw(sScrollY);

			if(bTouch == bOldTouch)
			{
				sResYesNo = -1;
			}
			// ウィンドウの描画
			if(eSwitch == 1)
			{
				sheet.drawWindow(sScrollY);
	 		}
			else
			{
				sheet.drawOK(sScrollY);
			}
			// 決定
			if(bTouch == true && bOldTouch == false)
			{
				if(sScaleRate >= 1.0)
				{
					if(eSwitch == 1)
					{
						// Yes
						if(sResYesNo == 0)
						{
							eSwitch = 2;
							sScaleRate = 0;
							CoinNum -= 10;
							bOldTouch = false; 
							bTouch = false;
						}
						// No
						else if(sResYesNo == 1)
						{	
							eSwitch = 0;
							bOldTouch = false; 
							bTouch = false;
						}
					}
					else
					{
						if(sResYesNo == 0)
						{	
							eSwitch = 0;
							bOldTouch = false; 
							bTouch = false;
						}
					}
				}
				else { bOldTouch = false; bTouch = false; }
			}
			// タッチ
			bOldTouch = bTouch;
		}
	    this.draw_Main = function()
		{
	        // タッチされていない場合の位置調整
			sPrevSheetNo = sActiveSheetNo;
			bMoveList = false;

			if(bTouch == bOldTouch)
			{
				sTouchNo  = -1;
			}
			if(sTouchAccelerator == 0 && bTouch)
			{	
				sheet.Proc(sScrollY);
			}
	        if(bBuyTouch == false)
			{
				// -----------------------------------------
				// 現在のシート番号を探す
				// -----------------------------------------
				var sChack         = 0;
				var sChackTargetX  = 0;
				for(var i = 0;; i ++)
				{
					if(i == 0)
					{
						sChack -= (sHeightSize / 2);							// シート分の高さ
						sChack -= (MAX_SHOP_PANEL_INTERVAL_Y / 2);				// インターバルの半分
						if(sScrollY > sChack) 
						{ 
							sChackTargetX  = 0;
							sActiveSheetNo = i; break; 
						}
						sChack -= (MAX_SHOP_PANEL_INTERVAL_Y / 2);				// インターバルの半分
					}
					else
					{
						sChack -= (sHeightSize);								// シート分の高さ
						sChack -= (MAX_SHOP_PANEL_INTERVAL_Y / 2);				// インターバルの半分
						if(sScrollY > sChack) 
						{ 
							sChack += (sHeightSize / 2);						// シート分の高さ
							sChack += (MAX_SHOP_PANEL_INTERVAL_Y / 2);			// インターバルの半分
							sChackTargetX = sChack;
							sActiveSheetNo = i; break;
						}
						sChack -= (MAX_SHOP_PANEL_INTERVAL_Y / 2);				// インターバルの半分
					}
				}
				// -----------------------------------------
				// タッチ終了
				// -----------------------------------------
		        if (!bTouch)
				{
					// -----------------------------------------
					// 範囲外の場合保管移動
					// -----------------------------------------
					if(sScrollY > 0)
					{
						// 線形保管
						if(Math.abs(sScrollY) > 2)
						{
							sTouchAccelerator = (0 - sScrollY) * sMoveRate;
							sScrollY = sScrollY + sTouchAccelerator;
							bMoveList = true;
						}	
						else { sScrollY = 0; sTouchAccelerator = 0; }
					}
					// -----------------------------------------
					// タッチ終了時なので保管移動
					// -----------------------------------------
					else
					{
						// 移動保管
						var sMoveSpeed = 64;
						if(Math.abs(sTouchAccelerator) <= 0)
						{
							if(sChackTargetX > sScrollY)
							{
								if(Math.abs(sChackTargetX - sScrollY) < sMoveSpeed)
								{
									sScrollY = sChackTargetX;
								}
								else
								{
									sScrollY += sMoveSpeed;
								}
								bMoveList = true;
							}
							else if(sChackTargetX < sScrollY)
							{
								if(Math.abs(sChackTargetX - sScrollY) < sMoveSpeed)
								{
									sScrollY = sChackTargetX;
								}
								else
								{
									sScrollY -= sMoveSpeed;
								}
								bMoveList = true;
							}
							else {}
						}
						else
						{
							// 急ブレーキ
							if((sPrevSheetNo != sActiveSheetNo) && (Math.abs(sTouchAccelerator) < 60))
							{
								sTouchAccelerator = 0;
								bMoveList = true;
							}
							else
							{
								sScrollY += sTouchAccelerator;
								// マイナス
								if(sTouchAccelerator < 0)           
								{ 
									sTouchAccelerator += 8; 
									if(sTouchAccelerator > -58) { sTouchAccelerator = -58; } 
								}
								// プラス
								else
								{ 
									sTouchAccelerator -= 8; 
									if(sTouchAccelerator < 58) { sTouchAccelerator = 58; } 
								}
								bMoveList = true;
							}
						}
					}
		        }
				// -----------------------------------------
				// タッチスライド中
				// -----------------------------------------
				else 
				{
					// 移動量
					sTouchAccelerator = (sTouchMoveY - sTouchLastY) 	// 移動量
					sScrollY += sTouchAccelerator; 						// 移動量を算出し移動させる
					sTouchLastY = sTouchMoveY; 							// 最近の最新座標
					bMoveList = true;
		        }
				// 範囲外
				var sMax = -(MAX_SHOP_PANEL_START_Y + (MAX_SHOP_PANEL_HEIGHT * (MAX_SHOP_LIST_HEIGHT-4)))
				if(sScrollY > (MAX_SHOP_PANEL_HEIGHT / 2))
				{
					sTouchAccelerator = 0;
					sScrollY          = (MAX_SHOP_PANEL_HEIGHT / 2);
				}
				if(sScrollY < sMax)
				{
					sTouchAccelerator = 0;
					sScrollY          = sMax;
				}
			}
			else
			{
				if(bTouch/*!bTouch*/) 
				{	
					if(bBuyTouch && sTouchNo != -1)
					{
	 					eSwitch = 1;
						sResYesNo = -1;
						bOldTouch = false; 
						bTouch = false;
						sScaleRate = 0;
						if(CoinNum < 10)
						{
							eSwitch = 3;
						}
					}
					else
					{
					}
					bBuyTouch = false; 
				}
			}
			// 画面クリア
	        this.clear();
			// シートの描画
	        sheet.draw(sScrollY);
			// タッチ
			bOldTouch = bTouch;
		}
		this.draw_debug = function()
		{
			// メモリ内の表示デバッグ
			//var Use    = performance.memory.usedJSHeapSize;
			//var Total  = performance.memory.totalJSHeapSize;
			//var UseM   = Use   / 1024 / 1024;
			//var TotalM = Total / 1024 / 1024;
			//document.getElementById("body").innerHTML = "[メモリ]" + "[" + Use + "]/" + "[" + Total + "]" + sActiveSheetNo;
			//document.getElementById("body").innerHTML += "\n[メモリ]" + "[" + UseM + "M]/" + "[" + TotalM + "M]";
		}
	    //描画
	    this.draw = function() 
		{
			// メイン
			if(eSwitch == 0)
			{
				this.draw_Main();
			}
			// ウィンドウ
			else if(eSwitch == 1 || eSwitch == 2)
			{
				this.draw_BuyWindow();
			}
			// 満タンまたはお金がない
			else if(eSwitch == 3 || eSwitch == 4)
			{
				this.draw_BuyWindow();
			}
			
			// デバッグの表示
			this.draw_debug();
	    };
		// --------------------------------------    
	    // マウスイベント
		// --------------------------------------
	    this.onTouchStart = function(e)
		{
	        var pos = getTouchPos(e);
	        sTouchStartX = pos.x;
	        sTouchStartY = pos.y;
	        sTouchMoveX  = pos.x;
	        sTouchMoveY  = pos.y;
			sTouchLastX  = pos.x;
			sTouchLastY  = pos.y;
	        bTouch = true;
	        e.preventDefault(); // デフォルトイベント処理をしない
	    };
	    this.onTouchMove = function(e) 
		{
	        if (bTouch) 
			{
	            var pos = getTouchPos(e);
	        	sTouchMoveX  = pos.x;
				sTouchMoveY  = pos.y;
	        }
	        e.preventDefault(); // デフォルトイベント処理をしない
	    };
	    this.onTouchEnd = function(e)
		{
	        bTouch = false;
	        e.preventDefault(); // デフォルトイベント処理をしない
	    };
		// --------------------------------------    
	    // マウスイベントリスナーの追加
		// --------------------------------------
	    if (navigator.userAgent.indexOf('iPhone')  > 0 ||
	        navigator.userAgent.indexOf('iPod')    > 0 ||
	        navigator.userAgent.indexOf('iPad')    > 0 ||
	        navigator.userAgent.indexOf('Android') > 0) 
		{
	        canvas.addEventListener("touchstart",this.onTouchStart,false);
	        canvas.addEventListener("touchmove", this.onTouchMove, false);
	        canvas.addEventListener("touchend",  this.onTouchEnd,  false);
	    } 
		else 
		{
	        canvas.addEventListener("mousedown", this.onTouchStart,false);
	        canvas.addEventListener("mousemove", this.onTouchMove, false);
	        canvas.addEventListener("mouseup",   this.onTouchEnd,  false);
	    }
		// --------------------------------------
	    // 初期描画
		// --------------------------------------
	    this.draw();
	};

	var alpha = 0;
	st = STATUS.INIT;	
	// スタンプ画像のロード
	LoadStampGraphicHandle();
	
	var rootSceen = document.getElementById("sceen");
	var sceen = document.createElement("div");
	rootSceen.appendChild(sceen);
	sceen.style.opacity = alpha;
	
	var im =document.createElement('canvas');
	im.setAttribute('id', 'canvas');
 	im.width = 640;   
	im.height = 1200;  
	sceen.appendChild(im);	
	mainCanvas = new MainCanvas(0);
	
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
    			mainCanvas.draw();
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
				//次のシーンをセット
				nextSceen = new SceenTitle();
				break;
		}
	};
	
};

function goTitle(e)  
{
	st = STATUS.FADEOUT;
}

