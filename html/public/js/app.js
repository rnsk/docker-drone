/**
 * Application script
 *
 * @copyright   Copyright (c) Yoshika
 * @author      Yoshika (@rnsk)
 * @link        http://rnsk.net/
 */

/*---- WebSocket ----*/

var sock = new WebSocket('ws://localhost:5005');

// 接続
sock.addEventListener('open',function(e){
    console.log('Socket 接続成功');
});

// サーバーからデータを受け取る
sock.addEventListener('message',function(e){
    console.log(e.data);
});

window.addEventListener('DOMContentLoaded',function(e){
    // サーバーにデータを送る
    document.getElementById('submit').addEventListener('click',function(e){
        sock.send('hello');
    });
});
