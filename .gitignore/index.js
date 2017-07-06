var xlsx = require('node-xlsx');
var fs = require('fs');
var _ = require('lodash'); 
var stringify = require('js-stringify');


var result1 = xlsx.parse(fs.readFileSync(`./file1.xlsx`));
var result2 = xlsx.parse(fs.readFileSync(`./file2.xlsx`));

var compareResult = CompareRows(result1[0].data, result2[0].data); 

fs.writeFile('diffResult', stringify(compareResult));

function CompareRows(file1, file2) {
    var file1Dict = BuildKeyValue(file1);
    var file2Dict = BuildKeyValue(file2);
    return _.differenceBy(file1Dict, file2Dict, 'key'); 
}

function BuildKeyValue(file) {
    return file.map(function (el, index) {
        return {
            key: el.reduce(function (acc, cur) {
                return acc += cur;
            }, ""),
            rowNum: index,
            value: el
        }
    })
}
