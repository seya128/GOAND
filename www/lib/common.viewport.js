(function() {
    window.common = window.common || {};

    var IS_DEV = false;
    var d = IS_DEV ? alert : function(line) { console.log(line); };

    var defaultParams = {
        width : 640,
        onAdjustment : function(scale) { }
    };
	
    var zoom = function(ratio) {

        if ("OTransform" in document.body.style) {
            document.body.style.OTransform = "scale(" + ratio + ")";
            document.body.style.OTransformOrigin = "top left";
            document.body.style.width = Math.round(window.innerWidth / ratio) + "px";
        } else if ("MozTransform" in document.body.style) {
            document.body.style.MozTransform = "scale(" + ratio + ")";
            document.body.style.MozTransformOrigin = "top left";
            document.body.style.width = Math.round(window.innerWidth / ratio) + "px";
        } else {
            document.body.style.zoom = ratio;
        }
        
        common.viewport.zoomRatio = ratio;
    };

    if (common.isIos()) {
        common.viewport = function(params) {
            d("iOS is detected");
            params = common.merge(defaultParams, params);
            document.write('<meta name="viewport" content="width=' + params.width + ',user-scalable=no" />');
            common.viewport.adjust = function() {};
        };
    } else if (common.isAndroid()) {
        common.viewport = function(params) {
            d("Android is detected");
            params = common.merge(defaultParams, params);

            document.write('<meta name="viewport" content="width=device-width,target-densitydpi=device-dpi" />');

            common.viewport.adjust = function() {
                var scale = window.innerWidth / params.width;
                common.viewport.scale = scale;
                zoom(scale);
                params.onAdjustment(scale);
            };

            var orientationChanged = (function() {
                var wasPortrait = window.innerWidth < window.innerHeight;
                return function() {
                    var isPortrait = window.innerWidth < window.innerHeight;
                    var result = isPortrait != wasPortrait;
                    wasPortrait = isPortrait;
                    return result;
                };
            })();

            var aspectRatioChanged = (function() {
                var oldAspect = window.innerWidth / window.innerHeight;
                return function() {
                    var aspect = window.innerWidth / window.innerHeight;
                    var changed = Math.abs(aspect - oldAspect) > 0.0001;
                    oldAspect = aspect;

                    alert("aspect ratio changed");
                    return changed;
                };
            });

            window.addEventListener("resize", function() {
                var left = orientationChanged();
                var right = aspectRatioChanged();

                if (left || right) {
                    common.viewport.adjust();
                }
            }, false);
            document.addEventListener('DOMContentLoaded', function() {
                common.viewport.adjust();
            });
        };
    } else {
        common.viewport = function(params) {
            params = common.merge(defaultParams, params);
            d("PC browser is detected");

            common.viewport.adjust = function() {
                var width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
                var scale = width / params.width;
                zoom(width / params.width);
                params.onAdjustment(scale);
            };

            window.addEventListener("resize", function() {
                common.viewport.adjust();
            }, false);
            document.addEventListener("DOMContentLoaded", function() {
                common.viewport.adjust();
            });
        };
    }

    common.viewport.adjust = function() { };
    
    common.viewport.zoomRatio = 1.0;
})();