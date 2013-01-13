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


//動的読み込みしているファイルの数
var LoadingCounter = 0;


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
	this._basePos = {x:w/2,y:h/2};
	this._scale = 1;
	this._alpha = 1;
	this,_rotate = 0;
	this._anim = null;
	this._animScale = null;
	this._animPos = null;
	this._animAlpha = null;
	this._animScaleXY = null;		//scaleXY別々指定（重いので注意。等倍は大丈夫）
	this._scalex = 1;
	this._scaley = 1;
	this.div.style.position = "fixed";
	this.div.style.overflow = "hidden";
	this.div.style.width = w + "px";
	this.div.style.height = h + "px";
	this.div.style.zoom = 1;
	this.div.style.webkitTransform = "scale(1.0, 1.0)";
	this.div.style.webkitTransformOrigin = "50% 50%";
//	this.img.style.position = "absolute";
//	this.img.style.top = "0px";
//	this.img.style.left = "0px";
//	this.img.style.opacity = 0.5;
//	this.div.appendChild(this.img);
	
};
DivSprite.prototype = {
	//x X座標
	get x() { return this._x; },
	set x(a) {
		this._x = a;
		this.div.style.left = ((a-(this._basePos.x*this._scale))/this._scale) + "px";
	},
	//y Y座標
	get y() { return this._y; },
	set y(a) {
		this._y = a;
		this.div.style.top = ((a-(this._basePos.y*this._scale))/this._scale) + "px";
	},
	//z Z座標
	get z() { return this._z; },
	set z(a) {
		this._z = a;
		this.div.style.zIndex = a;
	},
	//ofsPos 中心座標
	set basePos(a) {
		this._basePos = a;
		//座標再セット
		this.x = this._x;
		this.y = this._y;
	},
	//scale 拡大率
	get scale() { return this._scale; },
	set scale(a) {
		//0だと0除算してしまうので
		if (a == 0)
			a = 0.000001;
		this._scale = a;
		this.div.style.zoom = a;
		this.x = this._x;
		this.y = this._y;
	},
	//alpha α値
	get alpha() { return this._alpha; },
	set alpha(a) {
		this._alpha = a;
		this.div.style.opacity = a;
	},
	//rotate 回転角
	get rotate() { return this._rotate; },
	set rotate(a) {
		this._rotate = a;
		this.div.style.webkitTransform = 'rotate('+a+'deg)';
	},
	//src
	set src(a) {
		this.img.onload = function() {
			LoadingCounter--;
		};
		LoadingCounter ++;
		this.img.src = a;
		this.div.style.backgroundImage = 'url("' + a + '")';
	},
	//frame
	get frame() { return this._frame; },
	set frame(a) {
/*		var dw = Math.floor(this.img.naturalWidth / this._w);
		var top = 0;
		if (a > dw)	top = Math.floor(a / dw) * this._h;
		var left = Math.floor(a % dw) * this._w;
*/
		var top = 0;
		var left = a * this._w;
		var bottom = top+this._h;
		var right = left+this._w;
		
		this._frame = a;
/*		this.img.style.clip = "rect("+top+"px "+right+"px "+bottom+"px "+left+"px)";
		this.img.style.left = -left + "px";
		this.img.style.top = -top + "px";
		this.img.style.zoom = 1;
*/		
		this.div.style.backgroundPosition = -left + "px " + (-top) + "px";
		
		//alert(this.img.style.clip);
	},
	
	//onclick
	set onclick(a) {
//		this.img.onclick = a;
		this.div.onclick = a;
	},
	
	//anim アニメーションパターンセット
	set anim(a) {
		this._anim = a;
		this._animIx = 0;
		this._animFrm = 0;
	},
	//animScale スケールアニメーションセット
	set animScale(a) {
		this._animScale = a;
		this._animScaleIx = 0;
		if (a!=null)
			this._animScaleFrm = a[1];
	},
	//animAlpha αアニメーションセット
	set animAlpha(a) {
		this._animAlpha = a;
		this._animAlphaIx = 0;
		if (a!=null)
			this._animAlphaFrm = a[1];
	},
	//animPos ポジションアニメーションセット
	set animPos(a) {
		this._animPos = a;
		this._animPosIx = 0;
		if (a!=null)
			this._animPosFrm = a[2];
	},
	//animScaleXY ScaleXYアニメーションセット
	set animScaleXY(a) {
		this._animScaleXY = a;
		this._animScaleXyIx = 0;
		if (a!=null) {
			this._animScaleXyFrm = a[2];
		} else {
			this._scalex = 1;
			this._scaley = 1;
			this.div.style.webkitTransform = "scale(1,1)";
		}
	},
	
	//animExec() アニメーション処理（フレームごとに呼び出してやる必要あり）
	animExec : function() {
		if (this._anim) {
			this.frame = this._anim[this._animIx+0];
			if (this._anim[this._animIx+1] > 0) {
				this._animFrm ++;
				if (this._animFrm >= this._anim[this._animIx+1]) {
					this._animFrm = 0;
					this._animIx += 2;
					if (this._animIx >= this._anim.length) {
						this._animIx = 0;
					}
				}
			} else {
				this._anim = null;
			}
		}
		if (this._animScale) {
			if (this._animScaleFrm <= 1) {
				this.scale = this._animScale[this._animScaleIx+0];
				if (this._animScale[this._animScaleIx+1] > 0) {
					this._animScaleIx += 2;
					if (this._animScaleIx >= this._animScale.length) {
						this._animScaleIx = 0;
					}
					this._animScaleFrm = this._animScale[this._animScaleIx+1];
				} else {
					this._animScale = null;
				}
			} else {
				var d = this._animScale[this._animScaleIx+0] - this._scale;
				this.scale = this._scale + (d/this._animScaleFrm);
				this._animScaleFrm --;
			}
		}
		if (this._animAlpha) {
			if (this._animAlphaFrm <= 1) {
				this.alpha = this._animAlpha[this._animAlphaIx+0];
				if (this._animAlpha[this._animAlphaIx+1] > 0) {
					this._animAlphaIx += 2;
					if (this._animAlphaIx >= this._animAlpha.length) {
						this._animAlphaIx = 0;
					}
					this._animAlphaFrm = this._animAlpha[this._animAlphaIx+1];
				} else {
					this._animAlpha = null;
				}
			} else {
				var d = this._animAlpha[this._animAlphaIx+0] - this._alpha;
				this.alpha = this._alpha + (d/this._animAlphaFrm);
				this._animAlphaFrm --;
			}
		}
		if (this._animPos) {
			if (this._animPosFrm <= 1) {
				this.x = this._animPos[this._animPosIx+0];
				this.y = this._animPos[this._animPosIx+1];
				if (this._animPos[this._animPosIx+2] > 0) {
					this._animPosIx += 3;
					if (this._animPosIx >= this._animPos.length) {
						this._animPosIx = 0;
					}
					this._animPosFrm = this._animPos[this._animPosIx+2];
				} else {
					this._animPos = null;
				}
			} else {
				this.x = this._x + (this._animPos[this._animPosIx+0]-this._x) / this._animPosFrm;
				this.y = this._y + (this._animPos[this._animPosIx+1]-this._y) / this._animPosFrm;
				this._animPosFrm --;
			}
		}
		if (this._animScaleXY) {
			if (this._animScaleXyFrm <= 1) {
				this._scalex = this._animScaleXY[this._animScaleXyIx+0];
				this._scaley = this._animScaleXY[this._animScaleXyIx+1];
				if (this._animScaleXY[this._animScaleXyIx+2] > 0) {
					this._animScaleXyIx += 3;
					if (this._animScaleXyIx >= this._animScaleXY.length) {
						this._animScaleXyIx = 0;
					}
					this._animScaleXyFrm = this._animScaleXY[this._animScaleXyIx+2];
				} else {
					this._animScaleXY = null;
				}
			} else {
				this._scalex += (this._animScaleXY[this._animScaleXyIx+0]-this._scalex) / this._animScaleXyFrm;
				this._scaley += (this._animScaleXY[this._animScaleXyIx+1]-this._scaley) / this._animScaleXyFrm;
				this._animScaleXyFrm --;
			}
			this.div.style.webkitTransform = "scale("+this._scalex+","+this._scaley+")";
		}
		
	},
};

//
// タッチ座標処理
//
// in : e  イベントオブジェクト
// out : タッチ座標(r.x r.y)
//　　イベントの発生したオブジェクトの左上からの座標
//    座標はビューポートにあわせた座標に変換される
//  注意
//　　　タッチスタート、タッチムーブ以外のイベントでは(0,0)が返る。

function getTouchPos(e) {
    var r = { x:0, y:0};
    var x,y;
    if (e.type=="touchstart" || e.type=="touchmove") {
        x = e.touches[0].pageX;
        y = e.touches[0].pageY;
    } else if (e.type=="mousedown" || e.type=="mousemove") {
        x = e.pageX;
        y = e.pageY;
    } else
        return r;
    
    rect = e.target.getBoundingClientRect();

    r.x = Math.round(x / common.viewport.zoomRatio - rect.left);
    r.y = Math.round(y / common.viewport.zoomRatio - rect.top);
    
    return r;
}


//
// サウンド
//
var _audio;
function playSound(a) {
	_audio = new Audio(a);
	_audio.play();
}
