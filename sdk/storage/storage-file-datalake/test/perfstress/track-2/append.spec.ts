// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { StorageDFSTest } from "./storageTest.spec";
import { DataLakeFileClient } from "../../../src";
import { generateUuid } from "@azure/core-http";
interface StorageDFSAppendTestOptions {
  size: number;
}

export class StorageDFSAppendTest extends StorageDFSTest<StorageDFSAppendTestOptions> {
  buffer = Buffer.alloc(this.parsedOptions.size.value!);
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
  }

  public async setup() {
    await this.fileClient.upload(Buffer.alloc(0));
  }

  async runAsync(): Promise<void> {
    await this.fileClient.append(this.buffer, 0, this.parsedOptions.size.value!);
  }
}
