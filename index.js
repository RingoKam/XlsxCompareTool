const FileCompare = window.require('./fileCompare');
const electron = window.require('electron').remote;

$('.openFilePath').on('click', function () {
    let that = this;
    electron.dialog.showOpenDialog({
        title: "Select File location"
    }, (filePath) => {
        alert(filePath);
        $(that).siblings('.filename').text(filePath[0]);
    })
});

$('#compare').on('click', function () {
    const file1 = $("#file1path").text();
    const file2 = $("#file2path").text();
    let result = ResultMapper(FileCompare.CompareFiles(file1, file2));
    $('#file1Result').empty();
    $('#file1Result').append()
});

function ResultMapper(result) {
    return {
        match: result.added && result.added.length === 0 && result.missing && result.missing.length === 0,
        MissingFromFile2: result.added,
        MissingFromFile1: result.missing
    }
}
