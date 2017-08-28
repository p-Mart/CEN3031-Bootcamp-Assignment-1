var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  //console.log(parsedUrl);
  //console.log(request.getHeaders());

  if(parsedUrl.path === '/listings'){
    response.writeHead(200, {"Content-Type" : "json"});
    response.write(listingData);
  }else{
    response.writeHead(404, {"Content-Type" : "text/html"});
    response.write("Bad gateway error");
  }

  response.end();

  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */


};

fs.readFile('listings.json', 'utf8', function(err, data) {
    listingData = data;
    server = http.createServer(requestHandler);
    server.listen(port, function(){
        console.log("Listening on localhost:"+port);
    });
});
