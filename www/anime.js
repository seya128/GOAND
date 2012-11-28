//anime.js
//　おんなじコードが多いので何とかしたい。
//　ちょっといじっただけだとうまく動かなかったのでコピペ

// index ページアニメ

function setTimerindex()
{
	setInterval("indexAnime()",400);
};

function indexAnime()
{
	bgAnime();
	megamiAnime();
	ninjinAnime();
	nasuAnime();
	pimanAnime();
	tomatoAnime();
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
	setInterval("kamiselectAnime()",400);
};

function kamiselectAnime()
{
	megamiAnimeselectindex();
	ninjinAnimeselectindex();
	nasuAnimeselectindex();
	pimanAnimeselectindex();
	tomatoAnimeselectindex()
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

var megamiselectNum = 0;
function megamiAnimeselectindex()
{
	if (megamiselectNum == 0)
	{
		if(1 < Math.random()*5)
		{
			return;
		}
	}
	var pictable = 
	[
	"img/Gohan/g_g01_meg_a/g_g01_meg_a_00000.png",
	"img/Gohan/g_g01_meg_a/g_g01_meg_a_00001.png",
	"img/Gohan/g_g01_meg_a/g_g01_meg_a_00002.png",
	];
	megamiselectNum += 1;
	if (megamiselectNum >= pictable.length ) megamiselectNum = 0;
	select_megami.src = pictable[megamiselectNum];
};



// kamiLoad ページアニメ

function setTimerkamiLoad()
{
	setInterval("kamiloadAnime()",400);
};

function kamiloadAnime()
{
	kamiAnimeload();
};

var kamiloadNum = 0;
function kamiAnimeload()
{
	var pictable = 
	[
	"img/Gohan/g_g02_kum_a/g_g02_kum_a_00000.png",
	"img/Gohan/g_g02_kum_a/g_g02_kum_a_00001.png",
	];
	kamiloadNum += 1;
	if (kamiloadNum >= pictable.length ) kamiloadNum = 0;
	load_kemuri.src = pictable[kamiloadNum];
};


// kamiIn ページアニメ

function setTimerPimanin()
{
	setInterval("PimanInAnime()",400);
}

function setTimerNasuin()
{
	setInterval("NasuInAnime()",400);
}

function setTimerNinjinin()
{
	setInterval("NinjinInAnime()",400);
}

function setTimerTomatoin()
{
	setInterval("TomatoInAnime()",400);
}

function PimanInAnime()
{
	PimanAnimeIn();
	kamiAnimeIn();
}

function NasuInAnime()
{
	NasuAnimeIn();
	kamiAnimeIn();
}

function NinjinInAnime()
{
	NinjinAnimeIn();
	kamiAnimeIn();
}

function TomatoInAnime()
{
	TomatoAnimeIn();
	kamiAnimeIn();
}


var bgInNum = 0;
function kamiAnimeIn()
{
	var pictable = 
	[
	"img/Gohan/h_h02_bgd_b_00000.png",
	"img/Gohan/h_h02_bgd_a_00000.png",
	];
	bgInNum += 1;
	if (bgInNum >= pictable.length ) bgInNum = 0;
	bg.src = pictable[bgInNum];
};

var PimanInNum = 0;
function PimanAnimeIn()
{
	if (PimanInNum == 0)
	{
		if(1 < Math.random()*5)
		{
			return;
		}
	}
	var pictable = 
	[
	"img/Gohan/g_g03_pii_a/g_g03_pii_a_1_00000.png",
	"img/Gohan/g_g03_pii_a/g_g03_pii_a_1_00001.png",
	"img/Gohan/g_g03_pii_a/g_g03_pii_a_1_00002.png",
	];
	PimanInNum += 1;
	if (PimanInNum >= pictable.length ) PimanInNum = 0;
	in_kamisama.src = pictable[PimanInNum];
};

var NasuInNum = 0;
function NasuAnimeIn()
{
	if (NasuInNum == 0)
	{
		if(1 < Math.random()*5)
		{
			return;
		}
	}
	var pictable = 
	[
	"img/Gohan/g_g03_nas_a/g_g03_nas_a_00000.png",
	"img/Gohan/g_g03_nas_a/g_g03_nas_a_00001.png",
	"img/Gohan/g_g03_nas_a/g_g03_nas_a_00002.png",
	];
	NasuInNum += 1;
	if (NasuInNum >= pictable.length ) NasuInNum = 0;
	in_kamisama.src = pictable[NasuInNum];
};

var NinjinInNum = 0;
function NinjinAnimeIn()
{
	if (NinjinInNum == 0)
	{
		if(1 < Math.random()*5)
		{
			return;
		}
	}
	var pictable = 
	[
	"img/Gohan/g_g03_nin_a/g_g03_nin_a_00000.png",
	"img/Gohan/g_g03_nin_a/g_g03_nin_a_00001.png",
	"img/Gohan/g_g03_nin_a/g_g03_nin_a_00002.png",
	];
	NinjinInNum += 1;
	if (NinjinInNum >= pictable.length ) NinjinInNum = 0;
	in_kamisama.src = pictable[NinjinInNum];
};

var TomatoInNum = 0;
function TomatoAnimeIn()
{
	if (TomatoInNum == 0)
	{
		if(1 < Math.random()*5)
		{
			return;
		}
	}
	var pictable = 
	[
	"img/Gohan/g_g03_tom_a/g_g03_tom_a_00000.png",
	"img/Gohan/g_g03_tom_a/g_g03_tom_a_00001.png",
	"img/Gohan/g_g03_tom_a/g_g03_tom_a_00002.png",
	];
	TomatoInNum += 1;
	if (TomatoInNum >= pictable.length ) TomatoInNum = 0;
	in_kamisama.src = pictable[TomatoInNum];
};

// itadakimasu ページアニメ

function setTimerPimanitadakimasu()
{
	setInterval("PimanItadakimasuAnime()",400);
}

function setTimerNasuitadakimasu()
{
	setInterval("NasuItadakimasuAnime()",400);
}

function setTimerNinjinitadakimasu()
{
	setInterval("NinjinItadakimasuAnime()",400);
}

function setTimerTomatoitadakimasu()
{
	setInterval("TomatoItadakimasuAnime()",400);
}

function PimanItadakimasuAnime()
{
	PimanAnimeItadakimasu();
	bgAnimeItadakimasu();
}

function NasuItadakimasuAnime()
{
	NasuAnimeItadakimasu();
	bgAnimeItadakimasu();
}

function NinjinItadakimasuAnime()
{
	NinjinAnimeItadakimasu();
	bgAnimeItadakimasu();
}

function TomatoItadakimasuAnime()
{
	TomatoAnimeItadakimasu();
	bgAnimeItadakimasu();
}


var bgItadakimasuNum = 0;
function bgAnimeItadakimasu()
{
	var pictable = 
	[
	"img/Gohan/g_g04_obj_a/g_g04_obj_a_00000.png",
	"img/Gohan/g_g04_obj_a/g_g04_obj_a_00001.png",
	"img/Gohan/g_g04_obj_a/g_g04_obj_a_00002.png",
	"img/Gohan/g_g04_obj_a/g_g04_obj_a_00003.png",
	];
	bgItadakimasuNum += 1;
	if (bgItadakimasuNum >= pictable.length ) bgItadakimasuNum = 0;
	itadakimasu_te.src = pictable[bgItadakimasuNum];
};

var PimanItadakimasuNum = 0;
function PimanAnimeItadakimasu()
{
	if (PimanItadakimasuNum == 0)
	{
		if(1 < Math.random()*5)
		{
			return;
		}
	}
	var pictable = 
	[
	"img/Gohan/g_g04_pii_a/g_g04_pii_a_00000.png",
	"img/Gohan/g_g04_pii_a/g_g04_pii_a_00001.png",
	"img/Gohan/g_g04_pii_a/g_g04_pii_a_00002.png",
	];
	PimanItadakimasuNum += 1;
	if (PimanItadakimasuNum >= pictable.length ) PimanItadakimasuNum = 0;
	itadakimasu_kamisama.src = pictable[PimanItadakimasuNum];
};

var NasuItadakimasuNum = 0;
function NasuAnimeItadakimasu()
{
	if (NasuItadakimasuNum == 0)
	{
		if(1 < Math.random()*5)
		{
			return;
		}
	}
	var pictable = 
	[
	"img/Gohan/g_g04_nas/g_g04_nas_a_00000.png",
	"img/Gohan/g_g04_nas/g_g04_nas_a_00001.png",
	"img/Gohan/g_g04_nas/g_g04_nas_a_00002.png",
	];
	NasuItadakimasuNum += 1;
	if (NasuItadakimasuNum >= pictable.length ) NasuItadakimasuNum = 0;
	itadakimasu_kamisama.src = pictable[NasuItadakimasuNum];
};

var NinjinItadakimasuNum = 0;
function NinjinAnimeItadakimasu()
{
	if (NinjinItadakimasuNum == 0)
	{
		if(1 < Math.random()*5)
		{
			return;
		}
	}
	var pictable = 
	[
	"img/Gohan/g_g04_nin/g_g04_nin_a_00000.png",
	"img/Gohan/g_g04_nin/g_g04_nin_a_00001.png",
	"img/Gohan/g_g04_nin/g_g04_nin_a_00002.png",
	];
	NinjinItadakimasuNum += 1;
	if (NinjinItadakimasuNum >= pictable.length ) NinjinItadakimasuNum = 0;
	itadakimasu_kamisama.src = pictable[NinjinItadakimasuNum];
};

var TomatoItadakimasuNum = 0;
function TomatoAnimeItadakimasu()
{
	if (TomatoItadakimasuNum == 0)
	{
		if(1 < Math.random()*5)
		{
			return;
		}
	}
	var pictable = 
	[
	"img/Gohan/g_g04_tom_a/g_g04_tom_a_00000.png",
	"img/Gohan/g_g04_tom_a/g_g04_tom_a_00001.png",
	"img/Gohan/g_g04_tom_a/g_g04_tom_a_00002.png",
	];
	TomatoItadakimasuNum += 1;
	if (TomatoItadakimasuNum >= pictable.length ) TomatoItadakimasuNum = 0;
	itadakimasu_kamisama.src = pictable[TomatoItadakimasuNum];
};

function setTimerPimangochisousama()
{
	setInterval("PimanGochisousamaAnime()",400);
}

function setTimerNasugochisousama()
{
	setInterval("NasuGochisousamaAnime()",400);
}

function setTimerNinjingochisousama()
{
	setInterval("NinjinGochisousamaAnime()",400);
}

function setTimerTomatogochisousama()
{
	setInterval("TomatoGochisousamaAnime()",400);
}

function PimanGochisousamaAnime()
{
	PimanAnimeItadakimasu();
	bgAnimeGochisousama();
}

function NasuGochisousamaAnime()
{
	NasuAnimeItadakimasu();
	bgAnimeGochisousama();
}

function NinjinGochisousamaAnime()
{
	NinjinAnimeItadakimasu();
	bgAnimeGochisousama();
}

function TomatoGochisousamaAnime()
{
	TomatoAnimeItadakimasu();
	bgAnimeGochisousama();
}

var bgGochisousamaNum = 0;
function bgAnimeGochisousama()
{
	var pictable = 
	[
	"img/Gohan/g_g09_obj_a/g_g09_obj_a_00000.png",
	"img/Gohan/g_g09_obj_a/g_g09_obj_a_00001.png",
	"img/Gohan/g_g09_obj_a/g_g09_obj_a_00002.png",
	"img/Gohan/g_g09_obj_a/g_g09_obj_a_00003.png",
	];
	bgGochisousamaNum += 1;
	if (bgGochisousamaNum >= pictable.length ) bgGochisousamaNum = 0;
	itadakimasu_te.src = pictable[bgGochisousamaNum];
};

//itemget 

function setTimerItemget()
{
	setInterval("ItemGetAnime()",400);
}

function ItemGetAnime()
{
	bgAnimeItemGet();
}

var bgItemGetNum = 0;
function bgAnimeItemGet()
{
	var pictable = 
	[
	"img/Gohan/h_h03_bgd_a_00000.png",
	"img/Gohan/h_h03_bgd_a_00001.png",
	"img/Gohan/h_h03_bgd_a_00002.png",
	];
	bgItemGetNum += 1;
	if (bgItemGetNum >= pictable.length ) bgItemGetNum = 0;
	bg.src = pictable[bgItemGetNum];
}

