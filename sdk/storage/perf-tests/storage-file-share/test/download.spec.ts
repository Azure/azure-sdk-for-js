// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 as generateUuid } from "uuid";
import { PerfStressOptionDictionary, drainStream } from "@azure/test-utils-perfstress";
import { ShareFileClient } from "@azure/storage-file-share";

import { StorageFileShareTest } from "./storageTest.spec";
interface StorageFileShareDownloadTestOptions {
  size: number;
}

export class StorageFileShareDownloadTest extends StorageFileShareTest<
  StorageFileShareDownloadTestOptions
> {
  public options: PerfStressOptionDictionary<StorageFileShareDownloadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 1024
    }
  };
  static fileName = generateUuid();
  fileClient: ShareFileClient;

  constructor() {
    super();
    this.fileClient = this.directoryClient.getFileClient(StorageFileShareDownloadTest.fileName);
  }

  public async globalSetup() {
    await super.globalSetup();
    await this.fileClient.uploadData(Buffer.alloc(this.parsedOptions.size.value!));
  }

  async runAsync(): Promise<void> {
    const downloadResponse = await this.fileClient.download();
    await drainStream(downloadResponse.readableStreamBody!);
  }
}
