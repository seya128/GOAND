//
// タイトル
//


var SceenTitle = function() {
	var STATUS = {
		INIT:		0,
		FADEIN:		1,
		MAIN:		2,
		FADEOUT:	3,
		END:		4
	};
	var st = STATUS.INIT;
	
	var NEXT = {
		NONEXT:		0,
		GOHAN:		1,
		STAMP:		2
	};
	var next = NEXT.NONEXT;
	
	var alpha = 0;
	
	var rootSceen = document.getElementById("sceen");
	var sceen = document.createElement("div");
	rootSceen.appendChild(sceen);
	sceen.style.opacity = alpha;
	
	//BG
	var bg = new DivSprite(640,1138);
	bg.x=0; bg.y=0; bg.z=0;
	bg.src = "img/title/h_h00_bgd_a/h_h00_bgd_a_00000.png";
	sceen.appendChild(bg.div);
	
	//ロゴ
	var logo = new DivSprite(445,186);
	logo.x=90; logo.y=180; logo.z=3;
	logo.src = "img/title/t_rgo_a000.png";
	sceen.appendChild(logo.div);
	
	//女神
	var megami = new DivSprite(316,452);
	megami.x=160; megami.y=-20; megami.z=2;
	megami.src = "img/title/t_meg_a/t_meg_a_00000.png";
	sceen.appendChild(megami.div);
	
	
/*	 <img id="nasu" src="img/title/t_nas_a/t_nas_a_00000.png"></img>
     <img id="ninjin" src="img/title/t_nin_a/t_nin_a_00000.png"></img>
     <img id="piman" src="img/title/t_pii_a/t_pii_a_00000.png"></img>
     <img id="tomato" src="img/title/t_tom_a/t_tom_a_00000.png"></img>
*/

	//ごはん
	var gohan = new DivSprite(266,228);
	gohan.x=20; gohan.y=420; gohan.z=2;
	gohan.src = "img/title/t_btn_a000.png";
	gohan.onclick = function(){
		event.preventDefault();
		next = NEXT.GOHAN;
	};
	sceen.appendChild(gohan.div);
	
	//スタンプ
	var stamp = new DivSprite(258,224);
	stamp.x=360; stamp.y=420; stamp.z=2;
	stamp.src = "img/title/t_btn_b000.png";
	stamp.onclick = function() {
		document.location="StampSelect.html";
		event.preventDefault();
	};
	sceen.appendChild(stamp.div);
	
	
	//あそびかた
	var help = new DivSprite(220,194);
	help.x=40; help.y=650; help.z=2;
	help.src = "img/title/t_btn_c000.png";
	help.onclick = function(){
		event.preventDefault();
		alert("未実装です。");
	};
	sceen.appendChild(help.div);
	
	//ショップ
	var shop = new DivSprite(220,196);
	shop.x=360; shop.y=650; shop.z=2;
	shop.src = "img/title/t_btn_d000.png";
	shop.onclick = function() {
		event.preventDefault();
		window.localStorage.removeItem("CntGochi");
		window.localStorage.removeItem("CntCoin");
		deleteHasStamp();
		AllDeleteStampDrawData();	// スタンプしたデータを削除
		alert("ごちそうさました回数、スタンプデータをリセットしました。");
	};
	sceen.appendChild(shop.div);
	
	
	
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
				alpha += (1.0 / 10);
				if (alpha >= 1.0) {
					alpha = 1.0;
					st = STATUS.MAIN;
				}
				sceen.style.opacity = alpha;
				break;

			//メイン処理
			case STATUS.MAIN:
				//次の処理がセットされれば次へ
				if (next != NEXT.NONEXT) {
					st = STATUS.FADEOUT;
				}
				break;

			//フェードアウト
			case STATUS.FADEOUT:
				alpha -= (1.0 / 5);
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
				//次のシーンをセット
				switch(next) {
					case NEXT.GOHAN:
						nextSceen = new SceenGohan();
						break;
				}
				break;
		}
	};
	
};

