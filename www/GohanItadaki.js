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
		{src:"k_pii_c.png"	},
		{src:"k_nas_c.png"	},
		{src:"k_tom_c.png"	},
		{src:"k_nik_c.png"	},
		{src:"k_sii_c.png"	},
		{src:"k_tam_c.png"	},
		{src:"k_nin_c.png"	},
		{src:"k_sak_c.png"	},
	];
	var scale = 0.6;
	var chara = new DivSprite(1280/2,830);
	chara.src = "img/00_common/" + charaData[gohanChara].src;
	chara.x=463; chara.y=489; chara.z=2;
	chara.scale = scale;
	chara.anim = [0,10, 1,10];
	sceen.appendChild(chara.div);
	animSprites.push(chara);
	
	//セリフ
	var fuki1 = new DivSprite(598,291);
	fuki1.src = "img/00_common/g_g01_huk_d000.png";
	animSprites.push(fuki1);
	var words1 = new DivSprite(359,138);
	words1.src = "img/03_itadakimasu/g_ita_txt_01_a.png";
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
					stFrm = 0;
				}
				sceen.style.opacity = alpha;
				break;

			//準備
			case STATUS.JYUNBI:
				if (stFrm==0) {
					selected = SELECTED.NO_SELECT;
				} else if (stFrm==10) {
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
					buttonYes.scale = 0;
					buttonYes.animScale = fukiInAnimScaleData;
					sceen.appendChild(buttonYes.div);
					buttonYes.onclick = function(){
						selected = SELECTED.YES;
					};
				} else if (stFrm==8*10+3*10+20) {
					buttonYes.animScale = [1.1,2, 1,2, 1,10];
				}
				stFrm ++;

				if (selected == SELECTED.YES) {
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
					sceen.appendChild(hands.div);
				} else if (stFrm == 1*10) {
					//かんしゃして
					fuki1.x=320; fuki1.y=144; fuki1.z=2;
					fuki1.scale = 0;
					fuki1.animScale = fukiInAnimScaleData;
					sceen.appendChild(fuki1.div);
					words3.x=329; words3.y=131; words3.z=3;
					words3.alpha = 0;
					words3.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words3.div);
				} else if (stFrm == 6*10) {
					fuki1.animScale = fukiOutAnimScaleData;
					words3.animAlpha = wordsOutAnimAlphaData;
				} else if (stFrm == 7*10) {
					sceen.removeChild(words3.div);
					//いただきます
					fuki1.scale = 0;
					fuki1.animScale = fukiInAnimScaleData;
					words4.x=329; words4.y=131; words4.z=3;
					words4.alpha = 0;
					words4.animAlpha = wordsInAnimAlphaData;
					words4.scale = 2;
					sceen.appendChild(words4.div);
				} else if (stFrm == 12*10) {
					fuki1.animScale = fukiOutAnimScaleData;
					words4.animAlpha = wordsOutAnimAlphaData;
					hands.animAlpha = [0, 5];
				} else if (stFrm == 14*10) {
					sceen.removeChild(words4.div);
					sceen.removeChild(hands.div);
					//ちゃんとできた？
					fuki1.scale = 0;
					fuki1.animScale = fukiInAnimScaleData;
					words5.x=329; words5.y=131; words5.z=3;
					words5.alpha = 0;
					words5.animAlpha = wordsInAnimAlphaData;
					sceen.appendChild(words5.div);
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
				} else if (stFrm==19*10) {
					buttonYes.animScale = [1.1,2, 1,2, 1,10, 1,10];
					buttonNo.animScale  = [1,10, 1.1,2, 1,2, 1,10];
				}
					
				
				stFrm ++;
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
				nextSceen = new SceenTitle();
				break;
		}
		
		if (st != STATUS.END) {
			//アニメーション処理
			animSprites.forEach(function(s){ s.animExec(); });
		}

	};
	
};

