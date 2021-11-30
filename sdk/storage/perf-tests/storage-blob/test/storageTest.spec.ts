// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { generateUuid } from "@azure/core-http";
import { PerfTest, getEnvVar } from "@azure/test-utils-perf";
import {
  BlobServiceClient,
  ContainerClient,
  StorageSharedKeyCredential
} from "@azure/storage-blob";
import { getValueInConnString } from "./utils/utils";

// Expects the .env file at the same level
import * as dotenv from "dotenv";
dotenv.config();

export abstract class StorageBlobTest<TOptions> extends PerfTest<TOptions> {
  blobServiceClient: BlobServiceClient;
  containerClient: ContainerClient;
  sharedKeyCredential: StorageSharedKeyCredential;
  static containerName = generateUuid();

  constructor() {
    super();
    const connectionString = getEnvVar("STORAGE_CONNECTION_STRING");
    this.sharedKeyCredential = new StorageSharedKeyCredential(
      getValueInConnString(connectionString, "AccountName"),
      getValueInConnString(connectionString, "AccountKey")
    );
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      connectionString,
      this.configureClientOptionsCoreV1({})
    );
    this.containerClient = this.blobServiceClient.getContainerClient(StorageBlobTest.containerName);
  }

  public async globalSetup() {
    await this.containerClient.create();
  }

  public async globalCleanup() {
    await this.containerClient.delete();
  }
}
