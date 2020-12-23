// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
  public options: PerfStressOptionDictionary<StorageBlobUploadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 10
    }
  };

  async setup() {
    this.blobName = `newblob${new Date().getTime()}`;
  }

  async runAsync(): Promise<void> {
    const blockBlobClient = BlockBlobURL.fromContainerURL(this.containerClient, this.blobName);
    await blockBlobClient.upload(
      Aborter.none,
      Buffer.alloc(this.parsedOptions.size.value!),
      this.parsedOptions.size.value!
    );
  }
}
