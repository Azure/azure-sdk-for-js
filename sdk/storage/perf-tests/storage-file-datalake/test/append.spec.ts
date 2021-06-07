// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { StorageDFSTest } from "./storageTest.spec";
import { DataLakeFileClient } from "@azure/storage-file-datalake";
import { v4 as generateUuid } from "uuid";
interface StorageDFSAppendTestOptions {
  size: number;
}

export class StorageDFSAppendTest extends StorageDFSTest<StorageDFSAppendTestOptions> {
  buffer: Buffer;
  public options: PerfStressOptionDictionary<StorageDFSAppendTestOptions> = {
    size: {
      required: true,
      description: "Size to append in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 1024
    }
  };
  fileClient: DataLakeFileClient;

  constructor() {
    super();
    this.fileClient = this.directoryClient.getFileClient(generateUuid());
    this.buffer = Buffer.alloc(this.parsedOptions.size.value!);
  }

  public async setup() {
    await this.fileClient.create();
  }

  async runAsync(): Promise<void> {
    await this.fileClient.append(this.buffer, 0, this.parsedOptions.size.value!);
  }
}
