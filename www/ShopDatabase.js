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
var MAX_SHOP_PANEL_INTERVAL_Y 	= 0;
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
	// シンコ様
	SINKO_01:		6,
	SINKO_02:		7,
	SINKO_03:		8,
	// 水の中
/*
	WATER_01:		9,
	WATER_02:		10,
	WATER_03:		11,
*/
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
	// 神様
	KAMI_PIMAN:		118,			// ピーマンの神様
	KAMI_NASU:		119,			// ナスの神様
	KAMI_TOMATO:	120,			// トマトの神様	
	KAMI_NINZIN:	121,			// 人参の神様
	KAMI_TAMANEGI:	122,			// 玉ねぎの神様	
	KAMI_SIITAKE:	123,			// シイタケの神様
	KAMI_SAKANA:	124,			// 魚の神様
	KAMI_NIKU:		125,			// 肉の神様

	// 真子様
	SIN_BAMU:		126,			// バーム
	SIN_CHOCO:		127,			// チョコ
	SIN_HEART:		128,			// ハート
	SIN_KAI:		129,			// 貝
	SIN_SIKAKU:		130,			// 四角
	SIN_MARU:		131,			// 丸
	SIN_SAMA:		132,			// シンコ様
	SIN_AME:		133,			// 飴
	SIN_HAZIKI:		134,			// はじきみたいな
	// 水系
/*
	KAME:		135,				// カメ
	ISOGIN:		136,				// イドギンチャク
	WAKAME:		137,				// わかめ
	KANI:		138,				// カニ
	YADOKARI:	139,				// ヤドカリ
	SAKANA:		140,				// 魚
	TATU:		141,				// タツノオトシゴ
	KAI:		142,				// 貝
	NIMO:		143,				// ニモ	
*/
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
	// シンコ様
    "img/08_stamp/s_s05_sta_a/s_s02_bgd_a000.png",
    "img/08_stamp/s_s05_sta_a/s_s02_bgd_b000.png",
    "img/08_stamp/s_s05_sta_a/s_s02_bgd_c000.png",
 	// 水系
   // "img/08_stamp/s_s03_sta_a/s_s03_bgd_a000.png",
   // "img/08_stamp/s_s03_sta_a/s_s03_bgd_b000.png",
   // "img/08_stamp/s_s03_sta_a/s_s03_bgd_c000.png",   
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
    // 神様
    "img/08_stamp/s_s04_sta_a/s_s04_sta_pii.png",
    "img/08_stamp/s_s04_sta_a/s_s04_sta_nas.png",
    "img/08_stamp/s_s04_sta_a/s_s04_sta_tom.png",
    "img/08_stamp/s_s04_sta_a/s_s04_sta_nin.png",
    "img/08_stamp/s_s04_sta_a/s_s04_sta_tam.png",
    "img/08_stamp/s_s04_sta_a/s_s04_sta_sii.png",
    "img/08_stamp/s_s04_sta_a/s_s04_sta_sak.png",
    "img/08_stamp/s_s04_sta_a/s_s04_sta_nik.png",

    // シンコ様
    "img/08_stamp/s_s05_sta_a/s_s05_sta_a000.png",
    "img/08_stamp/s_s05_sta_a/s_s05_sta_b000.png",
    "img/08_stamp/s_s05_sta_a/s_s05_sta_c000.png",
    "img/08_stamp/s_s05_sta_a/s_s05_sta_d000.png",
    "img/08_stamp/s_s05_sta_a/s_s05_sta_e000.png",
    "img/08_stamp/s_s05_sta_a/s_s05_sta_f000.png",
    "img/08_stamp/s_s05_sta_a/s_s05_sta_g000.png",
    "img/08_stamp/s_s05_sta_a/s_s05_sta_h000.png",
	"img/08_stamp/s_s05_sta_a/s_s05_sta_i000.png",
/*	
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
*/
];

var M_OFFSET_STAMP = 100;
var M_MAX_SHEET    = gStampBgFileName.length;
var M_MAX_STAMP    = gStampImgFileName.length;

// 最大購入数
var M_MAX_BUY_SHEET = M_MAX_SHEET;		// シート
var M_MAX_BUY_STAMP = 64;				// スタンプ

// ------------------------------------------------------
// ショップ販売リスト
// 000-099	シート
// 100-		スタンプ
// ------------------------------------------------------
var gShopBuyListTable = 
[
 	// シンコ様
    { "id":gStampEnum.SINKO_01,	"gold":11 },	// シンコ様1
    { "id":gStampEnum.SINKO_02,	"gold":11 },	// シンコ様2
    { "id":gStampEnum.SINKO_03,	"gold":11 },	// シンコ様3   
	// シンコ様
    { "id":gStampEnum.SIN_BAMU,		"gold":3    },	// バーム
    { "id":gStampEnum.SIN_CHOCO,	"gold":3    },	// チョコ
    { "id":gStampEnum.SIN_HEART,	"gold":3    },	// ハート
    { "id":gStampEnum.SIN_KAI,		"gold":3    },	// 貝
    { "id":gStampEnum.SIN_SIKAKU,	"gold":3    },	// 四角
    { "id":gStampEnum.SIN_MARU,		"gold":3    },	// 丸
    { "id":gStampEnum.SIN_SAMA,		"gold":3	},	// シンコ様
    { "id":gStampEnum.SIN_AME,		"gold":3    },	// 飴
    { "id":gStampEnum.SIN_HAZIKI,	"gold":3    },	// はじきみたいな

	// ごはん系
    { "id":gStampEnum.GOHAN_01, "gold":13 },	// ごはん1
    { "id":gStampEnum.GOHAN_02, "gold":13 },	// ごはん2
    { "id":gStampEnum.GOHAN_03, "gold":13 },	// ごはん3
    // 小物
    { "id":gStampEnum.NIKU,    "gold":5 },		// ハンバーグ
    { "id":gStampEnum.PURIN,   "gold":5 },		// プリン
    { "id":gStampEnum.SUPA,    "gold":5 },		// スパゲティ
    { "id":gStampEnum.HATA,    "gold":5 },		// お子様の旗
    { "id":gStampEnum.ONIGIRI, "gold":5 },		// おにぎり
    { "id":gStampEnum.HURAI,   "gold":5 },		// エビフライ
    { "id":gStampEnum.TAKO,    "gold":5 },		// タコ
    { "id":gStampEnum.KYUURI,  "gold":5 },		// きゅうり
    { "id":gStampEnum.REMON,   "gold":5 },		// レモン
    
	// 空の上系
    { "id":gStampEnum.SKY_01, 	"gold":17 },	// 空の上1
    { "id":gStampEnum.SKY_02,	"gold":17 },	// 空の上2
    { "id":gStampEnum.SKY_03,	"gold":17 },	// 空の上3
    // 小物
    { "id":gStampEnum.KUMO,		"gold":11 },	// 雲
    { "id":gStampEnum.HUUSEN,	"gold":11 },	// 風船
    { "id":gStampEnum.HANA,		"gold":11 },	// チューリップ
    { "id":gStampEnum.RINGO,	"gold":11 },	// リンゴ
    { "id":gStampEnum.BANANA,	"gold":11 },	// バナナ
    { "id":gStampEnum.HIKOUKI,	"gold":11 },	// 飛行機
    { "id":gStampEnum.TAMANEGI,	"gold":11 },	// たまねぎ
    { "id":gStampEnum.EDAMAME,	"gold":11 },	// 枝豆
    { "id":gStampEnum.TOMATO,	"gold":11 },	// トマト
    
/*
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
  */     
    // 神様
	{ "id":gStampEnum.KAMI_PIMAN,		"gold":2 },	// ピーマンの神様   
    { "id":gStampEnum.KAMI_NASU,		"gold":2 },	// ナスの神様
    { "id":gStampEnum.KAMI_TOMATO,		"gold":2 },	// トマトの神様 
    { "id":gStampEnum.KAMI_NINZIN,		"gold":2 },	// 人参の神様
    { "id":gStampEnum.KAMI_TAMANEGI,	"gold":2 },	// 玉ねぎの神様     
    { "id":gStampEnum.KAMI_SIITAKE,		"gold":2 },	// シイタケの神様
    { "id":gStampEnum.KAMI_SAKANA,		"gold":2 },	// 魚の神様
    { "id":gStampEnum.KAMI_NIKU,		"gold":2 },	// 肉の神様
];

var M_MAX_BUY_LIST = gShopBuyListTable.length;
function GetMaxBuyScl()
{
	return -(MAX_SHOP_PANEL_START_Y + (MAX_SHOP_PANEL_HEIGHT * (M_MAX_BUY_LIST / 3)) - (MAX_SHOP_PANEL_HEIGHT * 3));
}

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
var g_saveDataKeyActiveStampIndex 	= "ActiveStampIndex";		// アクティブなシート番号
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

// スタンプの最大回数
var STAMP_LIFE_MAX = 3 * 15;	// 45
var g_HaveStampImageData = 
[
    {"id":0, "ink":STAMP_LIFE_MAX},	// ダミー
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
	//if(g_StampDrawData == null)
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
		if(g_StampDrawData != null)
		{
			if(g_StampDrawData[i] != null)
			{
				g_StampDrawData[i].Clear();
			}
		}
	}
}



// ------------------------------------------------------
// コイン
// ------------------------------------------------------
var g_DefaultCoin 	= 30;
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
	localStorage.setItem(g_saveDataKeyCoin, JSON.stringify(g_Coin));
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
	var data = localStorage.getItem(g_saveDataKeyCoin);
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
	

	// 全データセット
//	for(var i = 0; i < M_MAX_STAMP; i ++)
//	{
//		AddHasStamp(i, 2);
//	}
	// [各３こづつ]
	// シンコ
	AddHasStamp(gStampEnum.SIN_BAMU  - M_OFFSET_STAMP, STAMP_LIFE_MAX);
	AddHasStamp(gStampEnum.SIN_CHOCO  	- M_OFFSET_STAMP, STAMP_LIFE_MAX);
	AddHasStamp(gStampEnum.SIN_HEART  	- M_OFFSET_STAMP, STAMP_LIFE_MAX);
	// ごはん
	AddHasStamp(gStampEnum.NIKU  		- M_OFFSET_STAMP, STAMP_LIFE_MAX);
	AddHasStamp(gStampEnum.PURIN  		- M_OFFSET_STAMP, STAMP_LIFE_MAX);
	AddHasStamp(gStampEnum.SUPA  		- M_OFFSET_STAMP, STAMP_LIFE_MAX);
	// 雲の上
	AddHasStamp(gStampEnum.KUMO  		- M_OFFSET_STAMP, STAMP_LIFE_MAX);
	AddHasStamp(gStampEnum.HUUSEN  		- M_OFFSET_STAMP, STAMP_LIFE_MAX);
	AddHasStamp(gStampEnum.HANA  		- M_OFFSET_STAMP, STAMP_LIFE_MAX);

	// 必要なもの[ぴーまん、にんじん、とまと、なす]
	AddHasStamp(gStampEnum.KAMI_PIMAN  - M_OFFSET_STAMP, STAMP_LIFE_MAX);
	AddHasStamp(gStampEnum.KAMI_NINZIN - M_OFFSET_STAMP, STAMP_LIFE_MAX);
	AddHasStamp(gStampEnum.KAMI_TOMATO - M_OFFSET_STAMP, STAMP_LIFE_MAX);
	AddHasStamp(gStampEnum.KAMI_NASU   - M_OFFSET_STAMP, STAMP_LIFE_MAX);

	// セーブ
	SaveHaveStampData();
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
	// アクティブなスタンプにする
	SaveHaveStampData(g_HaveStampImageData.length - 1);
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
	SaveHaveStampData();
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
	
	// 全セット
/*
	for(var i = 0; i < M_MAX_SHEET; i ++)
	{
		AddHasSheet(i);
	}
*/
	// 必要なもの[シンコ様テーブル左]
	AddHasSheet(gStampEnum.SINKO_01);	// シンコ
	AddHasSheet(gStampEnum.GOHAN_01);	// ランチ
	AddHasSheet(gStampEnum.SKY_01);		// 雲の上
		
	
	// セーブ
	SaveHaveSheetData();
}

function GetIsSheetTrue(id)
{
	// セーブ
	if(GetHaveSheetDataNum() >= M_MAX_BUY_SHEET) { return true; }
	var iSheetNum = g_HaveStampSheetData.length;
	for(var iLoadDataIndex = 0; iLoadDataIndex < iSheetNum; iLoadDataIndex ++)
	{
		if(g_HaveStampSheetData[iLoadDataIndex]["id"] == id) { return false; }
	}	
	return true;
}

// 購入して、そいつをアクティブにする
function BuySaveSheetData(id, coin)
{
	// 購入できるか再チェック
	if(GetIsBuyCoin(-coin) == false) { return false; }
	if(GetHaveSheetDataNum() >= M_MAX_BUY_SHEET) { return false; }
	// 追加
	AddHasSheet(id);
	// アクティブなシートにする
	SaveActiveSheetIndex(g_HaveStampSheetData.length - 1);
	// コイン
	g_Coin += coin;
	// セーブ
	SaveHaveSheetData();	
	return true;
}
// 削除し、一番近いシートをアクティブにする
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
	// アクティブなシートにする
	var id = index;
	if(id >= g_HaveStampSheetData.length)
	{
		id = g_HaveStampSheetData.length - 1;
	}
	SaveActiveSheetIndex(id);	
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
	SaveHaveSheetData() 
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

// アクティブシートのロード
function LoadActiveStampIndex() 
{
	var stamp = localStorage.getItem(g_saveDataKeyActiveStampIndex);
	if (!stamp) { stamp = 0; }
	return stamp;
}
function SaveActiveStampIndex(sheetno) 
{
	localStorage.setItem(g_saveDataKeyActiveStampIndex, sheetno);
	console.log("Save" + g_saveDataKeyActiveStampIndex);
}


// ------------------------------------------------------
// デバッグ
// ------------------------------------------------------
function DispMemory()
{
	// メモリ内の表示デバッグ
	//var Use    = performance.memory.usedJSHeapSize;
	//var Total  = performance.memory.totalJSHeapSize;
	//var UseM   = Use   / 1024 / 1024;
	//var TotalM = Total / 1024 / 1024;
	//var rootSceen = document.getElementById("sceen");
	//var sceen     = document.createElement("div");
//	var w = window.innerWidth;
//	var r = 640 / w;
//	var h = window.innerHeight * r;
//	document.getElementById("memory").innerHTML = "[" + w + "][" + h + "]" ;
	
//	document.body.scrollLeft - document.body.clientWidth
	
/*
	window.innerWidth
	document.body.clientWidth				// 実際の表示サイズ
	document.documentElement.clientWidth	// ??
	
	window.innerWidth < window.innerHeight
	document.body.style.width + "][" + document.body.style.height
 	im.width = 640;   
	im.height = 1200;  
	im.style.position = 'absolute';
 	im.style.top = "0px"; 
 	im.style.left ="0px"; 
*/
	//document.getElementById("memory").innerHTML = "[メモリ]" + "[" + Use + "]/" + "[" + Total + "]";/* + sActiveSheetNo;*/
	//document.getElementById("memory").innerHTML += "\n[メモリ]" + "[" + UseM + "M]/" + "[" + TotalM + "M]";
}

var g_WindowImageHandle 			= null;
var g_YesImageHandle 				= null;
var g_NoImageHandle  				= null;
var g_YesNoMessageImageHandle		= null;
var g_WindowsScaleRate				= 1.0;
var g_iSwitch = 0;
var g_eStatus = 0;

// スタンプメイン画面
var g_StampMainWindowImageHandle		= null;
var g_StampMainKesuImageHandle			= null;
var g_StampMainEndImageHandle			= null;
var g_StampMainBackImageHandle			= null;
var g_StampMainMenuImageHandle			= null;
var g_SheetDeleteMessageImageHandle		= null;
/*
var g_bOldTouch					= false;
var g_sTouchStartX 				= -200;
var g_sTouchStartY 				= -200;
var g_sTouchMoveX 				= -200;
var g_sTouchMoveY 				= -200;	

function ClearTouch()
{
	g_bOldTouch					= false;
	g_sTouchStartX 				= -200;
	g_sTouchStartY 				= -200;
	g_sTouchMoveX 				= -200;
	g_sTouchMoveY 				= -200;		
}
*/
	
var G_STATUS = 
{
	INIT:			0,
	FADEIN:			1,
	MAIN:			2,
	FADEOUT:		3,
	END:			4,
	
	SELECTED_INIT:	5,
	SELECTED_MOVE:	6,
	SELECTED_END:	7,
};

function LoadWindowYesNo()
{
	// ウィンドウ
	g_WindowImageHandle     	= new Image();
    g_WindowImageHandle.src = "img/00_common/g_g01_huk_e000.png";
	// メッセージ
	g_YesNoMessageImageHandle 	= new Image();
    g_YesNoMessageImageHandle.src = "img/00_common/g_hand_01.png";
	// はい
	g_YesImageHandle 			= new Image();
    g_YesImageHandle.src = "img/07_shop/k_btn_a.png";
	// いいえ
	g_NoImageHandle				= new Image();
    g_NoImageHandle.src = "img/07_shop/k_btn_b.png";
	// スタンプメイン
	g_StampMainWindowImageHandle		= new Image();
    g_StampMainWindowImageHandle.src 	= "img/08_stamp/s_wak_a000.png";	
	g_StampMainKesuImageHandle			= new Image();
    g_StampMainKesuImageHandle.src 		= "img/08_stamp/s_btn_a000.png";	
	g_StampMainEndImageHandle			= new Image();
    g_StampMainEndImageHandle.src 		= "img/08_stamp/s_btn_b000.png";	
	g_StampMainBackImageHandle			= new Image();
    g_StampMainBackImageHandle.src 		= "img/08_stamp/s_btn_c000.png";	
	// メニュー
	g_StampMainMenuImageHandle			= new Image();
    g_StampMainMenuImageHandle.src 		= "img/08_stamp/s_btn_e000.png";		
	// 本当に消す？
	g_SheetDeleteMessageImageHandle			= new Image();
    g_SheetDeleteMessageImageHandle.src 	= "img/08_stamp/s_txt_d000.png";		
}
function DeleteWindowYesNo()
{
	g_WindowImageHandle 			= null;
	g_YesImageHandle 				= null;
	g_NoImageHandle  				= null;
	g_YesNoMessageImageHandle		= null;	
	g_StampMainWindowImageHandle	= null;
	g_StampMainKesuImageHandle		= null;
	g_StampMainEndImageHandle		= null;
	g_StampMainBackImageHandle		= null;
	g_StampMainMenuImageHandle		= null;
}


// メニュー
function DrawMenu(ctx, bTrigger, sTouchStartX, sTouchStartY,
								 sTouchMoveX,  sTouchMoveY)
{
	var PosYesX = 495;
	var PosYesY = 0;
	var PosYesW = 122;
	var PosYesH = 160;
	ctx.drawImage(g_StampMainMenuImageHandle,  PosYesX, PosYesY,  PosYesW,  PosYesH);
	
	if(bTrigger)
	{
		if(
			(PosYesX < sTouchStartX) && (PosYesX + PosYesW > sTouchStartX) &&
			(PosYesY < sTouchStartY) && (PosYesY + PosYesH > sTouchStartY) &&
			(PosYesX < sTouchMoveX) && (PosYesX + PosYesW > sTouchMoveX)   &&
			(PosYesY < sTouchMoveY) && (PosYesY + PosYesH > sTouchMoveY)) { return 0; }
	}
	return -1;
}

function DrawStampWindow(ctx, sScaleRate, bTrigger,
									sTouchStartX, sTouchStartY,
									sTouchMoveX, sTouchMoveY)
{
	DrawBack(ctx);
	
	var GPosY = (1.0 - sScaleRate) * -64;

	ctx.globalAlpha = sScaleRate;
	ctx.drawImage(g_StampMainWindowImageHandle, 
		25, 
		GPosY + 100, 
		590, 
		570);
	
	// ---------------------------------------------------
	// YesNo
	// ---------------------------------------------------
	var PosYesX = 85;
	var PosYesY = GPosY + 270;
	var PosYesW = 480;
	var PosYesH = 170;
	var PosNoX  = 85;
	var PosNoY  = GPosY + 450;
	var PosNoW  = 480;
	var PosNoH  = 170;
	var PosBackX  = 470;
	var PosBackY  = GPosY + 140;
	var PosBackW  = 123;
	var PosBackH  = 123;
	ctx.globalAlpha = sScaleRate;
	ctx.drawImage(g_StampMainKesuImageHandle, PosYesX, PosYesY, PosYesW, PosYesH);
	ctx.drawImage(g_StampMainEndImageHandle,   PosNoX, PosNoY,  PosNoW,  PosNoH);
	ctx.drawImage(g_StampMainBackImageHandle,   PosBackX, PosBackY,  PosBackW,  PosBackH);
		
	// ---------------------------------------------------
	// アルファブレンド計算
	// ---------------------------------------------------
	ctx.globalAlpha = 1.0;
	sScaleRate += 0.15;
	if(sScaleRate > 1.0) { sScaleRate = 1.0; } 
	
	// ---------------------------------------------------
	// クリックイベント
	// ---------------------------------------------------
	if(sScaleRate >= 1.0 && bTrigger)
	{
		if(
			(PosYesX < sTouchStartX) && (PosYesX + PosYesW > sTouchStartX) &&
			(PosYesY < sTouchStartY) && (PosYesY + PosYesH > sTouchStartY) &&
			(PosYesX < sTouchMoveX) && (PosYesX + PosYesW > sTouchMoveX)   &&
			(PosYesY < sTouchMoveY) && (PosYesY + PosYesH > sTouchMoveY)) { return 0; }
			
		if(
			(PosNoX < sTouchStartX) && (PosNoX + PosNoW > sTouchStartX) &&
			(PosNoY < sTouchStartY) && (PosNoY + PosNoH > sTouchStartY) &&
			(PosNoX < sTouchMoveX) && (PosNoX + PosNoW > sTouchMoveX)   &&
 			(PosNoY < sTouchMoveY) && (PosNoY + PosNoH > sTouchMoveY)) { return 1; }
		if(
			(PosBackX < sTouchStartX) && (PosBackX + PosBackW > sTouchStartX) &&
			(PosBackY < sTouchStartY) && (PosBackY + PosBackH > sTouchStartY) &&
			(PosBackX < sTouchMoveX) && (PosBackX + PosBackW > sTouchMoveX)   &&
 			(PosBackY < sTouchMoveY) && (PosBackY + PosBackH > sTouchMoveY)) { return 2; }
	}
	return -1;
}

function DrawWindowYesNo(ctx, sScaleRate, bTrigger,
									sTouchStartX, sTouchStartY,
									sTouchMoveX, sTouchMoveY)
{
	DrawBack(ctx);
	
	var GPosY = ((1.0 - sScaleRate) * -64) - 120;

	ctx.globalAlpha = sScaleRate;
	ctx.drawImage(g_WindowImageHandle, 
		89, 
		GPosY + 214, 
		460, 
		440);
	ctx.drawImage(g_SheetDeleteMessageImageHandle, 
		128, 
		GPosY + 370, 
		386, 
		162);
	
	// ---------------------------------------------------
	// YesNo
	// ---------------------------------------------------
	var PosYesX = 33;
	var PosYesY = GPosY + 565;
	var PosYesW = 281;
	var PosYesH = 184;
	var PosNoX  = 317;
	var PosNoY  = GPosY + 565;
	var PosNoW  = 281;
	var PosNoH  = 184;
	ctx.globalAlpha = sScaleRate;
	ctx.drawImage(g_YesImageHandle, PosYesX, PosYesY, PosYesW, PosYesH);
	ctx.drawImage(g_NoImageHandle,   PosNoX, PosNoY,  PosNoW,  PosNoH);
	
	// ---------------------------------------------------
	// アルファブレンド計算
	// ---------------------------------------------------
	ctx.globalAlpha = 1.0;
	sScaleRate += 0.15;
	if(sScaleRate > 1.0) { sScaleRate = 1.0; } 
	
	// ---------------------------------------------------
	// クリックイベント
	// ---------------------------------------------------
	if(sScaleRate >= 1.0 && bTrigger)
	{
		if(
			(PosYesX < sTouchStartX) && (PosYesX + PosYesW > sTouchStartX) &&
			(PosYesY < sTouchStartY) && (PosYesY + PosYesH > sTouchStartY) &&
			(PosYesX < sTouchMoveX) && (PosYesX + PosYesW > sTouchMoveX)   &&
			(PosYesY < sTouchMoveY) && (PosYesY + PosYesH > sTouchMoveY)) { return 0; }
			
		if(
			(PosNoX < sTouchStartX) && (PosNoX + PosNoW > sTouchStartX) &&
			(PosNoY < sTouchStartY) && (PosNoY + PosNoH > sTouchStartY) &&
			(PosNoX < sTouchMoveX) && (PosNoX + PosNoW > sTouchMoveX)   &&
 			(PosNoY < sTouchMoveY) && (PosNoY + PosNoH > sTouchMoveY)) { return 1; }
	}
	return -1;
}

function DrawWindowOk(ctx, sScaleRate, bTrigger,
									sTouchStartX, sTouchStartY,
									sTouchMoveX, sTouchMoveY)
{
	DrawBack(ctx);
	
	var GPosY = (1.0 - sScaleRate) * -64;

	ctx.globalAlpha = sScaleRate;
	ctx.drawImage(g_WindowImageHandle, 
		89, 
		GPosY + 214, 
		460, 
		440);
	ctx.drawImage(g_YesNoMessageImageHandle, 
		128, 
		GPosY + 380, 
		386, 
		162);
	
	// ---------------------------------------------------
	// YesNo
	// ---------------------------------------------------
	var PosYesX = 180;
	var PosYesY = 565 + GPosY;
	var PosYesW = 281;
	var PosYesH = 184;
	ctx.globalAlpha = sScaleRate;
	ctx.drawImage(g_YesImageHandle, PosYesX, PosYesY, PosYesW, PosYesH);

	// ---------------------------------------------------
	// アルファブレンド計算
	// ---------------------------------------------------
	ctx.globalAlpha = 1.0;
	sScaleRate += 0.15;
	if(sScaleRate > 1.0) { sScaleRate = 1.0; } 
	
	// ---------------------------------------------------
	// クリックイベント
	// ---------------------------------------------------
	if(sScaleRate >= 1.0 && bTrigger)
	{
		if(
			(PosYesX < sTouchStartX) && (PosYesX + PosYesW > sTouchStartX) &&
			(PosYesY < sTouchStartY) && (PosYesY + PosYesH > sTouchStartY) &&
			(PosYesX < sTouchMoveX) && (PosYesX + PosYesW > sTouchMoveX)   &&
			(PosYesY < sTouchMoveY) && (PosYesY + PosYesH > sTouchMoveY)) { return 0; }
	}
	return -1;
}

function DrawBack(ctx)
{
	ctx.globalAlpha = 0.6;
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillRect(0, 0, 640, 1200);
	ctx.globalAlpha = 1.0;
}

var g_nArrowCounterL = 0;
var g_nArrowCounterR = 0;

function ProcArrow()
{
	g_nArrowCounterL --;
	if(g_nArrowCounterL < 0) { g_nArrowCounterL = 0; }
	g_nArrowCounterR --;
	if(g_nArrowCounterR < 0) { g_nArrowCounterR = 0; }
}
function PuchArrowL()
{
	g_nArrowCounterL = 10;
}
function PuchArrowR()
{
	g_nArrowCounterR = 10;
}
function DrawArrowL(ctx, x, y, size)
{
	ctx.globalAlpha = 0.60 + (-g_nArrowCounterL * 0.05);
	ctx.fillStyle = 'rgb(255, 0, 255)';
	ctx.beginPath();
	x -= (g_nArrowCounterL * 3);
	ctx.moveTo(x, y);
	var hSize = size / 2;
	ctx.lineTo(x + size, y - hSize);
	ctx.lineTo(x + size, y + hSize);
	ctx.closePath();
	ctx.fill();
	ctx.globalAlpha = 1.0;	
}
function DrawArrowR(ctx, x, y, size)
{
	ctx.globalAlpha = 0.60 + (-g_nArrowCounterR * 0.05);
	ctx.fillStyle = 'rgb(255, 0, 255)';
	ctx.beginPath();
	x += (g_nArrowCounterR * 3);
	ctx.moveTo(x, y);
	var hSize = size / 2;
	ctx.lineTo(x - size, y - hSize);
	ctx.lineTo(x - size, y + hSize);
	ctx.closePath();
	ctx.fill();
	ctx.globalAlpha = 1.0;	
}

var G_EFFECT_STATUS = 
{
	SCALE_ZOOM:	0,
	SCALE_FADE_ZOOM:	1,
};
var G_EFFECT_WORK = 
{
	A:			0,
	B:			1,
};


var g_sEffectObject = new Array();
function GEffectData() 
{
	this.EndCallBack	= null;
	this.bEnd			= false;
	this.sCtx			= null;	
	this.sImage			= null;	
	this.nMaxTime  		= 0;
	this.nNowTime  		= 0;
	this.nCount 		= 0;
	this.nX 			= 0;
	this.nY 			= 0;
	this.nW 			= 0;
	this.nH 			= 0;
	this.nA 			= 0;
	this.nSwitch		= 0;
	this.nWork			= 0;
	this.nVal1			= 0;
	this.nVal2			= 0;
	this.nVal3			= 0;
	this.nVal4			= 0;
}

// データ追加
GEffectData.prototype.SetScaleZoomEffect = function(ctx, image, x, y, w, h, a)
{
	this.sCtx			= ctx;	
	this.sImage			= image;	
	this.nMaxTime  		= 2;
	this.nNowTime  		= 0;
	this.nCount 		= 0;
	this.nX 			= x;
	this.nY 			= y;
	this.nW 			= w;
	this.nH 			= h;
	this.nA 			= a;
	this.nWA 			= a;
	this.nStatus		= G_EFFECT_STATUS.SCALE_ZOOM;
	this.nWork			= G_EFFECT_WORK.A;
	this.nVal1			= 0;
	this.nVal2			= 0;
	this.nVal3			= 0;
	this.nVal4			= 0;
	this.nCrsW			= 640;
	this.nCrsH			= 1200;
	this.nCrsFlg		= true;	
};
// データ追加
GEffectData.prototype.Exec = function()
{
	if(this.nStatus == G_EFFECT_STATUS.SCALE_ZOOM)
	{
		if(this.nWork == G_EFFECT_WORK.A)
		{
			if(this.nNowTime < this.nMaxTime)
			{	
				this.nNowTime ++;
				this.nCount += 1;
			//	this.nWA    -= 0.2;
				
				// 描画
				var vTargetW = (this.nW * ((this.nNowTime * 0.05) + this.nMaxTime / this.nMaxTime));
				var vTargetH = (this.nH * ((this.nNowTime * 0.05) + this.nMaxTime / this.nMaxTime));
					
			//	var ww = this.nW / 1.0 + (this.nCount * 2.0);
			//	var hh = this.nH / 1.0 + (this.nCount * 2.0);
		        this.sCtx.globalAlpha = 1.0;
				
				if(this.nCrsFlg)
				{
		        	this.sCtx.clearRect (this.nX - (vTargetW / 2) + this.nW / 2, 
		 								 this.nY - (vTargetH / 2) + this.nH / 2, vTargetW, vTargetH);
				}
		        this.sCtx.globalAlpha = this.nA;
		        this.sCtx.drawImage(this.sImage, 
									 this.nX - (vTargetW / 2) + this.nW / 2, 
		 							 this.nY - (vTargetH / 2) + this.nH / 2, vTargetW, vTargetH);
		        this.sCtx.globalAlpha = 1.0;
			}
			else
			{
				this.bEnd = true;
				if(this.nCrsW != 0 && this.nCrsW != 0)
				{
					this.sCtx.clearRect(0, 0, this.nCrsW, this.nCrsH);
				}
				if(this.EndCallBack != null) { this.EndCallBack(this); }
				return false;
				/*
				this.nWork 		= G_EFFECT_WORK.B;
				this.nNowTime  	= 0;*/
			}
		}
		/*
		if(this.nWork == G_EFFECT_WORK.B)
		{
			if(this.nNowTime > 0)
			{	
				this.nNowTime --;
				this.nCount += 1;
				
				// 描画
				var vTargetW = (this.nW * ((this.nNowTime * 0.05) + this.nMaxTime / this.nMaxTime));
				var vTargetH = (this.nH * ((this.nNowTime * 0.05) + this.nMaxTime / this.nMaxTime));
					
			//	var ww = this.nW / 1.0 + (this.nCount * 2.0);
			//	var hh = this.nH / 1.0 + (this.nCount * 2.0);
		        this.sCtx.globalAlpha = 1.0;
				if(this.nCrsFlg)
				{
		      	  this.sCtx.clearRect( this.nX - (vTargetW / 2) + this.nW / 2, 
		 							   this.nY - (vTargetH / 2) + this.nH / 2, vTargetW, vTargetH);
				}
		        this.sCtx.globalAlpha = this.nA;
		        this.sCtx.drawImage(this.sImage, 
									 this.nX - (vTargetW / 2) + this.nW / 2, 
		 							 this.nY - (vTargetH / 2) + this.nH / 2, vTargetW, vTargetH);
		        this.sCtx.globalAlpha = 1.0;
			}
			else
			{
				this.bEnd = true;
				if(this.nCrsW != 0 && this.nCrsW != 0)
				{
					this.sCtx.clearRect(0, 0, this.nCrsW, this.nCrsH);
				}
				if(this.EndCallBack != null) { this.EndCallBack(this); }
				return false;
			}		
		}
		*/
	}
	else
	{
		if(this.nWork == G_EFFECT_WORK.A)
		{
			if(this.nNowTime < this.nMaxTime)
			{	
				this.nNowTime ++;
				this.nCount += 1;
			//	this.nWA    -= 0.2;
				
				// 描画
				var vTargetW = (this.nW * ((this.nNowTime * 0.05) + this.nMaxTime / this.nMaxTime));
				var vTargetH = (this.nH * ((this.nNowTime * 0.05) + this.nMaxTime / this.nMaxTime));
					
			//	var ww = this.nW / 1.0 + (this.nCount * 2.0);
			//	var hh = this.nH / 1.0 + (this.nCount * 2.0);
		        this.sCtx.globalAlpha = 1.0;
				
				if(this.nCrsFlg)
				{
		        	this.sCtx.clearRect (this.nX - (vTargetW / 2) + this.nW / 2, 
		 								 this.nY - (vTargetH / 2) + this.nH / 2, vTargetW, vTargetH);
				}
		        this.sCtx.globalAlpha = this.nA;
		        this.sCtx.drawImage(this.sImage, 
									 this.nX - (vTargetW / 2) + this.nW / 2, 
		 							 this.nY - (vTargetH / 2) + this.nH / 2, vTargetW, vTargetH);
		        this.sCtx.globalAlpha = 1.0;
			}
			else
			{
				this.nWork 		= G_EFFECT_WORK.B;
				this.nMaxTime   *= 2;
				this.nNowTime   = this.nMaxTime;
				
			}
		}
		if(this.nWork == G_EFFECT_WORK.B)
		{
			if(this.nNowTime > 0)
			{	
				this.nNowTime --;
				this.nCount += 1;
				
				// 描画
				var vTargetW = (this.nW * ((this.nNowTime * 0.05) + this.nMaxTime / this.nMaxTime));
				var vTargetH = (this.nH * ((this.nNowTime * 0.05) + this.nMaxTime / this.nMaxTime));
					
			//	var ww = this.nW / 1.0 + (this.nCount * 2.0);
			//	var hh = this.nH / 1.0 + (this.nCount * 2.0);
		        this.sCtx.globalAlpha = 1.0;
				if(this.nCrsFlg)
				{
		      	  this.sCtx.clearRect( this.nX - (vTargetW / 2) + this.nW / 2, 
		 							   this.nY - (vTargetH / 2) + this.nH / 2, vTargetW, vTargetH);
				}
		        this.sCtx.globalAlpha = this.nA;
		        this.sCtx.drawImage(this.sImage, 
									 this.nX - (vTargetW / 2) + this.nW / 2, 
		 							 this.nY - (vTargetH / 2) + this.nH / 2, vTargetW, vTargetH);
		        this.sCtx.globalAlpha = 1.0;
			}
			else
			{
				this.bEnd = true;
				if(this.nCrsW != 0 && this.nCrsW != 0)
				{
					this.sCtx.clearRect(0, 0, this.nCrsW, this.nCrsH);
				}
				if(this.EndCallBack != null) { this.EndCallBack(this); }
				return false;
			}		
		}
	}
	return true;
};


function GSetupEffect()
{
	g_sEffectObject = new Array();
	g_nArrowCounterL = 0;
	g_nArrowCounterR = 0;
}
function GGetEffectNum() { return g_sEffectObject.length; }

// すべて実行
function GExecEffect()
{
	//var iNum = g_sEffectObject.length;
	for(var i = 0; i < g_sEffectObject.length; i ++)
	{
		if(g_sEffectObject[i].Exec() == false) { g_sEffectObject.splice(i, 1); i --; }
	}
}

// エフェクトの追加
function AddScaleZoomEffect(ctx, image, x, y, w, h, a)
{
	var no = g_sEffectObject.length;
	g_sEffectObject[no] = new GEffectData();
	g_sEffectObject[no].SetScaleZoomEffect(ctx, image, x, y, w, h, a);
	return g_sEffectObject[no];
}

// 耐久値の表示
var nMinHpWakuW  = 2;
var nMaxHpWakuW  = 90 + 2
var nHpSizeWakuH = 2;
var nHpSizeNAKAH = nHpSizeWakuH/* - 1*/;
function DrawHp(ctx, x, y, hp)
{
	// STAMP_LIFE_MAX = 90
	// 
	//
	hp *= 2;
	
	// 枠
	ctx.globalAlpha = 1.0;	
	ctx.fillStyle = 'rgb(128, 128, 128)';
	ctx.beginPath();
	ctx.moveTo(x - nMinHpWakuW, y - nHpSizeWakuH);
	ctx.lineTo(x + nMaxHpWakuW, y - nHpSizeWakuH);
	ctx.lineTo(x + nMaxHpWakuW, y + nHpSizeWakuH);
	ctx.lineTo(x - nMinHpWakuW, y + nHpSizeWakuH);
	ctx.closePath();
	ctx.fill();
	if(hp == 0) { return; }
	
	// 15回中
	// 3回
	if(18 >= hp)
	{
		ctx.fillStyle = 'rgb(255, 0, 0)';
	}
	// 15回
	else if(45 >= hp)
	{
		ctx.fillStyle = 'rgb(255, 255, 0)';
	}
	else
	{
		ctx.fillStyle = 'rgb(0, 255, 0)';
	}	
	ctx.beginPath();
	ctx.moveTo(x, 		y - nHpSizeNAKAH);
	ctx.lineTo(x + hp, 	y - nHpSizeNAKAH);
	ctx.lineTo(x + hp, 	y + nHpSizeNAKAH);
	ctx.lineTo(x, 		y + nHpSizeNAKAH);
	ctx.closePath();
	ctx.fill();	
}

