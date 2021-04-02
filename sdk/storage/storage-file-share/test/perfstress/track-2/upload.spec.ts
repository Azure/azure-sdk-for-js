// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { generateUuid } from "@azure/core-http";
import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { ShareFileClient } from "../../../src";
import { StorageFileShareTest } from "./storageTest.spec";

interface StorageFileShareUploadTestOptions {
  size: number;
}

export class StorageFileShareUploadTest extends StorageFileShareTest<
  StorageFileShareUploadTestOptions
> {
  fileClient: ShareFileClient;
  buffer = Buffer.alloc(this.parsedOptions.size.value!);
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
  }

  async runAsync(): Promise<void> {
    await this.fileClient.uploadData(this.buffer);
  }
}
