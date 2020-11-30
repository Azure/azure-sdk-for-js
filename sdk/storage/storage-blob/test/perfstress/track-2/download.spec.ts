// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PerfStressTest,
  PerfStressOptionDictionary,
  DefaultPerfStressOptions
} from "@azure/test-utils-perfstress";

import { BlobServiceClient, StorageSharedKeyCredential } from "../../../src";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();

interface StorageBlobDownloadTestOptions extends DefaultPerfStressOptions {
  size: number;
}

const account = process.env.ACCOUNT_NAME || "";
const accountKey = process.env.ACCOUNT_KEY || "";

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

const blobServiceClient = new BlobServiceClient(
  // When using AnonymousCredential, following url should include a valid SAS or support public access
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);
const containerName = `newcontainer${new Date().getTime()}`;
const blobName = `newblob${new Date().getTime()}`;
const containerClient = blobServiceClient.getContainerClient(containerName);
const blockBlobClient = blobServiceClient
  .getContainerClient(containerName)
  .getBlockBlobClient(blobName);

export class StorageBlobDownloadTest extends PerfStressTest<StorageBlobDownloadTestOptions> {
  public options: PerfStressOptionDictionary<StorageBlobDownloadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 10
    }
  };

  public async globalSetup() {
    const createContainerResponse = await containerClient.create();
    console.log(
      `Create container ${containerName} successfully`,
      createContainerResponse.requestId
    );

    // Create a blob
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(
      Buffer.alloc(this.options.size.value!),
      this.options.size.value as number
    );
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
  }

  public async globalCleanup() {
    const deleteContainerResponse = await containerClient.delete();
    console.log(
      `Deleted container ${containerName} successfully`,
      deleteContainerResponse.requestId
    );
  }

  async runAsync(): Promise<void> {
    await blockBlobClient.download(0);
  }
}
