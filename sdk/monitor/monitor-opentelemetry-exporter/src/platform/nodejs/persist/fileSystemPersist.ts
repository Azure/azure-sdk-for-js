// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { tmpdir, userInfo } from "node:os";
import { basename, join, dirname } from "node:path";
import { createHash } from "node:crypto";
import { diag } from "@opentelemetry/api";
import { isObjectWithProperties } from "@azure/core-util";
import type { PersistentStorage, StoragePartition } from "../../../types.js";
import { FileAccessControl } from "./fileAccessControl.js";
import { confirmDirExists, getShallowDirectorySize } from "./fileSystemHelpers.js";
import type { AzureMonitorExporterOptions } from "../../../config.js";
import { constants as fsConstants } from "node:fs";
import { lstat, open, readdir, readFile, stat, unlink } from "node:fs/promises";
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
  private static readonly capacityOperations = new Map<string, Promise<void>>();
  private static readonly reservedCapacity = new Map<string, number>();
  private readonly replayReservations = new Map<unknown[], number>();

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
    private _customerSDKStatsMetricsProvider?: () =>
      Pick<CustomerSDKStatsMetrics, "countDroppedItems"> | undefined,
    private _isStorageActive: () => boolean = () => true,
    private readonly _storagePartition?: StoragePartition,
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

    if (!this._instrumentationKey && !this._storagePartition) {
      this._enabled = false;
      diag.error(
        `No instrumentation key was provided to FileSystemPersister. Files will not be persisted`,
      );
    }
    if (this._enabled) {
      this._tempDirectory = this._storagePartition
        ? join(this._storagePartition.root, this._storagePartition.name)
        : getStorageDirectory(this._instrumentationKey, this._options?.storageDirectory);

      // Starts file cleanup task
      if (!this._fileCleanupTimer && !this._storagePartition) {
        this._fileCleanupTimer = setTimeout(() => {
          this._fileCleanupTask();
        }, this.cleanupTimeOut);
        this._fileCleanupTimer.unref();
      }
    }
  }

  public get isEnabled(): boolean {
    return this._enabled;
  }

  push(value: unknown[]): Promise<boolean> {
    if (!this._isStorageActive() && !this._options?.disableOfflineStorage) {
      return Promise.resolve(this.storagePaused(value as Envelope[]));
    }
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

  public restore(value: unknown[], originalValue = value): Promise<boolean> {
    if (!this._enabled) {
      return Promise.resolve(false);
    }
    // This batch was already removed from disk. Preserve it without enabling new writes.
    return this._storeToDisk(JSON.stringify(value), value as Envelope[], true, originalValue);
  }

  public release(value: unknown[]): void {
    const root = this._storagePartition?.root;
    const reservation = this.replayReservations.get(value);
    if (!root || reservation === undefined) {
      return;
    }
    this.replayReservations.delete(value);
    const remaining = (FileSystemPersist.reservedCapacity.get(root) ?? 0) - reservation;
    if (remaining > 0) {
      FileSystemPersist.reservedCapacity.set(root, remaining);
    } else {
      FileSystemPersist.reservedCapacity.delete(root);
    }
  }

  public shutdown(): void {
    if (this._fileCleanupTimer) {
      clearTimeout(this._fileCleanupTimer);
      this._fileCleanupTimer = null;
    }
  }

  async shift(): Promise<unknown> {
    return this.withCapacityLock(() => this.shiftCore());
  }

  private async shiftCore(): Promise<unknown> {
    if (this._enabled && this._isStorageActive()) {
      diag.debug("Searching for filesystem persisted files");
      try {
        const buffer = await this._getFirstFileOnDisk();
        if (buffer) {
          const value: unknown = JSON.parse(buffer.toString("utf8"));
          if (Array.isArray(value)) {
            const envelopes: unknown[] = value;
            for (const envelope of envelopes) {
              // Custom properties named "time" must remain strings.
              if (isObjectWithProperties(envelope, ["time"]) && typeof envelope.time === "string") {
                envelope.time = new Date(envelope.time);
              }
            }
            const root = this._storagePartition?.root;
            if (root) {
              // Keep the dequeued bytes charged to the shared quota until replay completes.
              this.replayReservations.set(envelopes, buffer.byteLength);
              FileSystemPersist.reservedCapacity.set(
                root,
                (FileSystemPersist.reservedCapacity.get(root) ?? 0) + buffer.byteLength,
              );
            }
          }
          return value;
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
        const files = origFiles
          .filter((f) => basename(f).includes(FileSystemPersist.FILENAME_SUFFIX))
          .sort();
        if (files.length === 0) {
          return null;
        } else {
          const firstFile = files[0];
          const filePath = join(this._tempDirectory, firstFile);
          const payload = await readFile(filePath);
          if (!this._isStorageActive()) {
            return null;
          }
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
  private async _storeToDisk(
    payload: string,
    envelopes: Envelope[],
    restoring = false,
    originalValue?: unknown[],
  ): Promise<boolean> {
    return this.withCapacityLock(() =>
      this._storeToDiskCore(payload, envelopes, restoring, originalValue),
    );
  }

  private async withCapacityLock<T>(action: () => Promise<T>): Promise<T> {
    const root = this._storagePartition?.root;
    if (!root) {
      return action();
    }
    // Reserve dequeued bytes under the same lock used for capacity checks and writes.
    const previous = FileSystemPersist.capacityOperations.get(root) ?? Promise.resolve();
    const operation = previous.then(action);
    const completion = operation.then(
      () => undefined,
      () => undefined,
    );
    FileSystemPersist.capacityOperations.set(root, completion);
    try {
      return await operation;
    } finally {
      if (FileSystemPersist.capacityOperations.get(root) === completion) {
        FileSystemPersist.capacityOperations.delete(root);
      }
    }
  }

  private async _storeToDiskCore(
    payload: string,
    envelopes: Envelope[],
    restoring = false,
    originalValue?: unknown[],
  ): Promise<boolean> {
    try {
      if (this._storagePartition) {
        await confirmDirExists(this._storagePartition.root);
      }
      await confirmDirExists(this._tempDirectory);
    } catch (error: any) {
      // Check if error is due to permission/readonly issues
      if (error?.code === "EACCES" || error?.code === "EPERM") {
        this._customerSDKStatsMetricsProvider?.()?.countDroppedItems(
          envelopes,
          DropCode.CLIENT_READONLY,
        );
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
      const root = this._storagePartition?.root;
      const size = root
        ? await this.getRoutingStorageSize(root)
        : await getShallowDirectorySize(this._tempDirectory);
      const reserved = root ? (FileSystemPersist.reservedCapacity.get(root) ?? 0) : 0;
      const restoringCapacity = originalValue
        ? (this.replayReservations.get(originalValue) ?? 0)
        : 0;
      if (
        size + reserved - restoringCapacity + (root ? Buffer.byteLength(payload) : 0) >
        this.maxBytesOnDisk
      ) {
        // If the directory size exceeds the max limit, we send customer SDK Stats and warn the user
        this._customerSDKStatsMetricsProvider?.()?.countDroppedItems(
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

    if (!restoring && !this._isStorageActive()) {
      return this.storagePaused(envelopes);
    }
    const fileName = `${new Date().getTime()}-${process.hrtime.bigint()}${FileSystemPersist.FILENAME_SUFFIX}`;
    const fileFullPath = join(this._tempDirectory, fileName);

    // Mode 600 is w/r for creator and no read access for others
    diag.info(`saving data to disk at: ${fileFullPath}`);
    try {
      const handle = await open(
        fileFullPath,
        fsConstants.O_CREAT | fsConstants.O_EXCL | fsConstants.O_WRONLY,
        0o600,
      );
      try {
        await handle.writeFile(payload);
      } finally {
        await handle.close();
      }
    } catch (writeError: any) {
      // If the envelopes cannot be written to disk, we send customer SDK Stats and warn the user
      this._customerSDKStatsMetricsProvider?.()?.countDroppedItems(
        envelopes,
        DropCode.CLIENT_EXCEPTION,
        writeError?.message,
        ExceptionType.STORAGE_EXCEPTION,
      );
      diag.warn(`Error writing file to persistent file storage`, writeError);
      return false;
    }
    if (originalValue) {
      this.release(originalValue);
    }
    return true;
  }

  private async getRoutingStorageSize(root: string): Promise<number> {
    let size = 0;
    const directories = await readdir(root, { withFileTypes: true });
    for (const directory of directories) {
      if (!directory.isDirectory() || !/^[a-f0-9]{64}$/.test(directory.name)) {
        continue;
      }
      const path = join(root, directory.name);
      const files = await readdir(path, { withFileTypes: true });
      for (const file of files) {
        if (!file.isFile()) {
          continue;
        }
        const filePath = join(path, file.name);
        try {
          const fileStats = await lstat(filePath);
          if (!fileStats.isFile()) {
            continue;
          }
          const timestamp = Number.parseInt(file.name, 10);
          if (
            file.name.endsWith(FileSystemPersist.FILENAME_SUFFIX) &&
            timestamp < Date.now() - this.fileRetemptionPeriod
          ) {
            await unlink(filePath);
          } else {
            size += fileStats.size;
          }
        } catch (error) {
          if (!(error && typeof error === "object" && "code" in error && error.code === "ENOENT")) {
            throw error;
          }
        }
      }
    }
    return size;
  }

  private storagePaused(envelopes: Envelope[]): false {
    this._customerSDKStatsMetricsProvider?.()?.countDroppedItems(
      envelopes,
      DropCode.CLIENT_STORAGE_DISABLED,
    );
    return false;
  }

  async cleanExpiredFiles(): Promise<void> {
    if (this._enabled) {
      await this._fileCleanupTask();
    }
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
          for (const file of files) {
            // Check expiration
            const fileCreationDate: Date = new Date(
              parseInt(file.split(FileSystemPersist.FILENAME_SUFFIX)[0]),
            );
            const expired = new Date(+new Date() - this.fileRetemptionPeriod) > fileCreationDate;
            if (expired) {
              const filePath = join(this._tempDirectory, file);
              await unlink(filePath);
            }
          }
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
  } catch (error) {
    let hash = 5381;
    for (let i = 0; i < hash_input.length; i++) {
      const char = hash_input.charCodeAt(i);
      hash = (hash << 5) + hash + char;
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
