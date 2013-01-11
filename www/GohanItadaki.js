//
// ごはんモード
//  いただきます〜


var SceenGohanItadaki = function() {

	var STATUS = {
		INIT:			0,
		FADEIN:			1,
		MAIN:			2,
		FADEOUT:		3,
		END:			4,
		
		JYUNBI:			10,
		JYUNBI_OUT:		11,
		ITADAKI:		12,
		ITADAKI_OUT:	13,
		OUEN_IN:		14,
		OUEN_IN2:		15,
		OUEN_OUT:		16,
		
		GOCHI_JYUNBI:	20,
		GOCHI_JYUNBI_OUT:	21,
		GOCHI:			22,
		GOCHI_END:		23,
		
		PRESENT_IN:		24,
		
	};
	var st = STATUS.INIT;
	var stFrm = 0;		//ステート処理用のフレームカウンタ
	
	var SELECTED = {
		NO_SELECT:		0,
		YES:			1,
		NO:				2,
	};
	var selected = SELECTED.NO_SELECT;
	
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
	bg.src = "img/00_common/g_bgd_02.png";
	sceen.appendChild(bg.div);
	//テーブル
	var table = new DivSprite(540,553);
	table.x=269; table.y=861; table.z=1;
	table.src = "img/03_itadakimasu/g_ita_tbl_01.png";
	sceen.appendChild(table.div);
	
	
	//キャラクター
	var charaData=[
		{src:"k_pii_c.png",	msg1:"g_ita_txt_01_a.png",	msg2:"g_sup_txt_01.png",	msg3:"g_sup_txt_04.png",	msg4:"g_sup_txt_06.png"	},
		{src:"k_nas_c.png",	msg1:"g_ita_txt_01_a.png",	msg2:"g_sup_txt_01.png",	msg3:"g_sup_txt_04.png",	msg4:"g_sup_txt_06.png"	},
		{src:"k_tom_c.png",	msg1:"g_ita_txt_01_b.png",	msg2:"g_sup_txt_02.png",	msg3:"g_sup_txt_05.png",	msg4:"g_sup_txt_07.png"	},
		{src:"k_nik_c.png",	msg1:"g_ita_txt_01_b.png",	msg2:"g_sup_txt_02.png",	msg3:"g_sup_txt_05.png",	msg4:"g_sup_txt_07.png"	},
		{src:"k_sii_c.png",	msg1:"g_ita_txt_01_a.png",	msg2:"g_sup_txt_01.png",	msg3:"g_sup_txt_04.png",	msg4:"g_sup_txt_06.png"	},
		{src:"k_tam_c.png",	msg1:"g_ita_txt_01_a.png",	msg2:"g_sup_txt_01.png",	msg3:"g_sup_txt_04.png",	msg4:"g_sup_txt_06.png"	},
		{src:"k_nin_c.png",	msg1:"g_ita_txt_01_b.png",	msg2:"g_sup_txt_02.png",	msg3:"g_sup_txt_05.png",	msg4:"g_sup_txt_07.png"	},
		{src:"k_sak_c.png",	msg1:"g_ita_txt_01_b.png",	msg2:"g_sup_txt_02.png",	msg3:"g_sup_txt_05.png",	msg4:"g_sup_txt_07.png"	},
	];
	var scale = 1;
	var chara = new DivSprite(1890/5,490);
	chara.src = "img/00_common/" + charaData[gohanChara].src;
	chara_x=463; chara_y=489;
	chara.x=chara_x; chara.y=chara_y; chara.z=2;
	chara.scale = scale;
	chara.anim = [0,10, 1,10];
	sceen.appendChild(chara.div);
	animSprites.push(chara);
	
	//セリフ
	var fuki1 = new DivSprite(598,291);
	fuki1.src = "img/00_common/g_g01_huk_d000.png";
	animSprites.push(fuki1);
	var words1 = new DivSprite(359,138);
	words1.src = "img/03_itadakimasu/" + charaData[gohanChara].msg1;
	animSprites.push(words1);
	var words2 = new DivSprite(359,131);
	words2.src = "img/03_itadakimasu/g_ita_txt_02.png";
	animSprites.push(words2);
	var words3 = new DivSprite(359,131);
	words3.src = "img/03_itadakimasu/g_ita_txt_03.png";
	animSprites.push(words3);
	var words4 = new DivSprite(359,131);
	words4.src = "img/03_itadakimasu/g_ita_txt_04.png";
	animSprites.push(words4);
	var words5 = new DivSprite(359,131);
	words5.src = "img/03_itadakimasu/g_ita_txt_05.png";
	animSprites.push(words5);
	//応援セリフ
	var words10 = new DivSprite(359,131);
	words10.src = "img/04_support/" + charaData[gohanChara].msg2;
	animSprites.push(words10);
	var words11 = new DivSprite(359,131);
	words11.src = "img/04_support/" + charaData[gohanChara].msg3;
	animSprites.push(words11);
	var words12 = new DivSprite(359,131);
	words12.src = "img/04_support/" + charaData[gohanChara].msg4;
	animSprites.push(words12);
	var words13 = new DivSprite(359,131);
	words13.src = "img/04_support/g_sup_txt_03.png";
	animSprites.push(words13);
	var fuki10 = new DivSprite(440,299);
	fuki10.src = "img/00_common/g_g01_huk_f000.png";
	animSprites.push(fuki10);
	var fuki11 = new DivSprite(256,258);
	fuki11.src = "img/00_common/g_g01_huk_e000.png";
	animSprites.push(fuki11);
	//ごちそうさまセリフ
	var words20 = new DivSprite(360,72);
	words20.src = "img/05_gotisousama/g_got_txt_01.png";
	animSprites.push(words20);
	var words21 = new DivSprite(360,72);
	words21.src = "img/05_gotisousama/g_got_txt_02.png";
	animSprites.push(words21);
	var words22 = new DivSprite(360,72);
	words22.src = "img/05_gotisousama/g_got_txt_03.png";
	animSprites.push(words22);
	var words23 = new DivSprite(360,72);
	words23.src = "img/05_gotisousama/g_got_txt_04.png";
	animSprites.push(words23);
	var fuki20 = new DivSprite(463,205);
	fuki20.src = "img/00_common/g_g01_huk_b000.png";
	animSprites.push(fuki20);
	//ご褒美
	var words30 = new DivSprite(360,72);
	words30.src = "img/06_present/g_pre_txt_a.png";
	animSprites.push(words30);
	var words31 = new DivSprite(360,72);
	words31.src = "img/06_present/g_pre_txt_b.png";
	animSprites.push(words31);
	var shop = new DivSprite(256,258);
	shop.src = "img/06_present/g_pre_obj_a.png";
	animSprites.push(shop);
	
	
	//ボタン
	var buttonYes = new DivSprite(281,184);
	buttonYes.src = "img/00_common/k_btn_a.png";
	animSprites.push(buttonYes);
	var buttonNo = new DivSprite(281,184);
	buttonNo.src = "img/00_common/k_btn_b.png";
	animSprites.push(buttonNo);
	
	//手
	var hands = new DivSprite(256,258);
	hands.src = "img/00_common/g_hand_01.png";
	animSprites.push(hands);
	
	//女神
	var megami = new DivSprite(400,520);
	megami.basePos={x:0,y:0};
	megami.src = "img/00_common/k_sin_c.png";
	animSprites.push(megami);
	
	// アニメーションデータ
	var fukiInAnimScaleData = [1.15,3, 1,2, 1,-1];
	var wordsInAnimAlphaData = [0,5, 1,5, 1,-1];
	var fukiOutAnimScaleData = [0,3, 0,-1];
	var wordsOutAnimAlphaData = [0,2, 0,-1];
	
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
				alpha += (1.0 / 6);
				if (alpha >= 1.0) {
					alpha = 1.0;
					st = STATUS.JYUNBI;
					//st = STATUS.ITADAKI;
					//st = STATUS.OUEN_IN;
					//st = STATUS.OUEN_IN2;
					stFrm = 0;
				}
				sceen.style.opacity = alpha;
				break;

			//準備
			case STATUS.JYUNBI:
				if (stFrm==0) {
					selected = SELECTED.NO_SELECT;
				} else if (stFrm==10) {
//					playSound("sound/se/ok.mp3");
					//ぼくといっしょに
					fuki1.x=320; fuki1.y=144; fuki1.z=2;
					fuki1.scale = 0;
					fuki1.animScale = fukiInAnimScaleData;
					sceen.appendChild(fuki1.div);
					words1.x=329; words1.y=131; words1.z=3;
					words1.alpha = 0;
					words1.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words1.div);
				} else if (stFrm==7*10) {
					fuki1.animScale = fukiOutAnimScaleData;
					words1.animAlpha = wordsOutAnimAlphaData;
				} else if (stFrm==8*10) {
//					playSound("sound/se/ok.mp3");
					//準備はいい？
					sceen.removeChild(words1.div);
					fuki1.scale = 0;
					fuki1.animScale = fukiInAnimScaleData;
					words2.x=329; words2.y=131; words2.z=3;
					words2.alpha = 0;
					words2.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words2.div);
				} else if (stFrm==8*10+3*10) {
					//はい
					buttonYes.x=320; buttonYes.y=712; buttonYes.z=5;
					buttonYes.alpha = 1;
					buttonYes.scale = 0;
					buttonYes.animScale = fukiInAnimScaleData;
					buttonYes.animAlpha = null;
					sceen.appendChild(buttonYes.div);
					buttonYes.onclick = function(){
						selected = SELECTED.YES;
					};
				} else if (stFrm==8*10+3*10+10) {
					buttonYes.animScale = [1,10, 1.1,2, 1,2];
				}
				stFrm ++;

				if (selected == SELECTED.YES) {
//					playSound("sound/se/ok.mp3");
					st = STATUS.JYUNBI_OUT;
					stFrm = 0;
				}
				break;
			//準備終了
			case STATUS.JYUNBI_OUT:
				if (stFrm == 0) {
					buttonYes.animScale = [2.5,7];
					buttonYes.animAlpha = [1,3, 0,4, 0,-1];
				} else if (stFrm == 10) {
					fuki1.animScale = fukiOutAnimScaleData;
					words2.animAlpha = wordsOutAnimAlphaData;
				} else if (stFrm == 2*10) {
					sceen.removeChild(fuki1.div);
					sceen.removeChild(words2.div);
					sceen.removeChild(buttonYes.div);
					st = STATUS.ITADAKI;
					stFrm = 0;
					break;		
				}
				stFrm++;
				break;
			//いただきます
			case STATUS.ITADAKI:
				if (stFrm == 0) {
					selected = SELECTED.NO_SELECT;
				} else if (stFrm == 5) {
					//手　登場
					hands.x=147; hands.y=460; hands.z=2;
					hands.scale = 0;
					hands.animScale = fukiInAnimScaleData;
					hands.frame = 0;
					sceen.appendChild(hands.div);
				} else if (stFrm == 1*10) {
//					playSound("sound/se/ok.mp3");
					//かんしゃして
					fuki1.x=320; fuki1.y=144; fuki1.z=2;
					fuki1.scale = 0;
					fuki1.animScale = fukiInAnimScaleData;
					sceen.appendChild(fuki1.div);
					words3.x=329; words3.y=131; words3.z=3;
					words3.alpha = 0;
					words3.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words3.div);
					chara.anim = [2,100];
				} else if (stFrm == 6*10) {
					fuki1.animScale = fukiOutAnimScaleData;
					words3.animAlpha = wordsOutAnimAlphaData;
				} else if (stFrm == 7*10) {
					sceen.removeChild(words3.div);
					playSound("sound/voice/itadakimasu_2.mp3");
					//いただきます
					fuki1.scale = 0;
					fuki1.animScale = fukiInAnimScaleData;
					words4.x=329; words4.y=131; words4.z=3;
					words4.alpha = 0;
					words4.animAlpha = wordsInAnimAlphaData;
					words4.scale = 1;
					sceen.appendChild(words4.div);
					chara.anim = [3,100];
					hands.frame = 1;
				} else if (stFrm == 12*10) {
					fuki1.animScale = fukiOutAnimScaleData;
					words4.animAlpha = wordsOutAnimAlphaData;
				} else if (stFrm == 14*10) {
					sceen.removeChild(words4.div);
					sceen.removeChild(hands.div);
					//ちゃんとできた？
//					playSound("sound/se/ok.mp3");
					fuki1.scale = 0;
					fuki1.animScale = fukiInAnimScaleData;
					words5.x=329; words5.y=131; words5.z=3;
					words5.alpha = 0;
					words5.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words5.div);
					chara.anim = [0,10, 1,10];
				} else if (stFrm == 17*10) {
					//はい
					buttonYes.x=168; buttonYes.y=712; buttonYes.z=5;
					buttonYes.scale = 0;
					buttonYes.alpha = 1;
					buttonYes.animScale = fukiInAnimScaleData;
					buttonYes.animAlpha = null;
					sceen.appendChild(buttonYes.div);
					buttonYes.onclick = function(){
						selected = SELECTED.YES;
					};
					//いいえ
					buttonNo.x=466; buttonNo.y=712; buttonNo.z=5;
					buttonNo.scale = 0;
					buttonNo.alpha = 1;
					buttonNo.animScale = fukiInAnimScaleData;
					sceen.appendChild(buttonNo.div);
					buttonNo.onclick = function(){
						selected = SELECTED.NO;
					};
				} else if (stFrm==18*10) {
					buttonYes.animScale = [1,10, 1.1,2, 1,2, 1,10];
					buttonNo.animScale  = [1,10, 1,10, 1.1,2, 1,2];
				}
				
				if (selected != SELECTED.NO_SELECT) {
					st = STATUS.ITADAKI_OUT;
					stFrm = 0;
					break;
				}
				
				stFrm ++;
				break;

			//いただきます out
			case STATUS.ITADAKI_OUT:
				if (stFrm == 0) {
					if (selected == SELECTED.YES) {
						buttonYes.animScale = [2.5,7];
						buttonYes.animAlpha = [1,3, 0,4, 0,-1];
						buttonNo.animScale = [0,7];
						buttonNo.animAlpha = [0,7];
					} else {
						buttonNo.animScale = [2.5,7];
						buttonNo.animAlpha = [1,3, 0,4, 0,-1];
						buttonYes.animScale = [0,7];
						buttonYes.animAlpha = [0,7];
					}
					fuki1.animScale = fukiOutAnimScaleData;
					words5.animAlpha = wordsOutAnimAlphaData;
				} else if (stFrm == 10) {
					sceen.removeChild(fuki1.div);
					sceen.removeChild(words5.div);
					sceen.removeChild(buttonYes.div);
					sceen.removeChild(buttonNo.div);
					
					if (selected == SELECTED.NO) {
						st = STATUS.JYUNBI;
					} else {
						st = STATUS.OUEN_IN;
					}
					stFrm = 0;
					break;
				}
				
				stFrm ++;
				break;
			
			//応援
			case STATUS.OUEN_IN:
				if (stFrm == 0) {
					chara.anim = [0,10, 1,10];
					chara.animScale = [1.3,3, 1.3,2, 1.0,7, 1.0,-1];
					chara.animPos = [320+30,chara_y-200,3, 320+20,chara_y-210,2, 320,chara_y-60,7, 320,chara_y-60,-1];
				} else if (stFrm == 2*10) {
					fuki1.x=320; fuki1.y=144; fuki1.z=2;
					fuki1.scale = 0;
					fuki1.animScale = fukiInAnimScaleData;
					sceen.appendChild(fuki1.div);
					words10.x=329; words10.y=131; words10.z=3;
					words10.alpha = 0;
					words10.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words10.div);
				} else if (stFrm == 7*10) {
					fuki1.animScale = fukiOutAnimScaleData;
					words10.animAlpha = wordsOutAnimAlphaData;
				} else if (stFrm == 8*10) {
					sceen.removeChild(words10.div);
					fuki1.animScale = fukiInAnimScaleData;
					words11.x=329; words11.y=131; words11.z=3;
					words11.alpha = 0;
					words11.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words11.div);
				} else if (stFrm == 13*10) {
					fuki1.animScale = fukiOutAnimScaleData;
					words11.animAlpha = wordsOutAnimAlphaData;
				} else if (stFrm == 14*10) {
					sceen.removeChild(words11.div);
					fuki1.animScale = fukiInAnimScaleData;
					words12.x=329; words12.y=131; words12.z=3;
					words12.alpha = 0;
					words12.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words12.div);
				} else if (stFrm == 19*10) {
					fuki1.animScale = fukiOutAnimScaleData;
					words12.animAlpha = wordsOutAnimAlphaData;
				} else if (stFrm == 21*10) {
					sceen.removeChild(fuki1.div);
					sceen.removeChild(words12.div);
					st = STATUS.OUEN_IN2;
					stFrm = 0;
					break;
				}
				
				stFrm ++;
				break;
			
			//応援女神登場
			case STATUS.OUEN_IN2:
				if (stFrm == 0) {
					selected = SELECTED.NO_SELECT;
					chara.anim = null;
					chara.animScale = [1,5];
					chara.animPos = [chara_x,chara_y,5];
					megami.x=-10; megami.y=-10; megami.z=1;
					megami.scale = 0.7;
					megami.alpha = 0;
					megami.animAlpha = [1,15];
					megami.anim = [0,40, 1,40];
					sceen.appendChild(megami.div);
				} else if (stFrm == 2*10) {
					chara.anim = [0,10, 1,10];
					fuki10.x=429; fuki10.y=127; fuki10.z=2;
					fuki10.alpha = 1;
					fuki10.animAlpha = null;
					fuki10.scale = 0;
					fuki10.animScale = fukiInAnimScaleData;
					sceen.appendChild(fuki10.div);
					words13.x=438; words13.y=120; words13.z=3;
					words13.alpha = 0;
					words13.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words13.div);
				} else if (stFrm == 5*10) {
					//はい
					buttonYes.x=168; buttonYes.y=712; buttonYes.z=5;
					buttonYes.scale = 0;
					buttonYes.alpha = 1;
					buttonYes.animScale = fukiInAnimScaleData;
					buttonYes.animAlpha = null;
					sceen.appendChild(buttonYes.div);
					buttonYes.onclick = null;
					//いいえ
					buttonNo.x=466; buttonNo.y=712; buttonNo.z=5;
					buttonNo.scale = 0;
					buttonNo.alpha = 1;
					buttonNo.animScale = fukiInAnimScaleData;
					buttonNo.animAlpha = null;
					sceen.appendChild(buttonNo.div);
					buttonNo.onclick = null;
				} else if (stFrm==6*10) {
					buttonYes.animScale = [1,10, 1.1,2, 1,2, 1,10];
					buttonNo.animScale  = [1,10, 1,10, 1.1,2, 1,2];
					fuki11.alpha = 0;
					sceen.appendChild(fuki11.div);
					words11.alpha = 0;
					sceen.appendChild(words11.div);
					words12.alpha = 0;
					sceen.appendChild(words12.div);
					buttonYes.onclick = function(){
						selected = SELECTED.YES;
					};
					buttonNo.onclick = function(){
						selected = SELECTED.NO;
					};
				} else if (stFrm==8*10) {
					fuki11.x=180; fuki11.y=458; fuki11.z=2;
					fuki11.alpha = 0;
					fuki11.animAlpha = [1,5];
					words11.x=180; words11.y=458; words11.z=3;
					words11.alpha = 0;
					words11.animAlpha = [1,5];
				} else if (stFrm==12*10) {
					fuki11.animAlpha = [0,5];
					words11.animAlpha = [0,5];
				} else if (stFrm==13*10) {
					fuki11.x=200; fuki11.y=420; fuki11.z=2;
					fuki11.animAlpha = [1,5];
					words12.x=200; words12.y=420; words12.z=3;
					words12.alpha = 0;
					words12.animAlpha = [1,5];
				} else if (stFrm==17*10) {
					fuki11.animAlpha = [0,5];
					words12.animAlpha = [0,5];
				} else if (stFrm==18*10) {
					stFrm = 8*10;
					break;
				}
				
				if (selected != SELECTED.NO_SELECT) {
					st = STATUS.OUEN_OUT;
					stFrm = 0;
					break;
				}
				
				stFrm ++;
				break;
			
			//応援終了
			case STATUS.OUEN_OUT:
				if (stFrm == 0) {
					fuki10.animAlpha = [0,5];
					fuki11.animAlpha = [0,5];
					words11.animAlpha = [0,5];
					words12.animAlpha = [0,5];
					words13.animAlpha = [0,5];
					if (selected == SELECTED.YES) {
						buttonYes.animScale = [2.5,7];
						buttonYes.animAlpha = [1,3, 0,4, 0,-1];
						buttonNo.animScale = [0,7];
						buttonNo.animAlpha = [0,7];
					} else {
						buttonNo.animScale = [2.5,7];
						buttonNo.animAlpha = [1,3, 0,4, 0,-1];
						buttonYes.animScale = [0,7];
						buttonYes.animAlpha = [0,7];
					}
				} else if (stFrm == 10) {
					sceen.removeChild(fuki10.div);
					sceen.removeChild(fuki11.div);
					sceen.removeChild(words11.div);
					sceen.removeChild(words12.div);
					sceen.removeChild(words13.div);
					sceen.removeChild(buttonYes.div);
					sceen.removeChild(buttonNo.div);
					
					if (selected == SELECTED.YES) {
						st = STATUS.GOCHI_JYUNBI;
						stFrm = 0;
						break;
					}
				} else if (stFrm == 2*10) {
					megami.animAlpha = [0,10];
				} else if (stFrm == 4*10) {
					sceen.removeChild(megami.div);
					st = STATUS.OUEN_IN;
					stFrm = 0;
					break;
				}
				
				stFrm ++;
				break;
			
			//ごちそうさま準備
			case STATUS.GOCHI_JYUNBI:
				if (stFrm == 0) {
					selected = SELECTED.NO_SELECT;
				} else if (stFrm == 1*10) {
					//たべれましたね
					fuki20.x=412; fuki20.y=148; fuki20.z=2;
					fuki20.alpha = 1;
					fuki20.animAlpha = null;
					fuki20.scale = 0;
					fuki20.animScale = fukiInAnimScaleData;
					sceen.appendChild(fuki20.div);
					words20.x=420; words20.y=155; words20.z=3;
					words20.alpha = 0;
					words20.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words20.div);
				} else if (stFrm == 5*10) {
					//じゅんびはいい？
					fuki11.x=180; fuki11.y=458; fuki11.z=2;
					fuki11.alpha = 1;
					fuki11.animAlpha = null;
					fuki11.scale = 0;
					fuki11.animScale = fukiInAnimScaleData;
					sceen.appendChild(fuki11.div);
					words2.x=180; words2.y=470; words2.z=3;
					words2.alpha = 0;
					words2.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words2.div);
				} else if (stFrm == 8*10) {
					//はい
					buttonYes.x=320; buttonYes.y=712; buttonYes.z=5;
					buttonYes.alpha = 1;
					buttonYes.scale = 0;
					buttonYes.animScale = fukiInAnimScaleData;
					buttonYes.animAlpha = null;
					sceen.appendChild(buttonYes.div);
					buttonYes.onclick = null;
				} else if (stFrm==9*10) {
					buttonYes.animScale = [1,10, 1.1,2, 1,2];
					buttonYes.onclick = function(){
						selected = SELECTED.YES;
					};
				}
				
				stFrm ++;

				if (selected == SELECTED.YES) {
					st = STATUS.GOCHI_JYUNBI_OUT;
					stFrm = 0;
				}
				break;

			//ごちそうさま準備終了
			case STATUS.GOCHI_JYUNBI_OUT:
				if (stFrm == 0) {
					buttonYes.animScale = [2.5,7];
					buttonYes.animAlpha = [1,3, 0,4, 0,-1];
				} else if (stFrm == 10) {
					fuki20.animScale = fukiOutAnimScaleData;
					words20.animAlpha = wordsOutAnimAlphaData;
					fuki11.animScale = fukiOutAnimScaleData;
					words2.animAlpha = wordsOutAnimAlphaData;
				} else if (stFrm == 2*10) {
					sceen.removeChild(fuki20.div);
					sceen.removeChild(words20.div);
					sceen.removeChild(fuki11.div);
					sceen.removeChild(words2.div);
					sceen.removeChild(buttonYes.div);
					st = STATUS.GOCHI;
					stFrm = 0;
					break;		
				}
				stFrm++;
				break;

			//ごちそうさま
			case STATUS.GOCHI:
				if (stFrm == 0) {
					selected = SELECTED.NO_SELECT;
				} else if (stFrm == 5) {
					//手　登場
					hands.x=147; hands.y=460; hands.z=2;
					hands.alpha = 1;
					hands.animAlpha = null;
					hands.scale = 0;
					hands.animScale = fukiInAnimScaleData;
					hands.frame = 0;
					sceen.appendChild(hands.div);
				} else if (stFrm == 1*10) {
					fuki20.x=412; fuki20.y=148; fuki20.z=2;
					fuki20.alpha = 1;
					fuki20.animAlpha = null;
					fuki20.scale = 0;
					fuki20.animScale = fukiInAnimScaleData;
					sceen.appendChild(fuki20.div);
					words21.x=420; words21.y=155; words21.z=3;
					words21.alpha = 0;
					words21.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words21.div);
					chara.anim = [2,100];
					megami.anim = [2,100];
				} else if (stFrm == 6*10) {
					fuki20.animScale = fukiOutAnimScaleData;
					words21.animAlpha = wordsOutAnimAlphaData;
				} else if (stFrm == 8*10) {
					sceen.removeChild(words21.div);
					//ごちそうさま
					playSound("sound/voice/gochisousama_2.mp3");
					fuki20.scale = 0;
					fuki20.animScale = fukiInAnimScaleData;
					words22.x=420; words22.y=155; words22.z=3;
					words22.alpha = 0;
					words22.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words22.div);
					hands.frame = 1;
					chara.anim = [3,100];
					megami.anim = [3,100];
				} else if (stFrm == 13*10) {
					fuki20.animScale = fukiOutAnimScaleData;
					words22.animAlpha = wordsOutAnimAlphaData;
				} else if (stFrm == 15*10) {
					sceen.removeChild(words22.div);
					sceen.removeChild(hands.div);
					//ちゃんとできた？
					fuki20.scale = 0;
					fuki20.animScale = fukiInAnimScaleData;
					words23.x=420; words23.y=155; words23.z=3;
					words23.alpha = 0;
					words23.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words23.div);
					chara.anim = [0,10, 1,10];
					megami.anim = [0,40, 1,40];
				} else if (stFrm == 18*10) {
					//はい
					buttonYes.x=168; buttonYes.y=712; buttonYes.z=5;
					buttonYes.scale = 0;
					buttonYes.alpha = 1;
					buttonYes.animScale = fukiInAnimScaleData;
					buttonYes.animAlpha = null;
					sceen.appendChild(buttonYes.div);
					buttonYes.onclick = null;
					//いいえ
					buttonNo.x=466; buttonNo.y=712; buttonNo.z=5;
					buttonNo.scale = 0;
					buttonNo.alpha = 1;
					buttonNo.animScale = fukiInAnimScaleData;
					buttonNo.animAlpha = null;
					sceen.appendChild(buttonNo.div);
					buttonNo.onclick = null;
				} else if (stFrm==19*10) {
					buttonYes.animScale = [1,10, 1.1,2, 1,2, 1,10];
					buttonNo.animScale  = [1,10, 1,10, 1.1,2, 1,2];
					buttonYes.onclick = function(){
						selected = SELECTED.YES;
					};
					buttonNo.onclick = function(){
						selected = SELECTED.NO;
					};
				}
				
				if (selected != SELECTED.NO_SELECT) {
					st = STATUS.GOCHI_OUT;
					stFrm = 0;
					break;
				}
				
				stFrm ++;
				break;

			//ごちそうさま out
			case STATUS.GOCHI_OUT:
				if (stFrm == 0) {
					if (selected == SELECTED.YES) {
						buttonYes.animScale = [2.5,7];
						buttonYes.animAlpha = [1,3, 0,4, 0,-1];
						buttonNo.animScale = [0,7];
						buttonNo.animAlpha = [0,7];
					} else {
						buttonNo.animScale = [2.5,7];
						buttonNo.animAlpha = [1,3, 0,4, 0,-1];
						buttonYes.animScale = [0,7];
						buttonYes.animAlpha = [0,7];
					}
					fuki20.animScale = fukiOutAnimScaleData;
					words23.animAlpha = wordsOutAnimAlphaData;
				} else if (stFrm == 10) {
					sceen.removeChild(fuki20.div);
					sceen.removeChild(words23.div);
					sceen.removeChild(buttonYes.div);
					sceen.removeChild(buttonNo.div);
					
					if (selected == SELECTED.NO) {
						st = STATUS.GOCHI_JYUNBI;
					} else {
						st = STATUS.PRESENT_IN;
					}
					stFrm = 0;
					break;
				}
				
				stFrm ++;
				break;

			//プレゼント
			case STATUS.PRESENT_IN:
				if (stFrm == 1*10) {
					//コイン追加
					AddCoin(1);
					//よくできましたね
					fuki20.x=412; fuki20.y=148; fuki20.z=2;
					fuki20.alpha = 1;
					fuki20.animAlpha = null;
					fuki20.scale = 0;
					fuki20.animScale = fukiInAnimScaleData;
					sceen.appendChild(fuki20.div);
					words30.x=420; words30.y=155; words30.z=3;
					words30.alpha = 0;
					words30.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words30.div);
				} else if (stFrm == 7*10) {
					fuki20.animScale = fukiOutAnimScaleData;
					words30.animAlpha = wordsOutAnimAlphaData;
				} else if (stFrm == 9*10) {
					//しょっぷアイコン
					shop.x=147; shop.y=460; shop.z=2;
					shop.scale = 0;
					shop.animScale = fukiInAnimScaleData;
					sceen.appendChild(shop.div);
				} else if (stFrm == 10*10) {
					//しょっぷでつかってね
					fuki20.x=412; fuki20.y=148; fuki20.z=2;
					fuki20.scale = 0;
					fuki20.animScale = fukiInAnimScaleData;
					sceen.appendChild(fuki20.div);
					words31.x=420; words31.y=155; words31.z=3;
					words31.alpha = 0;
					words31.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words31.div);
				} else if (stFrm == 16*10) {
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
				nextSceen = new SceenGohanCoinGet();
				break;
		}
		
		if (st != STATUS.END) {
			//アニメーション処理
			animSprites.forEach(function(s){ s.animExec(); });
		}

	};
	
};

