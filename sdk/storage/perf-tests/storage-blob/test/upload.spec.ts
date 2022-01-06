// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { generateUuid } from "@azure/core-http";
import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { StorageBlobTest } from "./storageTest.spec";

interface StorageBlobUploadTestOptions {
  size: number;
}

export class StorageBlobUploadTest extends StorageBlobTest<StorageBlobUploadTestOptions> {
  blobName: string;
  buffer: Buffer;
  public options: PerfOptionDictionary<StorageBlobUploadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 10240,
    },
  };

  constructor() {
    super();
    this.blobName = generateUuid();
    this.buffer = Buffer.alloc(this.parsedOptions.size.value!);
  }

  async run(): Promise<void> {
    await this.containerClient.uploadBlockBlob(
      this.blobName,
      this.buffer,
      this.parsedOptions.size.value!
    );
  }
}
