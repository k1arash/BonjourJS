var exec = require("child_process").exec;
var fs = require("fs");
var querystring = require("querystring");

function start(response, postData) {
	response.writeHead(200, {"Content-Type": "text/html"});
	exec("cat start.html", function(error, stdout, stderr) {
		response.write(stdout);
		response.end();
	});
	/*exec("find /", { timeout:10000, maxBuffer: 20000*1024 },
		function(error, stdout, stderr) {
			response.write(stdout);
			response.end();	
	});*/
}

function upload(response, postData) {
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("You sent:<br\>");
	response.write(querystring.parse(postData).text);
	response.end();
}

function favicon(response, postData) {
	fs.readFile("favicon.ico", "binary", function(error, file) {
	if(error) {
		response.writeHead(400, {"Content-Type": "text/plain"});
		response.write("icon not found");
		response.end();
	} else {
		response.writeHead(200, {"Content-Type": "image/x-icon"});
		response.write(file, "binary");
		response.end();
	}
	});
}

exports.start = start;
exports.upload = upload;
exports.favicon = favicon;
