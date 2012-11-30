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
	var data = localStorage.getItem("HasStampData");
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

