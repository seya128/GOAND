// スタンプデータ


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

//持ってるスタンプ
var hasStampData = [
    {"id":0, "ink":30},
    {"id":1, "ink":30},
    {"id":2, "ink":30},
    {"id":3, "ink":30},
    {"id":4, "ink":30},
    {"id":5, "ink":30},
    {"id":6, "ink":30},
    {"id":7, "ink":30},
    {"id":8, "ink":30},
    {"id":9, "ink":30},
    {"id":10, "ink":30},
    {"id":11, "ink":30},
    {"id":12, "ink":30},
    {"id":13, "ink":30},
    {"id":14, "ink":30},
    {"id":15, "ink":30},
    {"id":16, "ink":30},
    {"id":17, "ink":30},
    {"id":18, "ink":30},
    {"id":19, "ink":30},
    {"id":20, "ink":30},
    {"id":21, "ink":30},
    {"id":22, "ink":30},
    {"id":23, "ink":30},
    {"id":24, "ink":30},
    {"id":25, "ink":30},
    {"id":26, "ink":30},
    {"id":17, "ink":20},
    {"id":18, "ink":10},
    {"id":19, "ink":2},
    
];

function loadHasStamp() {
	var data = localStorage.getItem("HasStampData");
	if (!data) return;
	
	hasStampData = JSON.parse(data);
}

function saveHasStamp() {
	localStorage.setItem("HasStampData", JSON.stringify(hasStampData));
	console.log("save hasStampData");
}

function deleteHasStamp() {
	localStorage.removeItem("HasStampData");
}




//現在のシートの情報
