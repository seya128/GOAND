

// 定義
var STAMP_W = 160;
var STAMP_H = 160;

// -------------------------------------
// スタンプの最大数を取得しデバッグ表示
// -------------------------------------
var MAX_STAMP_IMAGE = stampImgName.length;
//alert(MAX_STAMP_IMAGE);

// -------------------------------------
// ※勉強を兼ねて無駄にコメントを書きます
// 　文法もC++風で書いてあるので、そのうちJava風に書き直します。
// 　高速性はまったく考慮してません・・・。
// -------------------------------------
// -------------------------------------
// データのロード
// -------------------------------------
function StampLoadData(no)
{
    this.stampImageNo 			= no;       	// スタンプの画像番号[一応持っておく]
	this.stampDrawData  		= new StampDrawData();
	this.stampLoadGetDataArray	= new Array();
}
// -------------------------------------
// データのローダー
// -------------------------------------
StampLoadData.prototype.load = function()
{
	this.stampDrawData.load(iLoadDataIndex);
	if (this.stampDrawData != null)
	{
		for(var i = 0;; i ++)
		{
			this.stampLoadGetDataArray[i] = this.stampDrawData.get(i);
			if (this.stampLoadGetDataArray[i] == null) { break; }
			// デバッグ表示
			{
				//var r = {x:0, y:0, id:0, alpha:0};
				//alert("ようこそ！");
				//console.log(stampTestData["x"] + " " + stampTestData["y"] + " " + stampTestData["id"] + " " + stampTestData["alpha"]);
/*
				alert(  this.stampLoadGetDataArray[i]["x"] + " " + 
						this.stampLoadGetDataArray[i]["y"] + " " + 
						this.stampLoadGetDataArray[i]["id"] + " " + 
						this.stampLoadGetDataArray[i]["alpha"]);
*/

			}
		}
	}
};

// -------------------------------------
// スタンプのロード
// -------------------------------------
function StampGraphic()
{
    this.stampImageNo = -1;       	// スタンプの画像番号[一応持っておく]
    this.isLoaded = false;			// ロードフラグ
    this.img = new Image();			// イメージクラス
}
// -------------------------------------
// スタンプのローダー
// -------------------------------------
StampGraphic.prototype.loadImage = function(no)
{
	// 自分のポインタ
    var _this = this;
    
    // ロード
    this.isLoaded = false;																	// フラグの初期化				
    this.img.onload = function(){ _this.isLoaded = true; /*alert("seikou" + no);*/ }		// ロードが終わっていたらフラグを立てる
    this.img.src = stampImgName[no];														// イメージの名前を代入[StampData.js]
    this.stampImageNo = no;																	// イメージ番号
};

// -------------------------------------
// すべてのスタンプデータをロード
// -------------------------------------   
var StampLoadDataArray = new Array();
for(var iLoadDataIndex = 0; iLoadDataIndex < 10; iLoadDataIndex ++)
{
	StampLoadDataArray[iLoadDataIndex] = new StampLoadData();
	StampLoadDataArray[iLoadDataIndex].load(iLoadDataIndex);
}
// -------------------------------------
// すべてのスタンプ画像をロード
// -------------------------------------   
var stamp = new Array();
for(var i = 0; i < MAX_STAMP_IMAGE; i ++)
{
	stamp[i] = new StampGraphic(); 
    stamp[i].loadImage(i);
}

//
// スタンプシート
//
function StampSheet(canvas_ctx, no){
    var _this = this;
    this.ctx = canvas_ctx;
    this.img = new Image();
    this.isLoaded = false;
    this.sheetNo = no;
    this.sheetSrc = "";
    
    this.setImage(no);
}
//描画
StampSheet.prototype.draw = function(ofs) {
    if (this.isLoaded) {

        var rate = Math.abs(ofs)/320 * 0.25 ;
        var w = this.img.naturalWidth  * (0.65 - rate);
        var h = this.img.naturalHeight * (0.65 - rate);
        var x = (640 - w) / 2 + ofs - rate*ofs ;
        var y = (800 - h) / 2 + 20;
        this.ctx.drawImage(this.img, x,y, w,h);

		// -------------------------------------
		// シートに張り付けて描画
		// -------------------------------------  
		var iSheetNo = this.sheetNo;
		if(StampLoadDataArray[iSheetNo] != null && iSheetNo >= 0)
		{
			for(var i = 0;; i ++)
			{
				// -------------------------------------
				// 座標取得
				// ------------------------------------- 
				if (StampLoadDataArray[iSheetNo].stampLoadGetDataArray[i] == null) { break; }
				var xx  = StampLoadDataArray[iSheetNo].stampLoadGetDataArray[i] ["x"];
				var yy  = StampLoadDataArray[iSheetNo].stampLoadGetDataArray[i] ["y"];
				var id  = StampLoadDataArray[iSheetNo].stampLoadGetDataArray[i] ["id"];
				var a   = StampLoadDataArray[iSheetNo].stampLoadGetDataArray[i] ["alpha"];
				// -------------------------------------
				// 座標変換
				// ------------------------------------- 
				var r   = (0.65 - rate);
				var ww  = (STAMP_W * r);
				var hh  = (STAMP_H * r);
				var ox  = x   + (xx * r);
				var oy  = 400 + (yy * r) - (h / 2);
				xx = (ox) -  (ww / 2);
      		  	yy = ((oy) - (hh / 2) + 20);

				// -------------------------------------
				// 描画
				// ------------------------------------- 
				if(stamp[id] == null) { continue; }
				if(stamp[id].isLoaded)
				{
					if(stamp[id].img == null) { continue; }
					this.ctx.globalAlpha = a;
					this.ctx.drawImage(stamp[id].img, xx, yy, ww, hh);
					this.ctx.globalAlpha = 1.0;
				}
			}
		}
    }
};
//イメージセット
StampSheet.prototype.setImage = function(no) {
    var _this = this;
    if (no < 0) no+=bgImgName.length;
    this.sheetNo = no % bgImgName.length;
    this.isLoaded = false;
    this.img.onload = function() {
        _this.isLoaded = true;
    };
    this.sheetSrc = bgImgName[this.sheetNo];
    this.img.src = this.sheetSrc;
};
    




//
// メインキャンバス
//
var MainCanvas = function(no){
    var _this = this;
    this.selectIx = 0;
    var startX=0;
    var ofsX=0;
    var addX=0, ofsXold=0;
    var ofsRate=1.2;
    var isTouch = false;
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
 /*   var canvas2 = document.getElementById("canvasS2");
    var ctx2 = canvas2.getContext("2d");
    var canvas3 = document.getElementById("canvasS3");
    var ctx3 = canvas3.getContext("2d");
    var canvas4 = document.getElementById("canvasS4");
    var ctx4 = canvas4.getContext("2d");
    var canvas5 = document.getElementById("canvasS5");
    var ctx5 = canvas5.getContext("2d");
*/
    //スタンプシート準備
    var sheet = new Array();
    sheet[0] = new StampSheet(ctx,no);
    sheet[1] = new StampSheet(ctx,no+1);
    sheet[2] = new StampSheet(ctx,no+2);
    sheet[4] = new StampSheet(ctx,no+bgImgName.length-1);
    sheet[3] = new StampSheet(ctx,no+bgImgName.length-2);
    
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
    this.clear = function(){
        ctx.beginPath();
        //グラデーション領域をセット
        var grad  = ctx.createLinearGradient(0,0, 0,1200);
        //グラデーション終点のオフセットと色をセット
        grad.addColorStop(0,'rgb(10, 10, 50)');
        grad.addColorStop(0.7,'rgb(150, 150, 240)');
        //グラデーションをfillStyleプロパティにセット
        ctx.fillStyle = grad;
        /* 矩形を描画 */
        ctx.rect(0,0, 640,1200);
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
       

//        this.dubugDisp();
    };
    
    //マウスイベント
    this.onTouchStart = function(e){
        var pos = getTouchPos(e);
        startX = pos.x - ofsX * ofsRate;
        isTouch = true;
        
        e.preventDefault(); //デフォルトイベント処理をしない
    };
    this.onTouchMove = function(e) {
        if (isTouch) {
            var pos = getTouchPos(e);
            ofsX = (pos.x - startX) * ofsRate;
        }

        e.preventDefault(); //デフォルトイベント処理をしない
    };
    this.onTouchEnd = function(e){
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
    //初期描画
    this.draw();

};


var timerID;
var mainCanvas;
window.onload = function() {
    var select = load();
    mainCanvas = new MainCanvas(select);    
    clearInterval(timerID);
    timerID = setInterval('draw()', 50);
};

//描画
function draw() {
    mainCanvas.draw();
}

//ロード
function load() {
    var select = localStorage.getItem("SelectedStampSheet");
    if (!select)    select = 0;
    
    return select*1;
} 
//セーブ
function save() {
    localStorage.setItem("SelectedStampSheet",mainCanvas.getSelectSheet().sheetNo);
}
