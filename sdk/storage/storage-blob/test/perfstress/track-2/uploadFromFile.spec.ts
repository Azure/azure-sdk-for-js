// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PerfStressTest,
  PerfStressOptionDictionary,
} from "@azure/test-utils-perfstress";

import { BlobServiceClient, StorageSharedKeyCredential } from "../../../src";
import fs from "fs";
import util from "util";
const writeFile = util.promisify(fs.writeFile);
const fileExists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);
const deleteFile = util.promisify(fs.unlink);

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();

interface StorageBlobUploadTestOptions {
  size: number;
}

const account = process.env.ACCOUNT_NAME || "";
const accountKey = process.env.ACCOUNT_KEY || "";

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);
const containerName = `newcontainer${new Date().getTime()}`;
const blobName = `newblob${new Date().getTime()}`;
const containerClient = blobServiceClient.getContainerClient(containerName);
const blockBlobClient = blobServiceClient
  .getContainerClient(containerName)
  .getBlockBlobClient(blobName);
const dirName = "temp";
const fileName = `${dirName}/upload-from-test-temp-file.txt`;

export class StorageBlobUploadFileTest extends PerfStressTest<StorageBlobUploadTestOptions> {
  public options: PerfStressOptionDictionary<StorageBlobUploadTestOptions> = {
    size: {
      required: true,
      description: "Size of the file in bytes to be created",
      shortName: "sz",
      longName: "size",
      defaultValue: 10
    }
  };

  public async globalSetup() {
    const createContainerResponse = await containerClient.create();
    console.log(
      `Create container ${containerName} successfully`,
      createContainerResponse.requestId
    );
    if (!(await fileExists(dirName))) await mkdir(dirName);
    await writeFile(fileName, Buffer.alloc(this.options.size.value!));
  }

  public async globalCleanup() {
    const deleteContainerResponse = await containerClient.delete();
    console.log(
      `Deleted container ${containerName} successfully`,
      deleteContainerResponse.requestId
    );
    await deleteFile(fileName);
  }

  async runAsync(): Promise<void> {
    await blockBlobClient.uploadFile(fileName);
  }
}
