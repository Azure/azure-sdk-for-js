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
  public options: PerfStressOptionDictionary<StorageBlobUploadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 10
    }
  };

  async runAsync(): Promise<void> {
    const blockBlobClient = BlockBlobURL.fromContainerURL(
      this.containerClient,
      `newblob${new Date().getTime()}`
    );
    await blockBlobClient.upload(Aborter.none, Buffer.alloc(0), 0);
  }
}
