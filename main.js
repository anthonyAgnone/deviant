const electron = require("electron");
const $ = require("jquery");
const remote = electron.remote;
require("electron-reload")(__dirname);

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

let mainWindow;

class Main {
  constructor() {
    this.mainWindow = null;
    this.addListeners();
  }

  createWindow() {
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
    this.mainWindow = new BrowserWindow({
      width,
      height,
      fullscreen: true,
      autoHideMenuBar: true
    });
    this.mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
      })
    );
    this.mainWindow.on("closed", function() {
      this.mainWindow = null;
    });
  }

  addListeners() {
    app.on("ready", this.createWindow);

    // Quit when all windows are closed.
    app.on("window-all-closed", function() {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });
  }
}

new Main();
