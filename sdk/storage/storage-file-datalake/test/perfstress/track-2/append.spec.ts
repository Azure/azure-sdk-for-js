// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { StorageDFSTest } from "./storageTest.spec";
import { DataLakeFileClient } from "../../../src";
interface StorageDFSAppendTestOptions {
  size: number;
}

export class StorageDFSAppendTest extends StorageDFSTest<StorageDFSAppendTestOptions> {
  public options: PerfStressOptionDictionary<StorageDFSAppendTestOptions> = {
    size: {
      required: true,
      description: "Size to append in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 1024
    }
  };
  static fileName = `newfile${new Date().getTime()}`;
  fileClient: DataLakeFileClient;

  constructor() {
    super();
    this.fileClient = this.directoryClient.getFileClient(StorageDFSAppendTest.fileName);
  }

  public async globalSetup() {
    await super.globalSetup();
    await this.fileClient.upload(Buffer.alloc(0));
  }

  async runAsync(): Promise<void> {
    await this.fileClient.append(
      Buffer.alloc(this.parsedOptions.size.value!),
      0,
      this.parsedOptions.size.value!
    );
  }
}
