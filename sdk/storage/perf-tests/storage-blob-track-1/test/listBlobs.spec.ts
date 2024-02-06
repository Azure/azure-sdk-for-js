// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 as generateUuid } from "uuid";
import { Aborter, BlockBlobURL } from "@azure/storage-blob";
import { executeParallel, PerfOptionDictionary } from "@azure/test-utils-perf";
import { StorageBlobTest } from "./storageTest.spec";
interface StorageBlobListTestOptions {
  count: number;
}

export class StorageBlobListTest extends StorageBlobTest<StorageBlobListTestOptions> {
  public options: PerfOptionDictionary<StorageBlobListTestOptions> = {
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
      async (_count: number, _parallelIndex: number) => {
        const blockBlobClient = BlockBlobURL.fromContainerURL(this.containerClient, generateUuid());
        blockBlobClient.upload(Aborter.none, Buffer.alloc(0), 0);
      },
      this.parsedOptions.count.value!,
      32
    );
  }

  async run(): Promise<void> {
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
