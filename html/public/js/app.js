/**
 * Application script
 *
 * @copyright   Copyright (c) Yoshika
 * @author      Yoshika (@rnsk)
 * @link        https://rnsk.net/
 */

var ws = null,
    wsUrl = 'ws://localhost:5005',
    audioElem,
    audioFile = '../files/audio.mp3';

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

var showController = function () {
    document.getElementById('controller').style.display = 'block';
};

var controller = function () {
    document.getElementById('submit').addEventListener('click', function (e) {
        ws.send('hello');
    });
};

/*---- 音源再生 ----*/
audioElem = new Audio();
audioElem.src = audioFile;

document.getElementById('play').addEventListener('click', function (e) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        // 再生時の処理
        ws.send('play');
    };
    audioElem.play();
});

document.getElementById('pause').addEventListener('click', function (e) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        // 一時停止時の処理
        ws.send('pause');
    };
    audioElem.pause();
});

document.getElementById('stop').addEventListener('click', function (e) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        // 停止時の処理
        ws.send('stop');
    };
    audioElem.pause();
    audioElem.currentTime = 0;
});

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
