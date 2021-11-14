// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import fs from "fs";
import util from "util";
import { BlockBlobClient } from "@azure/storage-blob";
const writeFile = util.promisify(fs.writeFile);
const fileExists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);
const deleteFile = util.promisify(fs.unlink);

import { StorageBlobUploadTest } from "./upload.spec";

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
    if (!(await fileExists(dirName))) await mkdir(dirName);
    await writeFile(fileName, Buffer.alloc(this.parsedOptions.size.value!));
  }

  public async globalCleanup() {
    await deleteFile(fileName);
    await super.globalCleanup();
  }

  async run(): Promise<void> {
    await this.blockBlobClient.uploadFile(fileName);
  }
}
