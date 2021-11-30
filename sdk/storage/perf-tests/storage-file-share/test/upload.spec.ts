// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 as generateUuid } from "uuid";
import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { ShareFileClient } from "@azure/storage-file-share";
import { StorageFileShareTest } from "./storageTest.spec";

interface StorageFileShareUploadTestOptions {
  size: number;
}

export class StorageFileShareUploadTest extends StorageFileShareTest<
  StorageFileShareUploadTestOptions
> {
  fileClient: ShareFileClient;
  buffer: Buffer;
  public options: PerfOptionDictionary<StorageFileShareUploadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 1024
    }
  };

  constructor() {
    super();
    const fileName = generateUuid();
    this.fileClient = this.directoryClient.getFileClient(fileName);
    this.buffer = Buffer.alloc(this.parsedOptions.size.value!);
  }

  async run(): Promise<void> {
    await this.fileClient.uploadData(this.buffer);
  }
}
