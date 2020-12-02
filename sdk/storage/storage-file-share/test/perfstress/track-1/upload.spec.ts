// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, PerfStressOptionDictionary } from "@azure/test-utils-perfstress";

import {
  Aborter,
  StorageURL,
  ServiceURL,
  ShareURL,
  DirectoryURL,
  FileURL,
  SharedKeyCredential
} from "@azure/storage-file";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();

interface StorageFileShareUploadTestOptions {
  size: number;
}

const account = process.env.ACCOUNT_NAME || "";
const accountKey = process.env.ACCOUNT_KEY || "";

const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

const shareServiceClient = new ServiceURL(
  `https://${account}.file.core.windows.net`,
  StorageURL.newPipeline(sharedKeyCredential)
);

const shareName = `newshare${new Date().getTime()}`;
const directoryName = `newdirectory${new Date().getTime()}`;
const fileName = `newfile${new Date().getTime()}`;
const shareClient = ShareURL.fromServiceURL(shareServiceClient, shareName);
const directoryClient = DirectoryURL.fromShareURL(shareClient, directoryName);
const fileClient = FileURL.fromDirectoryURL(directoryClient, fileName);

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
    const createShareResponse = await shareClient.create(Aborter.none);
    console.log(`Created share ${shareName} successfully`, createShareResponse.requestId);

    const createDirectoryResponse = await directoryClient.create(Aborter.none);
    console.log(
      `Created directory ${directoryName} successfully`,
      createDirectoryResponse.requestId
    );

    await fileClient.create(Aborter.none, this.parsedOptions.size.value!);
  }

  public async globalCleanup() {
    const deleteShareResponse = await shareClient.delete(Aborter.none);
    console.log(`Deleted share ${shareName} successfully`, deleteShareResponse.requestId);
  }

  async runAsync(): Promise<void> {
    await fileClient.uploadRange(
      Aborter.none,
      Buffer.alloc(this.parsedOptions.size.value!),
      0,
      this.parsedOptions.size.value!);
  }
}
