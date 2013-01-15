
// -------------------------------------
// リダクションサイズを設定する「処理を軽くするためサムネイル」
// -------------------------------------
// 1   640 1200
// 2   320 600
// 2.5 256 480
// 3   213 400
// 4   160 300
var REDUCTION_SIZE 		= 2.0;
var SCREEN_WIDTH   		= 640;
var SCREEN_HEIGHT  		= 1138;
var CANVAS_WIDTH   		= SCREEN_WIDTH  / REDUCTION_SIZE;
var CANVAS_HEIGHT 		= SCREEN_HEIGHT / REDUCTION_SIZE;
var STAMP_W_REDUCTION	= STAMP_W / REDUCTION_SIZE;
var STAMP_H_REDUCTION	= STAMP_H / REDUCTION_SIZE;
var STAMP_W_REDUCTION_W	= STAMP_W_REDUCTION / 2;
var STAMP_H_REDUCTION_H	= STAMP_H_REDUCTION / 2;

// -------------------------------------
// スタンプの最大数を取得しデバッグ表示
// -------------------------------------
var timerID;
var g_YOffset = 140;

// クリア
function DeleteSheetClick(e)
{
	g_iSwitch = 1;
	g_WindowsScaleRate = 0;
}
	
var StampSelect = function() 
{
	//M_PRINTB("StampSelect:コンストラクタ！");
	var sSheetSelectMessage = null;
	var bOldTouch		= false;
	var sTouchStartX 	= -200;
	var sTouchStartY 	= -200;
	var sTouchMoveX 	= -200;
	var sTouchMoveY 	= -200;	
	var iButtonStartClickIndex	= -1;
	var iButtonMoveClickIndex 	= -1;
	var iForceTouch     = false;
	var isTouch = false;
	g_iSwitch = 0;
	var iWaitCounter 	= 0;

	// ウィンドウサイズ
    BROWSER_WIDTH   = window.innerWidth  || document.body.clientWidth  || document.documentElement.clientWidth;
    BROWSER_HEIGHT  = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
    BROWSER_HEIGHT  += 30;
	BROWSER_RATE 		= (640 / BROWSER_WIDTH);
	BROWSER_SCREEN_H 	= (BROWSER_HEIGHT * BROWSER_RATE) - (STAMP_H * BROWSER_RATE);	// 画面領域
	
	var sModoruMessage   = null;
	var sTuLookFlg		 = GetTutorialLookFlg();
	
	
	//
	// スタンプシート
	//
	function StampSheet(canvas_ctx, no)
	{
	    var _this = this;
	    this.ctx = canvas_ctx;
	    this.img = new Image();
	    this.sheetNo = no;
	    this.sheetSrc = "";
		this.iDrawX   = 0;
		this.iDrawY   = 0;
		this.iDrawW   = 0;
		this.iDrawH   = 0;
		this.fZoomRate = 0.75;

		// 動的キャンバス
		this.CanvasSheet = document.createElement("canvas");
		this.CanvasSheet.setAttribute("id","MoveCanvas" + no);
		this.CanvasSheet.setAttribute("width", "" + CANVAS_WIDTH);
		this.CanvasSheet.setAttribute("height","" + CANVAS_HEIGHT);
		this.CanvasSheet_2d = this.CanvasSheet.getContext("2d");    
	    this.setImage(no);
	}
	//描画
	StampSheet.prototype.draw = function(ofs)
	{
		{
	        var rate = Math.abs(ofs)/320 * 0.25 ;
			var scl  = (0.65 - rate) * this.fZoomRate;
	        var w = 640  * scl;
	        var h = 1138 * scl;
	        var x = (640 - w) / 2 + ofs - rate*ofs ;
	        var y = (800 - h) / 2 + g_YOffset;
			
			// -------------------------------------
			// シートの表示
			// -------------------------------------  
			var ScreenH = BROWSER_SCREEN_H;		// ローカルのほうが高速・・・？
			var sh      = ScreenH / REDUCTION_SIZE;
			
			SafeDrawSheetEx(this.CanvasSheet_2d, this.img, 
				0, 0, 640, ScreenH, 
				0, 0, CANVAS_WIDTH,          sh)
			
			// -------------------------------------
			// シートに張り付けて描画
			// -------------------------------------  
			var iSheetNo = this.sheetNo;
			if(GetStampDrawData(iSheetNo) != null && iSheetNo >= 0)
			{
				var iNum = GetStampDrawNum(iSheetNo);
				for(var i = 0; i < iNum; i ++)
				{
					// -------------------------------------
					// 座標取得
					// ------------------------------------- 
					var xx  = GetStampDrawDataX(iSheetNo, i);
					var yy  = GetStampDrawDataY(iSheetNo, i);
					var id  = GetStampDrawDataID(iSheetNo, i);
					var a   = GetStampDrawDataA(iSheetNo, i);
					// -------------------------------------
					// 座標変換
					// ------------------------------------- 
					//var r   = (0.65 - rate);
					//var ww  = (STAMP_W * r);
					//var hh  = (STAMP_H * r);
					//var ox  = x   + (xx * r);
					//var oy  = 400 + (yy * r) - (h / 2);
					//xx = (ox) -  (ww / 2);
	      		  	//yy = ((oy) - (hh / 2) + 20);
					
	
					// -------------------------------------
					// 描画
					// -------------------------------------
					var iDrawX = (xx/REDUCTION_SIZE)-STAMP_W_REDUCTION_W;
					var iDrawY = (yy/REDUCTION_SIZE)-STAMP_H_REDUCTION_H;
					var iCut   = (iDrawY + STAMP_H_REDUCTION) - sh;
					if(iCut <= 0)
					{
						this.CanvasSheet_2d.globalAlpha = a;
						this.CanvasSheet_2d.drawImage(GetStampGraphicHandle_Image(id), 
							iDrawX, 
							iDrawY, 
							STAMP_W_REDUCTION, 
							STAMP_H_REDUCTION);
						this.CanvasSheet_2d.globalAlpha = 1.0;
					}
					else
					{
						var nh = (STAMP_H_REDUCTION - iCut) / STAMP_H_REDUCTION;
						this.CanvasSheet_2d.globalAlpha = a;
						this.CanvasSheet_2d.drawImage(GetStampGraphicHandle_Image(id), 
							0,      0,      STAMP_W, STAMP_H * nh, 									// 画像座標 x y w h
							iDrawX, iDrawY, STAMP_W_REDUCTION, STAMP_H_REDUCTION - iCut);			// 表示座標 x y w h
						this.CanvasSheet_2d.globalAlpha = 1.0;						
					}
				}
			}
			// あまった部分は消す
			// 最終描画
			//M_PRINT("[" + document.body.clientWidth + "][" + document.documentElement.clientWidth + "][" + window.innerWidth + "]");
			//M_PRINT("[" + document.body.clientHeight + "][" + document.documentElement.clientHeight + "][" + window.innerHeight + "]");
	        this.ctx.drawImage(this.CanvasSheet, x, y, w, h);
			this.iDrawX = x;
			this.iDrawY = y;
			this.iDrawW = w;
			this.iDrawH = (ScreenH * scl);
			
			// エッジ表示
			this.ctx.beginPath();             											// パスのリセット
			this.ctx.lineWidth = 2;           											// 線の太さ
			//this.ctx.strokeStyle="#000000";   										// 線の色
			this.ctx.strokeStyle="#ffffff";   											// 線の色
			this.ctx.moveTo(this.iDrawX,               this.iDrawY);					// 開始位置
			this.ctx.lineTo(this.iDrawX + this.iDrawW, this.iDrawY);					// 次の位置
			this.ctx.lineTo(this.iDrawX + this.iDrawW, this.iDrawY + this.iDrawH);		// 次の位置
			this.ctx.lineTo(this.iDrawX,               this.iDrawY + this.iDrawH);		// 次の位置
			this.ctx.closePath();														// パスを閉じる
			this.ctx.stroke();															// 描画			
	    }
	};

	//イメージセット
	StampSheet.prototype.setImage = function(no) 
	{
		if (no < 0) { no += g_HaveStampSheetData.length; }
	    this.sheetNo = no %  g_HaveStampSheetData.length;
		this.img     = GetSheetGraphicHandle_Image(g_HaveStampSheetData[this.sheetNo]["id"]);
	};
	   	
	
	var mainCanvas = null;;
	//
	// メインキャンバス
	//
	var MainCanvas = function(no)
	{
	    var _this = this;
	    this.selectIx = 0;
	    var startX=0;
	    var ofsX=0;
	    var addX=0, ofsXold=0;
	    var ofsRate=1.2;
		var iOldSelecterID = 0;

		// デフォルトキャンバス
	    var canvas = document.getElementById("canvas");
		var ctx    = canvas.getContext("2d");
		var sheet = new Array();
		
	    //スタンプシート準備
		if(g_HaveStampSheetData.length - 1 <= no) { no = g_HaveStampSheetData.length - 1; }

		// 正面
	    sheet[0] = new StampSheet(ctx, no);
		// 次
		if(no + 1 >= g_HaveStampSheetData.length)
		{
			sheet[1] = new StampSheet(ctx, g_HaveStampSheetData.length - 1);
		}
		else
		{
	    	sheet[1] = new StampSheet(ctx, no + 1);
		}
		// 次次
		if(no + 2 >= g_HaveStampSheetData.length)
		{
			sheet[2] = new StampSheet(ctx, g_HaveStampSheetData.length - 1);
		}
		else
		{
	    	sheet[2] = new StampSheet(ctx, no + 2);
		}
		
		// 前
		if(no - 1 < 0)
		{
			sheet[4] = new StampSheet(ctx, 0);
		}
		else
		{
	    	sheet[4] = new StampSheet(ctx, no - 1);
		}
		// 前前
		if(no - 2 < 0)
		{
			sheet[3] = new StampSheet(ctx, 0);
		}
		else
		{
	    	sheet[3] = new StampSheet(ctx, no - 2);
		}

	    // 初期描画
	    //this.draw();
		// -- メインキャンバスのコンストラクタはここまで！ --
		
	    //debug
	    this.dubugDisp = function() {
	        document.getElementById("body").innerHTML = 
	            "select = " + sheet[this.selectIx].sheetNo + "<br>" +
	            "startX = " + startX + "<br>" +
	            "ofsX = " + ofsX + "<br>" +
	            "addX = " + addX + "<br>" +
	            "isTouch = " + isTouch;
	    };
	    
	    //選択されているシート取得
	    this.getSelectSheet = function() {
	        return sheet[this.selectIx];
	    };
	    
	    //キャンバスクリア
	    this.clear = function()
		{
	        ctx.beginPath();
	        //グラデーション領域をセット
	        var grad  = ctx.createLinearGradient(0,0, 0,1138);
	        //グラデーション終点のオフセットと色をセット
	        grad.addColorStop(0,'rgb(10, 10, 50)');
	        grad.addColorStop(0.7,'rgb(150, 150, 240)');
	        //グラデーションをfillStyleプロパティにセット
	        ctx.fillStyle = grad;
	        /* 矩形を描画 */
	        ctx.rect(0,0, 640, 1138);
	        ctx.fill();
	    };
	    
	    //描画
	    this.draw = function() 
		{
	        var ofsMax    = 376;
			
			// ぜったいチュートリアル中は動かさない
			if(g_TutorialSelectFlg != gTUTORIAL_SELECTFLG.NONE)
			{
				ofsX = 0;
				addX = 0;
			}
	        //タッチされていない場合の位置調整
			if(g_iSwitch == 0 && g_eStatus == G_STATUS.MAIN)
			{
		        if (!isTouch)
		    	{
		    		// 切り替わった瞬間
		    		if(Math.abs(ofsX) < 25)
		    		{
		    			if(Math.abs(addX) < 30)
		    			{
		    				ofsX = 0;
		    				addX = 0;
		    			}
		    		}
		    		// 速度の下限
		    		if (addX < -60) { addX = -60; }
		    		if (addX > 60)  { addX = 60;  }
		            
		    		// 速度を足す
		    		ofsX += addX;
		    		
		    		// 移動補正
		    		if(addX == 0 && ofsX != 0)
		    		{
		    			if(ofsX      <= -ofsMax/2) { addX = -8; }
		    			else if(ofsX >= ofsMax/2)  { addX = 8;  }
		    			else { if(ofsX < 0) { addX = 8; } else { addX = -8; } }
		    		}
		            else if (addX<0)
		    		{
		                addX += 8;
		    			if (addX > -28) { addX = -28; }
		            } 
		    		else 
		    		{
		                addX -= 8;
		    			if (addX < 28) { addX = 28; }
		            }
		        } 
				else 
				{
		            addX = ofsX - ofsXold;
		        }
				
				// 動き
				MoveArrowL();
				MoveArrowR();
					
				// 代入
				/*if(iOldSelecterID > this.selectIx)
				{
					PuchArrowL();
				}
				else if(iOldSelecterID < this.selectIx)
				{
					PuchArrowR();
				}*/
				iOldSelecterID = this.selectIx;

		        if (ofsX < -ofsMax / 8)
				{
					// 前
					if(sheet[this.selectIx].sheetNo + 1 < g_HaveStampSheetData.length)
					{
					}
					else
					{
						ofsX = -ofsMax /  8;
						addX = 12;
					}
		        }
		        if (ofsX > ofsMax / 8)
				{		        	
					// 次
		        	if(sheet[this.selectIx].sheetNo > 0)
					{
					}
					else
					{
						ofsX = ofsMax / 8;
						addX = -12;
					}								
		        }
				
		        if (ofsX < -ofsMax / 2)
				{
					// 前
					//if(sheet[this.selectIx].sheetNo + 1 < g_HaveStampSheetData.length)
					{
						startX -= ofsMax / ofsRate;
						ofsX += ofsMax;						
						this.selectIx += 1;
						this.selectIx %= 5;
		            	sheet[(this.selectIx + 2) % 5].setImage(sheet[this.selectIx].sheetNo + 2);
					}
		        }
		        if (ofsX > ofsMax / 2)
				{		        	
					// 次
		        	//if(sheet[this.selectIx].sheetNo > 0)
					{
			            startX += ofsMax/ofsRate;
			            ofsX -= ofsMax;						
						this.selectIx += 5 - 1;
						this.selectIx %= 5;
						sheet[(this.selectIx + 3) % 5].setImage(sheet[this.selectIx].sheetNo - 2);
					}							
		        }
		        ofsXold = ofsX;
			}
			// クリアと背景の表示
			this.clear();		
			var bL = false;
			var bR = false;

			// 戻るボタン
			if(g_TutorialSelectFlg == gTUTORIAL_SELECTFLG.SHEET_TOUCH_NEXT || g_TutorialSelectFlg == gTUTORIAL_SELECTFLG.SHEET_TOUCH_MESSAGE)
			{
		      	ctx.drawImage(g_BackImageHandle, 			
			      	0, 
					0, 
					190, 
					101);
				DrawBack(ctx);
			}
			
			// 切り替わった瞬間
			var nowid  = this.selectIx;
			var previd = (this.selectIx + 4) % 5;
			var nextid = (this.selectIx + 1) % 5;
			sheet[previd].fZoomRate -= 0.075;
			sheet[nextid].fZoomRate -= 0.075;
			sheet[nowid].fZoomRate  += 0.075;
			if(sheet[previd].fZoomRate < 0.85) { sheet[previd].fZoomRate = 0.85; }
			if(sheet[nextid].fZoomRate < 0.85) { sheet[nextid].fZoomRate = 0.85; }
			if(sheet[nowid].fZoomRate > 1.15)  { sheet[nowid].fZoomRate = 1.15;  }
			
			// 前
			if(sheet[nowid].sheetNo > 0)
			{
	        	sheet[previd].draw(ofsX - ofsMax);
				bL = true;
			}
	        // 次
			if(sheet[nowid].sheetNo + 1 < g_HaveStampSheetData.length)
			{
				sheet[nextid].draw(ofsX + ofsMax);
				bR = true;
			}
			sheet[nowid].draw(ofsX);
	    	
	    	if(ofsX == 0 && iForceTouch)
	    	{
	        	isTouch = false;
	    		iForceTouch = false;
	    		bOldTouch = false;
	    	}
			else if(iForceTouch)
			{
	        	isTouch = false;
				bOldTouch = false;
			}

			// 戻るボタン
			if(!(g_TutorialSelectFlg == gTUTORIAL_SELECTFLG.SHEET_TOUCH_NEXT || g_TutorialSelectFlg == gTUTORIAL_SELECTFLG.SHEET_TOUCH_MESSAGE))
			{
		      	ctx.drawImage(g_BackImageHandle, 			
			      	0, 
					0, 
					190, 
					101);
			}
			// 矢印を描画
			ProcArrow();
			if(bL) { DrawArrowL(ctx, 60,  450); }
			if(bR) { DrawArrowR(ctx, 580, 450); }
			// これにするボタン
 			ctx.drawImage(g_ClaerButtonHandle, 145, BROWSER_HEIGHT - 50/*630*/);
		
			
			if(g_eStatus != G_STATUS.MAIN) { g_WindowsScaleRate = 0; return; }
	
			// ２秒待つ 
			if(g_TutorialSelectFlg == gTUTORIAL_SELECTFLG.INIT_WAIT)
			{
				iWaitCounter ++;
				// 50*40=2秒
				if(iWaitCounter > 10)
				{
					g_TutorialSelectFlg = gTUTORIAL_SELECTFLG.SHEET_TOUCH_MESSAGE;
				}
			}
			// シート買ってみよう(メッセージ)
			/*
			else if(g_TutorialSelectFlg == gTUTORIAL_SELECTFLG.SHEET_TOUCH_MESSAGE)
			{
				// 全体を黒くする
				DrawBack(ctx);
				// メッセージファイル
				ctx.drawImage(sSheetSelectMessage, 320 - (540 / 2), 280 - (225 / 2));				
				// 何かオス
				if((!isTouch) && bOldTouch) { g_TutorialNextSelectFlg = gTUTORIAL_SELECTFLG.SHEET_TOUCH_NEXT; }
			}
			*/
			// シート買ってみよう(セレクト)「ランチノーマル以外は押せない」
			else if(g_TutorialSelectFlg == gTUTORIAL_SELECTFLG.SHEET_TOUCH_NEXT || g_TutorialSelectFlg == gTUTORIAL_SELECTFLG.SHEET_TOUCH_MESSAGE)
			{	
				// 全体を黒くする
				//DrawBack(ctx);
				// メッセージファイル
				ctx.drawImage(sSheetSelectMessage, 103, 385);				
				// 何かオス
				if((!isTouch) && bOldTouch) { g_TutorialNextSelectFlg = gTUTORIAL_SELECTFLG.SHEET_TOUCH_NEXT; }
    			// 正面決定
				var aSheet = sheet[this.selectIx];
				var PosYesX = aSheet.iDrawX - 12;
				var PosYesY = aSheet.iDrawY - 12;
				var PosYesW = aSheet.iDrawW + 24;
				var PosYesH = aSheet.iDrawH + 24;				
				//DrawWaku(ctx, PosYesX, PosYesY, PosYesW, PosYesH, true);
				DrawDocumentArrow(ctx, PosYesX + 200, BROWSER_HEIGHT - 150);
				// 変更
				g_TutorialSelectFlg = gTUTORIAL_SELECTFLG.SHEET_TOUCH_NEXT;
			}
			
			// ------------------------------------------------
			// シートが０の時の描画
			// ------------------------------------------------
/*
			if(g_HaveStampSheetData.length == 0)
			{
				// ウィンドウの描画
				g_WindowsScaleRate += 0.15;
				if(g_WindowsScaleRate > 1.0) { g_WindowsScaleRate = 1.0; }
				var id = DrawWindowOk(ctx, g_WindowsScaleRate, ((!isTouch) && bOldTouch), sTouchStartX, sTouchStartY, sTouchMoveX, sTouchMoveY);	    
				if(id == 1) 
				{ 
				}
				else if(id == 0)
				{
					g_eStatus = G_STATUS.FADEOUT;
					next = 1;
				}
			}
			// ------------------------------------------------
			// メニューが出てる時の描画
			// ------------------------------------------------
			else */
	/*		if(g_iSwitch == 1)
			{
				// ウィンドウの描画
				g_WindowsScaleRate += 0.15;
				if(g_WindowsScaleRate > 1.0) { g_WindowsScaleRate = 1.0; }
				var id = DrawWindowYesNo(ctx, g_WindowsScaleRate, ((!isTouch) && bOldTouch), sTouchStartX, sTouchStartY, sTouchMoveX, sTouchMoveY);	    
				if(id == 1) { g_iSwitch = 0; }
				else if(id == 0)
				{
					g_iSwitch 	= 0;
					g_eStatus	= G_STATUS.FADEOUT;
					next      	= -1;	
				}
			}
			// ------------------------------------------------
			// タッチトリガー
			// ------------------------------------------------
	    	else
	*/
			if((!isTouch) && bOldTouch && iForceTouch == false)
	    	{
	    		
	    		// 移動地がでかい
	    		var vMove1 = Math.abs(sTouchStartX - sTouchMoveX);
	    		var vMove2 = Math.abs(sTouchStartY - sTouchMoveY);
	    		if(vMove1 + vMove2 < 10)
	    		{ 
	    			// 次
	    			var PosX;
	    			var PosY;
	    			var PosW;
	    			var PosH;
	    			if(bL)
	    			{
	    				var aSheet = sheet[(this.selectIx + 4) % 5];
						PosX = aSheet.iDrawX;
						PosY = aSheet.iDrawY;
						PosW = aSheet.iDrawW;
						PosH = aSheet.iDrawH;
	    				/*
						ctx.globalAlpha = 0.5;
						ctx.fillStyle = 'rgb(255, 0, 0)';
				        ctx.fillRect(PosX, PosY, PosW, PosH);
						ctx.globalAlpha = 1.0;	
	    				*/

						if(
							(PosX < sTouchMoveX)  && (PosX + PosW > sTouchMoveX)  &&
							(PosY < sTouchMoveY)  && (PosY + PosH > sTouchMoveY)  &&
							(PosX < sTouchStartX) && (PosX + PosW > sTouchStartX) &&
							(PosY < sTouchStartY) && (PosY + PosH > sTouchStartY))
						{	
							iButtonStartClickIndex	= 0;
							iButtonMoveClickIndex 	= 0;
			        		isTouch = true;
							iForceTouch = true;
							ofsX	= 100;
							//PuchArrowL();
						}		
	    			}
	    			
	    			// 前
	    			if(bR)
	    			{
	    				var aSheet = sheet[(this.selectIx + 1) % 5];
						PosX = aSheet.iDrawX;
						PosY = aSheet.iDrawY;
						PosW = aSheet.iDrawW;
						PosH = aSheet.iDrawH;
	    				/*
						ctx.globalAlpha = 0.5;
						ctx.fillStyle = 'rgb(255, 0, 0)';
				        ctx.fillRect(PosX, PosY, PosW, PosH);
						ctx.globalAlpha = 1.0;	
	    				*/
						if(
							(PosX < sTouchMoveX)  && (PosX + PosW > sTouchMoveX)  &&
							(PosY < sTouchMoveY)  && (PosY + PosH > sTouchMoveY)  &&
							(PosX < sTouchStartX) && (PosX + PosW > sTouchStartX) &&
							(PosY < sTouchStartY) && (PosY + PosH > sTouchStartY))
						{	
							iButtonStartClickIndex	= 1;
							iButtonMoveClickIndex 	= 1;
			        		isTouch = true;
							iForceTouch = true;
							ofsX	= -100;
							//PuchArrowR();
						}	
	    			}
	    			
	    			
	    			// 正面決定
	    			if(g_TutorialSelectFlg == gTUTORIAL_SELECTFLG.NONE ||
	    			   g_TutorialSelectFlg == gTUTORIAL_SELECTFLG.SHEET_TOUCH_NEXT)
	    			{
    					var aSheet = sheet[this.selectIx];
						PosX = aSheet.iDrawX;
						PosY = aSheet.iDrawY;
						PosW = aSheet.iDrawW;
						PosH = aSheet.iDrawH;
		    			/*
						ctx.globalAlpha = 0.5;
						ctx.fillStyle = 'rgb(0, 255, 0)';
				        ctx.fillRect(PosX, PosY, PosW, PosH);
						ctx.globalAlpha = 1.0;	
				    	*/		    			
						if(
							(PosX < sTouchMoveX)  && (PosX + PosW > sTouchMoveX)  &&
							(PosY < sTouchMoveY)  && (PosY + PosH > sTouchMoveY)  &&
							(PosX < sTouchStartX) && (PosX + PosW > sTouchStartX) &&
							(PosY < sTouchStartY) && (PosY + PosH > sTouchStartY))
						{	
							g_eStatus 	= G_STATUS.FADEOUT;
							next		= 0;
						}	
	    			}
	    		}
	    	}
			// 遅延
			if(g_TutorialNextSelectFlg != gTUTORIAL_SELECTFLG.NON)
			{
				if(g_TutorialSelectFlg != g_TutorialNextSelectFlg)
				{
					g_TutorialSelectFlg = g_TutorialNextSelectFlg;
				}
				g_TutorialNextSelectFlg = gTUTORIAL_SELECTFLG.NON;
			}
			// ずっと主張
			if(sTuLookFlg && g_TutorialFlg)
			{
				// 489,11
				var BackYesX = 489;
				var BackYesY = 11;
				var BackYesW = 137;
				var BackYesH = 42;				
				// ------------------------------------- 
				// メッセージファイル
				// ------------------------------------- 
				ctx.drawImage(sModoruMessage, BackYesX, BackYesY);	
				// 決定
				if((!isTouch) && bOldTouch && g_eStatus == G_STATUS.MAIN)
				{		
					if(
						(BackYesX < sTouchMoveX)  && (BackYesX + BackYesW > sTouchMoveX)  &&
						(BackYesY < sTouchMoveY)  && (BackYesY + BackYesH > sTouchMoveY)  &&
						(BackYesX < sTouchStartX) && (BackYesX + BackYesW > sTouchStartX) &&
						(BackYesY < sTouchStartY) && (BackYesY + BackYesH > sTouchStartY))
					{	
						g_eStatus = G_STATUS.FADEOUT;
						next = 1;
					
						// チュートリアル終了
						EndTutorial();
					}	
				}
			}	
	    };
  
	    //マウスイベント
	    this.onTouchStart = function(e)
		{
			if(!iForceTouch)
			{
		        var pos = getTouchPos(e);
		        sTouchStartX = pos.x;
		        sTouchStartY = pos.y;
		        sTouchMoveX  = pos.x;
		        sTouchMoveY  = pos.y;
		        startX  = pos.x - ofsX * ofsRate;
		        isTouch = true;
			}
	        e.preventDefault(); //デフォルトイベント処理をしない
	    };
	    this.onTouchMove = function(e) 
		{
			if(!iForceTouch)
			{
		        if (isTouch) 
		    	{
		            var pos	= getTouchPos(e);
					sTouchMoveX = pos.x;
					sTouchMoveY = pos.y;
		            ofsX 	= (pos.x - startX) * ofsRate;
		        }
			}
	        e.preventDefault(); //デフォルトイベント処理をしない
	    };
	    this.onTouchEnd = function(e)
		{
			if(!iForceTouch)
			{
				isTouch = false;
			}
	        e.preventDefault(); //デフォルトイベント処理をしない
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

	};	
	
	g_eStatus = G_STATUS.INIT;
	var next;
	var alpha = 0;
	
	// セーブされた描画データ
	AllLoadStampDrawData();
	
    // スタンプのロード
    LoadStampGraphic();
	
	// 強制
	//DEBUG_TUTORIAL();
	//AllLoadStampDrawData();
	
	// チュートリアルならプラスα
	if(g_TutorialFlg)
	{
		sSheetSelectMessage = new Image();
	    sSheetSelectMessage.src = "img/10_asobikata/a_txt_a009.png";
		g_sTutorialLoadFlg.AddLoadFile(sSheetSelectMessage);
		sModoruMessage = new Image();
	    sModoruMessage.src = "img/10_asobikata/a_btn_a000.png";
		g_sTutorialLoadFlg.AddLoadFile(sModoruMessage);
	}	
	g_sTutorialLoadFlg.Loading();
	
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

	// セレクト
	var select = LoadActiveSheetIndex();
	if(g_StampDrawData.length <= select){ select = g_StampDrawData.length - 1; }
	mainCanvas = null;
	GSetupEffect();
	
	// 周りのみ読み込み
	LoadPrevNextSheetGraphic(select);
	
	// 全くなければ終了
	if(g_HaveStampSheetData.length <= 0)
	{
		g_eStatus = G_STATUS.END;
		next = 1;
	}
	
	//
	// フレーム処理
	//
	this.onframe = function() 
	{
/*
		//DOMエレメントの削除
		rootSceen.removeChild(sceen);
		// 解放
		g_sTutorialLoadFlg.Delete();				
		// 選択されているシートをアクティブにする
		SaveActiveSheetIndex(0);
		// メインへ移動
		nextSceen = new StampMain();
		return;
*/		
		switch(g_eStatus) 
		{
			//初期化
			case G_STATUS.INIT:
				// スタンプとシートのロードが終わってる
				if(g_sStampLoadFlg.bLoadFlg && g_sSheetLoadFlg.bLoadFlg && g_sTutorialLoadFlg.bLoadFlg)
				{			
					// シートのロード
   					LoadSheetGraphic();
					if(mainCanvas == null)
					{
						mainCanvas = new MainCanvas(select);
					}
					M_PRINTB("");
					//各データが読み込まれるまで待つ
					if (LoadingCounter <= 0) 
					{
						g_eStatus = G_STATUS.FADEIN;
						mainCanvas.draw();
					}
				}
				// テストです、ロード中
				else
				{
					var strDumpdatax = g_sTutorialLoadFlg.GetDump();
					var strDumpdata1 = g_sSheetLoadFlg.GetDump();
					var strDumpdata2 = g_sStampLoadFlg.GetDump();
					M_PRINTB("ロード中です！<br>"				+
							"[Tutor]" + strDumpdatax + "<br>" 	+ 
							"[Sheet]" + strDumpdata1 + "<br>" 	+ 
					        "[Stamp]" + strDumpdata2);	
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
			
				// ----------------------------------------------
				// キャンバスの描画
				// ----------------------------------------------
				mainCanvas.draw();
				
				// ----------------------------------------------
				// タイトルへ戻る
				// ----------------------------------------------
				if((!isTouch) && bOldTouch)
				{
					if(g_TutorialSelectFlg == gTUTORIAL_SELECTFLG.NONE)
					{
						var BackYesX = 0;
						var BackYesY = 0;
						var BackYesW = 260;
						var BackYesH = 101;		
						if(
							(BackYesX < sTouchMoveX)  && (BackYesX + BackYesW > sTouchMoveX)  &&
							(BackYesY < sTouchMoveY)  && (BackYesY + BackYesH > sTouchMoveY)  &&
							(BackYesX < sTouchStartX) && (BackYesX + BackYesW > sTouchStartX) &&
							(BackYesY < sTouchStartY) && (BackYesY + BackYesH > sTouchStartY))
						{	
							g_eStatus = G_STATUS.FADEOUT;
							next = 1;
						}	
					}
	    			// これにする[145, BROWSER_HEIGHT - 50]
	    			if(g_TutorialSelectFlg == gTUTORIAL_SELECTFLG.NONE ||
	    			   g_TutorialSelectFlg == gTUTORIAL_SELECTFLG.SHEET_TOUCH_NEXT)
	    			{
						BackYesX = 145;
						BackYesY = BROWSER_HEIGHT - 50;
						BackYesW = 350;
						BackYesH = 150;				    			    			
						if(
							(BackYesX < sTouchMoveX)  && (BackYesX + BackYesW > sTouchMoveX)  &&
							(BackYesY < sTouchMoveY)  && (BackYesY + BackYesH > sTouchMoveY)  &&
							(BackYesX < sTouchStartX) && (BackYesX + BackYesW > sTouchStartX) &&
							(BackYesY < sTouchStartY) && (BackYesY + BackYesH > sTouchStartY))
						{	
							g_eStatus 	= G_STATUS.FADEOUT;
							next		= 0;
						}	
	    			}
				}	

				bOldTouch = isTouch;
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
				// メインへ
				if(next == 0)
				{
					// 選択されているシートをアクティブにする
					SaveActiveSheetIndex(mainCanvas.getSelectSheet().sheetNo);
					// メインへ移動
					nextSceen = new StampMain();
				}
				// タイトルへ
				else if(next == 1)
				{
					//次のシーンをセット
					nextSceen = new SceenTitle();
				}
				// シートを削除して再ロード
				else
				{
					//次のシーンをセット
					DelSaveSheetData(mainCanvas.getSelectSheet().sheetNo);
					nextSceen = new StampSelect();		
				}
				break;
		}
	};
};




