// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { randomUUID } from "@azure/core-util";
import { PerfOptionDictionary } from "@azure-tools/test-perf";
import { DataLakeFileClient } from "@azure/storage-file-datalake";
import { StorageDFSTest } from "./storageTest.spec";

interface StorageFileShareUploadTestOptions {
  size: number;
}

export class StorageDFSUploadTest extends StorageDFSTest<StorageFileShareUploadTestOptions> {
  buffer: Buffer;
  fileClient: DataLakeFileClient;
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
    await this.fileClient.upload(this.buffer);
  }
}
