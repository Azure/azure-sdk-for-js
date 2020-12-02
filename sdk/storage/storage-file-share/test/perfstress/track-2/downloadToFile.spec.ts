// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, PerfStressOptionDictionary } from "@azure/test-utils-perfstress";

import { ShareServiceClient, StorageSharedKeyCredential } from "../../../src";
import fs from "fs";
import util from "util";
const fileExists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);
const deleteFile = util.promisify(fs.unlink);

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();

interface StorageFileShareDownloadTestOptions {
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

export class StorageFileShareDownloadToFileTest extends PerfStressTest<
  StorageFileShareDownloadTestOptions
> {
  public options: PerfStressOptionDictionary<StorageFileShareDownloadTestOptions> = {
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
    await fileClient.uploadData(Buffer.alloc(this.parsedOptions.size.value!));
  }

  public async globalCleanup() {
    const deleteShareResponse = await shareClient.delete();
    console.log(`Deleted share ${shareName} successfully`, deleteShareResponse.requestId);
  }

  public async cleanup() {
    await deleteFile(`${localDirName}/${fileName}`);
    console.log(`Deleted local file ${localDirName}/${fileName} successfully`);
  }

  async runAsync(): Promise<void> {
    const downloadResponse = await fileClient.downloadToFile(`${localDirName}/${fileName}`,0);
    console.log(`Downloaded file ${fileName} successfully`, downloadResponse.requestId);
  }
}
