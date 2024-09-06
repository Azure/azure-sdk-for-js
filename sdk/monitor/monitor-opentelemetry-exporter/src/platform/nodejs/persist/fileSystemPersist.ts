// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { diag } from "@opentelemetry/api";
import { PersistentStorage } from "../../../types";
import { FileAccessControl } from "./fileAccessControl";
import { confirmDirExists, getShallowDirectorySize } from "./fileSystemHelpers";
import { promisify } from "util";
import { AzureMonitorExporterOptions } from "../../../config";

const statAsync = promisify(fs.stat);
const readdirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);
const writeFileAsync = promisify(fs.writeFile);

/**
 * File system persist class.
 * @internal
 */
export class FileSystemPersist implements PersistentStorage {
  static TEMPDIR_PREFIX = "ot-azure-exporter-";
  static FILENAME_SUFFIX = ".ai.json";

  fileRetemptionPeriod = 2 * 24 * 60 * 60 * 1000; // 2 days
  cleanupTimeOut = 60 * 60 * 1000; // 1 hour
  maxBytesOnDisk: number = 50_000_000; // ~50MB

  private _enabled: boolean;
  private _tempDirectory: string = "";
  private _fileCleanupTimer: NodeJS.Timeout | null = null;
  private _instrumentationKey: string;

  constructor(
    instrumentationKey: string,
    private _options?: AzureMonitorExporterOptions,
  ) {
    this._instrumentationKey = instrumentationKey;
    if (this._options?.disableOfflineStorage) {
      this._enabled = false;
      return;
    }
    this._enabled = true;
    FileAccessControl.checkFileProtection();

    if (!FileAccessControl.OS_PROVIDES_FILE_PROTECTION) {
      this._enabled = false;
      diag.error(
        "Sufficient file protection capabilities were not detected. Files will not be persisted",
      );
    }

    if (!this._instrumentationKey) {
      this._enabled = false;
      diag.error(
        `No instrumentation key was provided to FileSystemPersister. Files will not be persisted`,
      );
    }
    if (this._enabled) {
      this._tempDirectory = path.join(
        this._options?.storageDirectory || os.tmpdir(),
        "Microsoft",
        "AzureMonitor",
        FileSystemPersist.TEMPDIR_PREFIX + this._instrumentationKey,
      );

      // Starts file cleanup task
      if (!this._fileCleanupTimer) {
        this._fileCleanupTimer = setTimeout(() => {
          this._fileCleanupTask();
        }, this.cleanupTimeOut);
        this._fileCleanupTimer.unref();
      }
    }
  }

  push(value: unknown[]): Promise<boolean> {
    if (this._enabled) {
      diag.debug("Pushing value to persistent storage", value.toString());
      return this._storeToDisk(JSON.stringify(value));
    }
    // Only return a false promise if the SDK isn't set to disable offline storage
    if (!this._options?.disableOfflineStorage) {
      return new Promise((resolve) => {
        resolve(false);
      });
    }
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  async shift(): Promise<unknown> {
    if (this._enabled) {
      diag.debug("Searching for filesystem persisted files");
      try {
        const buffer = await this._getFirstFileOnDisk();
        if (buffer) {
           
          return JSON.parse(buffer.toString("utf8"));
        }
      } catch (e: any) {
        diag.debug("Failed to read persisted file", e);
      }
      return null;
    }
    return new Promise((resolve) => {
      resolve(null);
    });
  }

  /**
   * Check for temp telemetry files
   * reads the first file if exist, deletes it and tries to send its load
   */
  private async _getFirstFileOnDisk(): Promise<Buffer | null> {
    try {
      const stats = await statAsync(this._tempDirectory);
      if (stats.isDirectory()) {
        const origFiles = await readdirAsync(this._tempDirectory);
        const files = origFiles.filter((f) =>
          path.basename(f).includes(FileSystemPersist.FILENAME_SUFFIX),
        );
        if (files.length === 0) {
          return null;
        } else {
          const firstFile = files[0];
          const filePath = path.join(this._tempDirectory, firstFile);
          const payload = await readFileAsync(filePath);
          // delete the file first to prevent double sending
          await unlinkAsync(filePath);
          return payload;
        }
      }
      return null;
    } catch (e: any) {
      if (e.code === "ENOENT") {
        // File does not exist -- return null instead of throwing
        return null;
      } else {
        throw e;
      }
    }
  }

  private async _storeToDisk(payload: string): Promise<boolean> {
    try {
      await confirmDirExists(this._tempDirectory);
    } catch (error: any) {
      diag.warn(`Error while checking/creating directory: `, error && error.message);
      return false;
    }

    try {
      const size = await getShallowDirectorySize(this._tempDirectory);
      if (size > this.maxBytesOnDisk) {
        diag.warn(
          `Not saving data due to max size limit being met. Directory size in bytes is: ${size}`,
        );
        return false;
      }
    } catch (error: any) {
      diag.warn(`Error while checking size of persistence directory: `, error && error.message);
      return false;
    }

    const fileName = `${new Date().getTime()}${FileSystemPersist.FILENAME_SUFFIX}`;
    const fileFullPath = path.join(this._tempDirectory, fileName);

    // Mode 600 is w/r for creator and no read access for others
    diag.info(`saving data to disk at: ${fileFullPath}`);
    try {
      await writeFileAsync(fileFullPath, payload, { mode: 0o600 });
    } catch (writeError: any) {
      diag.warn(`Error writing file to persistent file storage`, writeError);
      return false;
    }
    return true;
  }

  private async _fileCleanupTask(): Promise<boolean> {
    try {
      const stats = await statAsync(this._tempDirectory);
      if (stats.isDirectory()) {
        const origFiles = await readdirAsync(this._tempDirectory);
        const files = origFiles.filter((f) =>
          path.basename(f).includes(FileSystemPersist.FILENAME_SUFFIX),
        );
        if (files.length === 0) {
          return false;
        } else {
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          files.forEach(async (file) => {
            // Check expiration
            const fileCreationDate: Date = new Date(
              parseInt(file.split(FileSystemPersist.FILENAME_SUFFIX)[0]),
            );
            const expired = new Date(+new Date() - this.fileRetemptionPeriod) > fileCreationDate;
            if (expired) {
              const filePath = path.join(this._tempDirectory, file);
              await unlinkAsync(filePath);
            }
          });
          return true;
        }
      }
      return false;
    } catch (error: any) {
      diag.info(`Failed cleanup of persistent file storage expired files`, error);
      return false;
    }
  }
}
