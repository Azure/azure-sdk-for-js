// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { existsSync } from "node:fs";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import { BlockBlobClient } from "@azure/storage-blob";
import { StorageBlobUploadTest } from "./upload.spec.js";

const dirName = "temp";
const fileName = `${dirName}/upload-from-test-temp-file.txt`;

export class StorageBlobUploadFileTest extends StorageBlobUploadTest {
  blockBlobClient: BlockBlobClient;
  constructor() {
    super();
    this.blockBlobClient = this.containerClient.getBlockBlobClient(this.blobName);
  }

  public async globalSetup() {
    await super.globalSetup();
    if (!existsSync(dirName)) await mkdir(dirName);
    await writeFile(fileName, Buffer.alloc(this.parsedOptions.size.value!));
  }

  public async globalCleanup() {
    await unlink(fileName);
    await super.globalCleanup();
  }

  async run(): Promise<void> {
    await this.blockBlobClient.uploadFile(fileName);
  }
}
