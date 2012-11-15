// This is a JavaScript file
// 共通で使うような関数を定義

        function getBaseURL() {
            var str = location.pathname;
            var i = str.lastIndexOf('/');
            return str.substring(0,i+1);
            //http://www.tam-music.com/ogg/abcdef/tam-n13loop.ogg
            //getBaseURL() + 'music/tam-n13loop.ogg'
        } 


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

    r.x = Math.round(x / monaca.viewport.zoomRatio - rect.left);
    r.y = Math.round(y / monaca.viewport.zoomRatio - rect.top);
    
    return r;
}