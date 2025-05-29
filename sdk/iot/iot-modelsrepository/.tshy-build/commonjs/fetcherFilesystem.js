"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesystemFetcher = void 0;
const tslib_1 = require("tslib");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const path = tslib_1.__importStar(require("node:path"));
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const logger_js_1 = require("./logger.js");
function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        node_fs_1.default.readFile(filePath, "utf8", (err, data) => {
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
class FilesystemFetcher {
    constructor(baseFilePath) {
        this._baseFilePath = baseFilePath;
    }
    async fetch(filePath) {
        logger_js_1.logger.info(`Fetching ${filePath} from local filesystem`);
        const absolutePath = path.join(this._baseFilePath, filePath);
        if (absolutePath.indexOf(this._baseFilePath) !== 0) {
            throw new Error("Attempted to escape base file path");
        }
        try {
            logger_js_1.logger.info(`File open on ${absolutePath}`);
            const dtdlFile = await readFilePromise(absolutePath);
            const parsedDtdl = JSON.parse(dtdlFile);
            return parsedDtdl;
        }
        catch (e) {
            const options = {
                code: "ResourceNotFound",
                statusCode: e === null || e === void 0 ? void 0 : e.status,
            };
            throw new core_rest_pipeline_1.RestError("Failed to fetch from Filesystem", options);
        }
    }
}
exports.FilesystemFetcher = FilesystemFetcher;
//# sourceMappingURL=fetcherFilesystem.js.map