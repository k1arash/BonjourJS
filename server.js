var http = require("http"),
url = require("url"),
formidable = require("formidable"),
util = require("util");

function start(route, handle) {
	console.log("server started");
	var server = http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("request for " + pathname + " received");
		if(request.method.toLowerCase() == "post")
			processPostData(route, handle, pathname, response, request);
		else
			route(handle, pathname, response, null);
	}).listen(8888);
}
exports.start = start;

function processPostData(route, handle, pathname, response, request) {
	var form = new formidable.IncomingForm();
	/*var postData, fields = [], files = [];
	form.on("error", function(err) {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.end("error:\n\n" + util.inspect(err));
	});
	form.on("field", function(field, value) {
		fields.push([field, value]);
	});
	form.on("file", function(file, value) {
		files.push([file, value]);
	});
	form.on("end", function() {
		console.log("parsing done");
		console.log(fields);
		postData = {"fields": fields, "files": files};
		route(handle, pathname, response, postData);
	});
	form.parse(request);*/
	form.parse(request, function(error, fields, files) {
			if(error) {
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.write(error + "\n");
				response.end();
			} else {
			console.log("parsing done");
			var postData = {"fields": fields, "files": files};
			route(handle, pathname, response, postData);    
			}
		});
}
