'use strict';

var promise  = require('bluebird');
var fs = promise.promisifyAll(require('fs'));
var request = promise.promisifyAll(require('request'));
var async  = require('asyncawait/async');
var await = require('asyncawait/await');


var program = async(function () {

    var countriesResponse = await(request.getAsync("http://api.population.io:80/1.0/countries"));
    var countriesObj =JSON.parse(countriesResponse.body);

    for(var i = 0; i < 10;i++){
        functionParralell(countriesObj.countries[i]);
    }
});

var functionParralell = async(function(nameOfCountry) {
    var infaResponse = await (request.getAsync('http://api.population.io:80/1.0/population/1980' + nameOfCountry + '/'));
    var infa = infaResponse.body;
    var nameOfFile = 'test'+ nameOfCountry  + '.txt';
    var writer = fs.createWriteStream(nameOfFile, {flags: 'w'});
    await(writer.write(infa));
    var resultInfa = await(fs.readFileAsync(nameOfFile,'utf8'));
    console.log(resultInfa);
});

program();