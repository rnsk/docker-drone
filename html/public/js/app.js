/**
 * Application script
 *
 * @copyright   Copyright (c) Yoshika
 * @author      Yoshika (@rnsk)
 * @link        https://rnsk.net/
 */

var connection,
    connectionUrl = 'ws://localhost:5005',
    audioElem,
    audioFile = '../files/audio.mp3';

/*---- WebSocket ----*/
connection = new WebSocket(connectionUrl);

// 接続
connection.addEventListener('open', function (e) {
    console.log('Socket 接続成功');
});

// サーバーからデータを受け取る
connection.addEventListener('message', function (e) {
    console.log(e.data);
});

window.addEventListener('DOMContentLoaded', function (e) {
    // サーバーにデータを送る
    document.getElementById('submit').addEventListener('click', function (e) {
        connection.send('hello');
    });
});

/*---- 音源再生 ----*/
audioElem = new Audio();
audioElem.src = audioFile;

document.getElementById('play').addEventListener('click', function (e) {
    audioElem.play();
});

document.getElementById('pause').addEventListener('click', function (e) {
    audioElem.pause();
});

document.getElementById('stop').addEventListener('click', function (e) {
    audioElem.pause();
    audioElem.currentTime = 0;
});
