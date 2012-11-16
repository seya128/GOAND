// This is a JavaScript file                

        function playAudioSE_OK() {
            playAudioSE(getBaseURL() + 'sound/se/ok.ogg');
        }

        function playAudioSE_Stamp()
        {
            playAudioSE(getBaseURL() + 'sound/stamp/kyoutu.ogg');
        }

        function playAudioSE(src) {
            // src から Media オブジェクトを作成
            my_media2 = new Media(src, onSuccessSE, onErrorSE);

            // オーディオ再生
            my_media2.play();
        }

        // 成功時のコールバック関数
        //
        function onSuccessSE()
        {
        }

        // エラー時のコールバック関数
        //
        function onErrorSE(error)
        {
        }
