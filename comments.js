// Create web server 
// Load modules
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var comments = [];

// Create server
http.createServer(function (req, res) {
    var url_parts = url.parse(req.url);

    if (url_parts.pathname == '/') {
        fs.readFile('comment.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }

    if (url_parts.pathname == '/comment') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
            var POST = qs.parse(body);
            comments.push(POST['comment']);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Thanks for the comment\n');
        });
    }

    if (url_parts.pathname == '/get_comments') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        for (i = 0; i < comments.length; i++) {
            res.write(comments[i] + '\n');
        }
        res.end();
    }
}).listen(8080);

// Output
console.log('Server running on port 8080');
