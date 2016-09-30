'use strict';

// Electronのモジュール
const electron = require("electron");

// アプリケーションをコントロールするモジュール
const app = electron.app;

// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function() {
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({
    resizable: false,
    width: 400,
    height: 500,
    transparent: true,
    frame: false
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});


function installMenu() {
  var Menu = require('menu');
  if(process.platform == 'darwin') {
    menu = Menu.buildFromTemplate([
      {
        label: 'Electron',
        submenu: [
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function() { app.quit(); }
          },
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'Command+R',
            click: function() { mainWindow.restart(); }
          },
          {
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+Command+F',
            click: function() { mainWindow.setFullScreen(!mainWindow.isFullScreen()); }
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: 'Alt+Command+I',
            click: function() { mainWindow.toggleDevTools(); }
          },
        ]
      }
    ]);
    Menu.setApplicationMenu(menu);
  } else {
    menu = Menu.buildFromTemplate([
      {
        label: '&View',
        submenu: [
          {
            label: '&Reload',
            accelerator: 'Ctrl+R',
            click: function() { mainWindow.restart(); }
          },
          {
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click: function() { mainWindow.setFullScreen(!mainWindow.isFullScreen()); }
          },
          {
            label: 'Toggle &Developer Tools',
            accelerator: 'Alt+Ctrl+I',
            click: function() { mainWindow.toggleDevTools(); }
          },
        ]
      }
    ]);
    mainWindow.setMenu(menu);
  }
}
