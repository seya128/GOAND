//
// タイトル
//


var SceenHelp = function() {
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
	bg.src = "img/02_charaselect/g_g01_bgd_a.png";
	sceen.appendChild(bg.div);	
	
	//チュートリアル
	var tutorialBtn = new DivSprite(480,170);
	tutorialBtn.x=640/2; tutorialBtn.y=300; tutorialBtn.z=1;
	tutorialBtn.src = "img/01_title/t_btn_h000.png";
	tutorialBtn.animScale = [1,10, 1,10, 1,10, 1,10, 1.1,2, 1,2];
	tutorialBtn.onclick = function(){
		event.preventDefault();
		g_TutorialStatus=gTUTORIAL_STATUS.GOHAN;
		next = NEXT.TITLE;			// 再度タイトルシーン
	};
	sceen.appendChild(tutorialBtn.div);
	animSprites.push(tutorialBtn);
	
	//サポート
	var support = new DivSprite(480,170);
	support.x=640/2; support.y=480; support.z=1;
	support.src = "img/01_title/t_btn_g000.png";
	support.animScale = [1,10, 1,10, 1,10, 1,10, 1.1,2, 1,2];
	support.onclick = function()
	{
		var win=window.open("http://www.dorasu.com/gochisousama/support.html","new");
		win.moveTo(0,0);		
		event.preventDefault();
		//next = NEXT.TITLE;			// 再度タイトルシーン
	};
	sceen.appendChild(support.div);
	animSprites.push(support);
	
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
					if (LoadingCounter <= 0) 
					{
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
				if (next != NEXT.NONEXT) 
				{
					//再度タイトルシーンにいく場合は、特に何もせず次へ
					if (next == NEXT.TITLE) {
						st = STATUS.FADEOUT;
						break;
					}
					
					//次の処理がセットされれば次へ
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
				//DOMエレメントの削除
				rootSceen.removeChild(sceen);
				//次のシーンをセット
				switch(next) 
				{
					// タイトル
					case NEXT.TITLE:
						nextSceen = new SceenTitle();
						break;
				}
				break;
		}
		
	};
	
	
};


