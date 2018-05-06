const electron = require('electron');
const schedule = require('node-schedule');
const net = require('net');

const {app, BrowserWindow, dialog} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


function createWindow() {
  console.log('create window');
  mainWindow = new BrowserWindow({
    x:0,
    y:0,
    resizeable: false,
    moveable: false,
    alwaysOnTop: false,
    frame: false,
    hasShadow: false,
    show: false,
    transparent: true,
    width: 1080,
    height: 720
  });

  const mainUrl = 'http://localhost:8080';
  mainWindow.loadURL(mainUrl);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
}

let timer = null;
let job = null;

function connect() {
  const socket = net.createConnection(8080, 'localhost', function (err) {
    console.log('connecting');
    clearTimeout(timer);
    createWindow();
  });

  socket.on('error', function (err) {
    console.log('retry connection');
    clearTimeout(timer);
    timer = setTimeout(connect, 500);
  });
}

app.on('ready', connect);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
