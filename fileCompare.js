var xlsx = require('node-xlsx');
var fs = require('fs');
// var stringify = require('js-stringify');
let arrayCompare = require("array-compare");

exports.CompareFiles = (file1Location, file2Location) => {
    const result1 = xlsx.parse(fs.readFileSync(file1Location));
    const result2 = xlsx.parse(fs.readFileSync(file2Location));
    const compareResult = CompareRows(result1[0].data, result2[0].data);
    return compareResult;
}

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