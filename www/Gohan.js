//
// ごはんモード
//  キャラ選択


var SceenGohan = function() {

	var STATUS = {
		INIT:			0,
		FADEIN:			1,
		MAIN:			2,
		FADEOUT:		3,
		END:			4,
		
		SELECTED_INIT:	5,
		SELECTED_MOVE:	6,
		SELECTED_END:	7,
	};
	var st = STATUS.INIT;
	var stFrm = 0;		//ステート処理用のフレームカウンタ
	
	var alpha = 0;
	
	var selected=-1;		//選択したキャラ
	
	var rootSceen = document.getElementById("sceen");
	var sceen = document.createElement("div");
	rootSceen.appendChild(sceen);
	sceen.style.opacity = alpha;
	
	//BG
	var bg = new DivSprite(640,1138);
	bg.basePos= {x:0,y:0};
	bg.x=0; bg.y=0; bg.z=0;
	bg.src = "img/02_charaselect/g_g01_bgd_a.png";
	sceen.appendChild(bg.div);
	
	//女神
	var megami = new DivSprite(400,520);
	megami.basePos={x:0,y:0};
	megami.x=117; megami.y=77; megami.z=1;
	megami.src = "img/00_common/k_sin_c.png";
	megami.anim = [0,36, 1,30, 0,40, 1,10];
	megami.onclick = function() {
		event.preventDefault();
		next = NEXT.TITLE;
	};
	sceen.appendChild(megami.div);
	
	//めがみさま：だれにおうえんしてもらいますか？
	//吹きだし
	var fuki = new DivSprite(515,227);
	fuki.basePos={x:0,y:0};
	fuki.x=66; fuki.y=0, fuki.z=2;
	fuki.src = "img/00_common/g_g01_huk_a000.png";
	sceen.appendChild(fuki.div);
	//セリフ
	var words = new DivSprite(310,87);
	words.basePos={x:0,y:0};
	words.x=166; words.y=61, words.z=3;
	words.src = "img/02_charaselect/g_g01_txt_a.png";
	sceen.appendChild(words.div);
	
	//キャラクター
	var charaData=[
		{src:"k_pii_a.png",	x:38,	y:185,	anim:[0,20, 1,2, 0,2, 1,2]	},
		{src:"k_nas_a.png",	x:11,	y:321,	anim:[0,40, 1,2, 0,2, 1,2]	},
		{src:"k_tom_a.png",	x:34,	y:470,	anim:[0,26, 1,2, 0,2, 1,2]	},
		{src:"k_nik_a.png",	x:176,	y:578,	anim:[0,18, 1,2, 0,2, 1,2]	},
		{src:"k_sii_a.png",	x:340,	y:578,	anim:[0,23, 1,2, 0,2, 1,2]	},
		{src:"k_tam_a.png",	x:485,	y:468,	anim:[0,30, 1,2, 0,2, 1,2]	},
		{src:"k_nin_a.png",	x:506,	y:322,	anim:[0,28, 1,2, 0,2, 1,2]	},
		{src:"k_sak_a.png",	x:485,	y:181,	anim:[0,32, 1,2, 0,2, 1,2]	},
	];
	
	var chara = {};
	var scale = 0.26;
	var ofsx=-20;
	
	for (var i=0; i<charaData.length; i++) {
		chara[i] = new DivSprite(1126/2,605);
		chara[i].src = "img/00_common/" + charaData[i].src;
		chara[i].id = i;
		chara[i].basePos={x:0,y:0};
		chara[i].x = (charaData[i].x + ofsx);
		chara[i].y = charaData[i].y;
		chara[i].z = 4;
		chara[i].scale = scale;
		chara[i].anim = charaData[i].anim;
		sceen.appendChild(chara[i].div);
	}
	chara[0].onclick = function() { selected = 0; };
	chara[1].onclick = function() { selected = 1; };
	chara[2].onclick = function() { selected = 2; };
	chara[3].onclick = function() { selected = 3; };
	chara[4].onclick = function() { selected = 4; };
	chara[5].onclick = function() { selected = 5; };
	chara[6].onclick = function() { selected = 6; };
	chara[7].onclick = function() { selected = 7; };
	
	//後で動的生成するスプライト
	var mega_fuki,mega_words;
	var chara_fuki,chara_words;


	
	
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
				//キャラが選択されたら次へ
				if (selected != -1) {
					//選択したキャラクターをグローバル変数にセット
					gohanChara = selected;
					st = STATUS.SELECTED_INIT;
				}
				break;

			//選択された：初期化
			case STATUS.SELECTED_INIT:
				fuki.alpha = 0;
				words.alpha = 0;
				
				megami.animScale = [0.6,10, 0.6,-1];
				megami.animPos = [0,-40,10, 0,-40,-1];
				
				chara[0].animPos = [-200,chara[0].y,10, -200,chara[0].y,-1];
				chara[1].animPos = [-200,chara[1].y,10, -200,chara[1].y,-1];
				chara[2].animPos = [-200,chara[2].y,10, -200,chara[2].y,-1];
				chara[3].animPos = [-200,chara[2].y,10, -200,chara[3].y,-1];
				chara[4].animPos = [840,chara[4].y,10, 840,chara[4].y,-1];
				chara[5].animPos = [840,chara[5].y,10, 840,chara[5].y,-1];
				chara[6].animPos = [840,chara[6].y,10, 840,chara[6].y,-1];
				chara[7].animPos = [840,chara[7].y,10, 840,chara[7].y,-1];
				
				chara[selected].animPos = [110,230,10, 110,230,-1];
				chara[selected].animScale = [0.75,10, 0.75,-1];
				
				//セリフ読み込み
				mega_fuki = new DivSprite(463,205);
				mega_fuki.basePos={x:0,y:0};
				mega_fuki.src = "img/00_common/g_g01_huk_b000.png";
				mega_words = new DivSprite(304,80);
				mega_words.basePos={x:0,y:0};
				mega_words.src = "img/02_charaselect/g_g01_txt_b.png";
				chara_fuki = new DivSprite(300,224);
				chara_fuki.basePos={x:0,y:0};
				chara_fuki.src = "img/00_common/g_g01_huk_c000.png";
				chara_words = new DivSprite(210,87);
				chara_words.basePos={x:0,y:0};
				chara_words.src = "img/02_charaselect/g_g01_txt_c.png";
				
				st = STATUS.SELECTED_MOVE;
				
				break;
			
			//選択された：移動
			case STATUS.SELECTED_MOVE:
				stFrm ++;
				if (stFrm >= 10) {
					st = STATUS.SELECTED_END;
					stFrm = 0;
				}
				break;
			
			//選択された：選択完了
			case STATUS.SELECTED_END:
				switch (stFrm) {
					case 0: //めがみセリフセット
						mega_fuki.x=180; mega_fuki.y=-20; mega_fuki.z=2;
						sceen.appendChild(mega_fuki.div);
						mega_words.x=260; mega_words.y=40; mega_words.z=3;
						sceen.appendChild(mega_words.div);
						break;
					case 2*10: //キャラクターセリフセット
						chara_fuki.x=340; chara_fuki.y=200; chara_fuki.z=5;
						sceen.appendChild(chara_fuki.div);
						chara_words.x=390; chara_words.y=250; chara_words.z=6;
						sceen.appendChild(chara_words.div);
						break;
						

				}
				
				stFrm ++;
				if (stFrm >= 9*10) {
					st = STATUS.FADEOUT;
					stFrm = 0;
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
				nextSceen = new SceenGohanItadaki();
				break;
		}
		
		if (st != STATUS.END) {
			//アニメーション処理
			megami.animExec();
			for (var i=0; i<charaData.length; i++) {
				chara[i].animExec();
			}
		}

	};
	
};

