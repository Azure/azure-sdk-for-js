// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import {  StorageDFSTest } from "./storageTest.spec";

interface StorageFileShareUploadTestOptions {
  size: number;
}

export class StorageDFSUploadTest extends StorageDFSTest<
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
      .upload(Buffer.alloc(this.parsedOptions.size.value!));
  }
}
