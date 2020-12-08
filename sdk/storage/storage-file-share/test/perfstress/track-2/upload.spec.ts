// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { StorageFileShareTest } from "./storageTest.spec";

interface StorageFileShareUploadTestOptions {
  size: number;
}

export class StorageFileShareUploadTest extends StorageFileShareTest<
  StorageFileShareUploadTestOptions
> {
  public options: PerfStressOptionDictionary<StorageFileShareUploadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 1024
    }
  };

  async runAsync(): Promise<void> {
    await this.directoryClient
      .getFileClient(`newfile${new Date().getTime()}`)
      .uploadData(Buffer.alloc(this.parsedOptions.size.value!));
  }
}
