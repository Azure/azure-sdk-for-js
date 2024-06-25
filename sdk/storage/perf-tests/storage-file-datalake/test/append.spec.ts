// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfOptionDictionary } from "@azure-tools/test-perf";
import { StorageDFSTest } from "./storageTest.spec";
import { DataLakeFileClient } from "@azure/storage-file-datalake";
import { randomUUID } from "@azure/core-util";

interface StorageDFSAppendTestOptions {
  size: number;
}

export class StorageDFSAppendTest extends StorageDFSTest<StorageDFSAppendTestOptions> {
  buffer: Buffer;
  public options: PerfOptionDictionary<StorageDFSAppendTestOptions> = {
    size: {
      required: true,
      description: "Size to append in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 1024,
    },
  };
  fileClient: DataLakeFileClient;

  constructor() {
    super();
    this.fileClient = this.directoryClient.getFileClient(randomUUID());
    this.buffer = Buffer.alloc(this.parsedOptions.size.value!);
  }

  public async setup() {
    await this.fileClient.create();
  }

  async run(): Promise<void> {
    await this.fileClient.append(this.buffer, 0, this.parsedOptions.size.value!);
  }
}
