// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
import { StorageBlobTest } from "./storageTest.spec";
dotenv.config();

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
    let createdCount = 0;
    let toBeCreatedCount = this.parsedOptions.count.value!;
    while (createdCount < this.parsedOptions.count.value!) {
      const tasks = []; // Number of blobs to created in this round // Limiting 5000 per round so that the service doesn't fail
      let roundTotal = Math.min(1000, toBeCreatedCount);
      for (let i = 0; i < roundTotal; i++) {
        tasks.push(
          this.containerClient.uploadBlockBlob(`blob-${createdCount}-${i}`, Buffer.alloc(0), 0)
        );
      }
      await Promise.all(tasks);
      await delay(1000);
      createdCount = createdCount + tasks.length;
      toBeCreatedCount = toBeCreatedCount - tasks.length;
      console.log(`created so far - ${createdCount}`);
    }
  }

  async runAsync(): Promise<void> {
    for await (const segmentResponse of this.containerClient.listBlobsFlat().byPage()) {
      for (const _ of segmentResponse.segment.blobItems) {
      }
    }
  }
}
