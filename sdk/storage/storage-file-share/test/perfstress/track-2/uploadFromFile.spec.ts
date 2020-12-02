// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, PerfStressOptionDictionary } from "@azure/test-utils-perfstress";

import { ShareServiceClient, StorageSharedKeyCredential } from "../../../src";
import fs from "fs";
import util from "util";
const writeFile = util.promisify(fs.writeFile);
const fileExists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);
const deleteFile = util.promisify(fs.unlink);

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();

interface StorageFileShareUploadFromFileTestOptions {
  size: number;
}

const account = process.env.ACCOUNT_NAME || "";
const accountKey = process.env.ACCOUNT_KEY || "";

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

const shareServiceClient = new ShareServiceClient(
  // When using AnonymousCredential, following url should include a valid SAS or support public access
  `https://${account}.file.core.windows.net`,
  sharedKeyCredential
);
const shareName = `newshare${new Date().getTime()}`;
const directoryName = `newdirectory${new Date().getTime()}`;
const fileName = `newfile${new Date().getTime()}`;
const shareClient = shareServiceClient.getShareClient(shareName);
const directoryClient = shareClient.getDirectoryClient(directoryName);
const fileClient = directoryClient.getFileClient(fileName);

const localDirName = "temp";
const localFileName = `${localDirName}/upload-from-test-temp-file.txt`;

export class StorageFileShareUploadFromFileTest extends PerfStressTest<StorageFileShareUploadFromFileTestOptions> {
  public options: PerfStressOptionDictionary<StorageFileShareUploadFromFileTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 10
    }
  };

  public async globalSetup() {
    const createShareResponse = await shareClient.create();
    console.log(`Created share ${shareName} successfully`, createShareResponse.requestId);

    const createDirectoryResponse = await directoryClient.create();
    console.log(
      `Created directory ${directoryName} successfully`,
      createDirectoryResponse.requestId
    );

    if (!(await fileExists(localDirName))) await mkdir(localDirName);
    await writeFile(localFileName, Buffer.alloc(this.parsedOptions.size.value!));
  }

  public async globalCleanup() {
    const deleteShareResponse = await shareClient.delete();
    console.log(`Deleted share ${shareName} successfully`, deleteShareResponse.requestId);
    await deleteFile(localFileName);
  }

  async runAsync(): Promise<void> {
    await fileClient.uploadFile(localFileName);
  }
}
