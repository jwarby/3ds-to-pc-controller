// Helper functions
var printUsage = function() {
    console.error("Usage: node server.js <port_number> <driver_name>");
};


if (process.argv.length !== 4) {
    printUsage();
    process.exit(1);
}
console.log("Loading driver '"+process.argv[3]+"'...");
// Check that a port has been specified
var port = parseInt(process.argv[2], 10),
    Driver,
    driver;

try {
    Driver = require('./drivers/'+process.argv[3]+'.js')
    driver = new Driver();
} catch(e) {
    console.log("Failed loading driver.");
    process.exit(1);
}

console.log("Driver loaded.");

// Http routing
var handler = function(request, response) {
    var url = request.url === '/' ? '/index.html' : request.url;
    url = process.cwd() + '/client' + url;

    var fileExt = url.slice(url.lastIndexOf(".")+1),
        mime = (function(ext) {
            var mime;
            switch (ext) {
                case "html":
                    mime = "text/html";
                    break;
                case "js":
                    mime = "text/javascript";
                    break;
                default:
                    mime = "text/plain";
            }
            return mime;
        })(fileExt);

    fs.readFile(url, function(err, data) {
        if (err) {
            response.writeHead(500);
            return response.end('Error loading '+url);
        }

        response.setHeader('content-type', mime)
        response.writeHead(200);
        response.end(data);
    });
};

var server = require('http').createServer(handler),
    fs = require('fs'),
    io;

try {
    io = require('socket.io').listen(server, { log: false });
} catch(e) {
    console.log("There was a problem with socket.io.  Have you run `npm install`?");
    process.exit(1);
}

server.listen(port);

console.info("Listening on port " + port);
io.sockets.on('connection', function (socket) {
    console.log("New connection from "+socket.id);

    socket.on('button.press', function(button) {
        driver.onButtonPress(button);
    });

    socket.on('button.release', function(button) {
        driver.onButtonRelease(button);
    });
});
