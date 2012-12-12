// スタンプデータ
//  株式会社ドラス


//背景画像
var bgImgName = [
    "img/stamp/s_s01_sta_a/s_s01_bgd_a000.png",
    "img/stamp/s_s01_sta_a/s_s01_bgd_b000.png",
    "img/stamp/s_s01_sta_a/s_s01_bgd_c000.png",
    "img/stamp/s_s02_sta_a/s_s02_bgd_a000.png",
    "img/stamp/s_s02_sta_a/s_s02_bgd_b000.png",
    "img/stamp/s_s02_sta_a/s_s02_bgd_c000.png",
    "img/stamp/s_s03_sta_a/s_s03_bgd_a000.png",
    "img/stamp/s_s03_sta_a/s_s03_bgd_b000.png",
    "img/stamp/s_s03_sta_a/s_s03_bgd_c000.png"
    
];

//スタンプ画像
var stampImgName = [
    "img/stamp/s_s01_sta_a/s_s01_sta_a000.png",
    "img/stamp/s_s01_sta_a/s_s01_sta_b000.png",
    "img/stamp/s_s01_sta_a/s_s01_sta_c000.png",
    "img/stamp/s_s01_sta_a/s_s01_sta_d000.png",
    "img/stamp/s_s01_sta_a/s_s01_sta_e000.png",
    "img/stamp/s_s01_sta_a/s_s01_sta_f000.png",
    "img/stamp/s_s01_sta_a/s_s01_sta_g000.png",
    "img/stamp/s_s01_sta_a/s_s01_sta_h000.png",
    "img/stamp/s_s01_sta_a/s_s01_sta_i000.png",
    "img/stamp/s_s02_sta_a/s_s02_sta_a000.png",
    "img/stamp/s_s02_sta_a/s_s02_sta_b000.png",
    "img/stamp/s_s02_sta_a/s_s02_sta_c000.png",
    "img/stamp/s_s02_sta_a/s_s02_sta_d000.png",
    "img/stamp/s_s02_sta_a/s_s02_sta_e000.png",
    "img/stamp/s_s02_sta_a/s_s02_sta_f000.png",
    "img/stamp/s_s02_sta_a/s_s02_sta_g000.png",
    "img/stamp/s_s02_sta_a/s_s02_sta_h000.png",
    "img/stamp/s_s02_sta_a/s_s02_sta_i000.png",
    "img/stamp/s_s03_sta_a/s_s03_sta_a000.png",
    "img/stamp/s_s03_sta_a/s_s03_sta_b000.png",
    "img/stamp/s_s03_sta_a/s_s03_sta_c000.png",
    "img/stamp/s_s03_sta_a/s_s03_sta_d000.png",
    "img/stamp/s_s03_sta_a/s_s03_sta_e000.png",
    "img/stamp/s_s03_sta_a/s_s03_sta_f000.png",
    "img/stamp/s_s03_sta_a/s_s03_sta_g000.png",
    "img/stamp/s_s03_sta_a/s_s03_sta_h000.png",
    "img/stamp/s_s03_sta_a/s_s03_sta_i000.png",

];



//スタンプの最大回数
var STAMP_LIFE_MAX = 30;

// ------------------------------------------------------
// 持ってるスタンプ[セーブ対象]
// スタンプの追加は「StampMain.jsのload()」へ移動
// ------------------------------------------------------
var hasStampData = [
    {"id":0, "ink":30},		// ダミー
];
// ------------------------------------------------------
// シートデータ[セーブ対象]
// ------------------------------------------------------
var hasSheetData = [
    {"id":0 },			// ダミー
    {"id":0 },			// ダミー
    {"id":5 },			// ダミー
    {"id":6 },			// ダミー
    {"id":0 },			// ダミー
    {"id":3 },			// ダミー
    {"id":0 },			// ダミー
    {"id":0 },			// ダミー
    {"id":0 },			// ダミー
];

// ------------------------------------------------------
// スタンプ操作
// ------------------------------------------------------
// スタンプデータの追加
function AddHasStamp(id, ink)
{
	var sData = {"id":id, "ink":ink };
	hasStampData.push(sData);
}
// スタンプデータの削除
function DelHasStamp(index)
{ 
	hasStampData.splice(index, 1);
}
// スタンプデータの全て削除
function AllDelHasStamp()
{ 
	hasStampData.splice(0);
}
// スタンプデータのダミーセット
function DummyStampDataSet()
{
	// 複数追加
	AllDelHasStamp();
	for(var i = 0; i <= 26; i ++)
	{
		AddHasStamp(i, 30);
	}
}
// ------------------------------------------------------
// シート操作
// ------------------------------------------------------
// スタンプデータの追加
function AddHasSheet(id)
{
	var sData = {"id":id };
	hasSheetData.push(sData);
}
// スタンプデータの削除
function DelHasSheet(index)
{ 
	hasStampData.splice(index, 1);
}
// スタンプデータの全て削除
function AllDelHasSheet()
{ 
	hasSheetData.splice(0);
}
// スタンプデータのダミーセット
function DummySheetDataSet()
{
	// 複数追加
	AllDelHasSheet();
	for(var i = 0; i <= 26; i ++)
	{
		AddHasSheet(i, 30);
	}
}


function loadHasStamp() {
	var data = localStorage.getItem("HasStampData");
	if (!data) { return false; }
	
	hasStampData = JSON.parse(data);
	return true;
}

function saveHasStamp() {
	localStorage.setItem("HasStampData", JSON.stringify(hasStampData));
	console.log("save hasStampData");
}

function deleteHasStamp() {
	localStorage.removeItem("HasStampData");
	DummyStampDataSet();
}


