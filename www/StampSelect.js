
// -------------------------------------
// リダクションサイズを設定する「処理を軽くするためサムネイル」
// -------------------------------------
// 1   640 1200
// 2   320 600
// 2.5 256 480
// 3   213 400
// 4   160 300
var REDUCTION_SIZE 		= 3.3;
var SCREEN_WIDTH   		= 640;
var SCREEN_HEIGHT  		= 1138;
var CANVAS_WIDTH   		= SCREEN_WIDTH  / REDUCTION_SIZE;
var CANVAS_HEIGHT 		= SCREEN_HEIGHT / REDUCTION_SIZE;
var STAMP_W_REDUCTION	= STAMP_W / REDUCTION_SIZE;
var STAMP_H_REDUCTION	= STAMP_H / REDUCTION_SIZE;
var STAMP_W_REDUCTION_W	= STAMP_W_REDUCTION / 2;
var STAMP_H_REDUCTION_H	= STAMP_H_REDUCTION / 2;
var BROWSER_ALL_H		= 0;

				
// -------------------------------------
// スタンプの最大数を取得しデバッグ表示
// -------------------------------------
var timerID;
var g_YOffset = 8;/*140 - 100;*/

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
	BROWSER_SCREEN_H 	= Math.floor((BROWSER_HEIGHT * BROWSER_RATE) - (STAMP_H * BROWSER_RATE));	// 画面領域
	BROWSER_ALL_H 		= Math.floor(BROWSER_HEIGHT * BROWSER_RATE);								// 画面領域
	
	// 再セット
	SCREEN_WIDTH   		= 640;
	SCREEN_HEIGHT  		= BROWSER_SCREEN_H;
	CANVAS_WIDTH   		= Math.floor(SCREEN_WIDTH  / REDUCTION_SIZE);
	CANVAS_HEIGHT 		= Math.floor(SCREEN_HEIGHT / REDUCTION_SIZE);
	STAMP_W_REDUCTION	= Math.floor(STAMP_W / REDUCTION_SIZE);
	STAMP_H_REDUCTION	= Math.floor(STAMP_H / REDUCTION_SIZE);
	STAMP_W_REDUCTION_W	= Math.floor(STAMP_W_REDUCTION / 2);
	STAMP_H_REDUCTION_H	= Math.floor(STAMP_H_REDUCTION / 2);
	
	
	var sModoruMessage   = null;
	var sTuLookFlg		 = GetTutorialLookFlg();
	
	// 全くなければダミー
	if(g_HaveStampSheetData.length <= 0)
	{
		DummySheetDataSet();
		DummyStampDataSet();
	}
	
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
	StampSheet.prototype.drawD = function()
	{			
		// -------------------------------------
		// シートの表示
		// -------------------------------------  
		SafeDrawSheetEx(this.CanvasSheet_2d, this.img, 
			0, 0, 640, BROWSER_SCREEN_H,			// 見えてる部分の画像を選択
			0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);		// サムネイルキャンバスに縮小させて張り付ける
		
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
				var sData = GetStampDrawData(iSheetNo);
				var x     = sData.sDataInfo[i * 4];
				var y     = sData.sDataInfo[(i * 4) + 1];
				var id    = sData.sDataInfo[(i * 4) + 2];
				// -------------------------------------
				// 描画
				// -------------------------------------
				var iDrawX = (x/REDUCTION_SIZE)-STAMP_W_REDUCTION_W;
				var iDrawY = (y/REDUCTION_SIZE)-STAMP_H_REDUCTION_H;
				this.CanvasSheet_2d.drawImage(GetStampGraphicHandle_Image(id), 
					Math.floor(iDrawX), 
					Math.floor(iDrawY), 
					STAMP_W_REDUCTION, 
					STAMP_H_REDUCTION);
			}
		}
		// エッジ表示
		this.CanvasSheet_2d.beginPath();             					// パスのリセット
		this.CanvasSheet_2d.lineWidth = 2;           					// 線の太さ
		this.CanvasSheet_2d.strokeStyle="#ffffff";   					// 線の色
		this.CanvasSheet_2d.moveTo(0,               0);					// 開始位置
		this.CanvasSheet_2d.lineTo(CANVAS_WIDTH, 0);					// 次の位置
		this.CanvasSheet_2d.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);		// 次の位置
		this.CanvasSheet_2d.lineTo(0,                CANVAS_HEIGHT);	// 次の位置
		this.CanvasSheet_2d.closePath();								// パスを閉じる
		this.CanvasSheet_2d.stroke();									// 描画		
	};
	//描画
	StampSheet.prototype.draw = function(ofs)
	{
		// 画像全体のサイズ
        var rate = Math.abs(ofs) / 320 * 0.25 ;
		var scl  = (0.65 - rate) * this.fZoomRate;
        var w = Math.floor(640  * scl);
        var h = Math.floor(BROWSER_SCREEN_H * scl);
        var x = Math.floor((640 - w) / 2 + ofs - rate*ofs);
        var y = Math.floor((800 - h) / 2 + g_YOffset);
		
		// -------------------------------------
		// シートの表示
		// -------------------------------------  
		if(g_TutorialFlg == false)
		{
			this.ctx.drawImage(this.CanvasSheet, x, y, w, h);
			this.iDrawX = x;
			this.iDrawY = y;
			this.iDrawW = w;
			this.iDrawH = h;
		}
		else
		{
		    var canvasBack 	= document.getElementById("canvas");
			var ctxBack   	= canvasBack.getContext("2d");
			ctxBack.drawImage(this.CanvasSheet, x, y, w, h);
			this.iDrawX = x;
			this.iDrawY = y;
			this.iDrawW = w;
			this.iDrawH = h;
		}
	};
	//イメージセット
	StampSheet.prototype.setImage = function(no) 
	{
		if (no < 0) { no += g_HaveStampSheetData.length; }
	    this.sheetNo = no %  g_HaveStampSheetData.length;
		this.img     = GetSheetGraphicHandle_Image(g_HaveStampSheetData[this.sheetNo]["id"]);
		this.drawD();
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
		var vOneTimeDrawFlg = false;

		// デフォルトキャンバス
	    var canvas 		= document.getElementById("canvas_Front");
		var ctx    		= canvas.getContext("2d");
	    var canvasBack 	= document.getElementById("canvas");
		var ctxBack   	 = canvasBack.getContext("2d");
		var sheet 		= new Array();
		//ctx.scale(0.5,0.5);
	    //スタンプシート準備
		if(g_HaveStampSheetData.length - 1 <= no) { no = g_HaveStampSheetData.length - 1; }
		
		// 画像を描画する際の品質を指定する．falseでアンチエイリアスを無効とする．
		ctx.imageSmoothingEnabled = false;
		ctxBack.imageSmoothingEnabled = false;

		// ---------------------------------------------------
		// 背景の表示
		// ---------------------------------------------------
	    ctxBack.beginPath();
        var grad = ctxBack.createLinearGradient(0, 0, 0, BROWSER_ALL_H);
        grad.addColorStop(0,   'rgb(10, 10, 50)');
        grad.addColorStop(0.7, 'rgb(150, 150, 240)');
        ctxBack.fillStyle = grad;
        ctxBack.rect(0,0, 640, BROWSER_ALL_H);
        ctxBack.fill();
		// ---------------------------------------------------
		// 戻るボタン
		// ---------------------------------------------------		
      	ctxBack.drawImage(g_BackImageHandle, 			
	      	0, 
			0, 
			190, 
			101);
		// ---------------------------------------------------
		// チュートリアルなら暗くする
		// ---------------------------------------------------		
		if(g_TutorialFlg)
		{
			DrawBack(ctxBack);
			ctxBack.drawImage(sModoruMessage, g_TutorialBackYesX, g_TutorialBackYesY);	
		}
		
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
		
	    //選択されているシート取得
	    this.getSelectSheet = function() 
		{
	        return sheet[this.selectIx];
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
					{
			            startX += ofsMax/ofsRate;
			            ofsX -= ofsMax;						
						this.selectIx += 5 - 1;
						this.selectIx %= 5;
						sheet[(this.selectIx + 3) % 5].setImage(sheet[this.selectIx].sheetNo - 2);
					}							
		        }
			}
			// 動いた
			if(ofsXold != ofsX)
			{
				vOneTimeDrawFlg = true;
				ofsXold = ofsX;
			}
			
			// ID
			var nowid  = this.selectIx;
			var previd = (this.selectIx + 4) % 5;
			var nextid = (this.selectIx + 1) % 5;			
			// 画面のクリア[チュートリアル時はクリアしない]
			if(g_TutorialFlg == false)
			{
		        var rate = Math.abs(0) / 320 * 0.25 ;
				var scl  = (0.65 - rate) * 1.15;
		        var clsh = Math.floor(BROWSER_SCREEN_H * scl);
		        var clsy = Math.floor((800 - clsh) / 2 + g_YOffset);
				ctx.clearRect(0, clsy - 5, 640, clsh + 10);
				
				sheet[previd].fZoomRate -= 0.075;
				sheet[nextid].fZoomRate -= 0.075;
				sheet[nowid].fZoomRate  += 0.075;
				if(sheet[previd].fZoomRate < 0.85) { sheet[previd].fZoomRate = 0.85; }
				if(sheet[nextid].fZoomRate < 0.85) { sheet[nextid].fZoomRate = 0.85; }
				if(sheet[nowid].fZoomRate > 1.15)  { sheet[nowid].fZoomRate = 1.15;  }
				
			}
			// チュートリアル中
			else
			{
				ctx.clearRect(320 - 56, BROWSER_HEIGHT - 150, 130, 130);
				sheet[previd].fZoomRate = 0.85;
				sheet[nextid].fZoomRate = 0.85;
				sheet[nowid].fZoomRate  = 1.15;
			}
			
			// クリアと背景の表示	
			var bL = false;
			var bR = false;
			
			//StartTime();
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
			if(g_TutorialFlg == false || vOneTimeDrawFlg == false)
			{
				sheet[nowid].draw(ofsX);
			}
			//EndTime("描画");
			
			// 一回描画済み
			vOneTimeDrawFlg = true;
	    	
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
				
			//StartTime();
			// 矢印を描画
			MoveArrowL();
			MoveArrowR();			
			ProcArrow();
			if(bL) { DrawArrowL(ctx, 60,  450); }
			if(bR) { DrawArrowR(ctx, 580, 450); }

			// これにするボタン
 			ctx.drawImage(g_ClaerButtonHandle, 145, BROWSER_HEIGHT - 50/*630*/);
			//EndTime("小物");
			
			if(g_eStatus != G_STATUS.MAIN) { g_WindowsScaleRate = 0; return; }
	
			// ２秒待つ 
			if(g_TutorialSelectFlg == gTUTORIAL_SELECTFLG.INIT_WAIT)
			{
				g_TutorialSelectFlg = gTUTORIAL_SELECTFLG.SHEET_TOUCH_MESSAGE;
			}
			// シート買ってみよう(メッセージ)
			// シート買ってみよう(セレクト)「ランチノーマル以外は押せない」
			else if(g_TutorialSelectFlg == gTUTORIAL_SELECTFLG.SHEET_TOUCH_NEXT || g_TutorialSelectFlg == gTUTORIAL_SELECTFLG.SHEET_TOUCH_MESSAGE)
			{	
				//StartTime();
				// メッセージファイル
				ctx.drawImage(sSheetSelectMessage, 103, 385);				
				DrawDocumentArrow(ctx, 320 - 56, BROWSER_HEIGHT - 150);
				// 変更
				g_TutorialSelectFlg = gTUTORIAL_SELECTFLG.SHEET_TOUCH_NEXT;
				//EndTime("メッセ");
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
				// 決定
				if((!isTouch) && bOldTouch && g_eStatus == G_STATUS.MAIN)
				{		
					if(
						(g_TutorialBackYesX < sTouchMoveX)  && (g_TutorialBackYesX + g_TutorialBackYesW > sTouchMoveX)  &&
						(g_TutorialBackYesY < sTouchMoveY)  && (g_TutorialBackYesY + g_TutorialBackYesH > sTouchMoveY)  &&
						(g_TutorialBackYesX < sTouchStartX) && (g_TutorialBackYesX + g_TutorialBackYesW > sTouchStartX) &&
						(g_TutorialBackYesY < sTouchStartY) && (g_TutorialBackYesY + g_TutorialBackYesH > sTouchStartY))
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
	

	
	// スクリーンの作成
	var rootSceen = document.getElementById("sceen");
	var sceen = document.createElement("div");
	rootSceen.appendChild(sceen);
	sceen.style.opacity = alpha;
	
	// キャンバスの作成
	var im =document.createElement('canvas');
	im.setAttribute('id', 'canvas');
 	im.width = 640;   
	im.height = BROWSER_ALL_H;  
	sceen.appendChild(im);	
	// 上にかぶせるキャンバスも追加
	im =document.createElement('canvas');
	im.setAttribute('id', 'canvas_Front');
	im.style.position = 'absolute';
 	im.style.top = "0px"; 
 	im.style.left ="0px"; 	
 	im.width = 640;   
	im.height = BROWSER_ALL_H;  
	sceen.appendChild(im);	
	
	// スタンプシート
	StartTutorial_Stamp();
	
	// セーブされた描画データ
	AllLoadStampDrawData();
	
    // スタンプのロード
    LoadStampGraphic();
	
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
	else
	{
		// シートのロード
		LoadSheetGraphic();
	}

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
				if(g_sStampLoadFlg.bLoadFlg && g_sSheetLoadFlg.bLoadFlg && g_sTutorialLoadFlg.bLoadFlg)
				{			
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
/*
				if(g_sSheetLoadFlg.bLoadFlg == false)
				{	
					var strDumpdata1 = g_sSheetLoadFlg.GetDump();
					M_PRINTR("ロード中です！<br>"				+
							"[Sheet]" + strDumpdata1);
				}
				else { M_PRINTB(""); }
*/		
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
				// コメント解放
				M_PRINTB("");
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




