var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript'
};

http.createServer(doRequest).listen(3000);
console.log('Server running at http://localhost:8080/');

// リクエストの処理
function doRequest(req, res) {
    if (req.url == '/') {
        filePath = '/index.html';
    } else {
        filePath = req.url;
    }
    var fullPath = 'public' + filePath;

    res.writeHead(200, { 'Content-Type': mime[path.extname(fullPath)] || 'text/plain' });
    fs.readFile(fullPath, function(err, data) {
        if (err) {
            // エラー時の応答
        } else {
            res.end(data, 'utf-8');
        }
    });
}
