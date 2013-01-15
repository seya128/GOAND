// ショップで扱うデータベース

// -------------------------------------
// ブラウザサイズ
// -------------------------------------
var BROWSER_HEIGHT		= 0;
var BROWSER_WIDTH		= 0;
var BROWSER_RATE		= 0;
var BROWSER_SCREEN_H	= 0;

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


// ------------------------------------------------------
// セーブキー
// ------------------------------------------------------
var g_saveDataKeyHaveStampData    	= "HaveStampData";			// スタンプデータ
var g_saveDataKeyHaveSheetData    	= "HaveSheetData";			// シートデータ
var g_saveDataKeyActiveSheetIndex 	= "ActiveSheetIndex";		// アクティブなシート番号
var g_saveDataKeyActiveStampIndex 	= "ActiveStampIndex";		// アクティブなシート番号
var g_saveDataKeyCoin 				= "HaveCoin";				// コインの数
var g_saveDataKeyStampDrawDara 		= "DrawStampData";			// 描画されたシートごとのスタンプ
var g_saveTutorialKey				= "SaveTutorialKey";

// -------------------------------------
// チュートリアルフラグ
// -------------------------------------
// なし→ごはん→ショップ→スタンプ
var gTUTORIAL_STATUS = 
{
	NONE:		0,		// なし
	GOHAN:		1,		// ごはん
	SHOP:		2,		// ショップ
	STAMP:		3,		// スタンプ
	END:		4		// スタンプが終わったあと
};
var g_TutorialStatus = gTUTORIAL_STATUS.NONE;
function SetTutorialStatus(flg)
{
	g_TutorialStatus = flg;
}

// チュートリアルを見てないかフラグの取得
function GetTutorialLookFlg() 
{
//	return true;
	var data = localStorage.getItem(g_saveTutorialKey);
	if (!data) { return false; }
	return JSON.parse(data);
}

function SaveTutorialLookFlg(flg) 
{
	localStorage.setItem(g_saveTutorialKey, JSON.stringify(flg));
	console.log("Save" + g_saveTutorialKey);
}

function DeleteTutorialLookFlg() 
{
	localStorage.removeItem(g_saveTutorialKey);
}

function DEBUG_TUTORIAL()
{
	// ショップから
	g_TutorialStatus = gTUTORIAL_STATUS.SHOP;
	// データをすべて削除
	AllDelHasSheet();
	// データをすべて削除
	AllDelHasStamp();
	// 現状のデータをすべて削除
	DeleteHaveStampData();
	// 現状のデータをすべて削除
	DeleteHaveSheetData();

	// 開始
	SetTutorialFlg(true);
	// ショップチュートリアルを開始
	g_TutorialShopFlg     	= gTUTORIAL_SHOPFLG.INIT_WAIT;
	g_TutorialNextShopFlg 	= gTUTORIAL_SHOPFLG.NON;
	// スタンプセレクト開始
	g_TutorialSelectFlg     = gTUTORIAL_SELECTFLG.INIT_WAIT;
	g_TutorialNextSelectFlg = gTUTORIAL_SELECTFLG.NON;
	// メインチュートリアル開始
	g_TutorialMainFlg     	= gTUTORIAL_MAINFLG.INIT_WAIT;
	g_TutorialNextMainFlg 	= gTUTORIAL_MAINFLG.NON;	
	
	// プリンゲット
	AddHasStamp(gStampEnum.PURIN - M_OFFSET_STAMP, STAMP_LIFE_MAX);	
	// お子様ランチゲット
	AddHasSheet(gStampEnum.GOHAN_01);
	
}

// -------------------------------------
// スタンプのサイズ
// -------------------------------------
var STAMP_W = 160;
var STAMP_H = 160;

// -------------------------------------
// リダクションサイズを設定する「処理を軽くするためサムネイル」
// -------------------------------------
/*
var REDUCTION_SIZE = 2.0;
var SCREEN_WIDTH   = 640;
var SCREEN_HEIGHT  = 1200;
var CANVAS_WIDTH   = SCREEN_WIDTH  / REDUCTION_SIZE;
var CANVAS_HEIGHT  = SCREEN_HEIGHT / REDUCTION_SIZE;
*/

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
	KAMI_NIKU:		121,			// 肉の神様
	KAMI_SIITAKE:	122,			// シイタケの神様
	KAMI_TAMANEGI:	123,			// 玉ねぎの神様		
	KAMI_NINZIN:	124,			// 人参の神様
	KAMI_SAKANA:	125,			// 魚の神様

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
var gShopBuyListTable = new Array();
var M_MAX_BUY_LIST = 0;
function GetMaxBuyScl()
{
	return -(MAX_SHOP_PANEL_START_Y + (MAX_SHOP_PANEL_HEIGHT * (M_MAX_BUY_LIST / 3)) - (MAX_SHOP_PANEL_HEIGHT * 3));
}
function SetupShopAllData()
{
	// すべて削除
	AllDelShopData();
	// デバッグチュートリアル
	//DEBUG_TUTORIAL();
	// チュートリアル実行中
	if(GetTutorialFlg())
	{
		// ごはん系
		AddShopData(gStampEnum.GOHAN_01, 	5);	// ごはん1
		AddShopData(gStampEnum.GOHAN_02, 	5);	// ごはん2
		AddShopData(gStampEnum.GOHAN_03, 	5);	// ごはん3
		AddShopData(gStampEnum.NIKU,    	3);	// ハンバーグ
		AddShopData(gStampEnum.PURIN,    	3);	// プリン
		AddShopData(gStampEnum.SUPA,     	3);	// スパゲティ
	}
	// それ以外
	else
	{
		// ごはん系
		AddShopData(gStampEnum.GOHAN_01, 	5);	// ごはん1
		AddShopData(gStampEnum.GOHAN_02, 	5);	// ごはん2
		AddShopData(gStampEnum.GOHAN_03, 	5);	// ごはん3
		AddShopData(gStampEnum.NIKU,    	3);	// ハンバーグ
		AddShopData(gStampEnum.PURIN,    	3);	// プリン
		AddShopData(gStampEnum.SUPA,     	3);	// スパゲティ
	 	//AddShopData(gStampEnum.HATA,     3);	// お子様の旗
		//AddShopData(gStampEnum.ONIGIRI,  3);	// おにぎり
		//AddShopData(gStampEnum.HURAI,    3);	// エビフライ
		//AddShopData(gStampEnum.TAKO,     3);	// タコ
		//AddShopData(gStampEnum.KYUURI,   3);	// きゅうり
		//AddShopData(gStampEnum.REMON,    3);	// レモン	
		
		// シンコ様セット
		AddShopData(gStampEnum.SINKO_01,		5);	// シンコ様1
		AddShopData(gStampEnum.SINKO_02,		5);	// シンコ様2
		AddShopData(gStampEnum.SINKO_03,		5);	// シンコ様3   
		AddShopData(gStampEnum.SIN_BAMU,		3);	// バーム
		AddShopData(gStampEnum.SIN_CHOCO,		3);	// チョコ
		//AddShopData(gStampEnum.SIN_HEART,		3);	// ハート
		//AddShopData(gStampEnum.SIN_KAI,		3);	// 貝
		//AddShopData(gStampEnum.SIN_SIKAKU,	3);	// 四角
		//AddShopData(gStampEnum.SIN_MARU,		3);	// 丸
		AddShopData(gStampEnum.SIN_SAMA,		3);	// シンコ様
		//AddShopData(gStampEnum.SIN_AME,		3);	// 飴
		//AddShopData(gStampEnum.SIN_HAZIKI,	3);	// はじきみたいな

	    
		// 空の上系
		//AddShopData(gStampEnum.SKY_01, 	5);	// 空の上1
		//AddShopData(gStampEnum.SKY_02,	5);	// 空の上2
		//AddShopData(gStampEnum.SKY_03,	5);	// 空の上3
		//AddShopData(gStampEnum.KUMO,		3);	// 雲
		//AddShopData(gStampEnum.HUUSEN,	3);	// 風船
		//AddShopData(gStampEnum.HANA,		3);	// チューリップ
		//AddShopData(gStampEnum.RINGO,		3);	// リンゴ
		//AddShopData(gStampEnum.BANANA,	3);	// バナナ
		//AddShopData(gStampEnum.HIKOUKI,	3);	// 飛行機
		//AddShopData(gStampEnum.TAMANEGI,	3);	// たまねぎ
		//AddShopData(gStampEnum.EDAMAME,	3);	// 枝豆
		//AddShopData(gStampEnum.TOMATO,	3);	// トマト
	         
	    // 神様
		AddShopData(gStampEnum.KAMI_PIMAN,			2);	// ピーマンの神様   
		AddShopData(gStampEnum.KAMI_NASU,			2);	// ナスの神様
		AddShopData(gStampEnum.KAMI_TOMATO,			2);	// トマトの神様 
		//AddShopData(gStampEnum.KAMI_NIKU,			2);	// 肉の神様	
		//AddShopData(gStampEnum.KAMI_SIITAKE,		2);	// シイタケの神様
		//AddShopData(gStampEnum.KAMI_TAMANEGI,		2);	// 玉ねぎの神様 	
		//AddShopData(gStampEnum.KAMI_NINZIN,		2);	// 人参の神様     
		//AddShopData(gStampEnum.KAMI_SAKANA,		2);	// 魚の神様
	}
}

function M_PRINT(sData)
{
//	document.getElementById("memory").innerHTML = "<font color='white'>" + sData + "</font>";
}
function M_PRINTB(sData)
{
//	document.getElementById("memory").innerHTML = "<font color='black'>" + sData + "</font>";
}
function M_PRINTR(sData)
{
//	document.getElementById("memory").innerHTML = "<font color='red'>" + sData + "</font>";
}


function PresentTutorialStampData()
{
	// 現状のデータをすべて削除
	DeleteHaveStampData();
	// ハンバーグゲット
	AddHasStamp(gStampEnum.NIKU  - M_OFFSET_STAMP, STAMP_LIFE_MAX);
	// プリンゲット
	AddHasStamp(gStampEnum.PURIN - M_OFFSET_STAMP, STAMP_LIFE_MAX);	
	// ミニパスタゲット
	AddHasStamp(gStampEnum.SUPA  - M_OFFSET_STAMP, STAMP_LIFE_MAX);
	// セーブ
	SaveHaveStampData();
	
	// お金ゲット
	SetCoin(30);
}
function PresentTutorialSheetData()
{
	// 現状のデータをすべて削除
	DeleteHaveSheetData();
	// お子様ランチゲット
	AddHasSheet(gStampEnum.GOHAN_01);
	// セーブ
	SaveHaveSheetData();
}
function AddShopData(id, gold)
{
	var sData = {"id":id , "gold":gold };
	M_MAX_BUY_LIST = gShopBuyListTable.length
	gShopBuyListTable[M_MAX_BUY_LIST] = sData;
	M_MAX_BUY_LIST ++;
}

// スタンプシートの全て削除
function AllDelShopData()
{ 
	gShopBuyListTable.splice(0);
}

// ------------------------------------------------------
// グラフィックデータ
// ------------------------------------------------------
var g_StampGraphicNum    = (M_MAX_SHEET + M_MAX_STAMP);
var g_StampGraphicHandle = null;
var g_SheetGraphicHandle = null;
var g_StampDrawData		 = null;


// ----------------------------------------------------
// チュートリアル[ショップとスタンプのみ有効]
// ----------------------------------------------------
var g_TutorialFlg     = false
function SetTutorialFlg(flg)
{
	g_TutorialFlg = flg;
}
function GetTutorialFlg()
{
	return g_TutorialFlg;
}
// チュートリアル終了
function EndTutorial()
{
	CheckTutorial();
}
// チュートリアル中なら解除する
function CheckTutorial()
{
	if(GetTutorialFlg())
	{
		// 解除
		SetTutorialStatus(gTUTORIAL_STATUS.END);
		SetTutorialFlg(0);
		g_TutorialShopFlg 		= gTUTORIAL_SHOPFLG.NONE;
		g_TutorialNextShopFlg 	= gTUTORIAL_SHOPFLG.NON;	
		g_TutorialSelectFlg 	= gTUTORIAL_SELECTFLG.NONE;
		g_TutorialNextSelectFlg = gTUTORIAL_SELECTFLG.NON;	
		g_TutorialMainFlg     	= gTUTORIAL_MAINFLG.NONE;
		g_TutorialNextMainFlg 	= gTUTORIAL_MAINFLG.NON;
		
		// 初めてならプレゼントをもらう
		if(GetTutorialLookFlg() == false)
		{
			AllDeleteStampDrawData();
			PresentTutorialStampData();
			PresentTutorialSheetData();
			g_TutorialOneLook = true;
		}
		// 違ったら今までのデータを復元
		else
		{
			// コインのロード処理
			LoadCoin();
			// シートのロード処理
			if(LoadHaveSheetData() == true)
			{
			}
			// 失敗なので新規ロード
			else
			{
				DummySheetDataSet();
				SaveActiveSheetIndex(0);
			}	
			// スタンプのロード処理
			if(LoadHaveStampData() == true)
			{
			}
			// 失敗なので新規ロード
			else
			{
				DummyStampDataSet();
				SaveActiveStampIndex(0);
			}				
		}
	}
}
function StartTutorial()
{
	// ストレージのフラグを見てチュートリアルかをチェックする
	if(g_TutorialStatus != gTUTORIAL_STATUS.NONE)
	{
		// ショップから
		g_TutorialStatus = gTUTORIAL_STATUS.SHOP;
		// データをすべて削除
		AllDelHasSheet();
		// データをすべて削除
		AllDelHasStamp();
		
		// 開始
		SetTutorialFlg(true);
		// ショップチュートリアルを開始
		g_TutorialShopFlg     	= gTUTORIAL_SHOPFLG.INIT_WAIT;
		g_TutorialNextShopFlg 	= gTUTORIAL_SHOPFLG.NON;
		// スタンプセレクト開始
		g_TutorialSelectFlg     = gTUTORIAL_SELECTFLG.INIT_WAIT;
		g_TutorialNextSelectFlg = gTUTORIAL_SELECTFLG.NON;
		// メインチュートリアル開始
		g_TutorialMainFlg     	= gTUTORIAL_MAINFLG.INIT_WAIT;
		g_TutorialNextMainFlg 	= gTUTORIAL_MAINFLG.NON;
	}
}

// -------------------------------------
// ショップチュートリアル
// -------------------------------------
var gTUTORIAL_SHOPFLG = 
{
	NON:					-1,	// なし
	NONE:					0,	// 何も
	INIT_WAIT:				1,	// 初めのウェイト(2秒)
	SHEET_BUY_MESSAGE:		2,	// シート買ってみよう(メッセージ)
	SHEET_BUY_SELECT:		3,	// シート買ってみよう(セレクト)「ランチノーマル以外は押せない」
	SHEET_BUY_SELECT_WAIT:	4,	// シート買ってみよう(購入待ち)
	STAMP_BUY_MESSAGE:		5,	// スタンプ買ってみよう(メッセージ)
	STAMP_BUY_SELECT:		6,	// スタンプ買ってみよう(セレクト)「プリン以外は押せない」
	STAMP_BUY_SELECT_WAIT:	7,	// スタンプ買ってみよう(購入待ち)
	BACK_MESSAGE:			8,	// もどる(メッセージ)
	BACK_SELECT:			9,	// もどる(セレクト)「もどる以外は押せない」
};

var g_TutorialShopFlg     = gTUTORIAL_SHOPFLG.NONE;
var g_TutorialNextShopFlg = gTUTORIAL_SHOPFLG.NON;

// -------------------------------------
// スタンプセレクト画面のチュートリアル
// -------------------------------------
var gTUTORIAL_SELECTFLG = 
{
	NON:					-1,	// なし
	NONE:					0,	// 何も
	INIT_WAIT:				1,	// 初めのウェイト(2秒)
	SHEET_TOUCH_MESSAGE:	2,	// シートタッチしてください(メッセージ)
	SHEET_TOUCH_NEXT:		3,	// シートタッチで進む
};

var g_TutorialSelectFlg     = gTUTORIAL_SELECTFLG.NONE;
var g_TutorialNextSelectFlg = gTUTORIAL_SELECTFLG.NON;

// -------------------------------------
// スタンプセレクト画面のチュートリアル
// -------------------------------------
var gTUTORIAL_MAINFLG = 
{
	NON:					-1,	// なし
	NONE:					0,	// 何も
	INIT_WAIT:				1,	// 初めのウェイト(2秒)
	STAMP_TOUCH_SELECT:		2,	// スタンプをタッチして選んでね
	SHEET_TOUCH_WRITE_MES:	3,	// スタンプをタッチして選んでね
	SHEET_TOUCH_WRITE:		4,	// シートにスタンプを押してね
	STAMP_TOUCH_DEAD:		5,	// スタンプがなくなった
	STAMP_TOUCH_DEAD_2:		6,	// スタンプがなくなった
	STAMP_TOUCH_DEAD_WAIT:	7,	// スタンプがなくなった
	MENU_SELECT:			8,	// メニューセレクト
	MENU_WAIT:				9,	// メニュー表示にて少し待つ
	STAMP_CLEAR:			10,	// スタンプをクリア
	STAMP_CLEAR_WINDOW:		11,	// クリア確認ウィンドウ
	MENU_SELECT_END:		12,	// メニューセレクト	
	//MENU_SELECT_END:		13,	// メニューセレクトにて少し待つ
	BACK:					14,	// 戻る
};

var g_TutorialMainFlg     = gTUTORIAL_MAINFLG.NONE;
var g_TutorialNextMainFlg = gTUTORIAL_MAINFLG.NON;

// ------------------------------------------------------
// データの取得
// ------------------------------------------------------
function GetSheetGraphicHandle_Image(no)
{
	return g_SheetGraphicHandle[no].m_Image;
}

function GetStampGraphicHandle_Image(no)
{
	return g_StampGraphicHandle[no].m_Image;	
}

function GetStampSheetGraphicImage(no)
{
	if(no >= M_OFFSET_STAMP) { return g_StampGraphicHandle[no - M_OFFSET_STAMP].m_Image; }
	return g_SheetGraphicHandle[no].m_Image;
}

// -------------------------------------
// スタンプのロードクラス
// -------------------------------------
function GStampGraphic()
{
	this.m_ImageNo 	= -1;
    this.m_Image	= new Image();	// イメージクラス
}
// -------------------------------------
// スタンプのローダー
// -------------------------------------
GStampGraphic.prototype.LoadImage = function(eStampEnum)
{
	// 自分のポインタ
    var _this  = this;
	var iIndex = eStampEnum;
	
	if(M_MAX_SHEET <= iIndex)
	{
    	this.m_Image.src = gStampImgFileName[iIndex - M_MAX_SHEET];
	}
	else
	{
    	this.m_Image.src = gStampBgFileName[iIndex];
	}
    this.m_ImageNo   = iIndex;
};

// ------------------------------------------------------
// 持ってるスタンプ[セーブ対象]
// スタンプの追加は「StampMain.jsのLoad()」へ移動
// ------------------------------------------------------

// スタンプの最大回数
var STAMP_LIFE_MAX = 3 * 1;	// 45
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


// グラフィックロード
var g_sGraphicLoadFlg			= new LoadingObject("g_sGraphicLoadFlg");
var g_sStampLoadFlg				= new LoadingObject("g_sStampLoadFlg");
var g_sSheetLoadFlg				= new LoadingObject("g_sSheetLoadFlg");
var g_sShopLoadFlg				= new LoadingObject("g_sShopLoadFlg");
var g_sTutorialLoadFlg			= new LoadingObject("g_sTutorialLoadFlg");

function GetFileName(file_url)
{
	file_url = file_url.substring(file_url.lastIndexOf("/")+1,file_url.length)
	//拡張子も取り除く場合は次の行のコメントアウトをはずしてください
	//file_url = file_url.substring(0,file_url.indexOf("."));
	return file_url;
}

// スタンプ描画データクラス
function CallBackStatus(sObject) 
{
}

// スタンプ描画データクラス
function LoadingObject(name) 
{
	this.strName  = name;
	this.bLoadFlg = false;
	this.aImage   = [];
	this.aLoad    = [];
	this.iLength  = 0;

    this.AddLoadFile = function(img)
	{
		this.aLoad[this.iLength]  			= false;
		this.aImage[this.iLength] 			= img;
		this.aImage[this.iLength].Unique	= GetFileName(this.aImage[this.iLength].src);
		this.bLoadFlg 						= false;
	//	var _this = this;
	//	img.onload = function() 
	//	{ 
	//		_this.aLoad[this.iLength] = true;
	//	} 
		
		this.iLength ++;
    };	
    this.AddLoadFileEx = function(img, name)
	{
		img.src = name;
		this.aLoad[this.iLength]  			= false;
		this.aImage[this.iLength] 			= img;
		this.aImage[this.iLength].Unique	= name;
		this.bLoadFlg 						= false;
		
	//	var _this = this;
	//	img.onload = function() 
	//	{ 
	//		_this.aLoad[this.iLength] = true;
	//	} 
		
		this.iLength ++;
    };	
	this.Delete = function()
	{
	    for(var i = 0; i < this.iLength; i ++)
		{
			this.aLoad[i]  	= false;
			this.aImage[i] 	= null;
	    }		
		this.bLoadFlg = false;
		this.iLength  = 0;
	}
	
	this.CallBackStatus = function()
	{
	    var iCount = 0;
	    for(var i = 0; i < this.iLength; i ++)
		{
			if(this.aImage[i].complete) { this.aLoad[i] = true; iCount ++; }
	    	//if(this.aLoad[i]) { /*this.aLoad[i] = true;*/ iCount ++; }
	    }
		// ロード完了
		if(iCount == this.iLength) { this.bLoadFlg = true; return; }
		// 待つ
		setTimeout(this.strName + ".CallBackStatus()", 200);
	}
	
	this.Loading = function()
	{
		// ロード完了している
		if(this.bLoadFlg) { return; }
		this.CallBackStatus();
	}
	
	this.GetCompleteUnique = function(no)
	{
	    for(var i = 0; i < this.iLength; i ++)
		{
	    	if(no == this.aImage[i].Unique) 
			{ 
				if(this.aLoad[i]) { return true; }
				return false;
			}
	    }			
		return false;
	}	
	this.GetDump = function()
	{
	    var iCount = 0;
	    for(var i = 0; i < this.iLength; i ++)
		{
	    	if(this.aLoad[i]) { iCount ++; }
	    }	
		var strLoad = "--- ロード数 --- [" + iCount + "/" + this.iLength + "]<br>";
		
	    for(var i = 0; i < this.iLength; i ++)
		{
	    	if(!this.aLoad[i])
			{
				strLoad = strLoad + "[Loading]:" +  this.aImage[i].Unique + "<br>";
			}
			else
			{
				strLoad = strLoad + "[Complete]:" + this.aImage[i].Unique + "<br>";				
			}
	    }		
		
		
		return strLoad;
	}
}

function SafeDrawSheet(ctx, img, x, y, w, h)
{
	if(g_sSheetLoadFlg.GetCompleteUnique(img.Unique) == false) { return false; }
	ctx.drawImage(img, x, y, w, h);
	return true;
}
// 画像xywh
// 座標xywh
function SafeDrawSheetEx(ctx, img, cx, cy, cw, ch, sx, sy, sw, sh)
{
	if(g_sSheetLoadFlg.GetCompleteUnique(img.Unique) == false) { return false; }
	ctx.drawImage(img, cx, cy, cw, ch, sx, sy, sw, sh);
	return true;
}

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
	// チュートリアル実行中
	if(GetTutorialFlg())
	{
		this.sDataInfo = new Array();
		this.sDataNum  = 0;
	}
	else
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
		console.log("ロード: " + key)
	}
};

// セーブ
StampDrawData.prototype.Save = function() 
{
	// チュートリアル実行中
	if(GetTutorialFlg())
	{
	}
	else
	{	
		var key = this.GetSaveKey(this.nSheetIndex);
		localStorage.setItem(key, JSON.stringify(this.sDataInfo));
		console.log("セーブ: " + key);
	}
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
function LoadStampSheetData(no)
{
	// スタンプ
	if(no >= M_OFFSET_STAMP)
	{
		no -= M_OFFSET_STAMP; 
		if(g_StampGraphicHandle[no] == null)
		{
			g_StampGraphicHandle[no] = new GStampGraphic();
			g_StampGraphicHandle[no].LoadImage(no + M_MAX_SHEET);
			g_sStampLoadFlg.AddLoadFile(g_StampGraphicHandle[no].m_Image);		
		}
	}
	// シート
	else
	{
		if(g_SheetGraphicHandle[no] == null)
		{
			g_SheetGraphicHandle[no] = new GStampGraphic();
			g_SheetGraphicHandle[no].LoadImage(no);
			g_sSheetLoadFlg.AddLoadFile(g_SheetGraphicHandle[no].m_Image);	
		}
	}
}

function LoadSheetGraphic()
{
	// ２度読み禁止
	if(g_SheetGraphicHandle == null)
	{
	    g_SheetGraphicHandle = new Array();
	}		

	// チュートリアル実行中
	if(GetTutorialFlg())
	{
		// シート
		LoadStampSheetData(gStampEnum.GOHAN_01);	// ごはん1
		LoadStampSheetData(gStampEnum.GOHAN_02);	// ごはん2
		LoadStampSheetData(gStampEnum.GOHAN_03);	// ごはん3
	}
	// それ以外
	else
	{
		// シート
		LoadStampSheetData(gStampEnum.GOHAN_01);	// ごはん1
		LoadStampSheetData(gStampEnum.GOHAN_02);	// ごはん2
		LoadStampSheetData(gStampEnum.GOHAN_03);	// ごはん3
		LoadStampSheetData(gStampEnum.SINKO_01);	// シンコ様1
		LoadStampSheetData(gStampEnum.SINKO_02);	// シンコ様2
		LoadStampSheetData(gStampEnum.SINKO_03);	// シンコ様3   
	}
	// ローディング開始
	g_sSheetLoadFlg.Loading();	
}

function LoadStampGraphic()
{
	// ２度読み禁止
	if(g_StampGraphicHandle == null)
	{
		// 作成
	    g_StampGraphicHandle = new Array();
	}
			
	// チュートリアル実行中
	if(GetTutorialFlg())
	{
		// スタンプ
		LoadStampSheetData(gStampEnum.NIKU);		// ハンバーグ
		LoadStampSheetData(gStampEnum.PURIN);		// プリン
		LoadStampSheetData(gStampEnum.SUPA);		// スパゲティ
	}
	// それ以外
	else
	{
		// スタンプ
		LoadStampSheetData(gStampEnum.NIKU);		// ハンバーグ
		LoadStampSheetData(gStampEnum.PURIN);		// プリン
		LoadStampSheetData(gStampEnum.SUPA);		// スパゲティ
		LoadStampSheetData(gStampEnum.SIN_BAMU);	// バーム
		LoadStampSheetData(gStampEnum.SIN_CHOCO);	// チョコ
		LoadStampSheetData(gStampEnum.SIN_SAMA);	// シンコ様		
		LoadStampSheetData(gStampEnum.KAMI_PIMAN);	// ピーマンの神様   
		LoadStampSheetData(gStampEnum.KAMI_NASU);	// ナスの神様
		LoadStampSheetData(gStampEnum.KAMI_TOMATO);	// トマトの神様 
	}
	// ローディング開始
	g_sStampLoadFlg.Loading();
}

// 周りのみ読み込み
function LoadPrevNextSheetGraphic(select)
{
	// ２度読み禁止
	if(g_SheetGraphicHandle == null)
	{
	    g_SheetGraphicHandle = new Array();
	}	
	if(select >= 0 && g_HaveStampSheetData.length > 0)
	{
		var nowid = g_HaveStampSheetData[select]["id"];
		LoadStampSheetData(nowid);

		if(select > 0) 
		{ 
			var previd = g_HaveStampSheetData[select - 1]["id"];		
			LoadStampSheetData(previd); 
		}
		if(select + 1 < g_HaveStampSheetData.length)
		{
			var nextid = g_HaveStampSheetData[select + 1]["id"];		
			LoadStampSheetData(nextid); 
		}
	}
	// ローディング開始
	g_sSheetLoadFlg.Loading();	
}
// 周りのみ読み込み
function LoadSelectSheetGraphic(select)
{
	// ２度読み禁止
	if(g_SheetGraphicHandle == null)
	{
	    g_SheetGraphicHandle = new Array();
	}	
	if(select >= 0 && g_HaveStampSheetData.length > 0)
	{
		var nowid = g_HaveStampSheetData[select]["id"];
		LoadStampSheetData(nowid);
	}
	// ローディング開始
	g_sSheetLoadFlg.Loading();	
}


// ------------------------------------------------------
// 描画データのロード
// ------------------------------------------------------
function AllLoadStampDrawData()
{
	// 一応毎回ロードする
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
	if(g_Coin > 999)    { g_Coin = 999; }
	if(g_Coin < 0)      { g_Coin = 0;   }
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
	// チュートリアル実行中
	if(GetTutorialFlg()) { return; }
	localStorage.setItem(g_saveDataKeyCoin, JSON.stringify(g_Coin));
	console.log("Save" + g_saveDataKeyCoin);
}
// 全削除
function DeleteCoin() 
{
	// チュートリアル実行中
	if(GetTutorialFlg()) { return; }
	localStorage.removeItem(g_saveDataKeyCoin);
	SetCoin(g_DefaultCoin);
}
// ロード
function LoadCoin() 
{
	// チュートリアル実行中
	if(GetTutorialFlg()) { return true; }
	var data = localStorage.getItem(g_saveDataKeyCoin);
	if (!data) { return false; }
	
	g_Coin = JSON.parse(data);
	return true;
}


// ------------------------------------------------------
// スタンプ操作
// ------------------------------------------------------
// 何枚持っているか？
function GetStampNum(id)
{
	var iNum = 0;
	for(var i = 0; i < g_HaveStampImageData.length; i ++)
	{
		if(g_HaveStampImageData[i]["id"] == id) { iNum ++; }
	}
	return iNum;
}

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
	// チュートリアル実行中
	if(GetTutorialFlg()) { return; }
	PresentTutorialStampData();
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
	AddCoin(coin);
	//g_Coin += coin;
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
	// チュートリアル実行中
	if(GetTutorialFlg()) { return true; }
	var data = localStorage.getItem(g_saveDataKeyHaveStampData);
	if (!data) { return false; }
	
	g_HaveStampImageData = JSON.parse(data);
	return true;
}
// 全セーブ
function SaveHaveStampData() 
{
	// チュートリアル実行中
	if(GetTutorialFlg()) { return; }
	localStorage.setItem(g_saveDataKeyHaveStampData, JSON.stringify(g_HaveStampImageData));
	console.log("Save" + g_saveDataKeyHaveStampData);
}
// 全削除
function DeleteHaveStampData() 
{
	// チュートリアル実行中
	if(GetTutorialFlg()) { return; }
	localStorage.removeItem(g_saveDataKeyHaveStampData);
	AllDelHasStamp();
	SaveHaveStampData();
}

// ------------------------------------------------------
// シート操作
// ------------------------------------------------------
// 何枚持っているか？
function GetSheetNum(id)
{
	var iNum = 0;
	for(var i = 0; i < g_HaveStampSheetData.length; i ++)
	{
		if(g_HaveStampSheetData[i]["id"] == id) { iNum ++; }
	}
	return iNum;
}

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
	// チュートリアル実行中
	if(GetTutorialFlg()) { return; }
	PresentTutorialSheetData();
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
	AddCoin(coin);
	//g_Coin += coin;
	// セーブ
	SaveHaveSheetData();	
	return true;
}
// 削除し、一番近いシートをアクティブにする[デバッグ用]
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
	// チュートリアル実行中
	if(GetTutorialFlg()) { return true; }
	var data = localStorage.getItem(g_saveDataKeyHaveSheetData);
	if (!data) { return false; }
	
	g_HaveStampSheetData = JSON.parse(data);
	return true;
}

function SaveHaveSheetData() 
{
	// チュートリアル実行中
	if(GetTutorialFlg()) { return; }
	localStorage.setItem(g_saveDataKeyHaveSheetData, JSON.stringify(g_HaveStampSheetData));
	console.log("Save" + g_saveDataKeyHaveSheetData);
}

function DeleteHaveSheetData() 
{
	// チュートリアル実行中
	if(GetTutorialFlg()) { return; }
	localStorage.removeItem(g_saveDataKeyHaveSheetData);
	AllDelHasSheet();
	SaveHaveSheetData() 
}

// アクティブシートのロード
function LoadActiveSheetIndex() 
{
	// チュートリアル実行中
	if(GetTutorialFlg()) { return 0; }
	var sheet = localStorage.getItem(g_saveDataKeyActiveSheetIndex);
	if (!sheet)    sheet = 0;
	return parseInt(sheet);
}
function SaveActiveSheetIndex(sheetno) 
{
	// チュートリアル実行中
	if(GetTutorialFlg()) { return; }
	localStorage.setItem(g_saveDataKeyActiveSheetIndex, sheetno);
	console.log("Save" + g_saveDataKeyActiveSheetIndex);
}

// アクティブシートのロード
function LoadActiveStampIndex() 
{
	// チュートリアル実行中
	if(GetTutorialFlg()) { return 0; }
	var stamp = localStorage.getItem(g_saveDataKeyActiveStampIndex);
	if (!stamp) { stamp = 0; }
	return parseInt(stamp);
}
function SaveActiveStampIndex(sheetno) 
{
	// チュートリアル実行中
	if(GetTutorialFlg()) { return; }
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
var g_ClaerButtonHandle					= null;
var g_TweetBottonHandle					= null;
// 戻る
var g_BackImageHandle					= null;
var g_ArrowLHandle						= null;
var g_ArrowRHandle						= null;
var g_Num0Handle						= null;
var g_Num1Handle						= null;
var g_Num2Handle						= null;
var g_Num3Handle						= null;
var g_Num4Handle						= null;
var g_Num5Handle						= null;
var g_Num6Handle						= null;
var g_Num7Handle						= null;
var g_Num8Handle						= null;
var g_Num9Handle						= null;
var g_NumHandleA						= new Array();
var g_StampMessageBottonHandle			= null;
var g_HaveMessageBottonHandle			= null;
var g_DocumentArrowHandle				= null;
var g_DocumentArrowDHandle				= null;
	
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
	// ２度ロードはしない
	if(g_WindowImageHandle != null) { return; }
	g_WindowImageHandle     				= new Image();
	g_YesNoMessageImageHandle 				= new Image();
	g_YesImageHandle 						= new Image();
	g_NoImageHandle							= new Image();
	g_StampMainWindowImageHandle			= new Image();
	g_StampMainKesuImageHandle				= new Image();
	g_StampMainEndImageHandle				= new Image();
	g_StampMainBackImageHandle				= new Image();
	g_StampMainMenuImageHandle				= new Image();
	g_SheetDeleteMessageImageHandle			= new Image();
	g_BackImageHandle						= new Image();
	g_ArrowLHandle							= new Image();
	g_ArrowRHandle							= new Image();
	g_Num0Handle							= new Image();
	g_Num1Handle							= new Image();
	g_Num2Handle							= new Image();
	g_Num3Handle							= new Image();
	g_Num4Handle							= new Image();
	g_Num5Handle							= new Image();
	g_Num6Handle							= new Image();
	g_Num7Handle							= new Image();
	g_Num8Handle							= new Image();
	g_Num9Handle							= new Image();
	g_ClaerButtonHandle						= new Image();
	g_TweetBottonHandle						= new Image();
	g_SheetMessageHandle					= new Image();
	g_StampMessageBottonHandle				= new Image();
	g_HaveMessageBottonHandle				= new Image();
	g_DocumentArrowHandle					= new Image();
	g_DocumentArrowDHandle					= new Image();
	g_NumHandleA[0] = g_Num0Handle;
	g_NumHandleA[1] = g_Num1Handle;
	g_NumHandleA[2] = g_Num2Handle;
	g_NumHandleA[3] = g_Num3Handle;
	g_NumHandleA[4] = g_Num4Handle;
	g_NumHandleA[5] = g_Num5Handle;
	g_NumHandleA[6] = g_Num6Handle;
	g_NumHandleA[7] = g_Num7Handle;
	g_NumHandleA[8] = g_Num8Handle;
	g_NumHandleA[9] = g_Num9Handle;
	
	
	// ロード
	g_sGraphicLoadFlg.AddLoadFileEx(g_WindowImageHandle, 			 	"img/00_common/g_g01_huk_e000.png");
	g_sGraphicLoadFlg.AddLoadFileEx(g_YesNoMessageImageHandle, 		 	"img/00_common/g_hand_01.png");
	g_sGraphicLoadFlg.AddLoadFileEx(g_YesImageHandle, 				 	"img/00_common/k_btn_a.png");
	g_sGraphicLoadFlg.AddLoadFileEx(g_NoImageHandle, 				 	"img/00_common/k_btn_b.png");
	g_sGraphicLoadFlg.AddLoadFileEx(g_StampMainWindowImageHandle, 	 	"img/08_stamp/s_wak_a000.png");
	g_sGraphicLoadFlg.AddLoadFileEx(g_StampMainKesuImageHandle,	 	 	"img/08_stamp/s_btn_a000.png");
	g_sGraphicLoadFlg.AddLoadFileEx(g_StampMainEndImageHandle, 		 	"img/08_stamp/s_btn_b000.png");
	g_sGraphicLoadFlg.AddLoadFileEx(g_StampMainBackImageHandle, 	 	"img/08_stamp/s_btn_c000.png");
	g_sGraphicLoadFlg.AddLoadFileEx(g_StampMainMenuImageHandle, 	 	"img/08_stamp/s_btn_e000.png");
	g_sGraphicLoadFlg.AddLoadFileEx(g_SheetDeleteMessageImageHandle, 	"img/08_stamp/s_txt_d000.png");
	g_sGraphicLoadFlg.AddLoadFileEx(g_BackImageHandle, 					"img/07_shop/003.png");
	// LR
	g_sGraphicLoadFlg.AddLoadFileEx(g_DocumentArrowHandle, 				"img/10_asobikata/a_obj_a000.png");
	g_sGraphicLoadFlg.AddLoadFileEx(g_DocumentArrowDHandle, 			"img/10_asobikata/a_obj_b000.png");
	g_sGraphicLoadFlg.AddLoadFileEx(g_ArrowLHandle, 					"img/08_stamp/s_hid_a.png");	
	g_sGraphicLoadFlg.AddLoadFileEx(g_ArrowRHandle, 					"img/08_stamp/s_mig_a.png");	
	// 数値	
	g_sGraphicLoadFlg.AddLoadFileEx(g_Num0Handle, 						"img/08_stamp/s_suj_00.png");	
	g_sGraphicLoadFlg.AddLoadFileEx(g_Num1Handle, 						"img/08_stamp/s_suj_01.png");	
	g_sGraphicLoadFlg.AddLoadFileEx(g_Num2Handle, 						"img/08_stamp/s_suj_02.png");	
	g_sGraphicLoadFlg.AddLoadFileEx(g_Num3Handle, 						"img/08_stamp/s_suj_03.png");	
	g_sGraphicLoadFlg.AddLoadFileEx(g_Num4Handle, 						"img/08_stamp/s_suj_04.png");	
	g_sGraphicLoadFlg.AddLoadFileEx(g_Num5Handle, 						"img/08_stamp/s_suj_05.png");	
	g_sGraphicLoadFlg.AddLoadFileEx(g_Num6Handle, 						"img/08_stamp/s_suj_06.png");	
	g_sGraphicLoadFlg.AddLoadFileEx(g_Num7Handle, 						"img/08_stamp/s_suj_07.png");	
	g_sGraphicLoadFlg.AddLoadFileEx(g_Num8Handle, 						"img/08_stamp/s_suj_08.png");	
	g_sGraphicLoadFlg.AddLoadFileEx(g_Num9Handle, 						"img/08_stamp/s_suj_09.png");	
	// 本当に消すボタン
	g_sGraphicLoadFlg.AddLoadFileEx(g_ClaerButtonHandle, 				"img/08_stamp/s_btn_d000.png");		
	g_sGraphicLoadFlg.AddLoadFileEx(g_TweetBottonHandle, 				"img/08_stamp/s_btn_f000.png");		
	
	// シート、スタンプ、持っている
	g_sGraphicLoadFlg.AddLoadFileEx(g_SheetMessageHandle, 				"img/07_shop/o_txt_f.png");		
	g_sGraphicLoadFlg.AddLoadFileEx(g_StampMessageBottonHandle, 		"img/07_shop/o_txt_e.png");		
	g_sGraphicLoadFlg.AddLoadFileEx(g_HaveMessageBottonHandle, 			"img/07_shop/o_txt_g.png");		
	
	
	// ローディング開始
	g_sGraphicLoadFlg.Loading();
}

// 165:165
// 数値の表示
function DrawStrNum(ctx, x, y, num, op0Clear, size, a, space)
{
	var ta = ctx.globalAlpha;
	if(num == 0) 
	{ 
		x += (165 * size) - space;
		x += (165 * size) - space;
		DrawCharNum(ctx, x, y, 0, size, a);
		return;
	}
	for(var i = 100; i >= 1; i /= 10)
	{
		var data = parseInt(num / i);
		if(data < 1) { if(op0Clear) { DrawCharNum(ctx, x, y, 0, size, a); } }
		else
		{
			num -= (data * i);
			DrawCharNum(ctx, x, y, data, size, a);
			op0Clear = true;
		}
		x += (165 * size) - space;
	}
	ctx.globalAlpha = ta;
}
// 数値の表示
function DrawCharNum(ctx, x, y, num, size, a)
{
	if(num < 0 || num > 9) { return; }
	ctx.drawImage(g_NumHandleA[num],
							x - (132 * size),
							y - (132 * size),
							(165 * size), 
							(165 * size));
}

// メニュー
function DrawMenu(ctx, bTrigger, sTouchStartX, sTouchStartY,
								 sTouchMoveX,  sTouchMoveY)
{
	var PosYesX = 495;
	var PosYesY = 0;
	var PosYesW = 122;
	var PosYesH = 160;
	ctx.drawImage(g_StampMainMenuImageHandle,  PosYesX, PosYesY);
	
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
		GPosY + 100);
	
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
	ctx.drawImage(g_StampMainKesuImageHandle, PosYesX, PosYesY);
	ctx.drawImage(g_StampMainEndImageHandle,   PosNoX, PosNoY);
	ctx.drawImage(g_StampMainBackImageHandle,   PosBackX, PosBackY);
		
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
		GPosY + 370 + 25,
		520 * 0.75, 120 * 0.75);
	
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
	ctx.drawImage(g_YesImageHandle, PosYesX, PosYesY);
	ctx.drawImage(g_NoImageHandle,   PosNoX, PosNoY);
	
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
		GPosY + 214);
	ctx.drawImage(g_YesNoMessageImageHandle, 
		128, 
		GPosY + 380);
	
	// ---------------------------------------------------
	// YesNo
	// ---------------------------------------------------
	var PosYesX = 180;
	var PosYesY = 565 + GPosY;
	var PosYesW = 281;
	var PosYesH = 184;
	ctx.globalAlpha = sScaleRate;
	ctx.drawImage(g_YesImageHandle, PosYesX, PosYesY);

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
/*
function DrawBack_Tutorial(ctx)
{
	ctx.globalAlpha = 0.6;
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillRect(0, 0, 640, 1200);
	ctx.globalAlpha = 1.0;
}
*/
var g_nWakuCounter = 0;
function DrawWaku(ctx, x, y, w, h, blink)
{
	if(blink) 
	{ 
		g_nWakuCounter ++;
	}
	else { g_nWakuCounter = 0; }
	
	var val = Math.abs(g_nWakuCounter - 5);
	var a = 1.0 * (1.0 - (val * 0.12));
	if(a > 1.0) { a = 1.0; }
	if(a < 0.6) { a = 0.6; }
	ctx.globalAlpha = a;
	ctx.lineWidth   = 3;
	ctx.strokeStyle="#ff0000";
	ctx.strokeRect(x + val, y + val, w-(val*2), h-(val*2))
	ctx.globalAlpha = 1.0;
}

function DrawDocumentArrow(ctx, x, y, angle)
{
	// 矢印を動かす
	var val = Math.abs(g_nWakuCounter - 5);
	g_nWakuCounter --;
	if(g_nWakuCounter < 0) { g_nWakuCounter = 10; }
	
	// 回転あり矢印
	if(angle != 0)
	{
		ctx.save();
		ctx.translate(x, y + val);							// x, y
		ctx.rotate(angle * Math.PI / 180);  				// 回転
		ctx.drawImage(g_DocumentArrowHandle, 0, 0);
		ctx.restore();
	}
	// 矢印
	else
	{
		ctx.drawImage(g_DocumentArrowHandle, x, y + val);	
	}
}
function DrawDocumentArrowD(ctx, x, y, angle)
{
	// 矢印を動かす
	var val = Math.abs(g_nWakuCounter - 5);
	g_nWakuCounter --;
	if(g_nWakuCounter < 0) { g_nWakuCounter = 10; }
	
	// 回転あり矢印
	if(angle != 0)
	{
		ctx.save();
		ctx.translate(x, y + val);							// x, y
		ctx.rotate(angle * Math.PI / 180);  				// 回転
		ctx.drawImage(g_DocumentArrowHandle, 0, 0);
		ctx.restore();
	}
	// 矢印
	else
	{
		ctx.drawImage(g_DocumentArrowDHandle, x, y + val);	
	}
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
	g_nArrowCounterL = 16;
}
function PuchArrowR()
{
	g_nArrowCounterR = 16;
}
function MoveArrowL()
{
	if(g_nArrowCounterL <= 0) { PuchArrowL(); }
}
function MoveArrowR()
{
	if(g_nArrowCounterR <= 0) { PuchArrowR(); }
}

function DrawArrowL(ctx, x, y)
{
 	var a = 1.0 - (g_nArrowCounterL * 0.035);
	x -= (g_nArrowCounterL * 2);
	ctx.globalAlpha = a;
	ctx.drawImage(g_ArrowLHandle, x - 40, y - 70);
	ctx.globalAlpha = 1.0;	
}
function DrawArrowR(ctx, x, y)
{
 	var a = 1.0 - (g_nArrowCounterR * 0.035);
	x += (g_nArrowCounterR * 2);
	ctx.globalAlpha = a;
	ctx.drawImage(g_ArrowRHandle, x - 40, y - 70);
	ctx.globalAlpha = 1.0;	
}

var ARROW_SIZE_MX = 80 * 0.65;
var ARROW_SIZE_MY = 140 * 0.65;

function DrawArrowLM(ctx, x, y)
{
 	var a = 1.0 - (g_nArrowCounterL * 0.035);
	x -= (g_nArrowCounterL * 0.75);
	ctx.globalAlpha = a;
	ctx.drawImage(g_ArrowLHandle, x - (ARROW_SIZE_MX / 2), y - (ARROW_SIZE_MY / 2), ARROW_SIZE_MX, ARROW_SIZE_MY);
	ctx.globalAlpha = 1.0;	
}
function DrawArrowRM(ctx, x, y)
{
 	var a = 1.0 - (g_nArrowCounterR * 0.035);
	x += (g_nArrowCounterR * 0.75);
	ctx.globalAlpha = a;
	ctx.drawImage(g_ArrowRHandle, x - (ARROW_SIZE_MX / 2), y - (ARROW_SIZE_MY / 2), ARROW_SIZE_MX, ARROW_SIZE_MY);
	ctx.globalAlpha = 1.0;	
}

var G_EFFECT_STATUS = 
{
	SCALE_ZOOM:			0,
	SCALE_FADE_ZOOM:	1,
	COIN_EFFECT:		2
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
	this.nCrsW			= 640;
	this.nCrsH			= 1200;
	this.nCrsFlg		= true;	
	this.iAttr			= 0;
	this.bWait			= false;
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
	this.iAttr			= 0;
	this.bWait			= false;
};
// データ追加
GEffectData.prototype.SetCoinEffect = function(ctx, image, x, y, w, h, a)
{
	this.sCtx			= ctx;	
	this.sImage			= image;	
	this.nMaxTime  		= 5;
	this.nNowTime  		= 0;
	this.nCount 		= 0;
	this.nX 			= x;
	this.nY 			= y;
	this.nW 			= w;
	this.nH 			= h;
	this.nA 			= a;
	this.nWA 			= a;
	this.nStatus		= G_EFFECT_STATUS.COIN_EFFECT;
	this.nWork			= G_EFFECT_WORK.A;
	this.nVal1			= 0;
	this.nVal2			= 0;
	this.nVal3			= 0;
	this.nVal4			= 0;
	this.nCrsW			= 0;
	this.nCrsH			= 0;
	this.nCrsFlg		= false;	
	this.iAttr			= 0;
	this.bWait			= false;
};

// データ追加
GEffectData.prototype.Exec = function()
{
	if(this.bWait) { return; }
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
	else if(this.nStatus == G_EFFECT_STATUS.SCALE_FADE_ZOOM)
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
	else
	{
		if(this.nWork == G_EFFECT_WORK.A)
		{	
			if(this.iAttr > 0) { this.iAttr --; return; }
			if(this.nNowTime == 0)
			{
				if(this.EndCallBack != null) { this.EndCallBack(this); }
			}			
			if(this.nNowTime < this.nMaxTime)
			{	
				this.nNowTime ++;
				this.nCount += 1;
	
				// 描画
				var vTargetW = (this.nW * ((this.nNowTime * 0.05) + this.nMaxTime / this.nMaxTime));
				var vTargetH = (this.nH * ((this.nNowTime * 0.05) + this.nMaxTime / this.nMaxTime));
				this.nA -= 0.1;

		        this.sCtx.globalAlpha = this.nA;
		        this.sCtx.drawImage(this.sImage, 
									 this.nX - (vTargetW / 2) + this.nW / 2, 
		 							 this.nY - (vTargetH / 2) + this.nH / 2 - this.nCount * 5 * this.nCount, vTargetW, vTargetH);
		        this.sCtx.globalAlpha = 1.0;
			}
			else
			{
				this.bEnd = true;
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

function ByeCoin(_This)
{
	AddCoin(-1);
}



// エフェクトの追加
function AddScaleZoomEffect(ctx, image, x, y, w, h, a)
{
	var no = g_sEffectObject.length;
	g_sEffectObject[no] = new GEffectData();
	g_sEffectObject[no].SetScaleZoomEffect(ctx, image, x, y, w, h, a);
	return g_sEffectObject[no];
}
function AddCoinEffect(ctx, image, x, y, w, h, a, attr)
{
	var no = g_sEffectObject.length;
	g_sEffectObject[no] = new GEffectData();
	g_sEffectObject[no].SetCoinEffect(ctx, image, x, y, w, h, a);
	g_sEffectObject[no].iAttr = (attr * 3);
	g_sEffectObject[no].EndCallBack	= ByeCoin;
	return g_sEffectObject[no];
}
function AllWaitEffect(flg)
{
	for(var i = 0; i < g_sEffectObject.length; i ++)
	{
		g_sEffectObject[i].bWait = flg;
	}
}


// 耐久値の表示
var nMinHpWakuW  = 0;
var nMaxHpWakuW  = 90 + 0
var nHpSizeWakuH = 3;
var nHpSizeNAKAH = nHpSizeWakuH/* - 1*/;
function DrawHp(ctx, x, y, hp)
{
	// STAMP_LIFE_MAX = 90
	// 
	//
	hp *= 1;
	
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

