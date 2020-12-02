// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, PerfStressOptionDictionary } from "@azure/test-utils-perfstress";

import { ShareServiceClient, StorageSharedKeyCredential } from "../../../src";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();

interface StorageFileShareUploadTestOptions {
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

export class StorageFileShareUploadTest extends PerfStressTest<StorageFileShareUploadTestOptions> {
  public options: PerfStressOptionDictionary<StorageFileShareUploadTestOptions> = {
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
  }

  public async globalCleanup() {
    const deleteShareResponse = await shareClient.delete();
    console.log(`Deleted share ${shareName} successfully`, deleteShareResponse.requestId);
  }

  async runAsync(): Promise<void> {
    await fileClient.uploadData(Buffer.alloc(this.parsedOptions.size.value!));
  }
}
