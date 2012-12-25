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
		STAMP:		2,
		SHOP:		3,
	};
	var next = NEXT.NONEXT;
	
	var alpha = 0;
	
	var rootSceen = document.getElementById("sceen");
	var sceen = document.createElement("div");
	rootSceen.appendChild(sceen);
	sceen.style.opacity = alpha;
	
	var animSprites = [];		//アニメーション処理呼び出しスプライト
	
	//BG
	var bg = new DivSprite(640,1138);
	bg.basePos={x:0, y:0};
	bg.x=0; bg.y=0; bg.z=0;
	bg.src = "img/01_title/t_bgd_a.png";
	sceen.appendChild(bg.div);
	
	//ロゴ
	var logo = new DivSprite(344,89);
	logo.x=90+(445/2); logo.y=180+(186/2); logo.z=5;
	logo.src = "img/01_title/t_rgo_a000.png";
	logo.alpha = 0;
	logo.animAlpha = [0,10, 1,4, 1,-1];
	logo.scale = 2;
	logo.animScale = [2,10, 1,4, 1.1,1, 1,1, 1.05,1, 1,-1];
	sceen.appendChild(logo.div);
	animSprites.push(logo);
	
	//女神
	var megami = new DivSprite(150,432);
	megami.x=320; megami.y=166; megami.z=2;
	megami.src = "img/01_title/t_bgd_a000.png";
	megami.anim = [0,40, 1,40];
	sceen.appendChild(megami.div);
	animSprites.push(megami);
	megami.onclick = function(){
		event.preventDefault();
		window.localStorage.removeItem("CntGochi");
		window.localStorage.removeItem("CntCoin");
		DeleteCoin();				// コイン初期化
		DeleteHaveStampData();		// スタンプ削除
		DeleteHaveSheetData();		// シート削除
		AllDeleteStampDrawData();	// スタンプしたデータを削除
		SaveActiveSheetIndex(0);	// アクティブシートの初期化
		DummySheetDataSet();
		DummyStampDataSet();
		alert("ごちそうさました回数、スタンプデータをリセットしました。");
	};
	
	//キャラクター
	var charaData=[
		{x:190,	y:180,	scale:0.95,	rot:-23,	anim:[ 1,20,  0,2,  1,2,  0,2]	},	//ピーマン
		{x:578,	y:185,	scale:0.95,	rot:0,		anim:[ 3,40,  2,2,  3,2,  2,2]	},	//なす
		{x:482,	y:58,	scale:0.95,	rot:5,		anim:[ 5,26,  4,2,  5,2,  4,2]	},	//トマト
		{x:73,	y:331,	scale:0.95,	rot:-24,	anim:[ 7,18,  6,2,  7,2,  6,2]	},	//にく
		{x:571,	y:340,	scale:0.95,	rot:12,		anim:[ 9,23,  8,2,  9,2,  8,2]	},	//しいたけ
		{x:184,	y:59,	scale:0.95,	rot:15,		anim:[11,30, 10,2, 11,2, 10,2]	},	//たまねぎ
		{x:459,	y:190,	scale:0.95,	rot:13,		anim:[13,28, 12,2, 13,2, 12,2]	},	//にんじん
		{x:65,	y:183,	scale:0.95,	rot:0,		anim:[15,32, 14,2, 15,2, 14,2]	},	//さかな
	];
	
	var chara = {};
	
	for (var i=0; i<charaData.length; i++) {
		chara[i] = new DivSprite(2704/16,180);
		chara[i].src = "img/00_common/k_zen_a.png"
		chara[i].x = charaData[i].x;
		chara[i].y = charaData[i].y;
		chara[i].z = 3;
		chara[i].scale = charaData[i].scale;
		chara[i].anim = charaData[i].anim;
		chara[i].alpha = 1;
		chara[i].rotate = charaData[i].rot;
		sceen.appendChild(chara[i].div);
		animSprites.push(chara[i]);
	}
	
	
	//ごはん
	var gohan = new DivSprite(286,238);
	gohan.x=150; gohan.y=541; gohan.z=2;
	gohan.src = "img/01_title/t_btn_a000.png";
	gohan.animScale = [1,10, 1.1,2, 1,2, 1,10, 1,10];
	gohan.onclick = function(){
		event.preventDefault();
		next = NEXT.GOHAN;
	};
	sceen.appendChild(gohan.div);
	animSprites.push(gohan);
	
	//スタンプ
	var stamp = new DivSprite(286,238);
	stamp.x=490; stamp.y=541; stamp.z=2;
	stamp.src = "img/01_title/t_btn_b000.png";
	stamp.animScale = [1,10, 1,10, 1.1,2, 1,2, 1,10];
	stamp.onclick = function(){
		event.preventDefault();
		next = NEXT.STAMP;
	};
	sceen.appendChild(stamp.div);
	animSprites.push(stamp);
	
	//ショップ
	var shop = new DivSprite(286,238);
	shop.x=320; shop.y=722; shop.z=2;
	shop.src = "img/01_title/t_btn_d000.png";
	shop.animScale = [1,10, 1,10, 1,10, 1.1,2, 1,2];
	shop.onclick = function(){
		event.preventDefault();
		next = NEXT.SHOP;
	};
	sceen.appendChild(shop.div);
	animSprites.push(shop);
	
	// コインのロード処理
	LoadCoin();
	// シートのロード処理
	if(LoadHaveSheetData() == true)
	{
	}
	// 失敗なので新規ロード
	else
	{
		// ダミー削除
	//	DelHasSheet(0);
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
		// ダミー削除
	//	DelHasStamp(0);
		DummyStampDataSet();
	}	
	
	
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
					//playSound("sound/se/ok.mp3");
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
						//nextSceen = new SceenGohanItadaki();
						break;
					// ショップ
					case NEXT.SHOP:
						nextSceen = new StampShop();
						break;		
					// ショップセレクト
					case NEXT.STAMP:
						nextSceen = new StampSelect();
						break;					
				}
				break;
		}
		
		if (st != STATUS.END) {
			//アニメーション処理
			animSprites.forEach(function(s){ s.animExec(); });
		}
		
	};
	
};


