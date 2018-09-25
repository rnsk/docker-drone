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
    droneCommand = {},
    WSServer,
    port = 5005;

/*---- Sumo ----*/
droneSumo = nodeSumo.createClient();

droneSumo.connect(function () {
    droneCommand = {
        forward: droneSumo.forward,
        backward: droneSumo.backward,
        right: droneSumo.right
    };
});

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
                actionStart(message.data);
                break;
            case 'stop':
                // 停止処理
                response = 'stop';
                actionStop();
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

var execution = function (name, param) {
    if (typeof droneCommand[name] !== 'undefined') {
        droneCommand[name](param);
    }
};

var actionStart = function (actions) {
    for (let i = 0; i < actions.length; i++) {
        execution(actions[i].name, actions[i].param);
    }
};

var actionStop = function () {
    execution('stop');
};
