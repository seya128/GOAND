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
	var stFrm = 0;
	
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
	
	
	//デバッグ用裏コマンドカウンタ
	var debugCount=0;
	
	
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
		if (debugCount == 9) {
			if(window.confirm('すべてのデータをクリアします。よろしいですか？')){
				window.localStorage.removeItem("CntGochi");
				window.localStorage.removeItem("CntCoin");
				DeleteCoin();				// コイン初期化
				DeleteHaveStampData();		// スタンプ削除
				DeleteHaveSheetData();		// シート削除
				AllDeleteStampDrawData();	// スタンプしたデータを削除
				SaveActiveSheetIndex(0);	// アクティブシートの初期化
				DummySheetDataSet();
				DummyStampDataSet();
				DeleteTutorialLookFlg();	// チュートリアルを見てないことにする
			}
		}
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
	gohan.animScale = [1,10, 1.1,2, 1,2, 1,10, 1,10, 1,10];
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
	stamp.animScale = [1,10, 1,10, 1.1,2, 1,2, 1,10, 1,10];
	stamp.onclick = function(){
		event.preventDefault();
		next = NEXT.STAMP;
	};
	sceen.appendChild(stamp.div);
	animSprites.push(stamp);
	
	//ショップ
	var shop = new DivSprite(245,200);
	shop.x=477; shop.y=761; shop.z=1;
	shop.src = "img/01_title/t_btn_d000.png";
	shop.animScale = [1,10, 1,10, 1,10, 1.1,2, 1,2, 1,10];
	shop.onclick = function(){
		event.preventDefault();
		next = NEXT.SHOP;
	};
	sceen.appendChild(shop.div);
	animSprites.push(shop);
	
	//チュートリアル
	var tutorial = new DivSprite(245,200);
	tutorial.x=162; tutorial.y=761; tutorial.z=1;
	tutorial.src = "img/01_title/t_btn_e000.png";
	tutorial.animScale = [1,10, 1,10, 1,10, 1,10, 1.1,2, 1,2];
	tutorial.onclick = function(){
		event.preventDefault();
		g_TutorialStatus=gTUTORIAL_STATUS.GOHAN;
	};
	sceen.appendChild(tutorial.div);
	animSprites.push(tutorial);

	// ウィンドウなどの画像の読み込み
	LoadWindowYesNo();
	
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
	// チュートリアル関連初期化
	//
	var isTutorialEnd = GetTutorialLookFlg();		//true:チュートリアルを一度終えている
	
	//チュートリアルステータス
	var TUTORIALST = {
		INIT:		0,
		IN:			1,
		MAIN:		2,
	};
	var tutorialSt = TUTORIALST.INIT;
	
	var tutorialAlpha = 0;
	var tutorialWaitFrm = 0;		//チュートリアル開始までのフレームカウンタ
	
	//黒マスク用DIV
	var tutorialDiv = document.createElement("div");
	tutorialDiv.style.position = "fixed";
	tutorialDiv.style.overflow = "hidden";
	tutorialDiv.style.width = "640px";
	tutorialDiv.style.height ="1138px";
	tutorialDiv.style.zoom = 1;
	tutorialDiv.style.backgroundColor = "#000";
	tutorialDiv.style.zIndex = 10;
	tutorialDiv.style.left = "0px";
	tutorialDiv.style.top = "0px";
	tutorialDiv.style.opacity = 0;
	//おわるボタン
	//矢印ボタン
	//チュートリアルメッセージ
	
	
	//
	//裏コマンド
	//
	//ピーマン、ナス、トマト、ピーマン、ナス、トマト、ピーマン、ナス、トマト
	//の順にタッチ後(アニメーション停止でわかる)
	//
	// めがみ　：　データクリア
	// ごはん　：　チュートリアルをやったことにする
	// すたんぷ：　チュートリアル　スタンプモード
	// ショップ：　チュートリアル　ショップモード
	//
	//ぴーまん
	chara[0].onclick = function() {
		event.preventDefault();
		if (debugCount==0 || debugCount==3 || debugCount==6) {
			debugCount++;
		} else {
			debugCount=0;
		}
	};
	//なす
	chara[1].onclick = function() {
		event.preventDefault();
		if (debugCount==1 || debugCount==4 || debugCount==7) {
			debugCount++;
		} else {
			debugCount=0;
		}
	};
	//とまと
	chara[2].onclick = function() {
		event.preventDefault();
		if (debugCount==2 || debugCount==5 || debugCount==8) {
			debugCount++;
		} else {
			debugCount=0;
		}
	};
	
	//
	// フレーム処理
	//
	this.onframe = function() {

		switch(st) {

			//初期化
			case STATUS.INIT:
						
				// 外部グラフィックが読み込み終わっていると[true]
				if(g_sGraphicLoadFlg.bLoadFlg)
				{			
					//各データが読み込まれるまで待つ
					if (LoadingCounter <= 0) {
						st = STATUS.FADEIN;
					}
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
				if (next != NEXT.NONEXT) {
					//デバッグコマンドチェック
					if (debugCount == 9) {
						switch (next) {
							case NEXT.GOHAN:	g_TutorialStatus=gTUTORIAL_STATUS.END; isTutorialEnd=true; break;
							case NEXT.STAMP:	g_TutorialStatus=gTUTORIAL_STATUS.STAMP; break;
							case NEXT.SHOP:		g_TutorialStatus=gTUTORIAL_STATUS.SHOP; break;
						}
						debugCount = 0;
						next = NEXT.NONEXT;
						break;
					}
					
/*					//チュートリアルモードでない場合
					if (modeTutorial == TUTOTIALMODE.NONE) {
						//チュートリアルが終わっていなければチュートリアルモードへ
						if (isTutorialEnd != true) {
							modeTutorial = TUTOTIALMODE.GOHAN;	//チュートリアルご飯モード
						}
					} else {
					//チュートリアルモードの場合は、
					if (modeTutorial != TUTOTIALMODE.NONE) {
						//チュートリアル終わっていない
						
					}
*/					//次の処理がセットされれば次へ
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
				//チュートリアル見たフラグ保存
				SaveTutorialLookFlg(isTutorialEnd);
				
				//DOMエレメントの削除
				rootSceen.removeChild(sceen);
				//次のシーンをセット
				switch(next) {
					case NEXT.GOHAN:
						nextSceen = new SceenGohan();
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
			//チュートリアル処理
			if (g_TutorialStatus!=gTUTORIAL_STATUS.NONE && g_TutorialStatus!=gTUTORIAL_STATUS.END) {
				switch (tutorialSt) {
					//初期化
					case TUTORIALST.INIT:
						tutorialSt = TUTORIALST.IN;
						//黒マスクをDOMに追加
						sceen.appendChild(tutorialDiv);
						tutorialSt = TUTORIALST.IN;
						tutorialAlpha = 0;
						//該当ボタンのZ座標を黒マスクの手前に
						switch (g_TutorialStatus) {
							case gTUTORIAL_STATUS.GOHAN:	gohan.z = 11;	break;
							case gTUTORIAL_STATUS.SHOP:		shop.z = 11;	break;
							case gTUTORIAL_STATUS.STAMP:	stamp.z = 11;	break;
						}
						break;
					//イン
					case TUTORIALST.IN:
						tutorialAlpha += 0.6/10;
						if (tutorialAlpha >= 0.6) {
							tutorialSt = TUTORIALST.MAIN;
						}
						tutorialDiv.style.opacity = tutorialAlpha;
						break;
				}
			} else if (isTutorialEnd == false) {
				//まだチュートリアルをやっていないのでウェイト後チュートリアルへ
/*				if (tutorialWaitFrm++ >= 10*3) {
					modeTutorial = TUTORIALMODE.GOHAN;
				}
*/			}
			
			//アニメーション処理
			if (debugCount != 9) {
				//デバッグコマンド有効状態になるとアニメーションしない
				animSprites.forEach(function(s){ s.animExec(); });
			}
		}
		
	};
	
	
};


