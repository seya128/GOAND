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
	animSprites.push(fuki);
	//セリフ
	var words = new DivSprite(310,87);
	words.x=166+310/2; words.y=61+87/2, words.z=3;
	words.src = "img/02_charaselect/g_g01_txt_a.png";
	animSprites.push(words);
	var words2 = new DivSprite(310,87);
	words2.x=166+310/2; words2.y=61+87/2, words2.z=3;
	words2.src = "img/02_charaselect/g_g01_txt_b.png";
	animSprites.push(words2);
	
	//キャラクター
	var charaData=[
		{x:38,	y:185,	anim:[ 1,20,  0,2,  1,2,  0,2],	inAlpha:[0,3+1, 1,5, 1,-1],	src:"k_pii_a.png",	msg:"g_g01_pii_txt_a000.png"	},
		{x:11,	y:321,	anim:[ 3,40,  2,2,  3,2,  2,2],	inAlpha:[0,3+2, 1,5, 1,-1],	src:"k_nas_a.png",	msg:"g_g01nas_txt_a000.png"	},
		{x:34,	y:470,	anim:[ 5,26,  4,2,  5,2,  4,2],	inAlpha:[0,3+3, 1,5, 1,-1],	src:"k_tom_a.png",	msg:"g_g01_tom_txt_a000.png"	},
		{x:176,	y:578,	anim:[ 7,18,  6,2,  7,2,  6,2],	inAlpha:[0,3+4, 1,5, 1,-1],	src:"k_nik_a.png",	msg:"g_g01_nik_txt_a000.png"	},
		{x:340,	y:578,	anim:[ 9,23,  8,2,  9,2,  8,2],	inAlpha:[0,3+5, 1,5, 1,-1],	src:"k_sii_a.png",	msg:"g_g01_sii_txt_a000.png"	},
		{x:485,	y:475,	anim:[11,30, 10,2, 11,2, 10,2],	inAlpha:[0,3+6, 1,5, 1,-1],	src:"k_tam_a.png",	msg:"g_g01_tam_txt_a000.png"	},
		{x:506,	y:332,	anim:[13,28, 12,2, 13,2, 12,2],	inAlpha:[0,3+7, 1,5, 1,-1],	src:"k_nin_a.png",	msg:"g_g01_nin_txt_a000.png"	},
		{x:485,	y:181,	anim:[15,32, 14,2, 15,2, 14,2],	inAlpha:[0,3+8, 1,5, 1,-1],	src:"k_sak_a.png",	msg:"g_g01_sak_txt_a000.png"	},
	];
	
	var chara = {};
	var ofsx=-28;
	
	for (var i=0; i<charaData.length; i++) {
		chara[i] = new DivSprite(2704/16,180);
		chara[i].src = "img/00_common/k_zen_a.png"
		chara[i].id = i;
		chara[i].x = charaData[i].x + ofsx +(2704/16)/2;
		chara[i].y = charaData[i].y + 180/2;
		chara[i].z = 4;
		chara[i].scale = 1;
		chara[i].animScale = [1,10*(i+1), 1.1,2, 1,4, 1,(charaData.length-i)*10];
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

	// アニメーションデータ
	var fukiInAnimScaleData = [1.15,3, 1,2, 1,-1];
	var wordsInAnimAlphaData = [0,5, 1,5, 1,-1];
	var fukiOutAnimScaleData = [0,3, 0,-1];
	var wordsOutAnimAlphaData = [0,2, 0,-1];


	//
	// チュートリアル関連処理
	//
	var	TUTORIAL_ST = {		//チュートリアルステータス
		INIT:		0,
		IN:			1,
		MAIN:		2,
		OUT:		3,
	};
	var Tutorial = function() {
		this.st = TUTORIAL_ST.INIT;
		this.cancel = false;					//true:チュートリアル終わる
		this.isEnd = GetTutorialLookFlg();		//true:チュートリアルを一度終えている
		this.isStart = false;					//true:チュートリアル開始
		this.alpha = 0;							//チュートリアルα
		this.type = 0;							//チュートリアルタイプ
		
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
		this.msg = new DivSprite(432,180);
		this.msg.src = "img/10_asobikata/a_txt_a003.png";
		this.msg.basePos={x:0, y:0};
		this.msg.x = 150;
		this.msg.y = 128;
		this.msg.z = 20;
		//チュートリアル矢印ボタン
		this.arrow = new DivSprite(113,125);
		this.arrow.src = "img/10_asobikata/a_obj_a000.png";
	};
	//チュートリアル用矢印をDOMに追加
	Tutorial.prototype.addDomArrow = function() {		
		var x=38;
		var y=85;
		this.arrow.basePos={x:0, y:0};
		this.arrow.x = x;
		this.arrow.y = y;
		this.arrow.z = 20;
		this.arrow.animPos = [x,y+0,1, x,y+1,1, x,y+2,1, x,y+3,1, x,y+4,1, x,y+3,1, x,y+2,1, x,y+1,1];
		sceen.appendChild(this.arrow.div);
		animSprites.push(this.arrow);
	};
	Tutorial.prototype.delDomArrow = function() {		
		sceen.removeChild(this.arrow.div);
	}
	
	//チュートリアル用「おわる」ボタンをDOMに追加
	Tutorial.prototype.addDomEnd = function() {
		//すでに一度見終わっている場合のみ表示
		if (this.isEnd) {
			this.endBtn.basePos={x:0, y:0};
			this.endBtn.x = 489;
			this.endBtn.y = 11;
			this.endBtn.z = 20;
			sceen.appendChild(this.endBtn.div);
			var _this = this;
			this.endBtn.onclick = function() {
				g_TutorialStatus = gTUTORIAL_STATUS.NONE;
				_this.cancel = true;
			};
		}
	};
	Tutorial.prototype.delDomEnd = function() {
		if (this.isEnd) {
			sceen.removeChild(this.endBtn.div);
		}
	};
	
	
	//チュートリアルフレーム処理
	Tutorial.prototype.execFrame = function() {
		if (this.isStart) {
			switch (this.st) {
				//初期化
				case TUTORIAL_ST.INIT:
					this.st = TUTORIAL_ST.IN;
					//黒マスクをDOMに追加
					sceen.appendChild(this.maskDiv);
					this.alpha = 0;
					//該当ボタンのZ座標を黒マスクの手前に
					chara[0].z += 10;
					//メッセージをDOMに追加
					sceen.appendChild(this.msg.div);
					//矢印をDOMに追加
					this.addDomArrow();
					//終わるをDOMに追加
					this.addDomEnd();
					
					break;
				//イン
				case TUTORIAL_ST.IN:
					this.alpha += 0.6/10;
					if (this.alpha >= 0.6) {
						this.st = TUTORIAL_ST.MAIN;
					}
					this.maskDiv.style.opacity = this.alpha;
					break;
			}
		} else {
			if (this.st != TUTORIAL_ST.INIT) {
				this.st = TUTORIAL_ST.INIT;
				//チュートリアル削除
				chara[0].z -= 10;
				sceen.removeChild(this.maskDiv);
				sceen.removeChild(this.msg.div);
				this.delDomArrow();
				this.delDomEnd();
			}
		}
	};
	
	var tutorial = new Tutorial();

	
	
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
					stFrm = 0;
				}
				sceen.style.opacity = alpha;
				break;

			//メイン処理
			case STATUS.MAIN:
				if (stFrm == 0) {
					fuki.scale = 0;
					fuki.animScale = fukiInAnimScaleData;
					sceen.appendChild(fuki.div);
					words2.alpha = 0;
					words2.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words2.div);
				} else if (stFrm == 5*10) {
					fuki.animScale = fukiOutAnimScaleData;
					words2.animAlpha = wordsOutAnimAlphaData;
				} else if (stFrm == 6*10) {
					fuki.scale = 0;
					fuki.animScale = fukiInAnimScaleData;
					words.alpha = 0;
					words.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words.div);
					//チュートリアルモードであれば開始
					if (g_TutorialStatus == gTUTORIAL_STATUS.GOHAN)
						tutorial.isStart = true;
				}
				stFrm ++;
				
				//キャラが選択されたら次へ
				if (selected != -1) {
					//選択したキャラクターをグローバル変数にセット
					gohanChara = selected;
					st = STATUS.SELECTED_INIT;
					stFrm = 0;
					//チュートリアルの後処理
					tutorial.isStart = false;
				}
				
				//チュートリアル終わりボタン押されたら終了
				if (tutorial.cancel) {
					st = STATUS.FADEOUT;
					stFrm = 0;
				}
				break;

			//選択された：初期化
			case STATUS.SELECTED_INIT:
				if (stFrm == 0) {
					fuki.animScale = fukiOutAnimScaleData;
					words.animAlpha = wordsOutAnimAlphaData;
					words2.animAlpha = wordsOutAnimAlphaData;
					
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
						mega_fuki.animScale = fukiInAnimScaleData;
						sceen.appendChild(mega_fuki.div);
						animSprites.push(mega_fuki);
						mega_words.x=260+304/2; mega_words.y=40+80/2; mega_words.z=3;
						mega_words.alpha = 0;
						mega_words.animAlpha = wordsInAnimAlphaData;
						sceen.appendChild(mega_words.div);
						animSprites.push(mega_words);
						break;
					case 4*10: //キャラクターセリフセット
						chara_fuki.x=340+300/2; chara_fuki.y=200+224/2; chara_fuki.z=5;
						chara_fuki.scale = 0;
						chara_fuki.animScale = fukiInAnimScaleData;
						sceen.appendChild(chara_fuki.div);
						animSprites.push(chara_fuki);
						chara_words.x=390+210/2; chara_words.y=250+87/2; chara_words.z=6;
						chara_words.alpha = 0;
						chara_words.animAlpha = wordsInAnimAlphaData;
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
				if (tutorial.cancel)	nextSceen = new SceenTitle();
				else					nextSceen = new SceenGohanItadaki();
				break;
		}
		
		if (st != STATUS.END) {
			//チュートリアル処理
			tutorial.execFrame();
			
			//アニメーション処理
			animSprites.forEach(function(s){ s.animExec(); });
		}

	};
	
};

