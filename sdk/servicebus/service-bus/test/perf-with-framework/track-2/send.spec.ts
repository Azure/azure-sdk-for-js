// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest } from "@azure/test-utils-perfstress";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();
interface SendTestOptions {
  numberOfMessagesPerSend: number;
  messageSize: number;
}
export abstract class StorageBlobTest<TOptions> extends PerfStressTest<TOptions> {
  blobServiceClient: BlobServiceClient;
  containerClient: ContainerClient;
  sharedKeyCredential: StorageSharedKeyCredential;
  static containerName = `newcontainer${new Date().getTime()}`;

  constructor() {
    super();
    const connectionString = StorageBlobTest.getEnvVar("SERVICEBUS_CONNECTION_STRING");
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
