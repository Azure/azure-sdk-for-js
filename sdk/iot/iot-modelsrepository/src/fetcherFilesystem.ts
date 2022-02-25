// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs";
import * as path from "path";
import { RestError, RestErrorOptions } from "@azure/core-rest-pipeline";
import { Fetcher } from "./fetcherAbstract";
import { logger } from "./logger";
import { DTDL } from "./psuedoDtdl";

function readFilePromise(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err !== undefined) {
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
 * so that models are fetched from a filesystem endpoint.
 *
 * @internal
 */
export class FilesystemFetcher implements Fetcher {
  private _baseFilePath: string;

  constructor(baseFilePath: string) {
    this._baseFilePath = baseFilePath;
  }

  async fetch(filePath: string): Promise<DTDL | DTDL[]> {
    logger.info(`Fetching ${filePath} from local filesystem`);
    const absolutePath = path.join(this._baseFilePath, filePath);
    if (absolutePath.indexOf(this._baseFilePath) !== 0) {
      throw new Error("Attempted to escape base file path");
    }

    try {
      logger.info(`File open on ${absolutePath}`);
      const dtdlFile = await readFilePromise(absolutePath);
      const parsedDtdl: DTDL | DTDL[] = JSON.parse(dtdlFile);
      return parsedDtdl;
    } catch (e) {
      const options: RestErrorOptions = {
        code: "ResourceNotFound",
        statusCode: e?.status,
      };
      throw new RestError("Failed to fetch from Filesystem", options);
    }
  }
}
