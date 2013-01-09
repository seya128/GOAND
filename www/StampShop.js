

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
var fWindowSheetRate = 0.32;

// ボタン
var g_iButtonStartClickIndex	= -1;
var g_iButtonMoveClickIndex 	= -1;
var g_iClickDataIndex 	        = -1;
var g_bMoveList					= false;
var g_bOldMoveList				= false;

// フォントサイズ
var g_iFontSize = 14;
var g_sFontName = g_iFontSize + "pt Arial";

// ショップ
var g_BuyWakuImage 				= null;
var g_BuyWindowImage 			= null;
var g_YesNoMessageImage 		= null;
var g_BuyOkMessageImage 		= null;
var g_BuyNoCoinMessageImage 	= null;
var g_BuyStampIppaiMessageImage = null;
var g_CoinBackImage 			= null;
var g_ShopImage 				= null;
var g_CoinChipImage 			= null;
		

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


function DrawBuyImage(ctx, GPosY, id, gold)
{
	var popImage = GetStampSheetGraphicImage(id);
	
	// スタンプ
	if(id >= M_OFFSET_STAMP)
	{
		ctx.drawImage(popImage, 
			177 - popImage.width  / 2, 
			GPosY + 380 - popImage.height / 2, 
			popImage.width, 
			popImage.height);
		// -------------------------------------
		// 持っている数
		// -------------------------------------	
		DrawStrNum(ctx, 314, GPosY + 368, GetStampNum(id - M_OFFSET_STAMP), false, 0.72, sScaleRate, 55);
		
	}
	// シート
	else
	{
		var PopX = 176 			- (640  * fWindowSheetRate)/2;
		var PopY = GPosY + 300 	- (1138 * fWindowSheetRate)/2;
		var PopW = 640  * fWindowSheetRate;
		var PopH = 1138 * fWindowSheetRate;
		SafeDrawSheet(ctx, popImage, PopX, PopY, PopW, PopH);	
		
		// エッジ表示
		ctx.beginPath();             						// パスのリセット
		ctx.lineWidth = 2;           						// 線の太さ
		ctx.strokeStyle="#ffffff";   						// 線の色
		ctx.moveTo(PopX,			PopY);					// 開始位置
		ctx.lineTo(PopX + PopW, 	PopY);					// 次の位置
		ctx.lineTo(PopX + PopW, 	PopY + PopH);			// 次の位置
		ctx.lineTo(PopX,			PopY + PopH);			// 次の位置
		ctx.closePath();									// パスを閉じる
		ctx.stroke();										// 描画	
		
		// -------------------------------------
		// 持っている数
		// -------------------------------------	
		DrawStrNum(ctx, 314, GPosY + 368, GetSheetNum(id), false, 0.72, sScaleRate, 55);		
	}	
	
	// -------------------------------------
	// 販売金額表示
	// -------------------------------------	
	DrawStrNum(ctx, 414, GPosY + 470, gold, false, 0.72, sScaleRate, 55);
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
				/*
				var PosX = (xx)-214/2 + x + 38;
				var PosY = (yy)-237/2 + y + 170 + ofs;
				var PosW = 137;
				var PosH = 46;
				*/
				var PosX = (xx)-214/2 + x + 49;
				var PosY = (yy)-237/2 + y + 170 + ofs;
				var PosW = 116;
				var PosH = 54;
			
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
	var id = gShopBuyListTable[g_iClickDataIndex]["id"];	
	var gold = gShopBuyListTable[g_iClickDataIndex]["gold"];	
	var GPosY = -84 + (1.0 - sScaleRate) * -64;

	//var xx  = j  *  MAX_SHOP_PANEL_WIDTH  + MAX_SHOP_PANEL_START_X;
	//var yy  = (i * MAX_SHOP_PANEL_HEIGHT) + MAX_SHOP_PANEL_START_Y + YVal;
	this.ctx.globalAlpha = sScaleRate;
	
	// 購入メッセージ
	this.ctx.drawImage(g_BuyWindowImage, 
		20  /*- 460 / 2*/, 
		GPosY + 214 /*- 440 / 2*/);
	
	// スタンプ
	if(id >= 100)
	{
		// 交換する？
		this.ctx.drawImage(g_StampMessageBottonHandle, 
			20  /*- 460 / 2*/, 
			GPosY + 520 /*- 440 / 2*/);
	}
	// シート
	else
	{
		// 交換する？
		this.ctx.drawImage(g_SheetMessageHandle, 
			20  /*- 460 / 2*/, 
			GPosY + 520 /*- 440 / 2*/);		
	}
	
	// 交換する？
	this.ctx.drawImage(g_YesNoMessageImage, 
		20  /*- 460 / 2*/, 
		GPosY + 520 /*- 440 / 2*/);

	// -------------------------------------
	// 持っている数,販売金額表示,スタンプかシートを表示
	// -------------------------------------
	DrawBuyImage(this.ctx, GPosY, id, gold);
	
	var PosYesX = 33;
	var PosYesY = GPosY + 690;
	var PosYesW = 281;
	var PosYesH = 184;
	var PosNoX = 317;
	var PosNoY = GPosY + 690;
	var PosNoW = 281;
	var PosNoH = 184;
	//if(this.ctx.globalAlpha < 0) { this.ctx.globalAlpha = 0; }
	this.ctx.drawImage(g_YesImageHandle, 
		PosYesX  /*- 460 / 2*/, 
		PosYesY);
	this.ctx.drawImage(g_NoImageHandle, 
		PosNoX  /*- 460 / 2*/, 
		PosNoY);
	

//	this.ctx.fillStyle = 'rgb(255, 255, 255)';
//	this.ctx.font = g_sFontName;
//	var gold = gShopBuyListTable[g_iClickDataIndex]["gold"];
//	this.ctx.fillText("" + gold, 128 + 320 + 24, GPosY + 335);
//	DrawFont(128 + 320 + 42, GPosY + 335, this.ctx, "" + gold, true);
//	DrawCoinL(g_CoinChipImage, this.ctx, 128 + 273, GPosY + 305, gold);

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


// スタンプを購入しました
// いっぱいですなどなど
ShopSheet.prototype.drawOK= function()
{
	var GPosY = -84;
	DrawBack(this.ctx);

	//var xx  = j  *  MAX_SHOP_PANEL_WIDTH  + MAX_SHOP_PANEL_START_X;
	//var yy  = (i * MAX_SHOP_PANEL_HEIGHT) + MAX_SHOP_PANEL_START_Y + YVal;
	this.ctx.globalAlpha = sScaleRate;
	
	// 確認ウィンドウ
	this.ctx.drawImage(g_BuyWindowImage, 
		20  /*- 460 / 2*/, 
		GPosY + 214);
	// 購入しました
	if(eSwitch == 2)
	{
		this.ctx.drawImage(g_BuyOkMessageImage, 
			30  /*- 460 / 2*/, 
			GPosY + 520);
	}
	// お金が足りません
	else if(eSwitch == 3)
	{
		this.ctx.drawImage(g_BuyNoCoinMessageImage, 
			30  /*- 460 / 2*/, 
			GPosY + 520);
	}
	// いっぱいです
	else if(eSwitch == 4)
	{
		this.ctx.drawImage(g_BuyStampIppaiMessageImage, 
			30  /*- 460 / 2*/, 
			GPosY + 520);
	}
	// シート持ってる
	else if(eSwitch == 5)
	{
		this.ctx.drawImage(g_HaveMessageBottonHandle, 
			30  /*- 460 / 2*/, 
			GPosY + 520);
	}

	// -------------------------------------
	// 持っている数,販売金額表示,スタンプかシートを表示
	// -------------------------------------
	var id = gShopBuyListTable[g_iClickDataIndex]["id"];	
	var gold = gShopBuyListTable[g_iClickDataIndex]["gold"];
	DrawBuyImage(this.ctx, GPosY, id, gold);
	
	// -------------------------------------
	// はいボタン
	// -------------------------------------
	var PosYesX = 180;
	var PosYesY = GPosY + 690;
	var PosYesW = 281;
	var PosYesH = 184;

	this.ctx.drawImage(g_YesImageHandle, 
		PosYesX  /*- 460 / 2*/, 
		PosYesY /*- 440 / 2*/, 
		PosYesW, 
		PosYesH);

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
				this.ctx.drawImage(g_BuyWakuImage, 
					(xx)-214/2 + x, 
					(yy)-237/2 + y, 
					214, 
					237);
				var id       = gShopBuyListTable[(i * MAX_SHOP_DISP_WIDTH) + j]["id"];
				var popImage = GetStampSheetGraphicImage(id);
	
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
					var PopX = (xx)-640  * fBuySheetRate/2 + x;
					var PopY = (yy)-1138 * fBuySheetRate/2 + y - 70;
					var PopW = 640  * fBuySheetRate;
					var PopH = 1138 * fBuySheetRate;
					// 描画
					if(SafeDrawSheet(this.ctx, popImage, PopX, PopY, PopW, PopH) == false)
					{
						// エッジ表示
						this.ctx.beginPath();             						// パスのリセット
						this.ctx.lineWidth = 2;           						// 線の太さ
						this.ctx.strokeStyle="#ffffff";   						// 線の色
						this.ctx.moveTo(PopX,			PopY);					// 開始位置
						this.ctx.lineTo(PopX + PopW, 	PopY);					// 次の位置
						this.ctx.lineTo(PopX + PopW, 	PopY + PopH);			// 次の位置
						this.ctx.lineTo(PopX,			PopY + PopH);			// 次の位置
						this.ctx.closePath();									// パスを閉じる
						this.ctx.stroke();										// 描画
						this.ctx.fillStyle = 'rgb(0, 0, 0)';
						this.ctx.fillRect(PopX, PopY, PopW, PopH);
						this.ctx.fillStyle = 'rgb(255, 255, 255)';
						this.ctx.font = g_sFontName;
						DrawFont(PopX + 36, PopY + 80, this.ctx, "ロード中", true)
					}
					else
					{				
						// エッジ表示
						this.ctx.beginPath();             						// パスのリセット
						this.ctx.lineWidth = 2;           						// 線の太さ
						this.ctx.strokeStyle="#ffffff";   						// 線の色
						this.ctx.moveTo(PopX,			PopY);					// 開始位置
						this.ctx.lineTo(PopX + PopW, 	PopY);					// 次の位置
						this.ctx.lineTo(PopX + PopW, 	PopY + PopH);			// 次の位置
						this.ctx.lineTo(PopX,			PopY + PopH);			// 次の位置
						this.ctx.closePath();									// パスを閉じる
						this.ctx.stroke();										// 描画
					}
				
				}
				var gold = gShopBuyListTable[(i * MAX_SHOP_DISP_WIDTH) + j]["gold"];
				//this.ctx.fillText("" + gold, xx - 25 + x, yy + 35 + y); 
			
				//if(GetIsSheetTrue(id) == false)
				//{
				//	DrawFont(xx + 3 + x + 10, yy + 35 + y, this.ctx, "うりきれ", true);	
				//}
				//else
				{
					DrawStrNum(this.ctx, xx + x - 55, yy + 46 + y, gold, false, 0.35, 1.0, 20);
					//DrawCoin(g_CoinChipImage, this.ctx, xx + x - 12, yy + 5 + y, gold);
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
				this.ctx.drawImage(GetStampGraphicHandle_Image(((i * MAX_SHOP_DISP_WIDTH) + j)%27), 
					(xx)-STAMP_W/2 + x, 
					(yy)-STAMP_H/2 + y - 70, 
					STAMP_W, 
					STAMP_H);

				this.ctx.font = g_sFontName;
				this.ctx.fillText("10", xx - 25 + x, yy + 35 + y); 
			}
		}*/
		// -------------------------------------
		// 買うボタンの押せる場所をデバック表示
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
			
					var PosX = (xx)-214/2 + x + 49;
					var PosY = (yy)-237/2 + y + 170;
					var PosW = 116;
					var PosH = 54;

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
		this.ctx.drawImage(g_ShopImage, 
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
		
		// デバッグ
		var TitleBackYesX = 424;
		var TitleBackYesY = 40;
		var TitleBackYesW = 20;
		var TitleBackYesH = 20;
		this.ctx.globalAlpha = 0.5;
        this.ctx.fillRect(TitleBackYesX, TitleBackYesY, TitleBackYesW, TitleBackYesH);
		this.ctx.globalAlpha = 1.0;
		
		if((!bTouch) && (bOldTouch))
		{
			if(
				(TitleBackYesX < sTouchMoveX)  && (TitleBackYesX + TitleBackYesW > sTouchMoveX)  &&
				(TitleBackYesY < sTouchMoveY)  && (TitleBackYesY + TitleBackYesH > sTouchMoveY)  &&
				(TitleBackYesX < sTouchStartX) && (TitleBackYesX + TitleBackYesW > sTouchStartX) &&
				(TitleBackYesY < sTouchStartY) && (TitleBackYesY + TitleBackYesH > sTouchStartY))
			{	
				AddCoin(1000);
				alert("コインの所持枚数をマックスにしました。");
			}
		}			
    }
};
   

var StampShop = function() 
{
	var mainCanvas = null;
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
	// --------------------------------------
    // 初期描画
	// --------------------------------------
    //this.draw();	
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
								AddCoinEffect(ctx, g_CoinChipImage, 395, 26, 60, 60, 1.0, i);
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
					if(GetIsSheetTrue(id) == false)      { eSwitch = 5; }
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
			else if(eSwitch == 3 || eSwitch == 4 || eSwitch == 5)
			{
				this.draw_BuyWindow();
			}
			
			// --------------------------------------    
			// 残り金額の描画
			// --------------------------------------
			ctx.drawImage(g_CoinBackImage, 
				380, 
				0, 
				260, 
				101);		
			ctx.font = g_sFontName;
			//this.ctx.fillText("" + GetCoin(), 500, 70); 
			//DrawFont(540, 74, ctx, "" + GetCoin(), true);
			DrawStrNum(ctx, 518, 74, GetCoin(), false, 0.4, 1.0, 30);
			
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
	};

	var alpha = 0;
	g_eStatus = G_STATUS.INIT;	
	
	// -----------------------------------------
	// スタンプのロード
	// -----------------------------------------
    LoadStampGraphic();
	
	// -----------------------------------------
	// ショップのロード
	// -----------------------------------------
	// 購入枠
	if(g_BuyWakuImage == null)
	{
		g_BuyWakuImage = new Image();
	    g_BuyWakuImage.src = "img/07_shop/004.png";
		g_sShopLoadFlg.AddLoadFile(g_BuyWakuImage);
		// 購入ウィンドウ
		g_BuyWindowImage = new Image();
	    g_BuyWindowImage.src = "img/07_shop/o_wak_a.png";
		g_sShopLoadFlg.AddLoadFile(g_BuyWakuImage);	
		// はい、いいえメッセージメッセージ
		g_YesNoMessageImage = new Image();
	    g_YesNoMessageImage.src = "img/07_shop/o_txt_a.png";
		g_sShopLoadFlg.AddLoadFile(g_YesNoMessageImage);		
		// 購入しましたのOKメッセージ
		g_BuyOkMessageImage = new Image();
	    g_BuyOkMessageImage.src = "img/07_shop/o_txt_d.png";
		g_sShopLoadFlg.AddLoadFile(g_BuyOkMessageImage);	
		// コインが足らないよメッセージ
		g_BuyNoCoinMessageImage = new Image();
	    g_BuyNoCoinMessageImage.src = "img/07_shop/o_txt_b.png";
		g_sShopLoadFlg.AddLoadFile(g_BuyNoCoinMessageImage);	
		// スタンプいっぱいメッセージ
		g_BuyStampIppaiMessageImage = new Image();
	    g_BuyStampIppaiMessageImage.src = "img/07_shop/o_txt_c.png";
		g_sShopLoadFlg.AddLoadFile(g_BuyStampIppaiMessageImage);	
		// コインバック
		g_CoinBackImage = new Image();
	    g_CoinBackImage.src = "img/07_shop/002.png";
		g_sShopLoadFlg.AddLoadFile(g_CoinBackImage);	
		// ショップ
		g_ShopImage = new Image();
	    g_ShopImage.src = "img/07_shop/001.png";
		g_sShopLoadFlg.AddLoadFile(g_ShopImage);	
		// コインチップ
		g_CoinChipImage = new Image();									// イメージクラス
	    g_CoinChipImage.src = "img/07_shop/coin.png";					// イメージの名前を代入[StampData.js]
		g_sShopLoadFlg.AddLoadFile(g_CoinChipImage);	
		// ローディング開始
		g_sShopLoadFlg.Loading();	
	}

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
	GSetupEffect();
	
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
				if(g_sStampLoadFlg.bLoadFlg && g_sShopLoadFlg.bLoadFlg)
				{
					// シートのロード
   					LoadSheetGraphic();
					if(mainCanvas == null)
					{
						mainCanvas = new MainCanvas(0);
					}
					M_PRINTB("");
					//各データが読み込まれるまで待つ
					if (LoadingCounter <= 0)
					{
						g_eStatus = G_STATUS.FADEIN;
						// メインキャンバスの描画
	    				mainCanvas.draw();
					}
				}
				// テストです、ロード中
				else
				{
					var strDumpdata1 = g_sSheetLoadFlg.GetDump();
					var strDumpdata2 = g_sStampLoadFlg.GetDump();
					var strDumpdata3 = g_sShopLoadFlg.GetDump();
					M_PRINTB("ロード中です！<br>"				+
							"[Sheet]" + strDumpdata1 + "<br>" 	+ 
					        "[Stamp]" + strDumpdata2 + "<br>" 	+ 
							"[Shop ]" + strDumpdata3);
						
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
			
				// ----------------------------------------------
				// ロード中か？
				// ----------------------------------------------
				if(g_sSheetLoadFlg.bLoadFlg == false)
				{	
					var strDumpdata1 = g_sSheetLoadFlg.GetDump();
					M_PRINTR("ロード中です！<br>"				+
							"[Sheet]" + strDumpdata1);
				}
				else { M_PRINTB(""); }
			
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


