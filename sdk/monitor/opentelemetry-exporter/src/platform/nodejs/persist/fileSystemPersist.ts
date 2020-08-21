// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { Logger } from "@opentelemetry/api";
import { NoopLogger } from "@opentelemetry/core";
import { PersistentStorage } from "../../../types";
import { AzureExporterConfig, DEFAULT_EXPORTER_CONFIG } from "../../../config";
import { confirmDirExists, getShallowDirectorySize } from "./fileSystemHelpers";
import { promisify } from "util";

const statAsync = promisify(fs.stat);
const readdirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);
const writeFileAsync = promisify(fs.writeFile);

export class FileSystemPersist implements PersistentStorage {
  static TEMPDIR_PREFIX = "ot-azure-exporter-";

  static FILENAME_SUFFIX = ".ai.json";

  maxBytesOnDisk: number = 50_000_000; // ~50MB

  private readonly _options: AzureExporterConfig;

  private readonly _logger: Logger;

  constructor(options: Partial<AzureExporterConfig> = {}) {
    this._options = { ...DEFAULT_EXPORTER_CONFIG, ...options };
    this._logger = options.logger || new NoopLogger();
    if (!this._options.instrumentationKey) {
      this._logger.error(
        `No instrumentation key was provided to FileSystemPersister. Files may not be properly persisted`
      );
    }
  }

  async push(value: unknown[]): Promise<boolean> {
    this._logger.debug("Pushing value to persistent storage", value.toString());
    return this._storeToDisk(JSON.stringify(value));
  }

  async shift(): Promise<unknown> {
    this._logger.debug("Searching for filesystem persisted files");
    const buffer = await this._getFirstFileOnDisk();
    if (buffer) {
      return JSON.parse(buffer.toString("utf8"));
    }
    return null;
  }

  /**
   * Check for temp telemetry files
   * reads the first file if exist, deletes it and tries to send its load
   */
  private async _getFirstFileOnDisk(): Promise<Buffer | null> {
    const tempDir = path.join(
      os.tmpdir(),
      FileSystemPersist.TEMPDIR_PREFIX + this._options.instrumentationKey
    );

    try {
      const stats = await statAsync(tempDir);
      if (stats.isDirectory()) {
        const origFiles = await readdirAsync(tempDir);
        const files = origFiles.filter((f) =>
          path.basename(f).includes(FileSystemPersist.FILENAME_SUFFIX)
        );
        if (files.length === 0) {
          return null;
        } else {
          const firstFile = files[0];
          const filePath = path.join(tempDir, firstFile);
          const payload = await readFileAsync(filePath);
          // delete the file first to prevent double sending
          await unlinkAsync(filePath);
          return payload;
        }
      }
      return null;
    } catch (e) {
      if (e.code === "ENOENT") {
        // File does not exist -- return null instead of throwing
        return null;
      } else {
        throw e;
      }
    }
  }

  private async _storeToDisk(payload: string): Promise<boolean> {
    const directory = path.join(
      os.tmpdir(),
      FileSystemPersist.TEMPDIR_PREFIX + this._options.instrumentationKey
    );

    try {
      await confirmDirExists(directory);
    } catch (error) {
      this._logger.warn(`Error while checking/creating directory: `, error && error.message);
      return false;
    }

    try {
      const size = await getShallowDirectorySize(directory);
      if (size > this.maxBytesOnDisk) {
        this._logger.warn(
          `Not saving data due to max size limit being met. Directory size in bytes is: ${size}`
        );
        return false;
      }
    } catch (error) {
      this._logger.warn(
        `Error while checking size of persistence directory: `,
        error && error.message
      );
      return false;
    }

    // create file - file name for now is the timestamp, @todo: a better approach would be a UUID but that
    // would require an external dependency
    const fileName = `${new Date().getTime()}${FileSystemPersist.FILENAME_SUFFIX}`;
    const fileFullPath = path.join(directory, fileName);

    // Mode 600 is w/r for creator and no read access for others
    this._logger.info(`saving data to disk at: ${fileFullPath}`);
    try {
      await writeFileAsync(fileFullPath, payload, { mode: 0o600 });
    } catch (writeError) {
      this._logger.warn(`Error writing file to persistent file storage`, writeError);
      return false;
    }
    return true;
  }
}
