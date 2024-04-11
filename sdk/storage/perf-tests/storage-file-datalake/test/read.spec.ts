// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { drainStream, PerfOptionDictionary } from "@azure-tools/test-perf";
import { StorageDFSTest } from "./storageTest.spec";
import { DataLakeFileClient } from "@azure/storage-file-datalake";
import { randomUUID } from "@azure/core-util";

interface StorageDFSReadTestOptions {
  size: number;
}

export class StorageDFSReadTest extends StorageDFSTest<StorageDFSReadTestOptions> {
  public options: PerfOptionDictionary<StorageDFSReadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 1024,
    },
  };
  static fileName = randomUUID();
  fileClient: DataLakeFileClient;

  constructor() {
    super();
    this.fileClient = this.directoryClient.getFileClient(StorageDFSReadTest.fileName);
  }

  public async globalSetup() {
    await super.globalSetup();
    await this.fileClient.upload(Buffer.alloc(this.parsedOptions.size.value!));
  }

  async run(): Promise<void> {
    const ReadResponse = await this.fileClient.read();
    await drainStream(ReadResponse.readableStreamBody!);
  }
}
