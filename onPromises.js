
var request = require('request');
var fs = require('fs');



function first(resolve,reject) {
    request("http://api.population.io:80/1.0/countries", function (error, response, body) {
        resolve(body);
    });
};


function second(json) {
    var countriesObj = JSON.parse(json);
    var array = [];
    for(var i = 0; i < 50;i++){
        let country = countriesObj.countries[i];
        array.push(new Promise(function (resolve, reject) {
            request('http://api.population.io:80/1.0/population/1980' + country + '/', function (error, response, body) {
                resolve({text: body,country : country});
            });
        }));
    }



   return array;
};

function three(arrayOfPromises) {
    console.log(arrayOfPromises);
    arrayOfPromises.forEach(function (item,index,array) {
      item.then(four).then(five);
    });


};

function four(obj) {
    var nameOfFile = 'test'+ obj.country  + '.txt';
    var writer = fs.createWriteStream(nameOfFile, {flags: 'w'});
    writer.write(obj.text);
    console.log(nameOfFile);
    return  nameOfFile;

}

function five(path) {
    fs.readFile(path,'utf8',function (err, content) {
        console.log('читаю');
    });
};

var promise = new Promise(first);

promise.then(second).then(three);