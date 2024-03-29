import { app, ipcMain, BrowserWindow } from "electron";
import * as path from "path";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import * as fs from "fs";
import { exec } from "child_process";
import * as readline from "readline";

function createWindow() {
  ipcMain.handle("ping", async (event, arg) => {
    // do stuff
    //await awaitableProcess();

    exec("whoami", (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }

      let file = "/Users/" + stdout.trim() + "/.zprofile";

      var lineReader = readline.createInterface({
        input: require("fs").createReadStream(file),
      });

      lineReader.on("line", function (line) {
        console.log("Line from file:", line);
      });

      lineReader.on("close", function () {
        console.log("all done, son");
      });

      // fs.open(file, "r", (err, fd) => {
      //   if (err) {
      //     if (err.code === "ENOENT") {
      //       console.error("myfile does not exist");
      //       return;
      //     }
      //   }
      //   console.log("file opened");
      // });
    });

    return "pong!";
  });

  const win = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (app.isPackaged) {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL("http://localhost:3000/index.html");

    win.webContents.openDevTools();

    // Hot Reloading on 'node_modules/.bin/electronPath'
    require("electron-reload")(__dirname, {
      electron: path.join(
        __dirname,
        "..",
        "..",
        "node_modules",
        ".bin",
        "electron" + (process.platform === "win32" ? ".cmd" : ""),
      ),
      forceHardReset: true,
      hardResetMethod: "exit",
    });
  }
}

app.whenReady().then(() => {
  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});
