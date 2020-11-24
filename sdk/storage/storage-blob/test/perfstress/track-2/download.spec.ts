// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, PerfStressOptionDictionary } from "@azure/test-utils-perfstress";

import { BlobServiceClient, StorageSharedKeyCredential } from "../../../src";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();

type OptionNames = "url";

export class StorageBlobDownloadTest extends PerfStressTest<string> {
  public options: PerfStressOptionDictionary<OptionNames> = {
    url: {
      required: true,
      description: "Required option",
      shortName: "u",
      longName: "url",
      defaultValue: "http://bing.com",
      value: "http://bing.com"
    }
  };
  // Enter your storage account name and shared key
  account = process.env.ACCOUNT_NAME || "";
  accountKey = process.env.ACCOUNT_KEY || "";

  sharedKeyCredential = new StorageSharedKeyCredential(this.account, this.accountKey);

  blobServiceClient = new BlobServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${this.account}.blob.core.windows.net`,
    this.sharedKeyCredential
  );
  protected static containerName = `newcontainer${new Date().getTime()}`;
  protected static blobName = `newblob${new Date().getTime()}`;

  public async globalSetup() {
    const containerClient = this.blobServiceClient.getContainerClient(
      StorageBlobDownloadTest.containerName
    );

    const createContainerResponse = await containerClient.create();
    console.log(
      `Create container ${StorageBlobDownloadTest.containerName} successfully`,
      createContainerResponse.requestId
    );

    // Create a blob
    const content = "hello world";
    const blockBlobClient = containerClient.getBlockBlobClient(StorageBlobDownloadTest.blobName);
    const uploadBlobResponse = await blockBlobClient.upload(content, Buffer.byteLength(content));
    console.log(
      `Upload block blob ${StorageBlobDownloadTest.blobName} successfully`,
      uploadBlobResponse.requestId
    );
  }

  async runAsync(): Promise<void> {
    await this.blobServiceClient
      .getContainerClient(StorageBlobDownloadTest.containerName)
      .getBlockBlobClient(StorageBlobDownloadTest.blobName)
      .download(0);
    console.log("success");
  }
}
