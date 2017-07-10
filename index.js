var xlsx = require('node-xlsx');
var fs = require('fs');
var stringify = require('js-stringify');
let arrayCompare = require("array-compare"); 

let result1 = xlsx.parse(fs.readFileSync(`./file1.csv`));
var result2 = xlsx.parse(fs.readFileSync(`./file3.csv`));

var compareResult = CompareRows(result1[0].data, result2[0].data);

fs.writeFile('diffResult', stringify(compareResult));

function CompareRows(file1, file2) {
    var file1Dict = BuildKeyValue(file1);
    var file2Dict = BuildKeyValue(file2);
    return arrayCompare(file1Dict, file2Dict, 'key');
}

function BuildKeyValue(file) {
    let fileList = file.map(function (el, index) {
        return {
            key: el.reduce(function (acc, cur) {
                return acc += cur;
            }, ""),
            rowNum: index,
            value: el
        }
    });

    const fileDict = new Map();

    fileList.forEach(function (file) {
        fileDict.set(file.key, {
            rowNum: file.rowNum,
            value: file.value
        })
    }, this);

    return fileList;
}