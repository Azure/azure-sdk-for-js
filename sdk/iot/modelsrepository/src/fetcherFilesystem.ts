// Copyright (c) Microsoft.
// Licensed under the MIT license.

import fs from "fs";
import * as path from "path";
import { RestError, RestErrorOptions } from "@azure/core-rest-pipeline";
import { Fetcher } from "./fetcherAbstract";
import { logger } from "./logger";
import { DTDL } from "./dtdl";

function readFilePromise(path: string): Promise<string> {
  return new Promise((res, rej) => {
    fs.readFile(path, "utf8", (err, data) => {
      err ? rej(err) : res(data);
      return 0;
    });
  });
}

/**
 * @internal
 */
export class FilesystemFetcher implements Fetcher {
  private _baseFilePath: string;

  constructor(baseFilePath: string) {
    this._baseFilePath = baseFilePath;
  }

  async fetch(filePath: string) {
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
      // TODO: Is there a ResourceNotFound Error for Filesystem + Http (Generic API for errors)
      const options: RestErrorOptions = {
        code: "ResourceNotFound",
        statusCode: e?.status
      };
      throw new RestError("Failed to fetch from Filesystem", options);
    }
  }
}
