//
// ごはんモード
//  コインゲット


var SceenGohanCoinGet = function() {

	var STATUS = {
		INIT:			0,
		FADEIN:			1,
		MAIN:			2,
		FADEOUT:		3,
		END:			4,
	};
	var st = STATUS.INIT;
	var stFrm = 0;		//ステート処理用のフレームカウンタ
	
	var alpha = 0;
	
	var rootSceen = document.getElementById("sceen");
	var sceen = document.createElement("div");
	rootSceen.appendChild(sceen);
	sceen.style.opacity = alpha;
	
	var animSprites = [];		//アニメーション処理呼び出しスプライト
	
	//BG
	var bg = new DivSprite(640,1138);
	bg.basePos = {x:0,y:0};
	bg.x=0; bg.y=0; bg.z=0;
	bg.src = "img/06_present/g_pre_bgd_a.png";
	bg.anim = [0,10, 1,10];
	sceen.appendChild(bg.div);
	animSprites.push(bg);


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
					stFrm = 0;
				}
				sceen.style.opacity = alpha;
				break;

			//メイン
			case STATUS.MAIN:
				if (stFrm==0) {
				} else if (stFrm==10*10) {
					st = STATUS.FADEOUT;
				}
				
				stFrm ++;
				break;

			//フェードアウト
			case STATUS.FADEOUT:
				alpha -= (1.0 / 10);
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
				nextSceen = new SceenTitle();
				break;
		}
		
		if (st != STATUS.END) {
			//アニメーション処理
			animSprites.forEach(function(s){ s.animExec(); });
		}

	};
	
};

