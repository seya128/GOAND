// This is a JavaScript file
// 共通で使うような関数を定義


(function() {
	window.common = window.common || {};
    
    
    //端末チェック
	common.isIos = function() {
		return !!navigator.userAgent.match(/iPhone|iPod|iPad/);
	};

	common.isAndroid = function() {
		return !!navigator.userAgent.match(/Android|CUPCAKE/);
	};

	//連想配列のマージ
	common.merge = function(base, right) {
		var result = {};
		for (var key in base) {
			result[key] = base[key];
			if (key in right) {
				result[key] = right[key];
			}
		}
		return result;
	};

	//アドレスバー非表示(iOS,Android)
	common.hideAddressbar = function() {
		var pageHeight = document.height;
		var windowHeight = window.innerHeight;
		if (common.isAndroid()) {
			windowHeight = window.outerHeight;
		} else if (common.isIos()) {
			windowHeight = (screen.height - 64) * window.devicePixelRatio;
		}
		
		//alert("pageHeight : " + pageHeight + "\nwindowHeight : " + windowHeight + "\nbodyH : " + document.body.style.height + "\nzoom : " + window.devicePixelRatio);
		
		if (pageHeight <= windowHeight) {
			pageHeight = Math.floor((windowHeight+1) / common.viewport.zoomRatio) + 1;
			//alert("pageHeight : " + pageHeight + "\nwindowHeight : " + windowHeight + "\nbodyH : " + document.body.style.height + "\nzoom : " + common.viewport.zoomRatio);
			document.body.style.height = (pageHeight) + 'px';
		}
		
		if (document.body.scrollTop == 0) {
			window.scrollTo(0,1);
		}
	};
/*	$(document).on("pagechange", function() {
		common.hideAddressbar();
	});
*/

	

})();



//DIVスプライト
var DivSprite = function(w,h) {
	this.div = document.createElement("div");
	this.img = document.createElement("img");
	this._frame = 0;
	this._w = w;
	this._h = h;
	this._x = 0;
	this._y = 0;
	this._z = 0;
	this.div.appendChild(this.img);
	this.div.style.position = "fixed";
	this.div.style.overflow = "hidden";
	this.div.style.width = w + "px";
	this.div.style.height = h + "px";
	this.img.style.position = "absolute";
	this.img.style.top = "0px";
	this.img.style.left = "0px";
	
};
DivSprite.prototype = {
	//x X座標
	get x() { return this._x; },
	set x(a) {
		this._x = a;
		this.div.style.left = a + "px";
	},
	//y Y座標
	get y() { return this._y; },
	set y(a) {
		this._y = a;
		this.div.style.top = a + "px";
	},
	//z Z座標
	get z() { return this._z; },
	set z(a) {
		this._z = a;
		this.div.style.zIndex = a;
	},
	//src
	set src(a) {
		this.img.src = a;
	},
	//frame
	get frame() { return this._frame; },
	set frame(a) {
		this._frame = a;
		this.img.style.left = -a * this.w;
	},
	
	//onclick
	set onclick(a) {
		this.img.onclick = a;
	},
};

