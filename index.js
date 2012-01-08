var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = handle["/start"] = requestHandlers.start;
handle["/favicon.ico"] = requestHandlers.favicon; 
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

console.log("index.js started.");
server.start(router.route, handle);
