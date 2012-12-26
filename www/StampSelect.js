
// -------------------------------------
// リダクションサイズを設定する「処理を軽くするためサムネイル」
// -------------------------------------
// 1   640 1200
// 2   320 600
// 2.5 256 480
// 3   213 400
// 4   160 300
var REDUCTION_SIZE = 2.5;
var SCREEN_WIDTH   = 640;
var SCREEN_HEIGHT  = 1200;
var CANVAS_WIDTH   = SCREEN_WIDTH  / REDUCTION_SIZE;
var CANVAS_HEIGHT  = SCREEN_HEIGHT / REDUCTION_SIZE;

// -------------------------------------
// スタンプの最大数を取得しデバッグ表示
// -------------------------------------
var timerID;
var g_YOffset = 90;

// クリア
function DeleteSheetClick(e)
{
	g_iSwitch = 1;
	g_WindowsScaleRate = 0;
}
	
	
var StampSelect = function() 
{
	var BackImage 		= new Image();	// イメージクラス
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

	//
	// スタンプシート
	//
	function StampSheet(canvas_ctx, no)
	{
	    var _this = this;
	    this.ctx = canvas_ctx;
	    this.img = new Image();
	    this.isLoaded = false;
	    this.sheetNo = no;
	    this.sheetSrc = "";

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
		if (this.isLoaded) 
		{
	        var rate = Math.abs(ofs)/320 * 0.25 ;
	        var w = this.img.naturalWidth  * (0.65 - rate);
	        var h = this.img.naturalHeight * (0.65 - rate);
	        var x = (640 - w) / 2 + ofs - rate*ofs ;
	        var y = (800 - h) / 2 + g_YOffset;
			// そのまま描画
			this.CanvasSheet_2d.drawImage(this.img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			
//			this.CanvasSheet_2d.drawImage(this.img, 0, 0, 640, window.innerHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//document.body.clientWidth;
//document.body.clientHeight; 
//document.documentElement.clientHeight
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
					if(GetStampGraphicHandle_Stamp(id) == null) { continue; }
					if(GetStampGraphicHandle_Stamp(id).m_bLoaded)
					{
						if(GetStampGraphicHandle_StampImage(id) == null) { continue; }
						this.CanvasSheet_2d.globalAlpha = a;
						this.CanvasSheet_2d.drawImage(GetStampGraphicHandle_StampImage(id), 
							(xx/REDUCTION_SIZE)-STAMP_W/2/REDUCTION_SIZE, 
							(yy/REDUCTION_SIZE)-STAMP_H/2/REDUCTION_SIZE, 
							STAMP_W / REDUCTION_SIZE, 
							STAMP_H / REDUCTION_SIZE);
						this.CanvasSheet_2d.globalAlpha = 1.0;
					}
				}
			}
			// 最終描画
	        this.ctx.drawImage(this.CanvasSheet, x, y, w, h);
	    }
	};

	//イメージセット
	StampSheet.prototype.setImage = function(no) {
	    var _this = this;
	    if (no < 0)    no += g_HaveStampSheetData.length;
	    this.sheetNo = no %  g_HaveStampSheetData.length;
	    this.isLoaded = true;
/*
	    this.img.onload = function() {
	        _this.isLoaded = true;
	    };
*/
//	    this.sheetSrc = bgImgName[g_HaveStampSheetData[this.sheetNo]["id"]];
		this.img = GetStampGraphicHandle_SheetImage(g_HaveStampSheetData[this.sheetNo]["id"]);
	};
	   	
	
	var mainCanvas;
	//
	// メインキャンバス
	//
	var MainCanvas = function(no)
	{
	    var _this = this;
	    this.selectIx = no;
	    var startX=0;
	    var ofsX=0;
	    var addX=0, ofsXold=0;
	    var ofsRate=1.2;
		var iOldSelecterID = no;

		// デフォルトキャンバス
	    var canvas = document.getElementById("canvas");
		var ctx    = canvas.getContext("2d");
	    //スタンプシート準備
		if(g_HaveStampSheetData.length != 0)
		{
		    var sheet = new Array();
		    sheet[0] = new StampSheet(ctx, no);
		    sheet[1] = new StampSheet(ctx, no + 1);
		    sheet[2] = new StampSheet(ctx, no + 2);
		    sheet[4] = new StampSheet(ctx, no + g_HaveStampSheetData.length - 1);
		    sheet[3] = new StampSheet(ctx, no + g_HaveStampSheetData.length - 2);
		}
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
	    
	    //描画
	    this.draw = function() 
		{
	        var ofsMax = 376;

	        //タッチされていない場合の位置調整
			if(g_iSwitch == 0 && g_eStatus == G_STATUS.MAIN && g_HaveStampSheetData.length != 0)
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
				
				// 代入
				if(iOldSelecterID > this.selectIx)
				{
					PuchArrowL();
				}
				else if(iOldSelecterID < this.selectIx)
				{
					PuchArrowR();
				}
				iOldSelecterID = this.selectIx;
				
		        if (ofsX < -ofsMax / 2){
		            startX -= ofsMax / ofsRate;
		            ofsX += ofsMax;
		            this.selectIx += 1;
		            this.selectIx %= 5;
		            sheet[(this.selectIx + 2) % 5].setImage( sheet[this.selectIx].sheetNo + 2);
		        }
		        if (ofsX > ofsMax / 2){
		            startX += ofsMax/ofsRate;
		            ofsX -= ofsMax;
		            this.selectIx += 5 - 1;
		            this.selectIx %= 5;
		            sheet[(this.selectIx + 3) % 5].setImage( sheet[this.selectIx].sheetNo - 2);
		        }
		        ofsXold = ofsX;
			}
			// クリアと背景の表示
			this.clear();		
			if(g_HaveStampSheetData.length != 0)
			{
		        sheet[(this.selectIx + 4) % 5].draw(ofsX - ofsMax);
		        sheet[(this.selectIx + 1) % 5].draw(ofsX + ofsMax);
		        sheet[this.selectIx].draw(ofsX);
		    	
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
			}
			// 合成して描画
	      	ctx.drawImage(BackImage, 			
		      	0, 
				0, 
				190, 
				101);
			// 矢印を描画
			ProcArrow();
			DrawArrowL(ctx, 60,  450, 40);
			DrawArrowR(ctx, 580, 450, 40);
		
			
			if(g_eStatus != G_STATUS.MAIN) { g_WindowsScaleRate = 0; return; }
			

			// ------------------------------------------------
			// シートが０の時の描画
			// ------------------------------------------------
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
			else if(g_iSwitch == 1)
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
	    	else if((!isTouch) && bOldTouch && iForceTouch == false)
	    	{
				var PosX = 0;
				var PosY = 215 + g_YOffset - 20;
				var PosW = 112;
				var PosH = 410;
	    		
	    		// 移動地がでかい
	    		var vMove1 = Math.abs(sTouchStartX - sTouchMoveX);
	    		var vMove2 = Math.abs(sTouchStartY - sTouchMoveY);
	    		if(vMove1 + vMove2 < 10)
	    		{
	    		
	    		
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
						PuchArrowL();
					}		    	
					PosX = 527;
					PosY = 215 + g_YOffset - 20;
					PosW = 118;
					PosH = 410;
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
						PuchArrowR();
					}	
			    	
					PosX = 112;
					PosY = 50 + g_YOffset - 20;
					PosW = 416;
					PosH = 740;
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
	    // 初期描画
	    this.draw();
	};	
	g_eStatus = G_STATUS.INIT;
	var next;
	var alpha = 0;

	// セーブされた描画データ
	AllLoadStampDrawData();
    // 画像ロード[初回一回のみ]
    AllLoadStampGraphic();

	// 戻る
    BackImage.onload = function() {}		// ロードが終わっていたらフラグを立てる
    BackImage.src = "img/07_shop/003.png";							// イメージの名前を代入[StampData.js]
	
	var rootSceen = document.getElementById("sceen");
	var sceen = document.createElement("div");
	rootSceen.appendChild(sceen);
	sceen.style.opacity = alpha;
	
	var im =document.createElement('canvas');
	im.setAttribute('id', 'canvas');
 	im.width = 640;   
	im.height = 1200;  
	sceen.appendChild(im);	
/*	
	if(g_HaveStampSheetData.length != 0)
	{
		var iMenuDel = document.createElement('button');
		iMenuDel.setAttribute('id', 'menu_del');
		iMenuDel.style.position = "absolute";  
		iMenuDel.innerHTML = '削除'
	 	iMenuDel.style.top = "50px";
	 	iMenuDel.style.left = "450px";
	 	iMenuDel.style.width = "60px";   
		iMenuDel.style.height = "60px";  
		var fd = new Function("DeleteSheetClick();");
	 	iMenuDel.onclick = fd; 
		sceen.appendChild(iMenuDel);
	}	*/
	var select = LoadActiveSheetIndex();
	if(g_StampDrawData.length <= select){ select = g_StampDrawData.length - 1; }
	mainCanvas = new MainCanvas(select);
	

	//
	// フレーム処理
	//
	this.onframe = function() {

		switch(g_eStatus) 
		{
			//初期化
			case G_STATUS.INIT:
				// スタンプとシートのロードが終わってる
				if(g_sSheetLoadFlg.bLoadFlg && g_sStampLoadFlg.bLoadFlg)
				{			
					//各データが読み込まれるまで待つ
					if (LoadingCounter <= 0) 
					{
						g_eStatus = G_STATUS.FADEIN;
						//if(g_HaveStampSheetData.length != 0)
						{
							mainCanvas.draw();
						}
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
				//if(g_HaveStampSheetData.length == 0)
				//{
				//	g_eStatus = G_STATUS.FADEOUT;
				//	next = 1;
				//}
				//else
				{
					// ----------------------------------------------
					// タイトルへ戻る
					// ----------------------------------------------
					if((!isTouch) && bOldTouch)
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
							g_eStatus = G_STATUS.FADEOUT;
							next = 1;
						}	
					}	
	    			mainCanvas.draw();
					DispMemory();
					bOldTouch = isTouch;
				}
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
				
				if(next == 0)
				{
					//次のシーンをセット
					save();
					nextSceen = new StampMain();
				}
				else if(next == 1)
				{
					//次のシーンをセット
					nextSceen = new SceenTitle();
				}
				else
				{
					//次のシーンをセット
					DelSaveSheetData(mainCanvas.getSelectSheet().sheetNo);
					nextSceen = new StampSelect();		
				}
				break;
		}
	};
	//セーブ
	function save() 
	{
		SaveActiveSheetIndex(mainCanvas.getSelectSheet().sheetNo);
	}	
};




