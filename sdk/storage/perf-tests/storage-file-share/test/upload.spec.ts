// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { randomUUID } from "@azure/core-util";
import { PerfOptionDictionary } from "@azure-tools/test-perf";
import { ShareFileClient } from "@azure/storage-file-share";
import { StorageFileShareTest } from "./storageTest.spec";

interface StorageFileShareUploadTestOptions {
  size: number;
}

export class StorageFileShareUploadTest extends StorageFileShareTest<StorageFileShareUploadTestOptions> {
  fileClient: ShareFileClient;
  buffer: Buffer;
  public options: PerfOptionDictionary<StorageFileShareUploadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 1024,
    },
  };

  constructor() {
    super();
    const fileName = randomUUID();
    this.fileClient = this.directoryClient.getFileClient(fileName);
    this.buffer = Buffer.alloc(this.parsedOptions.size.value!);
  }

  async run(): Promise<void> {
    await this.fileClient.uploadData(this.buffer);
  }
}
