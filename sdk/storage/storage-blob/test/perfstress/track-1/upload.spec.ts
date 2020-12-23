// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { generateUuid } from "@azure/core-http";
import { Aborter, BlockBlobURL } from "@azure/storage-blob";
import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
import { StorageBlobTest } from "./storageTest.spec";
dotenv.config({ path: "../../../.env" });

interface StorageBlobUploadTestOptions {
  size: number;
}

export class StorageBlobUploadTest extends StorageBlobTest<StorageBlobUploadTestOptions> {
  blobName = "";
  buffer = Buffer.alloc(this.parsedOptions.size.value!);
  public options: PerfStressOptionDictionary<StorageBlobUploadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 10240
    }
  };

  async setup() {
    this.blobName = generateUuid();
  }

  async runAsync(): Promise<void> {
    const blockBlobClient = BlockBlobURL.fromContainerURL(this.containerClient, this.blobName);
    await blockBlobClient.upload(Aborter.none, this.buffer, this.parsedOptions.size.value!);
  }
}
