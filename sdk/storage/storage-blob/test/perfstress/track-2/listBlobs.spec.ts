// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 as uuidv4 } from "uuid";
import { PerfStressOptionDictionary, executeParallel } from "@azure/test-utils-perfstress";
import { StorageBlobTest } from "./storageTest.spec";
interface StorageBlobListTestOptions {
  count: number;
}

export class StorageBlobListTest extends StorageBlobTest<StorageBlobListTestOptions> {
  public options: PerfStressOptionDictionary<StorageBlobListTestOptions> = {
    count: {
      required: true,
      description: "Number of blobs to be listed",
      longName: "count",
      defaultValue: 10
    }
  };

  public async globalSetup() {
    await super.globalSetup();
    await executeParallel(
      async (count: number, parallelIndex: number) => {
        await this.containerClient.uploadBlockBlob(uuidv4(), Buffer.alloc(0), 0);
        console.log(`[` + parallelIndex + `] ` + count);
      },
      this.parsedOptions.count.value!,
      32
    );
  }

  async runAsync(): Promise<void> {
    for await (const segmentResponse of this.containerClient.listBlobsFlat().byPage()) {
      for (const _ of segmentResponse.segment.blobItems) {
      }
    }
  }
}
