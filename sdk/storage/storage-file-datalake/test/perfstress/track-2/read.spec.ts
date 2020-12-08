// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { streamToBuffer3, StorageDFSTest } from "./storageTest.spec";
import { DataLakeFileClient } from "../../../src";
interface StorageDFSReadTestOptions {
  size: number;
}

export class StorageDFSReadTest extends StorageDFSTest<
  StorageDFSReadTestOptions
> {
  public options: PerfStressOptionDictionary<StorageDFSReadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 1024
    }
  };
  static fileName = `newfile${new Date().getTime()}`;
  fileClient: DataLakeFileClient;

  constructor() {
    super();
    this.fileClient = this.directoryClient.getFileClient(StorageDFSReadTest.fileName);
  }

  public async globalSetup() {
    await super.globalSetup();
    // await this.fileClient.create();
    await this.fileClient.upload(Buffer.alloc(this.parsedOptions.size.value!));
  }

  async runAsync(): Promise<void> {
    const ReadResponse = await this.fileClient.read();
    await streamToBuffer3(ReadResponse.readableStreamBody!);
  }
}
