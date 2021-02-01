// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { generateUuid } from "@azure/core-http";
import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { DataLakeFileClient } from "../../../src";
import { StorageDFSTest } from "./storageTest.spec";

interface StorageFileShareUploadTestOptions {
  size: number;
}

export class StorageDFSUploadTest extends StorageDFSTest<StorageFileShareUploadTestOptions> {
  buffer: Buffer;
  fileClient: DataLakeFileClient;
  public options: PerfStressOptionDictionary<StorageFileShareUploadTestOptions> = {
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

  async runAsync(): Promise<void> {
    await this.fileClient.upload(this.buffer);
  }
}
