const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process (React) to use
// specific electron APIs without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Example: Send a message to the main process
  sendNotification: (message) => ipcRenderer.send('notify', message),
  
  // Example: Get the app version
  getAppVersion: () => ipcRenderer.invoke('get-version')
});
