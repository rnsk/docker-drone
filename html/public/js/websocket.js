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
droneSumo = nodeSumo.createClient();

droneSumo.connect(function () {
    droneSumo.postureJumper();
    droneSumo.forward(50);
});

/*---- WebSocket ---- */
WSServer = new WebSocketServer({ port: port });

WSServer.on('connection', function (connection) {

    connection.on('message', function (message) {
        // メッセージ受け取り時の処理
        console.log('Received: ' + message);

        // 接続しているクライアントすべてにメッセージを返す
        WSServer.clients.forEach(function (client) {
            client.send(message + ' : ' + new Date());
        });
    });

    connection.on('close', function () {
        // 切断時の処理
        console.log('I lost a client');
    });
});
