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

	
	//DIVスプライト
	function DivSprite(w,h) {
		this.div = document.createElement("div");
		this.img = document.createElement("img");
		div.appendChild(img);
	};
	
})();
