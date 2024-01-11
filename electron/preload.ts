import { contextBridge, ipcRenderer } from "electron";

// // let title = "test";

contextBridge.exposeInMainWorld("electronAPI", {
  //setTitle: (title: string) => ipcRenderer.send('open-add-dialog', title)
  setTitle: (title: string) => {
    console.log("preload.ts setTitle");
  },
  ping: () => {
    console.log("PING");
    // ipcRenderer.invoke("ping", "pong");

    ipcRenderer.invoke("ping", "pong").then((result) => {
      return result;
    });

    return "pong";
  },
});
