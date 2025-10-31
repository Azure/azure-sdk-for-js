// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { tmpdir, userInfo } from "node:os";
import { basename, join, dirname } from "node:path";
import { createHash } from "node:crypto";
import { diag } from "@opentelemetry/api";
import type { PersistentStorage } from "../../../types.js";
import { FileAccessControl } from "./fileAccessControl.js";
import { confirmDirExists, getShallowDirectorySize } from "./fileSystemHelpers.js";
import type { AzureMonitorExporterOptions } from "../../../config.js";
import { readdir, readFile, stat, unlink, writeFile } from "node:fs/promises";
import type { CustomerSDKStatsMetrics } from "../../../export/statsbeat/customerSDKStats.js";
import { DropCode, ExceptionType } from "../../../export/statsbeat/types.js";
import type { TelemetryItem as Envelope } from "../../../generated/index.js";

/**
 * File system persist class.
 * @internal
 */
export class FileSystemPersist implements PersistentStorage {
  static TEMPDIR_PREFIX = "opentelemetry-nodejs-";
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
    private _customerSDKStatsMetrics?: CustomerSDKStatsMetrics,
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
      this._tempDirectory = getStorageDirectory(
        this._instrumentationKey,
        this._options?.storageDirectory,
      );
      this._tempDirectory = getStorageDirectory(
        this._instrumentationKey,
        this._options?.storageDirectory,
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
      return this._storeToDisk(JSON.stringify(value), value as Envelope[]);
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
      const stats = await stat(this._tempDirectory);
      if (stats.isDirectory()) {
        const origFiles = await readdir(this._tempDirectory);
        const files = origFiles.filter((f) =>
          basename(f).includes(FileSystemPersist.FILENAME_SUFFIX),
        );
        if (files.length === 0) {
          return null;
        } else {
          const firstFile = files[0];
          const filePath = join(this._tempDirectory, firstFile);
          const payload = await readFile(filePath);
          // delete the file first to prevent double sending
          await unlink(filePath);
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

  /**
   * Stores telemetry data to disk.
   * @param payload - The telemetry data to store.
   * @param envelopeLength -The length of the telemetry envelope.
   * @returns A promise that resolves to true if the data was stored successfully, false otherwise.
   */
  private async _storeToDisk(payload: string, envelopes: Envelope[]): Promise<boolean> {
    try {
      await confirmDirExists(this._tempDirectory);
    } catch (error: any) {
      // Check if error is due to permission/readonly issues
      if (error?.code === "EACCES" || error?.code === "EPERM") {
        this._customerSDKStatsMetrics?.countDroppedItems(envelopes, DropCode.CLIENT_READONLY);
        diag.warn(
          `Permission denied while checking/creating directory: ${this._tempDirectory}`,
          error?.message,
        );
      } else {
        diag.warn(`Error while checking/creating directory: `, error && error.message);
      }
      return false;
    }

    try {
      const size = await getShallowDirectorySize(this._tempDirectory);
      if (size > this.maxBytesOnDisk) {
        // If the directory size exceeds the max limit, we send customer SDK Stats and warn the user
        this._customerSDKStatsMetrics?.countDroppedItems(
          envelopes,
          DropCode.CLIENT_PERSISTENCE_CAPACITY,
        );
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
    const fileFullPath = join(this._tempDirectory, fileName);

    // Mode 600 is w/r for creator and no read access for others
    diag.info(`saving data to disk at: ${fileFullPath}`);
    try {
      await writeFile(fileFullPath, payload, { mode: 0o600 });
    } catch (writeError: any) {
      // If the envelopes cannot be written to disk, we send customer SDK Stats and warn the user
      this._customerSDKStatsMetrics?.countDroppedItems(
        envelopes,
        DropCode.CLIENT_EXCEPTION,
        writeError?.message,
        ExceptionType.STORAGE_EXCEPTION,
      );
      diag.warn(`Error writing file to persistent file storage`, writeError);
      return false;
    }
    return true;
  }

  private async _fileCleanupTask(): Promise<boolean> {
    try {
      const stats = await stat(this._tempDirectory);
      if (stats.isDirectory()) {
        const origFiles = await readdir(this._tempDirectory);
        const files = origFiles.filter((f) =>
          basename(f).includes(FileSystemPersist.FILENAME_SUFFIX),
        );
        if (files.length === 0) {
          return false;
        } else {
          files.forEach(async (file) => {
            // Check expiration
            const fileCreationDate: Date = new Date(
              parseInt(file.split(FileSystemPersist.FILENAME_SUFFIX)[0]),
            );
            const expired = new Date(+new Date() - this.fileRetemptionPeriod) > fileCreationDate;
            if (expired) {
              const filePath = join(this._tempDirectory, file);
              await unlink(filePath);
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

/**
 * Return the deterministic local storage path for a given instrumentation key.
 *
 * On shared Linux hosts the first user to create `/tmp/Microsoft/AzureMonitor` can
 * block others because the directory inherits that user's `umask`. This is avoided by
 * inserting a hash of the instrumentation key, user name, process name, and
 * application directory, giving each user their own subdirectory, e.g.
 * `/tmp/Microsoft-AzureMonitor-1234...../opentelemetry-nodejs-<ikey>`.
 *
 * @param instrumentationKey - Application Insights instrumentation key.
 * @param storageDirectory - Optional custom storage directory path. If not provided, system temp directory is used.
 * @returns Absolute path to the storage directory.
 * @internal
 */
export function getStorageDirectory(
  instrumentationKey: string,
  storageDirectory: string | undefined,
): string {
  let userSegment: string;
  let processName: string;
  let applicationDirectory: string;
  try {
    const user = userInfo();
    userSegment = user.username;
  } catch (error) {
    // Fallback to a default value when userInfo() fails
    userSegment = "";
  }
  if (process.title.length > 0) {
    processName = process.title;
  } else {
    processName = "";
  }
  const applicationDir = dirname(process.cwd() || process.argv[1]);
  if (applicationDir) {
    applicationDirectory = applicationDir;
  } else {
    applicationDirectory = "";
  }
  const hash_input = `${instrumentationKey}|${userSegment}|${processName}|${applicationDirectory}`;

  let subDirectory: string;
  try {
    subDirectory = createHash("sha256").update(hash_input).digest("hex");
  } catch (e: any) {
      let hash = 5381;
      for (let i = 0; i < hash_input.length; i++) {
        const char = hash_input.charCodeAt(i);
        hash = ((hash << 5) + hash) + char;
        hash = hash & hash;
      }
      subDirectory = Math.abs(hash).toString(16);
  }
  
  let sharedRoot: string;
  if (storageDirectory) {
    sharedRoot = storageDirectory;
  } else {
    sharedRoot = tmpdir();
  }
  return join(
    sharedRoot,
    "Microsoft-AzureMonitor-" + subDirectory,
    FileSystemPersist.TEMPDIR_PREFIX + instrumentationKey,
  );
}
