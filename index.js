let xlsx = require('node-xlsx');
let parse = require('csv-parse/lib/sync');
let fs = require('fs');
let stringify = require('js-stringify');
let arrayCompare = require("array-compare");

let compareFile = require('./file-compare');

//app start 

let FilesPromise = compareFile.CompareFile(`${__dirname}/file2.xlsx`, `${__dirname}/testing2.csv`)

FilesPromise.then((result) => {
    console.log(result);
})
return;