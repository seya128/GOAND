//anime.js
//　おんなじコードが多いので何とかしたい。
//　ちょっといじっただけだとうまく動かなかったのでコピペ

// index ページアニメ

	function setTimerindex()
	{
		setInterval("bgAnime()",400);
		setInterval("megamiAnime()",400);
		setInterval("ninjinAnime()",400);
		setInterval("nasuAnime()",400);
		setInterval("pimanAnime()",400);
		setInterval("tomatoAnime()",400);
	};

	var bgNum = 0;
	function bgAnime()
	{
		var pictableBG = 
		[
		"img/title/h_h00_bgd_a/h_h00_bgd_a_00000.png",
		"img/title/h_h00_bgd_a/h_h00_bgd_a_00001.png",
		"img/title/h_h00_bgd_a/h_h00_bgd_a_00002.png",
		"img/title/h_h00_bgd_a/h_h00_bgd_a_00003.png"
		];
		bgNum += 1;
		if (bgNum >= pictableBG.length ) bgNum = 0;
		bg.src = pictableBG[bgNum];
	};

	var megamiNum = 0;
	function megamiAnime()
	{
		if (megamiNum == 0)
		{
			if(1 < Math.random()*5)
			{
				return;
			}
		}
		var pictable = 
		[
		"img/title/t_meg_a/t_meg_a_00000.png",
		"img/title/t_meg_a/t_meg_a_00001.png",
		"img/title/t_meg_a/t_meg_a_00002.png",
		];
		megamiNum += 1;
		if (megamiNum >= pictable.length ) megamiNum = 0;
		megami.src = pictable[megamiNum];
	};

	var ninjinNum = 0;
	function ninjinAnime()
	{
		if (ninjinNum == 0)
		{
			if(1 < Math.random()*5)
			{
				return;
			}
		}
		var pictable = 
		[
		"img/title/t_nin_a/t_nin_a_00000.png",
		"img/title/t_nin_a/t_nin_a_00001.png",
		"img/title/t_nin_a/t_nin_a_00002.png",
		];
		ninjinNum += 1;
		if (ninjinNum >= pictable.length ) ninjinNum = 0;
		ninjin.src = pictable[ninjinNum];
	};

	var nasuNum = 0;
	function nasuAnime()
	{
		if (nasuNum == 0)
		{
			if(1 < Math.random()*5)
			{
				return;
			}
		}
		var pictable = 
		[
		"img/title/t_nas_a/t_nas_a_00000.png",
		"img/title/t_nas_a/t_nas_a_00001.png",
		"img/title/t_nas_a/t_nas_a_00002.png",
		];
		nasuNum += 1;
		if (nasuNum >= pictable.length ) nasuNum = 0;
		nasu.src = pictable[nasuNum];
	};

	var pimanNum = 0;
	function pimanAnime()
	{
		if (pimanNum == 0)
		{
			if(1 < Math.random()*5)
			{
				return;
			}
		}
		var pictable = 
		[
		"img/title/t_pii_a/t_pii_a_00000.png",
		"img/title/t_pii_a/t_pii_a_00001.png",
		"img/title/t_pii_a/t_pii_a_00002.png",
		];
		pimanNum += 1;
		if (pimanNum >= pictable.length ) pimanNum = 0;
		piman.src = pictable[pimanNum];
	};

	var tomatoNum = 0;
	function tomatoAnime()
	{
		if (tomatoNum == 0)
		{
			if(1 < Math.random()*5)
			{
				return;
			}
		}
		var pictable = 
		[
		"img/title/t_tom_a/t_tom_a_00000.png",
		"img/title/t_tom_a/t_tom_a_00001.png",
		"img/title/t_tom_a/t_tom_a_00002.png",
		];
		tomatoNum += 1;
		if (tomatoNum >= pictable.length ) tomatoNum = 0;
		tomato.src = pictable[tomatoNum];
	};

// kamiselect ページアニメ

	function setTimerkamiselect()
	{
		setInterval("megamiAnime()",400);
		setInterval("ninjinAnimeselectindex()",400);
		setInterval("nasuAnimeselectindex()",400);
		setInterval("pimanAnimeselectindex()",400);
		setInterval("tomatoAnimeselectindex()",400);
	};

	var pimanselectNum = 0;
	function pimanAnimeselectindex()
	{
		if (pimanselectNum == 0)
		{
			if(1 < Math.random()*5)
			{
				return;
			}
		}
		var pictable = 
		[
		"img/Gohan/g_g01_pii_a/g_g01_pii_a_00000.png",
		"img/Gohan/g_g01_pii_a/g_g01_pii_a_00001.png",
		"img/Gohan/g_g01_pii_a/g_g01_pii_a_00002.png",
		];
		pimanselectNum += 1;
		if (pimanselectNum >= pictable.length ) pimanselectNum = 0;
		select_piman.src = pictable[pimanselectNum];
	};

	var tomatoselectNum = 0;
	function tomatoAnimeselectindex()
	{
		if (tomatoselectNum == 0)
		{
			if(1 < Math.random()*5)
			{
				return;
			}
		}
		var pictable = 
		[
		"img/Gohan/g_g01_tom_a/g_g01_tom_a_00000.png",
		"img/Gohan/g_g01_tom_a/g_g01_tom_a_00001.png",
		"img/Gohan/g_g01_tom_a/g_g01_tom_a_00002.png",
		];
		tomatoselectNum += 1;
		if (tomatoselectNum >= pictable.length ) tomatoselectNum = 0;
		select_tomato.src = pictable[tomatoselectNum];
	};

	var ninjinselectNum = 0;
	function ninjinAnimeselectindex()
	{
		if (ninjinselectNum == 0)
		{
			if(1 < Math.random()*5)
			{
				return;
			}
		}
		var pictable = 
		[
		"img/Gohan/g_g01_nin_a/g_g01_nin_a_00000.png",
		"img/Gohan/g_g01_nin_a/g_g01_nin_a_00001.png",
		"img/Gohan/g_g01_nin_a/g_g01_nin_a_00002.png",
		];
		ninjinselectNum += 1;
		if (ninjinselectNum >= pictable.length ) ninjinselectNum = 0;
		select_ninjin.src = pictable[ninjinselectNum];
	};

	var nasuselectNum = 0;
	function nasuAnimeselectindex()
	{
		if (nasuselectNum == 0)
		{
			if(1 < Math.random()*5)
			{
				return;
			}
		}
		var pictable = 
		[
		"img/Gohan/g_g01_nas_a/g_g01_nas_a_00000.png",
		"img/Gohan/g_g01_nas_a/g_g01_nas_a_00001.png",
		"img/Gohan/g_g01_nas_a/g_g01_nas_a_00002.png",
		];
		nasuselectNum += 1;
		if (nasuselectNum >= pictable.length ) nasuselectNum = 0;
		select_nasu.src = pictable[nasuselectNum];
	};
