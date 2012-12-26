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
	
	var animSprites = [];		//アニメーション処理呼び出しスプライト
	
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
	animSprites.push(megami);
	
	//めがみさま：だれにおうえんしてもらいますか？
	//吹きだし
	var fuki = new DivSprite(515,227);
	fuki.x=66+515/2; fuki.y=0+227/2, fuki.z=2;
	fuki.src = "img/00_common/g_g01_huk_a000.png";
	fuki.scale = 0;
	fuki.animScale = [0,10, 1.15,3, 1,2, 1,-1]
	sceen.appendChild(fuki.div);
	animSprites.push(fuki);
	//セリフ
	var words = new DivSprite(310,87);
	words.x=166+310/2; words.y=61+87/2, words.z=3;
	words.src = "img/02_charaselect/g_g01_txt_a.png";
	words.alpha = 0;
	words.animAlpha = [0,10, 0,5, 1,5, 1,-1]
	sceen.appendChild(words.div);
	animSprites.push(words);
	
	//キャラクター
	var charaData=[
		{x:38,	y:185,	anim:[ 1,20,  0,2,  1,2,  0,2],	inAlpha:[0,3+1, 1,5, 1,-1],	src:"k_pii_a.png",	msg:"g_g01_pii_txt_a000.png"	},
		{x:11,	y:321,	anim:[ 3,40,  2,2,  3,2,  2,2],	inAlpha:[0,3+2, 1,5, 1,-1],	src:"k_nas_a.png",	msg:"g_g01nas_txt_a000.png"	},
		{x:34,	y:470,	anim:[ 5,26,  4,2,  5,2,  4,2],	inAlpha:[0,3+3, 1,5, 1,-1],	src:"k_tom_a.png",	msg:"g_g01_tom_txt_a000.png"	},
		{x:176,	y:578,	anim:[ 7,18,  6,2,  7,2,  6,2],	inAlpha:[0,3+4, 1,5, 1,-1],	src:"k_nik_a.png",	msg:"g_g01_nik_txt_a000.png"	},
		{x:340,	y:578,	anim:[ 9,23,  8,2,  9,2,  8,2],	inAlpha:[0,3+5, 1,5, 1,-1],	src:"k_sii_a.png",	msg:"g_g01_sii_txt_a000.png"	},
		{x:485,	y:468,	anim:[11,30, 10,2, 11,2, 10,2],	inAlpha:[0,3+6, 1,5, 1,-1],	src:"k_tam_a.png",	msg:"g_g01_tam_txt_a000.png"	},
		{x:506,	y:322,	anim:[13,28, 12,2, 13,2, 12,2],	inAlpha:[0,3+7, 1,5, 1,-1],	src:"k_nin_a.png",	msg:"g_g01_nin_txt_a000.png"	},
		{x:485,	y:181,	anim:[15,32, 14,2, 15,2, 14,2],	inAlpha:[0,3+8, 1,5, 1,-1],	src:"k_sak_a.png",	msg:"g_g01_sak_txt_a000.png"	},
	];
	
	var chara = {};
	var ofsx=-28;
	var scale = 1;
	
	for (var i=0; i<charaData.length; i++) {
		chara[i] = new DivSprite(2704/16,180);
		chara[i].src = "img/00_common/k_zen_a.png"
		chara[i].id = i;
		chara[i].x = charaData[i].x + ofsx +(2704/16)/2;
		chara[i].y = charaData[i].y + 180/2;
		chara[i].z = 4;
		chara[i].scale = scale;
		chara[i].anim = charaData[i].anim;
		chara[i].alpha = 0;
		chara[i].animAlpha = charaData[i].inAlpha;
		sceen.appendChild(chara[i].div);
		animSprites.push(chara[i]);
	}
	chara[0].onclick = function() { selected = 0; playSound("sound/se/kirakira.mp3");};
	chara[1].onclick = function() { selected = 1; playSound("sound/se/kirakira.mp3"); };
	chara[2].onclick = function() { selected = 2; playSound("sound/se/kirakira.mp3"); };
	chara[3].onclick = function() { selected = 3; playSound("sound/se/kirakira.mp3"); };
	chara[4].onclick = function() { selected = 4; playSound("sound/se/kirakira.mp3"); };
	chara[5].onclick = function() { selected = 5; playSound("sound/se/kirakira.mp3"); };
	chara[6].onclick = function() { selected = 6; playSound("sound/se/kirakira.mp3"); };
	chara[7].onclick = function() { selected = 7; playSound("sound/se/kirakira.mp3"); };
	
	//後で動的生成するスプライト
	var chara2;
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
					stFrm = 0;
				}
				break;

			//選択された：初期化
			case STATUS.SELECTED_INIT:
				if (stFrm == 0) {
					fuki.animScale = [0,3, 0,-1];
					words.animAlpha = [0,2, 0,-1];
					
					chara[0].animPos = [-200,chara[0].y,10, -200,chara[0].y,-1];
					chara[1].animPos = [-200,chara[1].y,10, -200,chara[1].y,-1];
					chara[2].animPos = [-200,chara[2].y,10, -200,chara[2].y,-1];
					chara[3].animPos = [-200,chara[2].y,10, -200,chara[3].y,-1];
					chara[4].animPos = [840,chara[4].y,10, 840,chara[4].y,-1];
					chara[5].animPos = [840,chara[5].y,10, 840,chara[5].y,-1];
					chara[6].animPos = [840,chara[6].y,10, 840,chara[6].y,-1];
					chara[7].animPos = [840,chara[7].y,10, 840,chara[7].y,-1];
					
					chara[selected].animScale = [1.5,2, 1,4, 1,5];
					chara[selected].animPos = null;
					
					//拡大用キャラ読み込み
					chara2 = new DivSprite(2252/4,605);
					chara2.src = "img/00_common/" + charaData[selected].src;
					
				} else if (stFrm>=10 && LoadingCounter<=0) {
					st = STATUS.SELECTED_MOVE;
					stFrm = 0;
					break;
				}
				stFrm ++;
				break;
			
			//選択された：移動
			case STATUS.SELECTED_MOVE:
				if (stFrm == 0) {
					megami.animScale = [0.6,10, 0.6,-1];
					megami.animPos = [-10,-40,10, -10,-40,-1];
					
					chara[selected].alpha = 0;
					chara[selected].animAlpha = null;
					
					chara2.x=chara[selected].x;
					chara2.y=chara[selected].y;
					chara2.z=chara[selected].z;
					chara2.scale = (2704/16) / (2252/4);
					chara2.animPos = [320,480,10, 320,480,-1];
					chara2.animScale = [0.7,10, 0.7,-1];
					sceen.appendChild(chara2.div);
					animSprites.push(chara2);

					//セリフ読み込み
					mega_fuki = new DivSprite(463,205);
					mega_fuki.src = "img/00_common/g_g01_huk_b000.png";
					mega_words = new DivSprite(304,80);
					mega_words.src = "img/02_charaselect/" + charaData[selected].msg;
					chara_fuki = new DivSprite(300,224);
					chara_fuki.src = "img/00_common/g_g01_huk_c000.png";
					chara_words = new DivSprite(210,87);
					chara_words.src = "img/02_charaselect/g_g01_txt_c000.png";
				} else if (stFrm==10) {
					chara2.animPos = [320,480-10,10, 320,480,10, 320,480+10,10, 320,480,10];
				
				} else if (stFrm>=20 && LoadingCounter<=0) {
					st = STATUS.SELECTED_END;
					stFrm = 0;
					break;
				}
				stFrm ++;
				break;
			
			//選択された：選択完了
			case STATUS.SELECTED_END:
				switch (stFrm) {
					case 0: //めがみセリフセット
						mega_fuki.x=180+463/2; mega_fuki.y=-20+205/2; mega_fuki.z=2;
						mega_fuki.scale = 0;
						mega_fuki.animScale = [1.15,3, 1,2, 1,-1]
						sceen.appendChild(mega_fuki.div);
						animSprites.push(mega_fuki);
						mega_words.x=260+304/2; mega_words.y=40+80/2; mega_words.z=3;
						mega_words.alpha = 0;
						mega_words.animAlpha = [0,5, 1,5, 1,-1]
						sceen.appendChild(mega_words.div);
						animSprites.push(mega_words);
						break;
					case 4*10: //キャラクターセリフセット
						chara_fuki.x=340+300/2; chara_fuki.y=200+224/2; chara_fuki.z=5;
						chara_fuki.scale = 0;
						chara_fuki.animScale = [1.15,3, 1,2, 1,-1]
						sceen.appendChild(chara_fuki.div);
						animSprites.push(chara_fuki);
						chara_words.x=390+210/2; chara_words.y=250+87/2; chara_words.z=6;
						chara_words.alpha = 0;
						chara_words.animAlpha = [0,5, 1,5, 1,-1]
						sceen.appendChild(chara_words.div);
						animSprites.push(chara_words);
						chara2.anim = [2,10, 3,10];
						chara2.animPos = null;
						break;
						

				}
				
				stFrm ++;
				if (stFrm >= 10*10) {
					st = STATUS.FADEOUT;
					stFrm = 0;
				}
				break;
			
			//フェードアウト
			case STATUS.FADEOUT:
				alpha -= (1.0 / 6);
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
			animSprites.forEach(function(s){ s.animExec(); });
		}

	};
	
};

