var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request("http://archive.ubuntu.com/ubuntu/", function (error, response, body) {
    if (error) {
        console.log("Error: " + error);
    }
    //console.log("Status code: " + response.statusCode);

    var $ = cheerio.load(body);
    var table = $("table");

    getRowInfo(table);

    function recursive(tableName) {
        if (tableName.slice(-1) == '/') {
            return true;
        } else {
            return false;
        }
    }

    function getRowInfo(table) {
        table.find('tr').each(function (i) {
            var $tds = $(this).find('td');
            tableName = $tds.eq(1).text();
            tableLastModified = $tds.eq(2).text();
            tableSize = $tds.eq(3).text();
        printResults(tableName, tableLastModified, tableSize, recursive(tableName));
        });
    }

    function printResults(tableName, tableLastModified, tableSize, directoryStatus) {
        if (tableName == '' | tableName == 'Parent Directory' | tableName == 'ubuntu/') {

        } else {
            console.log('Name: ' + tableName + ' Directory: ' + directoryStatus + ' Last Modified: ' + tableLastModified + ' Size: ' + tableSize);
        }
    }
});