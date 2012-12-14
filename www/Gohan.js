//
// ごはんモード
//


var SceenGohan = function() {

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
		TITLE:		1,
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
	bg.src = "img/02_charaselect/g_g01_bgd_a.png";
	sceen.appendChild(bg.div);
	
	//女神
	var megami = new DivSprite(400,520);
	megami.x=117; megami.y=77; megami.z=2;
	megami.src = "img/00_common/k_sin_a.png";
	megami.onclick = function() {
		event.preventDefault();
		next = NEXT.TITLE;
	};
	sceen.appendChild(megami.div);
	
	



	
	
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
				alpha += (1.0 / 4);
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
				alpha -= (1.0 / 4);
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
					case NEXT.TITLE:
						nextSceen = new SceenTitle();
						break;
				}
				break;
		}
	};
	
};

