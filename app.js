//The process that runs package.json’s main script is called the main process. 
//The script that runs in the main process can display a GUI by creating web pages.
const electron = require('electron');
const path = require('path');
// const gitFolderInfo = require('./git_folder_info');

electron.app.on('ready', () => {
    let mainWindow = new electron.BrowserWindow({
        titleBarStyle: 'hidden',
        height: 650,
        width: 1300,
        backgroundColor: '#f05033',
        icon: path.join(__dirname, 'excel.ico'),
        show: false
    })
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    })
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.on('closed', function () {
        mainWindow = null
    })

    let menuTemplate = [];

    let menu = electron.Menu.buildFromTemplate(menuTemplate)

    menu.append(new electron.MenuItem({
        role: "reload"
    }));

    //Dev Tools--- 
    menu.append(new electron.MenuItem({
        role: "toggledevtools"
    }));

    electron.Menu.setApplicationMenu(menu);
});

electron.app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        electron.app.quit();
    }
});