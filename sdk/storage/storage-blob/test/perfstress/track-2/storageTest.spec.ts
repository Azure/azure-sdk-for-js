// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest } from "@azure/test-utils-perfstress";

import { BlobServiceClient, ContainerClient, StorageSharedKeyCredential } from "../../../src";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
import { getValueInConnString } from "../../../src/utils/utils.common";
dotenv.config();

export abstract class StorageBlobTest<TOptions> extends PerfStressTest<TOptions> {
  blobServiceClient: BlobServiceClient;
  containerClient: ContainerClient;
  sharedKeyCredential: StorageSharedKeyCredential;
  static containerName = `newcontainer${new Date().getTime()}`;

  constructor() {
    super();
    const connectionString = StorageBlobTest.getEnvVar("STORAGE_CONNECTION_STRING");
    this.sharedKeyCredential = new StorageSharedKeyCredential(
      getValueInConnString(connectionString, "AccountName"),
      getValueInConnString(connectionString, "AccountKey")
    );
    this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    this.containerClient = this.blobServiceClient.getContainerClient(StorageBlobTest.containerName);
  }

  public async globalSetup() {
    await this.containerClient.create();
  }

  public async globalCleanup() {
    await this.containerClient.delete();
  }

  static getEnvVar(name: string) {
    const val = process.env[name];
    if (!val) {
      throw `Environment variable ${name} is not defined.`;
    }
    return val;
  }
}
