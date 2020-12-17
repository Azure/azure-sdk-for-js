// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Aborter, BlockBlobURL } from "@azure/storage-blob";
import { executeParallel, PerfStressOptionDictionary } from "@azure/test-utils-perfstress";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
import { StorageBlobTest } from "./storageTest.spec";
dotenv.config({ path: "../../../.env" });

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
        const blockBlobClient = BlockBlobURL.fromContainerURL(
          this.containerClient,
          `blob-${count}`
        );
        blockBlobClient.upload(Aborter.none, Buffer.alloc(0), 0);
        console.log(`[` + parallelIndex + `] ` + count);
      },
      this.parsedOptions.count.value!,
      1000
    );
  }

  async runAsync(): Promise<void> {
    // List blobs
    let marker = undefined;
    do {
      marker = (await this.containerClient.listBlobFlatSegment(Aborter.none, marker)).nextMarker;
    } while (marker);
  }
}
