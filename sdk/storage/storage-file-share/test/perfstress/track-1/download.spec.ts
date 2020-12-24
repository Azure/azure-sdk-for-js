// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressOptionDictionary, drainStream } from "@azure/test-utils-perfstress";
import { Aborter, FileURL } from "@azure/storage-file";
import { StorageFileShareTest } from "./storageTest";
import { generateUuid } from "@azure/core-http";

interface StorageFileShareDownloadTestOptions {
  size: number;
}

export class StorageFileShareDownloadTest extends StorageFileShareTest<
  StorageFileShareDownloadTestOptions
> {
  buffer = Buffer.alloc(this.parsedOptions.size.value!);
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
  fileClient: FileURL;

  constructor() {
    super();
    this.fileClient = FileURL.fromDirectoryURL(
      this.directoryClient,
      StorageFileShareDownloadTest.fileName
    );
  }

  public async globalSetup() {
    await super.globalSetup();
    await this.fileClient.create(Aborter.none, this.parsedOptions.size.value!);
    await this.fileClient.uploadRange(Aborter.none, this.buffer, 0, this.parsedOptions.size.value!);
  }

  async runAsync(): Promise<void> {
    const downloadResponse = await this.fileClient.download(Aborter.none, 0);
    await drainStream(downloadResponse.readableStreamBody!);
  }
}
