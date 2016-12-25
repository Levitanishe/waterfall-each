/**
 * Created by Левитан on 25.09.2016.
 */
 fs = require('fs');
 url = require('url');
http = require('http');
 //htmler =  module.exports('node_modules/twentySevenOct.js')
 index = function (html) {

    http.createServer(function (request, response) {
       // fs = require('fs');
       // url = require('url');
        var pathname = url.parse(request.url).pathname;
        console.log(pathname);
        fs.writeFileSync('page.html',html,'utf8');
        fs.readFile('page.html', 'utf8', function (error, data) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        })
    }).listen(8080);
//http.listen(8080);

     return 0;
}

module.exports = index;
//toServerHyml(html);



