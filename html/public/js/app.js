/**
 * Application script
 *
 * @copyright   Copyright (c) Yoshika
 * @author      Yoshika (@rnsk)
 * @link        https://rnsk.net/
 */

var ws = null,
    wsUrl = 'ws://localhost:5005',
    audioObj = new Audio(),
    actions = new Array();

/*---- WebSocket ----*/
ws = new WebSocket(wsUrl);

// 接続開始時のコールバック
ws.onopen = function () {
    console.log('Socket 接続成功');
    // メッセージ送信
    ws.send(JSON.stringify({
        type: 'message',
        data: 'hello'
    }));
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
    switch (message.data) {
        case 'ready':
            // Sumo 準備完了時
            break;
        case 'start':
            // 開始時
            generateAction();
            if (audioObj.readyState === 4) {
                audioObj.play();
            }
            break;
        case 'stop':
            // 停止時
            audioObj.pause();
            audioObj.currentTime = 0;
            break;
        default:
            console.log(message.data);
    }
};

document.getElementById('start').addEventListener('click', function (e) {
    generateAction();
    console.log(actions);
    if (ws && ws.readyState === WebSocket.OPEN) {
        // 再生時の処理
        ws.send(JSON.stringify({
            type: 'start',
            data: actions
        }));
    }
});

document.getElementById('stop').addEventListener('click', function (e) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        // 停止時の処理
        ws.send(JSON.stringify({
            type: 'stop'
        }));
    }
});

/*---- 音源再生 ----*/
var audioFile = document.getElementById('audioFile');

//　曲が選択されたら処理を実行
audioFile.addEventListener('change', function () {
    var reader = new FileReader();
    reader.onload = function(e) {
        audioObj.src = this.result;
        audioObj.load();
        // audioObj.controls = true;
        // audioObj.play();
    };
    reader.readAsDataURL(this.files[0]);
    return audioObj.src;
}, true);

document.getElementById('audioClear').addEventListener('click', function (e) {
    audioObj.src = '';
    document.getElementById('audioFile').value = '';
    e.preventDefault();
}, false);

/*---- ブロック ----*/
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

var generateAction = function () {
    actions = [];
    var blocks = sortable('.js-sortable-copy-target', 'serialize');
    var items = blocks[0].items;
    for (let key of Object.keys(items)) {
        var name = ($(items[key].node).data('action').length) ? $(items[key].node).data('action') : '';
        if (name != '') {
            var action = {
                name: name,
                param: ($(items[key].node).children('input.param').length) ? $(items[key].node).children('input.param').val() : ''
            };
            actions.push(action);
        }
    }
};
