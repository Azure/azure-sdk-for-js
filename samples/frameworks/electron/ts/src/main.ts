/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.

  The main process is responsible for renderer window management
  as well as integration between a renderer and the authentication provider.
*/
import { app, BrowserWindow, ipcMain } from "electron";
import { IPC_MESSAGES } from "./constants";
import AuthProvider from "./authProvider";
import * as path from "path";

export default class Main {
  static application: Electron.App;
  static mainWindow?: Electron.BrowserWindow;
  static authProvider: AuthProvider;

  static main(): void {
    Main.application = app;
    Main.application.on("window-all-closed", Main.onWindowAllClosed);
    Main.application.on("ready", Main.onReady);
  }

  private static onWindowAllClosed(): void {
    Main.application.quit();
  }

  private static onClose(): void {
    Main.mainWindow = undefined;
  }

  private static onReady(): void {
    Main.createMainWindow();
    Main.render();
    Main.mainWindow?.on("closed", Main.onClose);
    Main.authProvider = new AuthProvider();
    Main.registerSubscriptions();
  }

  private static createMainWindow(): void {
    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 800,
      webPreferences: {
        nodeIntegration: true
      }
    });
  }

  public static publish(message: string, payload: any): void {
    Main.mainWindow?.webContents.send(message, payload);
  }

  public static async render(): Promise<void> {
    Main.mainWindow?.loadFile(path.join(__dirname, "../index.html"));
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

Main.main();
