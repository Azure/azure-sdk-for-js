// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { StorageBlobTest } from "./storageTest.spec";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();

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
    this.blobName = `newblob${new Date().getTime()}`;
  }

  async runAsync(): Promise<void> {
    await this.containerClient.uploadBlockBlob(
      this.blobName,
      this.buffer,
      this.parsedOptions.size.value!
    );
  }
}
