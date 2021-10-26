// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 as generateUuid } from "uuid";
import { Aborter, BlobURL, BlockBlobURL } from "@azure/storage-blob";
import { PerfOptionDictionary, drainStream } from "@azure/test-utils-perf";
import { StorageBlobTest } from "./storageTest.spec";

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
  blockBlobClient: BlockBlobURL;

  constructor() {
    super();
    this.blockBlobClient = BlockBlobURL.fromBlobURL(
      BlobURL.fromContainerURL(this.containerClient, StorageBlobDownloadTest.blobName)
    );
  }

  public async globalSetup() {
    await super.globalSetup();
    // Create a blob
    await this.blockBlobClient.upload(
      Aborter.none,
      Buffer.alloc(this.parsedOptions.size.value!),
      this.parsedOptions.size.value!
    );
  }

  async run(): Promise<void> {
    const downloadResponse = await this.blockBlobClient.download(Aborter.none, 0);
    await drainStream(downloadResponse.readableStreamBody!);
  }
}
