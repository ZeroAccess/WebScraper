var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request("http://archive.ubuntu.com/ubuntu/pool/", function (error, response, body) {
    if (error) {
        console.log("Error: " + error);
    }
    //console.log("Status code: " + response.statusCode);

    var $ = cheerio.load(body);
    var table = $("table");

    table.find('tr').each(function (i) {
        var $tds = $(this).find('td'),
            tableName = $tds.eq(1).text(),
            tableLastModified = $tds.eq(2).text(),
            tableSize = $tds.eq(3).text();

        if (tableName == '' | tableName == 'Parent Directory' | tableName == 'ubuntu/') {

        } else {
            console.log('Name: ' + tableName
                + '\nLast Modified: ' + tableLastModified
                + '\nSize: ' + tableSize);
        }


    });
});