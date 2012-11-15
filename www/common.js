// This is a JavaScript file
// 共通で使うような関数を定義

        function getBaseURL() {
            var str = location.pathname;
            var i = str.lastIndexOf('/');
            return str.substring(0,i+1);
            //http://www.tam-music.com/ogg/abcdef/tam-n13loop.ogg
            //getBaseURL() + 'music/tam-n13loop.ogg'
        } 
