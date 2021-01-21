// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { Aborter, FileURL } from "@azure/storage-file";
import { StorageFileShareTest } from "./storageTest";
import { generateUuid } from "@azure/core-http";

interface StorageFileShareUploadTestOptions {
  size: number;
}
export class StorageFileShareUploadTest extends StorageFileShareTest<
  StorageFileShareUploadTestOptions
> {
  buffer = Buffer.alloc(this.parsedOptions.size.value!);
  fileClient: FileURL;
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
    this.fileClient = FileURL.fromDirectoryURL(this.directoryClient, fileName);
  }

  async setup() {
    await this.fileClient.create(Aborter.none, this.parsedOptions.size.value!);
  }

  async runAsync(): Promise<void> {
    await this.fileClient.uploadRange(Aborter.none, this.buffer, 0, this.parsedOptions.size.value!);
  }
}
