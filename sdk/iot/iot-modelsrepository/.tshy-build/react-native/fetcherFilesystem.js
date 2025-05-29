// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import fs from "node:fs";
import * as path from "node:path";
import { RestError } from "@azure/core-rest-pipeline";
import { logger } from "./logger.js";
function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err !== undefined) {
                reject(err);
            }
            else {
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
export class FilesystemFetcher {
    constructor(baseFilePath) {
        this._baseFilePath = baseFilePath;
    }
    async fetch(filePath) {
        logger.info(`Fetching ${filePath} from local filesystem`);
        const absolutePath = path.join(this._baseFilePath, filePath);
        if (absolutePath.indexOf(this._baseFilePath) !== 0) {
            throw new Error("Attempted to escape base file path");
        }
        try {
            logger.info(`File open on ${absolutePath}`);
            const dtdlFile = await readFilePromise(absolutePath);
            const parsedDtdl = JSON.parse(dtdlFile);
            return parsedDtdl;
        }
        catch (e) {
            const options = {
                code: "ResourceNotFound",
                statusCode: e === null || e === void 0 ? void 0 : e.status,
            };
            throw new RestError("Failed to fetch from Filesystem", options);
        }
    }
}
//# sourceMappingURL=fetcherFilesystem.js.map