// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { DiagLogger } from "@opentelemetry/api";
import {
  accessAsync,
  appendFileAsync,
  confirmDirExists,
  getShallowFileSize,
  readdirAsync,
  readFileAsync,
  writeFileAsync,
  unlinkAsync,
} from "../../utils";

export class DiagFileConsoleLogger implements DiagLogger {
  private _TAG = "DiagFileConsoleLogger:";
  private _cleanupTimeOut = 60 * 30 * 1000; // 30 minutes;
  private _fileCleanupTimer: NodeJS.Timeout | null = null;
  private _tempDir: string;
  private _logFileName: string;
  private _fileFullPath: string;
  private _backUpNameFormat: string;
  private _logToFile = false;
  private _logToConsole = true;
  private _maxHistory: number;
  private _maxSizeBytes: number;
  private _logDestination: string | undefined;

  constructor() {
    this._logDestination = process.env.APPLICATIONINSIGHTS_LOG_DESTINATION; // destination can be one of file, console or file+console
    if (this._logDestination === "file+console") {
      this._logToFile = true;
    }
    if (this._logDestination === "file") {
      this._logToFile = true;
      this._logToConsole = false;
    }
    this._maxSizeBytes = 50000;
    this._maxHistory = 1;
    this._logFileName = "applicationinsights.log";

    // If custom path not provided use temp folder, /tmp for *nix and USERDIR/AppData/Local/Temp for Windows
    const logFilePath = process.env.APPLICATIONINSIGHTS_LOGDIR;
    if (!logFilePath) {
      this._tempDir = path.join(os.tmpdir(), "appInsights-node");
    } else {
      if (path.isAbsolute(logFilePath)) {
        this._tempDir = logFilePath;
      } else {
        this._tempDir = path.join(process.cwd(), logFilePath);
      }
    }
    this._fileFullPath = path.join(this._tempDir, this._logFileName);
    this._backUpNameFormat = `.${this._logFileName}`; // {currentime}.applicationinsights.log

    if (this._logToFile) {
      if (!this._fileCleanupTimer) {
        this._fileCleanupTimer = setInterval(() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this._fileCleanupTask();
        }, this._cleanupTimeOut);
        this._fileCleanupTimer.unref();
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public error(message?: any, ...args: any[]): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.logMessage(message, args);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public warn(message?: any, ...args: any[]): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.logMessage(message, args);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public info(message?: any, ...args: any[]): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.logMessage(message, args);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public debug(message?: any, ...args: any[]): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.logMessage(message, args);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public verbose(message?: any, ...args: any[]): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.logMessage(message, args);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async logMessage(message?: any, ...optionalParams: any[]): Promise<void> {
    try {
      const args = message ? [message, ...optionalParams] : optionalParams;
      if (this._logToFile) {
        await this._storeToDisk(args);
      }
      if (this._logToConsole) {
        // eslint-disable-next-line no-console
        console.log(...args);
      }
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log(this._TAG, `Failed to log to file: ${err && err.message}`);
    }
  }

  private async _storeToDisk(args: any): Promise<void> {
    const data = `${args}\r\n`;

    try {
      await confirmDirExists(this._tempDir);
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log(this._TAG, `Failed to create directory for log file: ${err && err.message}`);
      return;
    }
    try {
      await accessAsync(this._fileFullPath, fs.constants.F_OK);
    } catch (err: any) {
      // No file create one
      try {
        await appendFileAsync(this._fileFullPath, data);
      } catch (appendError: any) {
        // eslint-disable-next-line no-console
        console.log(
          this._TAG,
          `Failed to put log into file: ${appendError && appendError.message}`,
        );
        return;
      }
    }
    // Check size
    const size = await getShallowFileSize(this._fileFullPath);
    if (size && size > this._maxSizeBytes) {
      await this._createBackupFile(data);
    } else {
      await appendFileAsync(this._fileFullPath, data);
    }
  }

  private async _createBackupFile(data: string): Promise<void> {
    try {
      const buffer = await readFileAsync(this._fileFullPath);
      const backupPath = path.join(this._tempDir, `${new Date().getTime()}.${this._logFileName}`);
      await writeFileAsync(backupPath, buffer);
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log("Failed to generate backup log file", err);
    } finally {
      // Store logs
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      writeFileAsync(this._fileFullPath, data);
    }
  }

  private async _fileCleanupTask(): Promise<void> {
    try {
      let files = await readdirAsync(this._tempDir);
      // Filter only backup files
      files = files.filter((f) => path.basename(f).indexOf(this._backUpNameFormat) > -1);
      // Sort by creation date
      files.sort((a: string, b: string) => {
        // Check expiration
        const aCreationDate: Date = new Date(parseInt(a.split(this._backUpNameFormat)[0]));
        const bCreationDate: Date = new Date(parseInt(b.split(this._backUpNameFormat)[0]));
        if (aCreationDate < bCreationDate) {
          return -1;
        } else {
          return 1;
        }
      });
      const totalFiles = files.length;
      for (let i = 0; i < totalFiles - this._maxHistory; i++) {
        const pathToDelete = path.join(this._tempDir, files[i]);
        await unlinkAsync(pathToDelete);
      }
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log(this._TAG, `Failed to cleanup log files: ${err && err.message}`);
    }
  }
}
