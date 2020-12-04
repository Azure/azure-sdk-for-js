// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { StorageBlobTest } from "./storageTest.spec";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
import { BlockBlobClient } from "../../../src";
dotenv.config();

interface StorageBlobDownloadTestOptions {
  size: number;
}

export class StorageBlobDownloadTest extends StorageBlobTest<StorageBlobDownloadTestOptions> {
  public options: PerfStressOptionDictionary<StorageBlobDownloadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 10
    }
  };

  static blobName = `newblob${new Date().getTime()}`;
  blockBlobClient: BlockBlobClient;
  
  constructor() {
    super();
    this.blockBlobClient = this.containerClient.getBlockBlobClient(
      StorageBlobDownloadTest.blobName
    );
  }

  public async globalSetup() {
    await super.globalSetup();

    // Create a blob
    const uploadBlobResponse = await this.blockBlobClient.upload(
      Buffer.alloc(this.parsedOptions.size.value!),
      this.parsedOptions.size.value!
    );
    console.log(
      `Uploaded block blob ${StorageBlobDownloadTest.blobName} successfully`,
      uploadBlobResponse.requestId
    );
  }

  async runAsync(): Promise<void> {
    await this.blockBlobClient.download();
  }
}
