// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest } from "@azure/test-utils-perfstress";

import { BlobServiceClient, ContainerClient } from "../../../src";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();

export abstract class StorageBlobTest<TOptions> extends PerfStressTest<TOptions> {
  blobServiceClient: BlobServiceClient;
  containerClient: ContainerClient;
  static containerName = `newcontainer${new Date().getTime()}`;

  constructor() {
    super();
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      StorageBlobTest.getEnvVar("STORAGE_CONNECTION_STRING")
    );
    this.containerClient = this.blobServiceClient.getContainerClient(StorageBlobTest.containerName);
  }

  public async globalSetup() {
    const createContainerResponse = await this.containerClient.create();
    console.log(
      `Create container ${StorageBlobTest.containerName} successfully`,
      createContainerResponse.requestId
    );
  }

  public async globalCleanup() {
    const deleteContainerResponse = await this.containerClient.delete();
    console.log(
      `Deleted container ${StorageBlobTest.containerName} successfully`,
      deleteContainerResponse.requestId
    );
  }

  static getEnvVar(name: string) {
    const val = process.env[name];
    if (!val) {
      throw `Environment variable ${name} is not defined.`;
    }
    return val;
  }
}
