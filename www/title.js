//
// タイトル
//


function titleAddSceen() {
	var sceen = document.getElementById("sceen");
	
	//BG
	var bg = new DivSprite(640,1138);
	bg.x=0; bg.y=0; bg.z=0;
	bg.src = "img/title/h_h00_bgd_a/h_h00_bgd_a_00000.png";
	sceen.appendChild(bg.div);
	
	//ロゴ
	var logo = new DivSprite(445,186);
	logo.x=90; logo.y=180; logo.z=3;
	logo.src = "img/title/t_rgo_a000.png";
	sceen.appendChild(logo.div);
	
	//女神
	var megami = new DivSprite(316,452);
	megami.x=160; megami.y=-20; megami.z=2;
	megami.src = "img/title/t_meg_a/t_meg_a_00000.png";
	sceen.appendChild(megami.div);
	
	
/*	 <img id="nasu" src="img/title/t_nas_a/t_nas_a_00000.png"></img>
     <img id="ninjin" src="img/title/t_nin_a/t_nin_a_00000.png"></img>
     <img id="piman" src="img/title/t_pii_a/t_pii_a_00000.png"></img>
     <img id="tomato" src="img/title/t_tom_a/t_tom_a_00000.png"></img>
*/

	//ごはん
	var gohan = new DivSprite(266,228);
	gohan.x=20; gohan.y=420; gohan.z=2;
	gohan.src = "img/title/t_btn_a000.png";
	gohan.onclick = function(){
		document.location="KamiSelect.html";
		event.preventDefault();
	};
	sceen.appendChild(gohan.div);
	
	//スタンプ
	var stamp = new DivSprite(258,224);
	stamp.x=360; stamp.y=420; stamp.z=2;
	stamp.src = "img/title/t_btn_b000.png";
	stamp.onclick = function() {
		document.location="StampSelect.html";
		event.preventDefault();
	};
	sceen.appendChild(stamp.div);
	
	
	//あそびかた
	var help = new DivSprite(220,194);
	help.x=40; help.y=650; help.z=2;
	help.src = "img/title/t_btn_c000.png";
	help.onclick = function(){
		event.preventDefault();
		alert("未実装です。");
	};
	sceen.appendChild(help.div);
	
	//ショップ
	var shop = new DivSprite(220,196);
	shop.x=360; shop.y=650; shop.z=2;
	shop.src = "img/title/t_btn_d000.png";
	shop.onclick = function() {
		event.preventDefault();
		window.localStorage.removeItem("CntGochi");
		window.localStorage.removeItem("CntCoin");
		deleteHasStamp();
		AllDeleteStampDrawData();	// スタンプしたデータを削除
		alert("ごちそうさました回数、スタンプデータをリセットしました。");
	};
	sceen.appendChild(shop.div);

}

