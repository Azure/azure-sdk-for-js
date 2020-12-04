// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
import { StorageBlobTest } from "./storageTest.spec";
dotenv.config();

interface StorageBlobListTestOptions {
  count: number;
  size: number;
}

export class StorageBlobListTest extends StorageBlobTest<StorageBlobListTestOptions> {
  public options: PerfStressOptionDictionary<StorageBlobListTestOptions> = {
    count: {
      required: true,
      description: "Number of blobs to be listed",
      longName: "count",
      defaultValue: 10
    },
    size: {
      required: true,
      description: "Size of each blob in bytes",
      longName: "size",
      defaultValue: 10
    }
  };

  public async globalSetup() {
    await super.globalSetup();
    for (let i = 0; i < this.parsedOptions.count.value!; i++) {
      const blockBlobClient = this.containerClient.getBlockBlobClient(`blob-${i}`);
      await blockBlobClient.upload(
        Buffer.alloc(this.parsedOptions.size.value!),
        this.parsedOptions.size.value!
      );
    }
  }

  async runAsync(): Promise<void> {
    for await (const _ of this.containerClient.listBlobsFlat()) {
    }
  }
}
