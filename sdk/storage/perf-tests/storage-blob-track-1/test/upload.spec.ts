// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 as generateUuid } from "uuid";
import { Aborter, BlockBlobURL } from "@azure/storage-blob";
import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { StorageBlobTest } from "./storageTest.spec";
interface StorageBlobUploadTestOptions {
  size: number;
}

export class StorageBlobUploadTest extends StorageBlobTest<StorageBlobUploadTestOptions> {
  blobName: string;
  blockBlobClient: BlockBlobURL;
  buffer: Buffer;
  public options: PerfOptionDictionary<StorageBlobUploadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 10240
    }
  };

  constructor() {
    super();
    this.blobName = generateUuid();
    this.blockBlobClient = BlockBlobURL.fromContainerURL(this.containerClient, this.blobName);
    this.buffer = Buffer.alloc(this.parsedOptions.size.value!);
  }

  async run(): Promise<void> {
    await this.blockBlobClient.upload(Aborter.none, this.buffer, this.parsedOptions.size.value!);
  }
}
