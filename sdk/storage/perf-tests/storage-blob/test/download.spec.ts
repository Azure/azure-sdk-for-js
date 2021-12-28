// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { drainStream, PerfOptionDictionary } from "@azure/test-utils-perf";
import { StorageBlobTest } from "./storageTest.spec";
import { BlockBlobClient } from "@azure/storage-blob";
import { generateUuid } from "@azure/core-http";

interface StorageBlobDownloadTestOptions {
  size: number;
}

export class StorageBlobDownloadTest extends StorageBlobTest<StorageBlobDownloadTestOptions> {
  public options: PerfOptionDictionary<StorageBlobDownloadTestOptions> = {
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
      Buffer.alloc(this.parsedOptions.size.value),
      this.parsedOptions.size.value
    );
  }

  async run(): Promise<void> {
    const downloadResponse = await this.blockBlobClient.download();
    await drainStream(downloadResponse.readableStreamBody!);
  }
}
