var http = require("http");
var url = require("url");

function start(route, handle) {
	console.log("server started");
	var server = http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("request for " + pathname + " received");
		request.setEncoding("utf8");
		var postData = "";
		request.addListener("data", function(postDataChunck) {
			console.log("one piece received");
			postData += postDataChunck;
		});
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	}).listen(8888);
}
exports.start = start;
