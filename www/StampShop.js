

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

// フォントサイズ
var g_iFontSize = 20;
var g_sFontName = g_iFontSize + "pt Arial";

function DrawCoinL(img, ctx, x, y, gold)
{
	var iSizeH = 15;
	y -= iSizeH;
	for(var i = 0; i < gold; i ++)
	{
		ctx.drawImage(img, x + (i * iSizeH * 2), y);	
	}
}
function DrawCoin(img, ctx, x, y, gold)
{
	var iSizeH = 15;
	y -= iSizeH;
	for(var i = 0; i < gold; i ++) { x -= iSizeH; }
	for(var i = 0; i < gold; i ++)
	{
		ctx.drawImage(img, x + (i * iSizeH * 2), y);	
	}
}

function DrawCoinA(img, ctx, x, y, gold, a)
{
	ctx.globalAlpha = a;
	DrawCoin(img, ctx, x, y, gold)
	ctx.globalAlpha = 1.0;
}


function DrawFont(x, y, ctx, string, center)
{
	if(center)
	{
		ctx.textAlign = "center";
	}
	else
	{
		ctx.textAlign = "left";
	}
	ctx.fillText(string, x, y); 
}

// -------------------------------------
// スタンプの最大数を取得しデバッグ表示
// -------------------------------------
var timerID;

//
// ショップシート
//
function ShopSheet(canvas_ctx)
{
    var _this = this;
    this.ctx = canvas_ctx;
    this.sheetSrc = "";

	// 購入枠
	this.BuyWakuImage = new Image();
    this.BuyWakuImage.src = "img/07_shop/004.png";
	g_sShopLoadFlg.AddLoadFile(this.BuyWakuImage);
	
	// 購入ウィンドウ
	this.BuyWindowImage = new Image();
    this.BuyWindowImage.src = "img/07_shop/o_wak_a.png";
	g_sShopLoadFlg.AddLoadFile(this.BuyWakuImage);	
	
	// はい、いいえメッセージメッセージ
	this.YesNoMessageImage = new Image();
    this.YesNoMessageImage.src = "img/07_shop/o_txt_a.png";
	g_sShopLoadFlg.AddLoadFile(this.YesNoMessageImage);		
	
	// 購入しましたのOKメッセージ
	this.BuyOkMessageImage = new Image();
    this.BuyOkMessageImage.src = "img/07_shop/o_txt_d.png";
	g_sShopLoadFlg.AddLoadFile(this.BuyOkMessageImage);	
	
	// コインが足らないよメッセージ
	this.BuyNoCoinMessageImage = new Image();
    this.BuyNoCoinMessageImage.src = "img/07_shop/o_txt_b.png";
	g_sShopLoadFlg.AddLoadFile(this.BuyNoCoinMessageImage);	
	
	// スタンプいっぱいメッセージ
	this.BuyStampIppaiMessageImage = new Image();
    this.BuyStampIppaiMessageImage.src = "img/07_shop/o_txt_c.png";
	g_sShopLoadFlg.AddLoadFile(this.BuyStampIppaiMessageImage);	
	
	// コインバック
	this.CoinBackImage = new Image();
    this.CoinBackImage.src = "img/07_shop/002.png";
	g_sShopLoadFlg.AddLoadFile(this.CoinBackImage);	

	// ショップ
	this.ShopImage = new Image();
    this.ShopImage.src = "img/07_shop/001.png";
	g_sShopLoadFlg.AddLoadFile(this.ShopImage);	
	
	// コインチップ
	this.CoinChipImage = new Image();									// イメージクラス
    this.CoinChipImage.src = "img/07_shop/coin.png";					// イメージの名前を代入[StampData.js]
	g_sShopLoadFlg.AddLoadFile(this.CoinChipImage);	
		
	
	// ローディング開始
	g_sShopLoadFlg.Loading();	
}

// プロック
ShopSheet.prototype.Proc = function(ofs)
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
		{
		//	var YVal = i / MAX_SHOP_DISP_HEIGHT;
		//	YVal  = Math.floor(YVal);
		//	YVal *= MAX_SHOP_PANEL_INTERVAL_Y;
			
			// できる限SKY_01軽くする
		//	var YPos = (i * MAX_SHOP_PANEL_HEIGHT) + MAX_SHOP_PANEL_START_Y;
		//	if(YPos + y < 300) { iCounter += MAX_SHOP_LIST_WIDTH; continue; }
		//	else if(YPos + y > 1280)       { iCounter += MAX_SHOP_LIST_WIDTH; continue; }
			
			for(var j = 0; j < MAX_SHOP_LIST_WIDTH; j ++)
			{
				// 終端
				iCounter ++;
				if(iCounter > M_MAX_BUY_LIST) { break; }
				
				var xx  = j  * MAX_SHOP_PANEL_WIDTH   + MAX_SHOP_PANEL_START_X;
				var yy  = (i * MAX_SHOP_PANEL_HEIGHT) + MAX_SHOP_PANEL_START_Y/* + YVal*/;
		
				var PosX = (xx)-214/2 + x + 38;
				var PosY = (yy)-237/2 + y + 170 + ofs;
				var PosW = 137;
				var PosH = 46;
				
				if(PosY < 135) { continue; }

				var id = gShopBuyListTable[(i * MAX_SHOP_DISP_WIDTH) + j]["id"];	
				
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

ShopSheet.prototype.drawWindow = function()
{
	DrawBack(this.ctx);
	
	var GPosY = (1.0 - sScaleRate) * -64;

	//var xx  = j  *  MAX_SHOP_PANEL_WIDTH  + MAX_SHOP_PANEL_START_X;
	//var yy  = (i * MAX_SHOP_PANEL_HEIGHT) + MAX_SHOP_PANEL_START_Y + YVal;
	this.ctx.globalAlpha = sScaleRate;
	this.ctx.drawImage(this.BuyWindowImage, 
		89  /*- 460 / 2*/, 
		GPosY + 214 /*- 440 / 2*/, 
		460, 
		440);
	this.ctx.drawImage(this.YesNoMessageImage, 
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
			popImage.width, 
			popImage.height);
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
	this.ctx.drawImage(g_YesImageHandle, 
		PosYesX  /*- 460 / 2*/, 
		PosYesY /*- 440 / 2*/, 
		PosYesW, 
		PosYesH);
	this.ctx.drawImage(g_NoImageHandle, 
		PosNoX  /*- 460 / 2*/, 
		PosNoY /*- 440 / 2*/, 
		PosNoW, 
		PosNoH);
	
	this.ctx.drawImage(this.CoinChipImage, 
		400, GPosY + 290,
		60, 
		60);	

//	this.ctx.fillStyle = 'rgb(255, 255, 255)';
//	this.ctx.font = g_sFontName;
	var gold = gShopBuyListTable[g_iClickDataIndex]["gold"];
//	this.ctx.fillText("" + gold, 128 + 320 + 24, GPosY + 335);
//	DrawFont(128 + 320 + 42, GPosY + 335, this.ctx, "" + gold, true);
	DrawCoinL(this.CoinChipImage, this.ctx, 128 + 273, GPosY + 305, gold);
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
ShopSheet.prototype.drawOK= function()
{
	DrawBack(this.ctx);

	//var xx  = j  *  MAX_SHOP_PANEL_WIDTH  + MAX_SHOP_PANEL_START_X;
	//var yy  = (i * MAX_SHOP_PANEL_HEIGHT) + MAX_SHOP_PANEL_START_Y + YVal;
	this.ctx.globalAlpha = sScaleRate;
	this.ctx.drawImage(this.BuyWindowImage, 
		89  /*- 460 / 2*/, 
		214 /*- 440 / 2*/, 
		460, 
		440);
	if(eSwitch == 2)
	{
		this.ctx.drawImage(this.BuyOkMessageImage, 
			128  /*- 460 / 2*/, 
			380 /*- 440 / 2*/, 
			386, 
			162);
	}
	else if(eSwitch == 3)
	{
		this.ctx.drawImage(this.BuyNoCoinMessageImage, 
			128  /*- 460 / 2*/, 
			380 /*- 440 / 2*/, 
			386, 
			162);
	
	}
	else if(eSwitch == 4)
	{
		this.ctx.drawImage(this.BuyStampIppaiMessageImage, 
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
	this.ctx.font = g_sFontName;
	var gold = gShopBuyListTable[g_iClickDataIndex]["gold"];
//	this.ctx.fillText("" + gold, 128 + 320 + 24, 335); 
//	DrawFont(128 + 320 + 42, 335, this.ctx, "" + gold, true);
	DrawCoinL(this.CoinChipImage, this.ctx, 128 + 273, 305, gold);
	this.ctx.fillStyle = 'rgb(0, 0, 0)';
	
	var id       = gShopBuyListTable[g_iClickDataIndex]["id"];
	var popImage = GetStampGraphicImage(id);
	
	if(id >= 100)
	{
		this.ctx.drawImage(popImage, 
			262/* - (STAMP_W * 0.7)/2*/, 
			237/* - (STAMP_H * 0.7)/2*/, 
			popImage.width, 
			popImage.height);
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

	this.ctx.drawImage(g_YesImageHandle, 
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
ShopSheet.prototype.draw = function(ofs)
{
	//DrawBack(this.ctx);
	
	// フォント
	this.ctx.font = g_sFontName;
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
			var YVal = 0;//i / MAX_SHOP_DISP_HEIGHT;
//			YVal  = Math.floor(YVal);
//			YVal *= MAX_SHOP_PANEL_INTERVAL_Y;
			
			// できる限り軽くする
			var YPos = (i * MAX_SHOP_PANEL_HEIGHT) + MAX_SHOP_PANEL_START_Y/* + YVal*/;
			if(YPos + y <       50)        { iCounter += MAX_SHOP_LIST_WIDTH; continue; }
			else if(YPos + y > 1280)       { iCounter += MAX_SHOP_LIST_WIDTH; continue; }
			
			for(var j = 0; j < MAX_SHOP_LIST_WIDTH; j ++)
			{				
				// 終端
				iCounter ++;
				if(iCounter > M_MAX_BUY_LIST) { break; }		
				
				var xx  = j  * MAX_SHOP_PANEL_WIDTH   + MAX_SHOP_PANEL_START_X;
				var yy  = YPos;
				this.ctx.drawImage(this.BuyWakuImage, 
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
				var gold = gShopBuyListTable[(i * MAX_SHOP_DISP_WIDTH) + j]["gold"];
				//this.ctx.fillText("" + gold, xx - 25 + x, yy + 35 + y); 
			
				if(GetIsSheetTrue(id) == false)
				{
					DrawFont(xx + 3 + x + 10, yy + 35 + y, this.ctx, "×", true);	
				}
				else
				{
					DrawCoin(this.CoinChipImage, this.ctx, xx + x - 12, yy + 5 + y, gold);
					//DrawFont(xx + 3 + x, yy + 35 + y, this.ctx, "" + gold, true);
				}
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

				this.ctx.font = g_sFontName;
				this.ctx.fillText("10", xx - 25 + x, yy + 35 + y); 
			}
		}*/
		// -------------------------------------
		// 小物を表示[ここは領域に制限をかけてのちのち高速化]
		// -------------------------------------  
/*
		if((eSwitch == 0))
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
		}
*/
		// -------------------------------------
		// ショップの描画
		// -------------------------------------  
		this.ctx.drawImage(this.ShopImage, 
			0, 
			0, 
			640, 
			200);
		// --------------------------------------    
	    // タイトルへ戻る
		// --------------------------------------
		this.ctx.drawImage(g_BackImageHandle, 
			0, 
			0, 
			190, 
			101);
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
	
	// ショップデータ
	SetupShopAllData();
	//SetupShopTutorialData();
	
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
	    var sheet = new ShopSheet(ctx);
		
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
					// 購入
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
								BuySaveStampData(id - M_OFFSET_STAMP, 0/*-gold*/);
							}
							else
							{
								BuySaveSheetData(id, 0/*-gold*/)
							}
							for(var i = 0; i < gold; i ++)
							{
								AddCoinEffect(ctx, sheet.CoinChipImage, 415, 26, 60, 60, 1.0, i);
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
				
				// リストスクロール
				for(var i = 0;; i ++)
				{
					if(i == 0)
					{
						sChack -= (gHeightSize / 2);							// シート分の高さ
		//				sChack -= (MAX_SHOP_PANEL_INTERVAL_Y / 2);				// インターバルの半分
						if(sScrollY > sChack) 
						{ 
							sChackTargetX  = 0;
							sActiveSheetNo = i; break; 
						}
		//				sChack -= (MAX_SHOP_PANEL_INTERVAL_Y / 2);				// インターバルの半分
					}
					else
					{
						sChack -= (gHeightSize);								// シート分の高さ
		//				sChack -= (MAX_SHOP_PANEL_INTERVAL_Y / 2);				// インターバルの半分
						if(sScrollY > sChack) 
						{ 
							sChack += (gHeightSize / 2);						// シート分の高さ
		//					sChack += (MAX_SHOP_PANEL_INTERVAL_Y / 2);			// インターバルの半分
							sChackTargetX = sChack;
							sActiveSheetNo = i; break;
						}
		//				sChack -= (MAX_SHOP_PANEL_INTERVAL_Y / 2);				// インターバルの半分
					}
				}
				
				// -----------------------------------------
				// タッチ終了
				// -----------------------------------------
				var sMaxScl = GetMaxBuyScl();
		        if (!bTouch)
				{
					// -----------------------------------------
					// 範囲外の場合保管移動
					// -----------------------------------------
					//if(sScrollY > 0)
					{
						// 線形保管
						if(sScrollY > 0)
						{
							sTouchAccelerator = (0 - sScrollY) * sMoveRate;
							sScrollY = sScrollY + sTouchAccelerator;
							g_bMoveList = true;
						}	
						//else { sScrollY = 0; sTouchAccelerator = 0; }
						// 線形保管
						if(sScrollY < sMaxScl)
						{
							sTouchAccelerator = (sMaxScl - sScrollY) * sMoveRate;
							sScrollY = sScrollY + sTouchAccelerator;
							g_bMoveList = true;
						}	
						//else { sScrollY = 0; sTouchAccelerator = 0; }
					}
					// -----------------------------------------
					// タッチ終了時なので保管移動
					// -----------------------------------------
					//else
					{
						// 移動保管
						//var sMoveSpeed = 64;
						if(Math.abs(sTouchAccelerator) <= 0)
						{
							/*if(sChackTargetX > sScrollY)
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
							else {}*/
						}
						else
						{
							// シートスクロール(急ブレーキ)
							//var MAX_SPEED = 85;
							//if((sPrevSheetNo != sActiveSheetNo) && (Math.abs(sTouchAccelerator) < MAX_SPEED))
							//{
							//	sTouchAccelerator = 0;
							//}
							//else
							{
								sScrollY += sTouchAccelerator;
								// マイナス
								if(sTouchAccelerator < 0)           
								{ 
									sTouchAccelerator *= (0.84); 
									// シートスクロール
									//if(sTouchAccelerator > -MAX_SPEED) { sTouchAccelerator = -MAX_SPEED + 2; } 
									// フリースクロール
									if(sTouchAccelerator > -3) { sTouchAccelerator = 0; }
								}
								// プラス
								else
								{ 
									sTouchAccelerator *= (0.84);
									// シートスクロール
									//if(sTouchAccelerator < MAX_SPEED) { sTouchAccelerator = MAX_SPEED - 2; } 
									// フリースクロール
									if(sTouchAccelerator < 3) { sTouchAccelerator = 0; }
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
					sTouchAccelerator = (sTouchMoveY - sTouchLastY) 		// 移動量
					sScrollY    += sTouchAccelerator; 						// 移動量を算出し移動させる
					sTouchLastY = sTouchMoveY; 								// 最近の最新座標
					//g_bMoveList = true;
		        }
				// 範囲外
				if(sScrollY > (MAX_SHOP_PANEL_HEIGHT / 2))
				{
					sTouchAccelerator 	= 0;
					sScrollY          	= (MAX_SHOP_PANEL_HEIGHT / 2);
					g_bMoveList			= true;
				}
				if(sScrollY < sMaxScl - (MAX_SHOP_PANEL_HEIGHT / 2))
				{
					sTouchAccelerator 	= 0;
					sScrollY          	= sMaxScl - (MAX_SHOP_PANEL_HEIGHT / 2);
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
					// 持ってるか？
					if(GetIsSheetTrue(id) == false)      { eSwitch = 4; }
					// 持っているものが満タンかをチェック
					if(GetIsBuyMax(id) == false)         { eSwitch = 4; }
					// お金はあるかチェック
					else if(GetIsBuyCoin(gold) == false) { eSwitch = 3; }
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
			
			// --------------------------------------    
			// 残り金額の描画
			// --------------------------------------
			ctx.drawImage(sheet.CoinBackImage, 
				380, 
				0, 
				260, 
				101);		
			ctx.font = g_sFontName;
			//this.ctx.fillText("" + GetCoin(), 500, 70); 
			DrawFont(540, 74, ctx, "" + GetCoin(), true);			
	    };
		// --------------------------------------    
	    // マウスイベント
		// --------------------------------------
	    this.onTouchStart = function(e)
		{
			if(g_eStatus != G_STATUS.MAIN) { return; }
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
			if(g_eStatus != G_STATUS.MAIN) { return; }
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
			if(g_eStatus != G_STATUS.MAIN) { return; }
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
	g_eStatus = G_STATUS.INIT;	

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
/*
	// デバッグボタン[コイン-1]
	var iMenuDel =document.createElement('button');
	iMenuDel.setAttribute('id', 'Coin1M');
	iMenuDel.style.position = "absolute";  
	iMenuDel.innerHTML = '-1'
 	iMenuDel.style.top = "50px";
 	iMenuDel.style.left = "180px";
 	iMenuDel.style.width = "30px";   
	iMenuDel.style.height = "25px";  
	var fd = new Function("Coin1M();");
 	iMenuDel.onclick = fd; 
	sceen.appendChild(iMenuDel);
	// デバッグボタン[コイン+1]
	iMenuDel =document.createElement('button');
	iMenuDel.setAttribute('id', 'Coin1P');
	iMenuDel.style.position = "absolute";  
	iMenuDel.innerHTML = '+1'
 	iMenuDel.style.top = "50px";
 	iMenuDel.style.left = "210px";
 	iMenuDel.style.width = "30px";   
	iMenuDel.style.height = "25px";  
	fd = new Function("Coin1P();");
 	iMenuDel.onclick = fd; 
	sceen.appendChild(iMenuDel);
	
	// デバッグボタン[コイン-10]
	var iMenuDel =document.createElement('button');
	iMenuDel.setAttribute('id', 'Coin10M');
	iMenuDel.style.position = "absolute";  
	iMenuDel.innerHTML = '-10'
 	iMenuDel.style.top = "50px";
 	iMenuDel.style.left = "240px";
 	iMenuDel.style.width = "40px";   
	iMenuDel.style.height = "25px";  
	var fd = new Function("Coin10M();");
 	iMenuDel.onclick = fd; 
	sceen.appendChild(iMenuDel);
	// デバッグボタン[コイン+10]
	iMenuDel =document.createElement('button');
	iMenuDel.setAttribute('id', 'Coin10P');
	iMenuDel.style.position = "absolute";  
	iMenuDel.innerHTML = '+10'
 	iMenuDel.style.top = "50px";
 	iMenuDel.style.left = "280px";
 	iMenuDel.style.width = "40px";   
	iMenuDel.style.height = "25px";  
	fd = new Function("Coin10P();");
 	iMenuDel.onclick = fd; 
	sceen.appendChild(iMenuDel);
	*/
	// デバッグボタン[コイン-100]
	var iMenuDel =document.createElement('button');
	iMenuDel.setAttribute('id', 'Coin100M');
	iMenuDel.style.position = "absolute";  
	iMenuDel.innerHTML = '-100'
 	iMenuDel.style.top = "50px";
 	iMenuDel.style.left = "200px";
 	iMenuDel.style.width = "80px";   
	iMenuDel.style.height = "40px";  
	var fd = new Function("Coin100M();");
 	iMenuDel.onclick = fd; 
	sceen.appendChild(iMenuDel);
	// デバッグボタン[コイン+100]
	iMenuDel =document.createElement('button');
	iMenuDel.setAttribute('id', 'Coin100P');
	iMenuDel.style.position = "absolute";  
	iMenuDel.innerHTML = '+100'
 	iMenuDel.style.top = "50px";
 	iMenuDel.style.left = "280px";
 	iMenuDel.style.width = "80px";   
	iMenuDel.style.height = "40px";  
	fd = new Function("Coin100P();");
 	iMenuDel.onclick = fd; 
	sceen.appendChild(iMenuDel);	
//
	
/*	
	// デバッグボタン[ItemMax]
	iMenuDel =document.createElement('button');
	iMenuDel.setAttribute('id', 'ItemMax');
	iMenuDel.style.position = "absolute";  
	iMenuDel.innerHTML = 'I_MAX'
 	iMenuDel.style.top = "75px";
 	iMenuDel.style.left = "180px";
 	iMenuDel.style.width = "70px";   
	iMenuDel.style.height = "25px";  
	fd = new Function("ItemMax();");
 	iMenuDel.onclick = fd; 
	sceen.appendChild(iMenuDel);	
	// デバッグボタン[ItemDel]
	iMenuDel =document.createElement('button');
	iMenuDel.setAttribute('id', 'ItemDel');
	iMenuDel.style.position = "absolute";  
	iMenuDel.innerHTML = 'I_DEL'
 	iMenuDel.style.top = "75px";
 	iMenuDel.style.left = "270px";
 	iMenuDel.style.width = "70px";   
	iMenuDel.style.height = "25px";  
	fd = new Function("ItemDel();");
 	iMenuDel.onclick = fd; 
	sceen.appendChild(iMenuDel);			
*/	
	// キャンバスの作成
	mainCanvas = new MainCanvas(0);
	
	//
	// フレーム処理
	//
	this.onframe = function() 
	{
		switch(g_eStatus) 
		{
			//初期化
			case G_STATUS.INIT:
				// スタンプとシートのロードが終わってる
				if(g_sSheetLoadFlg.bLoadFlg && g_sStampLoadFlg.bLoadFlg && g_sShopLoadFlg.bLoadFlg)
				{	
					//各データが読み込まれるまで待つ
					if (LoadingCounter <= 0)
					{
						g_eStatus = G_STATUS.FADEIN;
						// メインキャンバスの描画
	    				mainCanvas.draw();
					}
				}
				break;

			//フェードイン
			case G_STATUS.FADEIN:
				alpha += (1.0 / 4);
				if (alpha >= 1.0) {
					alpha = 1.0;
					g_eStatus = G_STATUS.MAIN;
				}
				sceen.style.opacity = alpha;
				break;

			//メイン処理
			case G_STATUS.MAIN:
				// メインキャンバスの描画
    			mainCanvas.draw();
				GExecEffect();
				DispMemory();
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
				//次のシーンをセット
				nextSceen = new SceenTitle();
				break;
		}
	};
	
};

function goTitle(e)  
{
	g_eStatus = G_STATUS.FADEOUT;
}
function Coin1P()
{
	AddCoin(1);
}
function Coin1M()
{
	AddCoin(-1)
}
function Coin10P()
{
	AddCoin(10);
}
function Coin10M()
{
	AddCoin(-10)
}
function Coin100P()
{
	AddCoin(100);
}
function Coin100M()
{
	AddCoin(-100)
}
function ItemMax()
{
	// スタンプ購入
	for(var i = 0;; i ++)
	{
		if(BuySaveStampData(i % M_MAX_STAMP, 0) == false) { break; }
	}
	// シート購入
	for(var i = 0;; i ++)
	{
		if(BuySaveSheetData(i % M_MAX_SHEET, 0) == false) { break; }
	}	
	alert("スタンプとシートをいっぱいにしました！");
}
function ItemDel()
{
	DeleteHaveStampData();
	DeleteHaveSheetData();
	AllDeleteStampDrawData();
	alert("スタンプとシートを全て削除しました！");
}

