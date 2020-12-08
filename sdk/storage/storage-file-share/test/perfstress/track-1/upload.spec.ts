// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { Aborter, FileURL } from "@azure/storage-file";
import { StorageFileShareTest } from "./storageTest";

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
    const fileClient = FileURL.fromDirectoryURL(
      this.directoryClient,
      `newfile${new Date().getTime()}`
    );
    await fileClient.create(Aborter.none, this.parsedOptions.size.value!);
    await fileClient.uploadRange(
      Aborter.none,
      Buffer.alloc(this.parsedOptions.size.value!),
      0,
      this.parsedOptions.size.value!
    );
  }
}
