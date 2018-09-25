/**
 * Application script
 *
 * @copyright   Copyright (c) Yoshika
 * @author      Yoshika (@rnsk)
 * @link        https://rnsk.net/
 */

var ws = null,
    wsUrl = 'ws://localhost:5005',
    audioObj = new Audio();

/*---- WebSocket ----*/
ws = new WebSocket(wsUrl);

// 接続開始時のコールバック
ws.onopen = function () {
    console.log('Socket 接続成功');
    // メッセージ送信
    ws.send('hello');
    // コントローラー表示
    showController();
};

// 接続切断時のコールバック
ws.onclose = function (event) {
    // 再接続ボタンを表示する
};

// エラー発生時のコールバック
ws.onerror = function (error) {
};

// メッセージ受け取り時のコールバック
ws.onmessage = function (message) {
    console.log(message.data);
    // 指示完了の信号を受け取る
};

document.getElementById('start').addEventListener('click', function (e) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        // 再生時の処理
        ws.send('play');
    };
    audioObj.play();
});

document.getElementById('stop').addEventListener('click', function (e) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        // 停止時の処理
        ws.send('stop');
    };
    audioObj.pause();
    audioObj.currentTime = 0;
});

/*---- 音源再生 ----*/
var audioFile = document.getElementById('audioFile');

//　曲が選択されたら処理を実行
audioFile.addEventListener('change', function () {
    var reader = new FileReader();
    reader.onload = function(e) {
        audioObj.src = this.result;
        // audioObj.controls = true;
        // audioObj.play();
    };
    reader.readAsDataURL(this.files[0]);
}, true);

/*---- 並び替え ----*/
sortable('.js-sortable-copy', {
    forcePlaceholderSize: true,
    copy: true,
    acceptFrom: false,
    placeholderClass: 'mb1 bg-navy border border-yellow',
});
sortable('.js-sortable-copy-target', {
    forcePlaceholderSize: true,
    acceptFrom: '.js-sortable-copy,.js-sortable-copy-target',
    placeholderClass: 'mb1 border border-maroon',
});
