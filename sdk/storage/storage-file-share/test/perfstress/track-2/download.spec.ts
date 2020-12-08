// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { ShareFileClient } from "../../../src";

import { StorageFileShareTest, streamToBuffer3 } from "./storageTest.spec";
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
  static fileName = `newfile${new Date().getTime()}`;
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
    await streamToBuffer3(downloadResponse.readableStreamBody!);
  }
}
