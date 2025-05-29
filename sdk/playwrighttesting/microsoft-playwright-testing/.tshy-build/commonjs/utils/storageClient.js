"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageClient = void 0;
const storage_blob_1 = require("@azure/storage-blob");
const logger_js_1 = require("../common/logger.js");
const constants_js_1 = require("../common/constants.js");
class StorageClient {
    async uploadFile(uri, filePath, fileRelativePath) {
        try {
            const cloudFilepath = this.getCloudFilepath(uri, fileRelativePath);
            const blobClient = new storage_blob_1.BlockBlobClient(cloudFilepath);
            await blobClient.uploadFile(filePath, { concurrency: 10 });
            logger_js_1.reporterLogger.info(`\nUploaded file ${filePath}.`);
        }
        catch (err) {
            logger_js_1.reporterLogger.error(`\nUnable to upload file ${filePath}, Name: ${err.name}, Message: ${err.message}, Stack: ${err.stack}`);
        }
    }
    async uploadBuffer(uri, buffer, fileRelativePath) {
        try {
            const cloudFilepath = this.getCloudFilepath(uri, fileRelativePath);
            const blobClient = new storage_blob_1.BlockBlobClient(cloudFilepath);
            await blobClient.upload(buffer, buffer.length);
            logger_js_1.reporterLogger.verbose(`\nUploaded buffer to ${fileRelativePath}.`);
        }
        catch (err) {
            logger_js_1.reporterLogger.error(`\nUnable to upload buffer ${fileRelativePath}, Name: ${err.name}, Message: ${err.message}, Stack: ${err.stack}`);
        }
    }
    getCloudFilepath(uri, fileRelativePath) {
        // Split the uri on "?" to get the container uri and sas token
        const parts = uri.split(constants_js_1.Constants.SAS_URI_SEPARATOR);
        const containerUri = parts[0];
        const sasToken = parts[1];
        return containerUri + "/" + fileRelativePath + "?" + sasToken;
    }
}
exports.StorageClient = StorageClient;
//# sourceMappingURL=storageClient.js.map