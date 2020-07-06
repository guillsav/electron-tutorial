const { app, BrowserWindow } = require("electron")

process.env.NODE_ENV = "development"

// Set Environment
const isDev = process.env.NODE_ENV !== "production" ? true : false
const isMac = process.env.platform == "darwin" ? true : false

let mainWindow

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "ImageShrink",
    width: 500,
    height: 600,
    icon: `./app/assets/icons/Icon_256x256.png`,
    resizable: isDev,
  })

  mainWindow.loadFile("./app/index.html")
}

app.on("ready", createMainWindow)
