/**
 * WebSocket script
 *
 * @copyright   Copyright (c) Yoshika
 * @author      Yoshika (@rnsk)
 * @link        https://rnsk.net/
 */

var WebSocketServer = require('ws').Server;
var nodeSumo = require('node-sumo');

var droneSumo,
    WSServer,
    port = 5005;

/*---- Sumo ----*/
// droneSumo = nodeSumo.createClient();
// 
// droneSumo.connect(function () {
//     droneSumo.postureJumper();
//     droneSumo.forward(50);
// });

/*---- WebSocket ---- */
WSServer = new WebSocketServer({ port: port });

WSServer.on('connection', function (connection) {

    connection.on('message', function (messageData) {
        // メッセージ受け取り時の処理
        var response;
        var message = JSON.parse(messageData);
        switch (message.type) {
            case 'start':
                // 開始処理
                response = 'start';
                break;
            case 'stop':
                // 停止処理
                response = 'stop';
                break;
            case 'message':
                response = message.data;
                break;
            default:
                response = messageData + ' : ' + new Date();
        }

        // 接続しているクライアントすべてにメッセージを返す
        WSServer.clients.forEach(function (client) {
            client.send(response);
        });
    });

    connection.on('close', function () {
        // 切断時の処理
        console.log('I lost a client');
    });
});
