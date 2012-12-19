// ショップで扱うデータベース

// -------------------------------------
// お店データ[3*3]
// -------------------------------------
var MAX_SHOP_DISP_WIDTH  		= 3;
var MAX_SHOP_DISP_HEIGHT 		= 3;
var MAX_SHOP_LIST_WIDTH  		= 3;
var MAX_SHOP_LIST_HEIGHT 		= 34;
var MAX_SHOP_PANEL_WIDTH  		= 215;
var MAX_SHOP_PANEL_HEIGHT 		= 250;
var MAX_SHOP_PANEL_START_X 		= 105;
var MAX_SHOP_PANEL_START_Y 		= 340;
var MAX_SHOP_PANEL_INTERVAL_Y 	= 60;
var gHeightSize = (MAX_SHOP_PANEL_HEIGHT * MAX_SHOP_DISP_HEIGHT);

// -------------------------------------
// スタンプのサイズ
// -------------------------------------
var STAMP_W = 160;
var STAMP_H = 160;

// -------------------------------------
// リダクションサイズを設定する「処理を軽くするためサムネイル」
// -------------------------------------
var REDUCTION_SIZE = 2.0;
var SCREEN_WIDTH   = 640;
var SCREEN_HEIGHT  = 1200;
var CANVAS_WIDTH   = SCREEN_WIDTH  / REDUCTION_SIZE;
var CANVAS_HEIGHT  = SCREEN_HEIGHT / REDUCTION_SIZE;


// 背景画像
var gStampEnum = 
{
	// ごはん系
	GOHAN_01:		0,
	GOHAN_02:		1,
	GOHAN_03:		2,
	// 空の上
	SKY_01:			3,
	SKY_02:			4,
	SKY_03:			5,
	// 水の中
	WATER_01:		6,
	WATER_02:		7,
	WATER_03:		8,

	// スタンプ
	// ごはん系
	NIKU:		100,				// ハンバーグ
	PURIN:		101,				// プリン
	SUPA:		102,				// スパゲティ
	HATA:		103,				// お子様の旗
	ONIGIRI:	104,				// おにぎり
	HURAI:		105,				// エビフライ
	TAKO:		106,				// タコ
	KYUURI:		107,				// きゅうり
	REMON:		108,				// レモン
	// 空の上系
	KUMO:		109,				// 雲
	HUUSEN:		110,				// 風船
	HANA:		111,				// チューリップ
	RINGO:		112,				// リンゴ
	BANANA:		113,				// バナナ
	HIKOUKI:	114,				// 飛行機
	TAMANEGI:	115,				// たまねぎ
	EDAMAME:	116,				// 枝豆
	TOMATO:		117,				// トマト
	// 水系
	KAME:		118,				// カメ
	ISOGIN:		119,				// イドギンチャク
	WAKAME:		120,				// わかめ
	KANI:		121,				// カニ
	YADOKARI:	122,				// ヤドカリ
	SAKANA:		123,				// 魚
	TATU:		124,				// タツノオトシゴ
	KAI:		125,				// 貝
	NIMO:		126,				// ニモ
	// 神様
	KAMI_NASU:		127,			// ナスの神様
	KAMI_NIKU:		128,			// 肉の神様
	KAMI_NINZIN:	129,			// 人参の神様
	KAMI_PIMAN:		130,			// ピーマンの神様
	KAMI_SAKANA:	131,			// 魚の神様
	KAMI_SIITAKE:	132,			// シイタケの神様
	KAMI_TAMANEGI:	133,			// 玉ねぎの神様
	KAMI_TOMATO:	134,			// トマトの神様
};

// 背景画像
var gStampBgFileName = 
[
	// ごはん系
    "img/08_stamp/s_s01_sta_a/s_s01_bgd_a000.png",
    "img/08_stamp/s_s01_sta_a/s_s01_bgd_b000.png",
    "img/08_stamp/s_s01_sta_a/s_s01_bgd_c000.png",
 	// 空の上
    "img/08_stamp/s_s02_sta_a/s_s02_bgd_a000.png",
    "img/08_stamp/s_s02_sta_a/s_s02_bgd_b000.png",
    "img/08_stamp/s_s02_sta_a/s_s02_bgd_c000.png",
	// 水系
    "img/08_stamp/s_s03_sta_a/s_s03_bgd_a000.png",
    "img/08_stamp/s_s03_sta_a/s_s03_bgd_b000.png",
    "img/08_stamp/s_s03_sta_a/s_s03_bgd_c000.png"
];

// スタンプ画像
var gStampImgFileName =
[
	// ごはん系
    "img/08_stamp/s_s01_sta_a/s_s01_sta_a000.png",
    "img/08_stamp/s_s01_sta_a/s_s01_sta_b000.png",
    "img/08_stamp/s_s01_sta_a/s_s01_sta_c000.png",
    "img/08_stamp/s_s01_sta_a/s_s01_sta_d000.png",
    "img/08_stamp/s_s01_sta_a/s_s01_sta_e000.png",
    "img/08_stamp/s_s01_sta_a/s_s01_sta_f000.png",
    "img/08_stamp/s_s01_sta_a/s_s01_sta_g000.png",
    "img/08_stamp/s_s01_sta_a/s_s01_sta_h000.png",
    "img/08_stamp/s_s01_sta_a/s_s01_sta_i000.png",
 	// 空の上
    "img/08_stamp/s_s02_sta_a/s_s02_sta_a000.png",
    "img/08_stamp/s_s02_sta_a/s_s02_sta_b000.png",
    "img/08_stamp/s_s02_sta_a/s_s02_sta_c000.png",
    "img/08_stamp/s_s02_sta_a/s_s02_sta_d000.png",
    "img/08_stamp/s_s02_sta_a/s_s02_sta_e000.png",
    "img/08_stamp/s_s02_sta_a/s_s02_sta_f000.png",
    "img/08_stamp/s_s02_sta_a/s_s02_sta_g000.png",
    "img/08_stamp/s_s02_sta_a/s_s02_sta_h000.png",
    "img/08_stamp/s_s02_sta_a/s_s02_sta_i000.png",
	// 水系
    "img/08_stamp/s_s03_sta_a/s_s03_sta_a000.png",
    "img/08_stamp/s_s03_sta_a/s_s03_sta_b000.png",
    "img/08_stamp/s_s03_sta_a/s_s03_sta_c000.png",
    "img/08_stamp/s_s03_sta_a/s_s03_sta_d000.png",
    "img/08_stamp/s_s03_sta_a/s_s03_sta_e000.png",
    "img/08_stamp/s_s03_sta_a/s_s03_sta_f000.png",
    "img/08_stamp/s_s03_sta_a/s_s03_sta_g000.png",
    "img/08_stamp/s_s03_sta_a/s_s03_sta_h000.png",
    "img/08_stamp/s_s03_sta_a/s_s03_sta_i000.png",
    // 神様
    "img/08_stamp/s_s04_sta_a/s_s04_sta_nas.png",
    "img/08_stamp/s_s04_sta_a/s_s04_sta_nik.png",
    "img/08_stamp/s_s04_sta_a/s_s04_sta_nin.png",
    "img/08_stamp/s_s04_sta_a/s_s04_sta_pii.png",
    "img/08_stamp/s_s04_sta_a/s_s04_sta_sak.png",
    "img/08_stamp/s_s04_sta_a/s_s04_sta_sii.png",
    "img/08_stamp/s_s04_sta_a/s_s04_sta_tam.png",
    "img/08_stamp/s_s04_sta_a/s_s04_sta_tom.png",

];

var M_OFFSET_STAMP = 100;
var M_MAX_SHEET    = gStampBgFileName.length;
var M_MAX_STAMP    = gStampImgFileName.length;

// 最大購入数
var M_MAX_BUY_SHEET = 32;		// シート
var M_MAX_BUY_STAMP = 64;		// スタンプ

// ------------------------------------------------------
// ショップ販売リスト
// 000-099	シート
// 100-		スタンプ
// ------------------------------------------------------
var gShopBuyListTable = 
[
	// ごはん系
    { "id":gStampEnum.GOHAN_01, "gold":30 },	// ごはん1
    { "id":gStampEnum.GOHAN_02, "gold":60 },	// ごはん2
    { "id":gStampEnum.GOHAN_03, "gold":90 },	// ごはん3
    // 小物
    { "id":gStampEnum.NIKU,    "gold":10 },		// ハンバーグ
    { "id":gStampEnum.PURIN,   "gold":15 },		// プリン
    { "id":gStampEnum.SUPA,    "gold":20 },		// スパゲティ
    { "id":gStampEnum.HATA,    "gold":25 },		// お子様の旗
    { "id":gStampEnum.ONIGIRI, "gold":30 },		// おにぎり
    { "id":gStampEnum.HURAI,   "gold":35 },		// エビフライ
    { "id":gStampEnum.TAKO,    "gold":40 },		// タコ
    { "id":gStampEnum.KYUURI,  "gold":45 },		// きゅうり
    { "id":gStampEnum.REMON,   "gold":50 },		// レモン
	// 空の上系
    { "id":gStampEnum.SKY_01, 	"gold":30 },	// 空の上1
    { "id":gStampEnum.SKY_02,	"gold":60 },	// 空の上2
    { "id":gStampEnum.SKY_03,	"gold":90 },	// 空の上3
    // 小物
    { "id":gStampEnum.KUMO,		"gold":10 },	// 雲
    { "id":gStampEnum.HUUSEN,	"gold":15 },	// 風船
    { "id":gStampEnum.HANA,		"gold":20 },	// チューリップ
    { "id":gStampEnum.RINGO,	"gold":25 },	// リンゴ
    { "id":gStampEnum.BANANA,	"gold":30 },	// バナナ
    { "id":gStampEnum.HIKOUKI,	"gold":35 },	// 飛行機
    { "id":gStampEnum.TAMANEGI,	"gold":40 },	// たまねぎ
    { "id":gStampEnum.EDAMAME,	"gold":45 },	// 枝豆
    { "id":gStampEnum.TOMATO,	"gold":50 },	// トマト
	// 水の中
    { "id":gStampEnum.WATER_01,	"gold":30 },	// 水の中1
    { "id":gStampEnum.WATER_02,	"gold":60 },	// 水の中2
    { "id":gStampEnum.WATER_03,	"gold":90 },	// 水の中3
    // 小物
    { "id":gStampEnum.KAME,		"gold":10 },	// カメ
    { "id":gStampEnum.ISOGIN,	"gold":15 },	// イドギンチャク
    { "id":gStampEnum.WAKAME,	"gold":20 },	// わかめ
    { "id":gStampEnum.KANI,		"gold":25 },	// カニ
    { "id":gStampEnum.YADOKARI,	"gold":30 },	// ヤドカリ
    { "id":gStampEnum.SAKANA,	"gold":35 },	// 魚
    { "id":gStampEnum.TATU,		"gold":40 },	// タツノオトシゴ
    { "id":gStampEnum.KAI,		"gold":45 },	// 貝
    { "id":gStampEnum.NIMO,		"gold":50 },	// ニモ
    // 神様
    { "id":gStampEnum.KAMI_NASU,		"gold":10 },	// ナスの神様
    { "id":gStampEnum.KAMI_NIKU,		"gold":15 },	// 肉の神様
    { "id":gStampEnum.KAMI_NINZIN,		"gold":20 },	// 人参の神様
    { "id":gStampEnum.KAMI_PIMAN,		"gold":25 },	// ピーマンの神様
    { "id":gStampEnum.KAMI_SAKANA,		"gold":30 },	// 魚の神様
    { "id":gStampEnum.KAMI_SIITAKE,		"gold":35 },	// シイタケの神様
    { "id":gStampEnum.KAMI_TAMANEGI,	"gold":40 },	// 玉ねぎの神様
    { "id":gStampEnum.KAMI_TOMATO,		"gold":45 },	// トマトの神様
    
];
var M_MAX_BUY_LIST = gShopBuyListTable.length;

// ------------------------------------------------------
// グラフィックデータ
// ------------------------------------------------------
var g_StampGraphicNum    = (M_MAX_SHEET + M_MAX_STAMP);
var g_StampGraphicHandle = null;
var g_StampDrawData		 = null;

// ------------------------------------------------------
// セーブキー
// ------------------------------------------------------
var g_saveDataKeyHaveStampData    	= "HaveStampData";			// スタンプデータ
var g_saveDataKeyHaveSheetData    	= "HaveSheetData";			// シートデータ
var g_saveDataKeyActiveSheetIndex 	= "ActiveSheetIndex";		// アクティブなシート番号
var g_saveDataKeyCoin 				= "HaveCoin";				// コインの数
var g_saveDataKeyStampDrawDara 		= "DrawStampData";			// 描画されたシートごとのスタンプ


// ------------------------------------------------------
// データの取得
// ------------------------------------------------------
function GetStampGraphicHandleImage(no)
{
	return g_StampGraphicHandle[no].m_Image;
}
function GetStampGraphicHandle_Sheet(no)
{
	return g_StampGraphicHandle[no];
}
function GetStampGraphicHandle_SheetImage(no)
{
	return g_StampGraphicHandle[no].m_Image;
}
function GetStampGraphicHandle_Stamp(no)
{
	return g_StampGraphicHandle[no + M_MAX_SHEET];
}
function GetStampGraphicHandle_StampImage(no)
{
	return g_StampGraphicHandle[no + M_MAX_SHEET].m_Image;	
}

function GetStampGraphicHandle(no)
{
	if(no >= M_OFFSET_STAMP) { return g_StampGraphicHandle[(no - M_OFFSET_STAMP) + M_MAX_SHEET]; }
	return g_StampGraphicHandle[no];
}
function GetStampGraphicIndex(no)
{
	if(no >= M_OFFSET_STAMP) { return (M_OFFSET_STAMP - no) + M_MAX_SHEET; }
	return no;
}
function GetStampGraphicImage(no)
{
	if(no >= M_OFFSET_STAMP) { return g_StampGraphicHandle[(no - M_OFFSET_STAMP) + M_MAX_SHEET].m_Image; }
	return g_StampGraphicHandle[no].m_Image;
}

// -------------------------------------
// スタンプのロードクラス
// -------------------------------------
function GStampGraphic()
{
	this.m_ImageNo 	= -1;
    this.m_bLoaded  = false;			// ロードフラグ
    this.m_Image	= new Image();	// イメージクラス
}
// -------------------------------------
// スタンプのローダー
// -------------------------------------
GStampGraphic.prototype.LoadImage = function(eStampEnum)
{
	// 自分のポインタ
    var _this  = this;
	var iIndex = eStampEnum;//GetStampGraphicIndex(eStampEnum);
    // ロード
    this.m_bLoaded = false;
	// ロードが終わっていたらフラグを立てる
    this.m_Image.onload = function(){ _this.m_bLoaded = true; }
	
	// スタンプ
	if(eStampEnum >= M_MAX_SHEET)
	{
    	this.m_Image.src	= gStampImgFileName[iIndex - M_MAX_SHEET];
	}
	// シート
	else
	{
    	this.m_Image.src	= gStampBgFileName[iIndex];
	}
	
	// 代入
    this.m_ImageNo = iIndex;
};

// ------------------------------------------------------
// 持ってるスタンプ[セーブ対象]
// スタンプの追加は「StampMain.jsのLoad()」へ移動
// ------------------------------------------------------
var g_HaveStampImageData = 
[
    {"id":0, "ink":30},	// ダミー
];
// ------------------------------------------------------
// シートデータ[セーブ対象]
// ------------------------------------------------------
var g_HaveStampSheetData = 
[
	{"id":0 },			// ダミー  
];
// 数
function GetHaveStampDataNum() { return g_HaveStampImageData.length; }
function GetHaveSheetDataNum() { return g_HaveStampSheetData.length; }


// -------------------------------------
// データのロード
// -------------------------------------
// スタンプ描画データクラス
function StampDrawData(nSheetNo) 
{
	this.nSheetIndex = nSheetNo;
	this.sDataInfo   = new Array();
	this.sDataNum    = 0;
}

// 保存キー生成
StampDrawData.prototype.GetSaveKey = function(nSheetNo) { return g_saveDataKeyStampDrawDara + nSheetNo; }

// ロード
StampDrawData.prototype.Load = function()
{
	this.sDataInfo = new Array();
	var key  = this.GetSaveKey(this.nSheetIndex);
	var data = localStorage.getItem(key);
	if (!data) 
	{
		console.log("データがないので作成します: " + key);
		this.sDataNum = 0;
		return;
	}
	
	this.sDataInfo 	= JSON.parse(data);
	this.sDataNum	= Math.floor(this.sDataInfo.length / 4);
	console.log("ロード: " + key);
};

// セーブ
StampDrawData.prototype.Save = function() 
{
	var key = this.GetSaveKey(this.nSheetIndex);
	localStorage.setItem(key, JSON.stringify(this.sDataInfo));
	console.log("セーブ: " + key);
};


// データ取得
StampDrawData.prototype.Get = function(no) 
{
	var r  = { x:0, y:0, id:0, alpha:0 };
	var ix = no * 4;
	if(ix >= this.sDataInfo.length) { return null; }
	r.x 	= this.sDataInfo[ix++];
	r.y 	= this.sDataInfo[ix++];
	r.id 	= this.sDataInfo[ix++];
	r.alpha = this.sDataInfo[ix++];
	return r;
};


// データ追加
StampDrawData.prototype.Add = function(x, y, stampId, alpha) 
{
	var ix = this.sDataInfo.length;
	
	this.sDataInfo[ix++] = x;
	this.sDataInfo[ix++] = y;
	this.sDataInfo[ix++] = stampId;
	this.sDataInfo[ix++] = alpha;
	this.sDataNum ++;
};

// データクリア
StampDrawData.prototype.Clear = function() 
{
	this.sDataInfo = new Array();
	this.sDataNum  = 0;
};


// -------------------------------------
// データのゲット
// -------------------------------------
function GetStampDrawNum(iSheet)            { return g_StampDrawData[iSheet].sDataNum;						}
function GetStampDrawData(iSheet)           { return g_StampDrawData[iSheet];								}
function GetStampDrawDataX(iSheet, iIndex)  { return g_StampDrawData[iSheet].sDataInfo[iIndex * 4];			}
function GetStampDrawDataY(iSheet, iIndex)  { return g_StampDrawData[iSheet].sDataInfo[(iIndex * 4) + 1]; 	}
function GetStampDrawDataID(iSheet, iIndex) { return g_StampDrawData[iSheet].sDataInfo[(iIndex * 4) + 2]; 	}
function GetStampDrawDataA(iSheet, iIndex)  { return g_StampDrawData[iSheet].sDataInfo[(iIndex * 4) + 3];	}

	
// ------------------------------------------------------
// ロード
// ------------------------------------------------------
function AllLoadStampGraphic()
{
	// ２度読み禁止
	if(g_StampGraphicHandle == null)
	{
		// 作成
	    g_StampGraphicHandle = new Array();
		// シートロード
		for(var i = 0; i < M_MAX_SHEET; i ++)
		{
			g_StampGraphicHandle[i] = new GStampGraphic();
			g_StampGraphicHandle[i].LoadImage(i);
		}
		// スタンプロード
		for(var i = M_MAX_SHEET; i < g_StampGraphicNum; i ++)
		{
			g_StampGraphicHandle[i] = new GStampGraphic();
			g_StampGraphicHandle[i].LoadImage(i);
		}
	}
}
// ------------------------------------------------------
// 描画データのロード
// ------------------------------------------------------
function AllLoadStampDrawData()
{
	// ２度読み禁止
	if(g_StampDrawData == null)
	{
		var iSheetNum = GetHaveSheetDataNum();
		g_StampDrawData = new Array(); 
		for(var iLoadDataIndex = 0; iLoadDataIndex < iSheetNum; iLoadDataIndex ++)
		{
			g_StampDrawData[iLoadDataIndex] = new StampDrawData(iLoadDataIndex);
			g_StampDrawData[iLoadDataIndex].Load();
		}
	}
}
function AllReleaseStampGraphic()
{
	// 作成
    g_StampGraphicHandle = null;
	g_StampDrawData      = null;
}
// すべてのスタンプデータを削除
function AllDeleteStampDrawData()
{
	for(var i = 0; i < M_MAX_BUY_SHEET; i ++)
	{
		var key  = g_saveDataKeyStampDrawDara + i;
		var data = window.localStorage.getItem(key);
		if (!data) { continue; }
		window.localStorage.removeItem(key);
		if(g_StampDrawData[i] != null)
		{
			g_StampDrawData[i].Clear();
		}
	}
}

// スタンプの最大回数
var STAMP_LIFE_MAX = 30;


// ------------------------------------------------------
// コイン
// ------------------------------------------------------
var g_DefaultCoin 	= 255;
var g_Coin 			= g_DefaultCoin;
function SetCoin(coin)
{
	g_Coin = coin;
	SaveCoin();	
}
function AddCoin(coin)
{
	LoadCoin();
	g_Coin += coin;
	if(g_Coin > 99999) { g_Coin = 99999; }
	if(g_Coin < 0)     { g_Coin = 0;     }
	SaveCoin();	
}
function GetCoin() { return g_Coin; }

// 購入できるか？
function GetIsBuyCoin(coin)
{
	LoadCoin();
	if(g_Coin < coin) { return false; }
	return true;
}
// 購入しすぎ
function GetIsBuyMax(id)
{
	if(id >= M_OFFSET_STAMP)
	{
		if(GetHaveStampDataNum() >= M_MAX_BUY_STAMP) { return false; }
	}
	else
	{
		if(GetHaveSheetDataNum() >= M_MAX_BUY_SHEET) { return false; }		
	}
	return true;
}


// 全セーブ
function SaveCoin() 
{
	localStorage.setItem(g_saveDataKeyCoin, JSON.stringify(g_HaveStampImageData));
	console.log("Save" + g_saveDataKeyCoin);
}
// 全削除
function DeleteCoin() 
{
	localStorage.removeItem(g_saveDataKeyCoin);
	SetCoin(g_DefaultCoin);
}
// ロード
function LoadCoin() 
{
	var data = localStorage.getItem(g_HaveStampImageData);
	if (!data) { return false; }
	
	g_Coin = JSON.parse(data);
	return true;
}


// ------------------------------------------------------
// スタンプ操作
// ------------------------------------------------------
// スタンプデータの追加
function AddHasStamp(id, ink)
{
	var sData = {"id":id, "ink":ink };
	g_HaveStampImageData.push(sData);
}
// スタンプデータの削除
function DelHasStamp(index)
{ 
	g_HaveStampImageData.splice(index, 1);
}
// スタンプデータの全て削除
function AllDelHasStamp()
{ 
	g_HaveStampImageData.splice(0);
}
// スタンプデータのダミーセット
function DummyStampDataSet()
{
	// 複数追加
	AllDelHasStamp();
	for(var i = 0; i < M_MAX_STAMP; i ++)
	{
		AddHasStamp(i, 30);
	}
}

// 購入
function BuySaveStampData(id, coin)
{
	// 購入できるか再チェック
	if(GetIsBuyCoin(-coin) == false)             { return false; }
	if(GetHaveStampDataNum() >= M_MAX_BUY_STAMP) { return false; }
	// 追加
	AddHasStamp(id, STAMP_LIFE_MAX);
	// コイン
	g_Coin += coin;
	// セーブ
	SaveHaveStampData();	
	return true;
}
// 削除
function DelSaveStampData(index)
{
	// 消す
	g_HaveStampImageData.splice(index, 1);
	// セーブ
	SaveHaveStampData();
}

// スタンプデータ
function LoadHaveStampData() 
{
	var data = localStorage.getItem(g_saveDataKeyHaveStampData);
	if (!data) { return false; }
	
	g_HaveStampImageData = JSON.parse(data);
	return true;
}
// 全セーブ
function SaveHaveStampData() 
{
	localStorage.setItem(g_saveDataKeyHaveStampData, JSON.stringify(g_HaveStampImageData));
	console.log("Save" + g_saveDataKeyHaveStampData);
}
// 全削除
function DeleteHaveStampData() 
{
	localStorage.removeItem(g_saveDataKeyHaveStampData);
	AllDelHasStamp();
}

// ------------------------------------------------------
// シート操作
// ------------------------------------------------------
// スタンプシートの追加
function AddHasSheet(id)
{
	var sData = {"id": id };
	g_HaveStampSheetData.push(sData);
}
// スタンプシートの削除
function DelHasSheet(index)
{ 
	g_HaveStampSheetData.splice(index, 1);
}
// スタンプシートの全て削除
function AllDelHasSheet()
{ 
	g_HaveStampSheetData.splice(0);
}
// スタンプシートのダミーセット
function DummySheetDataSet()
{
	// 複数追加
	AllDelHasSheet();
	for(var i = 0; i < M_MAX_SHEET; i ++)
	{
		AddHasSheet(i);
	}
}


// 購入
function BuySaveSheetData(id, coin)
{
	// 購入できるか再チェック
	if(GetIsBuyCoin(-coin) == false) { return false; }
	if(GetHaveSheetDataNum() >= M_MAX_BUY_SHEET) { return false; }
	// 追加
	AddHasSheet(id);
	// コイン
	g_Coin += coin;
	// セーブ
	SaveHaveSheetData();	
	return true;
}
// 削除
function DelSaveSheetData(index)
{
	// 配列から消す
	g_HaveStampSheetData.splice(index, 1);
	g_StampDrawData.splice(index, 1);
	// ずべての配列とりあえず削除
	for(var i = 0; i < M_MAX_BUY_SHEET; i ++)
	{
		var key  = g_saveDataKeyStampDrawDara + i;
		var data = window.localStorage.getItem(key);
		if (!data) { continue; }
		window.localStorage.removeItem(key);
	}
	// セーブして上書き
	SaveHaveSheetData();
	
	// セーブ
	var iSheetNum = GetHaveSheetDataNum();
	for(var iLoadDataIndex = 0; iLoadDataIndex < iSheetNum; iLoadDataIndex ++)
	{
		g_StampDrawData[iLoadDataIndex].nSheetIndex = iLoadDataIndex;
		g_StampDrawData[iLoadDataIndex].Save();
	}
}

// スタンプシート
function LoadHaveSheetData() 
{
	var data = localStorage.getItem(g_saveDataKeyHaveSheetData);
	if (!data) { return false; }
	
	g_HaveStampSheetData = JSON.parse(data);
	return true;
}

function SaveHaveSheetData() 
{
	localStorage.setItem(g_saveDataKeyHaveSheetData, JSON.stringify(g_HaveStampSheetData));
	console.log("Save" + g_saveDataKeyHaveSheetData);
}

function DeleteHaveSheetData() 
{
	localStorage.removeItem(g_saveDataKeyHaveSheetData);
	AllDelHasSheet();
}

// アクティブシートのロード
function LoadActiveSheetIndex() 
{
	var sheet = localStorage.getItem(g_saveDataKeyActiveSheetIndex);
	if (!sheet)    sheet = 0;
	return sheet;
}
function SaveActiveSheetIndex(sheetno) 
{
	localStorage.setItem(g_saveDataKeyActiveSheetIndex, sheetno);
	console.log("Save" + g_saveDataKeyActiveSheetIndex);
}

// ------------------------------------------------------
// デバッグ
// ------------------------------------------------------
function DispMemory()
{
	// メモリ内の表示デバッグ
	var Use    = performance.memory.usedJSHeapSize;
	var Total  = performance.memory.totalJSHeapSize;
	//var UseM   = Use   / 1024 / 1024;
	//var TotalM = Total / 1024 / 1024;
	document.getElementById("body").innerHTML = "[メモリ]" + "[" + Use + "]/" + "[" + Total + "]" + sActiveSheetNo;
	//document.getElementById("body").innerHTML += "\n[メモリ]" + "[" + UseM + "M]/" + "[" + TotalM + "M]";
}







