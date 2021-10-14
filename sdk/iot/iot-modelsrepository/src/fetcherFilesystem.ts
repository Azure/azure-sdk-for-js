// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs";
import * as path from "path";
import { RestError, RestErrorOptions } from "@azure/core-rest-pipeline";
import { Fetcher } from "./fetcherAbstract";
import { logger } from "./logger";

function readFilePromise(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
      return 0;
    });
  });
}

/**
 * The Filesystem Fetcher implements the generic Fetcher interface
 * so that data is fetched from a filesystem endpoint.
 *
 * @internal
 */
export class FilesystemFetcher implements Fetcher {
  private _baseFilePath: string;

  constructor(baseFilePath: string) {
    this._baseFilePath = baseFilePath;
  }

  async fetch<T>(filePath: string): Promise<T> {
    logger.info(`Fetching ${filePath} from local filesystem`);
    const absolutePath = path.join(this._baseFilePath, filePath);
    if (absolutePath.indexOf(this._baseFilePath) !== 0) {
      throw new Error("Attempted to escape base file path");
    }

    try {
      logger.info(`File open on ${absolutePath}`);
      const body = await readFilePromise(absolutePath);
      const parsed: T = JSON.parse(body);
      return parsed;
    } catch (e) {
      const options: RestErrorOptions = {
        code: "ResourceNotFound",
        statusCode: e?.status
      };
      throw new RestError("Failed to fetch from Filesystem", options);
    }
  }
}
