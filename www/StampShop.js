

// -------------------------------------
// 定義
// -------------------------------------
var sTouchStartX 	= -200;
var sTouchStartY 	= -200;
var sTouchMoveX 	= -200;
var sTouchMoveY 	= -200;
var sTouchLastX 	= -200;
var sTouchLastY 	= -200;
var bTouch 			= false;
var bOldTouch		= false;
var sActiveSheetNo = 0;
var sPrevSheetNo = 0;
var sTouchAccelerator = 0;
var eSwitch = 0;
var sScaleRate = 0;
var fBuySheetRate = 0.12;
var fWindowSheetRate = 0.22;

// ボタン
var g_iButtonStartClickIndex	= -1;
var g_iButtonMoveClickIndex 	= -1;
var g_iClickDataIndex 	        = -1;
var g_bMoveList					= false;
var g_bOldMoveList				= false;

// -------------------------------------
// スタンプの最大数を取得しデバッグ表示
// -------------------------------------
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
	// コイン
	this.CoinChipImage = new Image();									// イメージクラス
    this.CoinChipImage.onload = function(){ _this.isLoaded = true; }	// ロードが終わっていたらフラグを立てる
    this.CoinChipImage.src = "img/07_shop/coin.png";					// イメージの名前を代入[StampData.js]
	
}

// プロック
StampSheet.prototype.Proc = function(ofs)
{
	if(bOldTouch == false || bTouch == true) { return; }
	
	// 交換を押したとき(38, 170) - (174, 170)
	//				   (38, 215) - (174, 215)
    var x = 0;
    var y = 20 + ofs - ofs;
	if(sTouchAccelerator == 0 && g_bOldMoveList == false && g_bMoveList == false)
	{
		var vS = (sActiveSheetNo * MAX_SHOP_DISP_HEIGHT) - MAX_SHOP_DISP_HEIGHT;
		if(vS < 0)  { vS = 0; }
		var iCounter = (vS * 3);
		for(var i = vS; i < vS + (MAX_SHOP_DISP_HEIGHT * 3); i ++)
		//for(var i = 0; i < MAX_SHOP_LIST_HEIGHT; i ++)
		{
			var YVal = i / MAX_SHOP_DISP_HEIGHT;
			YVal  = Math.floor(YVal);
			YVal *= MAX_SHOP_PANEL_INTERVAL_Y;
			for(var j = 0; j < MAX_SHOP_LIST_WIDTH; j ++)
			{
				// 終端
				iCounter ++;
				if(iCounter > M_MAX_BUY_LIST) { break; }
				
				var xx  = j  * MAX_SHOP_PANEL_WIDTH   + MAX_SHOP_PANEL_START_X;
				var yy  = (i * MAX_SHOP_PANEL_HEIGHT) + MAX_SHOP_PANEL_START_Y + YVal;
		
				var PosX = (xx)-214/2 + x + 38;
				var PosY = (yy)-237/2 + y + 170 + ofs;
				var PosW = 137;
				var PosH = 46;

				//this.ctx.globalAlpha = 0.5f;
				if(
					(PosX < sTouchStartX) && (PosX + PosW > sTouchStartX) &&
					(PosY < sTouchStartY) && (PosY + PosH > sTouchStartY) &&
					(PosX < sTouchMoveX) && (PosX + PosW > sTouchMoveX)   &&
					(PosY < sTouchMoveY) && (PosY + PosH > sTouchMoveY))
				{
					g_iButtonMoveClickIndex  = (i * MAX_SHOP_DISP_WIDTH) + j;	
					g_iButtonStartClickIndex = g_iButtonMoveClickIndex;
					g_iClickDataIndex 		 = g_iButtonMoveClickIndex;
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

	var id       = gShopBuyListTable[g_iClickDataIndex]["id"];
	var popImage = GetStampGraphicImage(id);
	
	if(id >= 100)
	{
		this.ctx.drawImage(popImage, 
			262/* - (STAMP_W * 0.7)/2*/, 
			GPosY + 237/* - (STAMP_H * 0.7)/2*/, 
			popImage.width  * 0.7, 
			popImage.height * 0.7);
	}
	else
	{
		this.ctx.drawImage(popImage, 
			262+58      - (popImage.width  * fWindowSheetRate)/2, 
			GPosY + 260 - (popImage.height * fWindowSheetRate)/2, 
			popImage.width  * fWindowSheetRate, 
			popImage.height * fWindowSheetRate);
	}
	
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
	
	this.ctx.drawImage(this.CoinChipImage, 
		400, GPosY + 290,
		60, 
		60);	
	this.ctx.fillStyle = 'rgb(255, 255, 255)';
	this.ctx.font = "20pt Arial";
	var gold = gShopBuyListTable[g_iClickDataIndex]["gold"];
	this.ctx.fillText("" + gold, 128 + 320 + 24, GPosY + 335); 
	this.ctx.fillStyle = 'rgb(0, 0, 0)';
	this.ctx.globalAlpha = 0.5;
	
	// 初期化
	if(sScaleRate >= 1.0 && (!bTouch) && (bOldTouch))
	{
		if(
			(PosYesX < sTouchStartX) && (PosYesX + PosYesW > sTouchStartX) &&
			(PosYesY < sTouchStartY) && (PosYesY + PosYesH > sTouchStartY))
		{
			g_iButtonStartClickIndex = 0;	
		}
		if(
			(PosYesX < sTouchMoveX) && (PosYesX + PosYesW > sTouchMoveX) &&
			(PosYesY < sTouchMoveY) && (PosYesY + PosYesH > sTouchMoveY))
		{
			g_iButtonMoveClickIndex = 0;	
		}
			
		if(
			(PosNoX < sTouchStartX) && (PosNoX + PosNoW > sTouchStartX) &&
			(PosNoY < sTouchStartY) && (PosNoY + PosNoH > sTouchStartY))
		{
			g_iButtonStartClickIndex = 1;	
		}
		if(
			(PosNoX < sTouchMoveX) && (PosNoX + PosNoW > sTouchMoveX) &&
			(PosNoY < sTouchMoveY) && (PosNoY + PosNoH > sTouchMoveY))
		{
			g_iButtonMoveClickIndex  = 1;	
		}
	}
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
	
	// 値段の表示
	this.ctx.drawImage(this.CoinChipImage, 
		400, 290,
		60, 
		60);	
	this.ctx.fillStyle = 'rgb(255, 255, 255)';
	this.ctx.font = "20pt Arial";
	var gold = gShopBuyListTable[g_iClickDataIndex]["gold"];
	this.ctx.fillText("" + gold, 128 + 320 + 24, 335); 
	this.ctx.fillStyle = 'rgb(0, 0, 0)';
	
	var id       = gShopBuyListTable[g_iClickDataIndex]["id"];
	var popImage = GetStampGraphicImage(id);
	
	if(id >= 100)
	{
		this.ctx.drawImage(popImage, 
			262/* - (STAMP_W * 0.7)/2*/, 
			237/* - (STAMP_H * 0.7)/2*/, 
			popImage.width * 0.7, 
			popImage.height * 0.7);
	}
	else
	{
		this.ctx.drawImage(popImage, 
			262+58 - (popImage.width  * fWindowSheetRate)/2, 
			260 - (popImage.height * fWindowSheetRate)/2, 
			popImage.width  * fWindowSheetRate, 
			popImage.height * fWindowSheetRate);
	}
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

	if(sScaleRate >= 1.0 && (!bTouch) && (bOldTouch))
	{
		if(
			(PosYesX < sTouchStartX) && (PosYesX + PosYesW > sTouchStartX) &&
			(PosYesY < sTouchStartY) && (PosYesY + PosYesH > sTouchStartY))
		{
			g_iButtonStartClickIndex = 0;
		}
		if( (PosYesX < sTouchMoveX) && (PosYesX + PosYesW > sTouchMoveX) &&
			(PosYesY < sTouchMoveY) && (PosYesY + PosYesH > sTouchMoveY))
		{
			g_iButtonMoveClickIndex = 0;
		}	
	}

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
		var vS       = (sActiveSheetNo * MAX_SHOP_DISP_HEIGHT) - MAX_SHOP_DISP_HEIGHT;
		if(vS < 0)  { vS = 0; }
		var iCounter = (vS * 3);
		for(var i = vS; i < vS + (MAX_SHOP_DISP_HEIGHT * 3); i ++)
		{
			var YVal = i / MAX_SHOP_DISP_HEIGHT;
			YVal  = Math.floor(YVal);
			YVal *= MAX_SHOP_PANEL_INTERVAL_Y;
			
			// できる限り軽くする
			var YPos = (i * MAX_SHOP_PANEL_HEIGHT) + MAX_SHOP_PANEL_START_Y + YVal;
			if(YPos + y <       60)        { iCounter += MAX_SHOP_LIST_WIDTH; continue; }
			else if(YPos + y > 1240)       { iCounter += MAX_SHOP_LIST_WIDTH; continue; }
			
			for(var j = 0; j < MAX_SHOP_LIST_WIDTH; j ++)
			{				
				// 終端
				iCounter ++;
				if(iCounter > M_MAX_BUY_LIST) { break; }		
				
				var xx  = j  * MAX_SHOP_PANEL_WIDTH   + MAX_SHOP_PANEL_START_X;
				var yy  = YPos;
				this.ctx.drawImage(this.img, 
					(xx)-214/2 + x, 
					(yy)-237/2 + y, 
					214, 
					237);
				var id       = gShopBuyListTable[(i * MAX_SHOP_DISP_WIDTH) + j]["id"];
				var popImage = GetStampGraphicImage(id);
	
				if(id >= 100)
				{
					this.ctx.drawImage(popImage, 
						(xx)-STAMP_W/2 + x, 
						(yy)-STAMP_H/2 + y - 70, 
						STAMP_W, 
						STAMP_H);
				}
				else
				{
					this.ctx.drawImage(popImage, 
						(xx)-popImage.width  * fBuySheetRate/2 + x, 
						(yy)-popImage.height * fBuySheetRate/2 + y - 70, 
						popImage.width  * fBuySheetRate, 
						popImage.height * fBuySheetRate);					
				}


				var gold       = gShopBuyListTable[(i * MAX_SHOP_DISP_WIDTH) + j]["gold"];
				this.ctx.font = "20pt Arial";
				this.ctx.fillText("" + gold, xx - 25 + x, yy + 35 + y); 								
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
				this.ctx.drawImage(GetStampGraphicHandle_StampImage(((i * MAX_SHOP_DISP_WIDTH) + j)%27), 
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
		this.ctx.drawImage(this.BackImage, 
			0, 
			0, 
			190, 
			101);
		this.ctx.font = "20pt Arial";
		this.ctx.fillText("" + GetCoin(), 500, 70); 
		

    }
};
   

var StampShop = function() 
{
	var mainCanvas;
	sTouchStartX 	= -200;
	sTouchStartY 	= -200;
	sTouchMoveX 	= -200;
	sTouchMoveY 	= -200;
	sTouchLastX 	= -200;
	sTouchLastY 	= -200;

	bTouch 			= false;
	bOldTouch		= false;
	sActiveSheetNo = 0;
	sPrevSheetNo = 0;
	sTouchAccelerator = 0;
	eSwitch = 0;
	sScaleRate = 0;
	g_iButtonStartClickIndex 	= -1;
	g_iButtonMoveClickIndex 	= -1;	
	g_iClickDataIndex 			= -1;
	g_bMoveList					= false;
	g_bOldMoveList				= false;
	
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
			{
				if(sScaleRate >= 1.0)
				{
					if(eSwitch == 1)
					{
						// Yes
						if(g_iButtonStartClickIndex == 0 && g_iButtonMoveClickIndex == 0)
						{
							eSwitch = 2;
							sScaleRate = 0;
							var id   = gShopBuyListTable[g_iClickDataIndex]["id"];
							var gold = gShopBuyListTable[g_iClickDataIndex]["gold"];
							
							if(id >= M_OFFSET_STAMP)
							{
								BuySaveStampData(id - M_OFFSET_STAMP, -gold);
							}
							else
							{
								BuySaveSheetData(id, -gold)
							}
							bOldTouch = false; 
							bTouch = false;
						}
						// No
						else if(g_iButtonStartClickIndex == 1 && g_iButtonMoveClickIndex == 1)
						{	
							eSwitch = 0;
							bOldTouch = false; 
							bTouch = false;
						}
					}
					else
					{
						if(g_iButtonStartClickIndex == 0 && g_iButtonMoveClickIndex == 0)
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
			// ----------------------------------------------
	        // タッチされていない場合の位置調整
			// ----------------------------------------------
			sPrevSheetNo = sActiveSheetNo;
			g_bOldMoveList = g_bMoveList;
			
			// ----------------------------------------------
			// タッチ有効
			// ----------------------------------------------
			g_iButtonStartClickIndex = -1;
			g_iButtonMoveClickIndex  = -1;
			g_iClickDataIndex 		 = -1;
			sheet.Proc(sScrollY);
			g_bMoveList				 = false;
					
			// ----------------------------------------------
			// タイトルへ戻る
			// ----------------------------------------------
			if((!bTouch) && bOldTouch)
			{
				var TitleBackYesX = 0;
				var TitleBackYesY = 0;
				var TitleBackYesW = 260;
				var TitleBackYesH = 101;		
				if(
					(TitleBackYesX < sTouchMoveX)  && (TitleBackYesX + TitleBackYesW > sTouchMoveX)  &&
					(TitleBackYesY < sTouchMoveY)  && (TitleBackYesY + TitleBackYesH > sTouchMoveY)  &&
					(TitleBackYesX < sTouchStartX) && (TitleBackYesX + TitleBackYesW > sTouchStartX) &&
					(TitleBackYesY < sTouchStartY) && (TitleBackYesY + TitleBackYesH > sTouchStartY))
				{	
					goTitle();
					g_iButtonMoveClickIndex 	= -1;
					g_iButtonStartClickIndex 	= -1;
					g_iClickDataIndex			= -1;
				}	
			}
	        if(g_iClickDataIndex == -1)
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
						sChack -= (gHeightSize / 2);							// シート分の高さ
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
						sChack -= (gHeightSize);								// シート分の高さ
						sChack -= (MAX_SHOP_PANEL_INTERVAL_Y / 2);				// インターバルの半分
						if(sScrollY > sChack) 
						{ 
							sChack += (gHeightSize / 2);						// シート分の高さ
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
							g_bMoveList = true;
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
								g_bMoveList = true;
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
								g_bMoveList = true;
							}
							else {}
						}
						else
						{
							// 急ブレーキ
							var MAX_SPEED = 85;
							if((sPrevSheetNo != sActiveSheetNo) && (Math.abs(sTouchAccelerator) < MAX_SPEED))
							{
								sTouchAccelerator = 0;
							}
							else
							{
								sScrollY += sTouchAccelerator;
								// マイナス
								if(sTouchAccelerator < 0)           
								{ 
									sTouchAccelerator += 8; 
									if(sTouchAccelerator > -MAX_SPEED) { sTouchAccelerator = -MAX_SPEED + 2; } 
								}
								// プラス
								else
								{ 
									sTouchAccelerator -= 8; 
									if(sTouchAccelerator < MAX_SPEED) { sTouchAccelerator = MAX_SPEED - 2; } 
								}
							}
							g_bMoveList = true;
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
					sScrollY    += sTouchAccelerator; 						// 移動量を算出し移動させる
					sTouchLastY = sTouchMoveY; 							// 最近の最新座標
					//g_bMoveList = true;
		        }
				// 範囲外
				var sMax = -(3400);
				if(sScrollY > (MAX_SHOP_PANEL_HEIGHT / 2))
				{
					sTouchAccelerator 	= 0;
					sScrollY          	= (MAX_SHOP_PANEL_HEIGHT / 2);
					g_bMoveList			= true;
				}
				if(sScrollY < sMax)
				{
					sTouchAccelerator 	= 0;
					sScrollY          	= -(3400);
					g_bMoveList			= true;
				}
			}
			else
			{
				// ----------------------------------------------
				// クリックのトリガー検知
				// ----------------------------------------------
			//	if(g_iClickDataIndex != -1) 
				{	
					// 購入画面へ
 					eSwitch = 1;
					// タッチ初期化
					bOldTouch 	= false; 
					bTouch		= false;
					// レート初期化
					sScaleRate = 0;
					
					// 購入するお金があるかチェック
					var id   = gShopBuyListTable[g_iClickDataIndex]["id"];
					var gold = gShopBuyListTable[g_iClickDataIndex]["gold"];
					// 持っているものが満タンかをチェック
					if(GetIsBuyMax(id) == false)    { eSwitch = 4; }
					// お金はあるかチェック
					if(GetIsBuyCoin(gold) == false) { eSwitch = 3; }
				}
			}
			// 画面クリア
	        this.clear();
			// シートの描画
	        sheet.draw(sScrollY);
			// タッチ
			bOldTouch = bTouch;
		}
	    //描画
	    this.draw = function() 
		{
			g_iButtonStartClickIndex = -1;
			g_iButtonMoveClickIndex = -1;
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

    // すべてロード
    AllLoadStampGraphic();

	// スクリーンの作成
	var rootSceen = document.getElementById("sceen");
	var sceen = document.createElement("div");
	rootSceen.appendChild(sceen);
	sceen.style.opacity = alpha;
	
	// キャンバスの作成
	var im =document.createElement('canvas');
	im.setAttribute('id', 'canvas');
 	im.width = 640;   
	im.height = 1200;  
	sceen.appendChild(im);	
	mainCanvas = new MainCanvas(0);
	
	//
	// フレーム処理
	//
	this.onframe = function() 
	{
		switch(st) 
		{
			//初期化
			case STATUS.INIT:
				//各データが読み込まれるまで待つ
				if (LoadingCounter <= 0)
				{
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

