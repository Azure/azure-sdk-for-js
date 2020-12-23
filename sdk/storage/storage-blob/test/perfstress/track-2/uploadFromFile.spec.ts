// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import fs from "fs";
import util from "util";
const writeFile = util.promisify(fs.writeFile);
const fileExists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);
const deleteFile = util.promisify(fs.unlink);

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
import { StorageBlobUploadTest } from "./upload.spec";
dotenv.config();

const dirName = "temp";
const fileName = `${dirName}/upload-from-test-temp-file.txt`;

export class StorageBlobUploadFileTest extends StorageBlobUploadTest {
  public async globalSetup() {
    await super.globalSetup();
    if (!(await fileExists(dirName))) await mkdir(dirName);
    await writeFile(fileName, Buffer.alloc(this.parsedOptions.size.value!));
  }

  public async globalCleanup() {
    await deleteFile(fileName);
    await super.globalCleanup();
  }

  async runAsync(): Promise<void> {
    const blockBlobClient = this.containerClient.getBlockBlobClient(this.blobName);
    await blockBlobClient.uploadFile(fileName);
  }
}
