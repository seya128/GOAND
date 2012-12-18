
// -------------------------------------
// 定義
// -------------------------------------
/*var STAMP_W = 160;
var STAMP_H = 160;

// -------------------------------------
// リダクションサイズを設定する「処理を軽くするためサムネイル」
// -------------------------------------
var REDUCTION_SIZE = 2.0;
var SCREEN_WIDTH   = 640;
var SCREEN_HEIGHT  = 1200;
var CANVAS_WIDTH   = SCREEN_WIDTH  / REDUCTION_SIZE;
var CANVAS_HEIGHT  = SCREEN_HEIGHT / REDUCTION_SIZE;
*/
// -------------------------------------
// スタンプの最大数を取得しデバッグ表示
// -------------------------------------
var timerID;
var g_YOffset = 90;

// クリア
function DeleteSheetClick(e)
{
//	g_sActiveDrawData.Clear();	//削除
//	g_sActiveDrawData.Save();	//オートセーブ
	//event.preventDefault();
	st = STATUS.FADEOUT;
	next = -1;
}
	
	
var StampSelect = function() 
{
	var BackImage 		= new Image();	// イメージクラス
	var bTouch 			= false;
	var bOldTouch		= false;
	var sTouchStartX 	= -200;
	var sTouchStartY 	= -200;
	var sTouchMoveX 	= -200;
	var sTouchMoveY 	= -200;	
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

			// -------------------------------------
			// シートに張り付けて描画
			// -------------------------------------  
			var iSheetNo = this.sheetNo;
			var iNum     = GetStampDrawNum(iSheetNo);
			if(GetStampDrawData(iSheetNo) != null && iSheetNo >= 0)
			{
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
	    this.selectIx = 0;
	    var startX=0;
	    var ofsX=0;
	    var addX=0, ofsXold=0;
	    var ofsRate=1.2;
	    var isTouch = false;

		// デフォルトキャンバス
	    var canvas = document.getElementById("canvas");
		var ctx    = canvas.getContext("2d");
	    //スタンプシート準備
	    var sheet = new Array();
	    sheet[0] = new StampSheet(ctx, no);
	    sheet[1] = new StampSheet(ctx, no + 1);
	    sheet[2] = new StampSheet(ctx, no + 2);
	    sheet[4] = new StampSheet(ctx, no + g_HaveStampSheetData.length - 1);
	    sheet[3] = new StampSheet(ctx, no + g_HaveStampSheetData.length - 2);

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
	    this.draw = function() {
	        var ofsMax = 376;

	        //タッチされていない場合の位置調整
	        if (!isTouch){
	            if (addX>=-40 && addX<=40){
	                if (ofsX >= -ofsMax/2 && ofsX<0){
	                    addX = 40;
	                }
	                if (ofsX <= ofsMax/2 && ofsX>0){
	                    addX = -40;
	                }
	            }

	            if (addX < -60) addX=-60;
	            if (addX > 60) addX=60;
	            ofsX += addX;
	            if (addX<0){
	                if (ofsX < 0  && addX>=-40){
	                    ofsX = 0;
	                }
	                addX += 4;
	            } else {
	                ofsX += addX;
	                if (ofsX > 0 && addX<=40){
	                    ofsX = 0;
	                }
	                addX -= 4;
	            }
	        } else {
	            addX = ofsX - ofsXold;
	        }

	        if (ofsX < -ofsMax/2){
	            startX -= ofsMax/ofsRate;
	            ofsX += ofsMax;
	            this.selectIx += 1;
	            this.selectIx %= 5;
	            sheet[(this.selectIx + 2)%5].setImage( sheet[this.selectIx].sheetNo + 2);
	        }
	        if (ofsX > ofsMax/2){
	            startX += ofsMax/ofsRate;
	            ofsX -= ofsMax;
	            this.selectIx += 5-1;
	            this.selectIx %= 5;
	            sheet[(this.selectIx + 3)%5].setImage( sheet[this.selectIx].sheetNo - 2);
	        }
	        ofsXold = ofsX;
	        
	        this.clear();
	        sheet[(this.selectIx + 4)%5].draw(ofsX-ofsMax);
	        sheet[(this.selectIx + 1)%5].draw(ofsX+ofsMax);
	        sheet[this.selectIx].draw(ofsX);

			// 合成して描画
	      	ctx.drawImage(BackImage, 			
		      	0, 
				0, 
				190, 
				101);
/*	    	
			var PosX = 0;
			var PosY = 215 + g_YOffset - 20;
			var PosW = 112;
			var PosH = 410;

			ctx.globalAlpha = 0.5;
			ctx.fillStyle = 'rgb(255, 0, 0)';
	        ctx.fillRect(PosX, PosY, PosW, PosH);
			ctx.globalAlpha = 1.0;	
	    	
			PosX = 527;
			PosY = 215 + g_YOffset - 20;
			PosW = 118;
			PosH = 410;

			ctx.globalAlpha = 0.5;
			ctx.fillStyle = 'rgb(255, 0, 0)';
	        ctx.fillRect(PosX, PosY, PosW, PosH);
			ctx.globalAlpha = 1.0;	
	    	
	    	
			PosX = 112;
			PosY = 50 + g_YOffset - 20;
			PosW = 416;
			PosH = 740;

			ctx.globalAlpha = 0.5;
			ctx.fillStyle = 'rgb(0, 255, 0)';
	        ctx.fillRect(PosX, PosY, PosW, PosH);
			ctx.globalAlpha = 1.0;	
	    			    			
			if(
				(PosX < sTouchMoveX)  && (PosX + PosW > sTouchMoveX)  &&
				(PosY < sTouchMoveY)  && (PosY + PosH > sTouchMoveY)  &&
				(PosX < sTouchStartX) && (PosX + PosW > sTouchStartX) &&
				(PosY < sTouchStartY) && (PosY + PosH > sTouchStartY))
			{	
				st = STATUS.FADEOUT;
				next = 1;
			}	
*/	    	
	    };
  
	    //マウスイベント
	    this.onTouchStart = function(e)
		{
	        var pos = getTouchPos(e);
	        sTouchStartX = pos.x;
	        sTouchStartY = pos.y;
	        sTouchMoveX  = pos.x;
	        sTouchMoveY  = pos.y;
	        startX  = pos.x - ofsX * ofsRate;
	        isTouch = true;
	     	bTouch  = true;   
	        e.preventDefault(); //デフォルトイベント処理をしない
	    };
	    this.onTouchMove = function(e) 
		{
	        if (isTouch) 
	    	{
	            var pos	= getTouchPos(e);
				sTouchMoveX = pos.x;
				sTouchMoveY = pos.y;
	            ofsX 	= (pos.x - startX) * ofsRate;
	    		bTouch 	= true;
	        }
	        e.preventDefault(); //デフォルトイベント処理をしない
	    };
	    this.onTouchEnd = function(e)
		{
	        isTouch = false;

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
	st = STATUS.INIT;
	var next;
	var alpha = 0;

	// 描画データ[初回一回のみ]
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
	
	var iMenuDel =document.createElement('button');
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
	
	//Back
//	var nBack = new DivSprite(601,222);
//	nBack.x=290; nBack.y=120; nBack.z=2;
//	nBack.src = "img/08_stamp/s_btn_b000.png";
//	sceen.appendChild(nBack.div);
	//Yes
	var nYesHandle = new DivSprite(289,146);
	nYesHandle.x=170; nYesHandle.y=950; nYesHandle.z=2;
	nYesHandle.src = "img/08_stamp/s_btn_d000.png";
	nYesHandle.onclick = function(){
		event.preventDefault();
		st = STATUS.FADEOUT;
		next = 0;
	};
	sceen.appendChild(nYesHandle.div);
	/*//No
	var nNoHandle = new DivSprite(289,146);
	nNoHandle.x=450; nNoHandle.y=950; nNoHandle.z=2;
	nNoHandle.src = "img/08_stamp/s_btn_e000.png";
	nNoHandle.onclick = function(){
		event.preventDefault();
		st = STATUS.FADEOUT;
		next = 1;
	};	
	sceen.appendChild(nNoHandle.div);	*/
	var select = load();
	mainCanvas = new MainCanvas(select);
	
	

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
						st = STATUS.FADEOUT;
						next = 1;
					}	
				}
				bOldTouch = bTouch;
				bTouch	  = false;
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
	//ロード
	function load() 
	{
		return LoadActiveSheetIndex()*1;
	} 
	//セーブ
	function save() 
	{
		SaveActiveSheetIndex(mainCanvas.getSelectSheet().sheetNo);
	}	
};




