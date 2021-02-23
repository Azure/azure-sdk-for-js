// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 as uuidv4 } from "uuid";
import { PerfStressTest, getEnvVar } from "@azure/test-utils-perfstress";
import {
  BlobServiceClient,
  ContainerClient,
  StorageSharedKeyCredential
} from "@azure/storage-blob";
import { getValueInConnString } from "./utils/utils";

// Expects the .env file at the same level
import * as dotenv from "dotenv";
dotenv.config();

export abstract class StorageBlobTest<TOptions> extends PerfStressTest<TOptions> {
  blobServiceClient: BlobServiceClient;
  containerClient: ContainerClient;
  sharedKeyCredential: StorageSharedKeyCredential;
  static containerName = uuidv4();

  constructor() {
    super();
    const connectionString = getEnvVar("STORAGE_CONNECTION_STRING");
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
}
