//
// スタンプの押したデータ管理
//
// 株式会社ドラス



// 保存キーのベース
var STAMPDRAWDATA_KEY_BASE = "StampDrawData";



//
// スタンプ描画データクラス
//
function StampDrawData() {
	this.drawData = new Array();
	
}


// 保存キー生成
StampDrawData.prototype.getSaveKey = function(hasSheetNo)
{
	return STAMPDRAWDATA_KEY_BASE + hasSheetNo;
	
};


// ロード
StampDrawData.prototype.load = function(hasSheetNo) {
	this.drawData = new Array();
	var key = this.getSaveKey(hasSheetNo);
	var data = localStorage.getItem(key);
	if (!data) {
		console.log("ロード失敗!!: " + key);
		return;
	}
	
	this.drawData = JSON.parse(data);
	console.log("ロード: " + key);
};


// セーブ
StampDrawData.prototype.save = function(hasSheetNo) {
	var key = this.getSaveKey(hasSheetNo);
	localStorage.setItem(key, JSON.stringify(this.drawData));
	console.log("セーブ: " + key);
};

/*
StampDrawData.prototype.DeleteSheetData = function(hasSheetNo) {
	var key = this.getSaveKey(hasSheetNo);
	localStorage.removeItem(key);
}
StampDrawData.prototype.AllDeleteSheetData = function() {
	for(int i = 0;; i ++)
	{
		var key  = this.getSaveKey(i);
		var data = localStorage.getItem(key);
		if (!data) 
		{
			return;
		}
		localStorage.removeItem(key);
	}
}*/

// すべてのスタンプデータを削除
function AllDeleteStampDrawData()
{
	for(var i = 0; i < 100; i ++)
	{
		var key  = STAMPDRAWDATA_KEY_BASE + i;
		var data = window.localStorage.getItem(key);
		if (!data) { continue; }
		window.localStorage.removeItem(key);
	}
}

// データ取得
StampDrawData.prototype.get = function(no) {
	var r = {x:0, y:0, id:0, alpha:0};
	var ix = no * 4;
	if (ix >= this.drawData.length)
		return null;
	
	r.x = this.drawData[ix++];
	r.y = this.drawData[ix++];
	r.id = this.drawData[ix++];
	r.alpha = this.drawData[ix++];
	
	return r;
};


// データ追加
StampDrawData.prototype.set = function(x, y, stampId, alpha) {
	var ix = this.drawData.length;
	
	this.drawData[ix++] = x;
	this.drawData[ix++] = y;
	this.drawData[ix++] = stampId;
	this.drawData[ix++] = alpha;
	
};

// データクリア（セーブデータはクリアしない）
StampDrawData.prototype.clear = function() {
	this.drawData = new Array();
};

// ------------------------------------------------------
// 画像操作
// ------------------------------------------------------
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
StampLoadData.prototype.load = function(no)
{
	this.stampDrawData.load(no);
	if (this.stampDrawData != null)
	{
		for(var i = 0;; i ++)
		{
			this.stampLoadGetDataArray[i] = this.stampDrawData.get(i);
			if (this.stampLoadGetDataArray[i] == null) { break; }
		}
	}
};

var StampLoadDataArray = new Array();
var gStampGraphicHandle = new Array();

function LoadStampGraphicHandle()
{
	// -------------------------------------
	// すべてのスタンプ画像をロード
	// -------------------------------------   
	for(var i = 0; i < MAX_STAMP_IMAGE; i ++)
	{
		gStampGraphicHandle[i] = new StampGraphic(); 
	    gStampGraphicHandle[i].loadImage(i);
	}
}
function ReleaseStampGraphicHandle()
{
	for(var i = 0; i < MAX_STAMP_IMAGE; i ++)
	{
		gStampGraphicHandle[i] = null;
	}
}

// スタンプ描画データ
var stampDrawData;


