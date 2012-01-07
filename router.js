function route(handle, pathname, response, postData) {
	console.log("routing to " + pathname);
	if(typeof handle[pathname] == 'function')
		handle[pathname](response, postData);
	else {
		console.log("error: no handler found for " + pathname);
		response.writeHead(400, {"Content-Type" : "text/html"});
		response.write("HTTP 400 Page not found");
		response.end();
	}
}
exports.route = route;
