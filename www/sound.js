// This is a JavaScript file

        document.addEventListener("deviceready", onDeviceReady, false);

        // Cordova 準備完了
        //
        function onDeviceReady()
        {
            console.log("onDeviceReady()");
            //alert("準備完了");
            document.addEventListener("backbutton", onBackbutton, false);
            playAudio(getBaseURL() + 'sound/bgm/main.ogg');
        }

        function onBackbutton(evevt)
        {
            alert("onBackbutton");
            console.log("onBackbutton()");
            return;
        }

        // オーディオプレイヤー
        //
        var my_media = null;
        var mediaTimer = null;

        // オーディオ再生
        //
        function playAudio(src) {
            // src から Media オブジェクトを作成
            my_media = new Media(src, onSuccess, onError, onStatusChange);

            // オーディオ再生
            my_media.play();
        }

        // オーディオ一時停止
        //
        function pauseAudio() {
            if (my_media) {
                my_media.pause();
            }
        }

        // オーディオ停止
        //
        function stopAudio() {
            if (my_media) {
                my_media.stop();
            }
        }

        // 成功時のコールバック関数
        //
        function onSuccess(status)
        {
            console.log("playAudio():Audio Success");
            //playAudio(getBaseURL() + 'sound/bgm/main.ogg');
        }

        // エラー時のコールバック関数
        //
        function onError(error)
        {
            console.log("playAudio():onError:" + error.code);
        }

        //
        function onStatusChange(status)
        {
            console.log("playAudio():StatusChange:" + status);
            if (status == 3)
            {
                //alert("onStatusChange");
                //stopAudio();
                playAudio(getBaseURL() + 'sound/bgm/main.ogg');            
            }
        }

        function getBaseURL() {
            var str = location.pathname;
            var i = str.lastIndexOf('/');
            return str.substring(0,i+1);
            //http://www.tam-music.com/ogg/abcdef/tam-n13loop.ogg
            //getBaseURL() + 'music/tam-n13loop.ogg'
        } 
