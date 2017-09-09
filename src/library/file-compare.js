let csv = require('fast-csv');
let xlsx = require('node-xlsx');
let fs = require('fs');
let stringify = require('js-stringify');
let arrayCompare = require("array-compare");
let Q = require('q');

function CompareFile(file1Loc, file2Loc) {
    let result = Q.defer();
    Q.all([ReadExcelFile(file1Loc), ReadExcelFile(file2Loc)]).then((files) => {
        let file1 = BuildKeyValue(files[0]);
        let file2 = BuildKeyValue(files[1]);
        let comparisonResults = arrayCompare(file1, file2, 'key');
        result.resolve({
            file1:files[0],
            file2:files[1],
            comparisonResults
        });
    })
    return result.promise;
}

function BuildKeyValue(file) {
    let fileList = file.map(function (el, index) {
        return {
            key: el.concat().sort().reduce(function (acc, cur) {
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

function ReadExcelFile(fileLocation) {
    let result = Q.defer();
    if (fileLocation.includes('.xlsx')) {
        let xlsxFile = xlsx.parse(fs.readFileSync(fileLocation));
        result.resolve(xlsxFile[0].data);
    } else if (fileLocation.includes('.csv')) {
        let excelResults = [];
        csv.fromPath(fileLocation).on('data', (obj) => {
            excelResults.push(obj);
        }).on('end', () => {
            console.log(`${fileLocation} is done`);
            result.resolve(excelResults);
        });
    }
    return result.promise;
}

window.CompareFile = CompareFile;
