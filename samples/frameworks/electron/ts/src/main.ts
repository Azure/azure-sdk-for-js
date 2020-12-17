import { app, BrowserWindow, ipcMain, session } from "electron";
import { IPC_MESSAGES } from "./Constants";
import AuthProvider from "./AuthProvider";
import * as path from "path";
import * as logger from "@azure/logger";

export default class Main {
  static application: Electron.App;
  static mainWindow: Electron.BrowserWindow;
  static authProvider: AuthProvider;
  static accessToken: string;

  static main(): void {
    Main.application = app;
    Main.application.on("window-all-closed", Main.onWindowAllClosed);
    Main.application.on("ready", Main.onReady);
    logger.setLogLevel("verbose");
  }

  private static onWindowAllClosed(): void {
    Main.application.quit();
  }

  private static onClose(): void {
    Main.mainWindow = null;
  }

  private static onReady(): void {
    Main.createMainWindow();
    Main.render();
    Main.mainWindow.on("closed", Main.onClose);
    Main.authProvider = new AuthProvider();
    Main.registerSubscriptions();
  }

  // Creates main application window
  private static createMainWindow(): void {
    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 800,
      webPreferences: {
        nodeIntegration: true
      }
    });
    this.mainWindow.webContents.openDevTools();
  }

  public static publish(message: string, payload: any): void {
    Main.mainWindow.webContents.send(message, payload);
  }

  public static async render(): Promise<void> {
    Main.mainWindow.loadFile(path.join(__dirname, "../index.html"));
  }

  private static async login(): Promise<void> {
    Main.authProvider.login();
  }

  private static async logout(): Promise<void> {
    Main.authProvider.logout();
  }

  // Router that maps callbacks/actions to specific messages received from the Renderer
  private static registerSubscriptions(): void {
    ipcMain.on(IPC_MESSAGES.LOGIN, Main.login);
    ipcMain.on(IPC_MESSAGES.LOGOUT, Main.logout);
  }
}
