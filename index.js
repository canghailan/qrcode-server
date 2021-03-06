const http = require('http');
const url = require('url');
const QRCode = require('qrcode')

http.createServer((request, response) => {
    let parsed = url.parse(request.url, true);
    let text = parsed.pathname.substring(1);
    if (text) {
        text = new Buffer(text, 'base64').toString('utf-8');
    } else {
        text = parsed.query['t'];
    }

    let options = Object.assign({
        width: 640
    }, parsed.query);
    if (text) {
        console.log(text);
        response.writeHead(200, { 'Content-Type': 'image/png' });
        QRCode.toFileStream(response, text, options);
    } else {
        response.statusCode = 404;
        response.end();
    }
}).listen(3000);
