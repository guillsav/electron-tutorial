const { app, BrowserWindow, Menu } = require("electron")

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
    icon: `${__dirname}/app/assets/icons/Icon_256x256.png`,
    resizable: isDev,
  })

  mainWindow.loadFile(`${__dirname}/app/index.html`)
}

app.on("ready", () => {
  createMainWindow()

  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)

  mainWindow.on("closed", () => (mainWindow = null))
})

const menu = [
  ...(isMac ? [{ role: "appMenu" }] : []),
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: "CmdOrCtrl+W",
        click: () => app.quit(),
      },
    ],
  },
]

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    if (!isMac) {
      app.quit()
    }
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})
