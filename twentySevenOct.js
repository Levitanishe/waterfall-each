
//var http = require('http');
var request = require("request");
var fs = require('fs');

var connect;

var async = require("async");


function first(done) {
    request("http://api.population.io:80/1.0/countries", function(error, response, body) {
        done(error, body);
    });
};

function second(json, done) {
    var countriesObj = JSON.parse(json);

    var array = [];
    for(var i = 0;i < 50;i++) {
        array.push(countriesObj.countries[i]);
    }

    async.each(array, iterator, function(err){}
    );

    
};

function iterator(item){
    request('http://api.population.io:80/1.0/population/1980' + item + '/', function (error, response, body) {
        async.waterfall([generatorThree(body,item,error), four], function (err, result) {
            console.log(result);
        });
    });
};
        
function generatorThree(text,country,error) {
   return function(done){
       var nameOfFile = 'test' + country + '.txt';
       var writer = fs.createWriteStream(nameOfFile, {flags: 'w'});
       writer.write(text);
       console.log(done);
       done(error, nameOfFile);
   }
};

function four(path, done) {
    fs.readFile(path,'utf8',function (err, content) {
       done(err, content);
    });
}

async.waterfall([first,second],function (err, result) {
console.log(result);
});









