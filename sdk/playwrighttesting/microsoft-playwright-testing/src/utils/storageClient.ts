// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BlockBlobClient } from "@azure/storage-blob";
import { reporterLogger } from "../common/logger";
import { Constants } from "../common/constants";

export class StorageClient {
  public async uploadFile(uri: string, filePath: string, fileRelativePath: string): Promise<void> {
    const cloudFilepath = this.getCloudFilepath(uri, fileRelativePath);
    const blobClient = new BlockBlobClient(cloudFilepath);
    await blobClient.uploadFile(filePath, { concurrency: 10 });
    reporterLogger.info(`\nUploaded file ${filePath}.`);
  }

  public async uploadBuffer(uri: string, buffer: string, fileRelativePath: string): Promise<void> {
    const cloudFilepath = this.getCloudFilepath(uri, fileRelativePath);
    const blobClient = new BlockBlobClient(cloudFilepath);
    await blobClient.upload(buffer, buffer.length);
    reporterLogger.verbose(`\nUploaded buffer to ${fileRelativePath}.`);
  }

  private getCloudFilepath(uri: string, fileRelativePath: string): string {
    // Split the uri on "?" to get the container uri and sas token
    const parts = uri.split(Constants.SAS_URI_SEPARATOR);
    const containerUri = parts[0];
    const sasToken = parts[1];
    return containerUri + "/" + fileRelativePath + "?" + sasToken;
  }
}
