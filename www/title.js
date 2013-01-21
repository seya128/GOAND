//
// タイトル
//
var g_BanaEndFlg = false;
var M_MAX_BANA_TIME = 30;

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
		TITLE:		4,
		HELP:		5,	
	};
	var BanaStatus = 0;
	var BanaTime = 0;
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
	
	//ロゴ
	var logo = new DivSprite(344,89);
	logo.x=90+(445/2); logo.y=180+(186/2); logo.z=5;
	logo.src = "img/01_title/t_rgo_a000.png";
	logo.alpha = 0;
	logo.animAlpha = [0,10, 1,4, 1,-1];
	logo.scale = 2;
	logo.animScale = [2,10, 1,4, 1.1,1, 1,1, 1.05,1, 1,-1];
	
	//女神
	var megami = new DivSprite(150,432);
	megami.x=320; megami.y=166; megami.z=2;
	megami.src = "img/01_title/t_bgd_a000.png";
	megami.anim = [0,40, 1,40];
	
	megami.onclick = function()
	{
		event.preventDefault();
		if (debugCount == 9) 
		{
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
				tutorial.isEnd = false;
				g_TutorialStatus = gTUTORIAL_STATUS.NONE;
				next = NEXT.TITLE;			// 再度タイトルシーン
			}
		}
		debugCount = 0;
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
	
	for (var i=0; i<charaData.length; i++) 
	{
		chara[i] = new DivSprite(2704/16,180);
		chara[i].src = "img/00_common/k_zen_a.png"
		chara[i].x = charaData[i].x;
		chara[i].y = charaData[i].y;
		chara[i].z = 3;
		chara[i].scale = charaData[i].scale;
		chara[i].anim = charaData[i].anim;
		chara[i].alpha = 1;
		chara[i].rotate = charaData[i].rot;
		chara[i].animExec();
		//sceen.appendChild(chara[i].div);
		//animSprites.push(chara[i]);
	}
	
	
	//ごはん
	var gohan = new DivSprite(286,238);
	gohan.x=150; gohan.y=541; gohan.z=2;
	gohan.src = "img/01_title/t_btn_a000.png";
	gohan.animScale = [1,10, 1.1,2, 1,2, 1,10, 1,10, 1,10];
	gohan.onclick = function()
	{
		event.preventDefault();
		if(g_BanaEndFlg) { next = NEXT.GOHAN; }
	};
	
	//スタンプ
	var stamp = new DivSprite(286,238);
	stamp.x=490; stamp.y=541; stamp.z=2;
	stamp.src = "img/01_title/t_btn_b000.png";
	stamp.animScale = [1,10, 1,10, 1.1,2, 1,2, 1,10, 1,10];
	stamp.onclick = function()
	{
		event.preventDefault();
		if(g_BanaEndFlg) { next = NEXT.STAMP; }
	};

	
	//ショップ
	var shop = new DivSprite(245,200);
	shop.x=477; shop.y=761; shop.z=1;
	shop.src = "img/01_title/t_btn_d000.png";
	shop.animScale = [1,10, 1,10, 1,10, 1.1,2, 1,2, 1,10];
	shop.onclick = function()
	{
		event.preventDefault();
		if(g_BanaEndFlg) { next = NEXT.SHOP; }
	};

	
	
	// チュートリアル or ヘルプ
	var tutorialBtn = null;
	// 初めての場合チュートリアルの表示
	if(GetTutorialLookFlg() == false)
	{
		var tutorialBtn = new DivSprite(245,200);
		tutorialBtn.x=162; tutorialBtn.y=761; tutorialBtn.z=1;
		tutorialBtn.src = "img/01_title/t_btn_e000.png";
		tutorialBtn.animScale = [1,10, 1,10, 1,10, 1,10, 1.1,2, 1,2];
		tutorialBtn.onclick = function()
		{
			event.preventDefault();
			if(g_BanaEndFlg) { g_TutorialStatus = gTUTORIAL_STATUS.GOHAN; next = NEXT.TITLE; }
		};
	}
	// 二回目はヘルプ
	else
	{
		var tutorialBtn = new DivSprite(245,200);
		tutorialBtn.x=162; tutorialBtn.y=761; tutorialBtn.z=1;
		tutorialBtn.src = "img/01_title/t_btn_f000.png";
		tutorialBtn.animScale = [1,10, 1,10, 1,10, 1,10, 1.1,2, 1,2];
		tutorialBtn.onclick = function()
		{
			event.preventDefault();
			if(g_BanaEndFlg) { next = NEXT.HELP; }
		};
	}

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
	// チュートリアル関連処理
	//
	var	TUTORIAL_ST = {		//チュートリアルステータス
		INIT:		0,
		IN:			1,
		MAIN:		2,
	};
	var Tutorial = function() {
		this.st = TUTORIAL_ST.INIT;
		this.isEnd = GetTutorialLookFlg();		//true:チュートリアルを一度終えている
		this.isStart = false;					//true:チュートリアル開始
		this.alpha = 0;							//チュートリアルα
		this.type = 0;							//チュートリアルタイプ
		this.datatbl = [						//タイプ別データテーブル
			{btn:tutorialBtn,	img:"a_txt_a001",	x:0,   y:380, ax:110, ay:550},		//チュートリアル
			{btn:gohan,			img:"a_txt_a002",	x:10,  y:120, ax:103, ay:310},		//ごはん
			{btn:shop,			img:"a_txt_a004_02",x:240, y:380, ax:425, ay:540},		//ショップ
			{btn:stamp,			img:"a_txt_a008",	x:220, y:120, ax:425, ay:310},		//スタンプ
		];
		
		//黒マスク用DIV
		this.maskDiv = document.createElement("div");
		this.maskDiv.style.position = "fixed";
		this.maskDiv.style.overflow = "hidden";
		this.maskDiv.style.width = "640px";
		this.maskDiv.style.height ="1138px";
		this.maskDiv.style.zoom = 1;
		this.maskDiv.style.backgroundColor = "#000";
		this.maskDiv.style.zIndex = 10;
		this.maskDiv.style.left = "0px";
		this.maskDiv.style.top = "0px";
		this.maskDiv.style.opacity = 0;
		//おわるボタン
		this.endBtn = new DivSprite(137,42);
		this.endBtn.src = "img/10_asobikata/a_btn_a000.png";
		//チュートリアルメッセージ
		this.msg = {};
		for (var i=0; i<this.datatbl.length; i++) {
			this.msg[i] = new DivSprite(432,180);
			this.msg[i].src = "img/10_asobikata/" + this.datatbl[i].img + ".png";
			this.msg[i].basePos={x:0, y:0};
			this.msg[i].x = this.datatbl[i].x;
			this.msg[i].y = this.datatbl[i].y;
			this.msg[i].z = 13;
		}
		//チュートリアル矢印ボタン
		this.arrow = new DivSprite(113,125);
		this.arrow.src = "img/10_asobikata/a_obj_a000.png";
	};
	//チュートリアル用矢印をDOMに追加
	Tutorial.prototype.addDomArrow = function() {		
		var x=this.datatbl[this.type].ax;
		var y=this.datatbl[this.type].ay;
		this.arrow.basePos={x:0, y:0};
		this.arrow.x = x;
		this.arrow.y = y;
		this.arrow.z = 13;
		this.arrow.animPos = [x,y+0,1, x,y+1,1, x,y+2,1, x,y+3,1, x,y+4,1, x,y+3,1, x,y+2,1, x,y+1,1];
		sceen.appendChild(this.arrow.div);
		animSprites.push(this.arrow);
	};
	//チュートリアル用「おわる」ボタンをDOMに追加
	Tutorial.prototype.addDomEnd = function() {
		//すでに一度見終わっている場合のみ表示
		if (this.isEnd) {
			this.endBtn.basePos={x:0, y:0};
			this.endBtn.x = 489;
			this.endBtn.y = 11;
			this.endBtn.z = 12;
			sceen.appendChild(this.endBtn.div);
			this.endBtn.onclick = function() {
				g_TutorialStatus = gTUTORIAL_STATUS.NONE;
				next = NEXT.TITLE;			// 再度タイトルシーン
			};
		}
	};
	
	var tutorial = new Tutorial();
	
	
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
	
	for (var i=0; i<charaData.length; i++) 
	{
		sceen.appendChild(chara[i].div);
	}	
	sceen.appendChild(megami.div);
	sceen.appendChild(bg.div);	
	sceen.appendChild(logo.div);	
	sceen.appendChild(gohan.div);	
	sceen.appendChild(stamp.div);	
	sceen.appendChild(shop.div);	
	sceen.appendChild(tutorialBtn.div);
	
	var xmaskDiv    = null;
	var dorasulogo  = null;
	var Bana        = null;
	
	// バナーを見せる
	if(g_BanaEndFlg == false)
	{
		//白マスク用DIV
		xmaskDiv = document.createElement("div");
		xmaskDiv.style.position = "fixed";
		xmaskDiv.style.overflow = "hidden";
		xmaskDiv.style.width = "640px";
		xmaskDiv.style.height ="1138px";
		xmaskDiv.style.zoom = 1;
		xmaskDiv.style.backgroundColor = "#ffffff";
		xmaskDiv.style.zIndex = 10;
		xmaskDiv.style.left = "0px";
		xmaskDiv.style.top = "0px";
		xmaskDiv.style.opacity = 0.95;
		sceen.appendChild(xmaskDiv);
		
		// バナー
		Bana = new DivSprite(480,186);
		Bana.x=640/2; Bana.y=600; Bana.z=20;
		Bana.src = "img/01_title/bana.png";
		//Bana.animScale = [1,10, 1,10, 1,10, 1,10, 1.1,2, 1,2];
		Bana.onclick = function()
		{
			event.preventDefault();
			var win=window.open("http://www.cowcowfoodsystem.com/","new");
			win.moveTo(0,0);		
		};
		sceen.appendChild(Bana.div);
		
		// ロゴ
		dorasulogo = new DivSprite(480,186);
		dorasulogo.x=640/2; dorasulogo.y=150; dorasulogo.z=20;
		dorasulogo.src = "img/01_title/k_rogo_a000.png";
		sceen.appendChild(dorasulogo.div);		
	}
	// バナーは一回見たからなし
	else
	{
		animSprites.push(megami);
		animSprites.push(logo);
		animSprites.push(gohan);	
		animSprites.push(stamp);	
		animSprites.push(shop);	
		animSprites.push(tutorialBtn);
		for (var i=0; i<charaData.length; i++) 
		{
			animSprites.push(chara[i]);
		}
	}	
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
					else
					{
						// ロード中
						
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
			
				// バナー表示中
				if(g_BanaEndFlg == false)
				{
					// 待つ
					if(BanaStatus == 0)
					{
						BanaTime ++;
						if(BanaTime > M_MAX_BANA_TIME)
						{
							BanaStatus ++;
							animSprites.push(megami);
							animSprites.push(logo);
							animSprites.push(gohan);	
							animSprites.push(stamp);	
							animSprites.push(shop);	
							animSprites.push(tutorialBtn);
							for (var i=0; i<charaData.length; i++) 
							{
								animSprites.push(chara[i]);
							}			
							BanaTime = 0;
						}
						
					}
					// 広告バナーが開ける
					else
					{
						xmaskDiv.style.opacity  	-= 0.15;
						Bana.div.style.opacity 		-= 0.2;
						dorasulogo.div.style.opacity 	-= 0.2;
						
						if(xmaskDiv.style.opacity <= 0)
						{
							g_BanaEndFlg = true;
							sceen.removeChild(xmaskDiv);
							sceen.removeChild(Bana.div);
							sceen.removeChild(dorasulogo.div);
						}
					}
					
				}
				else
				{
					if (next != NEXT.NONEXT) 
					{
						//デバッグコマンドチェック
						if (debugCount == 9) 
						{
							switch (next) 
							{
								case NEXT.GOHAN:	g_TutorialStatus=gTUTORIAL_STATUS.END; tutorial.isEnd=true; break;
								case NEXT.STAMP:	g_TutorialStatus=gTUTORIAL_STATUS.STAMP; break;
								case NEXT.SHOP:		g_TutorialStatus=gTUTORIAL_STATUS.SHOP; break;
							}
							debugCount = 0;
							next = NEXT.NONEXT;
							break;
						}
						
						//再度タイトルシーンにいく場合は、特に何もせず次へ
						if (next == NEXT.TITLE) {
							st = STATUS.FADEOUT;
							break;
						}

						//まだチュートリアルしたことなければ、チュートリアル開始
						if (!tutorial.isEnd && !tutorial.isStart) {
							tutorial.isStart = true;
							g_TutorialStatus = gTUTORIAL_STATUS.NONE;
							next = NEXT.NONEXT;
							break;
						}
						
						//次の処理がセットされれば次へ
						st = STATUS.FADEOUT;
					}
					//チュートリアルモードの場合、チュートリアル開始
					if (g_TutorialStatus!=gTUTORIAL_STATUS.NONE && g_TutorialStatus!=gTUTORIAL_STATUS.END) {
						tutorial.isStart = true;
					}
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
				if(tutorial.isEnd == true)
				{
					SaveTutorialLookFlg(tutorial.isEnd);
				}
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
					// タイトル
					case NEXT.TITLE:
						nextSceen = new SceenTitle();
						break;
					// ヘルプ
					case NEXT.HELP:
						nextSceen = new SceenHelp();
						break;
				}
				break;
		}
		
		if (st != STATUS.END) {
			//チュートリアル処理
			if (tutorial.isStart) {
				switch (tutorial.st) {
					//初期化
					case TUTORIAL_ST.INIT:
						tutorial.st = TUTORIAL_ST.IN;
						//チュートリアルデータインデックス
						switch (g_TutorialStatus) {
							case gTUTORIAL_STATUS.NONE:		tutorial.type = 0;	break;
							case gTUTORIAL_STATUS.GOHAN:	tutorial.type = 1;	break;
							case gTUTORIAL_STATUS.SHOP:		tutorial.type = 2;	break;
							case gTUTORIAL_STATUS.STAMP:	tutorial.type = 3;	break;
						}
						//黒マスクをDOMに追加
						sceen.appendChild(tutorial.maskDiv);
						tutorial.alpha = 0;
						//該当ボタンのZ座標を黒マスクの手前に
						tutorial.datatbl[tutorial.type].btn.z = 11;
						//メッセージをDOMに追加
						sceen.appendChild(tutorial.msg[tutorial.type].div);
						//矢印をDOMに追加
						tutorial.addDomArrow();
						//終わるをDOMに追加
						tutorial.addDomEnd();
						
						break;
					//イン
					case TUTORIAL_ST.IN:
						tutorial.alpha += 0.6/10;
						if (tutorial.alpha >= 0.6) {
							tutorial.st = TUTORIAL_ST.MAIN;
						}
						tutorial.maskDiv.style.opacity = tutorial.alpha;
						break;
				}
			}
			
			//アニメーション処理
			if (debugCount != 9) {
				//デバッグコマンド有効状態になるとアニメーションしない
				animSprites.forEach(function(s){ s.animExec(); });
			}
		}
		
	};
	
	
};


