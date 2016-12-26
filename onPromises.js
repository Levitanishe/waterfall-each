
var request = require('request');
var fs = require('fs');

function first(resolve,reject) {
    request("http://api.population.io:80/1.0/countries", function (error, response, body) {
        resolve(body);
    });
};


function second(json) {
    var countriesObj = JSON.parse(json);
    var country = countriesObj.countries[0];


   return new Promise(function (resolve, reject) {
       request('http://api.population.io:80/1.0/population/1980' + country + '/', function (error, response, body) {
           resolve({text: body,country : country});
       });
   });
};

function three(obj) {
    var nameOfFile = 'test'+ obj.country  + '.txt';
    var writer = fs.createWriteStream(nameOfFile, {flags: 'w'});
    writer.write(obj.text);
    console.log('ff');
    return  nameOfFile;


};

function four(path) {
    fs.readFile(path,'utf8',function (err, content) {
        console.log(content);
    });
};

var promise = new Promise(first);

promise.then(second).then(three).then(four);