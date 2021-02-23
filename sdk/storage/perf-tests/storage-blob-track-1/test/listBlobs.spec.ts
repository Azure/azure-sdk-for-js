// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 as uuidv4 } from "uuid";
import { Aborter, BlockBlobURL } from "@azure/storage-blob";
import { executeParallel, PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
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
        const blockBlobClient = BlockBlobURL.fromContainerURL(this.containerClient, uuidv4());
        blockBlobClient.upload(Aborter.none, Buffer.alloc(0), 0);
        console.log(`[` + parallelIndex + `] ` + count);
      },
      this.parsedOptions.count.value!,
      32
    );
  }

  async runAsync(): Promise<void> {
    // List blobs
    let marker = undefined;
    do {
      const segmentResponse: any = await this.containerClient.listBlobFlatSegment(
        Aborter.none,
        marker
      );
      for (const _ of segmentResponse.segment.blobItems) {
      }
      marker = segmentResponse.nextMarker;
    } while (marker);
  }
}
