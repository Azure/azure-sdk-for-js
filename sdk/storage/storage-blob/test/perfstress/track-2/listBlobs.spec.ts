// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, PerfStressOptionDictionary } from "@azure/test-utils-perfstress";

import { BlobServiceClient, StorageSharedKeyCredential } from "../../../src";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();

interface StorageBlobListTestOptions {
  count: number;
  size: number;
}

const account = process.env.ACCOUNT_NAME || "";
const accountKey = process.env.ACCOUNT_KEY || "";

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);
const containerName = `newcontainer${new Date().getTime()}`;
const blobName = `newblob${new Date().getTime()}`;
const containerClient = blobServiceClient.getContainerClient(containerName);
const blockBlobClient = blobServiceClient
  .getContainerClient(containerName)
  .getBlockBlobClient(blobName);

export class StorageBlobListTest extends PerfStressTest<StorageBlobListTestOptions> {
  public options: PerfStressOptionDictionary<StorageBlobListTestOptions> = {
    count: {
      required: true,
      description: "Number of blobs to be listed",
      longName: "count",
      defaultValue: 10
    },
    size: {
      required: true,
      description: "Size of each blob in bytes",
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

    for (let i = 0; i < this.options.count.value!; i++) {
      await blockBlobClient.upload(
        Buffer.alloc(this.options.size.value!),
        this.options.size.value!
      );
    }
  }

  public async globalCleanup() {
    const deleteContainerResponse = await containerClient.delete();
    console.log(
      `Deleted container ${containerName} successfully`,
      deleteContainerResponse.requestId
    );
  }

  async runAsync(): Promise<void> {
    for await (const _ of containerClient.listBlobsFlat()) {
    }
  }
}
