// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { drainStream, PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { StorageBlobTest } from "./storageTest.spec";
import { BlockBlobClient } from "../../../src";
import { generateUuid } from "@azure/core-http";

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
      defaultValue: 10240
    }
  };

  static blobName = generateUuid();
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
    await this.blockBlobClient.upload(
      Buffer.alloc(this.parsedOptions.size.value!),
      this.parsedOptions.size.value!
    );
  }

  async runAsync(): Promise<void> {
    const downloadResponse = await this.blockBlobClient.download();
    await drainStream(downloadResponse.readableStreamBody!);
  }
}
