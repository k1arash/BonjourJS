var exec = require("child_process").exec;
var fs = require("fs");
var querystring = require("querystring");
var formidable = require("formidable");

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
	console.log("upload page loading");
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("You sent:<br\>");
	console.log(postData.fields.text);
	response.write(postData.fields.text);
	//fs.renameSync(postData.files.upload.path, "/tmp/test.png");
	exec("mv " + postData.files.upload.path + " /tmp/test.png",
		function(error, stdout, stderr) {
			response.write("<img src='/show'/>");
			response.end();			
		});
}

function show(response, postData) {
	fs.readFile("/tmp/test.png", "binary", function(error, file) {
		if(error)
		{
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		} 
	});
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

exports.favicon = favicon;
exports.start = start;
exports.upload = upload;
exports.show = show;
