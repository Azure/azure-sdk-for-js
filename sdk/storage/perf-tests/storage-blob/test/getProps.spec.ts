// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StorageBlobTest } from "./storageTest.spec";
import { BlockBlobClient } from "@azure/storage-blob";
import { generateUuid } from "@azure/core-http";

export class GetPropsTest extends StorageBlobTest<{}> {
  public options = {};

  static blobName = generateUuid();
  blockBlobClient: BlockBlobClient;

  constructor() {
    super();
    this.blockBlobClient = this.containerClient.getBlockBlobClient(GetPropsTest.blobName);
  }

  public async globalSetup() {
    await super.globalSetup();

    // Create a blob
    await this.blockBlobClient.upload(Buffer.alloc(1024), 1024);
  }

  async run(): Promise<void> {
    const props = await this.blockBlobClient.getProperties();
    props.lastModified;
  }
}
