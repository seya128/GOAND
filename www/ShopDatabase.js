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

/*
// 背景画像
var gStampEnum = 
[
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
	NIKU:		100,	// ハンバーグ
	PURIN:		101,	// プリン
	SUPA:		102,	// スパゲティ
	HATA:		103,	// お子様の旗
	ONIGIRI:	104,	// おにぎり
	HURAI:		105,	// エビフライ
	TAKO:		106,	// タコ
	KYUURI:		107,	// きゅうり
	REMON:		108,	// レモン
	// 空の上系
	KUMO:		109,	// 雲
	HUUSEN:		110,	// 風船
	HANA:		111,	// チューリップ
	RINGO:		112,	// リンゴ
	BANANA:		113,	// バナナ
	HIKOUKI:	114,	// 飛行機
	TAMANEGI:	115,	// たまねぎ
	EDAMAME:	116,	// 枝豆
	TOMATO:		117,	// トマト
	// 水系
	KAME:		118,	// カメ
	ISOGIN:		119,	// イドギンチャク
	WAKAME:		120,	// わかめ
	KANI:		121,	// カニ
	YADOKARI:	122,	// ヤドカリ
	SAKANA:		123,	// 魚
	TATU:		124,	// タツノオトシゴ
	KAI:		125,	// 貝
	NIMO:		126,	// ニモ
];

// 背景画像
var gStampBgFileName = 
[
	// ごはん系
    "img/stamp/s_s01_sta_a/s_s01_bgd_a000.png",
    "img/stamp/s_s01_sta_a/s_s01_bgd_b000.png",
    "img/stamp/s_s01_sta_a/s_s01_bgd_c000.png",
 	// 空の上
    "img/stamp/s_s02_sta_a/s_s02_bgd_a000.png",
    "img/stamp/s_s02_sta_a/s_s02_bgd_b000.png",
    "img/stamp/s_s02_sta_a/s_s02_bgd_c000.png",
	// 水系
    "img/stamp/s_s03_sta_a/s_s03_bgd_a000.png",
    "img/stamp/s_s03_sta_a/s_s03_bgd_b000.png",
    "img/stamp/s_s03_sta_a/s_s03_bgd_c000.png"
];

// スタンプ画像
var gStampImgFileName =
[
	// ごはん系
    "img/stamp/s_s01_sta_a/s_s01_sta_a000.png",
    "img/stamp/s_s01_sta_a/s_s01_sta_b000.png",
    "img/stamp/s_s01_sta_a/s_s01_sta_c000.png",
    "img/stamp/s_s01_sta_a/s_s01_sta_d000.png",
    "img/stamp/s_s01_sta_a/s_s01_sta_e000.png",
    "img/stamp/s_s01_sta_a/s_s01_sta_f000.png",
    "img/stamp/s_s01_sta_a/s_s01_sta_g000.png",
    "img/stamp/s_s01_sta_a/s_s01_sta_h000.png",
    "img/stamp/s_s01_sta_a/s_s01_sta_i000.png",
 	// 空の上
    "img/stamp/s_s02_sta_a/s_s02_sta_a000.png",
    "img/stamp/s_s02_sta_a/s_s02_sta_b000.png",
    "img/stamp/s_s02_sta_a/s_s02_sta_c000.png",
    "img/stamp/s_s02_sta_a/s_s02_sta_d000.png",
    "img/stamp/s_s02_sta_a/s_s02_sta_e000.png",
    "img/stamp/s_s02_sta_a/s_s02_sta_f000.png",
    "img/stamp/s_s02_sta_a/s_s02_sta_g000.png",
    "img/stamp/s_s02_sta_a/s_s02_sta_h000.png",
    "img/stamp/s_s02_sta_a/s_s02_sta_i000.png",
	// 水系
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

];

*/




