// Copyright (c) Microsoft.
// Licensed under the MIT license.

import fs from "fs";
import * as path from "path";
import { Fetcher, DTDL, logger } from "./internal";
import {RestError, RestErrorOptions} from '@azure/core-rest-pipeline';

export class FilesystemFetcher extends Fetcher {
  private _baseFilePath: string;

  constructor(baseFilePath: string) {
    super();
    this._baseFilePath = baseFilePath;
  }

  fetch(filePath: string) {
    logger.info(`Fetching ${filePath} from local filesystem`);
    const absolutePath = path.join(this._baseFilePath, filePath);

    try {
      logger.info(`File open on ${absolutePath}`);
      const dtdlFile = fs.readFileSync(absolutePath, "utf8");
      const parsedDtdl: DTDL | DTDL[] = JSON.parse(dtdlFile);
      return parsedDtdl;
    } catch (e) {
      // TODO: Is there a ResourceNotFound Error for Filesystem + Http (Generic API for errors)
      const options : RestErrorOptions = {
        statusCode: e?.status
      }
      throw new RestError("Failed to fetch from Filesystem", options);
    }
  }
}
