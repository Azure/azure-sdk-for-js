// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest } from "@azure/test-utils-perfstress";

import { BlobServiceClient, StorageSharedKeyCredential } from "../../../src";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();

export abstract class StorageBlobTest<TOptions> extends PerfStressTest<TOptions> {
  static account = process.env.ACCOUNT_NAME || "";
  static accountKey = process.env.ACCOUNT_KEY || "";

  static sharedKeyCredential = new StorageSharedKeyCredential(
    StorageBlobTest.account,
    StorageBlobTest.accountKey
  );
  
  static blobServiceClient = new BlobServiceClient(
    `https://${StorageBlobTest.account}.blob.core.windows.net`,
    StorageBlobTest.sharedKeyCredential
  );
  static containerName = `newcontainer${new Date().getTime()}`;
  static containerClient = StorageBlobTest.blobServiceClient.getContainerClient(
    StorageBlobTest.containerName
  );

  public async globalSetup() {
    const createContainerResponse = await StorageBlobTest.containerClient.create();
    console.log(
      `Create container ${StorageBlobTest.containerName} successfully`,
      createContainerResponse.requestId
    );
  }

  public async globalCleanup() {
    const deleteContainerResponse = await StorageBlobTest.containerClient.delete();
    console.log(
      `Deleted container ${StorageBlobTest.containerName} successfully`,
      deleteContainerResponse.requestId
    );
  }
}
