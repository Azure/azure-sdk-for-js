// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { BlockBlobClient } from "@azure/storage-blob";
import { reporterLogger } from "../common/logger.js";
import { Constants } from "../common/constants.js";
export class StorageClient {
    async uploadFile(uri, filePath, fileRelativePath) {
        try {
            const cloudFilepath = this.getCloudFilepath(uri, fileRelativePath);
            const blobClient = new BlockBlobClient(cloudFilepath);
            await blobClient.uploadFile(filePath, { concurrency: 10 });
            reporterLogger.info(`\nUploaded file ${filePath}.`);
        }
        catch (err) {
            reporterLogger.error(`\nUnable to upload file ${filePath}, Name: ${err.name}, Message: ${err.message}, Stack: ${err.stack}`);
        }
    }
    async uploadBuffer(uri, buffer, fileRelativePath) {
        try {
            const cloudFilepath = this.getCloudFilepath(uri, fileRelativePath);
            const blobClient = new BlockBlobClient(cloudFilepath);
            await blobClient.upload(buffer, buffer.length);
            reporterLogger.verbose(`\nUploaded buffer to ${fileRelativePath}.`);
        }
        catch (err) {
            reporterLogger.error(`\nUnable to upload buffer ${fileRelativePath}, Name: ${err.name}, Message: ${err.message}, Stack: ${err.stack}`);
        }
    }
    getCloudFilepath(uri, fileRelativePath) {
        // Split the uri on "?" to get the container uri and sas token
        const parts = uri.split(Constants.SAS_URI_SEPARATOR);
        const containerUri = parts[0];
        const sasToken = parts[1];
        return containerUri + "/" + fileRelativePath + "?" + sasToken;
    }
}
//# sourceMappingURL=storageClient.js.map